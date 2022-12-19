import { getCorrectPath } from './utils.js';
import { resolve, parse, join } from 'node:path';
import { messageError } from './error.js';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';

const compress = async (pathFile, newDirectory) => {
  if (!pathFile || !newDirectory) {
    throw Error('Invalid input');
  }

  const pathToFile = resolve(process.cwd(), getCorrectPath(pathFile));
  const pathToNewDirectory = resolve(
    process.cwd(),
    getCorrectPath(newDirectory)
  );

  const pathName = parse(pathToFile).name;
  const pathCopyFile = join(pathToNewDirectory, `${pathName}.gz`);
  try {
    const source = createReadStream(pathToFile);
    const destination = createWriteStream(pathCopyFile);

    const gzip = createBrotliCompress();

    await pipeline(source, gzip, destination);
    console.log('file compressed');
  } catch (error) {
    throw Error(messageError);
  }
};

const decompress = async (pathFile, newDirectory) => {
  if (!pathFile || !newDirectory) {
    throw Error('Invalid input');
  }

  const pathToFile = resolve(process.cwd(), getCorrectPath(pathFile));
  const pathToNewDirectory = resolve(
    process.cwd(),
    getCorrectPath(newDirectory)
  );

  const pathName = parse(pathToFile).name;
  const pathCopyFile = join(pathToNewDirectory, `${pathName}.gz`);

  const source = createReadStream(pathToFile);
  const destination = createWriteStream(pathCopyFile);

  const gzip = createBrotliDecompress();
  try {
    await pipeline(source, gzip, destination);
    console.log('file compressed');
  } catch (error) {
    throw Error(messageError);
  }
};

export { compress, decompress };
