import logger from "../../src/util/logger";
import { DbService } from "../../src/services/db.service";
import { ExerciseResource } from "../../src/resources/exercise.resource";

const chai = require("chai");
const expect = chai.expect;
const dbService: DbService = new DbService();
const exerciseResource: ExerciseResource = new ExerciseResource();

describe("true", () => {
    it("true", async (done) => {
        expect(0).to.equal(0);
        done();
    });
});

