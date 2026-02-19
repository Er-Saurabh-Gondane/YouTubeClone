import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js'

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// test route
app.get('/',(req,res)=>{
    res.json({message:"YouTube Clone API is Running."})
})

// Routes 
app.use('/api/auth',authRoutes)


export default app;