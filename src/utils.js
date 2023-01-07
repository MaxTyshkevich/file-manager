import { argv, cwd } from 'node:process';
import path, { isAbsolute, join, parse, relative, delimiter } from 'node:path';

const getUserName = () => {
  const args = argv.slice(2);

  const argName = args.find((arg) => {
    return arg.includes('--username');
  });
  if (!argName) return 'unknown';

  const [key, value] = argName.split('=');

  return value ? value : 'unknown';
};

const showCurrentFolder = () => {
  console.log(`You are currently in ${cwd()}`);
};

const welcomUser = () => {
  console.log(`Welcome to the File Manager, ${getUserName()}!`);
  showCurrentFolder();
};

const byeUser = () => {
  console.log(`Thank you for using File Manager, ${getUserName()}, goodbye!`);
};

const parseUserCommand = (chunk) => {
  const regExp = /\s+/;
  const str = chunk.toString().trim();
  const [command, ...args] = str.split(regExp);
  const stringArgs = args.join(' ');

  if (!stringArgs) {
    return [command];
  }

  const variant1 = stringArgs.match(/(?<=["'])[^"']+(\w+)/g) || [];
  /* min been 1  */
  const variant2 = stringArgs.split(regExp);

  if (variant1.length == 2) {
    return [command, variant1[0], variant1[1]];
  } else if (variant1.length == 1) {
    return [command, variant1[0]];
  } else if (variant2.length == 2) {
    return [command, variant2[0], variant2[1]];
  } else if (variant2.length == 1) {
    return [command, variant2[0]];
  }
};

function getCorrectPath(newPath) {
  if ('../' == newPath || './' == newPath) {
    return newPath;
  }

  const pathObject = path.parse(newPath);
  if (!pathObject.root.length) {
    return path.format(pathObject);
  }

  if (String(newPath).startsWith('.')) {
    return path.normalize(userPath);
  }

  let [desk, rest] = newPath.split(':', 2);
  desk = desk.toUpperCase();
  let userPath = [desk, rest].join(':');

  if (userPath[userPath.length - 1] === ':') {
    userPath += '\\';
  }

  const normalizePath = path.normalize(userPath);

  return normalizePath;
}

export {
  welcomUser,
  byeUser,
  showCurrentFolder,
  parseUserCommand,
  getCorrectPath,
};
