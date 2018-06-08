import { DbService } from "../src/services/db.service";
import logger from "../src/utils/logger";

const chai = require("chai");
const expect = chai.expect;
const dbService: DbService = new DbService();

beforeAll( async (done) => {
    const successDeleteDb: boolean = await dbService.delete();
    if (!successDeleteDb) {
        fail("Abortando lanzamiento de pruebas...");
    }
    done();
});

describe("DELETE DB", () => {
    it("true", (done) => {
        expect(0).to.equal(0);
        done();
    });
});