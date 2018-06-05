import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/util/logger";
import { UnitOutputDto } from "../../src/dtos/unitOutput.dto";
import { NeighborsOutputDto } from "../../src/dtos/neighborsOutput.dto";
import { RelatedUnitsOutputDto } from "../../src/dtos/relatedUnitsOutput.dto";
import { SolutionOutputDto } from "../../src/dtos/solutionOutput.dto";

const chai = require("chai");
const expect = chai.expect;

const dbService: DbService = new DbService();

describe("POST /solution", () => {
    it("should return: 201 - CREATED + Solution", (done) => {
        return request(app).post("/solution")
            .send({
                "isCorrect": "true",
                "text": "Prueba"
            })
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const solutionOutputDto: SolutionOutputDto = res.body;
                expect(solutionOutputDto.text).to.equal("Prueba");
                done();
            });
    });
});