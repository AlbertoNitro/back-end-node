import { Relation } from "../models/relation.model";
import { UnitDao } from "./unit.dao";
import { Unit } from "../models/unit.model";
import { RelationInputDto } from "../dtos/input/relationInput.dto";
import RelationSchema from "../schemas/relation.schema";
import { RelationBuilder } from "../models/builders/relation.builder";
import { Document } from "mongoose";
import UnitSchema from "../schemas/unit.schema";
import { UnitBuilder } from "../models/builders/unit.builder";
import logger from "../utils/logger";
import { ConverterDocumentsToModelsService } from "../services/converterDocumentsToModels.service";

export class RelationDao {
    private unitDao: UnitDao;

    constructor() {
        this.unitDao = new UnitDao();
    }

    async findByLowerUnit(unitId: string): Promise<Relation[]> {
        return await RelationSchema.find({lowerUnit: unitId})
            .then( async (relationsDocument: Document[]) => {
                const relationsPopulate: Document[] = await UnitSchema.populate(relationsDocument, {path: "topUnit lowerUnit"});
                const relations: Relation[] = relationsPopulate ? ConverterDocumentsToModelsService.toArrayRelations(relationsPopulate) : undefined;
                return relations;
            })
            .catch ( err => {
                    logger.error(err);
                    return undefined;
            });
    }
    async findByTopUnit(unitId: string): Promise<Relation[]> {
        return await RelationSchema.find({topUnit: unitId})
            .then( async (relationsDocument: Document[]) => {
                const relationsPopulate: Document[] = await UnitSchema.populate(relationsDocument, {path: "topUnit lowerUnit"});
                const relations: Relation[] = relationsPopulate ? ConverterDocumentsToModelsService.toArrayRelations(relationsPopulate) : undefined;
                return relations;
            })
            .catch ( err => {
                    logger.error(err);
                    return undefined;
            });
    }
    async findAll(): Promise<Relation[]> {
        return await RelationSchema.find({})
            .then( async (relationsDocument: Document[]) => {
                const relationsPopulate: Document[] = await UnitSchema.populate(relationsDocument, {path: "topUnit lowerUnit"});
                const relations: Relation[] = relationsPopulate ? ConverterDocumentsToModelsService.toArrayRelations(relationsPopulate) : undefined;
                return relations;
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
    }
    async create(relationDto: RelationInputDto): Promise<Relation> {
        const topUnit: Unit = await this.unitDao.findByCode(relationDto.topUnitCode);
        const lowerUnit: Unit = await this.unitDao.findByCode(relationDto.lowerUnitCode);
        if (topUnit && lowerUnit) {
            const relation: Relation = new RelationBuilder().setType(relationDto.type).setSemantics(relationDto.semantics).setCardinalTopUnit(relationDto.cardinalTopUnit).setCardinalLowerUnit(relationDto.cardinalLowerUnit).setTopUnit(new UnitBuilder(topUnit.getName()).setId(topUnit.getId()).setCode(topUnit.getCode()).build()).setLowerUnit(new UnitBuilder(lowerUnit.getName()).setId(lowerUnit.getId()).setCode(lowerUnit.getCode()).build()).build();
            const relationSchema = new RelationSchema(relation);
            return await relationSchema.save()
            .then( async (relations: Document) => {
                const relationsDocument: any = await UnitSchema.populate(relations, {path: "topUnit lowerUnit"});
                if (relationsDocument) {
                    return ConverterDocumentsToModelsService.toRelation(relationsDocument);
                } else {
                    return undefined;
                }
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
        } else {
            return undefined;
        }
    }
    async delete(id: string): Promise<boolean> {
        return RelationSchema.deleteOne({ _id: id })
            .then( () => {
                return true;
            })
            .catch( err => {
                logger.error(err);
                return false;
            });
    }
    async findByTopAndLowerUnit(top: Unit, lower: Unit): Promise<Relation[]> {
        return RelationSchema.find({ topUnit: top, lowerUnit: lower})
            .then( async (relationsDocument: Document[]) => {
                const relationsPopulate: Document[] = await UnitSchema.populate(relationsDocument, {path: "topUnit lowerUnit"});
                const relations: Relation[] = relationsPopulate ? ConverterDocumentsToModelsService.toArrayRelations(relationsPopulate) : undefined;
                return relations;
            })
            .catch ( err => {
                    logger.error(err);
                    return undefined;
            });
    }
}
