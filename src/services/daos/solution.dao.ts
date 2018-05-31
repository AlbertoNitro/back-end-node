import { Document } from "mongoose";
import logger from "../util/logger";
import { Solution } from "../../models/solution.model";
import SolutionSchema from "../../schemas/solution.schema";

export class SolutionDao {
    constructor() {
    }
    private static toSolution(document: Document): Solution {
        return new SolutionBuilder().setId(document.get("_id")).setText(document.get("text")).setIsCorrect(document.get("isCorrect")).build();
    }
    private static toArraySolutions(documents: Document[]): Solution[] {
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
    async create(isCorrect: boolean, text: string): Promise<Solution> {
        const solution: Solution = new SolutionBuilder().setIsCorrect(isCorrect).setText(text).build();
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
