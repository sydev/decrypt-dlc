(() => {

  const chai      = require('chai');
  const decrypt   = require('../index');

  const expect    = chai.expect;
  const dlc_file  = './test/test.dlc';

  describe('decrypt test.dlc', () => {

    it('should have success string and links array', (done) => {
      decrypt(dlc_file, (err, response) => {
        expect(err).to.be.null;
        expect(response).to.be.object;
        expect(response.success).to.be.string;
        expect(response.links).to.be.array;
        done();
      });
    });

  });

})();
