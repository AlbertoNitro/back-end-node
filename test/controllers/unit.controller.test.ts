import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { Unit } from "../../src/models/unit.model";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/util/logger";

const chai = require("chai");
const expect = chai.expect;

const dbService: DbService = new DbService();

beforeAll( async () => {
    logger.info("------------------------------------------------------------------------beforeAll");
    const success: boolean = await dbService.seed();
    if (!success) {
        logger.error("Abortando lanzamiento de pruebas, fallo al poblar DB.");
        process.exit();
    }
    logger.info("------------------------------------------------------------------------beforeAll fin");
});

describe("POST /unit", () => {
    it("should return: 201 - CREATED + unit created", (done) => {
        return request(app).post("/unit")
            .send({"name": "UnidadX"})
            .end(  async (err, res) => {
              expect(HttpStatusCode.CREATED).to.equal(res.status);
              expect("UnidadX").to.equal(res.body.name);
              done();
            });
    });
});

describe("DELETE /unit", () => {
  it("should return 404 - NOT FOUND", (done) => {
      const idUnit = 99999;
      return request(app).delete("/unit/" + idUnit)
          .end( async (err, res) => {
              expect(HttpStatusCode.NOT_FOUND).to.equal(res.status);
              done();
          });
  });
});

describe("DELETE /unit", () => {
    it("should return 204 - NOT CONTENT", (done) => {
        const idUnit = 10;
        return request(app).delete("/unit/" + idUnit)
            .end( async (err, res) => {
                expect(HttpStatusCode.NO_CONTENT).to.equal(res.status);
                done();
            });
    });
});

describe("DELETE /unit", () => {
    it("should return 204 - NOT CONTENT", (done) => {
        const idUnit = 0;
        return request(app).delete("/unit/" + idUnit)
            .end( async (err, res) => {
                expect(HttpStatusCode.NO_CONTENT).to.equal(res.status);
                done();
            });
    });
});

describe("GET /unit", () => {
    it("should return 200 - OK and UnitEntity[]", (done) => {
        return request(app).get("/unit")
            .end( async (err, res) => {
                expect(HttpStatusCode.OK).to.equal(res.status);
                const units: Unit[] = res.body;
                expect(units.length).to.be.above(9);
                done();
            });
    });
});

describe("GET /unit/:id", () => {
    const idUnit = 1;
    it("should return 200 - OK and Unit", (done) => {
        return request(app).get("/unit/" + idUnit)
            .end( async (err, res) => {
                expect(HttpStatusCode.OK).to.equal(res.status);
                const unit: Unit = res.body;
                expect(idUnit).to.equal(unit.getCode());
                done();
            });
    });
});

/*
describe("GET /unit/search/:name", () => {
  it("should return 200 OK", (done) => {
    return request(app).get("/unit/search/Jav")
    .end( (err, res) => {
      expect(HttpStatusCode.OK).to.equal(res.status);
      const jsonResponse: UnitEntity[] = res.body;
      expect(0).to.not.equal(jsonResponse.length);
      done();
    });
  });
});
*/

afterAll(async () => {
    logger.info("------------------------------------------------------------------------afterAll");
    const success: boolean = await dbService.delete();
    if (!success) {
        logger.error("Abortando lanzamiento de pruebas, fallo al resetear DB.");
        process.exit();
    }
});
