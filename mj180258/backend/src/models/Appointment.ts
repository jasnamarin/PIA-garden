import { Schema, model } from "mongoose";

const AppointmentSchema = new Schema({
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  firmId: { type: Schema.Types.ObjectId, ref: "Firm", required: true },
  date: { type: Date, required: true },
  gardenArea: { type: Number, required: true },
  services: [
    {
      serviceName: { type: String, required: true },
      area: { type: Number, required: true },
    },
  ],
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled"],
    default: "scheduled",
  },
  decoratorId: { type: Schema.Types.ObjectId, ref: "User" },
  notes: { type: String },
});

export const Appointment = model("Appointment", AppointmentSchema);
