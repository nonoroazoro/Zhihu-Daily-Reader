var _ = require("lodash");
var should = require("should");

var daily = require("../../controllers/daily");
var dbhelper = require("../../controllers/dbhelper");
var Catalog = require("../../models/catalog");
var CatalogController = require("../../controllers/catalog");

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
    
    var date = "20151214";
    var ids = [];
    describe("1.saveCatalog", function ()
    {
        it("should save the catalog of date: " + date, function (done)
        {
            daily.fetchStoryIDs(date, function (err, res)
            {
                should.not.exist(err);
                ids = res.ids;
                CatalogController.saveCatalog({
                    date: date, 
                    ids: res.ids
                }, function (err, doc)
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
