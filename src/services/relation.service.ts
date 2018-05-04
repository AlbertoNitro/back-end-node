import { RelationEntity } from "../entities/relation.entity";
import Relation from "../models/relation.model";


export class RelationService {
    constructor() {}

    async findByLowerUnit(unit: Number) {
        return await Relation.find({ lowerUnit: unit.toString() });
    }
    async create(relationEntity: RelationEntity): Promise<Relation> {
        const relation = new Relation(relationEntity);
        relation.save()
            .then( (relation: Relation) => {
                return relation;
            })
            .catch ( err => {
                return undefined;
            });
    }
}
