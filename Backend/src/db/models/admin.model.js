// db/models/admin.model.js
import mongoose from "mongoose";
import { hashPassword } from "../../utils/helper.js";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// password hashing
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

export const Admin = mongoose.model("Admin", adminSchema);
