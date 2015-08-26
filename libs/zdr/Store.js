var mongoose = require("mongoose");

/**
 * 测试。
 */
function test()
{
    mongoose.connect("mongodb://localhost/zhihu");
    
    var db = mongoose.connection;
    db.on("error", function callback()
    {
        console.log("Connection error");
    });
    
    db.once("open", function callback()
    {
        console.log("Mongo working!");
    });
    
    
    var Schema = mongoose.Schema;
    var userSchema = new Schema({
        name : String,
        age : Number,
        DOB : Date,
        isAlive : Boolean
    });
    
    var User = mongoose.model("User", userSchema);
    
    var newUser = new User({
        name : "Arvind",
        age : 99,
        DOB : "01/01/1915",
        isAlive : true
    });
    
    newUser.save(function (err, data)
    {
        if (err)
        {
            console.log(err);
        }
        else
        {
            console.log("Saved : ", data);
        }
    });

}

exports.test = test;
