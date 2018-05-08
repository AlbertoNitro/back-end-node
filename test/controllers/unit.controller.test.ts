import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { UnitEntity } from "../../src/entities/unit.entity";

const chai = require("chai");
const expect = chai.expect;

describe("POST /unit", () => {
    it("should return: 201 - CREATED + unit created", (done) => {
      return request(app).post("/unit")
        .send({"name": "Unidad11"})
        .end( async (err, res) => {
          expect(HttpStatusCode.CREATED).to.equal(res.status);
          expect("Unidad11").to.equal(res.body.name);
          //await request(app).delete("/unit/" + res.body._id);
          done();
        });
    });
});

describe("DELETE /unit", () => {
  it("should return 200 OK", (done) => {
    return request(app).post("/unit")
      .send({"_id": 10})
      .end( async (err, res) => {
          expect(HttpStatusCode.NO_CONTENT).to.equal(res.status);
        done();
      });
  });
});

describe("GET /unit", () => {
    it("should return 200 OK and UnitEntity[]", (done) => {
        return request(app).get("/unit")
            .end( (err, res) => {
                expect(HttpStatusCode.OK).to.equal(res.status);
                const jsonResponse: UnitEntity[] = res.body;
                expect(jsonResponse.length).to.be.above(9);
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