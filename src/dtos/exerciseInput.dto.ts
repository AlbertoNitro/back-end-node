import { Solution } from "../models/solution.model";

export interface ExerciseInputDto  {
    formulation: string;
    solutions: Solution[];
}