export interface Derecho {
  tag: string;
  title: string;
  text: string;
}

// "Lo que muchas personas no saben". TODO: validar redacción con el equipo AGON antes de publicar.
export const derechos: Derecho[] = [
  {
    tag: 'Precio',
    title: 'Una carta de alza no es definitiva',
    text: 'Puedes optar a planes alternativos o evaluar cambiarte.',
  },
  {
    tag: 'GES',
    title: 'El GES hay que activarlo',
    text: 'Si no lo notificas, puedes terminar pagando de más.',
  },
  {
    tag: 'Urgencias',
    title: 'En una urgencia vital no te pueden pedir cheque',
    text: 'La Ley de Urgencia prohíbe exigir garantías para atenderte.',
  },
];
