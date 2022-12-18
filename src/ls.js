import { readdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { messageError } from './error.js';

const ls = async () => {
  const path = resolve(process.cwd());

  const listFiles = [];
  const listDirectories = [];

  try {
    const files = await readdir(path);

    for (let file of files) {
      const filePath = join(path, file);

      const statFile = await stat(filePath);

      const info = {
        name: file,
        type: statFile.isFile() ? 'file' : 'directory',
      };

      if (statFile.isFile()) {
        listFiles.push(info);
      } else {
        listDirectories.push(info);
      }
    }
  } catch (error) {
    console.error(messageError);
  }
  listDirectories.sort();
  listFiles.sort();

  const list = [].concat(listDirectories, listFiles);

  console.table(list);
};

export { ls };
