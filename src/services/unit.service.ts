import { UnitEntity } from "../entities/unit";
import Unit from "../models/unit.model";
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
    async findAll() {
        return await Unit.find({}, (err, units) => {
            if (!units) {
                this.response =  undefined;
                // return { statusCode: HttpStatusCode.NOT_FOUND };
            }
            if (!err) {
                this.response =  units;
                // return { statusCode: HttpStatusCode.OK, entities: units };
            } else {
                this.response =  undefined;
                // logger.error(err.message);
                // return { statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR };
            }
        });
    }
}
