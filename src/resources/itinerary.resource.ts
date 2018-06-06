import { Itinerary } from "../models/itinerary.model";
import { ItineraryDao } from "../services/daos/itinerary.dao";

export class ItineraryResource {
    private itineraryDao: ItineraryDao;

    constructor() {
        this.itineraryDao = new ItineraryDao();
    }

    async create(name: string): Promise<Itinerary> {
        return await this.itineraryDao.create(name);
    }
    async findById(id: number): Promise<Itinerary> {
        return await this.itineraryDao.findById(id);
    }
    async delete(itinerary: Itinerary): Promise<boolean> {
        return await this.itineraryDao.delete(itinerary.getId());
    }
}
