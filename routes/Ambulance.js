import express from "express";
import { signup, login,getAmbulanceById } from "../controllers/ambulanceUsers.js";
import authMiddleware from '../middleware/authmiddleware.js';
const router = express.Router();
router.post ('/login',login);
router.post ('/signup',signup);
router.get ('/details/:id',authMiddleware,getAmbulanceById);
export default router;
