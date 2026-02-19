import { Router } from "express";
import { validateLogin, validateRegister } from "../middleware/validate.middleware.js";
import { login, me, register } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();
// post request for registration with validation 
router.post("/register",validateRegister,register);
// post request for login 
router.post('/login',validateLogin,login);
// get request me to get currently logged user information
router.get('/me',protect,me)

export default router;
