import mongoose from "mongoose";
const livestocksSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true, 
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  });
const liveStockModel=mongoose.models.livestocks|| mongoose.model("livestocks",livestocksSchema)
export default liveStockModel;



// import livestocksModel from "../models/livestocksModel.js";
// import fs from 'fs'
// const addlivestocks=async(req,res)=>{

// }
// export {addlivestocks}



// import mongoose from "mongoose";
// export const connectDB=async()=>{
//    (await mongoose.connect('mongodb+srv://Sabona:MARARA246Bal@cluster0.yxoayzp.mongodb.net/livestocks-2del'))
//    .then(()=>console.log('Db connected'))
// }
