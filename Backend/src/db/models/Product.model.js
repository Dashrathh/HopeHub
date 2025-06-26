import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true
  },
  image: [
    {
      type: String
    }
  ],
  status: {
    type: String,
    enum: ["AVAILABLE", "CLAIMED", "RECEIVED"],
    default: "AVAILABLE",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Product = mongoose.model("Product", productSchema);
