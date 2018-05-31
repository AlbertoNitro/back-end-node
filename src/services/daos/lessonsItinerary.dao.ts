import { Document } from "mongoose";
import logger from "../util/logger";
import { Lesson } from "../../models/lessonsItinerary.model";
import LessonsItinerarySchema from "../../schemas/lessonsItinerary.schema";

export class LessonsItineraryDao {
    constructor() {
    }

    private static toLessonsItinerary(document: Document): Lesson {
        return new LessonsItineraryBuilder().setId(document.get("_id")).setText(document.get("text")).setIsCorrect(document.get("isCorrect")).build();
    }
    private static toArrayLessonsItinerarys(documents: Document[]): Lesson[] {
        const lessonsItinerarys: Lesson[] = [];
        for (let i = 0; i < documents.length; i++) {
            lessonsItinerarys.push(LessonsItineraryDao.toLessonsItinerary(documents[i]));
        }
        return lessonsItinerarys;
    }
    async delete(id: number): Promise<boolean> {
        return await LessonsItinerarySchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: number): Promise<Lesson> {
        return await LessonsItinerarySchema.findById(id)
            .then( (lessonsItineraryDocument: Document) => {
                const lessonsItinerary: Lesson = lessonsItineraryDocument ? LessonsItineraryDao.toLessonsItinerary(lessonsItineraryDocument) : undefined;
                return lessonsItinerary;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(isCorrect: boolean, text: string): Promise<Lesson> {
        const lessonsItinerary: Lesson = new LessonsItineraryBuilder().setIsCorrect(isCorrect).setText(text).build();
        const lessonsItinerarySchema = new LessonsItinerarySchema(lessonsItinerary);
        return lessonsItinerarySchema.save()
            .then( (lessonsItineraryDocument: Document) => {
                const lessonsItinerary: Lesson = lessonsItineraryDocument ? LessonsItineraryDao.toLessonsItinerary(lessonsItineraryDocument) : undefined;
                return lessonsItinerary;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }

}
