import { Unit } from "../../models/unit.model";
import logger from "../../util/logger";
import UnitSchema from "../../schemas/unit.schema";
import { UnitBuilder } from "../../models/builders/unit.builder";
import { Document } from "mongoose";

export class UnitDao {
    constructor() {
    }

    private static toUnit(document: Document): Unit {
        return new UnitBuilder(document.get("name")).setId(document.get("_id")).setCode(document.get("code")).build();
    }
    private static toArrayUnits(documents: Document[]): Unit[] {
        const units: Unit[] = [];
        for (let i = 0; i < documents.length; i++) {
            units.push(UnitDao.toUnit(documents[i]));
        }
        return units;
    }
    async create(name: string): Promise<Unit> {
        const unit: Unit = new UnitBuilder(name).build();
        const unitSchema = new UnitSchema(unit);
        return unitSchema.save()
            .then( (unitDocument: Document) => {
                const unit: Unit = unitDocument ? UnitDao.toUnit(unitDocument) : undefined;
                return unit;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async findById(id: number): Promise<Unit> {
        return await UnitSchema.findById(id)
            .then( (unitDocument: Document) => {
                const unit: Unit = unitDocument ? UnitDao.toUnit(unitDocument) : undefined;
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
                const units: Unit[] = unitsDocument ? UnitDao.toArrayUnits(unitsDocument) : undefined;
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
                const unit: Unit = unitDocument ? UnitDao.toUnit(unitDocument) : undefined;
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
                const units: Unit[] = unitsDocument ? UnitDao.toArrayUnits(unitsDocument) : undefined;
                return units;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async delete(id: number): Promise<boolean> {
        return await UnitSchema.deleteOne({_id: id })
            .then( () => {
                return true;
            })
            .catch ( err => {
                logger.error(err);
                return false;
            });
    }
}
