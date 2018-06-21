import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/utils/http-status-codes.enum";
import { RelationInputDto } from "../../src/dtos/input/relationInput.dto";
import { RelationOutputDto } from "../../src/dtos/output/relationOutput.dto";
import { UnitOutputDto } from "../../src/dtos/output/unitOutput.dto";
import { DeleteRelationInputDto } from "../../src/dtos/input/deleteRelationInput.dto";
import logger from "../../src/utils/logger";

const chai = require("chai");
const expect = chai.expect;

const END_POINT = "/relation";
const ID = "/:id";

describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.BAD_REQUEST}`, (done) => {
        const relationInputDto: RelationInputDto = {"type": "COMPOSE", "topUnitCode": 88888, "lowerUnitCode": 9999};
        return request(app).post(END_POINT)
            .send(relationInputDto)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.BAD_REQUEST);
                done();
            });
    });
});
describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.CREATED} + RelationOutputDto`, (done) => {
        const relationInputDto: RelationInputDto = {"type": "COMPOSE", "topUnitCode": 51, "lowerUnitCode": 53, "semantics": "Description", "cardinalTopUnit": "1..n", "cardinalLowerUnit": "1..2"};
        return request(app).post(END_POINT)
            .send(relationInputDto)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const relationOutputDto: RelationOutputDto = res.body;
                expect(relationOutputDto.type).to.equal("COMPOSE");
                const topUnitOutputDto: UnitOutputDto = relationOutputDto.topUnit;
                expect(topUnitOutputDto.code).to.equal(relationInputDto.topUnitCode);
                const lowerunitOutputDto: UnitOutputDto = relationOutputDto.lowerUnit;
                expect(lowerunitOutputDto.code).to.equal(relationInputDto.lowerUnitCode);
                const cardinalTopUnit: string = relationOutputDto.cardinalTopUnit;
                expect(cardinalTopUnit).to.equal(relationInputDto.cardinalTopUnit);
                const cardinalLowerUnit: string = relationOutputDto.cardinalLowerUnit;
                expect(cardinalLowerUnit).to.equal(relationInputDto.cardinalLowerUnit);
                done();
            });
    });
});
describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.BAD_REQUEST}`, (done) => {
        const relationInputDto: RelationInputDto = {type: "COMPOSE", topUnitCode: 9999, lowerUnitCode: 51};
        return request(app).post(END_POINT)
            .send(relationInputDto)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.BAD_REQUEST);
                done();
            });
    });
});
describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.BAD_REQUEST}`, (done) => {
        const relationInputDto: RelationInputDto = {type: "COMPOSE", topUnitCode: 51, lowerUnitCode: 9999};
        return request(app).post(END_POINT)
            .send(relationInputDto)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.BAD_REQUEST);
                done();
            });
    });
});
describe("POST " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.CREATED} + RelationOutputDto`, (done) => {
        const relationInputDto: RelationInputDto = {type: "COMPOSE", topUnitCode: 51, lowerUnitCode: 53};
        return request(app).post(END_POINT)
            .send(relationInputDto)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.CREATED);
                const relationOutputDto: RelationOutputDto = res.body;
                expect(relationOutputDto.type).to.equal("COMPOSE");
                const topUnitOutputDto: UnitOutputDto = relationOutputDto.topUnit;
                const lowerunitOutputDto: UnitOutputDto = relationOutputDto.lowerUnit;
                expect(topUnitOutputDto.code).to.equal(relationInputDto.topUnitCode);
                expect(lowerunitOutputDto.code).to.equal(relationInputDto.lowerUnitCode);
                done();
            });
    });
});
describe("GET " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.OK} + RelationOutputDto`, (done) => {
        return request(app).get(END_POINT)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const relationOutputDtos: RelationOutputDto[] = res.body;
                expect(relationOutputDtos.length).to.be.above(4);
                done();
            });
    });
});
describe("DELETE " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.NO_CONTENT}`, (done) => {
        const deleteRelationInputDto: DeleteRelationInputDto = { topUnitCode: 50, lowerUnitCode: 61 };
        return request(app).delete(END_POINT)
            .send(deleteRelationInputDto)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.NO_CONTENT);
                done();
            });
    });
});

describe("DELETE " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        const deleteRelationInputDto: DeleteRelationInputDto = { topUnitCode: 99999, lowerUnitCode: 88888 };
        return request(app).delete(END_POINT)
            .send(deleteRelationInputDto)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.BAD_REQUEST);
                done();
            });
    });
});
describe("DELETE " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        const deleteRelationInputDto: DeleteRelationInputDto = { topUnitCode: 50, lowerUnitCode: 99999 };
        return request(app).delete(END_POINT)
            .send(deleteRelationInputDto)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.BAD_REQUEST);
                done();
            });
    });
});
describe("DELETE " + END_POINT, () => {
    it(`expect return: ${HttpStatusCode.NOT_FOUND}`, (done) => {
        const deleteRelationInputDto: DeleteRelationInputDto = { topUnitCode: 99999, lowerUnitCode: 50 };
        return request(app).delete(END_POINT)
            .send(deleteRelationInputDto)
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.BAD_REQUEST);
                done();
            });
    });
});
