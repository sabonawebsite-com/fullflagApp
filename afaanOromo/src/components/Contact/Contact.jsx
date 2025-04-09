import React from 'react'
import './Contact.css'
// import emailPc from '../../assets/msg-icon.png'
// import emailPc1 from '../../assets/phone-icon.png'
// import emailPc2 from '../../assets/mail-icon.png'
// import emailPc3 from '../../assets/location-icon.png'
import { assets } from '../../assets/assets'
const Contact = () => {
  const [result, setResult] = React.useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);
  formData.append("access_key", "fb157278-c020-42dd-bd36-1f503b4fd21b");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <div className='contact' id='contact'>
    
      <div className='contact-col'>
        <h3>Ergaa nuuf ergaa <img src={assets.group1} alt="" /></h3>
        <p>Daldala beeyladaa warraaqsa kaasuu. Sirni keenya karaa iftoominaa fi bu’a qabeessa ta’een horii bitachuu fi gurguruu ni kenna. Amaloonni piroofaayilii beeyladoota bal'inaa, filannoo kaffaltii nageenya qabu, fi odeeffannoo dabalataaf bitoota waliin kallattiin qunnamtii👇🏿</p><br />

      
        <ul>
          <li> <img src={assets.mail_icon} alt="" />Group5@gmail.com</li>
          <li> <img src={assets.phone_icon} alt="" />0945671967</li>
          <li> <img src={assets.location_icon} alt="" />Borana Yabello  Ethiopia</li>

        </ul>
      </div>
      <div className='contact-col'>
        <form onSubmit={onSubmit}>
          <h2>Waa'ee App Yaada Yoo Qabdan</h2>
     
          <label > 
          Maqaa Keessan Galchaa👇🏻</label>
          <input type="text" name='name' placeholder='
Maqaa Keessan Galchaa..' required />
          <label >Lakkoofsa Bilbilaa 👇🏻</label>
          <input type="tel" name='phone' placeholder='Lakkoofsa Bilbilaa...' required />
          <label >Ergaa As irratti barreessi 👇🏻</label>
          <textarea name='message' rows="6" placeholder='Ergaa As irratti barreessi ...' required></textarea>
        
          <button type='submit' className='dark-btn'>AMMA ERGAA➡</button>
        </form>
        <span>{result}</span>
      </div>
    </div>
  )
}

export default Contact