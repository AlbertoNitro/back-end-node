import { Document } from "mongoose";
import { Solution } from "../../models/solution.model";
import SolutionSchema from "../../schemas/solution.schema";
import { JustificationDao } from "./justification.dao";
import { Justification } from "../../models/justification.model";
import logger from "../../util/logger";
import { SolutionInputDto } from "../../dtos/input/solutionInput.dto";
import { SolutionBuilder } from "../../models/builders/solution.builder";

export class SolutionDao {
    constructor() {
    }
    public static toSolution(document: Document): Solution {
        return new SolutionBuilder(document.get("text"), document.get("isCorrect")).setJustification(JustificationDao.toArrayJustifications(document.get("justifications"))).setId(document.get("_id")).build();
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
    async findAll(): Promise<Solution[]> {
        return await SolutionSchema.find({})
            .then( (solutionsDocuments: Document[]) => {
                const solutions: Solution[] = solutionsDocuments ? SolutionDao.toArraySolutions(solutionsDocuments) : undefined;
                return solutions;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async update(id: number, justifications: Justification[]): Promise<Solution> {
        return await SolutionSchema.updateOne({_id: id}, {$set: {justifications: justifications}}, {new: true})
            .then( (solutionDocument: Document) => {
                const solution: Solution = solutionDocument ? SolutionDao.toSolution(solutionDocument) : undefined;
                return solution;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(solutionInputDto: SolutionInputDto): Promise<Solution> {
        const solution: Solution = new SolutionBuilder(solutionInputDto.text, solutionInputDto.isCorrect).build();
        const solutionSchema = new SolutionSchema(solution);
        return solutionSchema.save()
            .then( (solutionDocument: Document) => {
                const solution: Solution = SolutionDao.toSolution(solutionDocument);
                return solution;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
