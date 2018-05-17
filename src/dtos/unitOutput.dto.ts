export interface UnitOutputDto  {
    _id: number;
    name: string;
    code: number;
    topUnit: UnitOutputDto;
}
