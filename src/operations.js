import { createReadStream, createWriteStream } from 'node:fs';
import { writeFile, unlink, rename } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { OperationError, InvalitError } from './error.js';
import { open } from 'node:fs/promises';
import path, { join, isAbsolute, resolve, parse, format } from 'node:path';
import { getCorrectPath } from './utils.js';
import os from 'node:os';

const cat = async (pathFile, arg2) => {
  if (!pathFile || arg2) {
    throw new InvalitError();
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
    throw new OperationError();
  }
};

const add = async (fileName, arg2) => {
  if (!fileName || arg2) {
    throw new InvalitError();
  }

  try {
    const currentPart = join(process.cwd(), fileName);
    await writeFile(currentPart, '');
    console.log('File been created!');
  } catch (error) {
    throw new OperationError();
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
    throw new InvalitError();
  }

  const pathToFile = resolve(process.cwd(), getCorrectPath(pathFile));

  const objPath = parse(pathToFile);
  objPath.name = newFilename;
  objPath.base = objPath.name + objPath.ext;
  const pathToNewFile = resolve(format(objPath));
  try {
    await rename(pathToFile, pathToNewFile);
    return console.log('File been renamed!');
  } catch (error) {
    throw new OperationError();
  }
};

const cp = async (pathFile, newDirectory) => {
  if (!pathFile || !newDirectory) {
    throw new InvalitError();
  }

  const pathToFile = resolve(process.cwd(), getCorrectPath(pathFile));
  const pathToNewDirectory = resolve(
    process.cwd(),
    getCorrectPath(newDirectory)
  );

  const baseName = parse(pathToFile).base;
  const pathCopyFile = join(pathToNewDirectory, baseName);

  try {
    const rs = createReadStream(pathToFile);
    const ws = createWriteStream(pathCopyFile, { flags: 'wx' });

    await pipeline(rs, ws);

    console.log('File been copied!');
  } catch (error) {
    throw new OperationError();
  }
};

const mv = async (pathFile, newDirectory) => {
  if (!pathFile || !newDirectory) {
    throw new InvalitError();
  }

  const pathToFile = resolve(process.cwd(), getCorrectPath(pathFile));
  const pathToNewDirectory = resolve(
    process.cwd(),
    getCorrectPath(newDirectory)
  );

  const baseName = parse(pathToFile).base;
  const pathCopyFile = join(pathToNewDirectory, baseName);

  try {
    const rs = createReadStream(pathToFile);
    const ws = createWriteStream(pathCopyFile, { flags: 'wx' });

    await pipeline(rs, ws);
    await unlink(pathToFile);

    console.log('File been moved!');
  } catch (error) {
    throw new OperationError();
  }

  try {
    await rm(pathFile);
  } catch (error) {
    throw new OperationError();
  }
};

const rm = async (pathFile, arg2) => {
  if (!pathFile || arg2) {
    throw new InvalitError();
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
    throw new OperationError();
  }
};

export { cat, add, rm, rn, cp, mv };
