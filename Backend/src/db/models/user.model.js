import mongoose, { Schema } from "mongoose";
import { hashPassword, isPasswordCorrect } from "../../utils/Helper.js";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowecase: true,
            trim: true,
        },
        mobile: {
            type: String,
            required: [true, 'Mobile number is required'],
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false,
        },
        refreshToken: {
            type: String,
            select: false,
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await hashPassword(this.password);
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return isPasswordCorrect(password, this.password)
}

export const User = mongoose.models?.User || mongoose.model("User", userSchema)