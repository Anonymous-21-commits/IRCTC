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
}

module.exports = BookingRepository;
