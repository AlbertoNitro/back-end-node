import { Solution } from "../../models/solution.model";

export interface ExerciseOutputDto  {
    id: number;
    formulation: string;
    solutions: Solution[];
}