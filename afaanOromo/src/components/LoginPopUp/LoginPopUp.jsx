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
            {currState==="Login"?<></>: <input autoComplete='off' autoFocus  name='name' onChange={onChangeHandeler} value={data.name} type="text" placeholder='Maqaa Kee' required/>}
           
            <input autoComplete='off' autoFocus name='email' onChange={onChangeHandeler} value={data.email}  type="email" placeholder='imeelii Kee..' required/>
            <input autoComplete='off' autoFocus  name='password' onChange={onChangeHandeler} value={data.password}  type="password" placeholder='jecha iccitii' required/>
            {/* <input  name='password' onChange={onChangeHandeler} value={data.password}  type="password" placeholder='Repeat password' required/> */}
          </div>
          <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
          <div className="login-pop-up-condition">
              <input type="checkbox" required />
              <p className='agree'>Itti fufuun iccitii keenya irratti walii galuu </p>
              </div>
              {currState==="Login"?<p>
                account haaraa uumuu ?<span onClick={()=>setCurrState("Sign Up")}>as tuqi</span></p>:
              <p>duraanuu account qabduu?<span onClick={()=>setCurrState("Login")}>as seena</span></p>}
      </form>
    </div>
  )
}

export default LoginPopUp
