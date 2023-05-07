import  express  from "express";
import { login, signup,getUserById } from "../controllers/users.js";
import authMiddleware from '../middleware/authmiddleware.js';
const router = express.Router();
router.post ('/login',login);
router.post ('/signup',signup);
router.get ('/user/:id',authMiddleware,getUserById);

export default router;
