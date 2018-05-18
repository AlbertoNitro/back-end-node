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
    public setId(id: string) {
        this.relation.setId(id);
    }

    public getType(): TypeRelation {
        return this.getType();
    }
    public setSemantics(type: TypeRelation) {
        this.relation.setSemantics(semantics);
    }

    public getSemantics(): string {
        return this.getSemantics();
    }
    public setSemantics(semantics: string) {
        this.relation.setSemantics(semantics);
    }

    public getSemantics(): string {
        return this.getSemantics();
    }
    public setSemantics(semantics: string) {
        this.relation.setSemantics(semantics);
    }

    public getSemantics(): string {
        return this.getSemantics();
    }
    public setSemantics(semantics: string) {
        this.relation.setSemantics(semantics);
    }

    public getSemantics(): string {
        return this.getSemantics();
    }
    public setSemantics(semantics: string) {
        this.relation.setSemantics(semantics);
    }

    public build() {
        return this.relation;
    }
}