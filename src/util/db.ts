import mongoose from "mongoose";
import "dotenv/config"


export const connectDB = async () => {
  try {
    // const MONGODB_URI = 'mongodb://0.0.0.0:27017/miranda';
    const MONGODB_URI = "mongodb+srv://admin:admin@miranda-backend.zaocnj5.mongodb.net/miranda"

    await mongoose.connect(MONGODB_URI);
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
  }
};


export const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log('Desconexión exitosa de MongoDB');
};
