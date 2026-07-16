import { readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const galleryDirectory = path.resolve(
  process.argv[2] ?? 'public/uploads/events/gallery',
);
const quality = 75;
const responsiveWidths = [480, 960, 1440];
const sourcePattern = /\.(?:jpe?g|png)$/i;

async function findImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory()
        ? findImages(entryPath)
        : Promise.resolve(sourcePattern.test(entry.name) ? [entryPath] : []);
    }),
  );

  return files.flat();
}

async function writeWebp(source, output, width) {
  let pipeline = sharp(source).rotate();
  if (width) {
    pipeline = pipeline.resize({ width });
  }

  await pipeline.webp({ quality, effort: 5 }).toFile(output);
}

async function optimizeImage(source) {
  const extension = path.extname(source);
  const base = source.slice(0, -extension.length);
  await writeWebp(source, `${base}.webp`);

  for (const width of responsiveWidths) {
    await writeWebp(source, `${base}-${width}w.webp`, width);
  }

  console.log(`Optimized ${path.relative(process.cwd(), source)}`);
}

const images = await findImages(galleryDirectory);

if (images.length === 0) {
  console.log(`No JPG, JPEG, or PNG images found in ${galleryDirectory}`);
} else {
  for (const image of images) await optimizeImage(image);
  console.log(`Created WebP versions for ${images.length} image(s) at quality ${quality}.`);
}
