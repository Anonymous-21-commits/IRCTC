const { Booking } = require('../models/index');

class BookingRepository {
    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            console.error('Error creating booking:', error);
            throw new Error('An error occurred while creating the booking.');
        }
    }

    async update(bookingId, data) {
        try {
            const booking = await Booking.findByPk(bookingId);
            if (!booking) {
                throw new Error('Booking not found.');
            }
            if (data.status) {
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            console.error('Error updating booking:', error);
            throw new Error('An error occurred while updating the booking.');
        }
    }
    async getBookingByUserIdAndBookingId(userId, bookingId) {
        try {
            
            const booking = await Booking.findOne({
                where: {
                    userId: userId,
                    id: bookingId
                }
            });

            if (!booking) {
                throw new Error('Booking not found.');
            }

            return booking;
        } catch (error) {
            console.error('Error fetching booking:', error);
            throw new Error('An error occurred while fetching the booking.');
        }
    }
}

module.exports = BookingRepository;
