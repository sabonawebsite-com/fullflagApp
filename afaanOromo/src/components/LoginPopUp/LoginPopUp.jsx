import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopUp = ({setShowlogin}) => {
  const {url,setToken}=useContext(StoreContext)
  const[currState,setCurrState]=useState("Login")
  const[data,setData]=useState({
    name:"",
    email:"",
    password:""
  })
  const onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onlogin=async(event)=>{
event.preventDefault();
let newUrl=url;
if (currState==="Login") {
  newUrl+='/api/user/login'
}
else{
  newUrl+='/api/user/register'
}
const response=await axios.post(newUrl,data)
if (response.data.success) {
  setToken(response.data.token)
  localStorage.setItem("token",response.data.token)
  setShowlogin(false)
  
}
else{
  alert(response.data.message)
}
  }
  
  return (
    <div className='login-pop-up'>
     
   
      <form onSubmit={onlogin} className='login-pop-up-contener'>
      <img className='icon-group1' src={assets.group1} alt="" />
      <button className='cross-act' onClick={()=>setShowlogin(false)}>❌</button>
        <div className="login-pop-up-title">
            <h1>{currState}</h1>
            
            {/* <img onClick={()=>setShowlogin(false)} src={assets.cross_icon} alt="" /> */}
        </div>
          <div className="login-pop-up-inputs">
            {currState==="Login"?<></>: <input autoComplete='off' autoFocus  name='name' onChange={onChangeHandeler} value={data.name} type="text" placeholder='Your Name' required/>}
           
            <input autoComplete='off' autoFocus name='email' onChange={onChangeHandeler} value={data.email}  type="email" placeholder='email' required/>
            <input autoComplete='off' autoFocus  name='password' onChange={onChangeHandeler} value={data.password}  type="password" placeholder='password' required/>
            {/* <input  name='password' onChange={onChangeHandeler} value={data.password}  type="password" placeholder='Repeat password' required/> */}
          </div>
          <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
          <div className="login-pop-up-condition">
              <input type="checkbox" required />
              <p className='agree'>Continuing  agree with  our privacy </p>
              </div>
              {currState==="Login"?<p>create new account ?<span onClick={()=>setCurrState("Sign Up")}>click here</span></p>:
              <p>already have an account?<span onClick={()=>setCurrState("Login")}>login here</span></p>}
      </form>
    </div>
  )
}

export default LoginPopUp
