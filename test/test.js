import test from 'ava';
import decrypt from '../index';

test.cb('decrypt', t => {
  decrypt('test/test.dlc', t.end);
});
