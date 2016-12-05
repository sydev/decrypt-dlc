# decrypt-dlc

> Decrypt DLC files with http://dcrypt.it/.
> Thanks to these awesome guys for the permission to write this module :)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Development](#development)
-	[Release Notes](#release-notes)
- [Related](#related)


## Installation

```
$ npm install --save decrypt-dlc
```

## Usage

``` js
const decrypt = require('decrypt-dlc');

// DLC-file upload
decrypt.upload('path/to/DLC/file', (err, response) => {
  console.log(response);
  /* {"success": {
      "links": [
        "http://wwww...",
        ...
      ]}}*/
});

// Container URL
decrypt.container('http://example.com/file.dlc', (err, response) => {
  console.log(response);
  /* {"success": {
      "links": [
        "http://wwww...",
        ...
      ]}}*/
});

// Paste DLC-file content
const fs = require('fs');

decrypt.paste(fs.readFileSync('path/to/DLC/file'), (err, response) => {
  console.log(response);
  /* {"success": {
      "links": [
        "http://wwww...",
        ...
      ]}}*/
});
```

## API

```decrypt.upload(filepath, callback)```
- ```filepath``` String - Path to DLC file
- ```callback``` Function - Callback function. Has two parameters, error and response

```decrypt.container(url, callback)```
- ```url``` String - URL to a DLC-file
- ```callback``` Function - Callback function. Has two parameters, error and response.

```decrypt.paste(fileContent, callback)```
- ```fileContent``` String - File content of a DLC file.
- ```callback``` Function - Callback function. Has two parameters, error and response.

## Development

```
$ npm test
```

## Release Notes

- ```1.0.0```
  - Change API, see [Usage](#usage) or [API](#api)
  - Add more endpoints
  - Add [ava](https://www.npmjs.com/package/ava) as test engine
- ```0.0.2``` - Add testing functionality
- ```0.0.1``` - Initial Release

## Related

[decrypt-dlc-cli](https://github.com/sydev/decrypt-dlc-cli)
