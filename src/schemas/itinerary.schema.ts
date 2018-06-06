import mongoose from "mongoose";
import InteractionSchema from "./interaction.schema";

const Itinerary = new mongoose.Schema({
    name: { type: String, required: true },
    formations: { type: [mongoose.Schema.Types.ObjectId], ref: "Formation", default: [], required: true },
});

const ItinerarySchema = InteractionSchema.discriminator("Itinerary", Itinerary);
export default ItinerarySchema;