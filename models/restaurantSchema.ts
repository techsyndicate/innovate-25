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
  tables: [
    {
      number: { type: Number, required: true, default: 1 },
      people: { type: Number, required: true, default: 1 },
      reservedDates: [
        {
          date: reqString,
          time: reqString,
        },
      ],
    },
  ],
});

const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
