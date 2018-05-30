import mongoose from "mongoose";

const SessionItinerary = new mongoose.Schema({
    name: { type: String, required: true },
    formation: { type: mongoose.Schema.Types.ObjectId, ref: "Formation", required: true },
});

const SessionItinerarySchema = mongoose.model("SessionItinerary", SessionItinerary);
export default SessionItinerarySchema;