import { SessionMinimunOutputDto } from "./sessionMinimunOutput.dto";
import { ItineraryMinimunOutputDto } from "./itineraryMinimunOutput.dto";

export interface FormationMinimunOutputDto {
    itinerary?: ItineraryMinimunOutputDto;
    session?: SessionMinimunOutputDto;
}