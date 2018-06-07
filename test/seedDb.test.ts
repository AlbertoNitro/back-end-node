import { DbService } from "../src/services/db.service";
import logger from "../src/util/logger";

const chai = require("chai");
const expect = chai.expect;
const dbService: DbService = new DbService();

beforeAll( async (done) => {
    const successSeedDb: boolean = await dbService.seed();
    if (!successSeedDb) {
        logger.error("Abortando lanzamiento de pruebas, fallo al POBLAR Db.");
        fail("Abortando lanzamiento de pruebas...");
    }
    done();
});

describe("SEED DB", () => {
    it("true", async (done) => {
        expect(0).to.equal(0);
        done();
    });
});
