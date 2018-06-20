import { LessonOutputDto } from "./lessonOutput.dto";

export interface SessionOutputDto  {
    id: string;
    name: string;
    lessons?: LessonOutputDto[];
}
