import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import logger from "../../src/utils/logger";
import { SolutionOutputDto } from "../../src/dtos/output/solutionOutput.dto";
import { SolutionInputDto } from "../../src/dtos/input/solutionInput.dto";

const chai = require("chai");
const expect = chai.expect;

describe("POST /solution", () => {
    it("should return: 201 - CREATED + Solution", (done) => {
        const solutionInputDto: SolutionInputDto = {"isCorrect": true, "text": "Prueba"};
        return request(app).post("/solution")
            .send(solutionInputDto)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const solutionOutputDto: SolutionOutputDto = res.body;
                expect(solutionOutputDto.text).to.equal("Prueba");
                expect(solutionOutputDto.justifications.length).to.equal(0);
                done();
            });
    });
});

describe("GET /solution", () => {
    it("should return: 200", (done) => {
        return request(app).get("/solution")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const solutionsOutputDto: SolutionOutputDto[] = res.body;
                expect(solutionsOutputDto.length).to.be.above(3);
                done();
            });
    });
});
describe("GET /solution/:id", () => {
    it("should return: 200", (done) => {
        const solutionId = "361d87b8b230cf35177998ca";
        return request(app).get("/solution/" + solutionId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const solutionOutputDto: SolutionOutputDto = res.body;
                expect(solutionOutputDto.text).to.equal("1974");
                expect(solutionOutputDto.isCorrect).to.equal(false);
                expect(solutionOutputDto.justifications.length).to.equal(3);
                done();
            });
    });
});
describe("GET /solution/:id", () => {
    it("should return: 200", (done) => {
        const solutionId = "461d87b8b230cf35177998cb";
        return request(app).get("/solution/" + solutionId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const solutionOutputDto: SolutionOutputDto = res.body;
                expect(solutionOutputDto.text).to.equal("La oveja Dolly");
                expect(solutionOutputDto.isCorrect).to.equal(true);
                expect(solutionOutputDto.justifications.length).to.equal(0);
                done();
            });
    });
});
describe("DELETE /solution/:id", () => {
    it("should return: 204", (done) => {
        const solutionId = "561d87b8b230cf35177998cc";
        return request(app).delete("/solution/" + solutionId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});

describe("PUT /solution/:id", () => {
    it("should return: 200", (done) => {
        const agent = request(app);
        let solutionOutputDto: SolutionOutputDto;
        const solutionId = "666d87b8b230cf35177997ca";
        return agent.get("/solution/" + solutionId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                solutionOutputDto = res.body;
                expect(solutionOutputDto.text).to.equal("6666");
                expect(solutionOutputDto.isCorrect).to.equal(false);
                expect(solutionOutputDto.justifications.length).to.equal(3);
                solutionOutputDto.justifications.pop();
                agent.put("/solution/" + solutionId)
                    .send(solutionOutputDto.justifications)
                    .end(  async (err, res) => {
                        expect(res.status).to.equal(HttpStatusCode.OK);
                        solutionOutputDto = res.body;
                        expect(solutionOutputDto.text).to.equal("6666");
                        expect(solutionOutputDto.isCorrect).to.equal(false);
                        expect(solutionOutputDto.justifications.length).to.equal(2);
                         done();
                     });
            });
    });
});
