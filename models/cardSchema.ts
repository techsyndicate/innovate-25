import mongoose, { Schema } from "mongoose";

const reqString = { type: String, required: true, default: "" };

const cardSchema = new Schema({
  uid: reqString,
  points: { type: Number, default: 0 },
  transactions: {
    type: Array,
    default: [],
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const Card = mongoose.models.Card || mongoose.model("Card", cardSchema);
export default Card;
