import Stripe from 'stripe';
import { UserModel } from "../models/User.js";
import { DoctorModel } from "../models/Doctor.js";
import { AppointmentModel } from "../models/Appointment.js";

export const getCheckoutSession = async (req, res) => {
    const { userID } =  req.body;
    const { doctorId } =  req.params;
    try {
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
                        name: doctor.name, images: [doctor.imageUrl]
                    }
                }, quantity: 1
            }]
        })
        // const appointment = new AppointmentModel({ doctor:doctor._id, user:user._id, session:session.id })
        // await appointment.save();
        res.status(200).json({ success:true, message:'sucessfully', session});
    } catch (err) { res.status(500).json({ success:false, message:'failed'}); }
}