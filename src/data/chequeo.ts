export type Prevision = 'fonasa' | 'isapre' | 'nose';

export interface ChequeoOption {
  label: string;
  value: string;
  /** true si la respuesta indica que la persona conoce/aprovecha este punto */
  ok?: boolean;
}

export interface ChequeoQuestion {
  id: string;
  question: string;
  options: ChequeoOption[];
  /** Solo se muestra a quienes están en esta previsión */
  onlyFor?: Prevision;
  /** Se muestra en el resultado cuando la respuesta no es "ok" */
  insight?: { title: string; text: string };
  /** Etiqueta corta para el resumen que recibe el asesor */
  topic?: string;
}

// TODO: validar preguntas y textos con el equipo AGON.
export const chequeo: ChequeoQuestion[] = [
  {
    id: 'prevision',
    question: '¿Dónde cotizas hoy tu salud?',
    options: [
      { label: 'Fonasa', value: 'fonasa' },
      { label: 'Isapre', value: 'isapre' },
      { label: 'No lo tengo claro', value: 'nose' },
    ],
  },
  {
    id: 'siete',
    question: '¿Sabes cuánto pagas por sobre tu 7%?',
    topic: '7% y excedentes',
    options: [
      { label: 'Sí, lo tengo claro', value: 'si', ok: true },
      { label: 'Más o menos', value: 'masomenos' },
      { label: 'No', value: 'no' },
    ],
    insight: {
      title: 'Tu 7% es la base de todo',
      text: 'Saber esa cifra te muestra si pagas de más o si tienes excedentes a tu favor.',
    },
  },
  {
    id: 'alza',
    onlyFor: 'isapre',
    question: 'Si te llega una carta de alza, ¿sabes qué opciones tienes?',
    topic: 'Carta de alza',
    options: [
      { label: 'Sí', value: 'si', ok: true },
      { label: 'No', value: 'no' },
    ],
    insight: {
      title: 'Una carta de alza no es definitiva',
      text: 'Puedes optar a planes alternativos o evaluar un cambio.',
    },
  },
  {
    id: 'tramo',
    onlyFor: 'fonasa',
    question: '¿Sabes en qué tramo de Fonasa estás?',
    topic: 'Tramo Fonasa / MLE',
    options: [
      { label: 'Sí', value: 'si', ok: true },
      { label: 'Más o menos', value: 'masomenos' },
      { label: 'No', value: 'no' },
    ],
    insight: {
      title: 'Tu tramo define cuánto pagas',
      text: 'Define tus copagos y si puedes atenderte con bonos en clínicas privadas.',
    },
  },
  {
    id: 'ges',
    question: '¿Sabes cómo activar el GES si lo necesitas?',
    topic: 'GES',
    options: [
      { label: 'Sí', value: 'si', ok: true },
      { label: 'No', value: 'no' },
    ],
    insight: {
      title: 'El GES no se activa solo',
      text: 'Hay que notificarlo; si no, puedes pagar mucho más por el mismo tratamiento.',
    },
  },
  {
    id: 'red',
    onlyFor: 'isapre',
    question: '¿Conoces las clínicas preferentes de tu plan?',
    topic: 'Red preferente y topes',
    options: [
      { label: 'Sí', value: 'si', ok: true },
      { label: 'Más o menos', value: 'masomenos' },
      { label: 'No', value: 'no' },
    ],
    insight: {
      title: 'Dónde te atiendes importa tanto como el plan',
      text: 'Atenderte fuera de tu red puede multiplicar lo que pagas.',
    },
  },
  {
    id: 'revision',
    question: '¿Hace cuánto revisaste tu plan?',
    topic: 'Revisión del plan',
    options: [
      { label: 'Hace menos de un año', value: 'reciente', ok: true },
      { label: 'Entre 1 y 3 años', value: '1-3' },
      { label: 'Más de 3 años o nunca', value: 'nunca' },
    ],
    insight: {
      title: 'Los planes se desactualizan',
      text: 'Tu vida cambia; tu plan no. Revisarlo puede darte mejor cobertura o precio.',
    },
  },
];

export const resultados = [
  {
    min: 0.8,
    title: 'Conoces bien tu plan de salud',
    text: 'Vas por buen camino. Si quieres, confirmamos que estás en el plan correcto.',
  },
  {
    min: 0.5,
    title: 'Hay puntos que vale la pena revisar',
    text: 'Hay aspectos de tu plan que podrían estar costándote dinero sin que lo notes.',
  },
  {
    min: 0,
    title: 'Podrías estar dejando beneficios sobre la mesa',
    text: 'No es tu culpa: casi nadie lo explica. Conversemos y aclaramos tus opciones.',
  },
];
