import mongoose, { Schema } from "mongoose";

const reqString = { type: String, required: true, default: "" };

const userSchema = new Schema({
  name: reqString,
  email: reqString,
  password: reqString,
  role: { type: String, default: "user" },
  card: {
    type: Schema.Types.ObjectId,
    ref: "Card",
  },
});
