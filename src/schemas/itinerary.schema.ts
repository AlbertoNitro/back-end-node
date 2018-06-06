import mongoose from "mongoose";

const Itinerary = new mongoose.Schema({
    name: { type: String, required: true },
    formations: { type: [mongoose.Schema.Types.ObjectId], ref: "Formation", default: [] },
});

const ItinerarySchema = mongoose.model("Itinerary", Itinerary);
export default ItinerarySchema;