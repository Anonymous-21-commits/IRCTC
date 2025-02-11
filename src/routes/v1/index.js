const express = require('express');
const router = express.Router();
const trainController = require("../../controllers/trainController")
const UserController = require('../../controllers/user-controller');
router.get('/trains', trainController.getTrainsBetweenStations);
router.post('/train', trainController.createTrain);
router.get('/train/:id', trainController.getTrainById);
router.put('/train/:id', trainController.updateTrain);
router.delete('/train/:id', trainController.deleteTrain);
router.get('/trains/available-seats', trainController.getTrainsWithAvailableSeats);
router.post('/signup', UserController.create);
module.exports = router;
