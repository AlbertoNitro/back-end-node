export class InteractionResource {
    constructor() {
<<<<<<< HEAD
=======
        this.interactionDao = new InteractionDao();
        this.videoResource = new VideoResource();
        this.exerciseResource = new ExerciseResource();
    }
    async createVideo(videoII: VideoInteractionInput) {
        this.interactionDao.createVideo(videoII);
    }
    async createExercise(exerciseII: ExerciseInteractionInput) {
        this.interactionDao.createExercise(exerciseII);
>>>>>>> develop
    }
    async findAll(): Promise<Interaction[]> {
        return await this.interactionDao.findAll();
    }
}
