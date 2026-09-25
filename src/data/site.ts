// Configuración general de la marca. Cambia aquí los datos de contacto.
export const site = {
  name: 'AGON',
  fullName: 'Asesorías AGON',
  tagline: 'Compara isapres y elige el plan de salud que te conviene',
  description:
    'Asesorías AGON: comparamos planes de isapre por ti, te explicamos el paso de Fonasa a isapre y te acompañamos en todo el proceso. Asesoría sin costo.',
  url: 'https://www.asesoriasagon.cl', // TODO: reemplazar por el dominio real
  email: 'contacto@asesoriasagon.cl', // TODO
  whatsapp: '56900000000', // TODO: número sin + ni espacios
  whatsappMessage: 'Hola, quiero cotizar un plan de salud con AGON',
};

export const nav = [
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Isapres', href: '/isapres' },
  { label: 'Fonasa a Isapre', href: '/fonasa-a-isapre' },
  { label: 'Preguntas', href: '/#faq' },
];

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
