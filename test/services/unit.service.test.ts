import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";

const chai = require("chai");
const expect = chai.expect;

describe("POST /relation", () => {
    it("should return the created relation", (done) => {
      return request(app).post("/relation")
        .send({"name": "UnidadDePrueba"})
        .end( (err, res) => {
          expect("UnidadDePrueba").to.equal(res.body.name);
          done();
        });
    });
});
