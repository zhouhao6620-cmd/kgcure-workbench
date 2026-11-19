import { PageActions } from './SecondaryPageShell.jsx';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Heart, FilePenLine, Workflow, Target, ListChecks, Link2, Repeat2, MousePointer2, Info, History } from 'lucide-react';
import { StarRating, AgentBadge, AgentCard, AgentExclusiveBadge, Button, SkillCard, SkillBadge, Tag } from '../design-preview/components.jsx';
import { CAPABILITIES, capabilityPath } from '../content/catalog.js';
import { canUseCapability, EXCLUSIVE_AGENT_REQUIREMENT } from '../content/membership.js';
import { assessmentDimensions } from '../content/skill-assessment-examples.js';
import { CaseCoverCard } from './CaseCoverCard.jsx';
import './workspace-details.css';
function Paragraphs({text}){return <div className="ds-source-copy">{text.split(/\n\s*\n/).filter(Boolean).map((p,i)=><p key={i}>{p}</p>)}</div>;}
function radarPoint(index, fraction) {
 const angle = index * 2 * Math.PI / assessmentDimensions.length - Math.PI / 2;
 return [112 + Math.cos(angle) * 42 * fraction, 65 + Math.sin(angle) * 42 * fraction];
}

function SkillAssessment({example}) {
 const points = (fractionFor) => assessmentDimensions.map((_, i) => radarPoint(i, fractionFor(i)).join(',')).join(' ');
 return <aside className="workSkillAssessment" aria-label="Skill 评分">
  <div className="workScoreCopy"><small>综合评分{example&&' · 演示'}</small><div className="workScoreValue">{example?example.score.toFixed(1):'待评测'}{example&&<small> / 5</small>}</div>
  <div className="workAssessmentScore"><StarRating score={example?.score}/>{example&&<span>{example.tier}</span>}</div></div>
  <svg width="224" height="130" viewBox="0 0 224 130" role="img" aria-label={example?assessmentDimensions.map((label,i)=>label+' '+example.scores[i]+' 分').join('，'):'评测雷达图，暂无维度评分'}>
   <g fill="none" stroke="currentColor">
    {[.25,.5,.75,1].map(fraction=><polygon key={fraction} points={points(()=>fraction)}/>)}
    {assessmentDimensions.map((label,i)=>{const [x,y]=radarPoint(i,1);return <line key={label} x1="112" y1="65" x2={x} y2={y}/>;})}
   </g>
   {example&&<polygon className="workRadarScores" points={points(i=>example.scores[i]/5)}/>}
   {assessmentDimensions.map((label,i)=>{const [x,y]=radarPoint(i,1.36);return <text key={label} x={x} y={y} dominantBaseline="middle" textAnchor={i===0?'middle':i<3?'start':'end'}>{label}</text>;})}
  </svg>

 </aside>;
}
const dimensions = [
 {icon: Target, standard: '核对事实、关键数值和术语。'},
 {icon: ListChecks, standard: '检查任务要求和预期交付是否齐备。'},
 {icon: Link2, standard: '检查关键结论或修改能否回查原始材料。'},
 {icon: Repeat2, standard: '检查相同条件下能否复核关键过程和结果。'},
 {icon: MousePointer2, standard: '检查输入要求和结果是否清晰、便于使用。'},
];

function AssessmentReport({assessment}) {
 return <>
  <aside className="workReviewMethod">
   <span className="workReviewMethodIcon"><Info size={18} aria-hidden="true"/></span>
   <div>
    <h2>KGcure评测维度说明</h2>
    <p>从{assessmentDimensions.join('、')}五个维度评估科研 Skill。</p>
    <p><strong>评分标准</strong>　各项满分 5 分，综合评分取五项平均值。</p>
   </div>
  </aside>
  <div className="workReviewSummary">
   <div className="workReviewOverall" aria-label={`综合评分 ${assessment.score.toFixed(1)} 分，满分 5 分`}>
    <strong>{assessment.score.toFixed(1)}</strong><span>/ 5</span>
   </div>
   <div className="workReviewVerdict">
    <div><Tag tone="blue">{assessment.tier}</Tag><span>演示评测</span></div>
    <p>{assessment.summary}</p>
   </div>
  </div>
  <ol className="workDimensionList" role="list" aria-label="分项评分">{assessmentDimensions.map((label, index) => {
   const {icon: Icon, standard} = dimensions[index];
   const score = assessment.scores[index];
   return <li key={label}>
    <div className="workDimensionScore">
     <div className="workDimensionHeading">
      <strong><Icon size={16} aria-hidden="true"/>{label}</strong>
      <b>{score.toFixed(1)} <small>/ 5</small></b>
     </div>
     <div className="workDimensionMeter" aria-hidden="true"><span style={{width: (score / 5 * 100) + '%'}}/></div>
    </div>
    <div className="workDimensionCopy"><small>{standard}</small><p>{assessment.findings[index]}</p></div>
   </li>;
  })}</ol>
 </>;
}

const featuredTopics = {
 '59405ee32866425ab3ed47b790e2579e': ['论文写作', '学术润色', '自然表达'],
 '35a3e188211447888f499c11d0b90345': ['科研选题', '文献缺口', '创新构想'],
};

const topicsByGroup = {
 研究设计: '方案设计', 论文写作: '学术表达', 基金申报: '申报材料',
 科研选题: '研究问题', 数据建模: '模型构建', 统计分析: '数据分析',
 文献检索: '证据获取', 科研绘图: '科学可视化', 文献研究: '证据梳理',
 科研汇报: '成果呈现',
};

function SkillVersionHistory({item}) {
 return <ol className="workVersionList" role="list" aria-label="版本记录">
  <li>
   <span className="workVersionMarker"><History size={16} aria-hidden="true"/></span>
   <div className="workVersionRecord">
    <header>
     <strong>{item.demo ? '演示版本' : '当前收录'}</strong>
     <Tag>{item.demo ? '演示' : '当前'}</Tag>
     {!item.demo&&<time dateTime={item.updated}>{item.updated}</time>}
    </header>
    <p>{item.demo ? '社区贡献演示，暂无历史版本记录。' : `${item.author}维护 · 目录暂仅收录当前版本。`}</p>
    {!item.demo&&<a href={'https://ai.kgcure.com'+item.sourcePath} target="_blank" rel="noreferrer" className="ds-text-link">查看线上原始详情<ArrowUpRight size={14}/></a>}
    {item.adapted&&<details className="ds-materials"><summary>查看原始说明</summary><Paragraphs text={item.sourceIntro}/><Paragraphs text={item.sourceDeliverables}/></details>}
   </div>
  </li>
 </ol>;
}

export function CapabilityDetail({item,tier,onNavigate,onToast,onRun}){
 const isSkill=item.kind==='skill'; const assessment=item.assessment; const [tab,setTab]=useState('intro');
 const canLaunch=canUseCapability(item,tier);
 const actionLabel=isSkill?'在对话中使用':canLaunch?'启动 Agent':'查看会员权益';
 const launch=()=>canLaunch?onRun(item):onNavigate('/workspace/membership-plans');
 const [favorite,setFavorite]=useState(()=>{try{return JSON.parse(localStorage.getItem('kgcure-favorites')||'[]').includes(item.id);}catch{return false;}});
 const tabs = isSkill
  ? [['intro', '概述介绍'], ['review', '评测报告'], ['source', '版本记录']]
  : [['intro', 'Agent 介绍'], ['flow', '执行流程'], ['guide', '使用说明']];
 const requiredFields = item.fields.filter(field => field.required);
 const candidates = CAPABILITIES.filter(candidate => candidate.kind === item.kind && candidate.id !== item.id);
 const relevance = candidate => {
  if (item.relatedIds.includes(candidate.id)) return 3;
  if (candidate.category === item.category) return 2;
  if (candidate.group === item.group) return 1;
  return 0;
 };
 const related = candidates.sort((a, b) => relevance(b) - relevance(a)).slice(0, 3);
 function toggle(){setFavorite(v=>!v);try{const previous=JSON.parse(localStorage.getItem('kgcure-favorites')||'[]');localStorage.setItem('kgcure-favorites',JSON.stringify(favorite?previous.filter(x=>x!==item.id):[...previous,item.id]));}catch{}}
 const topics = featuredTopics[item.id] || [item.group, item.category, topicsByGroup[item.group]];
 const tags = [...new Set([...topics, item.demo ? '社区贡献演示' : null].filter(Boolean))];
 if (tags.length < 3 && item.online) tags.push('可在对话中使用');
 const heading = <header className="workAbilityHead">
  <h1>{item.name}</h1>
  <p>{item.description}</p>
  <div className="workAbilityTags">
   {isSkill ? <SkillBadge/> : <AgentBadge/>}
   {item.exclusive && <AgentExclusiveBadge/>}
   {tags.map(label => <Tag key={label}>{label}</Tag>)}
  </div>
  {!canLaunch && <p className="workAgentRequirement">{EXCLUSIVE_AGENT_REQUIREMENT}</p>}
  <div className="workSource">
   {item.author}<span>{item.updated}{!item.demo&&' 更新'}</span>
  </div>
 </header>;
 return <article className="view ds-capability-detail-page integratedDetail">
  <PageActions>
   <button type="button" className="workFavorite" aria-label={favorite?'取消收藏':'收藏'} aria-pressed={favorite} title={favorite?'取消收藏':'收藏'} onClick={toggle}><Heart size={16} fill={favorite?'currentColor':'none'}/><span>{favorite?'已收藏':'收藏'}</span></button>
   {!item.demo&&<Button variant="primary" className={isSkill?undefined:"workAgentLaunch"} onClick={launch}><ArrowUpRight size={16}/>{actionLabel}</Button>}
  </PageActions>
  <button className="workMobileCases" onClick={()=>document.getElementById('work-case-rail')?.scrollIntoView({block:'start'})}>应用案例（{item.cases.length}） <ArrowRight size={14}/></button>
  <div className="ds-detail-columns"><div>{heading}{isSkill?<SkillAssessment example={assessment}/>:(<section className="workPlan"><header><strong>执行流程</strong><button onClick={()=>setTab('flow')}>{item.steps.length?item.steps.length+' 个步骤':'查看说明'} <ArrowRight size={14}/></button></header>
   <ol>{item.steps.map((step,i)=><li key={i}><small>{String(i+1).padStart(2,'0')}</small>{step}</li>)}</ol><span>预期交付　<strong>{item.output}</strong></span></section>)}<nav className="ds-detail-tabs" aria-label="详情章节" role="tablist">{tabs.map(([id,label])=><button key={id} id={'detail-tab-'+id} type="button" role="tab" aria-selected={tab===id} aria-controls={'detail-panel-'+item.id} className={tab===id?'is-active':''} onClick={()=>setTab(id)}>{label}</button>)}</nav>
   <section className="ds-prose ds-detail-panel" id={'detail-panel-'+item.id} role="tabpanel" aria-labelledby={'detail-tab-'+tab}>
    {tab==='intro'&&<><h2>{isSkill?'适用场景':'这项任务如何开始'}</h2><Paragraphs text={item.intro.replace(/^业务场景介绍\s*|概括：/g,'')||item.description}/>
     <div className="workInputs">
      <div>
       <small>需要准备</small>
       <p>{requiredFields.slice(0, 2).map(field => field.label).join('、') || (isSkill ? '按任务目标准备相关材料' : '参见使用说明')}</p>
      </div>
      <div><small>预期交付</small><p>{item.output||item.deliverables}</p></div>
     </div>
     {item.deliverables?.includes('说明：')&&<><h3>适用边界</h3><p>{item.deliverables.split('说明：').at(-1)}</p></>}
    </>}
    {tab==='review'&&item.demo&&<><h2>专业评测报告</h2><p>社区贡献 · 待评测。此条目为界面演示，暂无评测数据。</p></>}
    {tab==='review'&&assessment&&<AssessmentReport assessment={assessment}/>}
    {tab==='review'&&!item.demo&&!assessment&&<><div className="workReport"><small>专业评测报告</small><h2>这项能力的结果如何核验？</h2><p>针对「{item.name}」，可从任务输入、预期交付和可复现的证据三处核对。</p></div><h3>尚无正式报告</h3><p>评测版本、任务样本及评分依据尚待提供。</p><h3>目前可查的材料</h3><div className="workEvidence">{[['intro','输入要求与交付范围',item.output],['source','目录来源',item.author+' · '+item.updated]].map(([id,title,note])=><button key={id} type="button" onClick={()=>setTab(id)}><span>{title}<small>{note}</small></span><ArrowRight size={16}/></button>)}</div></>}
    {tab==='flow'&&<><h2>执行流程</h2>{!item.steps.length&&<p>来源尚未提供分步骤流程，使用前需进一步确认。</p>}<ol className="ds-detail-flow-list">{item.steps.map((step,i)=><li key={step}><span>{String(i+1).padStart(2,'0')}</span><strong>{step}</strong></li>)}</ol><Paragraphs text={item.flow.replace(/^关键流程\n/,'')}/><h3>预期交付</h3><Paragraphs text={item.deliverables?item.deliverables.replace(/^关键产出\n/,''):'来源尚未列出具体交付清单，需结合项目文件与运行要求确认。'}/></>}
    {tab==='guide'&&!isSkill&&item.demo&&<><h2>使用说明</h2><p>此演示条目用于预览社区贡献的展示与筛选。</p></>}
    {tab==='guide'&&!isSkill&&!item.demo&&<><h2>输入与使用说明</h2><p>在对话中补充所需信息，核对输入与运行配置后继续。以下要求来自此能力的线上详情。</p><div className="ds-input-guide">{item.fields.map((field,i)=><section key={i}><h3>{field.label}{field.required&&<span>必填</span>}</h3><p>{field.description}</p>{field.example&&<small>示例：{field.example}</small>}</section>)}</div><h3>研究材料要求</h3><Paragraphs text={item.materials||'请结合任务目标提供必要的研究材料。'}/><Button variant="primary" onClick={launch}>{canLaunch?'去对话补充输入':actionLabel}<ArrowUpRight size={16}/></Button></>}
    {isSkill&&tab==='source'&&<SkillVersionHistory item={item}/>}
   </section></div><aside className="workCaseRail" id="work-case-rail"><header><h2>应用案例</h2><small>{item.cases.length} 项</small></header>{item.cases.length?item.cases.map(c=><CaseCoverCard key={c.id} title={c.name} category={item.group||item.category}><span className={'workCaseArt '+(isSkill?'':'agent')} aria-hidden="true"><i/><i/><i/>{isSkill?<FilePenLine/>:<Workflow/>}</span></CaseCoverCard>):<p>当前来源未提供关联案例。</p>}</aside></div>
  {!!related.length&&<section className="ds-related"><div className="ds-section-title"><h2>相关推荐</h2></div><div className="sp-agent-grid">{related.map(x=>{const Card=x.kind==='skill'?SkillCard:AgentCard;return <Card key={x.id} item={x} onDetail={x=>onNavigate(capabilityPath(x))}/>;})}</div></section>}
 </article>;
}
