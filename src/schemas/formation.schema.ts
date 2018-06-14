import mongoose from "mongoose";

const Formation = new mongoose.Schema({
    kind : {type: String},
    lessons: { type: [mongoose.Schema.Types.ObjectId], ref: "Lesson", default: [], autopopulate: { maxDepth: 10 } },
    formations: { type: [mongoose.Schema.Types.ObjectId], ref: "Formation", default: [], autopopulate: { maxDepth: 10 } },
}, { discriminatorKey: "kind" , collection: "formations"});

Formation.plugin(require(`mongoose-autopopulate`));

const FormationSchema = mongoose.model("Formation", Formation);
export default FormationSchema;