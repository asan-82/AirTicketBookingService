const {BookingService}=require("../services/index");
const {StatusCodes}=require("http-status-codes");
const {createChannel,publishMessage}=require("../utils/messageQueue");
const {REMINDER_BINDING_KEY}=require("../config/serverConfig");
const bookingService = new BookingService();

class BookingController{

  constructor(channel)
  {

    this.channel=channel;
  }
  async sendMessageToQueue (req,res){
    try{
        const channel=await createChannel();
        const payload={
          data:{
            subject: 'This is a notification from the queue',
            content: 'Some queue will subscribe this',
            recipientEmail:'aarushidhruv@gmail.com',
            notificationTime:'2025-07-12T12:32:03'
          },
          service:'CREATE_TICKET'
        };
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));

return res.status(StatusCodes.OK).json({
      message: "Successfully published the message"
      
     
    });

    }
    catch(error){
    
    res.status(error.statusCode || 500).json({
  success: false,
  message: error.message || 'Something went wrong',
  data: {},
  err: error
});

    
}
  }

  async create (req,res){
    try{
        const response=await bookingService.createBooking(req.body);

return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      message: "Successfully completed the booking",
      err: {},
    });

    }
    catch(error){
    
    return res.status(error.statusCode).json({
      data: {},
      success: false,
      message: error.message,
      err: error.explanation,
    });
    }
    
}

}


module.exports=BookingController;