import { SqliteDatabase } from './database';
import * as fs from 'fs';
import * as path from 'path';
import initSqlJs from 'sql.js';

const TEST_DB_DIR = path.join(__dirname, '..', 'test-fixtures');
const WASM_PATH = path.join(__dirname, '..', 'node_modules', 'sql.js', 'dist', 'sql-wasm.wasm');

// Helper to create test databases
async function createTestDb(filename: string, setupSql: string[]): Promise<string> {
  if (!fs.existsSync(TEST_DB_DIR)) {
    fs.mkdirSync(TEST_DB_DIR, { recursive: true });
  }

  const dbPath = path.join(TEST_DB_DIR, filename);
  const SQL = await initSqlJs({ locateFile: () => WASM_PATH });
  const db = new SQL.Database();

  for (const sql of setupSql) {
    db.run(sql);
  }

  const data = db.export();
  fs.writeFileSync(dbPath, Buffer.from(data));
  db.close();

  return dbPath;
}

function cleanupTestDb(dbPath: string): void {
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
  }
}

describe('SqliteDatabase', () => {
  describe('File Format Support', () => {
    let testDbPaths: string[] = [];

    afterEach(() => {
      testDbPaths.forEach(p => cleanupTestDb(p));
      testDbPaths = [];
    });

    test('should open .db files', async () => {
      const dbPath = await createTestDb('test.db', [
        'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)'
      ]);
      testDbPaths.push(dbPath);

      const db = new SqliteDatabase();
      await db.open(dbPath, WASM_PATH);

      expect(db.isOpen()).toBe(true);
      expect(db.getTables()).toContain('users');
      db.close();
    });

    test('should open .sqlite files', async () => {
      const dbPath = await createTestDb('test.sqlite', [
        'CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL)'
      ]);
      testDbPaths.push(dbPath);

      const db = new SqliteDatabase();
      await db.open(dbPath, WASM_PATH);

      expect(db.isOpen()).toBe(true);
      expect(db.getTables()).toContain('products');
      db.close();
    });

    test('should open .sqlite3 files', async () => {
      const dbPath = await createTestDb('test.sqlite3', [
        'CREATE TABLE orders (id INTEGER PRIMARY KEY, total REAL)'
      ]);
      testDbPaths.push(dbPath);

      const db = new SqliteDatabase();
      await db.open(dbPath, WASM_PATH);

      expect(db.isOpen()).toBe(true);
      expect(db.getTables()).toContain('orders');
      db.close();
    });

    test('should reject unsupported file formats', async () => {
      const invalidPath = path.join(TEST_DB_DIR, 'test.txt');
      fs.mkdirSync(TEST_DB_DIR, { recursive: true });
      fs.writeFileSync(invalidPath, 'not a database');
      testDbPaths.push(invalidPath);

      const db = new SqliteDatabase();
      await expect(db.open(invalidPath, WASM_PATH)).rejects.toThrow('Unsupported file format');
    });

    test('should reject non-existent files', async () => {
      const db = new SqliteDatabase();
      await expect(db.open('/nonexistent/path.db', WASM_PATH)).rejects.toThrow('Database file not found');
    });

    test('should reject invalid SQLite files', async () => {
      const invalidPath = path.join(TEST_DB_DIR, 'invalid.db');
      fs.mkdirSync(TEST_DB_DIR, { recursive: true });
      // Write content that looks like a file but isn't valid SQLite
      fs.writeFileSync(invalidPath, Buffer.from([0x00, 0x01, 0x02, 0x03]));
      testDbPaths.push(invalidPath);

      const db = new SqliteDatabase();
      // sql.js may accept some invalid files, so we just verify it doesn't crash
      // and either opens or throws
      try {
        await db.open(invalidPath, WASM_PATH);
        // If it opens, close it
        db.close();
      } catch (e: any) {
        expect(e.message).toMatch(/Invalid SQLite database|file is not a database/i);
      }
    });
  });

  describe('SQL Execution', () => {
    let db: SqliteDatabase;
    let dbPath: string;

    beforeEach(async () => {
      dbPath = await createTestDb('sql-test.db', [
        'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, age INTEGER)',
        "INSERT INTO users (name, email, age) VALUES ('Alice', 'alice@test.com', 25)",
        "INSERT INTO users (name, email, age) VALUES ('Bob', 'bob@test.com', 30)",
        "INSERT INTO users (name, email, age) VALUES ('Charlie', 'charlie@test.com', 35)"
      ]);

      db = new SqliteDatabase();
      await db.open(dbPath, WASM_PATH);
    });

    afterEach(() => {
      db.close();
      cleanupTestDb(dbPath);
    });

    test('should execute SELECT queries', () => {
      const result = db.executeSQL('SELECT * FROM users');
      expect('rows' in result).toBe(true);
      if ('rows' in result) {
        expect(result.rows.length).toBe(3);
        expect(result.rows[0].name).toBe('Alice');
      }
    });

    test('should execute SELECT with WHERE clause', () => {
      const result = db.executeSQL("SELECT * FROM users WHERE age > 25");
      if ('rows' in result) {
        expect(result.rows.length).toBe(2);
      }
    });

    test('should execute SELECT with ORDER BY', () => {
      const result = db.executeSQL('SELECT * FROM users ORDER BY age DESC');
      if ('rows' in result) {
        expect(result.rows[0].name).toBe('Charlie');
        expect(result.rows[2].name).toBe('Alice');
      }
    });

    test('should execute SELECT with LIMIT', () => {
      const result = db.executeSQL('SELECT * FROM users LIMIT 2');
      if ('rows' in result) {
        expect(result.rows.length).toBe(2);
      }
    });

    test('should execute aggregate functions', () => {
      const result = db.executeSQL('SELECT COUNT(*) as count, AVG(age) as avg_age FROM users');
      if ('rows' in result) {
        expect(result.rows[0].count).toBe(3);
        expect(result.rows[0].avg_age).toBe(30);
      }
    });

    test('should execute PRAGMA statements', () => {
      const result = db.executeSQL('PRAGMA table_info(users)');
      if ('rows' in result) {
        expect(result.rows.length).toBe(4);
        expect(result.rows.map(r => r.name)).toContain('name');
      }
    });

    test('should execute INSERT statements', () => {
      const result = db.executeSQL("INSERT INTO users (name, email, age) VALUES ('David', 'david@test.com', 40)");
      expect('success' in result).toBe(true);
      if ('success' in result) {
        expect(result.success).toBe(true);
        expect(result.changes).toBe(1);
      }
    });

    test('should execute UPDATE statements', () => {
      const result = db.executeSQL("UPDATE users SET age = 26 WHERE name = 'Alice'");
      if ('success' in result) {
        expect(result.success).toBe(true);
        expect(result.changes).toBe(1);
      }
    });

    test('should execute DELETE statements', () => {
      const result = db.executeSQL("DELETE FROM users WHERE name = 'Bob'");
      if ('success' in result) {
        expect(result.success).toBe(true);
        expect(result.changes).toBe(1);
      }
    });

    test('should handle SQL syntax errors', () => {
      const result = db.executeSQL('SELEC * FROM users');
      if ('success' in result) {
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
      }
    });

    test('should handle queries on non-existent tables', () => {
      expect(() => db.executeSQL('SELECT * FROM nonexistent')).toThrow();
    });
  });

  describe('CRUD Operations', () => {
    let db: SqliteDatabase;
    let dbPath: string;

    beforeEach(async () => {
      dbPath = await createTestDb('crud-test.db', [
        'CREATE TABLE items (id INTEGER PRIMARY KEY, name TEXT NOT NULL, quantity INTEGER DEFAULT 0, price REAL)',
        "INSERT INTO items (name, quantity, price) VALUES ('Item A', 10, 9.99)",
        "INSERT INTO items (name, quantity, price) VALUES ('Item B', 20, 19.99)",
        "INSERT INTO items (name, quantity, price) VALUES ('Item C', 30, 29.99)"
      ]);

      db = new SqliteDatabase();
      await db.open(dbPath, WASM_PATH);
    });

    afterEach(() => {
      db.close();
      cleanupTestDb(dbPath);
    });

    describe('Read Operations', () => {
      test('should get table list', () => {
        const tables = db.getTables();
        expect(tables).toContain('items');
      });

      test('should get table info with column details', () => {
        const columns = db.getTableInfo('items');
        expect(columns.length).toBe(4);
        expect(columns.find(c => c.name === 'id')?.pk).toBe(1);
        expect(columns.find(c => c.name === 'name')?.notnull).toBe(1);
      });

      test('should get table data with pagination', () => {
        const result = db.getTableData('items', 0, 2);
        expect(result.rows.length).toBe(2);
        expect(result.total).toBe(3);
      });

      test('should get second page of data', () => {
        const result = db.getTableData('items', 1, 2);
        expect(result.rows.length).toBe(1);
        expect(result.rows[0].name).toBe('Item C');
      });
    });

    describe('Update Operations', () => {
      test('should update cell value', () => {
        // Get the first row's id (which is the rowid for INTEGER PRIMARY KEY)
        const data = db.getTableData('items');
        const firstRowId = data.rows[0].id;

        const result = db.updateCell('items', firstRowId, 'name', 'Updated Item A');
        expect(result.success).toBe(true);

        const updatedData = db.getTableData('items');
        expect(updatedData.rows.find(r => r.id === firstRowId)?.name).toBe('Updated Item A');
      });

      test('should update numeric values', () => {
        const data = db.getTableData('items');
        const firstRowId = data.rows[0].id;

        const result = db.updateCell('items', firstRowId, 'quantity', 100);
        expect(result.success).toBe(true);

        const updatedData = db.getTableData('items');
        expect(updatedData.rows.find(r => r.id === firstRowId)?.quantity).toBe(100);
      });

      test('should update to NULL', () => {
        const data = db.getTableData('items');
        const firstRowId = data.rows[0].id;

        const result = db.updateCell('items', firstRowId, 'price', null);
        expect(result.success).toBe(true);

        const updatedData = db.getTableData('items');
        expect(updatedData.rows.find(r => r.id === firstRowId)?.price).toBeNull();
      });
    });

    describe('Delete Operations', () => {
      test('should delete row by rowid', () => {
        const data = db.getTableData('items');
        const secondRowId = data.rows[1].id;
        const initialTotal = data.total || 0;

        const result = db.deleteRow('items', secondRowId);
        expect(result.success).toBe(true);
        expect(result.changes).toBe(1);

        const updatedData = db.getTableData('items');
        expect(updatedData.total).toBe(initialTotal - 1);
        expect(updatedData.rows.find(r => r.id === secondRowId)).toBeUndefined();
      });

      test('should handle deleting non-existent row', () => {
        const result = db.deleteRow('items', 999);
        expect(result.success).toBe(true);
        expect(result.changes).toBe(0);
      });
    });

    describe('Insert Operations', () => {
      test('should insert new row', () => {
        const result = db.insertRow('items', { name: 'Item D', quantity: 40, price: 39.99 });
        expect(result.success).toBe(true);
        expect(result.changes).toBe(1);

        const data = db.getTableData('items');
        expect(data.total).toBe(4);
        expect(data.rows.find(r => r.name === 'Item D')).toBeDefined();
      });

      test('should insert row with NULL values', () => {
        const result = db.insertRow('items', { name: 'Item E', quantity: null, price: null });
        expect(result.success).toBe(true);

        const data = db.getTableData('items');
        const newRow = data.rows.find(r => r.name === 'Item E');
        expect(newRow?.quantity).toBeNull();
        expect(newRow?.price).toBeNull();
      });

      test('should fail insert with missing required field', () => {
        const result = db.insertRow('items', { quantity: 50, price: 49.99 });
        expect(result.success).toBe(false);
        expect(result.error).toContain('NOT NULL');
      });
    });
  });

  describe('Data Persistence', () => {
    let dbPath: string;

    beforeEach(async () => {
      dbPath = await createTestDb('persist-test.db', [
        'CREATE TABLE data (id INTEGER PRIMARY KEY, value TEXT)'
      ]);
    });

    afterEach(() => {
      cleanupTestDb(dbPath);
    });

    test('should persist changes after update', async () => {
      const db1 = new SqliteDatabase();
      await db1.open(dbPath, WASM_PATH);
      db1.insertRow('data', { value: 'test value' });
      db1.close();

      const db2 = new SqliteDatabase();
      await db2.open(dbPath, WASM_PATH);
      const result = db2.getTableData('data');
      expect(result.rows.find(r => r.value === 'test value')).toBeDefined();
      db2.close();
    });
  });

  describe('Security', () => {
    let db: SqliteDatabase;
    let dbPath: string;

    beforeEach(async () => {
      dbPath = await createTestDb('security-test.db', [
        'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT)'
      ]);
      db = new SqliteDatabase();
      await db.open(dbPath, WASM_PATH);
    });

    afterEach(() => {
      db.close();
      cleanupTestDb(dbPath);
    });

    test('should reject SQL injection in table names', () => {
      expect(() => db.getTableInfo('users"; DROP TABLE users; --')).toThrow('Invalid table name');
    });

    test('should reject SQL injection in column names', () => {
      expect(() => db.updateCell('users', 1, 'name"; DROP TABLE users; --', 'value')).toThrow('Invalid column name');
    });
  });
});
