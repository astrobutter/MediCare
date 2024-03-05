import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true},
    dob: { type: String, required: true},
    gender: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true, unique: true },
    educations: [{ college: { type: String, required: true },
                    year: { type: String, required: true }
                }],
    experiences: [{ place: { type: String, required: true },
                    from: { type: String, required: true },
                    to: { type: String, required: true }
                  }],
    schedules: [{ date: { type: Date },
                  timings: [{ 
                    time : { type: Number },
                    slots: { type: String },
                  }],
                }],
    price: { type: Number },
    about: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specializations:[{ type:String}],
//   dob: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  // myRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

export const DoctorModel = mongoose.model("Doctors", DoctorSchema);
