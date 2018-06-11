import { DbService } from "../src/services/db.service";
import logger from "../src/utils/logger";

const chai = require("chai");
const expect = chai.expect;
const dbService: DbService = new DbService();

beforeAll( async (done) => {
    const successSeedDb: boolean = await dbService.seed();
    if (!successSeedDb) {
        fail("Abortando lanzamiento de pruebas...");
    }
    done();
});

describe("SEED DB", () => {
    it("true", (done) => {
        expect(0).to.equal(0);
        done();
    });
});
