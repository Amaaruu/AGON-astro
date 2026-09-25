export interface Derecho {
  tag: string;
  title: string;
  text: string;
}

// "Lo que muchas personas no saben". TODO: validar redacción con el equipo AGON antes de publicar.
export const derechos: Derecho[] = [
  {
    tag: 'Cotización',
    title: 'Tu 7% tiene un tope',
    text: 'La cotización legal es el 7% de tu renta imponible, con un tope en UF que se actualiza cada año. Si tu plan cuesta menos que tu 7%, la diferencia puede quedar a tu favor como excedentes.',
  },
  {
    tag: 'Precio',
    title: 'Una carta de alza no es definitiva',
    text: 'Cuando tu isapre informa un ajuste de precio, no estás obligado a aceptarlo sin más: puedes optar a planes alternativos o evaluar cambiarte. Revisarlo a tiempo marca la diferencia.',
  },
  {
    tag: 'GES',
    title: 'El GES hay que activarlo',
    text: 'Si te diagnostican una enfermedad cubierta por el GES, debes notificarlo a tu isapre o Fonasa para acceder a sus garantías y a un copago acotado. Muchas personas pagan de más por no hacerlo.',
  },
  {
    tag: 'CAEC',
    title: 'La CAEC no es automática',
    text: 'La cobertura para enfermedades catastróficas opera sobre un deducible, dentro de una red definida y debe solicitarse. Saber cómo funciona evita sorpresas en el peor momento.',
  },
  {
    tag: 'Urgencias',
    title: 'En una urgencia vital no te pueden pedir cheque',
    text: 'La Ley de Urgencia prohíbe exigir cheques, pagarés u otras garantías para atenderte ante una urgencia vital o con riesgo de secuela grave.',
  },
  {
    tag: 'Reclamos',
    title: 'Tienes dónde reclamar',
    text: 'Si rechazan una cobertura o una licencia médica, existen instancias como la Superintendencia de Salud y la COMPIN. No tienes que resolverlo solo.',
  },
];
