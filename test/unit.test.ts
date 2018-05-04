import request from "supertest";
import app from "../src/app";
import { UnitEntity } from "../src/entities/unit";
import { HttpStatusCode } from "../src/util/http-status-codes.enum";

const chai = require("chai");
const expect = chai.expect;

describe("POST /unit", () => {
    it("should return 200 OK", (done) => {
      return request(app).post("/unit")
        .send({"name": "UnidadDePrueba"})
        .end( (err, res) => {
          expect("UnidadDePrueba").to.equal(res.body.name);
          done();
        });
    });
});

describe("GET /unit", () => {
    it("should return 200 OK and UnitEntity[] with body", (done) => {
        return request(app).get("/unit")
            .end( (err, res) => {
                expect(HttpStatusCode.OK).to.equal(res.status);
                const jsonResponse: UnitEntity[] = res.body;
                expect(jsonResponse.length).to.not.equal(0);
                done();
            });
    });
});

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
