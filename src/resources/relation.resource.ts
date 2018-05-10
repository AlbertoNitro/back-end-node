import { RelationService } from "../services/dao/relation.dao";
import { Relation } from "../models/relation.model";
import { RelationInputDto } from "../dtos/relationInput.dto";

export class RelationResource {

    private relationService: RelationService;

    constructor() {
        this.relationService = new RelationService();
    }
    async findByLowerUnit(unit: number) {
        return await this.relationService.findByLowerUnit(unit);
    }
    async create(relationDto: RelationInputDto): Promise<Relation> {
        return await this.relationService.create(relationDto);
    }
    async deleteByConexion(id: number): Promise<boolean> {
        const deleteByTopStatus: boolean = await this.deleteByTop(id);
        const deleteByLowerStatus: boolean = await this.deleteByDown(id);
        if ( deleteByTopStatus === true && deleteByLowerStatus === true) {
            return deleteByTopStatus;
        }
        else {
            return undefined;
        }
    }
    async deleteByTop(id: number): Promise<boolean> {
        return await this.relationService.deleteByTop(id);
    }
    async deleteByDown(id: number): Promise<boolean> {
        return await this.relationService.deleteByDown(id);
    }
}