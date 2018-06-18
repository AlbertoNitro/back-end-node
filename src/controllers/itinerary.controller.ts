import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/http-status-codes.enum";
import logger from "../utils/logger";
import { Itinerary } from "../models/itinerary.model";
import { ItineraryResource } from "../resources/itinerary.resource";
import { DtoService } from "../services/dto.service";
import { ItineraryOutputDto } from "../dtos/output/itineraryOutput.dto";
import { ItineraryInputDto } from "../dtos/input/itineraryInput.dto";

export class ItineraryController {
    private itineraryResource: ItineraryResource;
    private dtoService: DtoService;

    constructor() {
        this.itineraryResource = new ItineraryResource();
        this.dtoService = new DtoService();
    }

    async create(req: Request, res: Response): Promise<any> {
        const itineraryInputDto: ItineraryInputDto = req.body;
        const itinerary: Itinerary = await this.itineraryResource.create(itineraryInputDto.name, itineraryInputDto.unitId);
        const itineraryOutputDto: ItineraryOutputDto = this.dtoService.toItineraryOutputDto(itinerary);
        itinerary ? res.status(HttpStatusCode.CREATED).json(itineraryOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const itinerary: Itinerary = await this.itineraryResource.findById(id);
        const itineraryOutputDto: ItineraryOutputDto = this.dtoService.toItineraryOutputDto(itinerary);
        itinerary ? res.status(HttpStatusCode.OK).json(itineraryOutputDto) : res.status(HttpStatusCode.NOT_FOUND).end();
    }
    async delete(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const itinerary: Itinerary = await this.itineraryResource.findById(id);
        if (itinerary) {
            const success: boolean = await this.itineraryResource.delete(itinerary);
            success ? res.status(HttpStatusCode.NO_CONTENT).end() : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
    async update(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        let itinerary: Itinerary = await this.itineraryResource.findById(id);
        if (itinerary) {
            const itineraryInputDto: ItineraryInputDto = req.body;
            itinerary = await this.itineraryResource.update(id, itineraryInputDto.unitId);
            const itineraryOutputDto: ItineraryOutputDto = this.dtoService.toItineraryOutputDto(itinerary);
            itinerary ? res.status(HttpStatusCode.OK).json(itineraryOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
}


