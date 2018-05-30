import mongoose from "mongoose";

const Lesson = new mongoose.Schema({
    url: { type: String, required: true },
    lessonItinerary: { type: mongoose.Schema.Types.ObjectId, ref: "LessonItinerary", required: true },
});

const LessonSchema = mongoose.model("Lesson", Lesson);
export default LessonSchema;