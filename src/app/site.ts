import content from '../content.json';

// El eslogan y la explicación se editan en src/content.json.
// 'explicacion' puede ser un texto o una lista de textos (un párrafo por elemento).
const explicacion: string | string[] = content.explicacion;

/**
 * Contenido de la landing.
 * (El correo de contacto NO va aquí: se lee del archivo .env.)
 */
export const SITE = {
  name: 'Optima',
  tagline: content.slogan.trim(),
  paragraphs: (Array.isArray(explicacion) ? explicacion : [explicacion])
    .map((parrafo) => parrafo.trim())
    .filter((parrafo) => parrafo.length > 0),

  // Ruta RELATIVA al logo, dentro de la carpeta public/ (public/images/logo.svg).
  // Sin barra inicial. Sirve cualquier formato: svg, png, webp...
  logoPath: 'images/logo.svg',
  logoAlt: 'Logotipo de Optima',
};
