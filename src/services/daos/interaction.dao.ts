import { Document } from "mongoose";
import logger from "../../util/logger";
import InteractionSchema from "../../schemas/interaction.schema";
import { Interaction } from "../../models/interaction.model";
import { VideoDao } from "./video.dao";
import { ExerciseDao } from "./exercise.dao";
import { Video } from "../../models/video.model";
import { Exercise } from "../../models/exercise.model";
import { Solution } from "../../models/solution.model";
import { VideoInteractionInput } from "../../dtos/videoInteractionInput.dto";
import VideoSchema from "../../schemas/video.schema";
import { ExerciseInteractionInput } from "../../dtos/exerciseInteractionInput.dto";
import ExerciseSchema from "../../schemas/exercise.schema";

export class InteractionDao {
    constructor() {
    }
    async createVideo(videoII: VideoInteractionInput) {
        console.log("Creando " + JSON.stringify(videoII.kind));
        VideoSchema.create(videoII)
            .then((interaction: Document) => {
                console.log(interaction);
            });
    }
    async createExercise(exerciseII: ExerciseInteractionInput) {
        console.log("Creando " + JSON.stringify(exerciseII.kind));
        ExerciseSchema.create(exerciseII)
            .then((interaction: Document) => {
                console.log(interaction);
            });
    }

    public static toInteraction(document: Document): Interaction {
        let interaction: Interaction;
        if (InteractionDao.isVideo(document)) {
            interaction = <Interaction> VideoDao.toVideo(document);
        } else {
            interaction = <Interaction> ExerciseDao.toExercise(document);
        }
        return interaction;
    }
    public static toArrayInteractions(documents: Document[]): Interaction[] {
        const interactions: Interaction[] = [];
        for (let i = 0; i < documents.length; i++) {
            interactions.push(InteractionDao.toInteraction(documents[i]));
        }
        return interactions;
    }
    private static isVideo(document: Document): boolean {
        return document.get("url");
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
    async create(formulation?: string, solutions?: Solution[], url?: string): Promise<Interaction> {
        let interaction: Interaction;
        if (url) {
            interaction = <Interaction> new Video(url);
        } else {
            interaction = <Interaction> new Exercise(formulation).setSolutions(solutions);
        }
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

