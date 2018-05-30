import mongoose from "mongoose";

const Justification = new mongoose.Schema({
    isCorrect: { type: Boolean, required: true },
    solution: { type: mongoose.Schema.Types.ObjectId, ref: "Solution", required: true },
    text: { type: String, required: true },
});

const RelationSchema = mongoose.model("Justificacion", Justification);
export default RelationSchema;