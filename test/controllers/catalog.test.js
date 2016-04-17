import should from "should";

import daily from "../../controllers/daily";
import dbhelper from "../../controllers/dbhelper";
import CatalogController from "../../controllers/catalog";

describe("controllers/catalog", function ()
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
    
    let ids = [];
    const date = "20151214";
    describe("1.saveCatalog", function ()
    {
        it("should save the catalog of date: " + date, function (done)
        {
            daily.fetchStoryIDs(date, function (err, res)
            {
                should.not.exist(err);
                ids = res.ids;
                CatalogController.saveCatalog(res, function (err, doc)
                {
                    should.not.exist(err);
                    doc.date.should.equal(date);
                    doc.ids.join("").should.equal(ids.join(""));
                    done();
                });
            });
        });
    });
    
    describe("2.findCatalogByDate", function ()
    {
        it("should find the catalog of date: " + date, function (done)
        {
            CatalogController.findCatalogByDate(date, function (err, doc)
            {
                should.not.exist(err);
                doc.date.should.equal(date);
                doc.ids.join("").should.equal(ids.join(""));
                done();
            });
        });
    });
});
