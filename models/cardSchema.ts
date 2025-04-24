import mongoose, { Schema } from "mongoose";

const reqString = { type: String, required: true, default: "" };

const cardSchema = new Schema({
  uid: reqString,
  points: { type: Number, default: 0 },
  transactions: [
    {
      amount: { type: Number, default: 0 },
      date: { type: Date, default: Date.now },
      type: { type: String, default: "balance" },
      sessionId: reqString,
    },
  ],
  balance: {
    type: Number,
    default: 0,
  },
  reservations: [
    {
      restaurant: reqString,
      date: reqString,
      time: reqString,
      people: { type: Number, default: 1 },
      tableNumber: { type: Number, default: 1 },
    },
  ],
});

const Card = mongoose.models.Card || mongoose.model("Card", cardSchema);
export default Card;
