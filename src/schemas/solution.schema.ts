import mongoose from "mongoose";

const Solution = new mongoose.Schema({
    isCorrect: { type: Boolean, required: true },
    justificaciones: { type: mongoose.Schema.Types.ObjectId, ref: "Justificacion", required: true },
    text: { type: String, required: true },
});

const SolutionSchema = mongoose.model("Solution", Solution);
export default SolutionSchema;