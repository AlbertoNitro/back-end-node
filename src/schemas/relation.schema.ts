import mongoose from "mongoose";

const Relation = new mongoose.Schema({
    type: { type: String, enum: ["INHERIT", "COMPOSE", "ASOCIATION", "USE"], required: true },
    topUnit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    lowerUnit: { type: mongoose.Schema.Types.ObjectId, ref: "Unit", required: true },
    semantics: { type: String, required: false },
});

const RelationSchema = mongoose.model("Relation", Relation);
export default RelationSchema;