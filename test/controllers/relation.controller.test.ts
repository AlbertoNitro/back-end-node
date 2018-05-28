import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { RelationInputDto } from "../../src/dtos/relationInput.dto";
import { RelationOutputDto } from "../../src/dtos/relationOutput.dto";
import { UnitOutputDto } from "../../src/dtos/unitOutput.dto";

const chai = require("chai");
const expect = chai.expect;

describe("POST /relation", () => {
    it("should return: 201 - CREATED + Relation", (done) => {
        const relationInputDto: RelationInputDto = {type: "COMPOSE", topUnitCode: 51, lowerUnitCode: 53};
        return request(app).post("/relation")
            .send(relationInputDto)
            .end( (err, res) => {
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

describe("POST /relation", () => {
    it("should return: 201 - CREATED + Relation", (done) => {
        const relationInputDto: RelationInputDto = {type: "COMPOSE", topUnitCode: 51, lowerUnitCode: 53, semantics: "Description", cardinalTopUnit: "1..n", cardinalLowerUnit: "1..2"};
        return request(app).post("/relation")
            .send(relationInputDto)
            .end( (err, res) => {
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

describe("POST /relation", () => {
    it("should return: 400 - BAD_REQUEST", (done) => {
        const relationInputDto: RelationInputDto = {type: "COMPOSE", topUnitCode: 9999, lowerUnitCode: 51};
        return request(app).post("/relation")
            .send(relationInputDto)
            .end( (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.BAD_REQUEST);
                done();
            });
    });
});

describe("POST /relation", () => {
    it("should return: 400 - BAD_REQUEST", (done) => {
        const relationInputDto: RelationInputDto = {type: "COMPOSE", topUnitCode: 51, lowerUnitCode: 9999};
        return request(app).post("/relation")
            .send(relationInputDto)
            .end( (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.BAD_REQUEST);
                done();
            });
    });
});

describe("POST /relation", () => {
    it("should return: 400 - BAD_REQUEST", (done) => {
        const relationInputDto: RelationInputDto = {type: "COMPOSE", topUnitCode: 88888, lowerUnitCode: 9999};
        return request(app).post("/relation")
            .send(relationInputDto)
            .end( (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.BAD_REQUEST);
                done();
            });
    });
});

describe("GET /relation", () => {
    it("should return 200 - OK and Relation[]", (done) => {
        return request(app).get("/relation")
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                const relationOutputDtos: RelationOutputDto[] = res.body;
                expect(relationOutputDtos.length).to.be.above(4);
                done();
            });
    });
});
