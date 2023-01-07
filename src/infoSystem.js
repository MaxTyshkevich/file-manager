import os from 'node:os';
import { OperationError, InvalitError } from './error.js';
const getEOL = async () => {
  console.log(JSON.stringify(os.EOL));
};

const getCpus = async () => {
  const crus = os.cpus().map((el) => {
    return {
      model: el.model.trim(),
      speed: `${el.speed / 1000}GHz`,
    };
  });

  console.table(crus, ['model', 'speed']);
};

const getHomedir = async () => {
  console.log(JSON.stringify(os.homedir()));
};

const getUserName = async () => {
  const { username } = os.userInfo();
  console.log(JSON.stringify(username));
};

const getArchitecture = async () => {
  const architecture = os.arch();
  console.log(JSON.stringify(architecture));
};

const osCommands = async (arg, arg2) => {
  if (arg2) {
    throw new InvalitError();
  }
  switch (arg) {
    case '--EOL': {
      return getEOL();
    }
    case '--cpus': {
      return getCpus();
    }
    case '--homedir': {
      return getHomedir();
    }
    case '--username': {
      return getUserName();
    }
    case '--architecture': {
      return getArchitecture();
    }
    default:
      throw new InvalitError();
  }
};

export { osCommands };
