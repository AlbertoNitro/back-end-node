import { Request, Response } from "express";
import { HttpStatusCode } from "../utils/http-status-codes.enum";
import logger from "../utils/logger";
import { Itinerary } from "../models/itinerary.model";
import { ItineraryResource } from "../resources/itinerary.resource";
import { ItineraryOutputDto } from "../dtos/output/itineraryOutput.dto";
import { ItineraryInputDto } from "../dtos/input/itineraryInput.dto";
import { FormationOutputDto } from "../dtos/output/formationOutput.dto";
import { ConverterModelsToDtosService } from "../services/converterModelsToDtos.service";

export class ItineraryController {
    private itineraryResource: ItineraryResource;
    private converterModelsToDtosService: ConverterModelsToDtosService;

    constructor() {
        this.itineraryResource = new ItineraryResource();
        this.converterModelsToDtosService = new ConverterModelsToDtosService();
    }

    async create(req: Request, res: Response): Promise<any> {
        const itineraryInputDto: ItineraryInputDto = req.body;
        if (itineraryInputDto.itineraryId || itineraryInputDto.unitCode) {
            const itinerary: Itinerary = await this.itineraryResource.create(itineraryInputDto.name, itineraryInputDto.itineraryId, itineraryInputDto.unitCode);
            const itineraryOutputDto: ItineraryOutputDto = this.converterModelsToDtosService.toItineraryOutputDto(itinerary);
            itinerary ? res.status(HttpStatusCode.CREATED).json(itineraryOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.BAD_REQUEST).end();
        }
    }
    async findById(req: Request, res: Response): Promise<any> {
        const id: string = req.params.id;
        const itinerary: Itinerary = await this.itineraryResource.findById(id);
        const itineraryOutputDto: ItineraryOutputDto = this.converterModelsToDtosService.toItineraryOutputDto(itinerary);
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
            itinerary = await this.itineraryResource.update(id, itineraryInputDto.name);
            const itineraryOutputDto: ItineraryOutputDto = this.converterModelsToDtosService.toItineraryOutputDto(itinerary);
            itinerary ? res.status(HttpStatusCode.OK).json(itineraryOutputDto) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
        } else {
            res.status(HttpStatusCode.NOT_FOUND).end();
        }
    }
    async findAll(req: Request, res: Response): Promise<any> {
        const itineraries: Itinerary[] = await this.itineraryResource.findAll();
        const formationOutputDtos: FormationOutputDto[] = this.converterModelsToDtosService.toArrayFormationOutputDto(itineraries);
        itineraries ? res.status(HttpStatusCode.OK).json(formationOutputDtos) : res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).end();
    }
}


