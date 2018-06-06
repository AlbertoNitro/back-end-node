import { Document } from "mongoose";
import logger from "../../util/logger";
import JustificationSchema from "../../schemas/justification.schema";
import { Justification } from "../../models/justification.model";
import { JustificationBuilder } from "../../models/builders/justification.builder";

export class JustificationDao {
    constructor() {
    }
    public static toJustification(document: Document): Justification {
        return new JustificationBuilder(document.get("text"), document.get("isCorrect")).setId(document.get("_id")).build();
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
    async findAll(): Promise<Justification[]> {
        return await JustificationSchema.find({})
            .then( (justificationsDocuments: Document[]) => {
                const justifications: Justification[] = justificationsDocuments ? JustificationDao.toArrayJustifications(justificationsDocuments) : undefined;
                return justifications;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(text: string, isCorrect: boolean): Promise<Justification> {
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
