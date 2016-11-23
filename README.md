# decrypt-dlc

Decrypt DLC files with http://dcrypt.it/

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
-	[Release Notes](#release-notes)


## Installation

```
npm install --save decrypt-dlc
```

## Usage

```JavaScript
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

## Release Notes

- ```0.0.1``` - Initial Release
