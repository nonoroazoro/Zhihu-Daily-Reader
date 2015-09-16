var _ = require("lodash");
var should = require("should");

var Story = require("../../models/story");
var StoryController = require("../../controllers/story");
var dbhelper = require("../../controllers/dbhelper");

describe("controllers/story", function ()
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
    
    describe("1.init", function ()
    {
        it("should create new stories: id[0~9], date[20150909, 20150910]", function (done)
        {
            var stories = [];
            for (var i = 0; i < 5; i++)
            {
                stories.push({
                    id : i,
                    date : "20150909",
                    read : (i <= 2),
                    content : "神经科学/生物学" + i,
                });
            }
            
            for (var i = 5; i < 10; i++)
            {
                stories.push({
                    id : i,
                    date : "20150910",
                    read : (i >= 7),
                    content : "神经科学/生物学" + i,
                });
            }
            
            Story.create(stories, function (err, res)
            {
                should.not.exist(err);
                done();
            });
        });
    });
    
    describe("2.findStoryById", function ()
    {
        var id = "3";
        it("should find the story: id == " + id, function (done)
        {
            StoryController.findStoryById(function (err, res)
            {
                should.not.exist(err);
                res.id.should.equal(id);
                done();
            },
            id);
        });
    });
    
    describe("3.findStoriesByDate", function ()
    {
        var date = "20150910";
        it("should find the stories: date == " + date, function (done)
        {
            StoryController.findStoriesByDate(function (err, res)
            {
                should.not.exist(err);
                res.length.should.equal(5);
                _.each(res, function (value, index)
                {
                    value.date.should.equal(date);
                });
                done();
            },
            date);
        });
    });
    
    describe("4.findUnreadStories", function ()
    {
        var date = "20150910";
        it("should find the stories: read == false, date == " + date, function (done)
        {
            StoryController.findUnreadStories(function (err, res)
            {
                should.not.exist(err);
                res.length.should.equal(2);
                _.each(res, function (value, index)
                {
                    value.date.should.equal(date);
                    value.read.should.be.true;
                });
                done();
            },
            date);
        });
    });
});
