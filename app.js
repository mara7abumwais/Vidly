import dotenv from 'dotenv';
import express from 'express';
const app = express();

import {logging} from './startup/logging.js';
import {routes} from './startup/routes.js';
import {connectDB} from './startup/db.js';
import {validation} from './startup/validation.js';
import { production } from './startup/prod.js';

const logger = logging();
dotenv.config();
validation();
connectDB();
routes(app);
production(app);

const port = process.env.PORT || 3000;
export const server = app.listen(port,()=>logger.info(`Listenting on port ${port}`));
