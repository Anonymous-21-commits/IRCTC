const { sequelize } = require('../models');
const BookingRepository = require('../repository/booking-repository');
const { getTrainById } = require('../repository/trainRepo');

class BookingService {
    constructor() {
        this.bookingRepo = new BookingRepository();
    }

    async createBooking(data) {
        const t = await sequelize.transaction(); 
        try {
            const trainId = data.trainId;
            const train = await getTrainById(trainId, { transaction: t });

            if (!train) {
                throw new Error('Train not found');
            }

            if (train.available_seats < data.noofSeats) {
                throw new Error('Insufficient seats in the train');
            }

            const price = train.price;
            const totalCost = price * data.noofSeats;

            const bookingPayload = { ...data, totalCost };
            const booking = await this.bookingRepo.create(bookingPayload, { transaction: t });

            
            const updatedTrain = await getTrainById(trainId, { transaction: t });
            if (updatedTrain) {
                const updatedSeats = updatedTrain.available_seats - data.noofSeats;
                if (updatedSeats < 0) {
                    throw new Error('Not enough seats left after checking availability');
                }
                await updatedTrain.update({ available_seats: updatedSeats }, { transaction: t });
            }

            
            const finalBooking = await this.bookingRepo.update(booking.id, { status: 'BOOKED' }, { transaction: t });

            
            await t.commit();
            return finalBooking;

        } catch (error) {
           
            await t.rollback();
            throw new Error('Something went wrong during booking');
        }
    }

    async getBookingDetails(userId, bookingId) {
        try {
            const booking = await this.bookingRepo.getBookingByUserIdAndBookingId(userId, bookingId);
            return booking;
        } catch (error) {
            console.error('Error in BookingService:', error);
            throw new Error('An error occurred while fetching booking details.');
        }
    }
}

module.exports = BookingService;
