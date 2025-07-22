const express=require("express");
const {BookingController}=require("../../controllers/index");

const bookingController=new BookingController();
const router=express.Router();

router.get("/info",(req,res)=>{
    res.json({message:'response from routes'})
})
router.post("/bookings",bookingController.create);
router.post("/publish",bookingController.sendMessageToQueue);


module.exports=router;