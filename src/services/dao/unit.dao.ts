import { Unit } from "../../models/unit.model";
import logger from "../../util/logger";
import UnitSchema from "../../schemas/unit.schema";
import { UnitBuilder } from "../../models/builders/unit.builder";
import { Document } from "mongoose";

export class UnitDao {
    constructor() {
    }
    private toUnit(document: Document): Unit {
        return new UnitBuilder(document.get("name")).setId(document.get("_id")).setCode(document.get("code")).build();
    }
    private toArrayUnits(documents: Document[]) {
        const units: Unit[] = [];
        for (let i = 0; i < documents.length; i++) {
            units.push(this.toUnit(documents[i]));
        }
        return units;
    }
    async create(name: string): Promise<Unit> {
        const unitEntity = new UnitBuilder(name).build();
        const unit = new UnitSchema(unitEntity);
        return unit.save()
            .then( unit => {
                return this.toUnit(unit);
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async findById(id: number): Promise<Unit> {
        return await UnitSchema.findById(id)
            .then( unit => {
                return this.toUnit(unit);
            })
            .catch ( err => {
                console.log("Catch");
                return undefined;
            });
    }
    async findByName(name: string): Promise<Unit[]> {
        return await UnitSchema.find({name: new RegExp("^" + name + "[a-zA-Z]*?")})
            .then( units => {
                return this.toArrayUnits(units);
            })
            .catch ( err => {
                return undefined;
            });
    }
    async findByCode(code: number): Promise<Unit> {
        return await UnitSchema.find({ code: code })
            .then( units => {
                return this.toUnit(units[0]);
            })
            .catch ( err => {
                return undefined;
            });
    }
    async findAll(): Promise<Unit[]> {
        return await UnitSchema.find({})
            .then( units => {
                return this.toArrayUnits(units);
            })
            .catch ( err => {
                return undefined;
            });
    }
    async delete(code: number): Promise<boolean> {
        return await UnitSchema.deleteOne({code: code})
            .then( unit => {
                return true;
            })
            .catch ( err => {
                return false;
            });
    }

}
