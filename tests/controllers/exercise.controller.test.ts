import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import logger from "../../src/utils/logger";
import { ExerciseInputDto } from "../../src/dtos/input/exerciseInput.dto";
import { ExerciseOutputDto } from "../../src/dtos/output/exerciseOutput.dto";
import { SolutionInputDto } from "../../src/dtos/input/solutionInput.dto";
import { JustificationInputDto } from "../../src/dtos/input/justificationInput.dto";

const chai = require("chai");
const expect = chai.expect;

describe("POST /exercise", () => {
    it("should return: 201 - CREATED + Exercise", (done) => {
        const justificationInputDtos1: JustificationInputDto[] = [];
        const justificationInputDtos2: JustificationInputDto[] = [{"isCorrect" : false, "text" : "No murio en 1917"}, {"isCorrect" : false, "text" : "No murio en 1917"}];
        const solutionInputDtos: SolutionInputDto[] = [{"isCorrect": true, "text": "1791", "justifications": justificationInputDtos1}];
        const exerciseInputDto: ExerciseInputDto = {"lessonId": "773d87b4b130cf35177177c7", "formulation": "¿En que año se descubrio pluton?", "solutions": [{"isCorrect": true, "text": "1791", "justifications": [{"isCorrect" : false, "text" : "No murio en 1917"}]}]};
        return request(app).post("/exercise")
            .send(exerciseInputDto)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const exerciseOutputDto: ExerciseOutputDto = res.body;
                expect(exerciseOutputDto.formulation).to.equal(exerciseInputDto.formulation);
                expect(exerciseOutputDto.solutions.length).to.equal(1);
                done();
            });
    });
});
describe("GET /exercise/:id", () => {
    it("should return: 200", (done) => {
        const exerciseId = "851d87b8b230cf25177998c0";
        return request(app).get("/exercise/" + exerciseId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const exerciseOutputDto: ExerciseOutputDto = res.body;
                expect(exerciseOutputDto.formulation).to.equal("¿En que año se descubrio la luna?");
                expect(exerciseOutputDto.solutions.length).to.equal(2);
                done();
            });
    });
});
describe("GET /exercise/:id", () => {
    it("should return: 200", (done) => {
        const exerciseId = "321d87b8b230cf25177998c0";
        return request(app).get("/exercise/" + exerciseId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const exerciseOutputDto: ExerciseOutputDto = res.body;
                expect(exerciseOutputDto.formulation).to.equal("¿Quien invento la polvora?");
                expect(exerciseOutputDto.solutions.length).to.equal(0);
                done();
            });
    });
});
describe("DELETE /exercise/:id", () => {
    it("should return: 204", (done) => {
        const exerciseId = "751d87b8b230cf25177998c0";
        return request(app).delete("/exercise/" + exerciseId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
describe("PUT /exercise/:id", () => {
    it("should return: 200", (done) => {
        const exerciseId = "851d87b8b230cf25177998c0";
        const exerciseInputDto: ExerciseInputDto = {"formulation": "¿En que año se descubrio pluton?", "solutions": [{"isCorrect": true, "text": "1791", "justifications": [{"isCorrect" : false, "text" : "No murio en 1917"}]}]};
        return request(app).put("/exercise/" + exerciseId)
            .send(exerciseInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const exerciseOutputDto: ExerciseOutputDto = res.body;
                expect(exerciseOutputDto.formulation).to.equal(exerciseInputDto.formulation);
                expect(exerciseOutputDto.solutions.length).to.equal(1);
                done();
            });
    });
});
