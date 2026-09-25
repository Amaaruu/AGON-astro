import { indicadores } from '../data/site';

const clp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

const parseCLP = (v: string) => Number(v.replace(/\D/g, '')) || 0;
const parseUF = (v: string) => Number(v.replace(/\./g, '').replace(',', '.').replace(/[^\d.]/g, '')) || 0;

export function initCalculadora(id: string) {
  const form = document.getElementById(id) as HTMLFormElement | null;
  if (!form) return;

  const renta = form.querySelector<HTMLInputElement>('[name="renta"]')!;
  const plan = form.querySelector<HTMLInputElement>('[name="plan"]')!;
  const $ = (sel: string) => form.querySelector<HTMLElement>(sel)!;
  const siete = $('#calc-siete');
  const diff = $('#calc-diff');
  const diffLabel = $('#calc-diff-label');
  const diffBox = $('#calc-diff-box');
  const note = $('#calc-note');

  const tope = indicadores.topeImponibleUF * indicadores.uf;

  function update() {
    const r = parseCLP(renta.value);
    renta.value = r ? clp.format(r) : '';

    if (!r) {
      siete.textContent = '—';
      diff.textContent = '—';
      note.textContent = 'Ingresa tu renta para ver el cálculo.';
      return;
    }

    const base = Math.min(r, tope);
    const cotizacion = base * 0.07;
    siete.textContent = clp.format(cotizacion);

    const notes: string[] = [];
    if (r > tope) notes.push(`Tu renta supera el tope imponible, así que tu 7% se calcula sobre ${clp.format(tope)}.`);

    const uf = parseUF(plan.value);
    diffBox.className = 'rounded-xl p-4 bg-slate-50';
    diff.className = 'mt-1 text-2xl font-bold text-slate-400';

    if (!uf) {
      diffLabel.textContent = 'Diferencia con tu plan';
      diff.textContent = '—';
      notes.push('Agrega el valor de tu plan en UF para ver si pagas de más.');
    } else {
      const precio = uf * indicadores.uf;
      const d = precio - cotizacion;
      if (d > 0) {
        diffLabel.textContent = 'Pagas por sobre tu 7%';
        diff.textContent = `${clp.format(d)}/mes`;
        diffBox.className = 'rounded-xl p-4 bg-amber-50';
        diff.className = 'mt-1 text-2xl font-bold text-amber-700';
        notes.push(`Al año son cerca de ${clp.format(d * 12)} adicionales. Vale la pena revisar si ese plan es el que te conviene.`);
      } else {
        diffLabel.textContent = 'Posibles excedentes';
        diff.textContent = `${clp.format(-d)}/mes`;
        diffBox.className = 'rounded-xl p-4 bg-emerald-50';
        diff.className = 'mt-1 text-2xl font-bold text-emerald-700';
        notes.push('Tu 7% cubre el plan. La diferencia podría acumularse como excedentes que puedes usar en copagos.');
      }
    }
    note.textContent = notes.join(' ');
  }

  renta.addEventListener('input', update);
  plan.addEventListener('input', update);
  form.addEventListener('submit', (e) => e.preventDefault());
}
