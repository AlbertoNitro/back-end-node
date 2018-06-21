import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import logger from "../../src/utils/logger";
import { SessionOutputDto } from "../../src/dtos/output/sessionOutput.dto";
import { SessionInputDto } from "../../src/dtos/input/sessionInput.dto";

const chai = require("chai");
const expect = chai.expect;

const END_POINT = "/session";
const ID = "/:id";

describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.CREATED} + SessionOutputDto`, (done) => {
        const sessionInputDto: SessionInputDto = {itineraryId: "666d66b4b122cf35117155c5", "name": "Sesion4"};
        return request(app).post(END_POINT)
            .send(sessionInputDto)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const sessionOutputDto: SessionOutputDto = res.body;
                expect(sessionOutputDto.name).to.equal(sessionInputDto.name);
                expect(sessionOutputDto.lessons.length).to.equal(0);
                done();
            });
    });
});
describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + SessionOutputDto`, (done) => {
        const sessionId = "862d87b8b522cf35117998c1";
        return request(app).get(END_POINT + "/" + sessionId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const sessionOutputDto: SessionOutputDto = res.body;
                expect(sessionOutputDto.name).to.equal("Sesion0");
                expect(sessionOutputDto.lessons.length).to.equal(0);
                done();
            });
    });
});
describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + SessionOutputDto`, (done) => {
        const sessionId = "665d87b4b122cf35117198c2";
        return request(app).get(END_POINT + "/" + sessionId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const sessionOutputDto: SessionOutputDto = res.body;
                expect(sessionOutputDto.name).to.equal("Sesion2");
                expect(sessionOutputDto.lessons.length).to.equal(2);
                done();
            });
    });
});
describe("DELETE " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.NO_CONTENT}`, (done) => {
        const sessionId = "763d87b8b122cf35117998c2";
        return request(app).delete(END_POINT + "/" + sessionId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
describe("PUT " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + SessionOutputDto`, (done) => {
        const sessionId = "991d87b2b122cf35117993c2";
        const sessionInputDto: SessionInputDto = {"name": "Sesion99"};
        return request(app).put(END_POINT + "/" + sessionId)
            .send(sessionInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const sessionOutputDto: SessionOutputDto = res.body;
                expect(sessionOutputDto.name).to.equal(sessionInputDto.name);
                done();
            });
    });
});
