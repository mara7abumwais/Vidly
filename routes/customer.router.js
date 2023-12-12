import express from "express";
import { addCustomer, deleteCustomer, getAllCustomers, getCustomer, updateCustomer } from "../controllers/customer.controller.js";
import {asyncMiddleware} from '../middleware/async.js';
import { validateObjectId } from "../middleware/validateObjectId.js";
import { validate } from "../middleware/validate.js";
import { validateCustomer } from "../models/customer.model.js";
import { auth } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";
const router = express.Router();

router.get('/',asyncMiddleware(getAllCustomers));
router.get('/:id',validateObjectId,asyncMiddleware(getCustomer));
router.post('/',validate(validateCustomer),asyncMiddleware(addCustomer));
router.put('/:id',[validateObjectId,validate(validateCustomer)],asyncMiddleware(updateCustomer));
router.delete('/:id',[auth,admin,validateObjectId],asyncMiddleware(deleteCustomer))

export default router;