import mongoose from "mongoose";
import InteractionSchema from "./interaction.schema";

const Justification = new mongoose.Schema({
    isCorrect: { type: Boolean, required: true },
    text: { type: String, required: true },
});
const JustificationSchema = mongoose.model("Justification", Justification);

const Solution = new mongoose.Schema({
    isCorrect: { type: Boolean, required: true },
    text: { type: String, required: true },
    justifications: { type: [Justification], default: []},
});
const SolutionSchema = mongoose.model("Solution", Solution);

const Exercise = new mongoose.Schema({
    formulation: { type: String, required: true },
    solutions: { type: [Solution], default: [] },
});
const ExerciseSchema = InteractionSchema.discriminator("Exercise", Exercise);
export default ExerciseSchema;