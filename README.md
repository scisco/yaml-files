# yaml-include

[![CircleCI](https://circleci.com/gh/scisco/yaml-files.svg?style=svg)](https://circleci.com/gh/scisco/yaml-files)
[![npm version](https://badge.fury.io/js/yaml%2dfiles.svg)](https://badge.fury.io/js/yaml%2dfiles)


Adds a custom tag for a [YAML](http://yaml.org/) document that facilitate inclusion and merging of external `.yaml` files.

## Installation

      $ npm install yaml-files

## CLI Usage

```bash
$ npm install -g yaml-files
$ yaml-files -h
Usage: yaml-files <input_filename> <output_filename> [options]
  input_filename:       path to yml file being parsed
  output_filename:      path to save the yml file
    --help, -h            show help
```

## Library Usage

### Merge

Merge multiple yaml files with lodash merge.

`file1.yml`
```yaml
key1: my key in file1
array:
  - array1
```

`file2.yml`
```yaml
key2: my key in file2
array:
  - array2
```

`main.yml`
```yaml
myDocument:
  key1: myKey
  key2: !!files_merge ['file1.yml', 'file2.yml']
```

### Merge with Append

Merge multiple yaml files with lodash merge with arrays appended

`file1.yml`
```yaml
key1: my key in file1
array:
  - array1
```

`file2.yml`
```yaml
key2: my key in file2
array:
  - array2
```

`main.yml`
```yaml
myDocument:
  key1: myKey
  key2: !!files_merge_append ['file1.yml', 'file2.yml']
```

`index.js`
```js
const yaml = require('js-yaml');
const yamlfiles = require('yaml-files');
const fs = require('fs');

const src = fs.readFileSync('main.yml', 'utf8');

const obj = yaml.load(src, { schema: yamlfiles.YAML_FILES_SCHEMA });
```

## Based On 

- [yaml-include](https://github.com/claylo/yaml-include)