import mongoose from "mongoose";

const AutoIncrement = require("mongoose-sequence")(mongoose);
const Unit = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: Number, required: false, unique: true },
    content: { type: String, required: false, default: ""},
    itineraries: { type: [mongoose.Schema.Types.ObjectId], ref: "Itinerary", default: [] },
});
Unit.plugin(AutoIncrement, {
    inc_field: "code",
    startAt: 100,
    incrementBy: 1
});

const UnitSchema = mongoose.model("Unit", Unit);
export default UnitSchema;