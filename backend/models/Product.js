import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  gender: String,
  masterCategory: String,
  subCategory: String,
  articleType: String,
  baseColour: String,
  season: String,
  year: String,
  usage: String,
  imageUrl: { type: String, required: true },
  embedding: { type: [Number], default: [] },
});

export default mongoose.model("Product", productSchema);
