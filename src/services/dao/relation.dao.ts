import { Relation } from "../../models/relation.model";
import { UnitDao } from "./unit.dao";
import { Unit } from "../../models/unit.model";
import { RelationInputDto } from "../../dtos/relationInput.dto";
import RelationSchema from "../../schemas/relation.schema";
import { RelationBuilder } from "../../models/builders/relation.builder";
import { Document } from "mongoose";

export class RelationDao {
    private unitDao: UnitDao;

    constructor() {
        this.unitDao = new UnitDao();
    }

    async findAll(): Promise<Relation[]> {
        return await RelationSchema.find({})
            .then( relations => {
                return relations;
            })
            .catch ( err => {
                return undefined;
            });
    }
    async findByLowerUnit(id: Number): Promise<Relation[]> {
        return await RelationSchema.find({ lowerUnit: id.toString() })
        .then( relation => {
            return this.documentArrayToRelation(relation);
        })
        .catch ( err => {
            return undefined;
        });
    }
    async findByTopUnit(id: Number): Promise<Relation[]> {
        return await RelationSchema.find({ topUnit: id.toString() })
        .then( relation => {
            return this.documentArrayToRelation(relation);
        })
        .catch ( err => {
            return undefined;
        });
    }
    async create(relationDto: RelationInputDto): Promise<Relation> {
        const topUnit: Unit = await this.unitDao.findById(relationDto.idTopUnit);
        const lowerUnit: Unit = await this.unitDao.findById(relationDto.idLowerUnit);
        const relationEntity: Relation = new RelationBuilder().setType(relationDto.type).setTopUnit(topUnit).setLowerUnit(lowerUnit).build();
        const relation = new RelationSchema(relationEntity);
        return relation.save()
            .then( relation => {
                return relation;
            })
            .catch ( err => {
                return undefined;
            });
    }
    async deleteByTop(_id: Number): Promise<boolean> {
        return RelationSchema.deleteOne({ topUnit: _id })
            .then( message => {
                return true;
            })
            .catch( err => {
                return false;
            });
    }
    async deleteByDown(_id: Number): Promise<boolean> {
        return RelationSchema.deleteOne({ lowerUnit: _id })
            .then( message => {
                return true;
            })
            .catch( err => {
                return false;
            });
    }
    private documentArrayToRelation(document: Document[]) {
        const relationArray: Relation[] = [];
        for (let i = 0; i < document.length; i++) {
            relationArray.push(new RelationBuilder().setType(document[i].get("type")).setTopUnit(document[i].get("topUnit")).setLowerUnit(document[i].get("lowerUnit")).build());
        }
        return relationArray;
    }
}
