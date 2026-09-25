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
    question: '¿Sabes cuánto es tu 7% y cuánto pagas por sobre él (o cuánto te sobra)?',
    topic: '7% y excedentes',
    options: [
      { label: 'Sí, lo tengo claro', value: 'si', ok: true },
      { label: 'Más o menos', value: 'masomenos' },
      { label: 'No', value: 'no' },
    ],
    insight: {
      title: 'Tu 7% es la base de todo',
      text: 'Saber esa cifra te permite ver si estás pagando de más o si podrías tener excedentes a tu favor. Puedes calcularlo más abajo en segundos.',
    },
  },
  {
    id: 'alza',
    onlyFor: 'isapre',
    question: 'Si te llega una carta de alza de tu plan, ¿sabes qué opciones tienes?',
    topic: 'Carta de alza',
    options: [
      { label: 'Sí', value: 'si', ok: true },
      { label: 'No', value: 'no' },
    ],
    insight: {
      title: 'Una carta de alza no es definitiva',
      text: 'Tienes alternativas: planes alternativos que la isapre debe ofrecerte o evaluar un cambio. Muchas personas simplemente aceptan el alza sin saberlo.',
    },
  },
  {
    id: 'tramo',
    onlyFor: 'fonasa',
    question: '¿Sabes en qué tramo de Fonasa estás y cómo usar la Modalidad Libre Elección?',
    topic: 'Tramo Fonasa / MLE',
    options: [
      { label: 'Sí', value: 'si', ok: true },
      { label: 'Más o menos', value: 'masomenos' },
      { label: 'No', value: 'no' },
    ],
    insight: {
      title: 'Tu tramo define cuánto pagas',
      text: 'El tramo de Fonasa determina tus copagos y si puedes atenderte con bonos en prestadores privados. Conocerlo es clave antes de evaluar un cambio a isapre.',
    },
  },
  {
    id: 'ges',
    question: 'Si te diagnostican una enfermedad cubierta por el GES, ¿sabes cómo activarlo?',
    topic: 'GES',
    options: [
      { label: 'Sí', value: 'si', ok: true },
      { label: 'No', value: 'no' },
    ],
    insight: {
      title: 'El GES no se activa solo',
      text: 'Hay que notificarlo para acceder a sus garantías de acceso, oportunidad y copago acotado. No hacerlo puede significar pagar mucho más por el mismo tratamiento.',
    },
  },
  {
    id: 'red',
    onlyFor: 'isapre',
    question: '¿Conoces las clínicas preferentes de tu plan y sus topes de cobertura?',
    topic: 'Red preferente y topes',
    options: [
      { label: 'Sí', value: 'si', ok: true },
      { label: 'Más o menos', value: 'masomenos' },
      { label: 'No', value: 'no' },
    ],
    insight: {
      title: 'Dónde te atiendes importa tanto como el plan',
      text: 'Atenderte fuera de tu red preferente o sin conocer los topes puede multiplicar lo que pagas de tu bolsillo.',
    },
  },
  {
    id: 'revision',
    question: '¿Hace cuánto revisaste si tu plan sigue siendo el adecuado para ti?',
    topic: 'Revisión del plan',
    options: [
      { label: 'Hace menos de un año', value: 'reciente', ok: true },
      { label: 'Entre 1 y 3 años', value: '1-3' },
      { label: 'Más de 3 años o nunca', value: 'nunca' },
    ],
    insight: {
      title: 'Los planes se desactualizan',
      text: 'Tu edad, tu renta y tu familia cambian; tu plan no. Revisarlo cada cierto tiempo puede darte mejor cobertura o un mejor precio.',
    },
  },
  {
    id: 'familia',
    question: '¿Cambió tu situación en los últimos años? (hijos, pareja, renta o salud)',
    topic: 'Cambios familiares',
    options: [
      { label: 'No', value: 'no', ok: true },
      { label: 'Sí', value: 'si' },
    ],
    insight: {
      title: 'Nuevas etapas, nuevas necesidades',
      text: 'Un hijo, una nueva carga o un cambio de renta pueden hacer que otra alternativa te convenga más. Vale la pena mirarlo con calma.',
    },
  },
];

export const resultados = [
  {
    min: 0.8,
    title: 'Conoces bien tu plan de salud',
    text: 'Vas por buen camino. Aun así, una segunda mirada puede confirmarte que estás en el plan correcto, y si es así, te lo diremos.',
  },
  {
    min: 0.5,
    title: 'Hay puntos que vale la pena revisar',
    text: 'Conoces lo básico, pero hay aspectos de tu plan que podrían estar costándote dinero o cobertura sin que lo notes.',
  },
  {
    min: 0,
    title: 'Podrías estar dejando beneficios sobre la mesa',
    text: 'No es tu culpa: el sistema es complejo y casi nadie lo explica. Con una conversación podemos aclarar tus opciones.',
  },
];
