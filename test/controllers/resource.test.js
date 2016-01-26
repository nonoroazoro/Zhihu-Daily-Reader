import should from "should";

import daily from "../../controllers/daily";
import dbhelper from "../../controllers/dbhelper";
import ResourceController from "../../controllers/resource";

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
    
    const url = "http://pic4.zhimg.com/70/6974e23d1270203c2a14fc6d410dd9e7_b.jpg";
    describe("1.saveResource", function ()
    {
        it("should save the resource of URL:\n\t" + url, function (done)
        {
            daily.fetchImage(url, function (err, res)
            {
                should.not.exist(err);
                ResourceController.saveResource(res, done);
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
