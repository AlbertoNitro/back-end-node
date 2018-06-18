import { JustificationInputDto } from "./justificationInput.dto";

export interface SolutionInputDto  {
    isCorrect: boolean;
    text: string;
    justifications?: JustificationInputDto[];
}