import should from "should";

import daily from "../../server/controllers/daily";
import dbhelper from "../../server/controllers/dbhelper";
import ResourceController from "../../server/controllers/resource";

describe("controllers/resource", () =>
{
    before((done) =>
    {
        if (dbhelper.connected())
        {
            dbhelper.dropAllCollections(done);
        }
        else
        {
            dbhelper.connect((err) =>
            {
                should.not.exist(err);
                dbhelper.dropAllCollections(done);
            });
        }
    });

    const url = "http://pic4.zhimg.com/70/6974e23d1270203c2a14fc6d410dd9e7_b.jpg";
    describe("1.saveResource", () =>
    {
        it(`should save the resource of URL:\n\t${url}`, (done) =>
        {
            daily.fetchImage(url, (err, res) =>
            {
                should.not.exist(err);
                ResourceController.saveResource(res, done);
            });
        });
    });

    describe("2.findResourceByID", () =>
    {
        it(`should find the resource of ID:\n\t${url}`, (done) =>
        {
            ResourceController.findResourceByID(url, (err, doc) =>
            {
                should.not.exist(err);
                doc.id.should.equal(url);
                done();
            });
        });
    });
});
