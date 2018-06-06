import { Justification } from "../../models/justification.model";

export interface SolutionOutputDto  {
    id: number;
    isCorrect: boolean;
    text: string;
    justification?: Justification;
}
