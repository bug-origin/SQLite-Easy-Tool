// VSCode mock for testing
export const Uri = {
  file: (path: string) => ({ fsPath: path, scheme: 'file' }),
  parse: (str: string) => ({ fsPath: str, scheme: 'file' })
};

export const window = {
  registerCustomEditorProvider: jest.fn(),
  showErrorMessage: jest.fn(),
  showInformationMessage: jest.fn()
};

export const EventEmitter = jest.fn().mockImplementation(() => ({
  event: jest.fn(),
  fire: jest.fn()
}));

export const commands = {
  registerCommand: jest.fn()
};

export const workspace = {
  fs: {
    readFile: jest.fn(),
    writeFile: jest.fn()
  }
};
