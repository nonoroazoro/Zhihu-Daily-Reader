var should = require("should");
var mongoose = require("mongoose");

var models = require("../../models");

describe("Mongodb Connection", function ()
{
    before(function (done)
    {
        if (!mongoose.connection.db)
        {
            models.connectDB(function (err)
            {
                should.not.exist(err);
                done();
            });
        }
        else
        {
            done();
        }
    });
    
    describe("Connect", function ()
    {
        it("should create a new UserSchema", function (done)
        {
            var Schema = mongoose.Schema;
            var userSchema = new Schema({
                name : String,
                age : Number,
                DOB : Date,
                isAlive : Boolean
            });
            mongoose.model("User", userSchema);
            done();
        });
        
        it("should create a new User", function (done)
        {
            var User = mongoose.model("User");
            var newUser = new User({
                name : "Arvind",
                age : 99,
                DOB : "01/01/1915",
                isAlive : true
            });
            newUser.save(done);
        });
    });
    
    after(function ()
    {
        var User = mongoose.model("User");
        User.findOneAndRemove({ name: "Arvind" });
    });
});
