import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import logger from "../../src/util/logger";
import { JustificationOutputDto } from "../../src/dtos/output/justificationOutput.dto";
import { JustificationInputDto } from "../../src/dtos/input/justificationInput.dto";

const chai = require("chai");
const expect = chai.expect;

describe("POST /justification", () => {
    it("should return: 201 - CREATED + Justification", (done) => {
        const justificationInputDto: JustificationInputDto = {"text": "Existen extraterrestres en Jupiter", "isCorrect": false };
        return request(app).post("/justification")
            .send(justificationInputDto)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const justificationOutputDto: JustificationOutputDto = res.body;
                expect(justificationOutputDto.text).to.equal(justificationInputDto.text);
                expect(justificationOutputDto.isCorrect).to.equal(justificationInputDto.isCorrect);
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
                expect(justificationOutputDto.text).to.equal("El descubrimiento de la luna fue en 2005");
                done();
            });
    });
});
describe("GET /justification", () => {
    it("should return: 200 - OK + Justification[]", (done) => {
        return request(app).get("/justification")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const justificationsOutputDtos: JustificationOutputDto[] = res.body;
                expect(justificationsOutputDtos.length).to.be.above(4);
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
