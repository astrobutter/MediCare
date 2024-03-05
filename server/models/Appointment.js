import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  doc: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  bookedOn: {
    type: Date,
    default: Date.now
  }
});

export const AppointmentModel = mongoose.model("Appointments", appointmentSchema);