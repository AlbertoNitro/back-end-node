import mongoose from "mongoose";

const Interaction = new mongoose.Schema({
}, { discriminatorKey: "kind" });

const InteractionSchema = mongoose.model("Interaction", Interaction);
export default InteractionSchema;