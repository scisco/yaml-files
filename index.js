'use strict';

const fs = require('fs');
const isArray = require('lodash.isarray');
const merge = require('lodash.merge');
const mergeWith = require('lodash.mergewith');
const yaml = require('js-yaml');
const p = require('path');

/**
 * Checks wither the given object is array
 *
 * @param {Object} data - input object
 * @returns {boolean} true if it is an array
 */
function resolve(data) {
  return isArray(data);
}

/**
 * Customizer function for lodash mergeWith that concat arrays
 * instead of the default replace behavior
 *
 * @param {Object} objValue - first object to merge
 * @param {Object} srcValue - second object to merge into first obj
 * @returns {Array|undefined} either the merged array or undefined
 */
function appendArrays(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return undefined;
}

/**
 * Construct function for the yaml schema that reads a list of files
 * parse them and then merge them
 *
 * @param {Object} data - input to the schema marker
 * @returns {Object} a parsed yaml object
 */
function construct(data) {
  const basepath = process.cwd();

  const files = data.map((f) => {
    const fullpath = p.join(basepath, f);

    const src = fs.readFileSync(fullpath, 'utf8');
    const t = yaml.load(src, {
      schema: YAML_FILES_SCHEMA,
      filename: fullpath
    });
    return t;
  });

  const t = files.reduce((m, f) => merge(m, f));
  return t;
}

/**
 * Construct function for the yaml schema that reads a list of files
 * parse and merge them with the caveat that it will concat arrays
 *
 * @param {Object} data - input to the schema marker
 * @returns {Object} a parsed yaml object
 */
function constructWithAppend(data) {
  const basepath = process.cwd();

  const files = data.map((f) => {
    const fullpath = p.join(basepath, f);

    const src = fs.readFileSync(fullpath, 'utf8');
    const t = yaml.load(src, {
      schema: YAML_FILES_SCHEMA,
      filename: fullpath
    });
    return t;
  });

  const t = files.reduce((m, f) => mergeWith(m, f, appendArrays));
  return t;
}

const filesSchema = new yaml.Type('tag:yaml.org,2002:files', {
  kind: 'sequence',
  resolve: resolve,
  construct: construct
});

const mergeSchema = new yaml.Type('tag:yaml.org,2002:files_merge', {
  kind: 'sequence',
  resolve: resolve,
  construct: construct
});

const mergeAppendSchema = new yaml.Type('tag:yaml.org,2002:files_merge_append', {
  kind: 'sequence',
  resolve: resolve,
  construct: constructWithAppend
});

const YAML_FILES_SCHEMA = yaml.Schema.create([
  filesSchema,
  mergeSchema,
  mergeAppendSchema
]);
module.exports.YAML_FILES_SCHEMA = YAML_FILES_SCHEMA;
