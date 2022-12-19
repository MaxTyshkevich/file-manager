import process, { stdin, chdir } from 'node:process';
import { homedir } from 'node:os';
import { ls } from './ls.js';
import { up, cd } from './navigation.js';
import { osCommands } from './infoSystem.js';
import { hash } from './fileHash.js';
import { cat, add, rm, rn, cp, mv } from './operations.js';
import { decompress, compress } from './archim.js';
import {
  welcomUser,
  byeUser,
  showCurrentFolder,
  parseUserCommand,
} from './utils.js';

const CommandsManager = {
  up,
  ls,
  cd,

  cat,
  add,
  rn,
  rm,
  cp,
  mv,

  hash,

  decompress,
  compress,

  os: osCommands,
  ['.exit']: async () => process.exit(),
};

chdir(homedir());

welcomUser();

stdin.on('data', async (chunk) => {
  const [userCommand, arg, arg2] = parseUserCommand(chunk);
  const handler = CommandsManager[userCommand];

  try {
    if (typeof handler !== 'function') {
      throw new Error('Invalid input');
    }

    await handler(arg, arg2);
  } catch (error) {
    console.error(error.message);
  }

  showCurrentFolder();
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  byeUser();
});
