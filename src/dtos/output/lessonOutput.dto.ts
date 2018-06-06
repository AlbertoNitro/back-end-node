import { Interaction } from "../../models/interaction.model";

export interface LessonOutputDto  {
    id: number;
    name: string;
    interactions: Interaction[];
}