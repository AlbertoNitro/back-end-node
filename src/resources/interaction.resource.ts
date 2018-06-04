import { VideoInteractionInput } from "../dtos/videoInteractionInput.dto";
import { InteractionDao } from "../services/daos/interaction.dao";
import { ExerciseInteractionInput } from "../dtos/exerciseInteractionInput.dto";
import { Interaction } from "../models/interaction.model";

export class InteractionResource {

    interactionDao: InteractionDao = new InteractionDao();
    constructor() {

    }

    async createVideo(videoII: VideoInteractionInput) {
        this.interactionDao.createVideo(videoII);
    }
    async createExercise(exerciseII: ExerciseInteractionInput) {
        this.interactionDao.createExercise(exerciseII);
    }
    async findAll(): Promise<Interaction[]> {
        return await this.interactionDao.findAll();
    }
}
