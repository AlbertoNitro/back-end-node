import mongoose from "mongoose";
import FormationSchema from "./formation.schema";

const Session = new mongoose.Schema({
    name: { type: String, required: true },
    lessons: { type: [mongoose.Schema.Types.ObjectId], ref: "Lesson", default: [], autopopulate: { maxDepth: 10 } },
});

Session.plugin(require(`mongoose-autopopulate`));

const SessionSchema = FormationSchema.discriminator("Session", Session);
export default SessionSchema;