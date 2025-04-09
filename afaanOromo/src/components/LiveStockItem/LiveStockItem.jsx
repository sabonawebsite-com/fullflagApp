import React, { useContext,} from 'react'
import './LiveStockItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
const LiveStockItem = ({id,name,price,description,image}) => {

  const{cartItem,addToCart,removeFromcart,url}=useContext(StoreContext)
  return (
    
    <div className='live-stock-itme'>
   <div className="live-stock-item-contener">
    <img src={url+"/image/"+image} alt="" className="live-stock-item-image" />
    {!cartItem[id]?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}/>
    :<div className='live-stock-item-counter'>
      <img onClick={()=>removeFromcart(id)} src={assets.remove_icon_red} alt="" />
      <p>{cartItem[id]}</p>
      <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
      </div>
      }
   </div>
   <div className="live-stock-item-ifo">
    <div className="live-stock-item-rating">
    
    <p> {name} </p>
    <img src={assets.rating_starts} alt="" />
    </div>
    <p className="live-stock-item-description">{description} </p>
    <p className="live-stock-item-price">birr:{price}</p>
   </div>
    </div>
   
  )
}

export default LiveStockItem