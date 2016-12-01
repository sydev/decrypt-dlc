# decrypt-dlc

> Decrypt DLC files with http://dcrypt.it/.
> Thanks to these awesome guys for the permission to write this module :)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
-	[Release Notes](#release-notes)
- [Related](#related)


## Installation

```
npm install --save decrypt-dlc
```

## Usage

``` js
const decrypt = require('decrypt-dlc');

decrypt('path/to/DLC/file', (err, response) => {
  console.log(response);
  /* {"success": {
      "links": [
        "http://wwww...",
        ...
      ]}}*/
});
```

## Development

```
$ npm test
```

## Release Notes

- ```0.0.2``` - Add testing functionality
- ```0.0.1``` - Initial Release

## Related

[decrypt-dlc-cli](https://github.com/sydev/decrypt-dlc-cli)
