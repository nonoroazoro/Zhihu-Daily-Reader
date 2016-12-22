import should from "should";

import daily from "../../../server/controllers/crawler/daily";
import resource from "../../../server/controllers/resource";
import dbhelper from "../../../server/controllers/dbhelper";

describe("controllers/crawler/daily", () =>
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

    describe("1.cacheStory", function ()
    {
        this.timeout(5000);
        const id = 401;
        const date = "20130520";
        it(`should cache the story of ID: ${id}`, (done) =>
        {
            daily.cacheStory(id, date, (err, doc) =>
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
        it("should cache the latest stories", (done) =>
        {
            daily.cacheLatestStories((err, res) =>
            {
                should.not.exist(err);
                done();
            });
        });
    });

    describe("3.cacheStories", function ()
    {
        this.timeout(50000);
        it("should cache the stories of date: 20130519", (done) =>
        {
            daily.cacheStories("20130519", (err, res) =>
            {
                should.not.exist(err);
                done();
            });
        });

        const ids = [418, 417, 414, 413, 410, 409, 408, 407, 404];
        it(`should cache the stories of date: 20130520 and IDs:\n\t${ids}`, (done) =>
        {
            daily.cacheStories("20130520", ids, (err, res) =>
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
        it(`should cache the image:\n\t${url}`, (done) =>
        {
            daily.cacheImages(url, (err1, res1) =>
            {
                should.not.exist(err1);
                resource.findResourceByID(url, (err2, res2) =>
                {
                    should.not.exist(err2);
                    res2.id.should.equal(url);
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
        it(`should cache the images:\n\t${urls.join("\n\t")}`, (done) =>
        {
            daily.cacheImages(urls, (err1, res1) =>
            {
                should.not.exist(err1);
                resource.query({ id: { $in: urls } }, { id: 1, _id: 0 }, (err2, docs) =>
                {
                    should.not.exist(err2);
                    docs.length.should.equal(5);
                    done();
                });
            });
        });
    });
});
