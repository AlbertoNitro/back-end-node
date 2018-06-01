import { Document } from "mongoose";
import logger from "../util/logger";
import { Itinerary } from "../../models/itinerary.model";
import { SessionDao } from "./session.dao";
import { Session } from "../../models/session.model";
import ItinerarySchema from "../../schemas/itinerary.schema";

export class ItineraryDao {
    constructor() {
    }

    private static toItinerary(document: Document): Itinerary {
        return new Itinerary(document.get("name")).setId(document.get("_id").setSessions(SessionDao.toArraySessions(document.get("sessions"))));
    }
    private static toArrayItinerarys(documents: Document[]): Itinerary[] {
        const itineraries: Itinerary[] = [];
        for (let i = 0; i < documents.length; i++) {
            itineraries.push(ItineraryDao.toItinerary(documents[i]));
        }
        return itineraries;
    }
    async delete(id: number): Promise<boolean> {
        return await ItinerarySchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: number): Promise<Itinerary> {
        return await ItinerarySchema.findById(id)
            .then( (itineraryDocument: Document) => {
                const itinerary: Itinerary = itineraryDocument ? ItineraryDao.toItinerary(itineraryDocument) : undefined;
                return itinerary;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(name: string, sessions: Session[]): Promise<Itinerary> {
        const itinerary: Itinerary = new Itinerary(name).setSessions(sessions);
        const itinerarySchema = new ItinerarySchema(itinerary);
        return itinerarySchema.save()
            .then( (itineraryDocument: Document) => {
                const itinerary: Itinerary = itineraryDocument ? ItineraryDao.toItinerary(itineraryDocument) : undefined;
                return itinerary;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
