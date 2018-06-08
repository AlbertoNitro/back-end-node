import { SolutionOutputDto } from "./solutionOutput.dto";

export interface ExerciseOutputDto  {
    id: number;
    formulation: string;
    solutions: SolutionOutputDto[];
}