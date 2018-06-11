import logger from "../../src/utils/logger";
import { LessonResource } from "../../src/resources/lesson.resource";

const chai = require("chai");
const expect = chai.expect;
const lessonResource: LessonResource = new LessonResource();

describe("true", () => {
    it("true", async (done) => {
        expect(0).to.equal(0);
        done();
    });
});

