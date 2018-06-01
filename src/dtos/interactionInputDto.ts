import { Solution } from "../models/solution.model";

export interface InteractionInputDto  {
    url?: string;
    formulation?: string;
    solutions?: Solution[];
}