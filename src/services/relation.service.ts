import { RelationEntity, RelationBuilder } from "../entities/relation.entity";
import Relation from "../models/relation.model";
import { UnitService } from "./unit.service";
import { UnitEntity } from "../entities/unit.entity";
import { RelationInputDto } from "../dtos/relationInput.dto";

export class RelationService {
    private unitService: UnitService;
    constructor() {
        this.unitService = new UnitService();
    }

    async findByLowerUnit(id: Number) {
        return await Relation.find({ lowerUnit: id.toString() });
    }
    async create(relationDto: RelationInputDto): Promise<RelationEntity> {
        const topUnit: UnitEntity = await this.unitService.findById(relationDto.idTopUnit);
        const lowerUnit: UnitEntity = await this.unitService.findById(relationDto.idLowerUnit);
        const relationEntity: RelationEntity = new RelationBuilder().setType(relationDto.type).setTopUnit(topUnit).setLowerUnit(lowerUnit).build();
        const relation = new Relation(relationEntity);
        return relation.save()
            .then( relation => {
                return relation;
            })
            .catch ( err => {
                return undefined;
            });
    }
    async deleteByTop(_id: Number): Promise<boolean> {
        return Relation.deleteOne({ topUnit: _id })
            .then( message => {
                return true;
            })
            .catch( err => {
                return false;
            });
    }
    async deleteByDown(_id: Number): Promise<boolean> {
        return Relation.deleteOne({ lowerUnit: _id })
            .then( message => {
                return true;
            })
            .catch( err => {
                return false;
            });
    }
}
