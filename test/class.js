var expect = require('chai').expect;
var Lime = require('../index.js');


describe('Lime constructor test', function () {
    it('initialize Lime app', function () {
        var app = new Lime();
        expect(app).to.be.an.instanceof(Lime);
    });
});
