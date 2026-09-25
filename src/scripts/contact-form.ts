import type { ChequeoResult } from './chequeo';

export interface ContactLead {
  nombre: string;
  telefono: string;
  email: string;
  motivo: string;
  prevision: string;
  edad?: number;
  cargas?: string;
  renta?: string;
  region?: string;
  mensaje?: string;
  /** Resumen del chequeo, si la persona lo completó */
  chequeo?: string;
}

const validators: Record<string, (v: string) => boolean> = {
  nombre: (v) => v.trim().length >= 3,
  telefono: (v) => /^(\+?56)?\s?9\d{8}$/.test(v.replace(/[\s-]/g, '')),
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  motivo: (v) => v !== '',
  prevision: (v) => v !== '',
  edad: (v) => v === '' || (Number(v) >= 18 && Number(v) <= 99),
};

function setError(form: HTMLFormElement, name: string, show: boolean) {
  form.querySelector(`[data-error-for="${name}"]`)?.classList.toggle('hidden', !show);
  const input = form.elements.namedItem(name) as HTMLElement | null;
  input?.setAttribute('aria-invalid', String(show));
  input?.classList.toggle('!border-red-400', show);
}

/**
 * Envía el lead. Por ahora solo lo guarda en sessionStorage y redirige.
 * TODO: conectar con un backend (Astro Action + adaptador, email, CRM o Google Sheets).
 */
async function submitLead(lead: ContactLead): Promise<void> {
  console.info('[AGON] Nuevo lead', lead);
  sessionStorage.setItem('agon:lead', JSON.stringify({ nombre: lead.nombre }));
  await new Promise((r) => setTimeout(r, 600));
}

const optional = (v: FormDataEntryValue | null) => String(v ?? '').trim() || undefined;

export function initContactForm(id: string) {
  const form = document.getElementById(id) as HTMLFormElement | null;
  if (!form) return;

  // Recibe el resultado del chequeo y precompleta lo que se pueda
  window.addEventListener('agon:chequeo', (e) => {
    const result = (e as CustomEvent<ChequeoResult>).detail;
    (form.elements.namedItem('chequeo') as HTMLInputElement).value = result.summary;
    form.querySelector('[data-chequeo-badge]')?.classList.replace('hidden', 'flex');

    const motivo = form.elements.namedItem('motivo') as HTMLSelectElement;
    if (!motivo.value) motivo.value = result.prevision === 'fonasa' ? 'fonasa-isapre' : 'revisar-plan';
    const prevision = form.elements.namedItem('prevision') as HTMLSelectElement;
    if (!prevision.value && result.prevision === 'fonasa') prevision.value = 'fonasa';
  });

  // Limpia el error al corregir un campo
  form.addEventListener('input', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.name) setError(form, t.name, false);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    let valid = true;

    for (const [name, check] of Object.entries(validators)) {
      const ok = check(String(data.get(name) ?? ''));
      setError(form, name, !ok);
      if (!ok) valid = false;
    }
    const acepta = data.get('acepta') === 'on';
    setError(form, 'acepta', !acepta);
    if (!acepta) valid = false;

    if (!valid) {
      const invalid = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      invalid?.closest('details')?.setAttribute('open', '');
      invalid?.focus();
      return;
    }

    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    const label = btn.querySelector('[data-label]')!;
    btn.disabled = true;
    label.textContent = 'Enviando…';

    try {
      const edad = optional(data.get('edad'));
      await submitLead({
        nombre: String(data.get('nombre')).trim(),
        telefono: String(data.get('telefono')).trim(),
        email: String(data.get('email')).trim(),
        motivo: String(data.get('motivo')),
        prevision: String(data.get('prevision')),
        edad: edad ? Number(edad) : undefined,
        cargas: optional(data.get('cargas')),
        renta: optional(data.get('renta')),
        region: optional(data.get('region')),
        mensaje: optional(data.get('mensaje')),
        chequeo: optional(data.get('chequeo')),
      });
      window.location.href = '/gracias';
    } catch {
      btn.disabled = false;
      label.textContent = 'Quiero que me contacten';
      alert('No pudimos enviar tus datos. Intenta nuevamente o escríbenos por WhatsApp.');
    }
  });
}
