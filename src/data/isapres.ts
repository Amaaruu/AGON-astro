export interface Isapre {
  slug: string;
  name: string;
  type: 'abierta' | 'cerrada';
}

// Isapres abiertas vigentes. Verificar periódicamente en superdesalud.gob.cl
export const isapres: Isapre[] = [
  { slug: 'banmedica', name: 'Banmédica', type: 'abierta' },
  { slug: 'colmena', name: 'Colmena', type: 'abierta' },
  { slug: 'consalud', name: 'Consalud', type: 'abierta' },
  { slug: 'cruz-blanca', name: 'Cruz Blanca', type: 'abierta' },
  { slug: 'esencial', name: 'Esencial', type: 'abierta' },
  { slug: 'nueva-masvida', name: 'Nueva Masvida', type: 'abierta' },
  { slug: 'vida-tres', name: 'Vida Tres', type: 'abierta' },
];

// Opciones del select "Previsión actual"
export const previsiones = [
  { value: 'fonasa', label: 'Fonasa' },
  ...isapres.map((i) => ({ value: i.slug, label: i.name })),
  { value: 'otra', label: 'Otra / No tengo' },
];
