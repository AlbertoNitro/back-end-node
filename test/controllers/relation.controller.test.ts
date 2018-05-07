import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { RelationInputDto } from "../../src/dtos/relationInput.dto";
import { TypeRelation } from "../../src/models/typeRelation.enum";
import { RelationOutputDto } from "../../src/dtos/relationOutput.dto";
import { UnitOutputDto } from "../../src/dtos/unitOutput.dto";

const chai = require("chai");
const expect = chai.expect;

describe("POST /relation", () => {
    it("should return: 201 - CREATED + relation created", (done) => {
        const relationInputDto: RelationInputDto = {type: TypeRelation.COMPOSE, idTopUnit: 169, idLowerUnit: 161};
        return request(app).post("/relation")
            .send(relationInputDto)
            .end( (err, res) => {
                expect(HttpStatusCode.CREATED).to.equal(res.status);
                const relationOutputDto: RelationOutputDto = res.body;
                expect(relationOutputDto.type).to.equal(relationInputDto.type);
                const unitOutputDtoTop: UnitOutputDto = relationOutputDto.topUnit;
                const unitOutputDtoLower: UnitOutputDto = relationOutputDto.lowerUnit;
                expect(unitOutputDtoTop._id).to.equal(relationInputDto.idTopUnit);
                expect(unitOutputDtoLower._id).to.equal(relationInputDto.idLowerUnit);
                done();
            });
    });
});
