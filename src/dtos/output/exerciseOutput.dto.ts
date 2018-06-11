import { SolutionOutputDto } from "./solutionOutput.dto";

export interface ExerciseOutputDto  {
    id: string;
    formulation: string;
    solutions: SolutionOutputDto[];
}