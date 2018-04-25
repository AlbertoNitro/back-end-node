import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UnitSchema = new mongoose.Schema({
    name: String,
}, { _id: false });
UnitSchema.plugin(AutoIncrement);

const Unit = mongoose.model("Unit", UnitSchema);
export default Unit;