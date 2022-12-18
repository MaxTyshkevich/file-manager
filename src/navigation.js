import {} from 'node:fs';

import { chdir, cwd } from 'node:process';
import { messageError } from './error.js';
import { getCorrectPath } from './utils.js';

const up = async () => {
  chdir('../');
};

const cd = async (newPath) => {
  try {
    const correntPath = getCorrectPath(newPath);
    chdir(correntPath);

    console.log(`change dir: ${cwd()}`);
  } catch (error) {
    console.error(messageError);
  }
};

console.log(getCorrectPath('E:axiosshort.js'));

export { up, cd };
