import { Unit } from "../unit.model";
import { Relation } from "../relation.model";

export class RelationBuilder {
    private relation: Relation;

    constructor() {
        this.relation = new Relation();
    }

    setId(id: string): RelationBuilder {
        this.relation.setId(id);
        return this;
    }
    setType(type: string): RelationBuilder {
        this.relation.setType(type);
        return this;
    }
    setTopUnit(topUnit: Unit): RelationBuilder {
        this.relation.setTopUnit(topUnit);
        return this;
    }
    setLowerUnit(lowerUnit: Unit): RelationBuilder {
        this.relation.setLowerUnit(lowerUnit);
        return this;
    }
    setSemantics(semantics: string): RelationBuilder {
        this.relation.setSemantics(semantics);
        return this;
    }
    setCardinalTopUnit(cardinalTopUnit: string): RelationBuilder {
        this.relation.setCardinalTopUnit(cardinalTopUnit);
        return this;
    }
    setCardinalLowerUnit(cardinalLowerUnit: string): RelationBuilder {
        this.relation.setCardinalLowerUnit(cardinalLowerUnit);
        return this;
    }
    public build() {
        return this.relation;
    }
}