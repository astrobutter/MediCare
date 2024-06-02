import Stripe from 'stripe';
import { UserModel } from "../models/User.js";
import { DoctorModel } from "../models/Doctor.js";
import { AppointmentModel } from "../models/Appointment.js";

export const getCheckoutSession = async (req, res) => {
    const { userID, appointment } =  req.body;
    const { doctorId } =  req.params;
    // console.log(doctorId, userID, appointment);
    try {
        const desc = appointment.date.split('T')[0]+', '+appointment.time+':00 ';
        const stripe = new Stripe(process.env.STRIPESECRETKEY);
        const doctor = await DoctorModel.findById(doctorId);
        const user = await UserModel.findById(userID);
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode: 'payment',
            success_url: "http://localhost:3000/payment-complete",
            cancel_url: "http://localhost:3000/payment-failed",
            customer_email: user.email,
            client_reference_id:doctorId,
            line_items: [{
                price_data: {
                    currency: 'inr',
                    unit_amount: doctor.price*100,
                    product_data:{
                        name: doctor.name, description: desc,  images: [doctor.imageUrl]
                    }
                }, quantity: 1
            }]
        });
        const booking = new AppointmentModel({ doc:doctorId, user:userID, session:session.id, date:appointment.date, time:appointment.time, status: true, name:user.name, username: user.username, imageUrl:user.imageUrl, gender:user.gender, dob:user.dob });
        try {
            await booking.save();
            res.status(200).json({ success:true, message:'sucessfully', session});
          } catch (err) {
            console.error(err);
            res.status(500).json({ success:false, message:'failed'});
          }
        // status is set true, bcz to subsequently track the paymentintent we need web hooks.
        // await booking.save();
        // res.status(200).json({ success:true, message:'sucessfully', session});
    } catch (err) { res.status(500).json({ success:false, message:'failed'}); }
}
