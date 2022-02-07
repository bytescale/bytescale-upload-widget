#!/usr/bin/env node

/**
 * Script used in conjunction with 'lint-staged' to call commands in sub-folders, rather than in the root folder.
 *
 * Called using the following syntax:
 *
 *   ./runOncePerSubFolder.js foo ! bar/a.js bar/b.js buz/x.js
 *
 * With the above invocation, the script will execute the following two commands:
 *
 *   (cd bar && foo bar/a.js bar/b.js)
 *   (cd buz && foo buz/x.js)
 *
 * Alternatively, call with the following syntax (note '?' instead of '!'):
 *
 *   ./runOncePerSubFolder.js foo ? bar/a.js bar/b.js buz/x.js
 *
 * And the script will execute the following two commands
 *
 *   (cd bar && foo)
 *   (cd buz && foo)
 */
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);

const stagedFilesSeparator = "!";
const noStagedFilesSeparator = "?";
const commandSeparator = Math.max(
  process.argv.indexOf(stagedFilesSeparator),
  process.argv.indexOf(noStagedFilesSeparator)
);
if (commandSeparator === -1) {
  process.stdout.write(
    "Please put a '!' or '?' at the end of your call to 'runInSubFolders.js' to delineate your command from the files passed by 'lint-staged'."
  );
  process.exit(1);
}
const passStagedFiles = process.argv[commandSeparator] === stagedFilesSeparator;
const commandsToRun = process.argv.slice(2, commandSeparator);
const filesToPassToCommand = process.argv.slice(commandSeparator + 1);
const commands = [];

filesToPassToCommand.forEach(file => {
  const relativePath = file.substring(__dirname.length + 1);
  const childFolder = relativePath.substring(0, relativePath.indexOf(path.sep));
  let command = commands.find(x => x.childFolder === childFolder);
  if (command === undefined) {
    command = { childFolder, files: [] };
    commands.push(command);
  }
  command.files.push(file);
});

const promises = commands.map(command => {
  return execAsync(`${commandsToRun.join(" ")} ${(passStagedFiles ? command.files : []).join(" ")}`, {
    stdio: "inherit",
    cwd: path.join(__dirname, command.childFolder)
  });
});

const invoke = async () => {
  const results = await Promise.all(promises.map(p => p.catch(e => e)));
  const errors = results.filter(result => result instanceof Error);
  errors.forEach(({ stdout, stderr }) => {
    process.stdout.write(stdout);
    process.stderr.write(stderr);
  });
  if (errors.length > 0) {
    process.exit(1);
  }
};

invoke();
