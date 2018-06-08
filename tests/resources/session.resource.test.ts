import logger from "../../src/utils/logger";
import { SessionResource } from "../../src/resources/session.resource";

const chai = require("chai");
const expect = chai.expect;
const sssionResource: SessionResource = new SessionResource();

describe("true", () => {
    it("true", async (done) => {
        expect(0).to.equal(0);
        done();
    });
});


