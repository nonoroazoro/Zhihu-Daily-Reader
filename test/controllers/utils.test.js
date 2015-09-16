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
});