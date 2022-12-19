import { readdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { messageError } from './error.js';

const ls = async (arg1, arg2) => {
  if (arg1 || arg2) {
    throw Error('Invalid input');
  }

  const path = resolve(process.cwd());

  const listFiles = [];
  const listDirectories = [];

  try {
    const files = await readdir(path, { withFileTypes: true });

    for (let file of files) {
      const isDirectory = file.isDirectory();
      const info = {
        name: file.name,
        type: isDirectory ? 'directory' : 'file',
      };

      if (isDirectory) {
        listDirectories.push(info);
      } else {
        listFiles.push(info);
      }
    }
  } catch (error) {
    throw Error(messageError);
  }
  listDirectories.sort();
  listFiles.sort();

  const list = [].concat(listDirectories, listFiles);

  console.table(list);
};

export { ls };
