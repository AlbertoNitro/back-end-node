import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import logger from "../../src/util/logger";
import { JustificationOutputDto } from "../../src/dtos/output/justificationOutput.dto";
import { DbService } from "../../src/services/db.service";

const chai = require("chai");
const expect = chai.expect;
const dbService: DbService = new DbService();
// beforeAll( async (done) => {
//     const successSeedDb: boolean = await dbService.seed();
//     if (!successSeedDb) {
//         logger.error("Abortando lanzamiento de pruebas, fallo al POBLAR Db.");
//         fail("Abortando lanzamiento de pruebas...");
//     }
//     done();
// });
//
// afterAll( async (done) => {
//     const successDeleteDb: boolean = await dbService.delete();
//     if (!successDeleteDb) {
//         logger.error("Abortando lanzamiento de pruebas, fallo al DESPOBLAR Db.");
//         fail("Abortando lanzamiento de pruebas...");
//     }
//     done();
// });
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
                expect(justificationsOutputDtos.length).to.be.above(2);
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


