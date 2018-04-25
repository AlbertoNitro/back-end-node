import request from "supertest";
import app from "../src/app";

const chai = require("chai");
const expect = chai.expect;

describe("GET /unit/new", () => {
    it("should return 200 OK", () => {
      return request(app).post("/unit/new")
        .field("name", "Prueba")
        .expect(200);
    });
  });