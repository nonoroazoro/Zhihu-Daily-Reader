import should from "should";

import Status from "../../server/models/status";
import StatusController from "../../server/controllers/status";
import dbhelper from "../../server/controllers/dbhelper";

describe("controllers/status", () =>
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
        it("should create a new status: Zoro, 20150915, 20150910", (done) =>
        {
            new Status({
                username: "Zoro",
                startDate: "20150909",
                endDate: "20150910"
            }).save(done);
        });
    });

    describe("2.findStatusByUsername", () =>
    {
        const username = "Zoro";
        it(`should find the status of user: '${username}'`, (done) =>
        {
            StatusController.findStatusByUsername(username, (err, doc) =>
            {
                should.not.exist(err);
                should.exist(doc);
                doc.username.should.equal(username);
                done();
            });
        });

        const wrongUsername = " ";
        it(`should not find the status of user: '${wrongUsername}'`, (done) =>
        {
            StatusController.findStatusByUsername(wrongUsername, (err, doc) =>
            {
                should.not.exist(doc);
                done();
            });
        });
    });

    describe("3.saveStatus", () =>
    {
        it("should save the status of: Zoro, , 20150910", (done) =>
        {
            const status = {
                username: "Zoro",
                endDate: "20150910"
            };

            StatusController.saveStatus(status, (err, doc) =>
            {
                should.not.exist(err);
                should.exist(doc);
                doc.username.should.equal(status.username);
                doc.endDate.should.equal(status.endDate);
                done();
            });
        });
    });
});
