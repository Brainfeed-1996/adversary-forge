import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scenariosDir = path.resolve(__dirname, '../../../scenarios');

export function loadScenarios() {
  const files = fs.readdirSync(scenariosDir).filter((file) => file.endsWith('.json'));
  return files.map((file) => {
    const fullPath = path.join(scenariosDir, file);
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  });
}
