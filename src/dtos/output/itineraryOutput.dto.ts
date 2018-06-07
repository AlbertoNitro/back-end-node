import { Formation } from "../../models/formation.model";

export interface ItineraryOutputDto  {
    id: number;
    name: string;
    formations: Formation[];
}
