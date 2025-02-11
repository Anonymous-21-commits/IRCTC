const { Train } = require('../models');


const getTrainsBetweenStations = async (source, destination) => {
  try {
    const trains = await Train.findAll({
      where: {
        source,
        destination
      }
    });
    return trains;
  } catch (error) {
    console.log('here');
    throw new Error('Error fetching trains between stations');
  }
};


const createTrain = async (trainData) => {
  try {
    const newTrain = await Train.create(trainData);
    return newTrain;
  } catch (error) {
    throw new Error('Error creating a new train');
  }
};


const getTrainById = async (id) => {
  try {
    const train = await Train.findByPk(id);
    if (!train) {
      throw new Error('Train not found');
    }
    return train;
  } catch (error) {
    throw new Error('Error fetching train by ID');
  }
};


const updateTrain = async (id, updatedData) => {
  try {
    const train = await Train.findByPk(id);
    if (!train) {
      throw new Error('Train not found');
    }
    await train.update(updatedData);
    return train;
  } catch (error) {
    throw new Error('Error updating train');
  }
};


const deleteTrain = async (id) => {
  try {
    const train = await Train.findByPk(id);
    if (!train) {
      throw new Error('Train not found');
    }
    await train.destroy();
    return { message: 'Train deleted successfully' };
  } catch (error) {
    throw new Error('Error deleting train');
  }
};

module.exports = {
  getTrainsBetweenStations,
  createTrain,
  getTrainById,
  updateTrain,
  deleteTrain
};
