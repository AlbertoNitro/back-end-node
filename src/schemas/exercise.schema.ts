import mongoose from "mongoose";
import InteractionSchema from "./interaction.schema";

const AutoIncrement = require("mongoose-sequence")(mongoose);

const Exercise = new mongoose.Schema({
    formulation: { type: String, required: true },
    solution: { type: [mongoose.Schema.Types.Number], ref: "Solution", required: false },
});

const ExerciseSchema = InteractionSchema.discriminator("Exercise", Exercise);
export default ExerciseSchema;