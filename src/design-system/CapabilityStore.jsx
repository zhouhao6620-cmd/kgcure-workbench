import { sitePath } from "../site-path.js";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BookOpen, ChartNoAxesCombined, ChevronLeft, ChevronRight,
  ClipboardCheck, FileText, FlaskConical, Handshake, ListChecks, Search, ShieldCheck, X,
} from 'lucide-react';
import { CapabilityFilters, useCapabilityFilters } from './CapabilityFilters.jsx';
import { HighlightedTitle } from './Typography.jsx';
import { Pagination } from './Pagination.jsx';
import { PageActions } from './SecondaryPageShell.jsx';
import { AgentCard, SkillCard, Modal, Button, EmptyState, IconButton, SearchEmptyIllustration } from '../design-preview/components.jsx';
import { BUSINESS_SKILLS, BUSINESS_AGENTS, STORE_FEATURES, capabilityById, capabilityPath } from '../content/catalog.js';
import { useRouter } from '../router.jsx';
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

function StoreFeatures({ kind, type, onNavigate }) {
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
        className="ds-feature" data-tone={feature.tone} onClick={() => onNavigate(capabilityPath(capabilityById(feature.id)))}>
        <span className="ds-feature-art" aria-hidden="true">
          {feature.image ? <img src={sitePath(`/store-art/${feature.image}.webp`)} alt=""/> : <FeatureIcon size={54} strokeWidth={1.15}/>}
        </span>
        <span className="ds-feature-copy"><small>{feature.kicker}</small><strong>{feature.title}</strong><span>{feature.description}</span></span>
        <ArrowUpRight className="ds-feature-open" size={16} aria-hidden="true"/>
      </button>)}
    </div>
    <IconButton className="ds-feature-prev" label="上一张精选" disabled={edges.start} onClick={() => move(-1)}><ChevronLeft size={17}/></IconButton>
    <IconButton className="ds-feature-next" label="下一张精选" disabled={edges.end} onClick={() => move(1)}><ChevronRight size={17}/></IconButton>
  </div>;
}

export function CapabilityStore({ kind, onNavigate, onRecommend }) {
  const router = useRouter();
  const isSkill = kind === 'skill';
  const type = isSkill ? 'Skill' : 'Agent';
  const items = isSkill ? STORE_SKILLS : BUSINESS_AGENTS;
  const description = isSkill ? '发现、评测和使用专业科研 AI 技能' : '探索专业科研工作流，让复杂任务更高效地完成';
  const { query, setQuery, category, setCategory, source, setSource, list: filtered, reset } = useCapabilityFilters(items, `kgcure-store-${kind}`);
  const [page, setPage] = useState(() => {
    try { return Math.max(1, Number(sessionStorage.getItem(`kgcure-store-page-${kind}`)) || 1); }
    catch { return 1; }
  });
  const [review, setReview] = useState(false);
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
    const item = capabilityById(router.get('ability'));
    if (item) onNavigate(capabilityPath(item));
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
    <PageActions>{isSkill && <a className="sp-button sp-button-secondary ds-contribute-link" href={sitePath("/workspace/contribute")} target="_blank" rel="noreferrer"><Handshake size={16} aria-hidden="true"/>社区贡献</a>}</PageActions>
    <div className="sp-section-heading ds-store-heading">
      <div><h1>{!isSkill && <img className="ds-store-robot" src={sitePath("/design-preview/agent-robot.webp")} alt=""/>}<HighlightedTitle>{`科研 ${type}`}</HighlightedTitle></h1><p>{description}</p></div>
      <label className="sp-search-field ds-store-search"><Search size={16}/><input aria-label={`搜索科研 ${type}`} placeholder={`搜索 ${isSkill ? 'Skill、科研方法' : 'Agent、科研任务'}`} value={query} onChange={event => updateFilter(setQuery, event.target.value)}/>{query && <IconButton label="清空搜索" onClick={() => updateFilter(setQuery, '')}><X size={14}/></IconButton>}</label>
    </div>
    <StoreFeatures kind={kind} type={type} onNavigate={onNavigate}/>
    {isSkill ? <button type="button" className="ds-review-strip" onClick={() => setReview(true)}>
      <span className="ds-review-symbol"><ShieldCheck size={24}/></span>
      <span className="ds-review-copy"><strong>数愈科研专业评测</strong><small>方法是否适用？结果能否复核？交付是否完整？</small></span>
      <svg width="84" height="58" viewBox="0 0 84 58" fill="none" aria-hidden="true">
        <g stroke="#bcb1dd"><path d="M42 2 69 21 59 53H25L15 21Z M42 12 59 24 53 44H31L25 24Z M42 22 49 27 46 35H38L35 27Z"/><path d="M42 30V2 M42 30 69 21 M42 30 59 53 M42 30 25 53 M42 30 15 21"/></g>
        <path d="M42 7 62 23 52 44 29 48 23 24Z" fill="#8570df33" stroke="#8066d0" strokeWidth="1.6"/>
      </svg><ArrowRight size={18} aria-hidden="true"/>
    </button> : <section className="ds-task-directions">
      <div className="ds-section-title"><h2>按科研任务查找</h2><span>从研究目标出发，找到适合的 Agent</span></div>
      <div>{TASKS.map(task => <button type="button" key={task.name} onClick={() => onRecommend?.(task)}><task.icon className="ds-task-direction-icon" data-tone={task.tone} size={22} strokeWidth={1.8} aria-hidden="true"/><strong>{task.name}</strong><small>{task.description}</small><ArrowUpRight size={16}/></button>)}</div>
    </section>}
    <section ref={hub} className="ds-capability-hub" aria-labelledby={`ds-${kind}-hub`}>
      <CapabilityFilters categories={categories} category={category} onCategory={value => updateFilter(setCategory, value)}
        source={source} onSource={value => updateFilter(setSource, value)} showSources={isSkill}
        heading={<h2 id={`ds-${kind}-hub`} tabIndex={-1}>{type} Hub</h2>}
        count={<p className="ds-result-caption" aria-live="polite">{catalogCount > 0 || demoCount === 0 ? <>{query.trim() ? '找到' : '共'} <strong>{catalogCount}</strong> 项 {type}{demoCount > 0 && ' · '}</> : null}{demoCount > 0 && <span>{demoCount} 项演示</span>}</p>}/>
      <div ref={grid} className={isSkill ? 'sp-skill-grid' : 'sp-agent-grid'}>
        {visible.map(item => <Card key={item.id} item={item} onDetail={() => onNavigate(capabilityPath(item))}/>)}
      </div>
      {!filtered.length &&
        <EmptyState icon={SearchEmptyIllustration}
          description={source === '独立测评' ? '可切换分类查看。' : '试试其他关键词或分类。'}
          onReset={() => { reset(); setPage(1); }}>
          {source === '独立测评' ? '暂无评测记录' : source === '开源社区' ? '没有匹配的社区贡献' : '没有匹配的科研能力'}
        </EmptyState>}
      <Pagination page={current} total={pageCount} onChange={changePage} label="能力列表分页"/>
    </section>
  </div>{review && <Modal title="数愈科研专业评测" onClose={() => setReview(false)}><div className="ds-prose"><p>科研能力的收录、专业评测与线上可用是三个独立状态。</p><h3>评测关注的问题</h3><ul><li>研究方法是否适用于所给任务和材料？</li><li>结果、证据和关键步骤能否复核？</li><li>交付是否完整，适用条件和限制是否清楚？</li></ul><p>当前目录暂无可核验的正式评测报告。</p><Button onClick={() => { setReview(false); updateFilter(setSource, '独立测评'); }}>查看已评测能力</Button></div></Modal>}</div>;
}
