import { SessionOutputDto } from "./sessionOutput.dto";
import { ItineraryOutputDto } from "./itineraryOutput.dto";

export interface FormationOutputDto {
    itinerary?: ItineraryOutputDto;
    session?: SessionOutputDto;
}