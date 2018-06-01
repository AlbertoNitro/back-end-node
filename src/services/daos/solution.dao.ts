import { Document } from "mongoose";
import logger from "../util/logger";
import { Solution } from "../../models/solution.model";
import SolutionSchema from "../../schemas/solution.schema";
import { JustificationDao } from "./justification.dao";
import { Justification } from "../../models/justification.model";

export class SolutionDao {
    constructor() {
    }
    public static toSolution(document: Document): Solution {
        return new Solution(document.get("text"), document.get("isCorrect")).setId(document.get("_id").setJustifications(JustificationDao.toArrayJustifications(document.get("justifications"))));
    }
    public static toArraySolutions(documents: Document[]): Solution[] {
        const solutions: Solution[] = [];
        for (let i = 0; i < documents.length; i++) {
            solutions.push(SolutionDao.toSolution(documents[i]));
        }
        return solutions;
    }
    async delete(id: number): Promise<boolean> {
        return await SolutionSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: number): Promise<Solution> {
        return await SolutionSchema.findById(id)
            .then( (solutionDocument: Document) => {
                const solution: Solution = solutionDocument ? SolutionDao.toSolution(solutionDocument) : undefined;
                return solution;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(isCorrect: boolean, text: string, justifications: Justification[]): Promise<Solution> {
        const solution: Solution = new Solution(text, isCorrect).setJustifications(justifications);
        const solutionSchema = new SolutionSchema(solution);
        return solutionSchema.save()
            .then( (solutionDocument: Document) => {
                const solution: Solution = solutionDocument ? SolutionDao.toSolution(solutionDocument) : undefined;
                return solution;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
