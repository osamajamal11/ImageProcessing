import { Router } from 'express';
import images from './api/images.js';
const routes = Router();
routes.get('/', (_req, res) => {
    res.send('API is running');
});
routes.use('/api/images', images);
export default routes;
