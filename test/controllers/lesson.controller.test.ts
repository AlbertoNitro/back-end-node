import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/util/logger";
import { SolutionOutputDto } from "../../src/dtos/output/solutionOutput.dto";
import { LessonOutputDto } from "../../src/dtos/output/lessonOutput.dto";
import { LessonInputDto } from "../../src/dtos/input/lessonInput.dto";

const chai = require("chai");
const expect = chai.expect;

const dbService: DbService = new DbService();

describe("POST /lesson", () => {
    it("should return: 201 - CREATED + Lesson", (done) => {
        const lessonInputDto: LessonInputDto = {name: "Herencia en Java"};
        return request(app).post("/lesson")
            .send(lessonInputDto)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const lessonOutputDto: LessonOutputDto = res.body;
                expect(lessonOutputDto.name).to.equal(lessonInputDto.name);
                expect(lessonOutputDto.interactions.length).to.equal(0);
                done();
            });
    });
});
describe("GET /lesson/:id", () => {
    it("should return: 200 - OK ", (done) => {
        const lessonId = "551d87b1b236cf35177998c0";
        return request(app).get("/lesson/" + lessonId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const lessonOutputDto: LessonOutputDto = res.body;
                expect(lessonOutputDto.name).to.equal("Variables en Java");
                expect(lessonOutputDto.interactions.length).to.equal(0);
                done();
            });
    });
});
describe("DELETE /lesson/:id", () => {
    it("should return: 204 - NO_CONTENT", (done) => {
        const lessonId = "251d87b1b236cf35177998c0";
        return request(app).delete("/lesson/" + lessonId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});