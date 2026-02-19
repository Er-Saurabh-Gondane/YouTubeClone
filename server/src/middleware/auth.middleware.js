import jwt from 'jsonwebtoken'
import User from '../models/User.js';


export const protect = async (req,res,next) =>{
    try{
        const authHeader = req.headers.authorization || "";
        const token = authHeader.startsWith("Bearer ")? authHeader.split(" ")[1] : null;

        if(!token){
            return res.status(401).json({message:"Not authorized ,Token Missing."});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("_id username email avatar");

        if(!user){
            return res.status(401).json({ message: "Not authorized, user not found" });
        }
        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({message:"Not Authorized ,Token invalid"})
    }
}