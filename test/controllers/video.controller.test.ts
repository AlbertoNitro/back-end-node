import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/util/logger";
import { VideoOutputDto } from "../../src/dtos/output/videoOutput.dto";
import {VideoInputDto} from "../../src/dtos/input/videoInput.dto";


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
        const videoInputDto: VideoInputDto = {"url": "www.elpais.es"};
        return request(app).post("/video")
            .send(videoInputDto)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const videoOutputDto: VideoOutputDto = res.body;
                expect(videoOutputDto.url).to.equal(videoInputDto.url);
                done();
            });
    });
});

describe("GET /video/461d87b8b130cf35177998c1", () => {
    it("should return: 200 - OK ", (done) => {
        const videoId = "461d87b8b130cf35177998c1";
        return request(app).get("/video/" + videoId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const videoOutputDto: VideoOutputDto = res.body;
                expect(videoOutputDto.url).to.equal("www.marca.es");
                done();
            });
    });
});

describe("DELETE /video/161d77b8b230cf35177998c1", () => {
    it("should return: 204 - NO_CONTENT", (done) => {
        const videoId = "161d77b8b230cf35177998c1";
        return request(app).delete("/video/" + videoId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});

