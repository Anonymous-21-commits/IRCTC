const BookingService = require("../services/booking-service");
const bookingService = new BookingService();
class BookingController{
    async create (req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            console.log("FROM BOOKING CONTROLLER", response);
            return res.status(200).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }
}
module.exports=BookingController;