const fs = require('fs');
const path = require('path');
const request = require('request-promise-native');
const { resolve: urlResolve } = require('url');

const DCRYPT_URL = 'http://dcrypt.it/';
const UPLOAD_URL = urlResolve(DCRYPT_URL, '/decrypt/upload');
const CONTAINER_URL = urlResolve(DCRYPT_URL, '/decrypt/container');
const CNL_URL = urlResolve(DCRYPT_URL, '/decrypt/cnl');
const PASTE_URL = urlResolve(DCRYPT_URL, '/decrypt/paste');

/**
 * Parse the response body as json
 * @param {String} body The response body
 * @return {String[]} Array of links
 * @throws {Error}
 */
const parseResponseBody = (body = '') => {
	const json = JSON.parse(body.replace(/<(\/|)textarea>/g, ''));

	if (json.hasOwnProperty('form_errors')) {
		const errorMessage = json.form_errors['dlcfile'][0];
		throw new Error(errorMessage);
	}

	if (json.hasOwnProperty('success') && Array.isArray(json.success.links)) {
		return json.success.links;
	}

	throw new Error('Malformed response');
};

/**
 * Decrypt a DLC file with the awesome http://dcrypt.it website
 * @param {String} filePath
 * @return {Promise<String[]>} Returns a promise, which resolves to an array of urls
 * @throws {Error}
 */
const upload = async (inputFilepath = '') => {
	const filepath = path.isAbsolute(inputFilepath) ? inputFilepath : path.resolve(process.cwd(), inputFilepath);
	const filename = path.basename(filepath);

	const body = await request.post({
		url: UPLOAD_URL,
		formData: {
			dlcfile: {
				value: fs.createReadStream(filepath),
				options: {
					filename,
					contentType: 'application/octet-stream'
				}
			}
		}
	});

	return parseResponseBody(body);
};

/**
 * Decrypt a container at the given url
 * @param {String} link The link to the container
 * @return {Promise<String[]>} Returns a promise, which resolves to an array of urls
 * @throws {Error}
 */
const container = async (link = '') => {
	const body = await request.post({
		url: CONTAINER_URL,
		formData: { link }
	});

	return parseResponseBody(body);
};

/**
 * Decrypt the string content of a container 
 * @param {String} content The content of a container
 * @return {Promise<String[]>} Returns a promise, which resolves to an array of urls
 * @throws {Error}
 */
const paste = async (content = '') => {
	const body = await request.post({
		url: PASTE_URL,
		formData: { content }
	});

	return parseResponseBody(body);
};


module.exports = {
	upload,
	container,
	paste
};
