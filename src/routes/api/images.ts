import { Router, Request, Response } from 'express';
import { resizeImage } from '../../utilities/imageProcessing.js';
import validateImageQuery from '../../middleware/validateImageQuery.js';
import { ImageQuery } from '../../types/index.js';

const images = Router();


images.get('/', validateImageQuery, async (req: Request, res: Response) => {
  const { filename, width, height } = req.query as unknown as ImageQuery;

  
  if (!width && !height) {
    
    res.status(200).send(`Serving original image: ${filename}`);
    return;
  }
  
  const w = parseInt(width as string, 10);
  const h = parseInt(height as string, 10);

  try {
    const thumbPath = await resizeImage(filename as string, w, h);

    if (!thumbPath) {
      res.status(404).send('Image not found');
      return;
    }

    res.sendFile(thumbPath);
  } catch (error) {
    res.status(500).send('Error processing image');
  }
});

export default images;
