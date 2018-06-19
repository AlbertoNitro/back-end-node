import { Document } from "mongoose";
import { Itinerary } from "../models/itinerary.model";
import ItinerarySchema from "../schemas/itinerary.schema";
import logger from "../utils/logger";
import { Formation } from "../models/formation.model";
import { SessionDao } from "./session.dao";
import { ItineraryBuilder } from "../models/builders/itinerary.builder";

export class ItineraryDao {
    constructor() {
    }

    static toItinerary(document: Document): Itinerary {
        const formations: Formation[] = [];
        const formationsDocuments: Document[] = document.get("formations");
        for (let i = 0 ; i < formationsDocuments.length ; i++) {
            const formationDocument: Document = formationsDocuments[i];
            formationDocument.get("kind") === "Session" ? formations.push(SessionDao.toSession(formationDocument)) : formations.push(ItineraryDao.toItinerary(formationDocument));
        }
        const itinerary: Itinerary = new ItineraryBuilder(document.get("name")).setId(document.get("_id")).setFormations(formations).build();
        return itinerary;
    }
    static toArrayItineraries(documents: Document[]): Itinerary[] {
        const itineraries: Itinerary[] = [];
        for (let i = 0; i < documents.length; i++) {
            itineraries.push(ItineraryDao.toItinerary(documents[i]));
        }
        return itineraries;
    }
    async delete(id: string): Promise<boolean> {
        return await ItinerarySchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async findById(id: string): Promise<Itinerary> {
        return await ItinerarySchema.findById(id)
            .then( async (itineraryDocument: Document) => {
                const itinerary: Itinerary = itineraryDocument ? ItineraryDao.toItinerary(itineraryDocument) : undefined;
                return itinerary;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(name: string): Promise<Itinerary> {
        const itinerary: Itinerary = new ItineraryBuilder(name).build();
        const itinerarySchema = new ItinerarySchema(itinerary);
        return itinerarySchema.save()
            .then( async(itineraryDocument: Document) => {
                const itinerary: Itinerary = itineraryDocument ? ItineraryDao.toItinerary(itineraryDocument) : undefined;
                return itinerary;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async update(id: string, name: string): Promise<Itinerary> {
        return await ItinerarySchema.findOneAndUpdate({ _id: id }, { $set: {name: name }}, { new: true })
            .then(async () => {
                const itinerary: Itinerary = await this.findById(id);
                return itinerary;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
