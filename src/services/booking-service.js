const BookingRepository = require('../repository/booking-repository');
const { getTrainById } = require('../repository/trainRepo');

class BookingService {
    constructor() {
        this.bookingRepo = new BookingRepository();
    }

    async createBooking(data) {
        try {
            const trainId = data.trainId;
            const train = await getTrainById(trainId);

            if (!train) {
                throw new Error('Train not found');
            }

            if (train.available_seats < data.noofSeats) {
                throw new BookingError('Insufficient seats in the train');
            }


            const price = train.price;
            const totalCost = price * data.noofSeats;


            const bookingPayload = { ...data, totalCost };
            const booking = await this.bookingRepo.create(bookingPayload);

            const updatedTrain = await getTrainById(trainId);
            if (updatedTrain) {
                const updatedSeats = updatedTrain.available_seats - data.noofSeats;
                await updatedTrain.update({ available_seats: updatedSeats });
            }
            const finalBooking = await this.bookingRepo.update(booking.id, { status: 'BOOKED' });
            return finalBooking;

        } catch (error) {
            throw new Error('Something went wrong during booking');
        }
    }
}

module.exports = BookingService;
