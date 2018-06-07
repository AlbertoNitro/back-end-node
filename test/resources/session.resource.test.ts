import logger from "../../src/util/logger";
import { DbService } from "../../src/services/db.service";
import { SessionResource } from "../../src/resources/session.resource";

const chai = require("chai");
const expect = chai.expect;
const dbService: DbService = new DbService();
const sssionResource: SessionResource = new SessionResource();

describe("true", () => {
    it("true", async (done) => {
        expect(0).to.equal(0);
        done();
    });
});


