import { SolutionInputDto } from "./solutionInput.dto";

export interface ExerciseInputDto  {
    formulation: string;
    solutions?: SolutionInputDto[];
    lessonId: string;
}