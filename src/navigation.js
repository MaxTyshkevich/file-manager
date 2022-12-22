import { OperationError, InvalitError } from './error.js';
import { chdir } from 'node:process';
import { getCorrectPath } from './utils.js';

const up = async (arg1, arg2) => {
  if (arg1 || arg2) {
    throw new InvalitError();
  }

  chdir('../');
};

const cd = async (newPath, arg2) => {
  if (!newPath || arg2) {
    throw new InvalitError();
  }

  try {
    const correntPath = getCorrectPath(newPath);
    chdir(correntPath);
  } catch (error) {
    throw new OperationError();
  }
};

export { up, cd };
