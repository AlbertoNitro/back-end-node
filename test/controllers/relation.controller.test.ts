import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { RelationInputDto } from "../../src/dtos/relationInput.dto";
import { RelationOutputDto } from "../../src/dtos/relationOutput.dto";
import { UnitOutputDto } from "../../src/dtos/unitOutput.dto";
import { DbService } from "../../src/services/db.service";
import { Relation } from "../../src/models/relation.model";
import { TypeRelation } from "../../src/models/typeRelation.enum";
import logger from "../../src/util/logger";

const chai = require("chai");
const expect = chai.expect;

const dbService: DbService = new DbService();

describe("POST /relation", () => {
    it("should return: 201 - CREATED + Relation", (done) => {
        const relationInputDto: RelationInputDto = {type: TypeRelation.COMPOSE, idTopUnit: 60, idLowerUnit: 61};
        return request(app).post("/relation")
            .send(relationInputDto)
            .end( (err, res) => {
                expect(HttpStatusCode.CREATED).to.equal(res.status);
                const relationOutputDto: RelationOutputDto = res.body;
                expect(relationOutputDto.type).to.equal(relationInputDto.type);
                const unitOutputDtoTop: UnitOutputDto = relationOutputDto.topUnit;
                const unitOutputDtoLower: UnitOutputDto = relationOutputDto.lowerUnit;
                expect(unitOutputDtoTop.code).to.equal(relationInputDto.idTopUnit);
                expect(unitOutputDtoLower.code).to.equal(relationInputDto.idLowerUnit);
                done();
            });
    });
});

describe("GET /relation", () => {
    it("should return 200 - OK and Relation[]", (done) => {
        return request(app).get("/relation")
            .end( async (err, res) => {
                expect(HttpStatusCode.OK).to.equal(res.status);
                const relations: Relation[] = res.body;
                done();
            });
    });
});
