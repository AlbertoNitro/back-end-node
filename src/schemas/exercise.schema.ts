import mongoose from "mongoose";

const Exercise = new mongoose.Schema({
    formulation: { type: String, required: true },
    solution: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
});

const ExerciseSchema = mongoose.model("Justification", Exercise);
export default ExerciseSchema;