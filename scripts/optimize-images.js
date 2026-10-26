import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '../public/assets');

async function optimizeImages() {
  console.log('Optimizing images in:', ASSETS_DIR);
  
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error('Assets directory not found!');
    return;
  }

  const files = fs.readdirSync(ASSETS_DIR);
  
  for (const file of files) {
    if (file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
      const inputPath = path.join(ASSETS_DIR, file);
      const ext = path.extname(file);
      const baseName = path.basename(file, ext);
      const outputPath = path.join(ASSETS_DIR, `${baseName}.webp`);

      // Skip if webp already exists
      if (fs.existsSync(outputPath)) {
        console.log(`Skipping ${file} - WebP already exists`);
        continue;
      }

      console.log(`Converting ${file} to WebP...`);
      try {
        const pipeline = sharp(inputPath);
        const meta = await pipeline.metadata();
        const MAX_DIM = 16383;

        if (meta.width > MAX_DIM || meta.height > MAX_DIM) {
          const scale = Math.min(MAX_DIM / meta.width, MAX_DIM / meta.height);
          pipeline.resize({
            width: Math.round(meta.width * scale),
            height: Math.round(meta.height * scale),
            withoutEnlargement: true,
          });
          console.log(`  Resized ${meta.width}x${meta.height} to fit WebP limit (${MAX_DIM}px)`);
        }

        await pipeline
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);
        console.log(`Successfully converted ${file}`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err);
      }
    }
  }
  console.log('Image optimization complete!');
}

optimizeImages();
