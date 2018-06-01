import { Document } from "mongoose";
import logger from "../util/logger";
import JustificationSchema from "../../schemas/justification.schema";
import { Justification } from "../../models/justification.model";

export class JustificationDao {
    constructor() {
    }
    public static toJustification(document: Document): Justification {
        return new Justification(document.get("text"), document.get("isCorrect")).setId(document.get("_id"));
    }
    public static toArrayJustifications(documents: Document[]): Justification[] {
        const justifications: Justification[] = [];
        for (let i = 0; i < documents.length; i++) {
            justifications.push(JustificationDao.toJustification(documents[i]));
        }
        return justifications;
    }
    async delete(id: number): Promise<boolean> {
        return await JustificationSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: number): Promise<Justification> {
        return await JustificationSchema.findById(id)
            .then( (justificationDocument: Document) => {
                const justification: Justification = justificationDocument ? JustificationDao.toJustification(justificationDocument) : undefined;
                return justification;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(isCorrect: boolean, text: string): Promise<Justification> {
        const justification: Justification = new Justification(text, isCorrect);
        const justificationSchema = new JustificationSchema(justification);
        return justificationSchema.save()
            .then( (justificationDocument: Document) => {
                const justification: Justification = justificationDocument ? JustificationDao.toJustification(justificationDocument) : undefined;
                return justification;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
