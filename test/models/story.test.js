var should = require("should");
var mongoose = require("mongoose");

var Story = require("../../models/story");
var dbhelper = require("../../controllers/dbhelper");

describe("models/story", function ()
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
