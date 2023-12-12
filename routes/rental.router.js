import express from "express";
import { addRental, deleteRental, getAllRentals, getRental, updateRental } from "../controllers/rental.controller.js";
import {asyncMiddleware} from '../middleware/async.js';
import { validateObjectId } from "../middleware/validateObjectId.js";
import {auth} from '../middleware/auth.js';
import {validate} from '../middleware/validate.js';
import { validateRental } from "../models/rental.model.js";
const router = express.Router();

router.get('/',asyncMiddleware(getAllRentals));
router.get('/:id',validateObjectId,asyncMiddleware(getRental));
router.post('/',validate(validateRental),asyncMiddleware(addRental));
router.put('/:id',[validateObjectId,validate(validateRental)],asyncMiddleware(updateRental));
router.delete('/:id',validateObjectId,asyncMiddleware(deleteRental))

export default router;