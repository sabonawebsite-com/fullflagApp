import React, { useEffect, useState } from 'react'
import './PlaceOrder.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,url,cartItem}=useContext(StoreContext);
  const[data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""
  })
  const onChangeHandelr=(event)=>{
    const name=event.target.name
    const value=event.target.value
    setData(data=>({...data,[name]:value}))
  }
  // useEffect(()=>{
  //   console.log(data)
  // },[data])
  const placeholder=async(event)=>{
event.preventDefault()
let orderItems=[]
food_list.map((item)=>{
  if (cartItem[item._id]>0) {
    let itemInfo=item;
    itemInfo["quantity"]=cartItem[item._id]
    orderItems.push(itemInfo)
  }
})
  let orderData={
    address:data,
    items:orderItems,
    amount:getTotalCartAmount()+2
  }
  let response=await axios.post("/api/order/place",orderData,{headers:{token}});
  if (response.data.success) {
  const {session_url}=response.data;
  window.location.replace(session_url)
  }
  else{
    alert("error")
  }
  }
  const navigate=useNavigate()
  useEffect(()=>{
    if (!token) {
      navigate("/cart")
    }
    else if(getTotalCartAmount()===0){
navigate("/cart")
    }
  })
  return (
    <>
    <form onSubmit={placeholder} className='place-order'>
      <div className="place-order-left">
<p className="title">Delivery information</p>
<div className="multi-fields">
  <input required name='firstName' onChange={onChangeHandelr} value={data.firstName} type="text" placeholder='First Name'/>
  <input  required name='lastName' onChange={onChangeHandelr} value={data.lastName} type="text" placeholder='Last Name' />
</div>
<input  required name='email' onChange={onChangeHandelr} value={data.email} type="email" placeholder='Your Email'/>
  <input  required name='street' onChange={onChangeHandelr} value={data.street} type="text" placeholder='Street' />
  <div className="multi-fields">
  <input  required name='city' onChange={onChangeHandelr} value={data.city} type="text" placeholder='City'/>
  <input  required name='state' onChange={onChangeHandelr} value={data.state} type="text" placeholder='State' />
</div>
<div className="multi-fields">
  <input  required name='zipCode' onChange={onChangeHandelr} value={data.zipCode} type="text" placeholder='Zip code'/>
  <input  required name='country' onChange={onChangeHandelr} value={data.country} type="text" placeholder='country' />

</div>
<input  required name='phone' onChange={onChangeHandelr} value={data.phone} type="tel" placeholder='phone' />
<button type='submit' className='least-button'>PROCEED TO PAYMENT</button>
      </div>
      <div className="place-order-right">
        <h2>Cart Total</h2>
        <div className="cart-total-detail">
        <p>subTotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-detail">
        </div>
        <p>delivery free{`$.${getTotalCartAmount()===0?0:2}`}</p>
        <hr />
        <b>Total:</b>
          <b className='end-display'>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
      </div>
      <div className="cart-total-modif">
  

        </div>
        
    </form>
    </>
  )
}

export default PlaceOrder
