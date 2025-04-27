import mongoose, { Schema } from "mongoose";
const reqString = { type: String, required: true, default: "" };

const restaurantSchema = new Schema({
  name: reqString,
  location: reqString,
  menu: [
    {
      name: reqString,
      price: { type: Number, required: true, default: 0 },
      description: reqString,
      rating: { type: Number, required: true, default: 0 },
      bestseller: { type: Boolean, required: true, default: false },
      veg: { type: Boolean, required: true, default: true },
    },
  ],
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
