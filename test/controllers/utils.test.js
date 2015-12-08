var moment = require("moment");
var should = require("should");

var utils = require("../../controllers/utils");

describe("controllers/utils", function ()
{
    describe("1.convertToZhihuDate", function ()
    {
        var date1 = "20150915"; // String: Zhihu Format
        var date2 = "2015-09-15"; // String: Normal Format
        var date3 = moment(date2).toDate(); // Date
        var target = "20150915";
        it("should convert '" + date1 + "' to: '" + target + "'", function (done)
        {
            utils.convertToZhihuDate(date1).should.equal(target);
            done();
        });
        
        it("should convert '" + date2 + "' to: '" + target + "'", function (done)
        {
            utils.convertToZhihuDate(date2).should.equal(target);
            done();
        });
        
        it("should convert '" + date3 + "' to: '" + target + "'", function (done)
        {
            utils.convertToZhihuDate(date3).should.equal(target);
            done();
        });
        
        var wrongDate = "2015-30-30";
        it("should convert '" + wrongDate + "' to: 'null'", function (done)
        {
            should(utils.convertToZhihuDate(wrongDate)).equal(null);
            done();
        });
    });
    
    describe("2.nextZhihuDay", function ()
    {
        var date = "20150915";
        var target = "20150916";
        it("should convert '" + date + "' to: '" + target + "'", function (done)
        {
            utils.nextZhihuDay(date).should.equal(target);
            done();
        });
        
        var wrongDate = "20153030"
        it("should convert '" + wrongDate + "' to: 'null'", function (done)
        {
            should(utils.nextZhihuDay(wrongDate)).equal(null);
            done();
        });
    });
    
    describe("3.prevZhihuDay", function ()
    {
        var date = "20150915";
        var target = "20150914";
        it("should convert '" + date + "' to: '" + target + "'", function (done)
        {
            utils.prevZhihuDay(date).should.equal(target);
            done();
        });
        
        var wrongDate = "20153030"
        it("should convert '" + wrongDate + "' to: 'null'", function (done)
        {
            should(utils.prevZhihuDay(wrongDate)).equal(null);
            done();
        });
    });
    
    describe("4.subZhihuDate", function ()
    {
        var delta = 2;
        var date = "20150915";
        var target = "20150913";
        it("'" + date + "' - 2 days should equal: '" + target + "'", function (done)
        {
            utils.subZhihuDate(date, delta).should.equal(target);
            done();
        });
    });
    
    describe("5.isValidZhihuDate", function ()
    {
        var date = "20150915";
        it("'" + date + "' should be: valid", function (done)
        {
            utils.isValidZhihuDate(date).should.be.true();
            done();
        });
        
        var wrongDate = "20153030"
        it("'" + wrongDate + "' should be: invalid", function (done)
        {
            utils.isValidZhihuDate(wrongDate).should.be.false();
            done();
        });
    });
    
    describe.only("6.md5", function ()
    {
        var dataCN = "逗逗";
        var targetCN = "f446616db9ce94a6be650365751a58a7";
        it("md5 of '" + dataCN + "' should be: " + targetCN, function (done)
        {
            utils.md5(dataCN).should.equal(targetCN);
            done();
        });
        
        var dataEN = "abc";
        var targetEN = "900150983cd24fb0d6963f7d28e17f72";
        it("md5 of '" + dataEN + "' should be: " + targetEN, function (done)
        {
            utils.md5(dataEN).should.equal(targetEN);
            done();
        });
    });
});