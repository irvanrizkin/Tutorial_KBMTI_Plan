const chai = require('chai');
require('dotenv').config();
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// Request
const ChaiReq = chai.request(process.env.BASE_URL);

// Test Case
const testCase = {
    "positive": {
        "index": "Ketika user mengakses index, akan mendapatkan pesan bahwa test sudah bisa.",
        "User": {
            "getAll": "As a Admin, I can get all list of user",
            "getById": "As a Admin, I can get specific user with given id.",
            "register": "As a Admin, I can register to system and get feedback.",
            "putUser": "As a Admin, I can edit another user with given id and get status code (204).",
            "delUser": "As a Admin, I can delete another user with given id and get status code (204)."
        },
    },
    "negative": {
        "User": {
            "getById404": "As a Admin, if I wrongly enter ID that not exist in Database, I get (404) and a message",
            "Register400": "As a Admin, if I not completed the field in Register. I get (400) and a message",
            "Put400": "As a Admin, if I not completed the field in Put. I get (400) and a message",
            "Put404": "As a Admin, if I enter wrong ID that not exist in Database, I get (404) and a message",
            "Del404": "As a Admin, if I enter wrong ID that not exist in Database, I get (404) and a message",
        },
    }
}

describe("User Test", () => {
    // List variable valid
    const validUserId = process.env.VALID_USER_ID;
    const first_name = "Prabowo";
    const last_name = "Subianto";
    const password = "Secret";

    // List variable not valid
    const notValidUserId = process.env.NOT_VALID_USER_ID;

    // Index Access
    it(`@get ${testCase.positive.index}`, (done) => {
        ChaiReq
            .get('/')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message');
                expect(res.body.err).to.equal(null);
            });
        done();
    });

    // Get All User
    it(`@get ${testCase.positive.User.getAll}`, (done) => {
        ChaiReq
            .get('/users/all')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('data');
                expect(res.body.data.length != 0).to.equal(true);
            })
        done();
    });

    // GetSpecificById
    it(`@get ${testCase.positive.User.getById}`, (done) => {
        ChaiReq
            .get(`/users/user/${validUserId}`)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Ini Data usernya');
                expect(res.body).to.have.property('data');
                expect(res.body.data.id).to.equal(parseInt(validUserId, 10));
            })
        done();
    });

    // Register User
    it(`@post ${testCase.positive.User.register}`, (done) => {
        ChaiReq
            .post(`/users/register`)
            .set('Content-Type', 'application/json')
            .send({ 'first_name': first_name, 'last_name': last_name, 'password': password })
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.have.property('data');
                expect(res.body.data.affectedRows).to.equal(1);
            })
        done();
    });

    // Update User
    it(`@put ${testCase.positive.User.putUser}`, (done) => {
        ChaiReq
            .put(`/users/user/${validUserId}`)
            .set('Content-Type', 'application/json')
            .send({ 'first_name': first_name, 'last_name': last_name })
            .end((err, res) => {
                expect(res.status).to.equal(204);
            })
        done();
    });

    // Delete User
    // Untuk Delete, perlu sering diganti karena data dalam database juga terhapus
    // Un Comment bilamana ingin test
    // it(`@delete ${testCase.positive.User.delUser}`, (done) => {
    //     ChaiReq
    //         .delete(`/users/user/${parseInt(16, 10)}`)
    //         .set('Content-Type', 'application/json')
    //         .end((err, res) => {
    //             expect(res.status).to.equal(204);
    //         })
    //     done();
    // })

    // Negative

    // Negative 404 ID
    it(`@get ${testCase.negative.User.getById404}`, (done) => {
        ChaiReq
            .get(`/users/user/${notValidUserId}`)
            .end((err, res) => {
                expect(res.status).to.equal(404)
                expect(res.body.message).to.equal("User not found")
            })
        done();
    });

    // Negative 400 Register
    it(`@post ${testCase.negative.User.Register400}`, (done) => {
        ChaiReq
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({ 'first_name': first_name, 'last_name': last_name, })
            .end((err, res) => {
                expect(res.status).to.equal(400)
                expect(res.body.message).contain('Validation error')
            })
        done();
    })

    // Negative 400 Put
    it(`@put ${testCase.negative.User.Register400}`, (done) => {
        ChaiReq
            .put(`/users/user/${validUserId}`)
            .set('Content-Type', 'application/json')
            .send({ 'first_name': first_name,})
            .end((err, res) => {
                expect(res.status).to.equal(400)
                expect(res.body.message).contain('Validation error')
            })
        done();
    })

    // Negative 404 Put
    it(`@put ${testCase.negative.User.Register400}`, (done) => {
        ChaiReq
            .put(`/users/user/${notValidUserId}`)
            .set('Content-Type', 'application/json')
            .send({ 'first_name': first_name, 'last_name' : last_name})
            .end((err, res) => {
                expect(res.status).to.equal(404)
                expect(res.body.message).to.equal("User not found")
            })
        done();
    })

    // Negative 404 Delete
    // Untuk Delete, perlu sering diganti karena data dalam database juga terhapus
    // Un Comment bilamana ingin test
    it(`@delete ${testCase.positive.User.delUser}`, (done) => {
        ChaiReq
            .delete(`/users/user/${notValidUserId}`)
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                expect(res.status).to.equal(404);
            })
        done();
    })
});