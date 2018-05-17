import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { Unit } from "../../src/models/unit.model";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/util/logger";

const chai = require("chai");
const expect = chai.expect;

const dbService: DbService = new DbService();

beforeAll( async (done) => {
    logger.info("---------------------------------beforeAll");
    const success2: boolean = await dbService.seed();
    if (!success2) {
        logger.error("Abortando lanzamiento de pruebas, fallo al poblar DB.");
        process.exit();
    }
    logger.info("---------------------------------beforeAll fin");
    done();
});

describe("POST /unit", () => {
    it("should return: 201 - CREATED + Unit", (done) => {
        return request(app).post("/unit")
            .send({"name":"MonoAgua"})
            .end(  async (err, res) => {
              expect(HttpStatusCode.CREATED).to.equal(res.status);
              expect("MonoAgua").to.equal(res.body.name);
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

describe("GET /unit/:code", () => {
    const codeUnit = 1;
    it("should return 200 - OK and Unit", (done) => {
        return request(app).get("/unit/" + codeUnit)
            .end( async (err, res) => {
                expect(HttpStatusCode.OK).to.equal(res.status);
                expect(codeUnit).to.equal(res.body.code);
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

afterAll(async (done) => {
    logger.info("---------------------------------afterAll");
    const success: boolean = await dbService.delete();
    if (!success) {
        logger.error("Abortando lanzamiento de pruebas, fallo al resetear DB.");
        process.exit();
    }
    done();
    logger.info("---------------------------------afterAll fin");
});
