import React from 'react';
import { renderToString } from 'react-dom/server';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const Logo = () => (
  <svg width="1024" height="1024" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#2f95dc', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#2477b2', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="90" fill="url(#grad)" />
    <g fill="#fff">
      <path d="M100 50c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50zm0 90c-22.091 0-40-17.909-40-40s17.909-40 40-40 40 17.909 40 40-17.909 40-40 40z" />
      <path d="M100 70c-16.569 0-30 13.431-30 30 0 16.569 13.431 30 30 30 16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30zm0 50c-11.046 0-20-8.954-20-20s8.954-20 20-20 20 8.954 20 20-8.954 20-20 20z" />
      <path d="M100 90c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10z" />
      <text x="100" y="180" textAnchor="middle" fill="#fff" fontSize="24">DG</text>
    </g>
  </svg>
);

const sizes = {
  logo: { width: 200, height: 200 },
  icon: { width: 1024, height: 1024 },
  adaptiveIcon: { width: 1024, height: 1024 },
  splash: { width: 1242, height: 2436 },
  favicon: { width: 32, height: 32 }
};

async function generateImages() {
  const svgString = renderToString(<Logo />);
  const assetsDir = path.join(process.cwd(), 'assets');

  // Assurez-vous que le dossier assets existe
  await fs.mkdir(assetsDir, { recursive: true });

  // Générer les différentes tailles
  for (const [name, size] of Object.entries(sizes)) {
    const buffer = await sharp(Buffer.from(svgString))
      .resize(size.width, size.height, {
        fit: name === 'splash' ? 'contain' : 'cover',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toBuffer();

    await fs.writeFile(path.join(assetsDir, `${name}.png`), buffer);
  }
}

generateImages().catch(console.error); 