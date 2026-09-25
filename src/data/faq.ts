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
    q: '¿Cuánto se paga por salud en Chile?',
    a: 'Los trabajadores dependientes cotizan por ley el 7% de su renta imponible, con un tope en UF. En una isapre, si el plan elegido cuesta más que ese 7%, pagas la diferencia; si cuesta menos, pueden quedarte excedentes.',
  },
  {
    q: '¿Puedo cambiarme de Fonasa a una isapre?',
    a: 'Sí. Debes completar una Declaración de Salud y la isapre evalúa tu solicitud. Te ayudamos a elegir un plan acorde a tu renta, edad y cargas antes de firmar.',
  },
  {
    q: '¿Qué es la Declaración de Salud?',
    a: 'Es un formulario donde informas enfermedades o condiciones preexistentes tuyas y de tus cargas. Es obligatorio completarlo de forma veraz: omitir información puede traer problemas de cobertura más adelante.',
  },
  {
    q: '¿Puedo agregar a mi familia como cargas?',
    a: 'Sí. Puedes incorporar cargas legales (por ejemplo, cónyuge e hijos) y también beneficiarios que no sean carga legal, según las condiciones del plan. Cada beneficiario influye en el precio final.',
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
    q: '¿Qué necesito para que revisen mi caso?',
    a: 'Solo tus datos de contacto, tu previsión actual y qué te gustaría resolver. Si tienes a mano tu liquidación de sueldo o tu contrato de isapre, la revisión será más precisa.',
  },
  {
    q: '¿Puedo volver a Fonasa si no me gusta la isapre?',
    a: 'Sí. En general, después del primer año de contrato puedes desafiliarte de la isapre y volver a Fonasa o cambiarte a otra isapre.',
  },
];
