import logger from "../../src/utils/logger";
import { ExerciseResource } from "../../src/resources/exercise.resource";

const chai = require("chai");
const expect = chai.expect;
const exerciseResource: ExerciseResource = new ExerciseResource();

describe("true", () => {
    it("true", async (done) => {
        expect(0).to.equal(0);
        done();
    });
});

