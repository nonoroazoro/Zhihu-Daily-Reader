import should from "should";

import daily from "../../../controllers/crawler/daily";
import resource from "../../../controllers/resource";
import dbhelper from "../../../controllers/dbhelper";

describe("controllers/crawler/daily", function ()
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
    
    describe("1.cacheStory", function ()
    {
        this.timeout(5000);
        const id = 401;
        const date = "20130520";
        it("should cache the story of ID: " + id, function (done)
        {
            daily.cacheStory(id, date, function (err, doc)
            {
                should.not.exist(err);
                doc.id.should.equal(id);
                doc.date.should.equal(date);
                doc.cached.should.be.true();
                done();
            });
        });
    });
    
    describe("2.cacheLatestStories", function ()
    {
        this.timeout(50000);
        it("should cache the latest stories", function (done)
        {
            daily.cacheLatestStories(function (err, res)
            {
                should.not.exist(err);
                done();
            });
        });
    });
    
    describe("3.cacheStories", function ()
    {
        this.timeout(50000);
        it("should cache the stories of date: 20130519", function (done)
        {
            daily.cacheStories("20130519", function (err, res)
            {
                should.not.exist(err);
                done();
            });
        });
        
        const ids = [418, 417, 414, 413, 410, 409, 408, 407, 404];
        it("should cache the stories of date: 20130520" + " and IDs:\n\t" + ids, function (done)
        {
            daily.cacheStories("20130520", ids, function (err, res)
            {
                should.not.exist(err);
                done();
            });
        });
    });
    
    describe("4.cacheImages", function ()
    {
        this.timeout(10000);
        const url = "http://pic1.zhimg.com/70/69ceec9a0536ce5813977c8b4c8d1860_b.jpg";
        it("should cache the image:\n\t" + url, function (done)
        {
            daily.cacheImages(url, function (err, res)
            {
                should.not.exist(err);
                resource.findResourceByID(url, function (err, res)
                {
                    should.not.exist(err);
                    res.id.should.equal(url);
                    done();
                });
            });
        });
        
        const urls = [
            "http://pic3.zhimg.com/997f4ed30d3c663acde396b2d3dd528e.jpg",
            "http://pic3.zhimg.com/b18702a3f6951e5b1382a753eb0b7a6e_is.jpg",
            "http://pic4.zhimg.com/70/f1454ada08504cf5c9d0cbdc333f5c4f_b.jpg",
            "http://pic2.zhimg.com/70/f991627ec73cebd6a4056b461fa0870d_b.jpg",
            "http://pic3.zhimg.com/70/eb2b28d71c0572f90fb9c5f6754af652_b.jpg"
        ];
        it("should cache the images:\n\t" + urls.join("\n\t"), function (done)
        {
            daily.cacheImages(urls, function (err, res)
            {
                should.not.exist(err);
                resource.query({ id: { $in : urls } }, { id: 1, _id: 0 }, function (err, docs)
                {
                    should.not.exist(err);
                    docs.length.should.equal(5);
                    done();
                });
            });
        });
    });
});
