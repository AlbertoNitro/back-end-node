import mongoose from "mongoose";

const LessonsItinerary = new mongoose.Schema({
    name: { type: String, required: true },
    session: { type: mongoose.Schema.Types.ObjectId, ref: "Session", required: true },
});

const LessonsItinerarySchema = mongoose.model("LessonsItinerary", LessonsItinerary);
export default LessonsItinerarySchema;