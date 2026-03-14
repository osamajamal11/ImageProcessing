import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.resolve(__dirname, '../../images');
const thumbDir = path.resolve(imagesDir, 'thumb');
const ensureThumbDir = async () => {
    if (!fs.existsSync(thumbDir)) {
        await fs.promises.mkdir(thumbDir, { recursive: true });
    }
};
const getThumbPath = (filename, width, height) => {
    const ext = path.extname(filename);
    const name = path.basename(filename, ext);
    return path.resolve(thumbDir, `${name}_${width}x${height}${ext}`);
};
const getSourcePath = (filename) => {
    return path.resolve(imagesDir, filename);
};
const resizeImage = async (filename, width, height) => {
    const sourcePath = getSourcePath(filename);
    const thumbPath = getThumbPath(filename, width, height);
    if (fs.existsSync(thumbPath)) {
        return thumbPath;
    }
    if (!fs.existsSync(sourcePath)) {
        return null;
    }
    await ensureThumbDir();
    await sharp(sourcePath).resize(width, height).toFile(thumbPath);
    return thumbPath;
};
export { resizeImage, getThumbPath, getSourcePath };
