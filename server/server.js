import app from './src/app.js';
import connectDB from './src/config/database.js';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();
const PORT = process.env.PORT  || 8000;
app.use(cors({
    origin: "http://localhost:5173", // Vite default
    credentials: true,
}))

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