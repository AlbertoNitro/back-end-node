import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import logger from "../../src/utils/logger";
import { SessionOutputDto } from "../../src/dtos/output/sessionOutput.dto";
import { SessionInputDto } from "../../src/dtos/input/sessionInput.dto";

const chai = require("chai");
const expect = chai.expect;

describe("POST /session", () => {
    it("should return: 201 - CREATED + Session", (done) => {
        const sessionInputDto: SessionInputDto = {"name": "Prueba"};
        return request(app).post("/session")
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

describe("GET /session/501d87b8b230cf35177998c0", () => {
    it("should return: 200", (done) => {
        const sessionId = "501d87b8b230cf35177998c0";
        return request(app).get("/session/" + sessionId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const sessionOutputDto: SessionOutputDto = res.body;
                expect(sessionOutputDto.name).to.equal("Session1");
                expect(sessionOutputDto.lessons.length).to.equal(0);
                done();
            });
    });
});

describe("DELETE /session/501d87b8b230cf35177998c0", () => {
    it("should return: 204", (done) => {
        const sessionId = "501d87b8b230cf35177998c0";
        return request(app).delete("/session/" + sessionId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
