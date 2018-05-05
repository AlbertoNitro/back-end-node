import { RelationEntity } from "../entities/relation.entity";
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
        const relationEntity: RelationEntity = new RelationEntity(relationDto.type, lowerUnit, topUnit);
        const relation = new Relation(relationEntity);
        return relation.save()
            .then( relation => {
                return relation;
            })
            .catch ( err => {
                return undefined;
            });
    }
    async deleteByTop(_id: Number) {
        await Relation.deleteOne({ topUnit: _id });
    }
    async deleteByDown(_id: Number) {
        await Relation.deleteOne({ lowerUnit: _id });
    }
}
