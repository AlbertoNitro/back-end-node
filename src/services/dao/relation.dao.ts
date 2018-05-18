import { Relation } from "../../models/relation.model";
import { UnitDao } from "./unit.dao";
import { Unit } from "../../models/unit.model";
import { RelationInputDto } from "../../dtos/relationInput.dto";
import RelationSchema from "../../schemas/relation.schema";
import { RelationBuilder } from "../../models/builders/relation.builder";
import { Document } from "mongoose";
import UnitSchema from "../../schemas/unit.schema";
import { UnitBuilder } from "../../models/builders/unit.builder";

export class RelationDao {
    private unitDao: UnitDao;

    constructor() {
        this.unitDao = new UnitDao();
    }
    private toRelation(document: Document): Relation {
        return new RelationBuilder().setSemantics(document.get("semantics")).setId(document.get("_id")).setType(document.get("type")).setTopUnit(new UnitBuilder(document.get("topUnit").get("name")).setId(document.get("topUnit").get("_id")).setCode(document.get("topUnit").get("code")).build()).setLowerUnit(new UnitBuilder(document.get("lowerUnit").get("name")).setId(document.get("lowerUnit").get("_id")).setCode(document.get("lowerUnit").get("code")).build()).build();
    }
    private toArrayRelations(documents: Document[]): Relation[] {
        const relations: Relation[] = [];
        for ( let i = 0; i < documents.length; i++) {
            relations.push(this.toRelation(documents[i]));
        }
        return relations;
    }
    async findAll() {
        return await RelationSchema.find({})
        .then( async relations => {
            return await UnitSchema.populate(relations, {path: "topUnit lowerUnit"}, async (err, relations) => {
                    return this.toArrayRelations(relations);
            } );
        } )
        .catch ( err => {
                return undefined;
            });
    }
    async findByLowerUnit(codeUnit: number) {
        return await RelationSchema.find({ lowerUnit: codeUnit }, async (err, relation) => {
            await UnitSchema.populate(relation, {path: "topUnit lowerUnit"}, async (err, relation) => {
                return this.toArrayRelations(relation);
            } );
        })
            .catch ( err => {
                return undefined;
            });
    }
    async findByTopUnit(codeUnit: number): Promise<Relation[]> {
        return await RelationSchema.find({ topUnit: codeUnit }, async (err, relation) => {
            await UnitSchema.populate(relation, {path: "topUnit lowerUnit"}, async (err, relation) => {
                return this.toArrayRelations(relation);
            } );
        })
            .catch ( err => {
                return undefined;
            });

    }
    async create(relationDto: RelationInputDto): Promise<Relation> {
        const topUnit: Unit = await this.unitDao.findByCode(relationDto.idTopUnit);
        const lowerUnit: Unit = await this.unitDao.findByCode(relationDto.idLowerUnit);
        const relationEntity: Relation = new RelationBuilder().setType(relationDto.type).setTopUnit(new UnitBuilder(topUnit.getName()).setId(topUnit.getId()).setCode(topUnit.getCode()).build()).setLowerUnit(new UnitBuilder(lowerUnit.getName()).setId(lowerUnit.getId()).setCode(lowerUnit.getCode()).build()).build();
        const relation = new RelationSchema(relationEntity);
        return await relation.save()
            .then( async relation => {
                console.log("then" + relation);
                return await UnitSchema.populate(relation, {path: "topUnit lowerUnit"}, async (err, relation) => {
                    return relation;
                } );
            })
            .catch ( err => {
                console.log("ERR" + err);
                return undefined;
            });

    }
    async delete(id: string): Promise<boolean> {
        return RelationSchema.deleteOne({ _id: id })
            .then( message => {
                return true;
            })
            .catch( err => {
                return false;
            });
    }
}
