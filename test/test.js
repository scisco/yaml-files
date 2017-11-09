'use strict';

const test = require('ava');
const yaml = require('js-yaml');
const fs = require('fs');
const yamlfiles = require('../index');

test('test file mergoing', t => {
  const text = fs.readFileSync('data/main.yml', 'utf8');
  const loaded = yaml.safeLoad(text.toString(), { schema: yamlfiles.YAML_FILES_SCHEMA });
  t.is(loaded.key1, 'value1');
  t.is(loaded.key2.test, 'good test');
  t.is(loaded.key2.result, 'good result');
  t.is(loaded.key3.result, 'bad result');
  t.is(loaded.key3.test, 'good test');
  t.is(loaded.key3.test2, 'good test');
  t.is(loaded.key4.result, 'good result');
  t.is(loaded.key4.test, 'good test');
  t.is(loaded.key4.test2, 'good test');
});
