#!/usr/bin/env node

const minimist = require('minimist');
const createCliOptions = require('cliclopts');
const yaml = require('js-yaml');
const fs = require('fs');
const yamlfiles = require('../index');

/**
 * parse-merge a given yaml file and save it to a
 * given output
 *
 * @param {string} input - input yaml file path
 * @param {string} output - output yaml file path
 * @returns {string} the output path
 */
function merge(input, output) {
  const text = fs.readFileSync(input, 'utf8');
  const loaded = yaml.safeLoad(text.toString(), { schema: yamlfiles.YAML_FILES_SCHEMA });

  // write to output
  fs.writeFileSync(output, yaml.safeDump(loaded));
  return output;
}

const cliOptions = createCliOptions([
  {
    name: 'help',
    abbr: 'h',
    help: 'show help',
    boolean: true
  }
]);

const argv = minimist(process.argv.slice(2), cliOptions.options());

if (argv.help) {
  console.log('Usage: yaml-merge <command> <input_filename> <output_filename> [options] \n\
  command:              merge | append \n\
  input_filename:       path to yml file being parsed \n\
  output_filename:      path to save the yml file');
  cliOptions.print();
  process.exit(0);
}

if (argv._[0] !== 'merge' && argv._[0] !== 'append') {
  console.error(
    '[error] argument is missing you must use either merge or append commands'
  );
  process.exit(1);
}

if (!argv._[1]) {
  console.error(
    '[error] input yaml filename is missing'
  );
  process.exit(1);
}

if (!argv._[2]) {
  console.error(
    '[error] output yaml filename is missing'
  );
  process.exit(1);
}

const p = merge(argv._[1], argv._[2]);
console.log(`new yaml file stored at ${p}`);
