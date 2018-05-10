import { Relation } from "../../models/relation.model";
import { UnitService } from "./unit.dao";
import { Unit } from "../../models/unit.model";
import { RelationInputDto } from "../../dtos/relationInput.dto";
import RelationSchema from "../../schemas/relation.schema";
import { RelationBuilder } from "../../models/builders/relation.builder";

export class RelationService {
    private unitService: UnitService;
    constructor() {
        this.unitService = new UnitService();
    }

    async findByLowerUnit(id: Number): Promise<Relation> {
        return await RelationSchema.find({ lowerUnit: id.toString() })
        .then( relation => {
            return relation;
        })
        .catch ( err => {
            return undefined;
        });
    }
    async create(relationDto: RelationInputDto): Promise<Relation> {
        const topUnit: Unit = await this.unitService.findById(relationDto.idTopUnit);
        const lowerUnit: Unit = await this.unitService.findById(relationDto.idLowerUnit);
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
}
