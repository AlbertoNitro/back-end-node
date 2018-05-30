import mongoose from "mongoose";

const Video = new mongoose.Schema({
    url: { type: String, required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
});

const VideoSchema = mongoose.model("Justification", Video);
export default VideoSchema;