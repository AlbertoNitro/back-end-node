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
    private search: any;

    constructor() {
        this.unitDao = new UnitDao();
    }

    toRelation(relations: Document[]) {
        const relation: Relation[] = [];
        for ( let i = 0; i < relations.length; i++) {
            relation.push(new RelationBuilder().setType(relations[i].get("type")).setTopUnit(new UnitBuilder(relations[i].get("topUnit").get("name")).setId(relations[i].get("topUnit").get("_id")).setCode(relations[i].get("topUnit").get("code")).build()).setLowerUnit(new UnitBuilder(relations[i].get("lowerUnit").get("name")).setId(relations[i].get("lowerUnit").get("_id")).setCode(relations[i].get("lowerUnit").get("code")).build()).build());
        }
        return relation;
    }
    async findAll() {
        await RelationSchema.find({}, async (err, relation) => {
            await UnitSchema.populate(relation, {path: "topUnit"}, async (err, relation) => {
                await UnitSchema.populate(relation, {path: "lowerUnit"}, (err, relation) => {
                    this.search = this.toRelation(relation);
                } );
            } );
        })
            .catch ( err => {
                this.search = undefined;
            });
        return this.search;
    }
    async findByLowerUnit(codeUnit: number): Promise<Relation[]> {
        return await RelationSchema.find({ lowerUnit: codeUnit })
            .then( relation => {
                return this.documentArrayToRelation(relation);
            })
            .catch ( err => {
                return undefined;
            });
    }
    async findByTopUnit(codeUnit: number): Promise<Relation[]> {
        return await RelationSchema.find({ topUnit: codeUnit })
            .then( relation => {
                return this.documentArrayToRelation(relation);
            })
            .catch ( err => {
                return undefined;
            });
    }
    async create(relationDto: RelationInputDto): Promise<Relation> {
        console.log("Hola");
        const topUnit: Unit = await this.unitDao.findByCode(relationDto.idTopUnit);
        const lowerUnit: Unit = await this.unitDao.findByCode(relationDto.idLowerUnit);
        console.log(topUnit.getId());
        const relationEntity: Relation = new RelationBuilder().setType(relationDto.type).setTopUnit(new UnitBuilder(topUnit.getName()).setId(topUnit.getId()).setCode(topUnit.getCode()).build()).setLowerUnit(new UnitBuilder(lowerUnit.getName()).setId(lowerUnit.getId()).setCode(lowerUnit.getCode()).build()).build();
        console.log("relationEntity" + JSON.stringify(relationEntity));
        const relation = new RelationSchema(relationEntity);
        return relation.save()
            .then( relation => {
                return relation;
            })
            .catch ( err => {
                console.log("ERR" + err);
                return undefined;
            });
    }
    async delete(id: number): Promise<boolean> {
        return RelationSchema.deleteOne({ _id: id })
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
