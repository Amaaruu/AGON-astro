import { chequeo, resultados } from '../data/chequeo';

export interface ChequeoResult {
  prevision: string;
  score: number;
  total: number;
  topics: string[];
  summary: string;
}

const previsionLabels: Record<string, string> = { fonasa: 'Fonasa', isapre: 'Isapre', nose: 'No lo tiene claro' };

const arrowIcon =
  '<svg class="h-5 w-5 flex-none text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M7.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L11.6 10 7.3 5.7a1 1 0 0 1 0-1.4Z" clip-rule="evenodd"/></svg>';

const bulbIcon =
  '<svg class="mt-0.5 h-5 w-5 flex-none text-amber-500" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z"/></svg>';

export function initChequeo(root: HTMLElement) {
  const answers = new Map<string, string>();
  let index = 0;

  // Las preguntas visibles dependen de la previsión elegida
  const visible = () => chequeo.filter((q) => !q.onlyFor || q.onlyFor === answers.get('prevision'));

  function focusHeading() {
    root.querySelector<HTMLElement>('[data-heading]')?.focus({ preventScroll: true });
  }

  function renderQuestion() {
    const questions = visible();
    const q = questions[index];
    const progress = Math.round((index / questions.length) * 100);
    const current = answers.get(q.id);

    root.innerHTML = `
      <div class="flex items-center justify-between text-xs font-semibold text-slate-400">
        <span>Pregunta ${index + 1} de ${questions.length}</span>
        ${index > 0 ? '<button type="button" data-back class="rounded-md px-2 py-1 text-brand-700 hover:bg-brand-50">← Anterior</button>' : ''}
      </div>
      <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div class="h-full rounded-full bg-brand-600 transition-all duration-500" style="width:${progress}%"></div>
      </div>
      <h3 data-heading tabindex="-1" class="mt-6 text-xl outline-none sm:text-2xl">${q.question}</h3>
      <div class="mt-6 grid gap-3">
        ${q.options
          .map(
            (o) => `
          <button type="button" data-value="${o.value}"
            class="group flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left font-medium transition hover:border-brand-400 hover:bg-brand-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-100 ${
              current === o.value ? 'border-brand-500 bg-brand-50 text-brand-900' : 'border-slate-200 bg-white text-slate-700'
            }">
            <span>${o.label}</span>${arrowIcon}
          </button>`,
          )
          .join('')}
      </div>`;

    root.querySelectorAll<HTMLButtonElement>('[data-value]').forEach((btn) =>
      btn.addEventListener('click', () => {
        answers.set(q.id, btn.dataset.value!);
        index++;
        if (index >= visible().length) renderResult();
        else renderQuestion();
      }),
    );
    root.querySelector('[data-back]')?.addEventListener('click', () => {
      index--;
      renderQuestion();
    });
    focusHeading();
  }

  function computeResult(): ChequeoResult {
    const scored = visible().filter((q) => q.insight);
    const pending = scored.filter((q) => !q.options.find((o) => o.value === answers.get(q.id))?.ok);
    const prevision = answers.get('prevision') ?? 'nose';
    const score = scored.length - pending.length;
    const topics = pending.map((q) => q.topic ?? q.id);
    const summary = `Chequeo ${score}/${scored.length} · ${previsionLabels[prevision]}${
      topics.length ? ` · Por revisar: ${topics.join(', ')}` : ''
    }`;
    return { prevision, score, total: scored.length, topics, summary };
  }

  function renderResult() {
    const result = computeResult();
    const ratio = result.total ? result.score / result.total : 1;
    const tier = resultados.find((r) => ratio >= r.min)!;
    const pending = visible().filter(
      (q) => q.insight && !q.options.find((o) => o.value === answers.get(q.id))?.ok,
    );

    root.innerHTML = `
      <p class="eyebrow">Tu resultado</p>
      <h3 data-heading tabindex="-1" class="mt-2 text-2xl outline-none">${tier.title}</h3>
      <p class="mt-2 text-slate-600">${tier.text}</p>

      <div class="mt-5 rounded-xl bg-slate-50 p-4">
        <div class="flex items-baseline justify-between text-sm">
          <span class="font-medium text-slate-600">Puntos clave que ya conoces</span>
          <span class="text-lg font-bold text-brand-800">${result.score} de ${result.total}</span>
        </div>
        <div class="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
          <div class="h-full rounded-full bg-gradient-to-r from-brand-600 to-accent-400" style="width:${Math.round(ratio * 100)}%"></div>
        </div>
      </div>

      ${
        pending.length
          ? `<h4 class="mt-6 font-semibold text-brand-950">Lo que te conviene saber</h4>
             <ul class="mt-3 space-y-3">
               ${pending
                 .map(
                   (q) => `<li class="flex gap-3 rounded-xl border border-slate-200 p-4">${bulbIcon}
                     <div><p class="font-semibold text-slate-800">${q.insight!.title}</p>
                     <p class="mt-1 text-sm text-slate-500">${q.insight!.text}</p></div></li>`,
                 )
                 .join('')}
             </ul>`
          : ''
      }

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" data-contact class="btn-primary flex-1">Revisar mi caso con un asesor</button>
        <button type="button" data-restart class="btn-secondary">Volver a empezar</button>
      </div>
      <p class="mt-4 text-xs text-slate-400">Chequeo orientativo. No evalúa tu contrato ni reemplaza una asesoría personalizada.</p>`;

    root.querySelector('[data-contact]')?.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent<ChequeoResult>('agon:chequeo', { detail: result }));
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
    });
    root.querySelector('[data-restart]')?.addEventListener('click', () => {
      answers.clear();
      index = 0;
      renderQuestion();
    });
    focusHeading();
  }

  renderQuestion();
}
