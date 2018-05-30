import mongoose from "mongoose";

const Solution = new mongoose.Schema({
    isCorrect: { type: Boolean, required: true },
    justifications: { type: [mongoose.Schema.Types.ObjectId], ref: "Justification", required: false },
    text: { type: String, required: true },
});

const SolutionSchema = mongoose.model("Solution", Solution);
export default SolutionSchema;