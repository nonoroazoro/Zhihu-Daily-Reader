var _ = require("lodash");
var should = require("should");
var request = require("request");

var utils = require("../../controllers/utils");
var dbhelper = require("../../controllers/dbhelper");
var Resource = require("../../models/resource");
var ResourceController = require("../../controllers/resource");

describe("controllers/resource", function ()
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
    
    var url = "http://pic4.zhimg.com/70/6974e23d1270203c2a14fc6d410dd9e7_b.jpg";
    describe("1.saveResource", function ()
    {
        it("should save the resource of URL:\n\t" + url, function (done)
        {
            request({ url: url, encoding: null }, function (err, res, body)
            {
                if (!err && res.statusCode == 200)
                {
                    ResourceController.saveResource({
                        id: url,
                        contentType: res.headers["content-type"],
                        data: body
                    }, done);
                }
                else
                {
                    done(err);
                }
            });
        });
    });
    
    describe("2.findResourceByID", function ()
    {
        it("should find the resource of ID:\n\t" + url, function (done)
        {
            ResourceController.findResourceByID(url, function (err, doc)
            {
                should.not.exist(err);
                doc.id.should.equal(url);
                done();
            });
        });
    });
});
