import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { Unit } from "../../src/models/unit.model";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/util/logger";

const chai = require("chai");
const expect = chai.expect;

const dbService: DbService = new DbService();

beforeEach( async (done) => {
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
              expect(HttpStatusCode.CREATED).to.equal(res.status);
              expect("Unidad2000").to.equal(res.body.name);
              done();
            });
    });
});

describe("DELETE /unit/:code", () => {
  it("should return 404 - NOT FOUND", (done) => {
      const codeUnit = 99999;
      return request(app).delete("/unit/" + codeUnit)
          .end( async (err, res) => {
              expect(HttpStatusCode.NOT_FOUND).to.equal(res.status);
              done();
          });
  });
});

describe("DELETE /unit/:code", () => {
    it("should return 204 - NOT CONTENT", (done) => {
        const codeUnit = 60;
        return request(app).delete("/unit/" + codeUnit)
            .end( async (err, res) => {
                expect(HttpStatusCode.NO_CONTENT).to.equal(res.status);
                done();
            });
    });
});

describe("DELETE /unit/:code", () => {
    it("should return 204 - NOT CONTENT", (done) => {
        const codeUnit = 55;
        return request(app).delete("/unit/" + codeUnit)
            .end( async (err, res) => {
                expect(HttpStatusCode.NO_CONTENT).to.equal(res.status);
                done();
            });
    });
});

describe("DELETE /unit/:code", () => {
    it("should return 204 - NOT CONTENT", (done) => {
        const codeUnit = 50;
        return request(app).delete("/unit/" + codeUnit)
            .end( async (err, res) => {
                expect(HttpStatusCode.NO_CONTENT).to.equal(res.status);
                done();
            });
    });
});

describe("GET /unit", () => {
    it("should return 200 - OK and Unit[]", (done) => {
        return request(app).get("/unit")
            .end( async (err, res) => {
                expect(HttpStatusCode.OK).to.equal(res.status);
                const units: Unit[] = res.body;
                expect(units.length).to.equal(12);
                done();
            });
    });
});

describe("GET /unit/:code", () => {
    it("should return 200 - OK and Unit", (done) => {
        const codeUnit = 50;
        return request(app).get("/unit/" + codeUnit)
            .end( async (err, res) => {
                expect(HttpStatusCode.OK).to.equal(res.status);
                expect(codeUnit).to.equal(res.body.code);
                done();
            });
    });
});

describe("GET /unit/search/:name", () => {
  it("should return 200 - OK and Unit[]", (done) => {
        const nameToSearch = "Unida";
        return request(app).get("/unit/search/" + nameToSearch)
        .end( (err, res) => {
          expect(HttpStatusCode.OK).to.equal(res.status);
          const units: Unit[] = res.body;
          expect(units.length).to.equal(9);
          done();
        });
  });
});

