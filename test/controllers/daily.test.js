var should = require("should");

var daily = require("../../controllers/daily");
var utils = require("../../controllers/utils");

describe("controllers/daily", function ()
{
    describe("1.fetchLatestStoryIDs", function ()
    {
        it("should fetch the latest story IDs", function (done)
        {
            daily.fetchLatestStoryIDs(function (err, res)
            {
                should.not.exist(err);
                res.date.should.equal(utils.convertToZhihuDate(new Date()));
                done();
            });
        });
    });
    
    describe("2.fetchStoryIDs", function ()
    {
        it("should fetch the story IDs of date: 20130519", function (done)
        {
            var date = "20130519"
            var target = {
                date: "20130519",
                ids: [401, 396, 395, 394, 390, 388]
            };
            daily.fetchStoryIDs(date, function (err, res)
            {
                should.not.exist(err);
                res.date.should.equal(date);
                res.should.deepEqual(target);
                done();
            });
        });
        
        it("should not fetch the story IDs of date: 20130518", function (done)
        {
            var date = "20130518"
            var target = {};
            daily.fetchStoryIDs(date, function (err, res)
            {
                should.not.exist(err);
                res.should.deepEqual(target);
                done();
            });
        });
        
        it("should not fetch the story IDs of date: 20133030", function (done)
        {
            var date = "20133030"
            daily.fetchStoryIDs(date, function (err, res)
            {
                should.exist(err);
                done();
            });
        });
    });
    
    describe("3.fetchStory", function ()
    {
        it("should fetch the story of ID: 401", function (done)
        {
            var id = 401;
            var title = "学英语才是正经事儿";
            var imageSource = "人民教育出版社";
            var shareURL = "http://daily.zhihu.com/story/401";
            daily.fetchStory(id, function (err, res)
            {
                should.not.exist(err);
                res.story.id.should.equal(id);
                res.story.title.should.equal(title);
                res.story.imageSource.should.equal(imageSource);
                res.story.shareURL.should.equal(shareURL);
                done();
            });
        });
    });
});
