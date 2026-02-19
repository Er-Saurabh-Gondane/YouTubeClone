import express from 'express';
import connectDB from './src/config/database.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

connectDB();
app.listen(PORT ,()=>{
    console.log(`App is listening at PORT:${PORT}`);
})

