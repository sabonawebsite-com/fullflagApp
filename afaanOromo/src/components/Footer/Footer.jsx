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
Yaada ykn yaada yoo qabaattan karaa adda addaatiin wal qunnamsiisuu dandeessu
  asitti miidiyaa hawaasaa , bilbila harkaa ykn email fayyadamuu dandeessu
  oomisha keenya fayyadamuu keessaniif galatoomaa!!

</p>
<div className="footer-social-icon">
<a href="https://facebok.com"><img src={assets.facebook_icon} alt="" /></a> 
   <a href="https://twitter.com"><img src={assets.twitter_icon} alt="" /></a> 
  <a href="https://linkedin.com"><img src={assets.linkedin_icon} alt="" /></a>  
  <a href="https://github.com/sabonawebsite-com/code-web"><img className='github' src={assets.github} alt="" /></a>
  <a href="https://www.youtube.com/results?search_query=sabona+marara"><img className='youtube' src={assets.youtube} alt="" /></a>
  <a href="https://www.reddit.com/?rdt=50289"><img className='reddit' src={assets.reddit} alt="" /></a>
</div>
</div>
<div className="footer-content-center">
    <h1>Garee 5ffaa</h1>
    <ul>
   <a href="/"><li>bafata</li></a> 
   <Link to="/about"> <li >waa'ee keenya</li></Link>
    <li  onClick={deleveryHandeler}>delevery</li>
    <li >{delevery}</li>
    <li onClick={privacyHandeler}>privacy policy</li>
    <li>{privacy}</li>
    </ul>
</div>
<div className="footer-content-right">
    <h2>Nu qunnamuuf </h2>
   <li>+125928629040</li>
   <li>0928860911</li>
   <li>group5@gmail.com</li>
</div>
<a href='/'><button >dubatti debi'ii</button></a>
<hr />
      </div>
      <p className="footer-copyright">
        {new Date().getFullYear()}&copy;Garee 5ffaa cufaan Qophaa'ee </p>
 
    </div>
  )
}

export default Footer