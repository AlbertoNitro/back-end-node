import mongoose from "mongoose";

const Exercise = new mongoose.Schema({
    formulation: { type: String, required: true },
    lesson: { type: [mongoose.Schema.Types.ObjectId], ref: "Lesson", required: true },
});

const ExerciseSchema = mongoose.model("Exercise", Exercise);
export default ExerciseSchema;