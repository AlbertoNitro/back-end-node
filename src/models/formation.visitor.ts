import { Session } from "./session.model";
import { Itinerary } from "./itinerary.model";

export interface FormationVisitor {
    visitSession(session: Session): void;
    visitItinerary(itinerary: Itinerary): void;
}