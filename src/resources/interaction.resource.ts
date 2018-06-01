import { VideoInteractionInput } from "../dtos/videoInteractionInput.dto";
import { InteractionDao } from "../services/daos/interaction.dao";
import { ExerciseInteractionInput } from "../dtos/exerciseInteractionInput.dto";
import { Interaction } from "../models/interaction.model";
import { InteractionInputDto } from "../dtos/interactionInputDto";

export class InteractionResource {
    private interactionDao: InteractionDao;
    constructor() {
        this.interactionDao = new InteractionDao();
    }
    async create(interactionDto: InteractionInputDto): Promise<Interaction> {
        return await this.interactionDao.create(interactionDto);
    }
    async createVideo(videoII: VideoInteractionInput) {
        this.interactionDao.createVideo(videoII);
    }
    async createExercise(exerciseII: ExerciseInteractionInput) {
        this.interactionDao.createExercise(exerciseII);
    }
}
