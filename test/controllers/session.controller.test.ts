import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import logger from "../../src/util/logger";
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
        return request(app).get("/session/501d87b8b230cf35177998c0")
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
        return request(app).delete("/session/501d87b8b230cf35177998c0")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
