import { Relation } from "../../models/relation.model";
import { UnitDao } from "./unit.dao";
import { Unit } from "../../models/unit.model";
import { RelationInputDto } from "../../dtos/relationInput.dto";
import RelationSchema from "../../schemas/relation.schema";
import { RelationBuilder } from "../../models/builders/relation.builder";
import { Document } from "mongoose";
import UnitSchema from "../../schemas/unit.schema";
import { UnitBuilder } from "../../models/builders/unit.builder";
import logger from "../../util/logger";

export class RelationDao {
    private unitDao: UnitDao;

    constructor() {
        this.unitDao = new UnitDao();
    }

    private toRelation(document: any): Relation {
        return new RelationBuilder().setCardinalTopUnit(document.get("cardinalTopUnit")).setCardinalLowerUnit(document.get("cardinalLowerUnit")).setSemantics(document.get("semantics")).setId(document.get("_id")).setType(document.get("type")).setTopUnit(new UnitBuilder(document.get("topUnit").get("name")).setId(document.get("topUnit").get("_id")).setCode(document.get("topUnit").get("code")).build()).setLowerUnit(new UnitBuilder(document.get("lowerUnit").get("name")).setId(document.get("lowerUnit").get("_id")).setCode(document.get("lowerUnit").get("code")).build()).build();
    }
    private toArrayRelations(documents: Document[]): Relation[] {
        const relations: Relation[] = [];
        for ( let i = 0; i < documents.length; i++) {
            relations.push(this.toRelation(documents[i]));
        }
        return relations;
    }
    async findByLowerUnit(unitId: number): Promise<Relation[]> {
        return await RelationSchema.find({lowerUnit: unitId})
            .then( async (relations: Document[]) => {
                const relationsDocument: Document[] = await UnitSchema.populate(relations, {path: "topUnit lowerUnit"});
                if (relationsDocument) {
                    return this.toArrayRelations(relationsDocument);
                } else {
                    return undefined;
                }
            })
            .catch ( err => {
                    logger.error(err);
                    return undefined;
            });
    }
    async findByTopUnit(unitId: number): Promise<Relation[]> {
        return await RelationSchema.find({topUnit: unitId})
            .then( async (relations: Document[]) => {
                const relationsDocument: Document[] = await UnitSchema.populate(relations, {path: "topUnit lowerUnit"});
                if (relationsDocument) {
                    return this.toArrayRelations(relationsDocument);
                } else {
                    return undefined;
                }
            })
            .catch ( err => {
                    logger.error(err);
                    return undefined;
            });
    }
    async findAll(): Promise<Relation[]> {
        return await RelationSchema.find({})
            .then( async (relations: Document[]) => {
                const relationsDocument: Document[] = await UnitSchema.populate(relations, {path: "topUnit lowerUnit"});
                if (relationsDocument) {
                    return this.toArrayRelations(relationsDocument);
                } else {
                    return undefined;
                }
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
            const relationEntity: Relation = new RelationBuilder().setType(relationDto.type).setTopUnit(new UnitBuilder(topUnit.getName()).setId(topUnit.getId()).setCode(topUnit.getCode()).build()).setLowerUnit(new UnitBuilder(lowerUnit.getName()).setId(lowerUnit.getId()).setCode(lowerUnit.getCode()).build()).build();
            const relation = new RelationSchema(relationEntity);
            return await relation.save()
            .then( async (relations: Document) => {
                const relationsDocument: any = await UnitSchema.populate(relations, {path: "topUnit lowerUnit"});
                if (relationsDocument) {
                    return this.toRelation(relationsDocument);
                } else {
                    return undefined;
                }
            })
            .catch ( err => {
                logger.error(err);
                return undefined;
            });
        } else {
            logger.info("L");
            return undefined;
        }
    }
    async delete(id: number): Promise<boolean> {
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
            .then( async (relations: Document[]) => {
                const relationsDocument: Document[] = await UnitSchema.populate(relations, {path: "topUnit lowerUnit"});
                if (relationsDocument) {
                    return this.toArrayRelations(relationsDocument);
                } else {
                    return undefined;
                }
            })
            .catch ( err => {
                    logger.error(err);
                    return undefined;
            });
    }
}
