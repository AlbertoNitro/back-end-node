import { LessonOutputDto } from "./lessonOutput.dto";

export interface SessionOutputDto  {
    id: number;
    name: string;
    lessons: LessonOutputDto[];
}
