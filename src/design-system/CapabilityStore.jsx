import { sitePath } from "../site-path.js";
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowUpRight, BookOpen, ChartNoAxesCombined, ChevronLeft, ChevronRight,
  ClipboardCheck, FileText, FlaskConical, Handshake, ListChecks, Search, X,
} from 'lucide-react';
import { CapabilityFilters, useCapabilityFilters } from './CapabilityFilters.jsx';
import { HighlightedTitle } from './Typography.jsx';
import { Pagination } from './Pagination.jsx';
import { PageActions } from './SecondaryPageShell.jsx';
import { AgentCard, SkillCard, EmptyState, IconButton, SearchEmptyIllustration } from '../design-preview/components.jsx';
import { BUSINESS_SKILLS, BUSINESS_AGENTS, STORE_FEATURES, capabilityPath } from '../content/catalog.js';
import { useRouter } from '../router.jsx';
import { EVALUATION_PATH, REVIEW_CAPABILITIES } from '../content/review-capabilities.js';
import { COMMUNITY_SKILL_EXAMPLES } from '../content/community-skill-examples.js';
import './catalog.css';

const TASKS = [
  { name: '探索研究方向', description: '从问题与文献出发，找到研究起点', icon: FlaskConical, tone: 'blue', category: '科研选题与方案设计' },
  { name: '整理文献证据', description: '组织检索、筛选与系统评价', icon: BookOpen, tone: 'green', category: '系统综述与Meta分析' },
  { name: '分析数据与建模', description: '连接数据准备、建模和结果核对', icon: ChartNoAxesCombined, tone: 'violet', category: '科研数据分析与统计建模' },
  { name: '完成论文与申报', description: '把研究资料转化为完整成果', icon: FileText, tone: 'orange', category: '论文写作与投稿' },
];
const FEATURE_ICONS = { skill: ClipboardCheck, agent: ListChecks };
const STORE_ROWS_PER_PAGE = 6;
const STORE_SKILLS = BUSINESS_SKILLS.flatMap((item, index) => {
  const example = index < 6 && index % 2 === 1 ? COMMUNITY_SKILL_EXAMPLES[(index - 1) / 2] : null;
  return example ? [item, example] : [item];
});

function StoreFeatures({ kind, type, previewId, onOpenPreview, onUnavailable }) {
  const track = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const FeatureIcon = FEATURE_ICONS[kind];

  useEffect(() => {
    const container = track.current;
    const update = () => setEdges({
      start: container.scrollLeft < 2,
      end: container.scrollWidth - container.clientWidth - container.scrollLeft < 2,
    });
    update();
    const resize = new ResizeObserver(update);
    resize.observe(container);
    container.addEventListener('scroll', update, { passive: true });
    return () => {
      resize.disconnect();
      container.removeEventListener('scroll', update);
    };
  }, []);

  function move(direction) {
    const container = track.current;
    const card = container.firstElementChild;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(container).columnGap);
    container.scrollBy({
      left: direction * step,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  return <div className="ds-feature-carousel">
    <div className="ds-feature-track" ref={track} role="region" aria-label={`${type} 精选`}>
      {STORE_FEATURES[kind].map(feature => <button type="button" key={feature.id}
        className="ds-feature" data-tone={feature.tone}
        onClick={feature.id === previewId ? onOpenPreview : onUnavailable}>
        <span className="ds-feature-art" aria-hidden="true">
          {feature.image ? <img src={sitePath(`/store-art/${feature.image}.webp`)} alt=""/> : <FeatureIcon size={54} strokeWidth={1.15}/>}
        </span>
        <span className="ds-feature-copy"><small>{feature.kicker}</small><strong>{feature.title}</strong><span>{feature.description}</span></span>
        {feature.id === previewId ? <ArrowUpRight className="ds-feature-open" size={16} aria-hidden="true"/>
          : <span className="ds-feature-open ds-feature-unavailable">暂无接入</span>}
      </button>)}
    </div>
    <IconButton className="ds-feature-prev" label="上一张精选" disabled={edges.start} onClick={() => move(-1)}><ChevronLeft size={17}/></IconButton>
    <IconButton className="ds-feature-next" label="下一张精选" disabled={edges.end} onClick={() => move(1)}><ChevronRight size={17}/></IconButton>
  </div>;
}

function ChannelAssessmentCard({ kind, preview }) {
  const id = useId();
  const isSkill = kind === 'skill';
  const heading = isSkill ? '科研场景真实能力评测标准' : 'Agent科研真实任务结果交付评测标准';
  const description = isSkill
    ? '面向真实科研场景，核对结果准确性、信息完整性与证据可追溯性。'
    : '从任务目标到最终交付，核对任务有效性、流程完整性与证据可靠性。';
  const query = new URLSearchParams({ mode: kind });
  if (preview) query.set('preview', preview);
  return <a className="ds-channel-assessment" data-kind={kind}
    href={sitePath(EVALUATION_PATH) + '?' + query} target="_blank" rel="noopener noreferrer"
    aria-labelledby={id + '-title'} aria-describedby={id + '-description ' + id + '-target'}>
    <span className="sr-only" id={id + '-target'}>在新标签页打开</span>
    <span className="ds-channel-assessment-copy">
      <strong id={id + '-title'}>{heading}</strong>
      <span id={id + '-description'}>{description}</span>
    </span>
    <span className="ds-channel-assessment-art" aria-hidden="true">
      {isSkill ?
        <svg viewBox="0 0 276 128" fill="none" focusable="false">
          <g className="assessment-guide">
            <circle cx="150" cy="64" r="60" strokeDasharray="1 5"/>
            <path d="M150 2v124M86 64h128M108 122h84M60 45h25m130 38h26"/>
            <path d="M150 14 198 49 180 105h-60l-18-56 48-35Zm0 13 35 26-13 42h-44l-13-42 35-26Zm0 13 23 17-9 27h-28l-9-27 23-17Zm0 12 12 8-5 15h-14l-5-15 12-8ZM150 64l48-15m-48 15 30 41m-30-41-30 41m30-41-48-15"/>
            <path strokeDasharray="2 4" d="M59 81h43m89-58h44v14m-36 64h36"/>
            <path d="M51 78v6m-3-3h6m192-46v7m-3.5-3.5h7M224 111h8m-4-4v8"/>
          </g>
          <path className="assessment-data" d="m150 22 42 29-17 46-48 1-17-47 40-29Z"/>
          <path className="assessment-flow assessment-overlay" d="m150 38 27 19-8 31-35-2-9-28 25-20Z"/>
          <g className="assessment-points">
            <circle cx="150" cy="22" r="2.9"/><circle cx="192" cy="51" r="2.9"/><circle cx="175" cy="97" r="2.9"/>
            <circle cx="127" cy="98" r="2.9"/><circle cx="110" cy="51" r="2.9"/>
          </g>
        </svg> :
        <svg viewBox="0 0 276 128" fill="none" focusable="false">
          <g className="assessment-guide">
            <path d="M30 64h216M64 12v104m74-104v104m74-104v104M42 22h192M42 106h192"/>
            <path strokeDasharray="2 4" d="M64 45V23h74v22m0 38v23h74V83M27 48h24m178 34h23"/>
            <path d="M20 45v6m-3-3h6m237 31v6m-3-3h6"/>
            <rect x="114" y="41" width="48" height="46" rx="11"/>
            <rect x="188" y="41" width="48" height="46" rx="11"/>
          </g>
          <path className="assessment-flow" d="M84 64h34m-12-3 3 3-3 3m52-3h34m-12-3 3 3-3 3"/>
          <rect className="assessment-node" x="44" y="45" width="40" height="38" rx="9"/>
          <rect className="assessment-node" x="118" y="45" width="40" height="38" rx="9"/>
          <rect className="assessment-node assessment-node-final" x="192" y="45" width="40" height="38" rx="9"/>
          <path className="assessment-flow" d="M58 56h9l4 4v12H58V56Zm9 0v4h4m-10 4h7m-7 4h7m64-9h12m-12 5h12m-12 5h12m63-5 4 4 7-8"/>
          <g className="assessment-points">
            <circle cx="64" cy="22" r="2.8"/><circle cx="138" cy="22" r="2.8"/>
            <circle cx="138" cy="106" r="2.8"/><circle cx="212" cy="106" r="2.8"/>
          </g>
        </svg>}
    </span>
  </a>;
}

export function CapabilityStore({ kind, onNavigate, onRecommend, onToast }) {
  const router = useRouter();
  const isSkill = kind === 'skill';
  const type = isSkill ? 'Skill' : 'Agent';
  const reviewExample = REVIEW_CAPABILITIES.find(item => item.kind === kind);
  const items = [reviewExample, ...(isSkill ? STORE_SKILLS : BUSINESS_AGENTS)];
  const openPreview = () => onNavigate(capabilityPath(reviewExample));
  const notifyUnavailable = () => onToast('暂无接入');
  const description = isSkill ? '发现、评测和使用专业科研 AI 技能' : '探索专业科研工作流，让复杂任务更高效地完成';
  const { query, setQuery, category, setCategory, source, setSource, list: filtered, reset } = useCapabilityFilters(items, `kgcure-store-${kind}`);
  const [page, setPage] = useState(() => {
    try { return Math.max(1, Number(sessionStorage.getItem(`kgcure-store-page-${kind}`)) || 1); }
    catch { return 1; }
  });
  const grid = useRef(null);
  const hub = useRef(null);
  const returnToHub = useRef(false);
  const [columns, setColumns] = useState(1);
  const categories = ['全部', ...new Set(items.map(item => item.group || item.category))];
  const demoCount = filtered.filter(item => item.demo).length;
  const catalogCount = filtered.length - demoCount;
  const pageSize = STORE_ROWS_PER_PAGE * columns;
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pageCount);
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize);
  const Card = isSkill ? SkillCard : AgentCard;

  useLayoutEffect(() => {
    const layout = grid.current;
    const updateColumns = () => {
      const tracks = getComputedStyle(layout).gridTemplateColumns;
      setColumns(tracks.trim().split(/\s+/).length);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [kind]);

  useLayoutEffect(() => {
    if (!returnToHub.current) return;
    returnToHub.current = false;
    hub.current.querySelector('h2').focus({ preventScroll: true });
    hub.current.scrollIntoView({ block: 'start' });
  }, [current]);

  useEffect(() => {
    sessionStorage.setItem(`kgcure-store-page-${kind}`, String(current));
  }, [current, kind]);
  useEffect(() => {
    if (router.get('ability') === reviewExample.id) openPreview();
  }, [router.search]);

  function updateFilter(setFilter, value) {
    setFilter(value);
    setPage(1);
  }

  function changePage(nextPage) {
    if (nextPage === current) return;
    returnToHub.current = true;
    setPage(nextPage);
  }

  return <div className="sp-sheet ds-capability-store"><div className="sp-gallery-section">
    <PageActions>
      <a className="sp-button sp-button-secondary ds-contribute-link"
        href={sitePath('/workspace/contribute' + (isSkill ? '' : '?kind=agent'))} target="_blank" rel="noopener noreferrer">
        <Handshake size={16} aria-hidden="true"/>社区贡献
      </a>
    </PageActions>
    <div className="sp-section-heading ds-store-heading">
      <div><h1>{!isSkill && <img className="ds-store-robot" src={sitePath("/design-preview/agent-robot.webp")} alt=""/>}<HighlightedTitle>{`科研 ${type}`}</HighlightedTitle></h1><p>{description}</p></div>
      <label className="sp-search-field sp-capability-query ds-store-search"><Search size={16}/><input aria-label={`搜索科研 ${type}`} placeholder={`搜索 ${isSkill ? 'Skill、科研方法' : 'Agent、科研任务'}`} value={query} onChange={event => updateFilter(setQuery, event.target.value)}/>{query && <IconButton label="清空搜索" onClick={() => updateFilter(setQuery, '')}><X size={14}/></IconButton>}</label>
    </div>
    <StoreFeatures kind={kind} type={type} previewId={reviewExample.id}
      onOpenPreview={openPreview} onUnavailable={notifyUnavailable}/>
    <ChannelAssessmentCard kind={kind} preview={router.get('preview')}/>
    {!isSkill && <section className="ds-task-directions">
      <div className="ds-section-title"><h2>按科研任务查找</h2><span>从研究目标出发，找到适合的 Agent</span></div>
      <div>{TASKS.map(task => <button type="button" key={task.name} onClick={() => onRecommend?.(task)}><task.icon className="ds-task-direction-icon" data-tone={task.tone} size={22} strokeWidth={1.8} aria-hidden="true"/><strong>{task.name}</strong><small>{task.description}</small><ArrowUpRight size={16}/></button>)}</div>
    </section>}
    <section ref={hub} className="ds-capability-hub" aria-labelledby={`ds-${kind}-hub`}>
      <CapabilityFilters categories={categories} category={category} onCategory={value => updateFilter(setCategory, value)}
        source={source} onSource={value => updateFilter(setSource, value)} showSources={isSkill}
        heading={<h2 id={`ds-${kind}-hub`} tabIndex={-1}>{type} Hub</h2>}
        count={<p className="ds-result-caption" aria-live="polite">{catalogCount > 0 || demoCount === 0 ? <>{query.trim() ? '找到' : '共'} <strong>{catalogCount}</strong> 项 {type}{demoCount > 0 && ' · '}</> : null}{demoCount > 0 && <span>{demoCount} 项演示</span>}</p>}/>
      <div ref={grid} className={isSkill ? 'sp-skill-grid' : 'sp-agent-grid'}>
        {visible.map(item => <Card key={item.id} item={item} context="channel" unavailable={item.id !== reviewExample.id}
          onDetail={openPreview} onUnavailable={notifyUnavailable}/>)}
      </div>
      {!filtered.length &&
        <EmptyState icon={SearchEmptyIllustration}
          description={source === '独立测评' ? '可切换分类查看。' : '试试其他关键词或分类。'}
          onReset={() => { reset(); setPage(1); }}>
          {source === '独立测评' ? '暂无评测记录' : source === '开源社区' ? '没有匹配的社区贡献' : '没有匹配的科研能力'}
        </EmptyState>}
      <Pagination page={current} total={pageCount} onChange={changePage} label="能力列表分页"/>
    </section>
  </div></div>;
}
