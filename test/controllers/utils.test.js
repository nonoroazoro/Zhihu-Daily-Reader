import moment from "moment";
import should from "should";

import utils from "../../server/controllers/utils";

describe.only("controllers/utils", () =>
{
    describe("1.convertToZhihuDate", () =>
    {
        const date1 = "20150915"; // String: Zhihu Format
        const date2 = "2015-09-15"; // String: Normal Format
        const date3 = moment(date2).toDate(); // Date
        const target = "20150915";
        it(`should convert '${date1}' to: '${target}'`, (done) =>
        {
            utils.convertToZhihuDate(date1).should.equal(target);
            done();
        });

        it(`should convert '${date2}' to: '${target}'`, (done) =>
        {
            utils.convertToZhihuDate(date2).should.equal(target);
            done();
        });

        it(`should convert '${date3}' to: '${target}'`, (done) =>
        {
            utils.convertToZhihuDate(date3).should.equal(target);
            done();
        });

        const wrongDate = "2015-30-30";
        it(`should convert '${wrongDate}' to: 'null'`, (done) =>
        {
            should(utils.convertToZhihuDate(wrongDate)).equal(null);
            done();
        });
    });

    describe("2.nextZhihuDay", () =>
    {
        const date = "20150915";
        const target = "20150916";
        it(`should convert '${date}' to: '${target}'`, (done) =>
        {
            utils.nextZhihuDay(date).should.equal(target);
            done();
        });

        const wrongDate = "20153030";
        it(`should convert '${wrongDate}' to: 'null'`, (done) =>
        {
            should(utils.nextZhihuDay(wrongDate)).equal(null);
            done();
        });
    });

    describe("3.prevZhihuDay", () =>
    {
        const date = "20150915";
        const target = "20150914";
        it(`should convert '${date}' to: '${target}'`, (done) =>
        {
            utils.prevZhihuDay(date).should.equal(target);
            done();
        });

        const wrongDate = "20153030";
        it(`should convert '${wrongDate}' to: 'null'`, (done) =>
        {
            should(utils.prevZhihuDay(wrongDate)).equal(null);
            done();
        });
    });

    describe("4.subZhihuDate", () =>
    {
        const delta = 2;
        const date = "20150915";
        const target = "20150913";
        it(`'${date}' - 2 days should equal to: '${target}'`, (done) =>
        {
            utils.subZhihuDate(date, delta).should.equal(target);
            done();
        });
    });

    describe("5.isValidZhihuDate", () =>
    {
        const date = "20150915";
        it(`'${date}' should be: valid`, (done) =>
        {
            utils.isValidZhihuDate(date).should.be.true();
            done();
        });

        const wrongDate = "20153030";
        it(`'${wrongDate}' should be: invalid`, (done) =>
        {
            utils.isValidZhihuDate(wrongDate).should.be.false();
            done();
        });
    });

    describe("6.md5", () =>
    {
        const dataCN = "逗逗";
        const targetCN = "f446616db9ce94a6be650365751a58a7";
        it(`md5 of '${dataCN}' should be: ${targetCN}`, (done) =>
        {
            utils.md5(dataCN).should.equal(targetCN);
            done();
        });

        const dataEN = "abc";
        const targetEN = "900150983cd24fb0d6963f7d28e17f72";
        it(`md5 of '${dataEN}' should be: ${targetEN}`, (done) =>
        {
            utils.md5(dataEN).should.equal(targetEN);
            done();
        });
    });
});
