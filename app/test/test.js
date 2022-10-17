const chai = require('chai');
const superagent = require('superagent');
const BASE_URL = "http://localhost:3000/api/operationHours/openStores";
const expect = require('chai').expect;
const answers = require('./test-answers');

describe('Sunday at 7 am', () => {
    let test_data = "?date=2022/10/09 07:48:02";

    it('Test 1', () => {
        superagent
        .get(`${BASE_URL}${test_data}`)
        .end((err, res) => {
            if (err) done(err);
            expect(res.body[0].name).to.equal(answers.test1[0].name);
        })
    });
});

describe('Sunday at 3 am', () => {
    let test_data = "?date=2022/10/09 03:48:02";

    it('Test 2', () => {
        superagent
            .get(`${BASE_URL}${test_data}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body[0].name).to.equal(answers.test2[0].name);
            })
    });
});

describe('Monday at 12:30 am', () => {
    let test_data = "?date=2022/10/10 00:30:02";

    it('Test 3', () => {
        superagent
            .get(`${BASE_URL}${test_data}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.length).to.equal(answers.test3);
            })
    });
});

describe('Wednesday at 2:30 pm', () => {
    let test_data = "?date=2022/10/12 13:30:02";

    it('Test 4', () => {
        superagent
            .get(`${BASE_URL}${test_data}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.length).to.equal(answers.test4);
            })
    });
});

describe('Wednesday at midnight', () => {
    let test_data = "?date=2022/10/12 00:00:00";

    it('Test 5', () => {
        superagent
            .get(`${BASE_URL}${test_data}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.length).to.equal(answers.test5);
            })
    });
});

describe('Saturday at 6:59:59 AM', () => {
    let test_data = "?date=10-08-2022 06:59:59";

    it('Test 6', () => {
        superagent
            .get(`${BASE_URL}${test_data}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body).to.equal(answers.test6);
            })
    });
});

describe('Saturday at 7 AM', () => {
    let test_data = "?date=10-08-2022 07:00:00";

    it('Test 7', () => {
        superagent
            .get(`${BASE_URL}${test_data}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body[0].name).to.equal(answers.test7.name);
            })
    });
});

describe('Saturday No Time', () => {
    let test_data = "?date=10-08-2022";

    it('Test 8', () => {
        superagent
            .get(`${BASE_URL}${test_data}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.length).to.equal(answers.test8);
            })
    });
});

describe('Invalid Date Time', () => {
    let test_data = "?date=10-08-2022T11:00:00";

    it('Test 9', () => {
        superagent
            .get(`${BASE_URL}${test_data}`)
            .end((err, res) => {
                if (err) done(err);
                console.log(res.body.length);
                expect(res.body[0].message).to.equal(answers.test9.message);
            })
    });
});

describe('Sunday Midnight', () => {
    let test_data = "?date=10-09-2022 00:00:00";

    it('Test 10', () => {
        superagent
            .get(`${BASE_URL}${test_data}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.length).to.equal(answers.test10);
            })
    });
});