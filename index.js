(() => {
  'use strict';

  const fs          = require('fs');
  const request     = require('request');

  const DCRYPT_URL  = 'http://dcrypt.it/decrypt/upload';

  /**
   * Decrypt a DLC file with the awesome http://dcrypt.it website
   * @param  {String}   file path to the DLC file
   * @param  {Function} cb   callback function
   */
  function decrypt(file, cb) {
    let file_path = path.join(process.cwd(), file),
      file_name   = path.basename(file);

    // Upload the DLC file
    request.post({
      url: DCRYPT_URL,
      formData: {
        dlcfile: {
          value: fs.createReadStream(file_path),
          options: {
            filename: file_name,
            contentType: 'application/octet-stream'
          }
        }
      }
    }, (err, res, body) => {
      if (err) return cb(err, null);

      // parse the response body to extract the links
      parseResponseBody(res.toJSON().body, cb);
    });
  }

  /**
   * Parse a response body to filter JSON objects
   * @param  {String}   body A response body
   * @param  {Function} cb   callback function
   */
  function parseResponseBody(body, cb) {
    let json  = JSON.parse(body.replace(/<(\/|)textarea>/g, '')),
      error   = null;

    // Checks if http://dcrypt.it sucessfully decrypt the DLC file
    if (!json.hasOwnProperty('success')) {
      error = new Error('No links');
    }

    cb(error, json);
  }

  module.exports = exports = decrypt;
})();
