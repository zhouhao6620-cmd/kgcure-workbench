import { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle, ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2,
  ChevronRight, FileText, Heart, Link2, ListChecks, MousePointer2,
  Repeat2, Search, ShieldCheck, Target, Users,
} from 'lucide-react';
import {
  AgentBadge, Button, CaseCategory, Modal, SkillBadge, StarRating, Tag,
} from '../design-preview/components.jsx';
import { CAPABILITIES } from '../content/catalog.js';
import { COMMUNITY_SKILL_EXAMPLES } from '../content/community-skill-examples.js';
import caseRecords from '../content/cases.json';
import { agentProcessDossiers } from '../content/process-dossiers.js';
import { skillEvaluationDossiers } from '../content/skill-evaluation-dossiers.js';
import { canUseCapability, EXCLUSIVE_AGENT_REQUIREMENT } from '../content/membership.js';
import { assessmentDimensions } from '../content/skill-assessment-examples.js';
import { useRouter } from '../router.jsx';
import { sitePath } from '../site-path.js';
import { evidenceCases } from '../cases/evidence.js';
import { topicCases } from '../cases/topic.js';
import { grantCases } from '../cases/grant.js';
import './capability-dossier.css';

const dimensionStandards = [
  { icon: Target, standard: '核对事实、关键数值和术语。' },
  { icon: ListChecks, standard: '检查任务要求和预期交付是否齐备。' },
  { icon: Link2, standard: '检查关键结论或修改能否回查原始材料。' },
  { icon: Repeat2, standard: '检查相同条件下能否复核关键过程和结果。' },
  { icon: MousePointer2, standard: '检查输入要求和结果是否清晰、便于使用。' },
];

const featuredTopics = {
  '59405ee32866425ab3ed47b790e2579e': ['论文写作', '学术润色', '自然表达', '句式改写'],
  '35a3e188211447888f499c11d0b90345': ['科研选题', '文献缺口', '创新构想', '方向比较'],
  '1001': ['论文结构', '图表证据', '投稿检查'],
  '1042': ['文献检索', '证据获取', '来源核对'],
};

const headerDescriptions = {
  '1001': '基于上传的数据、图表或研究结果，先规划章节结构，再展开正文、修订逻辑与引用，最后按目标期刊要求检查投稿材料。',
};

const topicsByGroup = {
  研究设计: '方案设计', 论文写作: '学术表达', 基金申报: '申报材料',
  科研选题: '研究问题', 数据建模: '模型构建', 统计分析: '数据分析',
  文献检索: '证据获取', 科研绘图: '科学可视化', 文献研究: '证据梳理',
  科研汇报: '成果呈现',
};

const caseSvg = (entries, tag) => entries.find(entry => entry.tag === tag)?.svg;

const caseIllustrations = {
  '35a3e188211447888f499c11d0b90345': caseSvg(topicCases, '创新点发现'),
  '59405ee32866425ab3ed47b790e2579e': caseSvg(grantCases, '撰写个人简历 / 业绩简介'),
  '1001': caseSvg(grantCases, '撰写个人简历 / 业绩简介'),
  '1042': caseSvg(evidenceCases, '文献检索'),
};

function caseArtwork(item) {
  const source = caseIllustrations[item.id]
    || caseSvg(topicCases, '创新点发现')
    || caseSvg(grantCases, '撰写个人简历 / 业绩简介')
    || evidenceCases[0].svg;
  return source.replace(/<rect width="240" height="110"[^>]*><\/rect>/, '');
}

const overviewCopy = {
  '59405ee32866425ab3ed47b790e2579e': {
    title: '把一段草稿改成清楚、具体的学术表达',
    lead: '保留原意、事实和限制条件，删掉模板化表达，再把句式调整到适合论文、报告或组会材料的状态。',
    scenarios: '修改论文段落、摘要或报告说明，尤其适合需要减少空泛总结、重复句式和机械转折的文字。',
    audience: '需要反复润色论文、投稿材料或学术汇报的研究者，以及希望先自查表达问题的研究生。',
    boundary: '语言修改不验证事实真伪，也不保证通过任何 AI 检测工具。数字、统计口径和因果结论需要回到原始材料核对。',
  },
  '35a3e188211447888f499c11d0b90345': {
    title: '用已有论文，先判断什么值得做',
    lead: '把研究资源、文献空白和可行性放在同一张桌面上，生成五个有文献依据的方向，并说明为什么优先其中一个。',
    scenarios: '已经有一批论文，准备开题、换研究方向或评估选题是否已经被他人完成时使用。',
    audience: '临床硕博生、准备立项的课题组，以及需要快速判断选题竞争格局的研究者。',
    boundary: '输出是选题可行性预研，不等同于正式系统综述、双人筛选或偏倚风险评价。方法和数据条件仍需研究者确认。',
  },
  '1042': {
    title: '从一个研究问题，形成可追溯的文献线索',
    lead: '选择适合的学术数据库，构建检索式并整理结果，同时保留来源和查询记录，方便回查。',
    scenarios: '需要快速了解某一主题有哪些研究、作者或文献时使用。检索结果与正式系统综述属于不同阶段。',
    audience: '准备读文献、做综述初筛或核对具体论文信息的研究者。',
    boundary: '题录、摘要与全文获取范围不同，空结果和数据库限制也需要如实保留。',
  },
};

function radarPoint(index, fraction) {
  const angle = index * 2 * Math.PI / assessmentDimensions.length - Math.PI / 2;
  return [130 + Math.cos(angle) * 64 * fraction, 101 + Math.sin(angle) * 64 * fraction];
}

function Radar({ assessment, compact = false }) {
  const points = fractionFor => assessmentDimensions.map((_, index) => radarPoint(index, fractionFor(index)).join(',')).join(' ');
  return <svg className={'wikiRadar' + (compact ? ' compact' : '')} viewBox="0 0 260 205" role="img"
    aria-label={assessment ? assessmentDimensions.map((label, index) => label + assessment.scores[index] + '分').join('，') : '暂无评测评分'}>
    <g className="radarGrid">
      {[0.25, 0.5, 0.75, 1].map(level => <polygon key={level} points={points(() => level)}/>)}
      {assessmentDimensions.map((label, index) => {
        const [x, y] = radarPoint(index, 1);
        return <line key={label} x1="130" y1="101" x2={x} y2={y}/>;
      })}
    </g>
    {assessment && <polygon className="radarArea" points={points(index => assessment.scores[index] / 5)}/>}
    {assessment && assessmentDimensions.map((label, index) => {
      const [x, y] = radarPoint(index, 1);
      return <circle key={label} className="radarNode" cx={x} cy={y} r="3.2"/>;
    })}
    {assessmentDimensions.map((label, index) => {
      const angle = index * 2 * Math.PI / assessmentDimensions.length - Math.PI / 2;
      const x = 130 + Math.cos(angle) * 87;
      const y = 101 + Math.sin(angle) * 84;
      const anchor = Math.abs(Math.cos(angle)) < 0.2 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
      return <text key={label} x={x} y={y} textAnchor={anchor} dominantBaseline="middle">{label}</text>;
    })}
  </svg>;
}

function HeroScore({ assessment, onReview }) {
  return <div className="wikiHeroSignal heroScorePanel" aria-label="评测摘要">
    <header>
      <div><span>综合评分</span><small>演示评测</small></div>
      <button type="button" onClick={onReview}>查看评测依据 <ArrowRight size={14}/></button>
    </header>
    <div className="heroScoreLine">
      <strong>{assessment ? assessment.score.toFixed(1) : '待评'}</strong>
      {assessment && <span>/ 5</span>}
      {assessment && <StarRating score={assessment.score}/>}
    </div>
    <Radar assessment={assessment} compact/>
    {assessment
      ? <div className="heroScoreUnsupported"><span>{assessment.tier}</span><p>{assessment.summary}</p></div>
      : <p className="wikiEmptyNote">暂无评分样本与评测依据。</p>}
  </div>;
}

function HeroWorkflow({ item, onProcess }) {
  const steps = item.steps || [];
  const inputs = item.fields?.length ? item.fields.length + ' 类材料' : '任务材料';
  return <div className="wikiHeroSignal heroAgentPanel" aria-label="Agent 工作流摘要">
    <header>
      <div><span>工作流</span><small>{steps.length ? steps.length + ' 步' : '待补充'}</small></div>
      <button type="button" onClick={onProcess}>查看执行案例 <ArrowRight size={14}/></button>
    </header>
    {steps.length ? <ol className="heroMiniFlow">
      {steps.map((step, index) => <li key={step}>
        <span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>
      </li>)}
    </ol> : <p className="wikiEmptyNote">暂无分步流程。</p>}
    <table className="heroAgentMeta">
      <thead><tr><th>耗时</th><th>输入</th><th>交付</th></tr></thead>
      <tbody><tr>
        <td>{item.estimatedDuration || '未统一计时'}</td>
        <td>{inputs}</td>
        <td>{item.output || '按任务生成'}</td>
      </tr></tbody>
    </table>
  </div>;
}

function PeerFeed({ item }) {
  const [expanded, setExpanded] = useState(false);
  const examples = item.id === '35a3e188211447888f499c11d0b90345'
    ? ['用现有论文排查宫颈癌肝转移选题的空白', '比较动态预后与静态预测方向', '把首选方向整理成课题讨论材料']
    : item.id === '1042'
      ? ['围绕重度哮喘检索生物制剂疗效研究', '核对数据库返回和开放获取全文', '整理综述初筛的检索记录']
      : ['修改论文讨论段的语气并核对限定词', '将组会报告中的模板句改成具体行动', '检查改写前后的结论是否一致'];
  const rows = [
    ['张', '张**', '临床医生', '附属医院 · 临床科室', '2 小时前'],
    ['陈', '陈**', '医学博士生', '医学院 · 科研课题组', '昨天'],
    ['李', '李**', '硕士研究生', '教学医院 · 研究团队', '3 天前'],
  ].map(([initial, name, role, institution, time], index) => ({
    initial, name, role, institution, time, activity: examples[index],
  }));
  const visible = expanded ? rows : rows.slice(0, 2);
  return <section className="wikiAsideSection peerSection" aria-labelledby="peer-title">
    <header>
      <div><h2 id="peer-title">科研同行在使用</h2></div>
      <span>演示数据</span>
    </header>
    <ol className="peerTimeline">
      {visible.map(row => <li key={row.name}>
        <span className="peerAvatar" aria-hidden="true">{row.initial}</span>
        <div>
          <p><strong>{row.name}</strong><span>{row.role}</span></p>
          <small>{row.institution}</small>
          <blockquote>{row.activity}</blockquote>
          <time>{row.time}</time>
        </div>
      </li>)}
    </ol>
    <button type="button" className="wikiTextAction" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>
      {expanded ? '收起动态' : '查看全部动态'} <ChevronRight size={14}/>
    </button>
  </section>;
}

function ScenarioSection({ item, overview, tags }) {
  const facts = [
    { icon: Users, label: '适合谁', text: overview.audience },
    { icon: Target, label: '解决什么', text: overview.scenarios },
    { icon: FileText, label: '你会得到', text: item.output || item.deliverables?.split('说明：')[0] || '按任务生成的结果' },
    { icon: ShieldCheck, label: '使用边界', text: overview.boundary },
  ];
  return <section className="wikiSection" id="capability-scenario">
    <header className="wikiSectionHead">
      <span>适用场景</span>
      <h2>{overview.title}</h2>
      <p>{overview.lead}</p>
    </header>
    <div className="scenarioLead">
      <p>{overview.scenarios}</p>
      <div className="wikiTags">{tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
    </div>
    <div className="scenarioFacts">
      {facts.map(({ icon: Icon, label, text }) => <article key={label}>
        <header><Icon size={18} strokeWidth={1.7}/><h3>{label}</h3></header>
        <p>{text}</p>
      </article>)}
    </div>
  </section>;
}

function ConstraintProcess({ dossier }) {
  const [active, setActive] = useState(0);
  if (!dossier?.constraints?.length) return null;
  const constraint = dossier.constraints[active];
  return <section className="constraintSection" aria-labelledby="constraint-title">
    <header className="subsectionHead">
      <div><span>处理过程</span><h3 id="constraint-title">四步约束执行</h3></div>
    </header>
    <div className="constraintRail" role="tablist" aria-label="改写约束步骤">
      {dossier.constraints.map((entry, index) => <button type="button" key={entry.label} role="tab"
        aria-selected={active === index} aria-controls="constraint-detail"
        onClick={() => setActive(index)}>
        <span>{index + 1}</span><strong>{entry.label}</strong>
      </button>)}
    </div>
    <div className="constraintDetail" id="constraint-detail" role="tabpanel" aria-live="polite">
      <div><small>本步动作</small><p>{constraint.detail}</p></div>
      <div><small>核对记录</small><p>{constraint.proof}</p></div>
    </div>
  </section>;
}

function BeforeAfterSample({ sample }) {
  const sourceKeys = Object.keys(sample.sources || {});
  const [sourceKey, setSourceKey] = useState(sourceKeys[0]);
  const source = sample.sources?.[sourceKey] || sample.sources?.[sourceKeys[0]];
  return <>
    <div className="evidenceCompare">
      <article className="beforeColumn">
        <header><span>Before</span><div><strong>{sample.beforeLabel}</strong><small>{sample.beforeNote}</small></div></header>
        <div className="samplePrompt"><small>Prompt</small><p>{sample.task}</p></div>
        <div className="beforeOutput">
          {sample.before.map((segment, index) => segment.flaw
            ? <mark key={index} title={segment.flaw}>{segment.text}</mark>
            : <span key={index}>{segment.text}</span>)}
        </div>
        <div className="beforeFlaws">
          <strong>评测复核发现</strong>
          <ul>{sample.before.filter(segment => segment.flaw).map((segment, index) => <li key={index}>
            <AlertTriangle size={13}/>{segment.flaw}
          </li>)}</ul>
        </div>
      </article>
      <article className="afterColumn">
        <header><span>After</span><div><strong>Skill 输出与逐项核对</strong><small>点击来源查看原文依据</small></div></header>
        <div className="afterTableWrap">
          <table className="afterTable">
            <thead><tr><th>核对字段</th><th>改写结果</th><th>来源</th></tr></thead>
            <tbody>{sample.after.map(row => <tr key={row.field}>
              <th scope="row">{row.field}</th>
              <td>{row.value}</td>
              <td><button type="button" aria-pressed={sourceKey === row.source}
                aria-label="查看原文依据" onClick={() => setSourceKey(row.source)}>原文</button></td>
            </tr>)}</tbody>
          </table>
        </div>
        <div className="afterText"><small>交付文本</small><p>{sample.output}</p></div>
        {source && <div className="sourceCheck">
          <header><span>原文核验</span><strong>{source.location}</strong><em><CheckCircle2 size={13}/>{source.verified}</em></header>
          <blockquote>{source.quote}</blockquote>
          <p>{source.note}</p>
        </div>}
      </article>
    </div>
    <div className="reviewBands">
      <div className="greenBand"><span>绿标亮点</span><p>{sample.green}</p></div>
      <div className="redBand"><span>红标预警</span><p>{sample.red}</p></div>
    </div>
  </>;
}

function BeforeAfterStudio({ dossier }) {
  const [sampleIndex, setSampleIndex] = useState(0);
  if (!dossier?.samples?.length) return null;
  const sample = dossier.samples[sampleIndex];
  return <section className="compareSection" aria-labelledby="compare-title">
    <header className="subsectionHead">
      <div><span>改写对照</span><h3 id="compare-title">改写前后对照</h3></div>
      <p>红标为问题，绿标为核验结果。</p>
    </header>
    <div className="sampleTabs" role="tablist" aria-label="选择评测样本">
      {dossier.samples.map((entry, index) => <button type="button" role="tab" key={entry.title}
        aria-selected={sampleIndex === index} onClick={() => setSampleIndex(index)}>{entry.title}</button>)}
    </div>
    <BeforeAfterSample key={sample.title} sample={sample}/>
  </section>;
}

function AssessmentPanel({ item, dossier }) {
  const assessment = item.assessment;
  const [activeDimension, setActiveDimension] = useState(0);
  if (!assessment) return <div className="wikiEmptyPanel">
    <h3>评测材料待补充</h3>
    <p>当前条目还没有可展示的评分样本、输出对照与评分依据。</p>
  </div>;
  const evidence = dossier?.dimensionEvidence?.[activeDimension] || null;
  return <>
    <div className="assessmentSummary">
      <div className="assessmentRadarBlock">
        <div className="assessmentScoreLine">
          <strong>{assessment.score.toFixed(1)}</strong><span>/ 5</span>
          <StarRating score={assessment.score}/>
          <em>{assessment.tier} · 演示评测</em>
        </div>
        <Radar assessment={assessment}/>
        <div className="scoreBars">
          {assessmentDimensions.map((label, index) => {
            const score = assessment.scores[index];
            const tone = score >= 4.5 ? 'green' : score >= 3.5 ? 'blue' : 'red';
            return <div key={label} data-tone={tone}>
              <span>{label}</span><strong>{score.toFixed(1)}</strong>
              <i><b style={{ width: score * 20 + '%' }}/></i>
            </div>;
          })}
        </div>
      </div>
      <div className="dimensionDetail" aria-live="polite">
        <header><div><span>分维评测依据</span><h3>{assessmentDimensions[activeDimension]}</h3></div>
          <strong>{assessment.scores[activeDimension].toFixed(1)}<small> / 5</small></strong></header>
        <dl>
          <div><dt>实测动作</dt><dd>{evidence?.method || dimensionStandards[activeDimension].standard}</dd></div>
          <div><dt>原始数据</dt><dd>{evidence?.data || assessment.findings[activeDimension]}</dd></div>
          <div><dt>评测员批注</dt><dd>{evidence?.note || assessment.findings[activeDimension]}</dd></div>
        </dl>
      </div>
    </div>
    <div className="dimensionIndex" role="tablist" aria-label="切换评测维度">
      {assessmentDimensions.map((label, index) => {
        const Icon = dimensionStandards[index].icon;
        const score = assessment.scores[index];
        return <button type="button" key={label} role="tab" aria-selected={activeDimension === index}
          onClick={() => setActiveDimension(index)}>
          <Icon size={16}/><strong>{label}</strong><span>{score.toFixed(1)} / 5</span>
          <ChevronRight size={14}/>
        </button>;
      })}
    </div>
  </>;
}

function SkillReview({ item }) {
  const dossier = skillEvaluationDossiers[item.id];
  return <section className="wikiSection" id="capability-review">
    <header className="wikiSectionHead">
      <span>评测报告</span>
      <h2>评测结果与依据</h2>
      <p>基于两组固定改写样本和逐项原文核对。</p>
    </header>
    {dossier?.protocol && <div className="evaluationBanner">
      <div className="evaluationBannerTitle"><ShieldCheck size={17}/><strong>评测条件</strong></div>
      <dl>{dossier.protocol.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
    </div>}
    <AssessmentPanel item={item} dossier={dossier}/>
    {dossier && <>
      <ConstraintProcess dossier={dossier}/>
      <BeforeAfterStudio dossier={dossier}/>
    </>
    }
  </section>;
}

function decisionMarkup(cell) {
  if (!cell) return cell;
  if (/排除|无法|不能/.test(cell)) return <span className="decisionState is-warning">{cell}</span>;
  if (/保留|首选|符合/.test(cell)) return <span className="decisionState is-positive">{cell}</span>;
  if (/配套|备选/.test(cell)) return <span className="decisionState is-neutral">{cell}</span>;
  return cell;
}

function AgentStep({ step, index, total, onPrev, onNext }) {
  return <section className="caseStep" aria-live="polite">
    <header className="caseStepHead">
      <div className="caseStepTitle">
        <span>STEP {String(index + 1).padStart(2, '0')}</span>
        <div><small>{step.eyebrow}</small><h3>{step.brief}</h3></div>
      </div>
      <div className="caseStepControls">
        <button type="button" disabled={index === 0} onClick={onPrev}><ArrowLeft size={15}/>上一步</button>
        <button type="button" disabled={index === total - 1} onClick={onNext}>下一步<ArrowRight size={15}/></button>
      </div>
    </header>
    <div className="caseStepMeta">
      {step.tool && <span>案例记录工具：{step.tool}</span>}
      <em><CheckCircle2 size={14}/>{step.status || '已核对案例记录'}</em>
    </div>
    {step.notice && <div className="stepNotice"><AlertTriangle size={18}/><p>{step.notice}</p></div>}
    <p className="caseStepLead">{step.body}</p>
    {step.facts && <dl className="caseFacts">{step.facts.map(([term, value], factIndex) =>
      <div key={term + factIndex}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>}
    {step.table && <div className="caseTableWrap">
      <div className="caseTableCaption"><strong>{step.table.caption}</strong><small>案例记录摘录</small></div>
      <table className="caseTable"><thead><tr>{step.table.columns.map(column => <th key={column}>{column}</th>)}</tr></thead>
        <tbody>{step.table.rows.map(row => {
          const tone = row.some(cell => /排除|无法/.test(cell)) ? ' is-warning'
            : row.some(cell => /保留|首选/.test(cell)) ? ' is-positive' : '';
          return <tr key={row.join('|')} className={tone}>{row.map((cell, cellIndex) => cellIndex === 0
            ? <th key={cell} scope="row">{cell}</th>
            : <td key={cell}>{decisionMarkup(cell)}</td>)}</tr>;
        })}</tbody></table>
    </div>}
    {step.quote && <blockquote className="caseQuote"><span>案例原句</span>{step.quote}</blockquote>}
    {step.files?.length > 0 && <div className="caseArtifacts"><small>本步对应成果</small>
      <div>{step.files.map(name => <span key={name}><FileText size={14}/>{name}</span>)}</div></div>}
  </section>;
}

function GenericAgentProcess({ item }) {
  const [active, setActive] = useState(0);
  const steps = item.steps || [];
  const paragraphs = (item.flow || '').split(/\n\s*\n/).map(text => text.trim()).filter(Boolean);
  const stepDetails = Object.fromEntries(steps.map((step, index) => {
    const start = paragraphs.indexOf(step);
    return [step, start >= 0 ? paragraphs[start + 1] : paragraphs[index + 2]];
  }));
  const activeStep = steps[active] || '步骤待补充';
  return <section className="wikiSection" id="capability-process">
    <header className="wikiSectionHead"><span>执行过程</span><h2>五步工作流</h2>
      <p>以下内容来自能力目录记录的流程与交付范围，点击步骤查看每一步的动作。</p></header>
    <div className="agentReplay genericAgentReplay">
      <header className="agentReplayHead">
        <div><span>流程概览</span><strong>{item.name}</strong><p>{paragraphs[1] || item.description}</p></div>
        <div><span>{steps.length ? steps.length + ' 个步骤' : '步骤待补充'}</span><span>目录流程</span></div>
      </header>
      <div className="taskRail genericTaskRail" role="tablist" aria-label="Agent 工作流步骤">
        {steps.map((step, index) => <button type="button" role="tab" key={step}
          aria-selected={active === index} onClick={() => setActive(index)}>
          <span>{index + 1}</span><strong>{step}</strong><small>{stepDetails[step] || ''}</small>
        </button>)}
      </div>
      <div className="caseStepShell genericStepShell" role="tabpanel" aria-live="polite">
        <header className="caseStepHead">
          <div className="caseStepTitle">
            <span>STEP {String(active + 1).padStart(2, '0')}</span>
            <div><h3>{activeStep}</h3><p>{stepDetails[activeStep] || '来源暂未提供更详细的步骤说明。'}</p></div>
          </div>
          <div className="caseStepControls">
            <button type="button" disabled={active === 0} onClick={() => setActive(Math.max(0, active - 1))}><ArrowLeft size={15}/>上一步</button>
            <button type="button" disabled={active >= steps.length - 1} onClick={() => setActive(Math.min(steps.length - 1, active + 1))}>下一步<ArrowRight size={15}/></button>
          </div>
        </header>
        <div className="genericStepOutcome"><span>交付范围</span><p>{item.output || '按任务目标生成对应成果。'}</p></div>
      </div>
    </div>
  </section>;
}

function AgentProcess({ item, caseRecord, onCase }) {
  const dossier = agentProcessDossiers[item.id];
  const [stepIndex, setStepIndex] = useState(0);
  if (!dossier) return <GenericAgentProcess item={item}/>;
  const entry = item.cases?.[0];
  const progress = (stepIndex + 1) / dossier.steps.length * 100;
  return <section className="wikiSection" id="capability-process">
    <header className="wikiSectionHead">
      <span>执行过程</span>
      <h2>案例执行过程</h2>
      <p>按任务轨道查看案例中的判断、依据与交付成果。</p>
    </header>
    <div className="agentReplay">
      <header className="agentReplayHead">
        <div><span>执行案例</span><strong>{dossier.title}</strong><p>{dossier.description}</p></div>
        <div><span>{dossier.steps.length} 个步骤</span><span>{caseRecord?.files?.length || 0} 份成果</span></div>
      </header>
      <dl className="agentReplayInputs">{dossier.inputs.map(([term, value]) =>
        <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
      <div className="taskRail" role="tablist" aria-label="Agent 执行步骤">
        {dossier.steps.map((step, index) => <button type="button" role="tab" key={step.eyebrow}
          aria-selected={stepIndex === index} onClick={() => setStepIndex(index)}>
          <span>{index + 1}</span><strong>{step.eyebrow}</strong><small>{step.brief}</small>
        </button>)}
        <i className="taskProgress" style={{ width: progress + '%' }}/>
      </div>
      <div className="caseStepShell">
        <AgentStep step={dossier.steps[stepIndex]} index={stepIndex} total={dossier.steps.length}
          onPrev={() => setStepIndex(Math.max(0, stepIndex - 1))}
          onNext={() => setStepIndex(Math.min(dossier.steps.length - 1, stepIndex + 1))}/>
      </div>
      {entry && <footer className="agentReplayFoot">
        <div><strong>案例来源：{dossier.kicker}</strong></div>
        <button type="button" onClick={() => onCase(entry)}>查看原案例 <ArrowUpRight size={15}/></button>
      </footer>}
    </div>
  </section>;
}

function CaseSection({ item, casePath, onNavigate }) {
  const entries = item.cases || [];
  return <section className="wikiCases" id="capability-cases">
    <header className="wikiSectionHead">
      <span>查看案例</span>
      <h2>应用案例</h2>
      <p>查看具体输入、执行过程与已有成果。</p>
    </header>
    {entries.length ? <div className="case-grid wikiCaseGrid">
      {entries.map(entry => {
        return <a className="case-card wikiCaseCard" key={entry.id} href={sitePath(casePath(entry))} onClick={event => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          onNavigate(casePath(entry));
        }}>
          <span className="case-thumb">
            <CaseCategory>{item.group || (item.kind === 'skill' ? '论文写作' : '研究选题')}</CaseCategory>
            <span className="ds-case-art" aria-hidden="true" dangerouslySetInnerHTML={{ __html: caseArtwork(item) }}/>
          </span>
          <span className="case-body"><span className="case-title">{entry.name}</span></span>
        </a>;
      })}
    </div> : <div className="wikiEmptyPanel"><h3>暂无关联案例</h3><p>该能力尚未提供可查看的案例记录。</p></div>}
  </section>;
}

export function CapabilitySearch({ onChoose, onClose }) {
  const [query, setQuery] = useState('');
  const keyword = query.trim().toLowerCase();
  const results = keyword ? [...CAPABILITIES, ...COMMUNITY_SKILL_EXAMPLES]
    .filter(item => [item.name, item.description, item.group, item.kind].some(value => value?.toLowerCase().includes(keyword)))
    .sort((a, b) => Number(b.name.toLowerCase().includes(keyword)) - Number(a.name.toLowerCase().includes(keyword))) : [];
  return <Modal title="搜索科研能力" onClose={onClose} wide placement="search">
    <form className="sp-history-search" onSubmit={event => { event.preventDefault(); if (results.length) onChoose(results[0]); }}>
      <label className="sp-search-field"><Search size={18}/><input aria-label="搜索 Skill 或 Agent"
        placeholder="搜索名称、科研方法或任务…" value={query} onChange={event => setQuery(event.target.value)}/></label>
      <span className="sp-search-caption" role="status">{keyword ? (results.length ? '找到 ' + results.length + ' 项科研能力' : '没有匹配的科研能力') : '输入关键词查找 Skill 和 Agent'}</span>
      {results.map(item => <button type="button" className="sp-search-result" key={item.id} onClick={() => onChoose(item)}>
        <span>{item.name}</span><ChevronRight size={16}/>
      </button>)}
    </form>
  </Modal>;
}

export function CapabilityDetail({ item, tier, onNavigate, onRun }) {
  const { search } = useRouter();
  const pageRef = useRef(null);
  const [activeSection, setActiveSection] = useState('capability-scenario');
  const isSkill = item.kind === 'skill';
  const assessment = item.assessment;
  const caseRecord = caseRecords.find(record => record.capabilityId === item.id);
  const canLaunch = canUseCapability(item, tier);
  const actionLabel = isSkill ? '在对话中使用' : canLaunch ? '启动 Agent' : '查看会员权益';
  const launch = () => canLaunch ? onRun(item) : onNavigate('/workspace/membership-plans');
  const casePath = entry => '/workspace/cases/' + item.id + '/' + entry.id + search;
  const [favorite, setFavorite] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kgcure-favorites') || '[]').includes(item.id); }
    catch { return false; }
  });

  const navItems = isSkill
    ? [['capability-scenario', '适用场景'], ['capability-review', '评测报告'], ['capability-cases', '查看案例']]
    : [['capability-scenario', '适用场景'], ['capability-process', '执行过程'], ['capability-cases', '查看案例']];

  useEffect(() => {
    const scroller = pageRef.current?.closest('.page-scroll');
    const target = scroller || window;
    function updateActiveSection() {
      if (!scroller) return;
      const nearBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 6;
      if (nearBottom) {
        setActiveSection(navItems.at(-1)[0]);
        return;
      }
      const marker = scroller.getBoundingClientRect().top + 92;
      let current = navItems[0][0];
      for (const [id] of navItems) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) current = id;
      }
      setActiveSection(current);
    }
    updateActiveSection();
    target.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      target.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [item.id]);

  function toggleFavorite() {
    setFavorite(!favorite);
    try {
      const previous = JSON.parse(localStorage.getItem('kgcure-favorites') || '[]');
      const next = favorite ? previous.filter(id => id !== item.id) : [...previous, item.id];
      localStorage.setItem('kgcure-favorites', JSON.stringify(next));
    } catch {}
  }

  function jumpTo(id) {
    setActiveSection(id);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  const topics = featuredTopics[item.id] || [item.group, item.category, topicsByGroup[item.group]];
  const tags = [...new Set([...topics, item.demo ? '社区贡献演示' : null].filter(Boolean))]
    .filter(tag => !item.category?.includes(tag));
  const overview = overviewCopy[item.id] || {
    title: item.description,
    lead: item.intro?.replace(/^业务场景介绍\s*|概括：/g, '').split(/\n\s*\n/)[0] || item.description,
    scenarios: item.intro?.split(/\n\s*\n/).slice(1).join(' ') || '适合按任务目标使用。',
    audience: '希望在当前研究任务中调用这项能力的研究者。',
    boundary: item.deliverables?.split('说明：').at(-1) || '请结合材料范围核对实际输出。',
  };

  return <article className="view capabilityDossier wikiCapabilityPage" ref={pageRef}>
    <header className="wikiHero">
      <div className="wikiHeroGrid">
        <div className="wikiIdentity">
          <div className="wikiBadges">
            {isSkill ? <SkillBadge/> : <AgentBadge/>}{item.exclusive && <span className="sp-tag wikiExclusiveTag">专享</span>}
            <Tag>{item.category}</Tag>
          </div>
          <h1>{item.name}</h1>
          <p className="wikiLead">{headerDescriptions[item.id] || item.description}</p>
          <div className="wikiTags">{tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</div>
        </div>
        {isSkill
          ? <HeroScore assessment={assessment} onReview={() => jumpTo('capability-review')}/>
          : <HeroWorkflow item={item} onProcess={() => jumpTo('capability-process')}/>}
      </div>
      <footer className="wikiHeroFoot">
        <div className="wikiByline">
          <span>{item.author}</span><i aria-hidden="true"/>
          <span>{isSkill ? '科研 Skill' : '科研 Agent'}</span><i aria-hidden="true"/>
          <time>{item.updated} 更新</time>
          {!canLaunch && <span>{EXCLUSIVE_AGENT_REQUIREMENT}</span>}
        </div>
        <div className="wikiHeroActions">
          {!item.demo && <Button variant="primary" className={isSkill ? undefined : 'dossierAgentLaunch'} onClick={launch}>
            <ArrowUpRight size={16}/>{actionLabel}</Button>}
          <button type="button" className="wikiFavorite" aria-label="收藏" aria-pressed={favorite} onClick={toggleFavorite}>
            <Heart size={16} fill={favorite ? 'currentColor' : 'none'}/><span>{favorite ? '已收藏' : '收藏'}</span>
          </button>
        </div>
      </footer>
    </header>

    <nav className="wikiNav" aria-label="页面目录">
      <div>{navItems.map(([id, label]) => <button type="button" key={id}
        aria-current={activeSection === id ? 'location' : undefined} onClick={() => jumpTo(id)}>{label}</button>)}</div>
    </nav>

    <div className="wikiBody">
      <main className="wikiArticle">
        <ScenarioSection item={item} overview={overview} tags={tags.filter(tag => tag !== '社区贡献演示')}/>
        {isSkill
          ? <SkillReview item={item}/>
          : <AgentProcess item={item} caseRecord={caseRecord} onCase={entry => onNavigate(casePath(entry))}/>}
      </main>
      <aside className="wikiAside" aria-label="同行动态">
        <PeerFeed item={item}/>
      </aside>
    </div>

    <CaseSection item={item} casePath={casePath} onNavigate={onNavigate}/>
  </article>;
}
