import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { Unit } from "../../src/models/unit.model";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/util/logger";
import { UnitBuilder } from "../../src/models/builders/unit.builder";
import { Relation } from "../../src/models/relation.model";
import {CincoNivelesOutputDto} from "../../src/dtos/cincoNivelesOutput.dto";

const chai = require("chai");
const expect = chai.expect;

const dbService: DbService = new DbService();

beforeAll( async (done) => {
    const successDeleteDb: boolean = await dbService.delete();
    if (!successDeleteDb) {
        logger.error("Abortando lanzamiento de pruebas, fallo al resetear DB.");
        process.exit();
    }
    const successSeedDb: boolean = await dbService.seed();
    if (!successSeedDb) {
        logger.error("Abortando lanzamiento de pruebas, fallo al poblar DB.");
        process.exit();
    }
    done();
});

describe("POST /unit", () => {
    it("should return: 201 - CREATED + Unit", (done) => {
        return request(app).post("/unit")
            .send({"name": "Unidad2000" })
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                expect(res.body.name).to.equal("Unidad2000");
                done();
            });
    });
});

describe("DELETE /unit/:code", () => {
    it("should return 404 - NOT FOUND", (done) => {
        const codeUnit = 99999;
        return request(app).delete("/unit/" + codeUnit)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
  });
});

describe("DELETE /unit/:code", () => {
    it("should return 204 - NOT CONTENT", (done) => {
        const codeUnit = 60;
        return request(app).delete("/unit/" + codeUnit)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});

describe("DELETE /unit/:code", () => {
    it("should return 204 - NOT CONTENT", (done) => {
        const codeUnit = 55;
        return request(app).delete("/unit/" + codeUnit)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});

describe("DELETE /unit/:code", () => {
    it("should return 204 - NOT CONTENT", (done) => {
        const codeUnit = 50;
        return request(app).delete("/unit/" + codeUnit)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});

describe("GET /unit", () => {
    it("should return 200 - OK and Unit[]", (done) => {
        return request(app).get("/unit")
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const units: Unit[] = res.body;
                expect(units.length).to.be.above(9);
                done();
            });
    });
});

describe("GET /unit/:code", () => {
    it("should return 200 - OK and Unit", (done) => {
        const codeUnit = 61;
        return request(app).get("/unit/" + codeUnit)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                expect(res.body.code).to.equal(codeUnit);
                done();
            });
    });
});

describe("GET /unit/search/:name", () => {
    it("should return 200 - OK and Unit[]", (done) => {
        const nameToSearch = "Unidad";
        return request(app).get("/unit/search?name=" + nameToSearch)
        .end( (err, res) => {
            expect(res.status).to.equal(HttpStatusCode.OK);
            const units: Unit[] = res.body;
            expect(units.length).to.be.above(9);
            done();
        });
  });
});

describe("GET /unit/friends/:code", () => {
    it("should return 200 - OK and Unit[]", (done) => {
        const codeUnit = 51;
        return request(app).get("/unit/friends/" + codeUnit)
            .end( (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const cincoNivelesOutputDto: CincoNivelesOutputDto = res.body;
                expect(cincoNivelesOutputDto.unit.code).to.equal(51);
                expect(cincoNivelesOutputDto.topUnits[0].code).to.equal(50);
                expect(cincoNivelesOutputDto.lowerUnits.length).to.equal(3);
                expect(cincoNivelesOutputDto.relations.length).to.equal(4);
                done();
          });
    });
});
