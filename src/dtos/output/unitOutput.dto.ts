import { FormationOutputDto } from "./formationOutput.dto";

export interface UnitOutputDto  {
    name: string;
    code: number;
    content: string;
    itineraries?: FormationOutputDto[];
}
