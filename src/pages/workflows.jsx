import { AgentCard, IconButton } from "../design-preview/components.jsx";
import { HighlightedTitle } from "../design-system/Typography.jsx";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  Download,
  FileText,
  Heart,
  Microscope,
  Play,
  Share2,
  Sparkles,
} from "lucide-react";
import { Btn, PageHead } from "../components.jsx";

export const WORKFLOW_CARDS = [
  { cat: "科研选题与方案设计", title: "创新点发现", desc: "当用户需要研究思路、创新点或寻找研究空白（找研究方向、生成创新点）时，请使用此功能。该功能可基于收集的论文生成5条思路，识别研究空白，并提出附有参考文献的新颖方法。" },
  { cat: "论文写作与投稿", title: "AI 腔去除与自然表达优化", desc: "自动识别并消除过于机械、模板化、空泛或明显 AI 化的表达。" },
  { cat: "科研评审与质量评价", title: "基金申报书审核", desc: "审核基金申报书，提出可行的修改意见。" },
  { cat: "科研选题与方案设计", title: "近期前沿进展扫描", desc: "围绕一个主题，扫描最近 30 天的社区讨论、社交反馈、舆论情绪、发布反应和趋势信号，并生成一份 Markdown 简报。" },
  { cat: "论文写作与投稿", title: "同行评审", desc: "自动排查格式、数据与抄袭问题，生成基础评审建议，仅作人类专家辅助工具。" },
  { cat: "科研选题与方案设计", title: "临床试验设计", desc: "设计临床试验方案" },
  { cat: "医学AI与智能建模", title: "临床风险预测模型", desc: "构建并验证临床结局风险预测模型" },
  { cat: "科研选题与方案设计", title: "头脑风暴", desc: "创意研究的构思与探索。可用于开放式头脑风暴、探索跨学科联系、挑战既有假设或发现研究空白。" },
  { cat: "科研数据分析与统计建模", title: "回归分析", desc: "开展线性回归、逻辑回归或混合效应回归建模" },
  { cat: "系统综述与Meta分析", title: "系统综述文献初筛", desc: "对文献进行标题与摘要初筛，将题录分类为明确纳入、明确排除和人工待确认三类。" },
  { cat: "文献检索与循证研究", title: "文献翻译", desc: "在不同语言之间翻译科学研究论文" },
  { cat: "科研选题与方案设计", title: "样本量计算", desc: "计算样本量并绘制统计效能曲线（效能分析）" },
  { cat: "组学与生物信息分析", title: "流式细胞术", desc: "对流式细胞术数据进行设门、聚类和定量" },
  { cat: "系统综述与Meta分析", title: "干预研究结局数据提取", desc: "从随机对照试验全文中结构化提取主要、次要及安全性结局，生成可追溯核验的标准化 CSV。" },
  { cat: "组学与生物信息分析", title: "先导化合物优化", desc: "优化先导化合物的效力、选择性和 ADMET 特征" },
  { cat: "科研数据分析与统计建模", title: "纵向数据分析", desc: "分析随时间重复测量或面板数据" },
  { cat: "科研数据分析与统计建模", title: "健康公平性分析", desc: "分析不同人口学群体之间的健康差异" },
  { cat: "系统综述与Meta分析", title: "队列研究特征提取", desc: "依据 PECOS 协议整理研究特征、危险因素定义、结局及随访信息。" },
];

const CAT_FILTERS = ["全部 (190)", "推荐 (4)", "全部 (190)", "组学与生物信息分析 (53)", "科研数据分析与统计建模 (42)", "论文写作与投稿 (19)", "更多分类"];

const INPUT_FIELDS = [
  ["具体领域", "必填", "填写您希望创新的窄领域子方向，例如特定癌种、分期或技术路线，用于从文献中精准定位相关空白。", "宫颈癌肝转移预后"],
  ["具体的临床现象、需求或困惑，临床起点", "必填", "描述一个目前未被满意回答的具体临床难题或需求，它将作为创新思路生成的直接起点。", "“已经发生肝转移 → 还能活多久？”"],
  ["我的研究身份、课题周期、主要可用的资源或方法等背景", "必填", "说明您的研究年限、身份和可用的数据、样本或技术条件。", "利用 SEER 数据库，进行宫颈癌肝转移预后预测模型。"],
  ["希望重点研究的维度，聚焦方向", "必填", "选择您希望创新点偏向的研究层面。", "用 SEER 做部位特异性转移预后 Nomogram"],
  ["任何具体的研究方法倾向或限制条件，特别思路/限制", "必填", "列出您对研究方法、数据来源或伦理的特殊偏好或硬性限制。", "担心数据不够用，模型无法建立。"],
];

const RESULT_FILES = [
  "00_总览与索引.md",
  "01_文献竞争格局与数据可行性核查.md",
  "02_研究缺口分析.md",
  "03_五个高潜力研究方向.md",
  "04_选题评分与优选.md",
  "05_旗舰选题执行方案.md",
  "06_论文题目与投稿建议.md",
  "07_参考文献与检索式.md",
];

export function WorkflowList({ onOpen, onBack, onToast }) {
  const [value, setValue] = useState("");
  const [filter, setFilter] = useState("全部 (190)");

  return (
    <div className="view wf-view">
      <button type="button" className="back-link" onClick={onBack}>← 返回</button>
      <div className="wf-hero">
        <h1><HighlightedTitle>你好，专为医生量身定制的科研工作流</HighlightedTitle></h1>
        <p>专为医学人打造的专业技能与科研工作流，融入医学专业方法、证据核验与过程复核，让结论有出处、方法可复核，关键决策由您掌控。</p>
      </div>

      <form
        className="wf-composer"
        onSubmit={(event) => {
          event.preventDefault();
          onToast(value.trim() ? "原型演示：已根据需求生成推荐" : "请先描述您的科研需求");
        }}
      >
        <textarea value={value} onChange={(event) => setValue(event.target.value)} placeholder="描述您的科研需求" aria-label="描述您的科研需求" rows={3} />
        <div className="wf-composer-foot">
          <span className="wf-ai"><Sparkles size={14} /> AI 推荐</span>
          <button type="submit" className="submit-button" aria-label="提交"><ArrowUp size={16} /></button>
        </div>
      </form>

      <div className="wf-quick">
        <span>从这些方向开始</span>
        {["全类型", "临床预测模型构建", "临床风险预测模型", "科研流程图"].map((item) => (
          <button key={item} type="button" className="quick-chip" onClick={() => onToast("筛选方向：" + item)}>{item}</button>
        ))}
      </div>

      <div className="wf-filters">
        {CAT_FILTERS.map((item, index) => (
          <button key={item + index} type="button" className={"wf-filter" + (filter === item && index === 0 ? " is-active" : "")} onClick={() => setFilter(item)}>
            {item}
          </button>
        ))}
      </div>

      <p className="wf-count">共 190 个工作流</p>

      <div className="wf-grid">
        {WORKFLOW_CARDS.map((item) => (
          <AgentCard key={item.title} item={{id:item.title,kind:'agent',name:item.title,description:item.desc,category:item.cat,steps:[],output:'查看输入与交付要求',icon:'workflow',tone:'blue',online:true}} onDetail={()=>onOpen(item.title)} onCall={()=>onOpen(item.title)}/>
        ))}
      </div>
    </div>
  );
}

export function WorkflowDetail({ onBack, onRun, onCase, onToast }) {
  const [tab, setTab] = useState("科研案例");
  const [favorite, setFavorite] = useState(true);
  const tabs = ["科研案例", "输入配置", "工作流介绍", "关键流程", "相关推荐"];

  return (
    <div className="view wf-detail">
      <div className="detail-topbar">
        <button type="button" className="back-link" onClick={onBack}>← 返回</button>
        <IconButton label="分享当前页面" onClick={() => onToast("分享（原型演示）")}>
          <Share2 size={18} aria-hidden="true"/>
        </IconButton>
      </div>

      <header className="wf-head">
        <h1>创新点发现</h1>
        <div className="wf-head-meta">
          <span className="wf-cat">科研选题与方案设计</span>
          <button type="button" className={"fav-toggle" + (favorite ? " is-on" : "")} onClick={() => setFavorite((on) => !on)}>
            <Heart size={14} /> {favorite ? "已收藏" : "收藏"}
          </button>
        </div>
        <p className="wf-desc">当用户需要研究思路、创新点或寻找研究空白（找研究方向、生成创新点）时，请使用此功能。该功能可基于收集的论文生成5条思路，识别研究空白，并提出附有参考文献的新颖方法。</p>
        <div className="wf-meta-row">
          <span>更新于 2026-10-16</span>
          <span>维护团队：数愈科研</span>
        </div>
        <div className="wf-cta">
          <Btn kind="primary" onClick={onCase}>
            <Play size={14} /> 查看案例
          </Btn>
          <Btn kind="secondary" onClick={onRun}>运行工作流</Btn>
        </div>
      </header>

      <div className="wf-tabbar" role="tablist" aria-label="工作流内容">
        {tabs.map((item) => (
          <button key={item} type="button" role="tab" aria-selected={tab === item} className={"wf-tab" + (tab === item ? " is-active" : "")} onClick={() => setTab(item)}>
            {item}
          </button>
        ))}
      </div>

      <section className="panel wf-section">
        <div className="panel-head">
          <h2>科研案例</h2>
          <button type="button" className="arrow-link" onClick={onCase}>查看案例 <ArrowRight size={14} /></button>
        </div>
        <article className="wf-case-card">
          <span className="wf-cat">科研选题与方案设计</span>
          <h3>基于 SEER 的宫颈癌肝转移预后研究：创新点挖掘</h3>
          <p>暂无案例介绍。</p>
        </article>
      </section>

      <section className="panel wf-section">
        <h2>结果文件 <button type="button" className="text-link inline" onClick={() => onToast("一键下载（原型演示）")}>一键下载</button></h2>
        <div className="result-files">
          {RESULT_FILES.map((name) => (
            <button key={name} type="button" className="result-file" onClick={() => onToast("下载 " + name + "（原型演示）")}>
              <FileText size={16} />
              <span>
                <span className="file-name">{name}</span>
                <span className="file-path">/mnt/user-data/outputs/{name}</span>
              </span>
              <Download size={14} />
            </button>
          ))}
        </div>
      </section>

      <section className="panel wf-section">
        <h2>输入配置</h2>
        <p className="panel-sub">准备所需材料，并确认工作流的输入要求与运行配置。</p>
        <h3 className="sub-h">输入字段</h3>
        <table className="field-table">
          <thead>
            <tr><th>字段名称</th><th>是否必填</th><th>字段说明</th><th>填入示例</th></tr>
          </thead>
          <tbody>
            {INPUT_FIELDS.map((row) => (
              <tr key={row[0]}>
                <td>{row[0]}</td>
                <td><span className="req">{row[1]}</span></td>
                <td>{row[2]}</td>
                <td className="example">{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 className="sub-h">研究材料要求</h3>
        <p className="note">该工作流不需要用户上传文件</p>

        <h3 className="sub-h">运行配置</h3>
        <div className="run-config">
          <div className="run-row">
            <span>模型配置</span>
            <div className="run-options">
              <button type="button" className="run-option is-active">SHUYU Pro <span className="run-tag">推荐</span></button>
              <button type="button" className="run-option" onClick={() => onToast("切换模型（原型演示）")}>SHUYU Flash</button>
            </div>
          </div>
          <div className="run-row">
            <span>调用模式</span>
            <div className="run-options">
              <button type="button" className="run-option is-active">深度 <span className="run-tag">推荐</span></button>
              <button type="button" className="run-option" onClick={() => onToast("切换调用模式（原型演示）")}>专家</button>
            </div>
          </div>
          <div className="run-row">
            <span>输出语言</span>
            <div className="run-options">
              <button type="button" className="run-option is-active">中文 <span className="run-tag">推荐</span></button>
              <button type="button" className="run-option" onClick={() => onToast("切换语言（原型演示）")}>英文</button>
            </div>
          </div>
          <div className="run-row">
            <span>输出风格</span>
            <div className="run-options">
              {["正式", "专业", "简洁", "口语化"].map((item, index) => (
                <button key={item} type="button" className={"run-option" + (index === 0 ? " is-active" : "")}>{item}{index === 0 ? <span className="run-tag">推荐</span> : null}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="panel wf-section">
        <h2>业务场景介绍</h2>
        <p>概括：基于论文生成研究创新点：阅读已有论文，识别共同局限和研究空白，形成五个有文献依据的研究构想。</p>
        <p>适合已经收集至少五篇论文、希望从组合、简化、泛化、约束放宽和结构创新角度寻找方向的研究者。</p>
        <div className="pain-grid">
          {[
            ["研究创新缺少论文依据", "只凭主题发散容易得到缺乏文献支撑、与现有工作重复的创新点。", "从实际论文的贡献与局限出发，形成不同策略的构想并比较优先级。"],
            ["结果交接缺少清晰结构", "结果仅以零散片段保存时，接收者不易找到本任务的核心内容。", "围绕五个研究构想与评分、优选方向与实施映射组织交付。"],
            ["适用条件容易被忽略", "将可选能力、前置条件或未验证事项省略，容易对结果作出过度解释。", "构想必须有实际论文依据；研究想法与已经验证的创新成果需要区分。"],
          ].map(([title, problem, value]) => (
            <article key={title} className="pain-card">
              <h3>{title}</h3>
              <p className="pain-label">人工常见问题</p>
              <p>{problem}</p>
              <p className="pain-label is-good">工作流价值</p>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="panel wf-section">
        <h2>关键流程</h2>
        <p>以实际论文中的研究缺口为依据，形成候选创新点并深化优选方向。</p>
        <ol className="flow-list">
          {[
            ["盘点研究资源", "检查工作区论文、研究主题与可用材料。"],
            ["补充所需文献", "明确检索策略，在材料不足时取得相关论文。"],
            ["分析文献缺口", "阅读方法与结果，寻找限制、未解问题和可迁移思路。"],
            ["生成并比较创意", "提出五个有引用支持的思路，比较价值与可行性。"],
            ["深化优选方案", "细化最佳方向，调查相关代码并整理实施建议。"],
          ].map(([title, desc], index) => (
            <li key={title}>
              <span className="flow-n">{String(index + 1).padStart(2, "0")}</span>
              <span><strong>{title}</strong>{desc}</span>
            </li>
          ))}
        </ol>

        <h3 className="sub-h">关键产出</h3>
        <div className="output-grid">
          <article className="output-card">
            <span className="badge badge-blue">必然产出</span>
            <h4>五个研究构想与评分</h4>
            <span className="file-kind">Markdown</span>
            <p>记录研究空白、五个方向及新颖性、可行性和影响评价。</p>
          </article>
          <article className="output-card">
            <span className="badge badge-blue">必然产出</span>
            <h4>优选方向与实施映射</h4>
            <span className="file-kind">Markdown</span>
            <p>细化所选构想，并整理参考实现和后续实施路线。</p>
          </article>
          <article className="output-card">
            <span className="badge badge-slate">条件产出</span>
            <h4>补充文献与参考实现</h4>
            <span className="file-kind">需要扩充资料时</span>
            <p>按确定的检索策略补充论文；有适用参考实现时建立对应关系。</p>
          </article>
        </div>
        <p className="note">说明：以上为输入符合要求且相应步骤成功完成时的交付范围。构想必须有实际论文依据；研究想法与已经验证的创新成果需要区分。</p>
      </section>

      <section className="panel wf-section">
        <h2>相关推荐</h2>
        <div className="wf-grid three">
          {WORKFLOW_CARDS.slice(3, 6).map((item) => (
            <article key={item.title} className="wf-card">
              <span className="wf-cat">{item.cat}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <button type="button" className="wf-enter" onClick={() => onToast("进入工作流：" + item.title)}>进入工作流 <ArrowRight size={14} /></button>
            </article>
          ))}
        </div>
      </section>
      <span className="sr-only"><Microscope size={1} /></span>
    </div>
  );
}

export function WorkflowCase({ onExit, onRun, onToast }) {
  const [stepsOpen, setStepsOpen] = useState(true);

  return (
    <div className="demo-shell">
      <div className="demo-top">
        <button type="button" className="demo-exit" onClick={onExit}>← 退出演示</button>
        <div className="demo-title">
          <span className="demo-label">案例展示</span>
          <strong>基于SEER的宫颈癌肝转移预后研究：创新点挖掘</strong>
        </div>
        <span className="demo-status"><span className="live-dot" /> 正在回放中...</span>
        <div className="demo-actions">
          <Btn kind="ghost" size="sm" onClick={() => onToast("已跳过，直接查看结果")}>跳过并查看结果</Btn>
          <Btn kind="primary" size="sm" onClick={onRun}>运行工作流</Btn>
        </div>
      </div>

      <div className="demo-body">
        <div className="demo-main">
          <div className="demo-msg is-user">已选择【创新点发现工作流】</div>

          <div className="assistant-block">
            <p><strong>「创新点发现」</strong> 当用户需要研究思路、创新点或寻找研究空白（找研究方向、生成创新点）时，请使用此功能。该功能可基于收集的论文生成5条思路，识别研究空白，并提出附有参考文献的新颖方法。</p>
            <p>请补充或核对下方 5 项信息后开始。</p>
            <div className="demo-fields">
              {INPUT_FIELDS.map((row) => (
                <div key={row[0]} className="demo-field">
                  <span>{row[0]}</span>
                  <span className="demo-field-value">{row[3]}</span>
                </div>
              ))}
            </div>
            <div className="demo-runbar">
              <span className="demo-run-name">创新点发现</span>
              <span className="demo-run-note">执行信息已提交并保存</span>
              <span className="badge badge-green">已运行</span>
            </div>
          </div>

          <div className="demo-task">
            <h3>任务描述</h3>
            <p>我需要一个关于具体领域：宫颈癌肝转移预后的选题。基于我提供的具体信息，凝练可落地的科学问题，并生成与之匹配的高潜力研究方向及论文题目。请严格遵循核心工作流程，注意从实际出发，不是一个宏大的理论框架，而是一个能快速落地、在现有资源和时间限制内能完成的深化研究。</p>
          </div>

          <div className="demo-config">
            <h3>输入字段</h3>
            {INPUT_FIELDS.map((row) => (
              <div key={row[0]} className="demo-config-row">
                <span>{row[0]}</span>
                <span>{row[3]}</span>
              </div>
            ))}
            <h3>输入配置</h3>
            <div className="demo-chips">
              {["调用模式：深度", "模型：SHUYU Flash", "输出语言：中文", "输出风格：正式"].map((item) => (
                <span key={item} className="demo-chip">{item}</span>
              ))}
            </div>
          </div>

          <div className="demo-exec">
            <span className="badge badge-green">已提交并执行</span>
            <button type="button" className="collapse-row" aria-expanded={stepsOpen} onClick={() => setStepsOpen((open) => !open)}>
              查看执行过程（23 个步骤） <ChevronDown size={14} className={stepsOpen ? "rot" : ""} />
            </button>
            {stepsOpen ? (
              <div className="step-list">
                {["PubMed 检索：SEER 宫颈癌 nomogram 预后模型", "读取 5 篇候选论文的方法与局限", "整理研究缺口并生成候选方向", "按新颖性、可行性、影响力评分"].map((item) => (
                  <div key={item} className="step-item"><Check size={14} /> {item}</div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <aside className="demo-side">
          <div className="demo-side-head">
            <h2>文件 <span className="section-count">0</span></h2>
          </div>
          <div className="demo-empty">未选择文件<p>选择文件以查看详情</p></div>
        </aside>
      </div>
    </div>
  );
}

