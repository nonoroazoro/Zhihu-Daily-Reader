import should from "should";

import daily from "../../server/controllers/daily";
import dbhelper from "../../server/controllers/dbhelper";
import CatalogController from "../../server/controllers/catalog";

describe("controllers/catalog", () =>
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

    let ids = [];
    const date = "20151214";
    describe("1.saveCatalog", () =>
    {
        it(`should save the catalog of date: ${date}`, (done) =>
        {
            daily.fetchStoryIDs(date, (err1, res1) =>
            {
                should.not.exist(err1);
                ids = res1.ids;
                CatalogController.saveCatalog(res1, (err2, doc) =>
                {
                    should.not.exist(err2);
                    doc.date.should.equal(date);
                    doc.ids.join("").should.equal(ids.join(""));
                    done();
                });
            });
        });
    });

    describe("2.findCatalogByDate", () =>
    {
        it(`should find the catalog of date: ${date}`, (done) =>
        {
            CatalogController.findCatalogByDate(date, (err, doc) =>
            {
                should.not.exist(err);
                doc.date.should.equal(date);
                doc.ids.join("").should.equal(ids.join(""));
                done();
            });
        });
    });
});
