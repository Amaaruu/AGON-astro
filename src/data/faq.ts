export interface FaqItem {
  q: string;
  a: string;
}

// TODO: revisar y validar textos con el equipo antes de publicar.
export const faq: FaqItem[] = [
  {
    q: '¿La asesoría tiene algún costo?',
    a: 'No. Recibir asesoría con AGON no tiene costo para ti y no te obliga a contratar ni a cambiarte de nada.',
  },
  {
    q: '¿Puedo cambiarme de Fonasa a una isapre?',
    a: 'Sí. Debes completar una Declaración de Salud y la isapre evalúa tu solicitud. Te ayudamos a elegir un plan acorde a tu renta, edad y cargas antes de firmar.',
  },
  {
    q: '¿Qué es el GES y la CAEC?',
    a: 'El GES (Garantías Explícitas en Salud) cubre un listado de problemas de salud con garantías de acceso, oportunidad y protección financiera, tanto en Fonasa como en isapres. La CAEC es una cobertura adicional para enfermedades catastróficas que ofrecen las isapres.',
  },
  {
    q: '¿Me van a insistir en que me cambie de isapre?',
    a: 'No. Nuestro objetivo es que entiendas tus opciones. Si tu plan actual es el que más te conviene, te lo diremos y te explicaremos cómo aprovecharlo mejor.',
  },
  {
    q: '¿Puedo volver a Fonasa si no me gusta la isapre?',
    a: 'Sí. En general, después del primer año de contrato puedes desafiliarte de la isapre y volver a Fonasa o cambiarte a otra isapre.',
  },
];
