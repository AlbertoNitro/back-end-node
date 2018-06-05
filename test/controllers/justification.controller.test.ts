import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import logger from "../../src/util/logger";
import { JustificationOutputDto } from "../../src/dtos/justificationOutput.dto";

const chai = require("chai");
const expect = chai.expect;

describe("POST /justification", () => {
    it("should return: 201 - CREATED + Justification", (done) => {
        const text = "El descubrimiento de la luna fue en 1999";
        const isCorrect = false;
        return request(app).post("/justification")
            .send({"text": text, "isCorrect": isCorrect })
            .end(  async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const justificationOutputDto: JustificationOutputDto = res.body;
                expect(justificationOutputDto.text).to.equal(text);
                expect(justificationOutputDto.isCorrect).to.equal(false);
                done();
            });
    });
});
//
// describe("DELETE /justification/99999", () => {
//     it("should return 404 - NOT FOUND", (done) => {
//         const unitCode = 99999;
//         return request(app).delete("/unit/" + unitCode)
//             .end( async (err, res) => {
//                 expect(res.status).to.equal(HttpStatusCode.NOT_FOUND);
//                 done();
//             });
//   });
// });
//
// describe("DELETE /justification/60", () => {
//     it("should return 204 - NOT CONTENT", (done) => {
//         const unitCode = 60;
//         return request(app).delete("/unit/" + unitCode)
//             .end( async (err, res) => {
//                 expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
//                 done();
//             });
//     });
// });
//
// describe("DELETE /justification/52", () => {
//     it("should return 204 - NOT CONTENT", (done) => {
//         const unitCode = 52;
//         return request(app).delete("/unit/" + unitCode)
//             .end( async (err, res) => {
//                 expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
//                 done();
//             });
//     });
// });
//
// describe("DELETE /justification/58", () => {
//     it("should return 204 - NOT CONTENT", (done) => {
//         const unitCode = 58;
//         return request(app).delete("/unit/" + unitCode)
//             .end( async (err, res) => {
//                 expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
//                 done();
//             });
//     });
// });
//
// describe("GET /justification", () => {
//     it("should return 200 - OK and Unit[]", (done) => {
//         return request(app).get("/unit")
//             .end( async (err, res) => {
//                 expect(res.status).to.equal(HttpStatusCode.OK);
//                 const unitOutputDtos: UnitOutputDto[] = res.body;
//                 expect(unitOutputDtos.length).to.be.above(9);
//                 done();
//             });
//     });
// });
//
// describe("GET /justification/61", () => {
//     it("should return 200 - OK and Unit", (done) => {
//         const unitCode = 61;
//         return request(app).get("/unit/" + unitCode)
//             .end( async (err, res) => {
//                 expect(res.status).to.equal(HttpStatusCode.OK);
//                 const unitOutputDto: UnitOutputDto = res.body;
//                 expect(unitOutputDto.code).to.equal(unitCode);
//                 done();
//             });
//     });
// });

