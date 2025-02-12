const express = require('express');
const router = express.Router();
const trainController = require("../../controllers/trainController")
const UserController = require('../../controllers/user-controller');
const BookingController = require('../../controllers/booking-controller');
const bookingController = new BookingController();
const { AuthRequestValidators } = require('../../middlewares/index');
router.get('/trains', trainController.getTrainsBetweenStations);
router.get('/train/:id', trainController.getTrainById);
router.post(
    '/train',
    AuthRequestValidators.validateAdminApiKey, 
    trainController.createTrain
);

router.put(
    '/train/:id',
    AuthRequestValidators.validateAdminApiKey, 
    trainController.updateTrain
);

router.delete(
    '/train/:id',
    AuthRequestValidators.validateAdminApiKey, 
    trainController.deleteTrain
);
router.get('/trains/available-seats', trainController.getTrainsWithAvailableSeats);
router.post(
    '/signup',
    AuthRequestValidators.validateUserAuth,
    UserController.create
);
router.post(
    '/signin',
    AuthRequestValidators.validateUserAuth,
    UserController.signIn
);
router.get(
    '/isAuthenticated',
    UserController.isAuthenticated
);
router.get(
    '/isAdmin',
    AuthRequestValidators.validateIsAdminRequest,
    UserController.isAdmin
);
router.post('/bookings',
    AuthRequestValidators.validateUserAuth, 
    bookingController.create 
);
router.get('/bookings/:userId/:bookingId', bookingController.getBookingDetails);


module.exports = router;
