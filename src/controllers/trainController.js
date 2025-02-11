const trainService = require('../services/trainService');


const getTrainsBetweenStations = async (req, res) => {
  const { source, destination } = req.query;
  try {
   
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


const createTrain = async (req, res) => {
  const { train_name, source, destination, total_seats, available_seats, status, train_type } = req.body;
  try {
    
    const newTrain = await trainService.createTrain({ train_name, source, destination, total_seats, available_seats, status, train_type });
    return res.status(201).json({ train: newTrain });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error creating train.' });
  }
};


const getTrainById = async (req, res) => {
  const { id } = req.params;
  try {
   
    const train = await trainService.getTrainById(id);
    return res.status(200).json({ train });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching train.' });
  }
};


const updateTrain = async (req, res) => {
  const { id } = req.params;
  const { train_name, source, destination, total_seats, available_seats, status, train_type } = req.body;
  try {
    
    const updatedTrain = await trainService.updateTrain(id, { train_name, source, destination, total_seats, available_seats, status, train_type });
    return res.status(200).json({ train: updatedTrain });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating train.' });
  }
};


const deleteTrain = async (req, res) => {
  const { id } = req.params;
  try {
   
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
