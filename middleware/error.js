import { logging } from '../startup/logging.js';

export const error = (err, req, res, next) => {
    const logger = logging(); 
    logger.error(err.message, err);
    res.status(500).json('Something failed.');
};
