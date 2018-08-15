'use strict';

const test = require('ava');
const yaml = require('js-yaml');
const fs = require('fs');
const yamlfiles = require('../index');

test('test file merging', (t) => {
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

  // test array
  t.is(loaded.key3.array[0], 'key3');
  t.is(loaded.key3.array[1], 'key2');
  t.is(loaded.key4.array[0], 'key1');
  t.is(loaded.key4.array[1], 'key2');
});

test('test file merge and appending', (t) => {
  const text = fs.readFileSync('data/main_merge_append.yml', 'utf8');
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

  // test array
  t.is(loaded.key3.array[0], 'key1');
  t.is(loaded.key3.array[1], 'key2');
  t.is(loaded.key3.array[2], 'key3');
  t.is(loaded.key4.array[0], 'key3');
  t.is(loaded.key4.array[1], 'key1');
  t.is(loaded.key4.array[2], 'key2');
});
