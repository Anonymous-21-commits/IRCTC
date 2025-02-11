const express = require('express');
const router = express.Router();
const trainController = require("../../controllers/trainController")
router.get('/trains', trainController.getTrainsBetweenStations);
router.post('/train', trainController.createTrain);
router.get('/train/:id', trainController.getTrainById);
router.put('/train/:id', trainController.updateTrain);
router.delete('/train/:id', trainController.deleteTrain);
router.get('/trains/available-seats', trainController.getTrainsWithAvailableSeats);
module.exports = router;
