import logger from "../../src/util/logger";
import { ItineraryResource } from "../../src/resources/itinerary.resource";

const chai = require("chai");
const expect = chai.expect;
const itineraryResource: ItineraryResource = new ItineraryResource();

describe("true", () => {
    it("true", async (done) => {
        expect(0).to.equal(0);
        done();
    });
});

