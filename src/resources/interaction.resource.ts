import { VideoInteractionInput } from "../dtos/videoInteractionInput.dto";
import { InteractionDao } from "../services/daos/interaction.dao";
import { ExerciseInteractionInput } from "../dtos/exerciseInteractionInput.dto";
import { Interaction } from "../models/interaction.model";
import { InteractionInputDto } from "../dtos/interactionInputDto";
import { ExerciseResource } from "./exercise.resource";
import { VideoResource } from "./video.resource";

export class InteractionResource {
    private interactionDao: InteractionDao;
    private videoResource: VideoResource;
    private exerciseResource: ExerciseResource;

    constructor() {
        this.interactionDao = new InteractionDao();
        this.videoResource = new VideoResource();
        this.exerciseResource = new ExerciseResource();
    }
    async create(interactionDto: InteractionInputDto): Promise<Interaction> {
        if (interactionDto.url) {
        } else {

        }
        return await this.interactionDao.create(interactionDto);
    }
    async createVideo(videoII: VideoInteractionInput) {
        this.interactionDao.createVideo(videoII);
    }
    async createExercise(exerciseII: ExerciseInteractionInput) {
        this.interactionDao.createExercise(exerciseII);
    }
}
