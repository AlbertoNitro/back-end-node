import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import logger from "../../src/utils/logger";
import { UnitOutputDto } from "../../src/dtos/output/unitOutput.dto";
import { NeighborsOutputDto } from "../../src/dtos/output/neighborsOutput.dto";
import { RelatedUnitsOutputDto } from "../../src/dtos/output/relatedUnitsOutput.dto";
import { UnitInputDto } from "../../src/dtos/input/unitInput.dto";

const chai = require("chai");
const expect = chai.expect;

const END_POINT = "/unit";
const ID = "/:id";
const FRIENDS = "/friends";
const NOT_RELATED = "/notrelated";
const SEARCH = "/search";

describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.CREATED} + UnitOutputDto`, (done) => {
        return request(app).post(END_POINT)
            .send({"name": "Unidad2000" })
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const unitOutputDto: UnitOutputDto = res.body;
                expect(unitOutputDto.name).to.equal("Unidad2000");
                done();
            });
    });
});
describe("DELETE " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        const unitCode = 99999;
        return request(app).delete(END_POINT + "/" + unitCode)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
  });
});
describe("DELETE " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.NO_CONTENT}`, (done) => {
        const unitCode = 60;
        return request(app).delete(END_POINT + "/" + unitCode)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
describe("DELETE " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.NO_CONTENT}`, (done) => {
        const unitCode = 52;
        return request(app).delete(END_POINT + "/" + unitCode)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
describe("DELETE " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.NO_CONTENT}`, (done) => {
        const unitCode = 58;
        return request(app).delete(END_POINT + "/" + unitCode)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
describe("GET " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.OK} + UnitOutputDto[]`, (done) => {
        return request(app).get(END_POINT)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const unitOutputDtos: UnitOutputDto[] = res.body;
                expect(unitOutputDtos.length).to.be.above(9);
                done();
            });
    });
});
describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + UnitOutputDto`, (done) => {
        const unitCode = 61;
        return request(app).get(END_POINT + "/" + unitCode)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const unitOutputDto: UnitOutputDto = res.body;
                expect(unitOutputDto.code).to.equal(unitCode);
                done();
            });
    });
});
describe("GET " + END_POINT + SEARCH + "?name=X", () => {
    it(`expect return: ${HttpStatusCode.OK} + UnitOutputDto[]`, (done) => {
        const nameToSearch = "Unidad";
        return request(app).get(END_POINT + SEARCH + "?name=" + nameToSearch)
        .end( (err, res) => {
            expect(res.status).to.equal(HttpStatusCode.OK);
            const relatedUnitsOutputDtos: RelatedUnitsOutputDto[] = res.body;
            expect(relatedUnitsOutputDtos.length).to.be.above(9);
            done();
        });
  });
});
describe("GET " + END_POINT + FRIENDS + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + UnitOutputDto[]`, (done) => {
        const unitCode = 51;
        return request(app).get(END_POINT + FRIENDS + "/" + unitCode)
            .end( (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const cincoNivelesOutputDto: NeighborsOutputDto = res.body;
                expect(cincoNivelesOutputDto.unit.code).to.equal(51);
                expect(cincoNivelesOutputDto.topUnits[0].code).to.equal(50);
                expect(cincoNivelesOutputDto.lowerUnits.length).to.equal(3);
                expect(cincoNivelesOutputDto.relations.length).to.equal(4);
                done();
          });
    });
});
describe("GET " + END_POINT + FRIENDS + ID, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        const unitCode = 99999;
        return request(app).get(END_POINT + FRIENDS + "/" + unitCode)
            .end( (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
    });
});
describe("GET " + END_POINT + NOT_RELATED, () => {
    it(`expect return: ${HttpStatusCode.OK} + UnitOutputDto[]`, (done) => {
        return request(app).get(END_POINT + NOT_RELATED)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const unitOutputDtos: UnitOutputDto[] = res.body;
                expect(unitOutputDtos.length).to.be.above(1);
                done();
            });
    });
});
describe("PUT " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + UnitOutputDto`, (done) => {
        const unitCode = "64";
        const unitInputDto: UnitInputDto = {name: "UnidadModificada", content: "{\"ejemplo\": \"¿Porque?\"}"};
        return request(app).put(END_POINT + "/" + unitCode)
            .send(unitInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const unitOutputDto: UnitOutputDto = res.body;
                expect(unitOutputDto.name).to.equal(unitInputDto.name);
                expect(unitOutputDto.content).to.equal(unitInputDto.content);
                done();
            });
    });
});