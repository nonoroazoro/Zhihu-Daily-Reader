require("../../models");

var _ = require("lodash");
var should = require("should");
var mongoose = require("mongoose")
var Story = require("../../models/story");

describe("Mongodb Models", function ()
{
    before(function (done)
    {
        var db = mongoose.connection;
        if (db.readyState === 0)
        {
            done(new Error("Mongodb not Connected"));
        }
        else
        {
            _.each(db.collections, function (collection, name)
            {
                collection.drop(function (err)
                {
                    if (err)
                    {
                        done(err)
                    }
                });
            });
            
            done();
        }
    });
    
    describe("Story", function ()
    {
        describe("#create", function ()
        {
            it("should create a new story: 7104770", function (done)
            {
                new Story({
                    id : "7104770",
                    date : "20150909",
                    read : false,
                    content : "神经科学/生物学",
                }).save(done);
            });
        });
        
        describe("#find", function ()
        {
            it("should find the story: 7104770", function (done)
            {
                Story.findOne({ id: "7104770" }, function (err, story)
                {
                    should.not.exist(err);
                    story.id.should.equal("7104770");
                    done();
                });
            });
        });
    });
});
