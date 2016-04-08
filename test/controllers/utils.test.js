import moment from "moment";
import should from "should";

import utils from "../../controllers/utils";

describe("controllers/utils", function ()
{
    describe("1.convertToZhihuDate", function ()
    {
        const date1 = "20150915"; // String: Zhihu Format
        const date2 = "2015-09-15"; // String: Normal Format
        const date3 = moment(date2).toDate(); // Date
        const target = "20150915";
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
        
        const wrongDate = "2015-30-30";
        it("should convert '" + wrongDate + "' to: 'null'", function (done)
        {
            should(utils.convertToZhihuDate(wrongDate)).equal(null);
            done();
        });
    });
    
    describe("2.nextZhihuDay", function ()
    {
        const date = "20150915";
        const target = "20150916";
        it("should convert '" + date + "' to: '" + target + "'", function (done)
        {
            utils.nextZhihuDay(date).should.equal(target);
            done();
        });
        
        const wrongDate = "20153030";
        it("should convert '" + wrongDate + "' to: 'null'", function (done)
        {
            should(utils.nextZhihuDay(wrongDate)).equal(null);
            done();
        });
    });
    
    describe("3.prevZhihuDay", function ()
    {
        const date = "20150915";
        const target = "20150914";
        it("should convert '" + date + "' to: '" + target + "'", function (done)
        {
            utils.prevZhihuDay(date).should.equal(target);
            done();
        });
        
        const wrongDate = "20153030";
        it("should convert '" + wrongDate + "' to: 'null'", function (done)
        {
            should(utils.prevZhihuDay(wrongDate)).equal(null);
            done();
        });
    });
    
    describe("4.subZhihuDate", function ()
    {
        const delta = 2;
        const date = "20150915";
        const target = "20150913";
        it("'" + date + "' - 2 days should equal: '" + target + "'", function (done)
        {
            utils.subZhihuDate(date, delta).should.equal(target);
            done();
        });
    });
    
    describe("5.isValidZhihuDate", function ()
    {
        const date = "20150915";
        it("'" + date + "' should be: valid", function (done)
        {
            utils.isValidZhihuDate(date).should.be.true();
            done();
        });
        
        const wrongDate = "20153030";
        it("'" + wrongDate + "' should be: invalid", function (done)
        {
            utils.isValidZhihuDate(wrongDate).should.be.false();
            done();
        });
    });
    
    describe("6.md5", function ()
    {
        const dataCN = "逗逗";
        const targetCN = "f446616db9ce94a6be650365751a58a7";
        it("md5 of '" + dataCN + "' should be: " + targetCN, function (done)
        {
            utils.md5(dataCN).should.equal(targetCN);
            done();
        });
        
        const dataEN = "abc";
        const targetEN = "900150983cd24fb0d6963f7d28e17f72";
        it("md5 of '" + dataEN + "' should be: " + targetEN, function (done)
        {
            utils.md5(dataEN).should.equal(targetEN);
            done();
        });
    });
});