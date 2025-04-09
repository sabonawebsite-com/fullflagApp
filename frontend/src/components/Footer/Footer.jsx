import React, { useState } from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import About from '../About/About'
import { Link } from 'react-router-dom'
const Footer = () => {
  const[about,setAbout]=useState("")
  const[delevery,setDelevery]=useState("")
  const[privacy,setPrivacy]=useState("")
  const displayAbout=()=>{
    setAbout(about)
  }
  const deleveryHandeler=()=>{
    setDelevery("sorry Stripe technology is not work in Ethiopia but you can use telbirr  ")
  }
   const privacyHandeler=()=>{
    setDelevery("Our privacy should be respacted any one who need to know ")
  }
  return (
    <div className='footer'id='footer'>
      <div className="footer-content">
<div className="footer-content-left">

<img src={assets.logo} className='nameLogo' alt="" />
<p>
  If you have any idea or comment you can connect in different way
  here you can use social media , cell phone or email
  thanks for using our product!!

</p>
<div className="footer-social-icon">
   <a href="https://facebok.com"><img src={assets.facebook_icon} alt="" /></a> 
   <a href="https://twitter.com"><img src={assets.twitter_icon} alt="" /></a> 
  <a href="https://linkedin.com"><img src={assets.linkedin_icon} alt="" /></a>  
  <a href="https://github.com/sabonawebsite-com/code-web"><span className='Github'> GitHub</span></a>
  <a href="https://www.youtube.com/results?search_query=sabona+marara"><span className='YouTube'> YouTube</span></a>
</div>
</div>
<div className="footer-content-center">
    <h1>Group5</h1>
    <ul>
   <a href="/"><li>Home</li></a> 
   <Link to="/about"> <li >About us</li></Link>
    <li  onClick={deleveryHandeler}>delevery</li>
    <li >{delevery}</li>
    <li onClick={privacyHandeler}>privacy policy</li>
    <li>{privacy}</li>
    </ul>
</div>
<div className="footer-content-right">
    <h2>Get In Touch</h2>
   <li>+125928629040</li>
   <li>0928860911</li>
   <li>group5@gmail.com</li>
</div>
<a href='/'><button >Back</button></a>
<hr />
      </div>
      <p className="footer-copyright">
        {new Date().getFullYear()}&copy;Group5 All Right Resived </p>
 
    </div>
  )
}

export default Footer