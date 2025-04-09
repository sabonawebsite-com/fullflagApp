import React, { useRef, useState } from 'react';  
import emailjs from '@emailjs/browser';  

export const ContactUs = () => {  
  const form = useRef();  
  const [statusMessage, setStatusMessage] = useState(''); // State for success/error message  

  const sendEmail = (e) => {  
    e.preventDefault();  

    emailjs  
      .sendForm('service_uwt63pq', 'template_k28tc5v', form.current, 'wzcCXP_JvhWr3Sgqk')  
      .then(  
        () => {  
          setStatusMessage('Email sent successfully!'); // Set success message  
        },  
        (error) => {  
          setStatusMessage('Failed to send email: ' + error.text); // Set error message  
        }  
      );  
  };  

  return (  
    <form ref={form} className='place-order' onSubmit={sendEmail}>  
      <div className="place-order-left">  
        <p className="title">Delivery Information</p>  
        <div className="multi-fields">  
          <input required name='firstName' type="text" placeholder='First Name' />  
          <input required name='lastName' type="text" placeholder='Last Name' />  
        </div>  
        <input required name='email' type="email" placeholder='Your Email' />  
        <input required name='street' type="text" placeholder='Street' />  
        <div className="multi-fields">  
          <input required name='city' type="text" placeholder='City' />  
          <input required name='state' type="text" placeholder='State' />  
        </div>  
        <div className="multi-fields">  
          <input required name='zipCode' type="text" placeholder='Zip Code' />  
          <input required name='country' type="text" placeholder='Country' />  
        </div>  
        <input required name='phone' type="tel" placeholder='Phone' />  
        <button type='submit' className='least-button'>SEND➡</button>  
      </div>  

      <div className="cart-total-modif">  
        {/* Your cart total content  template_h0z7ysb */}  
      </div>  

      {statusMessage && <p className="status-message">{statusMessage}</p>} {/* Display status message */}  
    </form>  
  );  
};  

export default ContactUs;  