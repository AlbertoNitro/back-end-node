import { Unit } from "../models/unit.model";
import UnitSchema from "../schemas/unit.schema";
import { UnitBuilder } from "../models/builders/unit.builder";
import { Document } from "mongoose";
import logger from "../utils/logger";
import { ConverterDocumentsToModelsService } from "../services/converterDocumentsToModels.service";

export class UnitDao {
    constructor() {
    }


    async create(name: string): Promise<Unit> {
        const unit: Unit = new UnitBuilder(name).build();
        const unitSchema = new UnitSchema(unit);
        return unitSchema.save()
            .then( (unitDocument: Document) => {
                const unit: Unit = unitDocument ? ConverterDocumentsToModelsService.toUnit(unitDocument) : undefined;
                return unit;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async findById(id: string): Promise<Unit> {
        return await UnitSchema.findById(id)
            .then( (unitDocument: Document) => {
                const unit: Unit = unitDocument ? ConverterDocumentsToModelsService.toUnit(unitDocument) : undefined;
                return unit;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async findByName(name: string): Promise<Unit[]> {
        return await UnitSchema.find({name: new RegExp("^" + name + "[a-zA-Z]*?")})
            .then( (unitsDocument: Document[]) => {
                const units: Unit[] = unitsDocument ? ConverterDocumentsToModelsService.toArrayUnits(unitsDocument) : undefined;
                return units;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async findByCode(code: number): Promise<Unit> {
        return await UnitSchema.findOne({ code: code })
            .then( (unitDocument: Document) => {
                const unit: Unit = unitDocument ? ConverterDocumentsToModelsService.toUnit(unitDocument) : undefined;
                return unit;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async findAll(): Promise<Unit[]> {
        return await UnitSchema.find({})
            .then( (unitsDocument: Document[]) => {
                const units: Unit[] = unitsDocument ? ConverterDocumentsToModelsService.toArrayUnits(unitsDocument) : undefined;
                return units;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async delete(id: string): Promise<boolean> {
        return await UnitSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
    async update(id: string, name: string, content: string): Promise<Unit> {
        return await UnitSchema.findOneAndUpdate({ _id: id }, { $set: {name: name, content: content }}, { new: true })
            .then(async () => {
                const unit: Unit = await this.findById(id);
                return unit;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async updateItineraries(id: string, itinerariesIds: string[]): Promise<Unit> {
        return await UnitSchema.findOneAndUpdate({ _id: id }, { $set: {itineraries: itinerariesIds }}, { new: true })
            .then(async () => {
                const unit: Unit = await this.findById(id);
                return unit;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
}
