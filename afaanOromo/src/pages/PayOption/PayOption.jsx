import React from 'react'
import './PayOption.css'

import {banks} from '../../banks/banks'

import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react'


const PayOption = () => {
    const{getTotalCartAmount}=useContext(StoreContext)
 

  return (
    <>
    <h1 id='main-text'>Karaalee Kafaltii</h1>
    <div className='main-banks'>
      
       {banks.map((item,index)=>{
        return(
<div key={index} className="display">
    <img src={item.image} alt="" className='image' />
    <div className="info">
    <p className='name-reg'>{item.name}</p>
    
   <h2 className='account'>Birri :{getTotalCartAmount()} n Lakkoofsa  {item.account}. Kana irratti Kafalii✔</h2>
  
    </div>
    <button><a href={item.link}>Kafaaltii Xumurii</a></button>

</div>

        )
            
       })}
     
        {/* <button className='button3' onClick={()=>navigate('/pay')}>Pay</button> */}
    </div>
    <hr />
    </>
  )
}

export default PayOption
