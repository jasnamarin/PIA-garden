import { Schema, model } from "mongoose";

const FirmSchema = new Schema({
  name: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  services: [
    {
      serviceName: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  location: { type: String, required: true },
  holidayPeriod: [
    {
      // TODO update this in frontend, it's string now
      holidayStartDate: { type: Date, required: true },
      holidayEndDate: { type: Date, required: true },
    },
  ],
  decorators: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
});

export const Firm = model("Firm", FirmSchema);
