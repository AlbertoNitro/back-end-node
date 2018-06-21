import { FormationOutputDto } from "./formationOutput.dto";

export interface ItineraryOutputDto  {
    id: string;
    name: string;
    formations?: FormationOutputDto[];
}
