
import Relation from "../models/relation.model";
import { TypeRelation } from "../models/typeralation.enum";
import { ObjectId } from "bson";
import { UnitEntity } from "../entities/unit";
import Unit from "../models/unit.model";
import logger from "../util/logger";
import {HttpStatusCode} from "../util/http-status-codes.enum";


export class UnitService {
    response: any;
    constructor() {}
    async forceGenerate(unit: String) {
        const relation = new Unit(
            {
              name: "prueba",
            }
          );
          await relation.save();
    }
    async create(unitEntity: UnitEntity) {
        const unit = new Unit(unitEntity);
        await unit.save((err) => {
            if (err) {
                this.response = unit;
            }
            else {
                this.response =  unit;
            }
        });
        return this.response;
    }

    async findAll(): Promise<any> {
        await Unit.find({}, (err, units) => {
            if (!units) {
                return { statusCode: HttpStatusCode.NOT_FOUND };
            }
            if (!err) {
                return { statusCode: HttpStatusCode.OK, entities: units };
            } else {
                logger.error(err.message);
                return { statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR };
            }
        });
    }
}
