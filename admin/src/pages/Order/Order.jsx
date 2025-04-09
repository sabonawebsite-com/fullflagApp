import React from 'react'
import './Order.css'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import {assets} from '../../assets/assets'
const Order = ({url}) => {
  const[orders,setOrders]=useState([])
  const fechAll=async()=>{
    const response=await axios.get(url+"/api/order/list")
    if (response.data.success) {
      setOrders(response.data.data)
      console.log(response.data.data)
    }
    else{
toast.error("something wrong")
    }
  }
  const statusHandeler=async(event,orderId)=>{
const response=await axios.post(url+"/api/order/status",{
  orderId,
  status:event.target.value,
})
if (response.data.success) {
  await fechAll()
}
  }
  useEffect(()=>{
    fechAll()
  },[])
  return (
    <div className='orders'>
   <h3>order page</h3>
   <div className="order-list">
    {orders.map((order,index)=>{
      <dir key={index} className ="order-item">
<img src={assets.parcel_icon} alt="" />
<div>
  <p className='order-item-food'>
    {order.items.map((item,index)=>{
if (index===order.items.length-1) {
  return item.name+" X"+item.quantity
} else {
  return item.name+" X"+item.quantity +", "
}
    })}
  </p>
  <p className='name-user'>{order.address.firtName+" "+order.address.lastName}</p>
  <div className='for-check'>
<select onChange={(event)=>statusHandeler(event,order._id)} value={order.status}>
  <option value="fo">fo</option>
  <option value="fo1">fo1</option>
  <option value="fo2">fo2</option>
</select>
  </div>
</div>
      </dir>
    })}
   </div>
    </div>
  )
}

export default Order
