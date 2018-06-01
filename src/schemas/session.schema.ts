import mongoose from "mongoose";

const Session = new mongoose.Schema({
    name: { type: String, required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: true },
});

const SessionSchema = mongoose.model("Session", Session);
export default SessionSchema;