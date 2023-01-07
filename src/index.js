import process, { stdin, chdir } from 'node:process';
import { homedir } from 'node:os';
import { CommandsManager } from './comands.js';
import {
  welcomUser,
  byeUser,
  showCurrentFolder,
  parseUserCommand,
} from './utils.js';

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';

chdir(homedir());
welcomUser();

const rl = readline.createInterface({ input, output });
rl.on('line', async (chunk) => {
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

rl.on('SIGINT', () => process.exit());
process.on('exit', () => byeUser());
