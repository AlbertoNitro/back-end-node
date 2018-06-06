import mongoose from "mongoose";
import InteractionSchema from "./interaction.schema";

const Itinerary = new mongoose.Schema({
    name: { type: String, required: true },
    formation: { type: [mongoose.Schema.Types.ObjectId], ref: "Formation", required: true },
});

const ItinerarySchema = InteractionSchema.discriminator("Itinerary", Itinerary);
export default ItinerarySchema;