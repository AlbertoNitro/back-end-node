import { Document } from "mongoose";
import { Itinerary } from "../models/itinerary.model";
import ItinerarySchema from "../schemas/itinerary.schema";
import logger from "../utils/logger";
import { ItineraryBuilder } from "../models/builders/itinerary.builder";
import { ConverterDocumentsToModelsService } from "../services/converterDocumentsToModels.service";

export class ItineraryDao {
    constructor() {
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
                const itinerary: Itinerary = itineraryDocument ? ConverterDocumentsToModelsService.toItinerary(itineraryDocument) : undefined;
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
                const itinerary: Itinerary = itineraryDocument ? ConverterDocumentsToModelsService.toItinerary(itineraryDocument) : undefined;
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
    async findAll(): Promise<Itinerary[]> {
        return await ItinerarySchema.find({})
            .then( (itinerariesDocument: Document[]) => {
                const itineraries: Itinerary[] = itinerariesDocument ? ConverterDocumentsToModelsService.toArrayItineraries(itinerariesDocument) : undefined;
                return itineraries;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async updateFormations(id: string, formationsIds: string[]): Promise<Itinerary> {
        return await ItinerarySchema.findOneAndUpdate({ _id: id }, { $set: {formations: formationsIds }}, { new: true })
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
