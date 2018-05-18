import { TypeRelation } from "../../schemas/typeRelation.enum";
import { Unit } from "../unit.model";
import { Relation } from "../relation.model";

export class RelationBuilder {
    private relation: Relation;

    constructor() {
        this.relation = new Relation();
    }

    public getId(): string {
        return this.getId();
    }
    public setId(id: string): RelationBuilder {
        this.relation.setId(id);
        return this;
    }
    public getType(): TypeRelation {
        return this.getType();
    }
    public setType(type: TypeRelation): RelationBuilder {
        this.relation.setType(type);
        return this;
    }
    public getTopUnit(): Unit {
        return this.getTopUnit();
    }
    public setTopUnit(topUnit: Unit): RelationBuilder {
        this.relation.setTopUnit(topUnit);
        return this;
    }
    public getLowerUnit(): Unit {
        return this.getLowerUnit();
    }
    public setLowerUnit(lowerUnit: Unit): RelationBuilder {
        this.relation.setLowerUnit(lowerUnit);
        return this;
    }
    public getSemantics(): string {
        return this.getSemantics();
    }
    public setSemantics(semantics: string): RelationBuilder {
        this.relation.setSemantics(semantics);
        return this;
    }
    public build() {
        return this.relation;
    }
}