var moment = require("moment");
var should = require("should");

var utils = require("../../controllers/utils");

describe("controllers/utils", function ()
{
    describe("#convertToZhihuDate", function ()
    {
        var origin = "2015-09-15";
        var target = "20150915";
        var date1 = moment(origin); // String
        var date2 = moment(origin).toDate(); // Date
        it("should convert '" + origin + "' to: '" + target + "'", function (done)
        {
            utils.convertToZhihuDate(date1).should.equal(target);
            utils.convertToZhihuDate(date2).should.equal(target);
            done();
        });
        
        origin = "2015-30-30";
        it("should convert '" + origin + "' to: 'null'", function (done)
        {
            should(utils.convertToZhihuDate(origin)).equal(null);
            done();
        });
    });
});