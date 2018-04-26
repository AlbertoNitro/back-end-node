import request from "supertest";
import app from "../src/app";
import { UnitEntity } from "../src/entities/unit";

const chai = require("chai");
const expect = chai.expect;
describe("unit", () => {
    it("should return 200 OK", (done) => {
      return request(app).post("/unit")
        .send({"name": "UnidadDePrueba"})
        .end( (err, res) => {
          expect("UnidadDePrueba").to.equal(res.body.name);
          done();
        });
    });

    it("GET /unit/search/:name", (done) => {
      return request(app).get("/unit/search/:Jav")
        .end( (err, res) => {
          const jsonResponse: UnitEntity[] = res.body;
          expect(0).to.not.equal(jsonResponse.length);
          done();
        });
    });
});
