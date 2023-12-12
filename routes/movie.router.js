import {auth} from '../middleware/auth.js';
import {admin} from '../middleware/admin.js';
import express from "express";
import { addMovie, deleteMovie, getAllMovies, getMovie, updateMovie } from "../controllers/movie.controller.js";
import {asyncMiddleware} from '../middleware/async.js';
import { validateObjectId } from '../middleware/validateObjectId.js';
import {validate} from '../middleware/validate.js';
import { validateMovie } from '../models/movie.model.js';
const router = express.Router();

router.get('/',asyncMiddleware(getAllMovies));
router.get('/:id',validateObjectId,asyncMiddleware(getMovie));
router.post('/',[auth,admin,validate(validateMovie)],asyncMiddleware(addMovie));
router.put('/:id',[auth,admin,validateObjectId,validate(validateMovie)],asyncMiddleware(updateMovie));
router.delete('/:id',[auth,admin,validateObjectId],asyncMiddleware(deleteMovie))

export default router;