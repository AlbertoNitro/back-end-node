import request from "supertest";
import app from "../../src/app";
import { HttpStatusCode } from "../../src/util/http-status-codes.enum";
import { DbService } from "../../src/services/db.service";
import logger from "../../src/util/logger";
import { UnitOutputDto } from "../../src/dtos/unitOutput.dto";
import { NeighborsOutputDto } from "../../src/dtos/neighborsOutput.dto";
import { RelatedUnitsOutputDto } from "../../src/dtos/relatedUnitsOutput.dto";

const chai = require("chai");
const expect = chai.expect;

const dbService: DbService = new DbService();

beforeAll( async (done) => {
    const successDeleteDb: boolean = await dbService.delete();
    if (!successDeleteDb) {
        logger.error("Abortando lanzamiento de pruebas, fallo al resetear DB.");
    }
    const successSeedDb: boolean = await dbService.seed();
    if (!successSeedDb) {
        logger.error("Abortando lanzamiento de pruebas, fallo al poblar DB.");
    }
    successSeedDb && successDeleteDb ? done() : fail("Abortando lanzamiento de pruebas...");
});

describe("GET /interaccion", () => {
    it("should return 200 - OK and Interaccion[]", (done) => {
        return request(app).get("/interaccion")
            .end( async (err, res) => {
                expect(res.status).to.equal(HttpStatusCode.OK);
                expect(Object.keys(res.body).length).to.equal(2);
                done();
            });
    });
});