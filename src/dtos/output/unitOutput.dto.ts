import { FormationMinimunOutputDto } from "./formationMinimunOutput.dto";

export interface UnitOutputDto  {
    name: string;
    code: number;
    content: string;
    itineraries?: FormationMinimunOutputDto[]; // Array de identificadores
}
