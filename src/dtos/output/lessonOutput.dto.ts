import { InteractionOutputDto } from "./interactionOutput.dto";

export interface LessonOutputDto  {
    id: number;
    name: string;
    interactions: InteractionOutputDto[];
}