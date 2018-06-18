import { Itinerary } from "../models/itinerary.model";
import { ItineraryDao } from "../daos/itinerary.dao";
import { Formation } from "../models/formation.model";

export class ItineraryResource {
    private itineraryDao: ItineraryDao;

    constructor() {
        this.itineraryDao = new ItineraryDao();
    }

    async create(name: string, unitId: string): Promise<Itinerary> {
        return await this.itineraryDao.create(name);
    }
    async findById(id: string): Promise<Itinerary> {
        return await this.itineraryDao.findById(id);
    }
    async delete(itinerary: Itinerary): Promise<boolean> {
        return await this.itineraryDao.delete(itinerary.getId());
    }
    async update(id: string, name: string): Promise<Itinerary> {
        let itinerary: Itinerary = await this.findById(id);
        itinerary = itinerary ? await this.itineraryDao.update(id, name) : undefined;
        return itinerary;
    }
}
