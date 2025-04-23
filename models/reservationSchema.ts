import mongoose, { Schema } from "mongoose";
const reqString = { type: String, required: true, default: "" };

const reservationSchema = new Schema({
  restaurant: reqString,
  people: { type: Number, required: true, default: 1 },
  date: { type: Date, required: true, default: Date.now },
  time: reqString,
  uid: reqString,
  table: reqString,
});

const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", reservationSchema);
export default Reservation;
