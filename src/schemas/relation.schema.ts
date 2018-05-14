import mongoose from "mongoose";

const Relation = new mongoose.Schema({
    type: { type: String, enum: ["INHERIT", "COMPOSE", "ASOCIATION", "USE"], required: true },
    topUnit: { type: mongoose.Schema.Types.Number, ref: "Unit", required: true },
    lowerUnit: { type: mongoose.Schema.Types.Number, ref: "Unit", required: true },
    semantics: { type: String, ref: "Unit", required: false },
});

const RelationSchema = mongoose.model("Relation", Relation);
export default RelationSchema;