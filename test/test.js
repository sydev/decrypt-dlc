import { readFileSync } from 'fs';
import test from 'ava';

import { upload, container, paste } from '../index';

const TEST_FILE = 'test/test.dlc';
const TEST_FILE_CORRUPTED = 'test/test_corrupted.dlc';
const TEST_CONTAINER = 'https://raw.githubusercontent.com/sydev/decrypt-dlc/master/test/test.dlc';
const TEST_CONTAINER_CORRUPTED = 'https://raw.githubusercontent.com/sydev/decrypt-dlc/master/test/test_corrupted.dlc';

const expectedResult = [
	'https://www.google.de/images/nav_logo242.png',
	'https://www.google.de/images/hpp/ic_wahlberg_product_core_48.png8.png',
	'https://www.google.de/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png',
	'https://dev-files.blender.org/file/data/fbesofb22svautbktglp/PHID-FILE-onmshh3l6jhqdeq3ctdz/sample.rar'
];

test('upload', async (t) => {
	const result = await upload(TEST_FILE);
	t.deepEqual(expectedResult, result);
});

test('upload corrupted', async (t) => {
	await t.throwsAsync(async () => {
		await upload(TEST_FILE_CORRUPTED);
	}, {
		instanceOf: Error
	});
});

test('container', async (t) => {
	const result = await container(TEST_CONTAINER);
	t.deepEqual(expectedResult, result);
});

test('container corrupted', async (t) => {
	await t.throwsAsync(async () => {
		await container(TEST_CONTAINER_CORRUPTED);
	}, {
		instanceOf: Error
	});
});

test('paste', async (t) => {
	const content = readFileSync(TEST_FILE, 'utf-8');
	const result = await paste(content);
	t.deepEqual(expectedResult, result);
});

test('paste corrupted', async (t) => {
	const content = readFileSync(TEST_FILE_CORRUPTED, 'utf-8');
	await t.throwsAsync(async () => {
		await paste(content);
	}, {
		instanceOf: Error
	});
});
