import express from "express";
import {admin} from '../middleware/admin.js';
import {auth} from '../middleware/auth.js';
import {asyncMiddleware} from '../middleware/async.js';
import { validateObjectId } from "../middleware/validateObjectId.js";
import {validate} from '../middleware/validate.js';
import { validateGenre } from "../models/genre.model.js";
import { addGenre, deleteGenre, getAllGenres, getGenre, updateGenre } from "../controllers/genre.controller.js";
const router = express.Router();

router.get('/',asyncMiddleware(getAllGenres));
router.get('/:id',validateObjectId,asyncMiddleware(getGenre));
router.post('/',[auth,admin,validate(validateGenre)],asyncMiddleware(addGenre));
router.put('/:id',[auth,admin,validateObjectId,validate(validateGenre)],asyncMiddleware(updateGenre));
router.delete('/:id',[auth,admin,validateObjectId],asyncMiddleware(deleteGenre))

export default router;
