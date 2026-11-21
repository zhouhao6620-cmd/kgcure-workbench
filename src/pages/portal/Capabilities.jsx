import {
  ArrowUpRight, Boxes, ClipboardCheck, Compass, Cpu, Database, Files, FileSearch,
  FolderOpen, ListChecks, ScanLine, Settings2, ShieldCheck, UsersRound, Workflow,
} from 'lucide-react';
import { AgentGlyph, SkillGlyph } from '../../design-preview/components.jsx';
import { EVALUATION_PATH } from '../../content/review-capabilities.js';
import { sitePath } from '../../site-path.js';

const values = [
  {
    id: 'coverage',
    title: '全场景 AI 能力集',
    context: '科研流程全覆盖',
    Icon: Compass,
    features: [
      [Database, '专业科研工具库', '从检索到出图，少切应用'],
      [SkillGlyph, '专业科研 Skill', '更快整理证据与分析结果', '/workspace/skills/sci-paper-evidence-review'],
      [AgentGlyph, '科研 Agent', '先拿到可讨论的研究方案', '/workspace/agents/research-topic-feasibility'],
      [FileSearch, '科研场景发现', '少试错，更快选到合适方法'],
    ],
  },
  {
    id: 'ready',
    title: '开箱即用零配置',
    context: '沙箱环境集成',
    Icon: Cpu,
    features: [
      [Boxes, '无需自行安装', '把时间留给分析与解读'],
      [Settings2, '预配置运行环境', '换设备也能继续做分析'],
      [ListChecks, '依赖统一管理', '少为版本冲突耽误进度'],
      [Cpu, '统一工作台调用', '少在工具间来回搬文件'],
    ],
  },
  {
    id: 'evidence',
    title: '科研过程可核验',
    context: '真实场景评测',
    Icon: ShieldCheck,
    features: [
      [ClipboardCheck, '真实科研场景实测', '选用前先看表现和局限', EVALUATION_PATH + '?mode=skill'],
      [ScanLine, '结论有出处，证据可核验', '引用前确认原文支持结论'],
      [FileSearch, '方法有依据，分析可复核', '审稿追问时说清分析取舍'],
      [Workflow, '过程看得见，决策可掌控', '发现偏差时能及时调整'],
    ],
  },
  {
    id: 'team',
    title: '多人科研空间',
    context: '成果共享任务协同',
    Icon: FolderOpen,
    features: [
      [FolderOpen, '以课题为单位组织研究', '并行推进时少混用资料'],
      [UsersRound, '多人共享与团队协作', '接手时知道做到哪一步'],
      [Files, '研究资料与成果沉淀', '复盘或写报告时找回材料'],
      [ShieldCheck, '空间权限与隐私管理', '降低敏感资料扩散的风险'],
    ],
  },
];

function ValueFeatures({ features }) {
  return <ul className="cap-features">
    {features.map(([Icon, title, description, path]) => (
      <li key={title}>
        <span className="cap-feature-icon"><Icon size={26} aria-hidden="true"/></span>
        <div>
          <h4>
            {path
              ? <a href={sitePath(path)}>{title}<ArrowUpRight size={13} aria-hidden="true"/></a>
              : title}
          </h4>
          <p>{description}</p>
        </div>
      </li>
    ))}
  </ul>;
}

export default function Capabilities() {
  return <section id="capabilities" className="portal-section portal-shell" aria-labelledby="capabilities-title">
    <header className="portal-intro">
      <h2 id="capabilities-title"><span>全场景科研能力</span>，覆盖科研的每一步</h2>
      <p>让AI科研平权，让每个科研人都能拥有一个全能助理</p>
    </header>
    <div className="cap-grid">
      {values.map(({ id, title, context, Icon, features }) => (
        <article key={id} className="cap-value" data-value={id} aria-labelledby={'cap-title-' + id}>
          <div className="cap-value-copy">
            <p>{context}</p>
            <h3 id={'cap-title-' + id}>{title}</h3>
            <span className="cap-value-icon" aria-hidden="true"><Icon size={84}/></span>
          </div>
          <ValueFeatures features={features}/>
        </article>
      ))}
    </div>
  </section>;
}
