var async = require("async");
var should = require("should");
var mongoose = require("mongoose");

var models = require("../../models");
var Story = models.Story;

describe("models", function ()
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
    
    describe("story", function ()
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
                Story.findOne({ id: "7104770" }, function (err, res)
                {
                    should.not.exist(err);
                    res.id.should.equal("7104770");
                    done();
                });
            });
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