import mongoose from "mongoose";

const RelationSchema = new mongoose.Schema({
    type: { type: String, enum: ["INHERIT", "COMPOSE", "ASOCIATION", "USE"], required: true },
    topUnit: { type: mongoose.Schema.Types.Number, ref: "Unit", required: true },
    lowerUnit: { type: mongoose.Schema.Types.Number, ref: "Unit", required: true },
});

const Relation = mongoose.model("Relation", RelationSchema);
export default Relation;