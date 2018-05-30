import mongoose from "mongoose";

const LessonItinerary = new mongoose.Schema({
    name: { type: String, required: true },
    session: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
});

const LessonItinerarySchema = mongoose.model("LessonItinerary", LessonItinerary);
export default LessonItinerarySchema;