import mongoose from "mongoose";
import InteractionSchema from "./interaction.schema";

const Itinerary = new mongoose.Schema({
    name: { type: String, required: true },
    session: { type: [mongoose.Schema.Types.ObjectId], ref: "Session", required: true },
});

const ItinerarySchema = InteractionSchema.discriminator("Itinerary", Itinerary);
export default ItinerarySchema;