import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import logger from "../../src/utils/logger";
import { VideoOutputDto } from "../../src/dtos/output/videoOutput.dto";
import { VideoInputDto } from "../../src/dtos/input/videoInput.dto";

const chai = require("chai");
const expect = chai.expect;

const END_POINT = "/video";
const ID = "/:id";

describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.CREATED} + VideoOutputDto`, (done) => {
        const videoInputDto: VideoInputDto = {"lessonId": "773d87b4b130cf35177177c7", "url": "www.elpais.es"};
        return request(app).post(END_POINT)
            .send(videoInputDto)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const videoOutputDto: VideoOutputDto = res.body;
                expect(videoOutputDto.url).to.equal(videoInputDto.url);
                done();
            });
    });
});
describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.CREATED} + VideoOutputDto`, (done) => {
        const videoInputDto: VideoInputDto = {"lessonId": "773d87b4b130cf35177177c7", "url": ""};
        return request(app).post(END_POINT)
            .send(videoInputDto)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const videoOutputDto: VideoOutputDto = res.body;
                expect(videoOutputDto.url).to.equal(videoInputDto.url);
                done();
            });
    });
});
describe("GET " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + VideoOutputDto`, (done) => {
        const videoId = "661d57b8b030cf35177998c1";
        return request(app).get(END_POINT + "/" + videoId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const videoOutputDto: VideoOutputDto = res.body;
                expect(videoOutputDto.url).to.equal("www.mundodeportivo.es");
                done();
            });
    });
});
describe("DELETE " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.NO_CONTENT}`, (done) => {
        const videoId = "261d87b8b130cf59170998c1";
        return request(app).delete(END_POINT + "/" + videoId)
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});
describe("PUT " + END_POINT + ID, () => {
    it(`expect return: ${HttpStatusCode.OK} + VideoOutputDto`, (done) => {
        const videoId = "991d57b8b030cf35177998c1";
        const videoInputDto: VideoInputDto = {url: "www.hotmail.es"};
        return request(app).put(END_POINT + "/" + videoId)
            .send(videoInputDto)
            .end(async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const videoOutputDto: VideoOutputDto = res.body;
                expect(videoOutputDto.url).to.equal(videoInputDto.url);
                done();
            });
    });
});

