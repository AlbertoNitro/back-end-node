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

describe("POST /video", () => {
    it("should return: 201 - CREATED + Video", (done) => {
        return request(app).post("/video")
            .send({
                "url": "Prueba"
                })
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const videoOutputDto: VideoOutputDto = res.body;
                expect(videoOutputDto.url).to.equal("Prueba");
                done();
            });
    });
});

describe("GET /video/361d87b8b230cf35177998c1", () => {
    it("should return: 204", (done) => {
        return request(app).get("/video/361d87b8b230cf35177998c1")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const videoOutputDto: VideoOutputDto = res.body;
                expect(videoOutputDto.url).to.equal("bleble");
                done();
            });
    });
});

describe("DELETE /video/361d87b8b230cf35177998c1", () => {
    it("should return: 204", (done) => {
        return request(app).delete("/video/361d87b8b230cf35177998c1")
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});

