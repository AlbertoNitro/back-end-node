import mongoose from "mongoose";

const Formation = new mongoose.Schema({
    name: String
}, { discriminatorKey: "kind" , collection: "formations"});



const FormationSchema = mongoose.model("Interaction", Formation);
export default FormationSchema;