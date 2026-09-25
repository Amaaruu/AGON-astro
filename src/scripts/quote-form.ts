export interface QuoteLead {
  nombre: string;
  telefono: string;
  email: string;
  edad: number;
  prevision: string;
  cargas: string;
  renta: string;
  region: string;
}

const validators: Record<string, (v: string) => boolean> = {
  nombre: (v) => v.trim().length >= 3,
  telefono: (v) => /^(\+?56)?\s?9\d{8}$/.test(v.replace(/[\s-]/g, '')),
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  edad: (v) => Number(v) >= 18 && Number(v) <= 99,
  prevision: (v) => v !== '',
  renta: (v) => v !== '',
  region: (v) => v !== '',
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
async function submitLead(lead: QuoteLead): Promise<void> {
  console.info('[AGON] Nuevo lead', lead);
  sessionStorage.setItem('agon:lead', JSON.stringify({ nombre: lead.nombre }));
  await new Promise((r) => setTimeout(r, 600));
}

export function initQuoteForm(id: string) {
  const form = document.getElementById(id) as HTMLFormElement | null;
  if (!form) return;

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
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    const label = btn.querySelector('[data-label]')!;
    btn.disabled = true;
    label.textContent = 'Enviando…';

    try {
      await submitLead({
        nombre: String(data.get('nombre')).trim(),
        telefono: String(data.get('telefono')).trim(),
        email: String(data.get('email')).trim(),
        edad: Number(data.get('edad')),
        prevision: String(data.get('prevision')),
        cargas: String(data.get('cargas')),
        renta: String(data.get('renta')),
        region: String(data.get('region')),
      });
      window.location.href = '/gracias';
    } catch {
      btn.disabled = false;
      label.textContent = 'Quiero comparar planes';
      alert('No pudimos enviar tus datos. Intenta nuevamente o escríbenos por WhatsApp.');
    }
  });
}
