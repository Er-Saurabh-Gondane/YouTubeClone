import app from './src/app.js';
import connectDB from './src/config/database.js';
import dotenv from 'dotenv';


dotenv.config();
const PORT = process.env.PORT  || 8000;


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();