import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import logger from "../../src/util/logger";

const chai = require("chai");
const expect = chai.expect;

describe("POST /exercise", () => {
    it("should return: 201 - CREATED + Exercise", (done) => {
        return request(app).post("/exercise")
            .send({
                "formulation": "Prueba"
                })
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                expect(res.body.formulation).to.equal("Prueba");
                done();
            });
    });
});

describe("GET /exercise/361d87b8b230cf35177998c0", () => {
    it("should return: 200", (done) => {
        return request(app).get("/exercise/361d87b8b230cf35177998c0")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                expect(res.body.formulation).to.equal("¿En que año se descubrio la luna?");
                done();
            });
    });
});

describe("DELETE /exercise/361d87b8b230cf35177998c0", () => {
    it("should return: 204", (done) => {
        return request(app).delete("/exercise/361d87b8b230cf35177998c0")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
