// Configuración general de la marca. Cambia aquí los datos de contacto.
export const site = {
  name: 'AGON',
  fullName: 'Asesorías AGON',
  tagline: 'Entiende tu plan de salud y decide con tranquilidad',
  description:
    'Asesorías AGON: te explicamos cómo funciona realmente el sistema de salud, tus derechos y tus opciones en isapre y Fonasa, para que decidas informado. Asesoría honesta y sin costo.',
  url: 'https://www.asesoriasagon.cl', // TODO: reemplazar por el dominio real
  email: 'contacto@asesoriasagon.cl', // TODO
  whatsapp: '56900000000', // TODO: número sin + ni espacios
  whatsappMessage: 'Hola, quiero que me ayuden a revisar mi plan de salud',
};

// Indicadores usados por la calculadora del 7%.
// TODO: actualizar cada año (tope imponible) y periódicamente (UF). Fuentes: sii.cl / spensiones.cl
export const indicadores = {
  uf: 40000, // valor referencial en CLP
  topeImponibleUF: 87.8, // tope imponible mensual para salud, en UF
};

export const nav = [
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Chequeo gratis', href: '/#chequeo' },
  { label: 'Tus derechos', href: '/#derechos' },
  { label: 'Fonasa a Isapre', href: '/fonasa-a-isapre' },
  { label: 'Preguntas', href: '/#faq' },
];

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
