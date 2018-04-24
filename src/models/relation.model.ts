import mongoose from "mongoose";
import { TypeRelation } from "./typeralation.enum";

const RelationSchema = new mongoose.Schema({
    type: String,
    topUnit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" } ,
    lowerUnit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" }
});

const Relation = mongoose.model("Relation", RelationSchema);
export default Relation;