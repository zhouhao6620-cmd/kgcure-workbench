import { assessmentDimensions } from '../content/skill-assessment-examples.js';

export function catalogDetailDocument(html, item, canLaunch) {
  const page = new DOMParser().parseFromString(html, 'text/html');
  const el = (tag, className, text) => {
    const element = page.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };
  const find = selector => page.querySelector(selector);
  const isSkill = item.kind === 'skill';
  const script = find('script[data-review-controls]');
  page.querySelectorAll('script').forEach(element => { if (element !== script) element.remove(); });

  find('.hero h1').textContent = item.name;
  find('.hero-lead').textContent = item.description;
  const kicker = find('.hero-kicker');
  if (!item.exclusive) kicker.querySelector('.detail-exclusive')?.remove();
  const tags = [...new Set([item.group, item.category].filter(Boolean))];
  find('.hero-tags').replaceChildren(...tags.map(tag => el('span', 'category-badge', tag)));
  find('.hero-byline').textContent = [item.author, item.updated && item.updated + ' 更新'].filter(Boolean).join(' · ');
  find('.demo-link')?.remove();
  if (!canLaunch) {
    page.querySelectorAll('.task-start span').forEach(label => { label.textContent = '查看会员权益'; });
  }

  const aside = find('.hero-aside');
  const assessment = item.assessment;
  if (isSkill) {
    const badge = aside.querySelector('.evaluation-certification');
    const title = el('h2', 'hero-panel-title', assessment ? '模拟评测' : '评测信息');
    const copy = el('p', 'core-intro', assessment ? assessment.summary : '');
    if (assessment) {
      const rating = aside.querySelector('.rating-large');
      rating.querySelector('strong').textContent = assessment.score.toFixed(1);
      aside.classList.remove('hero-rating-unmeasured');
      aside.replaceChildren(title, rating, copy);
    } else {
      aside.replaceChildren(title, ...(badge ? [badge] : []));
    }
    aside.setAttribute('aria-label', title.textContent);
  } else {
    const steps = item.steps || [];
    const list = el('ol', 'catalog-detail-steps');
    list.append(...steps.map(step => el('li', '', step)));
    aside.replaceChildren(el('h2', 'hero-panel-title', `执行流程 · ${steps.length} 步`), list);
  }

  const navigation = find('.anchor-nav');
  const main = find('.detail-main');
  navigation.replaceChildren();
  main.replaceChildren();
  const follow = find('.follow-actions');
  follow.classList.add('catalog-detail-follow');
  find('.detail-page').append(follow);
  find('.right-rail')?.remove();
  find('.detail-grid').style.gridTemplateColumns = 'minmax(0, 1fr)';
  const paragraph = text => el('p', 'core-intro catalog-detail-copy', text);
  function section(id, title, content) {
    if (!content.length) return;
    const link = el('a', '', title);
    link.href = '#' + id;
    navigation.append(link);
    const body = el('section', 'content-section');
    body.id = id;
    const header = el('header', 'section-heading');
    const heading = el('div', 'section-heading-top');
    heading.append(el('h2', '', title));
    header.append(heading);
    body.append(header, ...content);
    main.append(body);
  }

  const intro = item.intro?.replace(/^业务场景介绍\s*|概括：/g, '') || item.description;
  section('catalog-overview', '能力介绍', [paragraph(intro)]);
  if (!isSkill && item.flow) {
    section('catalog-workflow', '执行流程', [paragraph(item.flow.replace(/^关键流程\s*/, ''))]);
  }
  const preparation = (item.fields || []).map(field => {
    const row = el('div', 'catalog-detail-input');
    row.append(el('h3', '', field.label + (field.required ? ' · 必填' : '')), paragraph(field.description));
    return row;
  });
  if (item.materials) preparation.unshift(paragraph(item.materials));
  section('catalog-input', '准备材料', preparation);
  if (item.deliverables) {
    section('catalog-output', '预期交付', [paragraph(item.deliverables.replace(/^关键产出\s*/, ''))]);
  }
  if (assessment) {
    const metrics = el('dl', 'catalog-detail-metrics');
    assessmentDimensions.forEach((dimension, index) => {
      metrics.append(el('dt', '', dimension), el('dd', '', String(assessment.scores[index])));
    });
    section('catalog-assessment', '模拟评测', [metrics, paragraph(assessment.summary)]);
  }
  const cases = (item.cases || []).map(entry => el('button', 'secondary-btn actual-case-card ds-card-interaction', entry.name));
  section('catalog-cases', '应用案例', cases);
  page.title = item.name;
  return '<!doctype html>\n' + page.documentElement.outerHTML;
}
