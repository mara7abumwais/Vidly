import express from "express";
import { login } from "../controllers/auth.controller.js";
import {asyncMiddleware} from '../middleware/async.js';
const router = express.Router();

router.post('/',asyncMiddleware(login));

export default router;