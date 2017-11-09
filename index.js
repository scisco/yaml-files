'use strict';

const fs = require('fs');
const merge = require('lodash.merge');
const yaml = require('js-yaml');
const p = require('path');

function File (obj) {
  this.obj = obj;
}

function resolve (data) {
  return Array.isArray(data);
}

function construct (data) {
  const basepath = process.cwd();

  const files = data.map((f) => {
    const fullpath = p.join(basepath, f);

    const src = fs.readFileSync(fullpath, 'utf8');
    const t = yaml.load(src, {
      schema: YAML_FILES_SCHEMA,
      filename: fullpath
    });
    return t
  });

  const t = files.reduce((m, f) => merge(m, f));
  return t;
}

const files = new yaml.Type('tag:yaml.org,2002:files', {
  kind: 'sequence',
  resolve: resolve,
  construct: construct
});

const YAML_FILES_SCHEMA = yaml.Schema.create([files]);
module.exports.YAML_FILES_SCHEMA = YAML_FILES_SCHEMA;
