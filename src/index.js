import process, { stdin, chdir } from 'node:process';
import { homedir } from 'node:os';
import { ls } from './ls.js';
import { up, cd } from './navigation.js';
import { osCommands } from './infoSystem.js';
import { cat, add, rm, rn, cp } from './operations.js';

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

  os: osCommands,
  ['.exit']: () => process.exit(),
};

chdir(homedir());

welcomUser();

stdin.on('data', async (chunk) => {
  const [userCommand, arg, arg2] = parseUserCommand(chunk);
  console.log('parsed: ', userCommand, arg, arg2);
  const handler = CommandsManager[userCommand];

  try {
    await handler(arg, arg2);
  } catch (error) {
    /* test */
    console.log(error);

    console.log(error.message);
    console.log('catch index.js');
  }

  showCurrentFolder();
});

process.on('SIGINT', (code) => {
  process.exit();
});

process.on('exit', (code) => {
  byeUser();
});
