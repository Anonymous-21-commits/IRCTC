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
    async getBookingDetails(req, res) {
        console.log(req.params);
        const { userId, bookingId } = req.params; 

        try {
          
            const booking = await bookingService.getBookingDetails(userId, bookingId);

           
            if (!booking) {
                return res.status(404).json({
                    success: false,
                    message: 'Booking not found',
                    data: {}
                });
            }

            
            return res.status(200).json({
                success: true,
                message: 'Booking details fetched successfully',
                data: booking
            });
        } catch (error) {
            
            console.error('Error fetching booking details:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'An error occurred while fetching booking details',
                data: {}
            });
        }
    }
}
module.exports=BookingController;