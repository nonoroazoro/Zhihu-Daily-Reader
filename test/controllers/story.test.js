var _ = require("lodash");
var async = require("async");
var should = require("should");
var mongoose = require("mongoose");

var models = require("../../models");
var Story = models.Story;

var StoryController = require("../../controllers/story");

describe("controllers/story", function ()
{
    before(function (done)
    {
        if (models.connected())
        {
            _clearDB(done);
        }
        else
        {
            models.connectDB(function (err)
            {
                should.not.exist(err);
                _clearDB(done);
            });
        }
    });
    
    describe("#init", function ()
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
    
    describe("#findStoryById", function ()
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
    
    describe("#findStoriesByDate", function ()
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
    
    describe("#findUnreadStories", function ()
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

function _clearDB(p_done)
{
    async.each(mongoose.connection.collections, function (collection, callback)
    {
        collection.drop(callback);
    },
    p_done);
}