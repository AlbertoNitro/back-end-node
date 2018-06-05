import { Justification } from "../models/justification.model";

export interface SolutionOutputDto  {
    _id: number;
    isCorrect: boolean;
    text: string;
    justification?: Justification;
}
