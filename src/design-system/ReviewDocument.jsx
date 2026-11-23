import { useEffect, useRef, useState } from 'react';
import { PageNavigation } from './SecondaryPageShell.jsx';
import { agentGlyph, evaluationAlertGlyph, evaluationShieldGlyph, exclusiveGlyph, skillGlyph } from './capability-glyphs.js';
import { catalogDetailDocument } from './catalog-detail-document.js';
import { certifiedEvaluationLabel, hasEvaluationCertification, missingEvaluationLabel } from '../content/review-capabilities.js';
import certificationTheme from './evaluation-certification.css?raw';
import detailTheme from './review-pages/detail-theme.css?raw';
import evaluationTheme from './review-pages/evaluation-theme.css?raw';
import tokens from './tokens.css?raw';
import './review-document.css';

const documents = {
  skill: () => import('./review-pages/skill.html?raw'),
  agent: () => import('./review-pages/agent.html?raw'),
  evaluation: () => import('./review-pages/evaluation.html?raw'),
};

function symbol(id, { viewBox, strokeWidth, shapes }) {
  const children = shapes.map(([tag, attributes]) =>
    '<' + tag + Object.entries(attributes).map(([name, value]) => ' ' + name + '="' + value + '"').join('') + '/>'
  ).join('');
  return `<symbol id="${id}" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${children}</symbol>`;
}

const symbols = symbol('ds-agent', agentGlyph) + symbol('ds-skill', skillGlyph) + symbol('ds-exclusive', exclusiveGlyph)
  + symbol('ds-evaluation-shield', evaluationShieldGlyph) + symbol('ds-evaluation-alert', evaluationAlertGlyph);

function withSkillEvaluationCertification(html, certified) {
  const tone = certified ? 'skill' : 'missing';
  const icon = certified ? 'shield' : 'alert';
  const label = certified ? certifiedEvaluationLabel : missingEvaluationLabel;
  const status = `<span class="evaluation-certification" data-certification="${tone}"><svg aria-hidden="true"><use href="#ds-evaluation-${icon}"></use></svg><span>${label}</span></span>`;
  if (certified) return html.replace('<!-- evaluation-certification -->', status);

  const page = new DOMParser().parseFromString(html, 'text/html');
  const panel = page.querySelector('.hero-rating');
  panel.classList.add('hero-rating-unmeasured');
  panel.setAttribute('aria-label', '评测信息');
  panel.querySelector('.rating-large strong').textContent = '暂未实测';
  panel.querySelector('.rating-large > span').remove();

  const stars = panel.querySelector('.rating-stars');
  stars.querySelector('.stars-filled').remove();
  stars.removeAttribute('role');
  stars.removeAttribute('aria-label');
  stars.setAttribute('aria-hidden', 'true');

  panel.querySelectorAll('.mini-metric').forEach(metric => {
    metric.querySelector('.mini-labels strong').textContent = '—';
    const track = page.createElement('div');
    track.className = 'mini-track';
    track.setAttribute('aria-hidden', 'true');
    metric.querySelector('.mini-track').replaceWith(track);
  });

  const note = page.createElement('div');
  note.className = 'hero-certification-note';
  note.innerHTML = status;
  panel.querySelector('.hero-certification-link').replaceWith(note);
  page.querySelector('.anchor-nav a[href="#skill-evaluation"]')?.remove();
  page.querySelector('#skill-evaluation')?.remove();
  page.querySelectorAll('.detail-page .section-no').forEach((number, index) => {
    number.textContent = String(index + 1).padStart(2, '0');
  });
  return '<!doctype html>\n' + page.documentElement.outerHTML;
}

export function ReviewDocument({ kind, title, mode = 'skill', item, unrated = false, canLaunch = true, onRun, onDemo, onCase, favorite = false, onFavorite }) {
  const certified = kind === 'skill' && !unrated && hasEvaluationCertification(item);
  const frame = useRef(null);
  const [navigation, setNavigation] = useState(null);
  const [document, setDocument] = useState({ html: '', failed: false });
  const initialSaved = useRef(favorite).current;

  function syncFavorite() {
    if (item) frame.current?.contentWindow?.postMessage({ type: 'kgcure-review-favorite', saved: favorite }, '*');
  }

  useEffect(syncFavorite, [favorite]);

  useEffect(() => {
    let current = true;
    documents[kind]().then(({ default: source }) => {
      if (!current) return;
      const theme = kind === 'evaluation' ? evaluationTheme : detailTheme;
      const certification = kind === 'skill' ? certificationTheme : '';
      const html = source
        .replace('<!-- workbench-theme -->', () => `<style>${tokens}\n${certification}\n${theme}</style>`)
        .replace('<!-- capability-symbols -->', () => symbols)
        .replace('data-initial-mode="skill"', mode === 'agent' ? 'data-initial-mode="agent"' : 'data-initial-mode="skill"')
        .replace(`<body data-page="${kind}">`, `<body data-page="${kind}" data-saved="${Boolean(initialSaved)}">`);
      const detail = kind === 'skill' ? withSkillEvaluationCertification(html, certified) : html;
      const content = item && !item.reviewCases ? catalogDetailDocument(detail, item, canLaunch) : detail;
      setDocument({ html: content, failed: false });
    }).catch(() => {
      if (current) setDocument({ html: '', failed: true });
    });
    return () => { current = false; };
  }, [kind, mode, certified, initialSaved, item, canLaunch]);

  useEffect(() => {
    if (!item) return;
    function handle(event) {
      if (event.origin !== 'null' || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== 'kgcure-review-page') return;
      const { action, value } = event.data;
      if (action === 'navigation' && Array.isArray(value?.labels)) setNavigation(value);
      if (action === 'run') onRun(item);
      if (action === 'demo') onDemo?.(item);
      const cases = item.reviewCases || item.cases;
      if (action === 'case' && Number.isInteger(value) && cases?.[value]) {
        onCase(item, cases[value]);
      }
      if (action === 'save' && typeof value === 'boolean') {
        if (!onFavorite(item.id, value)) syncFavorite();
      }
    }
    window.addEventListener('message', handle);
    return () => window.removeEventListener('message', handle);
  }, [item, onRun, onDemo, onCase, onFavorite, favorite]);

  if (document.failed) return <p className="ds-review-document-status" role="alert">页面加载失败，请刷新后重试。</p>;
  if (!document.html) return <p className="ds-review-document-status" role="status">正在加载页面…</p>;
  return <>{navigation?.docked && <PageNavigation><nav className="ds-review-tabs" aria-label="详情章节">{navigation.labels.map((label,index)=><button type="button" key={label} aria-current={navigation.active===index?'location':undefined} onClick={()=>frame.current.contentWindow.postMessage({type:'kgcure-review-jump',index},'*')}>{label}</button>)}</nav></PageNavigation>}<iframe ref={frame} className="ds-review-document" title={title} srcDoc={document.html} sandbox="allow-scripts" onLoad={syncFavorite}/></>;
}
