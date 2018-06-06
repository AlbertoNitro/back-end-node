import { Document } from "mongoose";
import { Itinerary } from "../../models/itinerary.model";
import ItinerarySchema from "../../schemas/itinerary.schema";
import logger from "../../util/logger";
import { Formation } from "../../models/Formation.model";
import { SessionDao } from "./session.dao";

export class ItineraryDao {
    constructor() {
    }

    public static toItinerary(document: Document): Itinerary {
        const formations: Formation[] = [];
        const formationsDocuments: Document[] = document.get("formations");
        for (let i = 0 ; i < formationsDocuments.length ; i++) {
            const formationDocument: Document = formationsDocuments[i];
            formationDocument.get("kind") === "Session" ? formations.push(<Formation> SessionDao.toSession(formationDocument)) : formations.push(<Formation> ItineraryDao.toItinerary(formationDocument));
        }
        const itinerary: Itinerary = new Itinerary(document.get("name")).setId(document.get("_id")).setFormations(formations);
        return itinerary;
    }
    public static toArrayItinerarys(documents: Document[]): Itinerary[] {
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
    async create(name: string): Promise<Itinerary> {
        const itinerary: Itinerary = new Itinerary(name);
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

