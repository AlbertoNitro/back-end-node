import mongoose from "mongoose";
import InteractionSchema from "./interaction.schema";

const Session = new mongoose.Schema({
    name: { type: String, required: true },
    lessons: { type: [mongoose.Schema.Types.ObjectId], ref: "Lesson", default: [] },
});

const SessionSchema = InteractionSchema.discriminator("Session", Session);
export default SessionSchema;