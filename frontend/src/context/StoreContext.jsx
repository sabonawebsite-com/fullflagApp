import axios from "axios";
import { createContext, useEffect, useState } from "react";
// import { LiveStock_list } from "../assets/assets";
export const StoreContext=createContext(null)
const StoreContextProvider=(props)=>{
const[cartItem,setCartItem]=useState({})

const url="http://localhost:4000";
const[token,setToken]=useState("")
const[LiveStock_list,setFoodList]=useState([])
const addToCart=async(itemId)=>{
    if(!cartItem[itemId]){
        setCartItem((prev)=>({...prev,[itemId]:1}))
    }
    else{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]=1}))  
    }
    if (token) {
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
}
const removeFromcart= async (itemId)=>{
    setCartItem((prev)=>({...prev,[itemId]:prev[itemId]=0})) 
    if (token) {
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
}
const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItem){
        if(cartItem[item]>0){
            let itemInfo=LiveStock_list.find((product)=>product._id===item);
            totalAmount +=itemInfo.price*cartItem[item]
        }
        }
        return totalAmount;
       
}
const fechFoodList=async()=>{
    const response=await axios.get(url+'/api/livestocks/list')
    setFoodList(response.data.data)
}
const loadCartData=async(token)=>{
    const response=await axios.post(url+'/api/cart/get',{},{headers:{token}})
    setCartItem(response.data.cartData)
}
// useEffect(()=>{
//     console.log(cartItem)
// },[cartItem])
useEffect(()=>{
    async function loadData(){
        await fechFoodList()
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            await loadCartData(localStorage.getItem("token"));
        }
    }
loadData();
},[])


const contextValue={
    LiveStock_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromcart,
    getTotalCartAmount,
    url,
    token,
    setToken
}
return<StoreContext.Provider value={contextValue}>
    {props.children}
</StoreContext.Provider>
}
export default StoreContextProvider