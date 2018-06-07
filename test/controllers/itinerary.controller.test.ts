import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/util/logger";
import { VideoOutputDto } from "../../src/dtos/output/videoOutput.dto";


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

describe("POST /itinerary", () => {
    it("should return: 201 - CREATED + Itinerary", (done) => {
        return request(app).post("/itinerary")
            .send({
                "name": "Prueba"
                })
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                expect(res.body.name).to.equal("Prueba");
                done();
            });
    });
});

describe("GET /itinerary/511d87b8b230cf35177998c0", () => {
    it("should return: 200", (done) => {
        return request(app).get("/itinerary/511d87b8b230cf35177998c0")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                expect(res.body.name).to.equal("Itinerary1");
                done();
            });
    });
});

describe("DELETE /itinerary/511d87b8b230cf35177998c0", () => {
    it("should return: 204", (done) => {
        return request(app).delete("/itinerary/511d87b8b230cf35177998c0")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
