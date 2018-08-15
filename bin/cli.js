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
  console.log('Usage: yaml-merge <input_filename> <output_filename> [options] \n\
  input_filename:       path to yml file being parsed \n\
  output_filename:      path to save the yml file');
  cliOptions.print();
  process.exit(0);
}

const input = argv._[0];
const output = argv._[1];

if (!input) {
  console.error(
    '[error] input yaml filename is missing'
  );
  process.exit(1);
}

if (!output) {
  console.error(
    '[error] output yaml filename is missing'
  );
  process.exit(1);
}

const p = merge(input, output);
console.log(`new yaml file stored at ${p}`);
