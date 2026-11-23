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
      [Database, '全流程覆盖', '从检索、数据分析到绘图与论文撰写'],
      [SkillGlyph, '科研技能 Skill', '精读论文、提取证据，专业技能按需调用', '/workspace/skills/sci-paper-evidence-review'],
      [AgentGlyph, '科研智能体 Agent', '串联多个研究步骤，从选题构思到方案初稿', '/workspace/agents/research-topic-feasibility'],
      [FileSearch, '智能推荐助手', '描述科研需求，匹配合适的技能与智能体'],
    ],
  },
  {
    id: 'ready',
    title: '开箱即用零配置',
    context: '沙箱环境集成',
    Icon: Cpu,
    features: [
      [Boxes, '科研环境预部署', '常用工具与依赖，集成为科研环境包'],
      [Settings2, '专业工具免安装', '打开工作台，即可调用专业工具'],
      [ListChecks, '运行配置免调试', '软件版本预先适配，省去环境调试'],
      [Cpu, '任务配置可视化', '参数一目了然，按课题需要灵活设置'],
    ],
  },
  {
    id: 'evidence',
    title: '科研过程可核验',
    context: '真实场景评测',
    Icon: ShieldCheck,
    features: [
      [ClipboardCheck, '真实科研任务实测', '选用前，看清工具表现与局限', EVALUATION_PATH + '?mode=skill'],
      [ScanLine, '结论有出处，证据可核验', '对照原文，核查证据是否支持结论'],
      [FileSearch, '方法有依据，分析可复核', '回看方法与参数，复核分析结果'],
      [Workflow, '过程看得见，决策可掌控', '查看阶段结果，及时调整研究方向'],
    ],
  },
  {
    id: 'team',
    title: '多人科研空间',
    context: '成果共享任务协同',
    Icon: FolderOpen,
    features: [
      [FolderOpen, '按课题组织研究', '一项课题一个空间，资料与任务集中管理'],
      [UsersRound, '课题组共享协作', '共享研究进展，成员接手便知做到哪一步'],
      [Files, '研究资料与成果沉淀', '留存分析记录与图表，写报告时随时取用'],
      [ShieldCheck, '空间权限与隐私管理', '按课题管理成员，明确资料共享范围'],
    ],
  },
];

function ValueFeatures({ features }) {
  return <ul className="cap-features">
    {features.map(([Icon, title, description, path]) => (
      <li key={title}>
        <span className="cap-feature-icon"><Icon size={18} aria-hidden="true"/></span>
        <h4>
          {path
            ? <a href={sitePath(path)}>{title}<ArrowUpRight size={13} aria-hidden="true"/></a>
            : title}
        </h4>
        <p>{description}</p>
      </li>
    ))}
  </ul>;
}

export default function Capabilities() {
  return <section id="capabilities" className="portal-section portal-shell" aria-labelledby="capabilities-title">
    <header className="portal-intro">
      <h2 id="capabilities-title"><span>全场景科研能力</span>，覆盖科研的每一步</h2>
      <p>科研平权，让每一个科研人都能拥有一个全能AI助理</p>
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
