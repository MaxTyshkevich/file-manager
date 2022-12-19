import {} from 'node:fs';

import { chdir, cwd } from 'node:process';
import { messageError } from './error.js';
import { getCorrectPath } from './utils.js';

const up = async (arg1, arg2) => {
  if (arg1 || arg2) {
    throw Error('Invalid input');
  }

  chdir('../');
};

const cd = async (newPath, arg2) => {
  if (!newPath || arg2) {
    throw Error('Invalid input');
  }

  try {
    const correntPath = getCorrectPath(newPath);
    chdir(correntPath);
  } catch (error) {
    throw Error(messageError);
  }
};

export { up, cd };
