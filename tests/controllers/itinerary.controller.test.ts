import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import logger from "../../src/utils/logger";
import { ItineraryInputDto } from "../../src/dtos/input/itineraryInput.dto";
import { ItineraryOutputDto } from "../../src/dtos/output/itineraryOutput.dto";

const chai = require("chai");
const expect = chai.expect;

const END_POINT = "/itinerary";
const ID = "/:id";

describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.CREATED} + ItineraryOutputDto`, (done) => {
        const itineraryInputDto: ItineraryInputDto = {itineraryId: "999d66b4b122cf35117999c5", name: "Itinerario10"};
        return request(app).post(END_POINT)
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
describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.CREATED} + ItineraryOutputDto`, (done) => {
        const itineraryInputDto: ItineraryInputDto = {unitCode: 63, name: "Itinerario300"};
        return request(app).post(END_POINT)
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
describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + ItineraryOutputDto`, (done) => {
        const itineraryId = "515d87b4b122cf35117198c2";
        return request(app).get(END_POINT + "/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal("Itinerario0");
                expect(itineraryOutputDto.formations.length).to.equal(0);
                done();
            });
    });
});
describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + ItineraryOutputDto`, (done) => {
        const itineraryId = "415d87b4b122cf35117198c3";
        return request(app).get(END_POINT + "/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal("Itinerario1");
                expect(itineraryOutputDto.formations.length).to.equal(1);
                done();
            });
    });
});
describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + ItineraryOutputDto`, (done) => {
        const itineraryId = "315d87b4b122cf35117198c4";
        return request(app).get(END_POINT + "/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal("Itinerario2");
                expect(itineraryOutputDto.formations.length).to.equal(1);
                done();
            });
    });
});
describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + ItineraryOutputDto`, (done) => {
        const itineraryId = "215d87b4b122cf35117198c5";
        return request(app).get(END_POINT + "/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal("Itinerario3");
                expect(itineraryOutputDto.formations.length).to.equal(2);
                done();
            });
    });
});
describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + ItineraryOutputDto`, (done) => {
        const itineraryId = "115d87b4b122cf35117198c5";
        return request(app).get(END_POINT + "/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal("Itinerario4");
                expect(itineraryOutputDto.formations.length).to.equal(2);
                done();
            });
    });
});
describe("GET " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.OK} + ItineraryOutputDto[]`, (done) => {
        return request(app).get(END_POINT)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDtos: ItineraryOutputDto[] = res.body;
                expect(itineraryOutputDtos.length).to.be.above(10);
                done();
            });
    });
});
describe("DELETE " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.NO_CONTENT}`, (done) => {
        const itineraryId = "426d87b4b122cf35117198c6";
        return request(app).delete(END_POINT + "/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
describe("DELETE " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.NO_CONTENT}`, (done) => {
        const itineraryId = "326d87b4b122cf35117198c7";
        return request(app).delete(END_POINT + "/" + itineraryId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
describe("PUT " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + ItineraryOutputDto`, (done) => {
        const itineraryId = "699d87b4b192cf35667198c4";
        const itineraryInputDto: ItineraryInputDto = {"name": "Itinerario99"};
        return request(app).put(END_POINT + "/" + itineraryId)
            .send(itineraryInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const itineraryOutputDto: ItineraryOutputDto = res.body;
                expect(itineraryOutputDto.name).to.equal(itineraryInputDto.name);
                done();
            });
    });
});
