import should from "should";

import daily from "../../server/controllers/daily";
import utils from "../../server/controllers/utils";

describe("controllers/daily", () =>
{
    describe("1.fetchLatestStoryIDs", () =>
    {
        it("should fetch the latest story IDs", (done) =>
        {
            daily.fetchLatestStoryIDs((err, res) =>
            {
                should.not.exist(err);
                res.date.should.equal(utils.convertToZhihuDate(new Date()));
                done();
            });
        });
    });

    describe("2.fetchStoryIDs", () =>
    {
        it("should fetch the story IDs of date: 20130519", (done) =>
        {
            const date = "20130519";
            const target = {
                date: "20130519",
                ids: [401, 396, 395, 394, 390, 388]
            };
            daily.fetchStoryIDs(date, (err, res) =>
            {
                should.not.exist(err);
                res.date.should.equal(date);
                res.should.deepEqual(target);
                done();
            });
        });

        it("should not fetch the story IDs of date: 20130518", (done) =>
        {
            const date = "20130518";
            const target = {};
            daily.fetchStoryIDs(date, (err, res) =>
            {
                should.not.exist(err);
                res.should.deepEqual(target);
                done();
            });
        });

        it("should not fetch the story IDs of date: 20133030", (done) =>
        {
            const date = "20133030";
            daily.fetchStoryIDs(date, (err, res) =>
            {
                should.exist(err);
                done();
            });
        });
    });

    describe("3.fetchStory", () =>
    {
        it("should fetch the story of ID: 401", (done) =>
        {
            const id = 401;
            const title = "学英语才是正经事儿";
            const imageSource = "人民教育出版社";
            const shareURL = "http://daily.zhihu.com/story/401";
            daily.fetchStory(id, (err, res) =>
            {
                should.not.exist(err);
                res.story.id.should.equal(id);
                res.story.title.should.equal(title);
                res.story.imageSource.should.equal(imageSource);
                res.story.shareURL.should.equal(shareURL);
                done();
            });
        });
    });
});
