import mongoose from "mongoose";

const Itinerary = new mongoose.Schema({
    name: { type: String, required: true },
    formation: { type: mongoose.Schema.Types.ObjectId, ref: "Formation", required: true },
});

const ItinerarySchema = mongoose.model("Itinerary", Itinerary);
export default ItinerarySchema;