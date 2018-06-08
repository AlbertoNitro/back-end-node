import { ExerciseOutputDto } from "./exerciseOutput.dto";
import { VideoOutputDto } from "./videoOutput.dto";

export interface InteractionOutputDto {
    exercise?: ExerciseOutputDto;
    video?: VideoOutputDto;
}