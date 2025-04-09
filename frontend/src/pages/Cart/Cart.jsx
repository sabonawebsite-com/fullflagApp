import React from 'react'
import './Cart.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import{useNavigate} from 'react-router-dom'
const Cart = () => {
  const{cartItem,removeFromcart,LiveStock_list,getTotalCartAmount,url}=useContext(StoreContext)
  const navigate=useNavigate()
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Title</p>
          <p>Items</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>
        <br />
        <hr />
        {LiveStock_list.map((item,index)=>{
          if(cartItem[item._id]>0){
            return( <div>
              <div key={index} className="cart-items-title cart-items-item">
                <img src={url+"/image/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>Birr:{item.price}</p>
                <p>{cartItem[item._id]}</p>
                <p>Birr:{item.price*cartItem[item._id]}</p>
                <p onClick={()=>removeFromcart(item._id)} className='crows'>❌</p>
              </div>
              <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2> TOTAL</h2>
          <div>
          <div className="cart-total-detail">
          <p>subtotal</p>
          <p>Birr:{getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-detail">
        <p>Fee</p>
          <p>Birr:{getTotalCartAmount()===0?0:20}</p>
          </div>
          <hr />
          <div className="cart-total-detail">
          <b>Total</b>
          <b>Birr:{getTotalCartAmount()===0?0:getTotalCartAmount()+20}</b>
        </div>
        </div>
        <button onClick={()=>navigate("/payment")}>CHECKOUT TO PAYMENT</button>
        <button onClick={()=>navigate("/distro")} className='button11'>Main Distribution</button>
        <button  className='button11'><a href="https://www.ethiotelecom.et/telebirr/telebirr-registration/">PROCEED TO CHECKOUT</a></button>
        <button onClick={()=>navigate('/myorders')}>fill form</button>
        </div>
        <div className="cart-promocode">
        <div>
      
          <div className='cart-promo-code-input'>
{/* <input type="text" placeholder='enter your promo code here' /> */}

        
       

      </div>

     
</div>
          </div>
        </div>
      </div>
   
  )
}

export default Cart