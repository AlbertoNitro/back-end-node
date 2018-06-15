import { SolutionInputDto } from "./solutionInput.dto";

export interface ExerciseInputDto  {
    id?: string;
    formulation: string;
    solutions?: SolutionInputDto[];
}