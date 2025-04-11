import React, { useRef, useState } from 'react';  
import emailjs from '@emailjs/browser';  

export const Myorder = () => {  
  const form = useRef();  
  const [statusMessage, setStatusMessage] = useState(''); 

  const sendEmail = (e) => {  
    e.preventDefault();  

    emailjs  
      .sendForm('service_uwt63pq', 'template_k28tc5v', form.current, 'wzcCXP_JvhWr3Sgqk')  
      .then(  
        () => {  
          setStatusMessage('ergameera!');
        },  
        (error) => {  
          setStatusMessage(' Hin ergameera!: ' + error.text);  
        }  
      );  
  };  

  return (  
    <form ref={form} className='place-order' onSubmit={sendEmail}>  
      <div className="place-order-left">  
        <p className="title">Odeeffannoo Geejiba</p>  
        <div className="multi-fields">  
          <input required name='firstName' type="text" placeholder='Maqaa Kee' />  
          <input required name='lastName' type="text" placeholder='Maqaa abba' />  
        </div>  
        <input required name='email' type="email" placeholder='Email Keessan' />  
        <input required name='street' type="text" placeholder='Daandii' />  
        <div className="multi-fields">  
          <input required name='city' type="text" placeholder='magaala' />  
          <input required name='state' type="text" placeholder='Naannoo' />  
        </div>  
        <div className="multi-fields">  
          <input required name='zipCode' type="text" placeholder='FAN' />  
          <input required name='country' type="text" placeholder='
Biyya' />  
        </div>  
        <input required name='phone' type="tel" placeholder='Bilbila' />  
        <button type='submit' className='least-button'>ERGAA➡</button>  
      </div>  

      <div className="cart-total-modif">  
        
      </div>  

      {statusMessage && <p className="status-message">{statusMessage}</p>}   
    </form>  
  );  
};  

export default Myorder;  