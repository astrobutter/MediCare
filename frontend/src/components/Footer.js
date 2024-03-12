import React from 'react';
import { FaFacebook, FaYoutube, FaXTwitter, FaWhatsapp, FaCopyright } from './ReactIcons';
import '../css/footer.css'

export const Footer = () => {
  return (
    <div className='footer'>
      <div className='max-width'>
      <div className='main'>
        <div className='link'>
          <h3>Useful Links</h3>
          <a href='#' target='_blank'>- Policy</a>          
          <a href='#' target='_blank'>- Terms & Condition</a>          
        </div>
        <div className='link'>
          <h3>About</h3>
          <a href='#' target='_blank'>- Lorem ipsum</a>          
          <a href='#' target='_blank'>- dilor set amet</a>          
        </div>
        <div className='link'>
          <h3>Our Services</h3>
          <a href='#' target='_blank'>- consectetur adipiscing</a>          
          <a href='#' target='_blank'>- elit, sed</a>          
        </div>
        <div className='link'>
          <h3>Support</h3>
          <a href='#' target='_blank'>- do eiusmod tempor</a>          
          <a href='#' target='_blank'>- incididunt ut labore</a>          
        </div>
      </div>
      <div className='social-media'>
        <h3>Social Media</h3>
        <div className='links'>
          <a href='#' target='_blank'><FaFacebook /></a>
          <a href='#' target='_blank'><FaXTwitter /></a>
          <a href='#' target='_blank'><FaYoutube /></a>
          <a href='#' target='_blank'><FaWhatsapp /></a>
        </div>
      </div>
      <div className='bottom'>
        <h3>MediCare</h3>
        <h2><FaCopyright />Copyright 2023. All rights reserved.</h2>
      </div>
      </div>
    </div>
  )
}
