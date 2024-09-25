import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["owner", "decorator", "admin"], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, enum: ["M", "F"] },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String }, // base64 string
  creditCard: { type: String },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "accepted",
  },
  firm: { type: Schema.Types.ObjectId, ref: "Firm" },
});

export const User = model("User", UserSchema);
