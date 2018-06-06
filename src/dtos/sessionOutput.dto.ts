import { Lesson } from "../models/lesson.model";

export interface SessionOutputDto  {
    id: number;
    name: string;
    lessons: Lesson[];
}
