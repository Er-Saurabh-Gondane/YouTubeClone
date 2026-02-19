import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { signToken } from "../utils/jwt.js";

export const register = asyncHandler(async (req,res)=>{

    const {userName,email,password,avatar} = req.body;
    
    const exist = await User.findOne({email});
    // check if user already exist
    if(exist){
        return res.status(409).json({message:"Email Already Registerd"});
    }

    const user = await User.create({userName,email,password,avatar});

    // after registration redirect to login (frontend)
    // in backend we just send success message
    return res.status(201).json({
        message:"Registration successfully...Please Login..",
        user:{id:user._id,userName:user.userName,email:user.email,avatar:user.avatar},
    });


});

// login 
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // password is select:false so we must select it explicitly
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const ok = await user.comparePassword(password)
  if (!ok) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = signToken({ id: user._id });

  return res.status(200).json({
    message: "Login successful",
    token,
    user: { id: user._id, username: user.username, email: user.email, avatar: user.avatar },
  });
});