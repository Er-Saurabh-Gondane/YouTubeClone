import { Router } from "express";
import { protect } from "../middleware/auth.middleware.s";
import { createChannel, deleteChannel, getChannelById, getMyChannel, subscribeChannel, unsubscribeChannel, updateChannel } from "../controllers/channel.controller.js";

const router = Router();

// create channel -- Post request (logged user)
router.post("/createChannle",protect,createChannel);

// get my channel 
router.get('/myChannel',protect,getMyChannel);

// get channel by id 
router.get('/getChannel/:id',getChannelById)

// update Channel
router.put('/updateChannel',protect,updateChannel);

// delete channel
router.delete('/deleteChannel',protect,deleteChannel);

// subscribe
router.post('/subscribe/:id',protect,subscribeChannel);

// unsubscribe 
router.post('/unsubscribe/:id',protect,unsubscribeChannel);

export default router;
