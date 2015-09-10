var _ = require("lodash");
var should = require("should");
var mongoose = require("mongoose");

var models = require("../../models");
var Story = models.Story;

describe("Mongodb Models", function ()
{
    before(function (done)
    {
        if (!mongoose.connection.db)
        {
            models.connectDB(function (err)
            {
                should.not.exist(err);
                _clearDB(done);
                done();
            });
        }
        else
        {
            _clearDB(done);
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

function _clearDB(callback)
{
    _.each(mongoose.connection.collections, function (collection, name)
    {
        collection.drop(function (err)
        {
            if (err && _.isFunction(callback))
            {
                callback(err);
            }
        });
    });
}