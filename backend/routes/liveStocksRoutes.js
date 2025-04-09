import express from 'express'
import { addFood,listFood,removeFood } from '../controllers/liveStockController.js'
import multer from 'multer'
const liveStocksRoutes=express.Router()
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }

})
const upload=multer({storage:storage})


liveStocksRoutes.post("/add",upload.single("image"), addFood)
liveStocksRoutes.get('/list',listFood);
liveStocksRoutes.post("/remove",removeFood)







export default liveStocksRoutes