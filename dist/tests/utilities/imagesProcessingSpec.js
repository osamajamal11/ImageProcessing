import { resizeImage, getSourcePath } from '../../utilities/imageProcessing.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.resolve(__dirname, '../../../images');
const thumbDir = path.resolve(imagesDir, 'thumb');
describe('Image Processing Utilities', () => {
    afterAll(() => {
        const thumbFiles = fs.existsSync(thumbDir)
            ? fs.readdirSync(thumbDir)
            : [];
        for (const file of thumbFiles) {
            fs.unlinkSync(path.join(thumbDir, file));
        }
    });
    describe('getSourcePath', () => {
        it('should return the full path to the source image', () => {
            const result = getSourcePath('fjord.jpg');
            expect(result).toContain('images');
            expect(result).toContain('fjord.jpg');
        });
    });
    describe('resizeImage', () => {
        it('should return null for a non-existent file', async () => {
            const result = await resizeImage('nonexistent.jpg', 200, 200);
            expect(result).toBeNull();
        });
    });
});
