import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import channelRoutes from './routes/channel.routes.js';
import videoRoutes from './routes/video.routes.js';
import commentRoutes from './routes/comment.routes.js';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// test route
app.get('/',(req,res)=>{
    res.json({message:"YouTube Clone API is Running."})
})

// Routes 
app.use('/api/auth',authRoutes);
app.use('/api/channel',channelRoutes);
app.use('/api/video',videoRoutes);
app.use('/api/comment',commentRoutes);


export default app;