import mongoose, { Schema } from "mongoose";
const reqString = { type: String, required: true, default: "" };

const questSchema = new Schema({
  title: reqString,
  description: reqString,
  questNumber: { type: Number, required: true },
});

const Quest = mongoose.models.Quest || mongoose.model("Quest", questSchema);
export default Quest;
