import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  location: String,
  availability: {
    type: String,
    enum: ["FULL_TIME", "PART_TIME", "WEEKENDS", "FLEXIBLE"],
    default: "FLEXIBLE",
  },
  skills: [String], // e.g. ["logistics", "delivery", "communication"]
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE", "PENDING"],
    default: "PENDING",
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Volunteer = mongoose.model("Volunteer", volunteerSchema);
