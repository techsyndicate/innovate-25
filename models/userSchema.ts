import mongoose, { Schema } from "mongoose";

const reqString = { type: String, required: true, default: "" };

const userSchema = new Schema({
  name: reqString,
  clerkId: reqString,
  email: reqString,
  role: { type: String, default: "user" },
  card: {
    type: Schema.Types.ObjectId,
    ref: "Card",
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
