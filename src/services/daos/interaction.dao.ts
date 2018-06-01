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

export class InteractionDao {
    static toUnit(arg0: any): any {

    }
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
}