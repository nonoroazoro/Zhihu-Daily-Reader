var async = require("async");
var should = require("should");
var mongoose = require("mongoose");

var Status = require("../../models/status");
var database = require("../../controllers/database");

describe("models/status", function ()
{
    before(function (done)
    {
        if (database.connected())
        {
            database.dropAllCollections(done);
        }
        else
        {
            database.connect(function (err)
            {
                should.not.exist(err);
                database.dropAllCollections(done);
            });
        }
    });
    
    describe("#create", function ()
    {
        it("should create a new status: Zoro, 20150914, 20150910", function (done)
        {
            new Status({
                username : "Zoro",
                newest : "20150914",
                oldest : "20150910",
            }).save(done);
        });
    });
    
    describe("#find", function ()
    {
        it("should find the status of: Zoro", function (done)
        {
            Status.findOne({ username: "Zoro" }, function (err, res)
            {
                should.not.exist(err);
                res.username.should.equal("Zoro");
                res.newest.should.equal("20150914");
                res.oldest.should.equal("20150910");
                done();
            });
        });
    });
});
