import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true },
  doc: { type: mongoose.Schema.Types.ObjectId, ref: "Doctors", required: true },
  session: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: Number, required: true },
  status: { type: Boolean, default:false },
  dateTag: { type: Date, default: Date.now }
});

export const AppointmentModel = mongoose.model("Appointments", appointmentSchema);