import liveStockModel from "../models/liveStockModel.js";
import fs from 'fs'
const addFood=async(req,res)=>{
    let image_filename=`${req.file.filename}`;
    const food= new liveStockModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename

    })
    try {
        await food.save();
        res.json({success:true,message:"Product is added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})

    }

}
const listFood= async (req,res)=>{
    try {
        const foods=await liveStockModel.find({})
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }

}
const removeFood=async (req,res)=>{
try {
    const food=await liveStockModel.findById(req.body.id)
    fs.unlink(`uploads/${food.image}`,()=>{})
    await liveStockModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Product is removed"})
} catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
}
}
export {addFood,listFood,removeFood}
