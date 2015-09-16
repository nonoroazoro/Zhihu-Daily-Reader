var _ = require("lodash");
var should = require("should");

var daily = require("../../../controllers/crawler/daily");

describe("controllers/crawler/daily", function ()
{
    describe("1.fetchStoryIndexes", function ()
    {
        it("should fetch the story indexes of date: 20130519", function (done)
        {
            var date = "20130519"
            var target = {
                date: "20130519",
                indexes: [401, 396, 395, 394, 390, 388]
            };
            daily.fetchStoryIndexes(date, function (err, res)
            {
                should.not.exist(err);
                res.date.should.equal(date);
                res.should.deepEqual(target);
                done();
            });
        });
        
        it("should not fetch the story indexes of date: 20130518", function (done)
        {
            var date = "20130518"
            var target = {};
            daily.fetchStoryIndexes(date, function (err, res)
            {
                should.not.exist(err);
                res.should.deepEqual(target);
                done();
            });
        });
        
        it("should not fetch the story indexes of date: 20133030", function (done)
        {
            var date = "20133030"
            daily.fetchStoryIndexes(date, function (err, res)
            {
                should.exist(err);
                done();
            });
        });
    });
    
    describe("2.fetchStory", function ()
    {
        it("should fetch the story of id: 401", function (done)
        {
            var id = 401;
            var title = "学英语才是正经事儿";
            var imageSource = "人民教育出版社";
            var shareURL = "http://daily.zhihu.com/story/401";
            daily.fetchStory(id, function (err, res)
            {
                should.not.exist(err);
                res.id.should.equal(id);
                res.title.should.equal(title);
                res.imageSource.should.equal(imageSource);
                res.shareURL.should.equal(shareURL);
                done();
            });
        });
    });
});
