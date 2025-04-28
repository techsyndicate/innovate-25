import mongoose, { Schema } from "mongoose";
const reqString = { type: String, required: true, default: "" };

const orderSchema = new Schema({
  uid: reqString,
  price: { type: Number, required: true, default: 0 },
  restaurant: reqString,
  date: { type: Date, default: Date.now },
  menu: {
    type: Array,
    default: [],
    required: true,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
