import fs from 'fs';
import path from 'path';

const base64Data = `data:image/png;base64,...`; // Collez le contenu base64 ci-dessus ici
const base64Image = base64Data.split(';base64,').pop();

if (base64Image) {
  const imageBuffer = Buffer.from(base64Image, 'base64');
  fs.writeFileSync(path.join(__dirname, '../assets/logo.png'), imageBuffer);
} 