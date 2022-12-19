import { createReadStream } from 'node:fs';
import { writeFile, unlink, rename } from 'node:fs/promises';
import { pipeline, finished } from 'node:stream/promises';
import { messageError } from './error.js';
import { open } from 'node:fs/promises';
import path, {
  join,
  isAbsolute,
  resolve,
  relative,
  parse,
  format,
} from 'node:path';
import { getCorrectPath } from './utils.js';
import { chdir, cwd } from 'node:process';
import os from 'node:os';

const cat = async (pathFile, arg2) => {
  if (!pathFile || arg2) {
    throw Error('Invalid input');
  }

  let pathToFile = getCorrectPath(pathFile);
  const isAbsolutePath = isAbsolute(pathToFile);

  if (!isAbsolutePath) {
    pathToFile = path.join(process.cwd(), pathToFile);
  }

  try {
    await isOpenReadFile(pathToFile);

    const rs = createReadStream(pathToFile);

    console.log(os.EOL);
    await pipeline(rs, process.stdout, { end: false });
    console.log(os.EOL);
  } catch (error) {
    throw Error(messageError);
  }
};

const add = async (fileName, arg2) => {
  if (!fileName || arg2) {
    throw Error('Invalid input');
  }

  try {
    const currentPart = join(process.cwd(), fileName);
    await writeFile(currentPart, '');
    console.log('File been created!');
  } catch (error) {
    throw Error(messageError);
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

const rn = async (pathFile, newFilename) => {
  if (!pathFile || !newFilename) {
    throw Error('Invalid input');
  }

  const pathToFile = resolve(getCorrectPath(pathFile));

  const objPath = parse(pathToFile);
  objPath.name = newFilename;
  objPath.base = objPath.name + objPath.ext;
  const pathToNewFile = resolve(format(objPath));
  try {
    await rename(pathToFile, pathToNewFile);
    console.log('File been renamed!');
  } catch (error) {
    throw Error(messageError);
  }
};
const cp = async (pathFile, newDirectory) => {};
const mv = async (pathFile, newDirectory) => {};

const rm = async (pathFile, arg2) => {
  if (!pathFile || arg2) {
    throw Error('Invalid input');
  }

  let pathToFile = getCorrectPath(pathFile);
  const isAbsolutePath = isAbsolute(pathToFile);

  if (!isAbsolutePath) {
    pathToFile = path.join(process.cwd(), pathToFile);
  }

  try {
    await unlink(pathToFile);
    console.log('File been removed!');
  } catch (error) {
    throw Error(messageError);
  }
};

export { cat, add, rm, rn };
