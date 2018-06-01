import { Document } from "mongoose";
import logger from "../util/logger";
import { Video } from "../../models/video.model";
import VideoSchema from "../../schemas/video.schema";

export class InteractionDao {
    constructor() {
    }
    private static toInteraction(document: Document): Interaction {
        return new Interaction(document.get("url")).setId(document.get("_id"));
    }
    private static toArrayInteractions(documents: Document[]): Interaction[] {
        const interactions: Interaction[] = [];
        for (let i = 0; i < documents.length; i++) {
            interactions.push(InteractionDao.toInteraction(documents[i]));
        }
        return interactions;
    }
    async delete(id: number): Promise<boolean> {
        return await InteractionSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: number): Promise<Interaction> {
        return await InteractionSchema.findById(id)
            .then( (interactionDocument: Document) => {
                const interaction: Interaction = interactionDocument ? InteractionDao.toInteraction(interactionDocument) : undefined;
                return interaction;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(url: string): Promise<Interaction> {
        const interaction: Interaction = new Interaction(url);
        const interactionSchema = new InteractionSchema(interaction);
        return interactionSchema.save()
            .then( (interactionDocument: Document) => {
                const interaction: Interaction = interactionDocument ? InteractionDao.toInteraction(interactionDocument) : undefined;
                return interaction;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}

