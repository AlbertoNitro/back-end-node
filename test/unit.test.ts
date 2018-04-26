import request from "supertest";
import app from "../src/app";

const chai = require("chai");
const expect = chai.expect;

describe("GET /unit", () => {
    it("should return 200 OK", (done) => {
      return request(app).post("/unit")
        .send({"name": "UnidadDePrueba"})
        .end( (err, res) => {
          expect("UnidadDePrueba").to.equal(res.body.name);
          done();
        });
    });
  });