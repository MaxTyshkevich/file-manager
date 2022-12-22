const { createHash } = await import('node:crypto');
import os from 'node:os';
import { resolve } from 'node:path';
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { OperationError, InvalitError } from './error.js';
import { getCorrectPath } from './utils.js';

const hash = async (pathFile, arg2) => {
  if (!pathFile || arg2) {
    throw new InvalitError();
  }

  const pathToFile = resolve(process.cwd(), getCorrectPath(pathFile));
  try {
    const input = createReadStream(pathToFile);
    const output = process.stdout;
    const hash = createHash('sha256').setEncoding('hex');

    console.log(os.EOL);
    await pipeline(input, hash, output, { end: false });
    console.log(os.EOL);
  } catch (error) {
    throw new OperationError();
  }
};

export { hash };
