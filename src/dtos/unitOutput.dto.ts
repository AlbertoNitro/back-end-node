export interface UnitOutputDto  {
    name: string;
    code: number;
    topUnit?: UnitOutputDto;
}
