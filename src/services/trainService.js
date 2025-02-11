const trainRepo = require('../repository/trainRepo');


const getTrainsBetweenStations = async (source, destination) => {
    try {
      const trains = await trainRepo.getTrainsBetweenStations(source, destination);
      if (trains.length === 0) {
        throw new Error('No trains found between the given stations.');
      }
      return trains;
    } catch (error) {
      console.error('Original error:', error); 
      throw new Error(`Error in train service: ${error.message}`);
    }
  };
  
const createTrain = async (trainData) => {
  try {
    const newTrain = await trainRepo.createTrain(trainData);
    return newTrain;
  } catch (error) {
    throw new Error(`Error in train service: ${error.message}`);
  }
};

// Service to get a train by ID
const getTrainById = async (id) => {
  try {
    const train = await trainRepo.getTrainById(id);
    return train;
  } catch (error) {
    throw new Error(`Error in train service: ${error.message}`);
  }
};

// Service to update a train by ID
const updateTrain = async (id, updatedData) => {
  try {
    const updatedTrain = await trainRepo.updateTrain(id, updatedData);
    return updatedTrain;
  } catch (error) {
    throw new Error(`Error in train service: ${error.message}`);
  }
};

// Service to delete a train by ID
const deleteTrain = async (id) => {
  try {
    const response = await trainRepo.deleteTrain(id);
    return response;
  } catch (error) {
    throw new Error(`Error in train service: ${error.message}`);
  }
};
const getTrainsWithAvailableSeats = async (source, destination) => {
    try {
      // Fetch all trains between source and destination
      const trains = await trainRepo.getTrainsBetweenStations(source, destination);
      
      if (trains.length === 0) {
        throw new Error('No trains found between the given stations.');
      }
    
      // Filter out trains with 0 available seats
      const trainsWithSeats = trains
        .filter(train => train.available_seats > 0) 
        .map(train => ({
          train_id: train.id,
          train_name: train.train_name,
          source: train.source,
          destination: train.destination,
          available_seats: train.available_seats,
        }));
    
      return trainsWithSeats;
    } catch (error) {
      throw new Error(`Error in getting trains with available seats: ${error.message}`);
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
