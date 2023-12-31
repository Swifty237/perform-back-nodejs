import mongoose from "mongoose";

const UfcEventsDataSchema = mongoose.Schema({
    _id: String,
    EventId: Number,
    LeagueId: Number,
    Name: String,
    ShortName: String,
    Season: Number,
    Day: Date,
    DateTime: Date,
    Status: String,
    Active: Boolean,
    Fights: [Object]
});

export default mongoose.model("Event", UfcEventsDataSchema);