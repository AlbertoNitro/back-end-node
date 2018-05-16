import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { UnitInputDto } from "../../src/dtos/unitInputDto.dto";
import { Unit } from "../../src/models/unit.model";

const chai = require("chai");
const expect = chai.expect;

describe("POST /unit", () => {
    it("should return: 201 - CREATED + unit created", (done) => {
        return request(app).post("/unit")
            .send({"name": "UnidadX"})
            .end( async (err, res) => {
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
            .end( (err, res) => {
                expect(HttpStatusCode.OK).to.equal(res.status);
                const units: Unit[] = res.body;
                expect(units.length).to.be.above(9);
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