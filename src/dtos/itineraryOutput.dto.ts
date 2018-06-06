import { Formation } from "../models/Formation.model";

export interface ItineraryOutputDto  {
    id: number;
    name: string;
    formations: Formation[];
}
