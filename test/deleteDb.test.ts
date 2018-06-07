import { DbService } from "../src/services/db.service";
import logger from "../src/util/logger";

const chai = require("chai");
const expect = chai.expect;
const dbService: DbService = new DbService();

afterAll( async (done) => {
    const successDeleteDb: boolean = await dbService.delete();
    if (!successDeleteDb) {
        logger.error("Abortando lanzamiento de pruebas, fallo al DESPOBLAR Db.");
        fail("Abortando lanzamiento de pruebas...");
    }
    done();
});

describe("DELETE DB", () => {
    it("true", async (done) => {
        expect(0).to.equal(0);
        done();
    });
});