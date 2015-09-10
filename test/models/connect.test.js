var mongoose = require("mongoose");

describe("Mongodb Connection", function ()
{
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
