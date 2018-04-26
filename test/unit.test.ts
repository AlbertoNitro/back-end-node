import request from "supertest";
import app from "../src/app";
import { HttpStatusCode } from "../src/util/http-status-codes.enum";
import { UnitEntity } from "../src/entities/unit";
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
    it("should return 200 OK and entity", (done) => {
        return request(app).get("/unit")
            .end( (err, res) => {
                expect(HttpStatusCode.OK).to.equal(res.status);
                const jsonResponse: UnitEntity[] = res.body;
                expect(jsonResponse.length).to.not.equal(0);
                done();
            });
    });
});