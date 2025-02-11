const trainService = require('../services/trainService');

// Controller to get all trains between two stations
const getTrainsBetweenStations = async (req, res) => {
  const { source, destination } = req.query;
  try {
    // Call the service to get trains between source and destination
    const trains = await trainService.getTrainsBetweenStations(source, destination);
    if (trains.length === 0) {
      return res.status(404).json({ message: 'No trains found between the given stations.' });
    }
    return res.status(200).json({ trains });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching trains.' });
  }
};

// Controller to create a new train
const createTrain = async (req, res) => {
  const { train_name, source, destination, total_seats, available_seats, status, train_type } = req.body;
  try {
    // Call the service to create a new train
    const newTrain = await trainService.createTrain({ train_name, source, destination, total_seats, available_seats, status, train_type });
    return res.status(201).json({ train: newTrain });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating train.' });
  }
};

// Controller to get a specific train by ID
const getTrainById = async (req, res) => {
  const { id } = req.params;
  try {
    // Call the service to get the train by ID
    const train = await trainService.getTrainById(id);
    return res.status(200).json({ train });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching train.' });
  }
};

// Controller to update a train by ID
const updateTrain = async (req, res) => {
  const { id } = req.params;
  const { train_name, source, destination, total_seats, available_seats, status, train_type } = req.body;
  try {
    // Call the service to update the train by ID
    const updatedTrain = await trainService.updateTrain(id, { train_name, source, destination, total_seats, available_seats, status, train_type });
    return res.status(200).json({ train: updatedTrain });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating train.' });
  }
};

// Controller to delete a train by ID
const deleteTrain = async (req, res) => {
  const { id } = req.params;
  try {
    // Call the service to delete the train by ID
    const response = await trainService.deleteTrain(id);
    return res.status(200).json({ message: response.message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting train.' });
  }
};
const getTrainsWithAvailableSeats = async (req, res) => {
    const { source, destination } = req.query;
  
    try {
      // Call the Train Service to get trains with available seats
      const trainsWithSeats = await trainService.getTrainsWithAvailableSeats(source, destination);
  
      return res.status(200).json({ trains: trainsWithSeats });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = {
  getTrainsBetweenStations,
  createTrain,
  getTrainById,
  updateTrain,
  deleteTrain,
  getTrainsWithAvailableSeats
};
