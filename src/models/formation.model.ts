import { FormationVisitor } from "./formation.visitor";

export abstract class Formation {
    abstract accept(formationVisitor: FormationVisitor): void;
}
