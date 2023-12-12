import express from "express";
import {asyncMiddleware} from '../middleware/async.js';
import { addReturn } from "../controllers/return.controller.js";
import {auth} from '../middleware/auth.js';
import { validate } from "../middleware/validate.js";
import { validateRental } from "../models/rental.model.js";
const router = express.Router();

router.post('/',[auth,validate(validateRental)],asyncMiddleware(addReturn));
export default router;