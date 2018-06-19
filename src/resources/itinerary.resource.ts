import { Itinerary } from "../models/itinerary.model";
import { ItineraryDao } from "../daos/itinerary.dao";
import { Formation } from "../models/formation.model";
import { FormationVisitor } from "../models/formation.visitor";
import { Session } from "../models/session.model";
import { UnitResource } from "./unit.resource";

export class ItineraryResource implements FormationVisitor {
    private itineraryDao: ItineraryDao;
    private formationId: string;
    private unitResource: UnitResource;

    constructor() {
        this.itineraryDao = new ItineraryDao();
        this.unitResource = new UnitResource();
    }

    async create(name: string, itineraryId: string, unitCode: number): Promise<Itinerary> {
        const itinerary: Itinerary = await this.itineraryDao.create(name);
        if (itineraryId) {
            this.updateFormations(itineraryId, itinerary.getId());
        } else if (unitCode) {
            this.unitResource.updateItineraries(unitCode, itinerary.getId());
        }
        return itinerary;
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
    async findAll(): Promise<Itinerary[]> {
        return await this.itineraryDao.findAll();
    }
    async updateFormations(id: string, formationId: string): Promise<Formation> {
        let itinerary: Itinerary = await this.findById(id);
        let formationsIds: string[];
        if (itinerary) {
            formationsIds = this.getFormationsIds(itinerary);
            const idToSearch: string = formationsIds.find(element => {
                return formationId === element;
            });
            if (idToSearch) {
                const index = formationsIds.indexOf(formationId);
                formationsIds.splice(index, 1);
            } else {
                formationsIds.push(formationId);
            }
        }
        itinerary = itinerary ? await this.itineraryDao.updateFormations(id, formationsIds) : undefined;
        return itinerary;
    }
    private getFormationsIds(itinerary: Itinerary) {
        const ids: string[] = [];
        const formations: Formation[] = itinerary.getFormations();
        for (let i = 0; i < formations.length; i++) {
            formations[i].accept(this);
            ids.push(this.formationId);
        }
        return ids;
    }
    visitSession(session: Session): void {
        this.formationId = session.getId();
    }
    visitItinerary(itinerary: Itinerary): void {
        this.formationId = itinerary.getId();
    }
}
