import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/util/logger";
import { UnitOutputDto } from "../../src/dtos/output/unitOutput.dto";
import { NeighborsOutputDto } from "../../src/dtos/output/neighborsOutput.dto";
import { RelatedUnitsOutputDto } from "../../src/dtos/output/relatedUnitsOutput.dto";
import { SolutionOutputDto } from "../../src/dtos/output/solutionOutput.dto";

const chai = require("chai");
const expect = chai.expect;

const dbService: DbService = new DbService();
beforeAll( async (done) => {
    const successDeleteDb: boolean = await dbService.delete();
    if (!successDeleteDb) {
        logger.error("Abortando lanzamiento de pruebas, fallo al resetear DB.");
    }
    const successSeedDb: boolean = await dbService.seed();
    if (!successSeedDb) {
        logger.error("Abortando lanzamiento de pruebas, fallo al poblar DB.");
    }
    successSeedDb && successDeleteDb ? done() : fail("Abortando lanzamiento de pruebas...");
});
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

describe("GET /solution", () => {
    it("should return: 200", (done) => {
        return request(app).get("/solution")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const solutionOutputDto: SolutionOutputDto[] = res.body;
                expect(solutionOutputDto.length).to.equal(4);
                done();
            });
    });
});
describe("GET /solution/:id", () => {
    it("should return: 200", (done) => {
        return request(app).get("/solution/561d87b8b230cf35177998cc")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const solutionOutputDto: SolutionOutputDto = res.body;
                expect(solutionOutputDto.text).to.equal("La formula del agua H20");
                done();
            });
    });
});
describe("DELETE /solution/:id", () => {
    it("should return: 204", (done) => {
        return request(app).delete("/solution/561d87b8b230cf35177998cc")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});