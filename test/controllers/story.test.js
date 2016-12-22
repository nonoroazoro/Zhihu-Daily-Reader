import should from "should";

import Story from "../../server/models/story";
import StoryController from "../../server/controllers/story";
import dbhelper from "../../server/controllers/dbhelper";

describe("controllers/story", () =>
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

    describe("1.init", () =>
    {
        it("should create new stories: id[0~9], date[20140909, 20150910]", (done) =>
        {
            const stories = [];
            for (let i = 0; i < 5; i++)
            {
                stories.push({
                    id: i,
                    date: "20150909",
                    read: (i <= 2),
                    content: `神经科学/生物学${i}`,
                    cached: (i <= 2)
                });
            }

            for (let i = 5; i < 10; i++)
            {
                stories.push({
                    id: i,
                    date: "20150910",
                    read: (i >= 7),
                    content: `神经科学/生物学${i}`,
                    cached: (i >= 7)
                });
            }

            Story.create(stories, (err, res) =>
            {
                should.not.exist(err);
                done();
            });
        });
    });

    describe("2.findStoryByID", () =>
    {
        const id = 3;
        it(`should find the story of ID: ${id}`, (done) =>
        {
            StoryController.findStoryByID(id, (err, doc) =>
            {
                should.not.exist(err);
                should.exist(doc);
                doc.id.should.equal(id);
                done();
            });
        });
    });

    describe("3.findStoriesByDate", () =>
    {
        const date = "20150910";
        it(`should find the stories of date: ${date}`, (done) =>
        {
            StoryController.findStoriesByDate(date, (err, docs) =>
            {
                should.not.exist(err);
                should.exist(docs);
                docs.length.should.equal(5);
                docs.forEach((value, index) =>
                {
                    value.date.should.equal(date);
                });
                done();
            });
        });
    });

    describe("4.findUnreadStories", () =>
    {
        const date = "20150910";
        it(`should find the unread stories of date: ${date}`, (done) =>
        {
            StoryController.findUnreadStories(date, (err, docs) =>
            {
                should.not.exist(err);
                should.exist(docs);
                docs.length.should.equal(2);
                docs.forEach((value, index) =>
                {
                    value.date.should.equal(date);
                    value.read.should.be.false();
                });
                done();
            });
        });

        it("should find all of the unread stories", (done) =>
        {
            StoryController.findUnreadStories((err, docs) =>
            {
                should.not.exist(err);
                should.exist(docs);
                docs.length.should.equal(4);
                docs.forEach((value, index) =>
                {
                    value.read.should.be.false();
                });
                done();
            });
        });
    });

    describe("5.findUncachedIDs", () =>
    {
        it("should find all uncached id", (done) =>
        {
            StoryController.findUncachedIDs((err, docs) =>
            {
                should.not.exist(err);
                should.exist(docs);
                docs.length.should.equal(4);
                done();
            });
        });
    });

    describe("6.saveStory", () =>
    {
        it("should save story", (done) =>
        {
            const zhihuStory = {
                id: 401,
                date: "20150911",
                title: "学英语才是正经事儿",
                imageSource: "人民教育出版社",
                contents: [{ title: "神经科学/生物学3 - 修改" }]
            };

            StoryController.saveStory(zhihuStory, (err, doc) =>
            {
                should.not.exist(err);
                should.exist(doc);
                doc.content.should.deepEqual(zhihuStory);
                done();
            });
        });

        it("should not save null story", (done) =>
        {
            StoryController.saveStory(null, (err, doc) =>
            {
                should.exist(err);
                should.not.exist(doc);
                done();
            });
        });
    });

    describe("7.removeOldStories", () =>
    {
        const date = "20150910";
        it(`should remove stories older than: ${date}`, (done) =>
        {
            StoryController.removeOldStories(date, (err, res) =>
            {
                should.not.exist(err);
                should.exist(res);
                res.success.should.be.true();
                res.count.should.equal(5);
                done();
            });
        });
    });
});
