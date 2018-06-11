import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import logger from "../../src/utils/logger";
import { ItineraryInputDto } from "../../src/dtos/input/itineraryInput.dto";
import { ItineraryOutputDto } from "../../src/dtos/output/itineraryOutput.dto";

const chai = require("chai");
const expect = chai.expect;

describe("POST /itinerary", () => {
    it("should return: 201 - CREATED + Itinerary", (done) => {
        const itineraryInputDto: ItineraryInputDto = {"name": "Prueba"};
        return request(app).post("/itinerary")
            .send(itineraryInputDto)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal(itineraryInputDto.name);
                expect(itineraryOutputDto.formations.length).to.equal(0);
                done();
            });
    });
});

describe("GET /itinerary/511d87b8b230cf35177998c0", () => {
    it("should return: 200", (done) => {
        return request(app).get("/itinerary/511d87b8b230cf35177998c0")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal("Itinerary1");
                expect(itineraryOutputDto.formations.length).to.equal(0);
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
