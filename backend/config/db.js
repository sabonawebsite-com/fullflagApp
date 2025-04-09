import mongoose from "mongoose";

 export const connectedDB=async()=>{
    await mongoose.connect('mongodb+srv://Group5-finals:0922221979@cluster0.zjkgp.mongodb.net/final-pro').then(()=>console.log("DBconnected"))
 }



