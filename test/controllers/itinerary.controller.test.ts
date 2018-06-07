import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import logger from "../../src/util/logger";

const chai = require("chai");
const expect = chai.expect;

describe("POST /itinerary", () => {
    it("should return: 201 - CREATED + Itinerary", (done) => {
        return request(app).post("/itinerary")
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

describe("GET /itinerary/511d87b8b230cf35177998c0", () => {
    it("should return: 200", (done) => {
        return request(app).get("/itinerary/511d87b8b230cf35177998c0")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                expect(res.body.name).to.equal("Itinerary1");
                done();
            });
    });
});

describe("DELETE /itinerary/511d87b8b230cf35177998c0", () => {
    it("should return: 204", (done) => {
        return request(app).delete("/itinerary/511d87b8b230cf35177998c0")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
