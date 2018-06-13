import { InteractionVisitor } from "./interaction.visitor";

export abstract class Interaction {
    abstract accept(interactionVisitor: InteractionVisitor): void;
}
