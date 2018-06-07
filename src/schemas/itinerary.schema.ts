import mongoose from "mongoose";
import InteractionSchema from "./interaction.schema";
import FormationSchema from "./formation.schema";

const Itinerary = new mongoose.Schema({
    name: { type: String, required: true },
    formations: { type: [mongoose.Schema.Types.ObjectId], ref: "Formation", default: [] },
});

const ItinerarySchema = FormationSchema.discriminator("Itinerary", Itinerary);
export default ItinerarySchema;