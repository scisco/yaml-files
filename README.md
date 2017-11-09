# yaml-include

Adds a custom tag for a [YAML](http://yaml.org/) document that facilitate inclusion and merging of external `.yaml` files.

## Installation

      $ npm install yaml-files

## Usage

`file1.yml`
```yaml
key1: my key in file1
```

`file2.yml`
```yaml
key2: my key in file2
```

`main.yml`
```yaml
myDocument:
  key1: myKey
  key2: !!files ['file1.yml', 'file2.yml']
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