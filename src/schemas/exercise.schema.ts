import mongoose from "mongoose";
import InteractionSchema from "./interaction.schema";

const Exercise = new mongoose.Schema({
    formulation: { type: String, required: true },
    solutions: { type: [mongoose.Schema.Types.ObjectId], ref: "Solution", default: [], autopopulate: { maxDepth: 10 } },
});

Exercise.plugin(require(`mongoose-autopopulate`));

const ExerciseSchema = InteractionSchema.discriminator("Exercise", Exercise);
export default ExerciseSchema;