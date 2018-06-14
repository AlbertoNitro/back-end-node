import { Document } from "mongoose";
import { Solution } from "../models/solution.model";
import SolutionSchema from "../schemas/solution.schema";
import { JustificationDao } from "./justification.dao";
import { Justification } from "../models/justification.model";
import logger from "../utils/logger";
import { SolutionInputDto } from "../dtos/input/solutionInput.dto";
import { SolutionBuilder } from "../models/builders/solution.builder";
import { JustificationInputDto } from "../dtos/input/justificationInput.dto";

export class SolutionDao {
    constructor() {
    }

    static toSolution(document: Document): Solution {
        const justifications: Justification[] = JustificationDao.toArrayJustifications(document.get("justifications"));
        return new SolutionBuilder(document.get("text"), document.get("isCorrect")).setJustifications(justifications).setId(document.get("_id")).build();
    }
    static toArraySolutions(documents: Document[]): Solution[] {
        const solutions: Solution[] = [];
        for (let i = 0; i < documents.length; i++) {
            solutions.push(SolutionDao.toSolution(documents[i]));
        }
        return solutions;
    }
    async delete(id: string): Promise<boolean> {
        return await SolutionSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: string): Promise<Solution> {
        return await SolutionSchema.findById(id)
            .then( async (solutionDocument: Document) => {
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
            .then(async(solutionsDocuments: Document[]) => {
                const solutions: Solution[] = solutionsDocuments ? SolutionDao.toArraySolutions(solutionsDocuments) : undefined;
                return solutions;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async update(id: string, solutionInputDto: SolutionInputDto): Promise<Solution> {
        const justificationIds: string[] = this.getIdsJustifications(solutionInputDto.justifications);
        return await SolutionSchema.findOneAndUpdate({ _id: id }, { $set: {text: solutionInputDto.text, isCorrect: solutionInputDto.isCorrect, justifications: justificationIds }}, { new: true })
            .then(async () => {
                const solution: Solution = await this.findById(id);
                return solution;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    private getIdsJustifications(justificationInputDtos: JustificationInputDto[]): string[] {
        const justificationIds: string[] = [];
        for (let i = 0 ; i < justificationInputDtos.length ; i++) {
            justificationIds[i] = justificationInputDtos[i].id;
        }
        return justificationIds;
    }
    async create(solutionInputDto: SolutionInputDto): Promise<Solution> {
        const solution: Solution = new SolutionBuilder(solutionInputDto.text, solutionInputDto.isCorrect).build();
        const solutionSchema = new SolutionSchema(solution);
        return solutionSchema.save()
            .then(async (solutionDocument: Document) => {
                const solution: Solution = solutionDocument ? SolutionDao.toSolution(solutionDocument) : undefined;
                return solution;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
