import mongoose, { Schema } from "mongoose";
const reqString = { type: String, required: true, default: "" };

const merchSchema = new Schema({
  name: reqString,
  price: { type: Number, required: true, default: 0 },
  description: reqString,
});

const Merch = mongoose.models.Merch || mongoose.model("Merch", merchSchema);
export default Merch;
