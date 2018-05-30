import mongoose from "mongoose";

const Justification = new mongoose.Schema({
    isCorrect: { type: Boolean, required: true },
    solution: { type: mongoose.Schema.Types.ObjectId, ref: "Solution", required: true },
    text: { type: String, required: true },
});

const JustificationSchema = mongoose.model("Justification", Justification);
export default JustificationSchema;