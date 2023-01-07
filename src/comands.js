import process from 'node:process';
import { ls } from './ls.js';
import { up, cd } from './navigation.js';
import { osCommands } from './infoSystem.js';
import { hash } from './fileHash.js';
import { cat, add, rm, rn, cp, mv } from './operations.js';
import { decompress, compress } from './archim.js';

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

export { CommandsManager };
