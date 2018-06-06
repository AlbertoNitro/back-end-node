import { Solution } from "../models/solution.model";

export interface ExerciseOutputDto  {
    formulation: string;
    solutions: Solution[];
}