import { Unit } from "../../models/unit.model";
import logger from "../../util/logger";
import UnitSchema from "../../schemas/unit.schema";
import { UnitBuilder } from "../../models/builders/unit.builder";
import { Document } from "mongoose";
import { VideoInteractionInput } from "../../dtos/videoInteractionInput.dto";
import InteractionSchema from "../../schemas/interaction.schema";
import VideoSchema from "../../schemas/video.schema";
import { ExerciseInteractionInput } from "../../dtos/exerciseInteractionInput.dto";
import ExerciseSchema from "../../schemas/exercise.schema";
import { Interaction } from "../../models/interaction.model";
import { VideoBuilder } from "../../models/builders/video.builder";
import { ExerciseBuilder } from "../../models/builders/exercise.builder";

export class InteractionDao {

    constructor() {
    }
    private static toInteraction(document: Document): Interaction {
        if ( document.get("kind") == "Video") {
            return new VideoBuilder(document.get("url")).build();
        }
        else if ( document.get("kind") == "Exercise" ) {
            return new ExerciseBuilder(document.get("formulation")).build();
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
        console.log("Creando " + JSON.stringify(videoII.kind));
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
}
