import mongoose from "mongoose";

const Lesson = new mongoose.Schema({
    name: { type: String, required: true },
    interactions: { type: [mongoose.Schema.Types.ObjectId], ref: "Interaction", required: true },
});

const LessonSchema = mongoose.model("Lesson", Lesson);
export default LessonSchema;