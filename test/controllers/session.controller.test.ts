import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/util/logger";
import { VideoOutputDto } from "../../src/dtos/output/videoOutput.dto";


const chai = require("chai");
const expect = chai.expect;

const dbService: DbService = new DbService();


describe("POST /session", () => {
    it("should return: 201 - CREATED + Session", (done) => {
        return request(app).post("/session")
            .send({
                "name": "Prueba"
                })
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                expect(res.body.name).to.equal("Prueba");
                done();
            });
    });
});

describe("GET /session/501d87b8b230cf35177998c0", () => {
    it("should return: 200", (done) => {
        return request(app).get("/session/501d87b8b230cf35177998c0")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                expect(res.body.name).to.equal("Session1");
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

