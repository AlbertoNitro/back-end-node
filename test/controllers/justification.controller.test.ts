import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import logger from "../../src/util/logger";
import { JustificationOutputDto } from "../../src/dtos/justificationOutput.dto";

const chai = require("chai");
const expect = chai.expect;

describe("POST /justification", () => {
    it("should return: 201 - CREATED + Justification", (done) => {
        const text = "Existen extraterrestres en Jupiter";
        const isCorrect = false;
        return request(app).post("/justification")
            .send({"text": text, "isCorrect": isCorrect })
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const justificationOutputDto: JustificationOutputDto = res.body;
                expect(justificationOutputDto.text).to.equal(text);
                expect(justificationOutputDto.isCorrect).to.equal(isCorrect);
                done();
            });
    });
});
describe("DELETE /justification/99999", () => {
    it("should return 404 - NOT FOUND", (done) => {
        const justificationId = 99999;
        return request(app).delete("/justification/" + justificationId)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
                done();
            });
  });
});
describe("DELETE /justification/111d87b8b230cf35177998ca", () => {
    it("should return 204 - NO_CONTENT", (done) => {
        const justificationId = "111d87b8b230cf35177998ca";
        return request(app).delete("/justification/" + justificationId)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
describe("GET /justification/121d87b8b230cf35177998ca", () => {
    it("should return 200 - OK and Justification", (done) => {
        const justificationId = "121d87b8b230cf35177998ca";
        return request(app).get("/justification/" + justificationId)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const justificationOutputDto: JustificationOutputDto = res.body;
                expect(justificationOutputDto.id).to.equal(justificationId);
                expect(justificationOutputDto.isCorrect).to.equal(true);
                expect(justificationOutputDto.text).to.equal("El agua es una molecula formada por dos moleculas de oxigeno y una de hidrogeno");
                done();
            });
    });
});

