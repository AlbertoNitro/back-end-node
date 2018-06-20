import { InteractionOutputDto } from "./interactionOutput.dto";

export interface LessonOutputDto  {
    id: string;
    name: string;
    interactions: InteractionOutputDto[]; // Array de identificadores
}