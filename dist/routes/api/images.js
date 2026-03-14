import { Router } from 'express';
import { resizeImage } from '../../utilities/imageProcessing.js';
import validateImageQuery from '../../middleware/validateImageQuery.js';
const images = Router();
images.get('/', validateImageQuery, async (req, res) => {
    const { filename, width, height } = req.query;
    if (!width && !height) {
        res.status(200).send(`Serving original image: ${filename}`);
        return;
    }
    const w = parseInt(width, 10);
    const h = parseInt(height, 10);
    try {
        const thumbPath = await resizeImage(filename, w, h);
        if (!thumbPath) {
            res.status(404).send('Image not found');
            return;
        }
        res.sendFile(thumbPath);
    }
    catch (error) {
        res.status(500).send('Error processing image');
    }
});
export default images;
