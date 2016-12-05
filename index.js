(() => {
  'use strict';

  const fs        = require('fs');
  const path      = require('path');
  const request   = require('request');
  const url       = require('url');

  const DCRYPT_URL    = 'http://dcrypt.it/';
  const UPLOAD_URL    = url.resolve(DCRYPT_URL, '/decrypt/upload');
  const CONTAINER_URL = url.resolve(DCRYPT_URL, '/decrypt/container');
  const CNL_URL       = url.resolve(DCRYPT_URL, '/decrypt/cnl');
  const PASTE_URL     = url.resolve(DCRYPT_URL, '/decrypt/paste');

  /**
   * Decrypt a DLC file with the awesome http://dcrypt.it website
   * @param  {String}   file path to the DLC file
   * @param  {Function} cb   callback function
   */
  function upload(file, cb) {
    let file_path = path.join(process.cwd(), file),
      file_name   = path.basename(file);

    // Upload the DLC file
    request.post({
      url: UPLOAD_URL,
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
   * [url description]
   * @param  {[type]}   url [description]
   * @param  {Function} cb  [description]
   * @return {[type]}       [description]
   */
  function container(url, cb) {
    request.post({
      url: CONTAINER_URL,
      formData: {
        link: url
      }
    }, (err, res, body) => {
      if (err) return cb(err, null);

      // parse the response body to extract the links
      parseResponseBody(res.toJSON().body, cb);
    });
  }

  /**
   * [cnl description]
   * @param  {[type]}   url [description]
   * @param  {Function} cb  [description]
   * @return {[type]}       [description]
   */
  function cnl(url, cb) {
    request.post({
      url: CNL_URL,
      formData: {
        link: url
      }
    }, (err, res, body) => {
      if (err) return cb(err, null);

      // parse the response body to extract the links
      parseResponseBody(res.toJSON().body, cb);
    });
  }

  /**
   * [paste description]
   * @param  {[type]}   content [description]
   * @param  {Function} cb      [description]
   * @return {[type]}           [description]
   */
  function paste(content, cb) {
    request.post({
      url: PASTE_URL,
      formData: {
        content: content
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

    // Checks if http://dcrypt.it returns any errors
    if (json.hasOwnProperty('form_errors')) {
      let error_key = Object.keys(json.form_errors)[0],
        error_value = json.form_errors[error_key][0].replace(/(<([^>]+)>)/ig, ''); // strip html tags

      error = new Error(error_value);
      json  = null;
    }

    cb(error, json);
  }

  module.exports = exports = {
    upload: upload,
    container: container,
    //cnl: cnl, // currently not fully supported
    paste: paste
  };
})();
