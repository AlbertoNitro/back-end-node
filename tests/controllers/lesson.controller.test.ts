import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/utils/logger";
import { LessonOutputDto } from "../../src/dtos/output/lessonOutput.dto";
import { LessonInputDto } from "../../src/dtos/input/lessonInput.dto";

const chai = require("chai");
const expect = chai.expect;

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
        const lessonId = "862d87b8b530cf35177998c1";
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
        const lessonId = "863d87b8b130cf35177998c2";
        return request(app).delete("/lesson/" + lessonId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
