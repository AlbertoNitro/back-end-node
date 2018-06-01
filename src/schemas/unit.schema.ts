import mongoose from "mongoose";

const AutoIncrement = require("mongoose-sequence")(mongoose);
const Unit = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: Number, required: false, unique: true },
    itinerary: { type: [mongoose.Schema.Types.ObjectId], ref: "Session", required: true },

});
Unit.plugin(AutoIncrement, {
    inc_field: "code",
    startAt: 100,
    incrementBy: 1
});

const UnitSchema = mongoose.model("Unit", Unit);
export default UnitSchema;