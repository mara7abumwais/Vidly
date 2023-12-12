import express from "express";
import {auth} from '../middleware/auth.js';
import { addUser, getAllUsers, getUser} from "../controllers/user.controller.js";
import {asyncMiddleware} from '../middleware/async.js';
import {validate} from '../middleware/validate.js';
import { validateUser } from "../models/user.model.js";
const router = express.Router();

router.get('/',auth,asyncMiddleware(getAllUsers));
router.get('/me',auth,asyncMiddleware(getUser));
router.post('/',validate(validateUser),asyncMiddleware(addUser));

export default router;