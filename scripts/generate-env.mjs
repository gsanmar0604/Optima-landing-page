// Lee CONTACT_EMAIL del archivo .env (o de la variable de entorno, útil en CI)
// y genera src/app/env.generated.ts, que es lo que importa la aplicación.
// Se ejecuta solo antes de `npm start`, `npm run build` y `npm run watch`.
import { loadEnvFile } from 'node:process';
import { existsSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = resolve(root, '.env');

if (existsSync(envPath)) {
  loadEnvFile(envPath);
}

const email = (process.env.CONTACT_EMAIL ?? '').trim();

if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error(
    '\n[optima] Falta CONTACT_EMAIL (o no es un correo válido).\n' +
      '         Copia .env.example a .env y escribe tu correo de contacto.\n',
  );
  process.exit(1);
}

const target = resolve(root, 'src/app/env.generated.ts');
writeFileSync(
  target,
  '// Archivo generado por scripts/generate-env.mjs. No lo edites ni lo subas a git.\n' +
    `export const CONTACT_EMAIL = ${JSON.stringify(email)};\n`,
);

console.log(`[optima] Correo de contacto cargado desde .env -> ${email}`);
