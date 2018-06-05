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
import { VideoBuilder } from "../../models/builders/video.builder";
import { ExerciseBuilder } from "../../models/builders/exercise.builder";

export class InteractionDao {

    constructor() {
    }
    private static toInteraction(document: Document): Interaction {
        if ( document.get("kind") == "Video") {
            return new VideoBuilder(document.get("url")).setId(document.get("_id")).build();
        }
        else if ( document.get("kind") == "Exercise" ) {
            return new ExerciseBuilder(document.get("formulation")).setId(document.get("_id")).build();
        }
    }
    private static toArrayInteraction(documents: Document[]): Interaction[] {
        const interaction: Interaction[] = [];
        for (let i = 0; i < documents.length; i++) {
            interaction.push(InteractionDao.toInteraction(documents[i]));
        }
        console.log("interaction " + interaction);
        return interaction;
    }

    async createVideo(videoII: VideoInteractionInput) {
        VideoSchema.create(videoII)
            .then((interaction: Document) => {
                console.log(interaction);
            });
    }
    async createExercise(exerciseII: ExerciseInteractionInput) {
        ExerciseSchema.create(exerciseII)
            .then((interaction: Document) => {
                console.log(interaction);
            });
    }

    async findAll(): Promise<Interaction[]> {
        return await InteractionSchema.find({})
            .then( (interactionDocument: Document[]) => {
                const interaction: Interaction[] = InteractionDao.toArrayInteraction(interactionDocument);
                return interaction;
            })
            .catch(err => {
                console.log(err);
                return undefined;
            });
    }

    private static isVideo(document: Document): boolean {
        logger.info(" document.get(\"url\") + " +  document.get("url"));
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
}

