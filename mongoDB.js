import mongoose from "mongoose";

const connectionUrl = 'mongodb://127.0.0.1:27017/PetSitter';

// Connect to MongoDB
mongoose.connect(connectionUrl)
  .then(() => {
    console.log('Connected to MongoDB');
    // Perform further operations here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });