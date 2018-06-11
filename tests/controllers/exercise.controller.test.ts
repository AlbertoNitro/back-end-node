import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import logger from "../../src/utils/logger";
import { ExerciseInputDto } from "../../src/dtos/input/exerciseInput.dto";
import { ExerciseOutputDto } from "../../src/dtos/output/exerciseOutput.dto";

const chai = require("chai");
const expect = chai.expect;

describe("POST /exercise", () => {
    it("should return: 201 - CREATED + Exercise", (done) => {
        const exerciseInputDto: ExerciseInputDto = {"formulation": "¿En que epoca goberno Julio Cesar?"};
        return request(app).post("/exercise")
            .send(exerciseInputDto)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const exerciseOutputDto: ExerciseOutputDto = res.body;
                expect(exerciseOutputDto.formulation).to.equal(exerciseInputDto.formulation);
                expect(exerciseOutputDto.solutions.length).to.equal(0);
                done();
            });
    });
});

describe("GET /exercise/851d87b8b230cf25177998c0", () => {
    it("should return: 200", (done) => {
        return request(app).get("/exercise/851d87b8b230cf25177998c0")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const exerciseOutputDto: ExerciseOutputDto = res.body;
                expect(exerciseOutputDto.formulation).to.equal("¿En que año se descubrio la luna?");
                expect(exerciseOutputDto.solutions.length).to.equal(2);
                done();
            });
    });
});

describe("GET /exercise/321d87b8b230cf25177998c0", () => {
    it("should return: 200", (done) => {
        return request(app).get("/exercise/321d87b8b230cf25177998c0")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const exerciseOutputDto: ExerciseOutputDto = res.body;
                expect(exerciseOutputDto.formulation).to.equal("¿Quien invento la polvora?");
                expect(exerciseOutputDto.solutions.length).to.equal(0);
                done();
            });
    });
});

describe("DELETE /exercise/751d87b8b230cf25177998c0", () => {
    it("should return: 204", (done) => {
        return request(app).delete("/exercise/751d87b8b230cf25177998c0")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
