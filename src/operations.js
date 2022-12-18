import { createReadStream, writeFile } from 'node:fs';
import { messageError } from './error.js';
import { open } from 'node:fs/promises';
import path, { join, isAbsolute, resolve } from 'node:path';
import { getCorrectPath } from './utils.js';

const cat = async (pathFile) => {
  let pathToFile = getCorrectPath(pathFile);
  const isAbsolutePath = isAbsolute(pathToFile);

  if (!isAbsolutePath) {
    /*  pathToFile = join(process.cwd(), pathFile); */
    pathToFile = path.join(process.cwd(), pathToFile);
  }

  try {
    await isOpenReadFile(pathToFile);

    const rs = createReadStream(pathToFile);

    rs.pipe(process.stdout);

    return true;
  } catch (error) {
    console.error(messageError);
  }
};

const add = async (fileName) => {
  try {
    await writeFile(process.cwd(), fileName, { flag: 'wx' });
    return true;
  } catch (error) {
    console.error(messageError);
  }
};

async function isOpenReadFile(pathFile) {
  let filehandle;
  try {
    filehandle = await open(pathFile, 'r');
    return true;
  } catch (err) {
    throw err;
  } finally {
    await filehandle?.close();
  }
}

const rn = (pathFile, newFilename) => {};
const cp = (pathFile, newDirectory) => {};
const mv = (pathFile, newDirectory) => {};
const rm = (pathFile) => {};

console.log(`res:`, resolve('/'));
console.log(`res:`, resolve('D:'));
console.log(`res:`, isAbsolute('/'));
console.log(`res:`, isAbsolute('D:/'));

export { cat, add };
