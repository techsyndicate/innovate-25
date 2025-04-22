import mongoose, { Schema } from "mongoose";

const reqString = { type: String, required: true, default: "" };

const restaurantSchema = new Schema({
  name: reqString,
  location: reqString,
  menu: {
    type: Array,
    default: [],
  },
  demigod: reqString,
});

const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
