import express from 'express'
import  authMiddleware from '../middleware/auth.js'
import { listorder, orderVerify, placeOrder, updateOrders, userOrder } from '../controllers/orderController.js'
const orderRouter=express.Router();
orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",orderVerify)
orderRouter.post("/userorders",authMiddleware,userOrder)
orderRouter.get("/list",listorder)
orderRouter.post("/status",updateOrders)
export default orderRouter;