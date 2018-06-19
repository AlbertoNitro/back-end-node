import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import logger from "../../src/utils/logger";
import { VideoOutputDto } from "../../src/dtos/output/videoOutput.dto";
import { VideoInputDto } from "../../src/dtos/input/videoInput.dto";

const chai = require("chai");
const expect = chai.expect;

describe("POST /video", () => {
    it("should return: 201 - CREATED + Video", (done) => {
        const videoInputDto: VideoInputDto = {"lessonId": "773d87b4b130cf35177177c7", "url": "www.elpais.es"};
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

describe("GET /video/:id", () => {
    it("should return: 200 - OK ", (done) => {
        const videoId = "661d57b8b030cf35177998c1";
        return request(app).get("/video/" + videoId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const videoOutputDto: VideoOutputDto = res.body;
                expect(videoOutputDto.url).to.equal("www.mundodeportivo.es");
                done();
            });
    });
});

describe("DELETE /video/:id", () => {
    it("should return: 204 - NO_CONTENT", (done) => {
        const videoId = "261d87b8b130cf59170998c1";
        return request(app).delete("/video/" + videoId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});

describe("PUT /video/:id", () => {
    it("should return: 200", (done) => {
        const videoId = "991d57b8b030cf35177998c1";
        const videoUpdationInputDto: VideoUpdationInputDto = {url: "www.hotmail.es", lessonId: "1234"};
        return request(app).put("/video/" + videoId)
            .send(videoUpdationInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const videoOutputDto: VideoOutputDto = res.body;
                expect(videoOutputDto.url).to.equal(videoUpdationInputDto.url);
                done();
            });
    });
});

