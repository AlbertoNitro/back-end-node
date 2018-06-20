export interface InteractionOutputDto {
    video?: VideoMinimunMinimunDto;
    exercise?: ExerciseMinimunOutputDto;
}

interface VideoMinimunMinimunDto {
    id: string;
}

interface ExerciseMinimunOutputDto {
    id: string;
}