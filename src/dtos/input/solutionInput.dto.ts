import { JustificationInputDto } from "./justificationInput.dto";

export interface SolutionInputDto  {
    id?: string;
    isCorrect: boolean;
    text: string;
    justifications?: JustificationInputDto[];
}