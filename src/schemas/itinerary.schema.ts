import mongoose from "mongoose";

const Itinerary = new mongoose.Schema({
    name: { type: String, required: true },
    session: { type: [mongoose.Schema.Types.ObjectId], ref: "Session", required: true },
});

const ItinerarySchema = mongoose.model("Itinerary", Itinerary);
export default ItinerarySchema;