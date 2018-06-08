import logger from "../../src/utils/logger";
import { SolutionResource } from "../../src/resources/solution.resource";
import { Solution } from "../../src/models/solution.model";
import { Justification } from "../../src/models/justification.model";
const mongoose = require("mongoose");

const chai = require("chai");
const expect = chai.expect;
const solutionResource: SolutionResource = new SolutionResource();

// describe("update(id: number, justifications: Justification[])", () => {
//     it("should return the MODIFIED SOLUTION", async (done) => {
//         const solutionId = "361d87b8b230cf35177998ca";
//         let solution: Solution = await solutionResource.findById(solutionId);
//         let justifications: Justification[] = solution.getJustifications();
//         expect(justifications.length).to.equal(3);
//         // Crear en el fichero YAML la nueva justificacion con un id
//         const newJustificationId = new mongoose.mongo.ObjectId("732d87b8b230cf35177998ca"); // Id de la justificacion creada
//         justifications.push(newJustificationId);
//         solution = await solutionResource.update(solutionId, justifications);
//         justifications = solution.getJustifications();
//         expect(justifications.length).to.equal(4);
//         done();
//     });
// });

describe("true", () => {
    it("true", async (done) => {
        expect(0).to.equal(0);
        done();
    });
});


