import { Justification } from "../models/justification.model";

export interface SolutionInputDto  {
    isCorrect: boolean;
    text: string;
    justifications?: Justification[];
}