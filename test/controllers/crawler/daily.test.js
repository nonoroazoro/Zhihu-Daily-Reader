var _ = require("lodash");
var should = require("should");

var daily = require("../../../controllers/crawler/daily");

describe("controllers/crawler/daily", function ()
{
    describe("1.fetchStoryIndexes", function ()
    {
        it("should fetch the story indexes of: 20130519", function (done)
        {
            var date = "20130519"
            var target = {
                date: "20130519",
                indexes: [401, 396, 395, 394, 390, 388]
            };
            daily.fetchStoryIndexes("20130519", function (err, res)
            {
                should.not.exist(err);
                res.date.should.equal(date);
                res.should.deepEqual(target);
                done();
            });
        });
        
        it("should not fetch the story indexes of: 20130518", function (done)
        {
            var date = "20130518"
            var target = {};
            daily.fetchStoryIndexes("20130518", function (err, res)
            {
                should.not.exist(err);
                res.should.deepEqual(target);
                done();
            });
        });
        
        it("should not fetch the story indexes of: 20133030", function (done)
        {
            var date = "20133030"
            daily.fetchStoryIndexes("20133030", function (err, res)
            {
                should.exist(err);
                done();
            });
        });
    });
});
