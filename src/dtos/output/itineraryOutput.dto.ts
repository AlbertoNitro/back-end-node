import { FormationOutputDto } from "./formationOutput.dto";

export interface ItineraryOutputDto  {
    id: number;
    name: string;
    formations: FormationOutputDto[];
}
