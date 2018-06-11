import { JustificationOutputDto } from "./justificationOutput.dto";

export interface SolutionOutputDto  {
    id: string;
    isCorrect: boolean;
    text: string;
    justifications: JustificationOutputDto[];
}
