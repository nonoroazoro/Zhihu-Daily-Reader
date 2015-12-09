var _ = require("lodash");
var should = require("should");

var daily = require("../../../controllers/crawler/daily");
var dbhelper = require("../../../controllers/dbhelper");
var utils = require("../../../controllers/utils");

describe("controllers/crawler/daily", function ()
{
    before(function (done)
    {
        if (dbhelper.connected())
        {
            dbhelper.dropAllCollections(done);
        }
        else
        {
            dbhelper.connect(function (err)
            {
                should.not.exist(err);
                dbhelper.dropAllCollections(done);
            });
        }
    });
    
    describe("1.cacheStory", function ()
    {
        var id = 401;
        var date = "20130520";
        it("should cache the story of ID: " + id, function (done)
        {
            daily.cacheStory(id, date, function (err, doc)
            {
                should.not.exist(err);
                doc.id.should.equal(id);
                doc.date.should.equal(date);
                doc.cached.should.be.true();
                done();
            });
        });
    });
    
    describe("2.cacheLatestStories", function ()
    {
        this.timeout(8000);
        it("should cache the latest stories", function (done)
        {
            daily.cacheLatestStories(function (err, res)
            {
                should.not.exist(err);
                done();
            });
        });
    });
    
    describe("3.cacheStories", function ()
    {
        this.timeout(10000);
        
        it("should cache the stories of date: 20130519", function (done)
        {
            daily.cacheStories("20130519", function (err, res)
            {
                should.not.exist(err);
                done();
            });
        });
        
        ids = [418, 417, 414, 413, 410, 409, 408, 407, 404];
        it("should cache the stories of date: 20130520" + " and IDs:\n\t" + ids, function (done)
        {
            daily.cacheStories("20130520", ids, function (err, res)
            {
                should.not.exist(err);
                done();
            });
        });
    });
});
