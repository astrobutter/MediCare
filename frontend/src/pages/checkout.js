import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext'

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export const Checkout = () => {
  const [doctorId, setDoctor] = useState('65f94b653df6896ba01c308b');
  const [message, setMessage] = useState("");
  const { userID} = UserAuth();
  
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) { setMessage("Order placed! You will receive an email confirmation."); }
    if (query.get("canceled")) { setMessage("Order canceled -- continue to shop around and checkout when you're ready."); }
  }, []);

  const makePayment = async(event) => {
    event.preventDefault();
    const body = {userID, doctorId};
    try {
      const headers = { "Content-Type":"application/json"}
      const response = await fetch('http://localhost:3001/create-checkout-session/65e56363a02630d878240814', {
      // const response = await fetch('http://localhost:3001/create-checkout-session/65e56363a02630d878240814', {
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
      })
      const data = await response.json();
      if( data.session.url){ window.location.href = data.session.url; }
      // const result = stripe.redirectToCheckout({sessionId:session.id});
      // if( result.error ){ console.log(result.error); };
    } catch (error) { console.log(error); }
  }
  return(
    <section>
      <div className="product">
        <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
        <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
        </div>
      </div>
      <form onSubmit={(event) => makePayment(event)} >
        <button type="submit" >Checkout</button>
      </form>
    </section>
  );
}