import logger from "../../src/utils/logger";
import { SolutionResource } from "../../src/resources/solution.resource";
import { Solution } from "../../src/models/solution.model";
import { Justification } from "../../src/models/justification.model";
import { JustificationResource } from "../../src/resources/justification.resource";
const mongoose = require("mongoose");
const chai = require("chai");
import app from "../../src/app";

const expect = chai.expect;
const solutionResource: SolutionResource = new SolutionResource();
const justificationResource: JustificationResource = new JustificationResource();

// describe("update(id: string, justifications: Justification[])", () => {
//     it("should return the MODIFIED SOLUTION", async () => {
//         const solutionId = "361d87b8b230cf35177998ca";
//         let solution: Solution = await solutionResource.findById(solutionId);
//         let justifications: Justification[] = solution.getJustifications();
//         expect(justifications.length).to.equal(3);
//         // Crear en el fichero YAML la nueva justificacion con un id
//         const newJustificationId = "732d87b8b230cf35177998ca";
//         const newJustification: Justification = await justificationResource.findById(newJustificationId);
//         justifications.push(newJustification);
//         solution = await solutionResource.update(solutionId, justifications);
//         justifications = solution.getJustifications();
//         expect(justifications.length).to.equal(4);
//         return true;
//     });
// });

describe("true", () => {
    it("true", async (done) => {
        expect(0).to.equal(0);
        done();
    });
});


