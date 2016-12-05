import fs from 'fs';
import test from 'ava';
import {upload, container, cnl, paste} from '../index';

const TEST_FILE           = 'test/test.dlc';
const TEST_CONTAINER      = 'https://raw.githubusercontent.com/sydev/decrypt-dlc/master/test/test.dlc';
const TEST_CNL            = 'http://filecrypt.cc/Container/0B81F6C6DF.html';
const TEST_FILE_CORRUPTED = 'test/test_corrupted.dlc';

test.cb('upload', t => {
  upload(TEST_FILE, t.end);
});

test.cb('container', t => {
  container(TEST_CONTAINER, t.end);
});

test.cb('paste', t => {
  paste(fs.readFileSync(TEST_FILE, 'utf-8'), t.end);
});

test('upload corrupted file', t => {
  upload(TEST_FILE_CORRUPTED, (err, response) => {
    t.not(err, null);
  });
});
