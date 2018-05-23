import { TypeRelation } from "../../schemas/typeRelation.enum";
import { Unit } from "../unit.model";
import { Relation } from "../relation.model";

export class RelationBuilder {
    private relation: Relation;

    constructor() {
        this.relation = new Relation();
    }

    setId(id: number): RelationBuilder {
        this.relation.setId(id);
        return this;
    }
    setType(type: TypeRelation): RelationBuilder {
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
    getId(): number {
        return this.getId();
    }
    getType(): TypeRelation {
        return this.getType();
    }
    getTopUnit(): Unit {
        return this.getTopUnit();
    }
    getLowerUnit(): Unit {
        return this.getLowerUnit();
    }
    getSemantics(): string {
        return this.getSemantics();
    }
    getCardinalTopUnit(): string {
        return this.getCardinalTopUnit();
    }
    getCardinalLowerUnit(): string {
        return this.getCardinalLowerUnit();
    }
    public build() {
        return this.relation;
    }
}