import { getCorrectPath } from './utils.js';
import { resolve, parse, join } from 'node:path';
import { OperationError, InvalitError } from './error.js';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';

const compress = async (pathFile, newDirectory) => {
  if (!pathFile || !newDirectory) {
    throw new InvalitError();
  }

  const pathToFile = resolve(process.cwd(), getCorrectPath(pathFile));
  const pathToNewDirectory = resolve(
    process.cwd(),
    getCorrectPath(newDirectory)
  );

  const pathName = parse(pathToFile).base;
  const pathCopyFile = join(pathToNewDirectory, `${pathName}.br`);
  try {
    const source = createReadStream(pathToFile);
    const destination = createWriteStream(pathCopyFile);

    const gzip = createBrotliCompress();

    await pipeline(source, gzip, destination);
    console.log('file compressed');
  } catch (error) {
    throw new OperationError();
  }
};

const decompress = async (pathFile, newDirectory) => {
  if (!pathFile || !newDirectory) {
    throw new InvalitError();
  }

  const pathToFile = resolve(process.cwd(), getCorrectPath(pathFile));
  const pathToNewDirectory = resolve(
    process.cwd(),
    getCorrectPath(newDirectory)
  );

  const pathName = parse(pathToFile).name;
  const pathCopyFile = join(pathToNewDirectory, `${pathName}`);

  const source = createReadStream(pathToFile);
  const destination = createWriteStream(pathCopyFile);

  const gzip = createBrotliDecompress();
  try {
    await pipeline(source, gzip, destination);
    console.log('file decompressed');
  } catch (error) {
    throw new OperationError();
  }
};

export { compress, decompress };
