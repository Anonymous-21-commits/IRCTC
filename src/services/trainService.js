const trainRepo = require('../repos/trainRepo');

// Service to get all trains between two stations
const getTrainsBetweenStations = async (source, destination) => {
  try {
    const trains = await trainRepo.getTrainsBetweenStations(source, destination);
    if (trains.length === 0) {
      throw new Error('No trains found between the given stations.');
    }
    return trains;
  } catch (error) {
    throw new Error(`Error in train service: ${error.message}`);
  }
};

// Service to create a new train
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

module.exports = {
  getTrainsBetweenStations,
  createTrain,
  getTrainById,
  updateTrain,
  deleteTrain
};
