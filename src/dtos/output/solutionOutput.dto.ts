import { JustificationOutputDto } from "./justificationOutput.dto";

export interface SolutionOutputDto  {
    id: number;
    isCorrect: boolean;
    text: string;
    justifications: JustificationOutputDto[];
}
