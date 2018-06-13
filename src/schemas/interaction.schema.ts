import mongoose from "mongoose";

const Interaction = new mongoose.Schema({
    kind : {type: String},
    solutions: { type: [mongoose.Schema.Types.ObjectId], ref: "Solution", default: [], autopopulate: { maxDepth: 10 } },
}, { discriminatorKey: "kind" , collection: "interactions"});

Interaction.plugin(require(`mongoose-autopopulate`));

const InteractionSchema = mongoose.model("Interaction", Interaction);
export default InteractionSchema;