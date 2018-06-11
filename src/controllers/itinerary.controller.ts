import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/http-status-codes.enum";
import logger from "../utils/logger";
import { Itinerary } from "../models/itinerary.model";
import { ItineraryResource } from "../resources/itinerary.resource";

export class ItineraryController {
    private itineraryResource: ItineraryResource;

    constructor() {
        this.itineraryResource = new ItineraryResource();
    }

    async create(req: Request, res: Response): Promise<any> {
        const name: string = req.body.name;
        const itinerary: Itinerary = await this.itineraryResource.create(name);
        // const itineraryOutputDto: ItineraryOutputDto = DtoService.toItineraryOutputDto(itinerary);
        itinerary ? res.status(HttpStatusCode.CREATED).json(itinerary) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: number = req.params.id;
        const itinerary: Itinerary = await this.itineraryResource.findById(id);
        // const itineraryOutputDto: ItineraryOutputDto = DtoService.toItineraryOutputDto(itinerary);
        itinerary ? res.status(HttpStatusCode.OK).json(itinerary) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const id: number = req.params.id;
        const itinerary: Itinerary = await this.itineraryResource.findById(id);
        if (itinerary) {
            const success: boolean = await this.itineraryResource.delete(itinerary);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
}


