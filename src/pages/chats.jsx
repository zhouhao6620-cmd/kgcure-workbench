import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Check,
  ChevronDown,
  Download,
  Eye,
  FileText,
  FolderPlus,
  Image as ImageIcon,
  Paperclip,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import { BoundComposer } from "../design-system/BoundComposer.jsx";
import { ConversationPrompt, FollowUpQuestions } from "../design-system/ConversationPrompt.jsx";
import { ThinkingSummary, DeliveryCard, FilePanelToggle } from "../design-preview/ConversationPatterns.jsx";
import { IconButton, SkillCard } from "../design-preview/components.jsx";
import { Btn } from "../components.jsx";

const MODELS = [
  { name: "SHUYU Flash", desc: "响应速度更快，兼顾质量与使用成本" },
  { name: "SHUYU Pro", desc: "更强的分析与推理能力，适合复杂任务" },
  { name: "SHUYU Image", desc: "生成和修改科研图片" },
];

function ChatComposer({placeholder,model,onModelChange,onToast,onSend}) {
 const [value,setValue]=useState('');
 return <div className="chat-composer-wrap"><BoundComposer chat value={value} onChange={setValue} model={model} onModelChange={onModelChange} placeholder={placeholder} onToast={onToast} onSubmit={data=>{onSend?.(data.text);setValue('');onToast?.('已保留本地消息，未调用真实模型');}}/><p className="disclaimer">内容由AI生成，仅供参考</p></div>;
}

function FileCard({ name, type, onToast, delivery }) {
  return <DeliveryCard file={{id:name, name, type}} delivery={delivery} onDownload={()=>onToast('原始文件未收录于本地样板，暂无法下载')}/>;
}

function Collapse({ label, open, onToggle, children }) {
 return <ThinkingSummary label={label} duration="过程记录" expanded={open} onToggle={onToggle}>{children}</ThinkingSummary>;
}

function StepList({ items }) {
  return (
    <div className="step-list">
      {items.map((item) => (
        <div key={item} className="step-item"><Check size={13} /> {item}</div>
      ))}
    </div>
  );
}

function ChatFrame({ title, children, side, sideOpen, onToggleSide, model, onModelChange, placeholder, onToast }) {
  const [localMessages,setLocalMessages]=useState(()=>{try{const pending=JSON.parse(sessionStorage.getItem('kgcure-submitted-message')||'null');return pending?.text?[pending.text]:[];}catch{return [];}});
  const lastReply=useRef(null);
  useEffect(()=>{try{sessionStorage.removeItem('kgcure-submitted-message');}catch{}},[]);
  useEffect(()=>{if(localMessages.length)lastReply.current?.scrollIntoView({block:'end'});},[localMessages.length]);
  return (
    <div className="chat-shell">
      <div className="chat-main">
        <header className="chat-head">
          <div className="chat-head-left">
            <h1>{title}</h1>
          </div>
          <div className="chat-head-actions"><IconButton label="分享当前示例对话" onClick={() => onToast?.('分享对话（原型演示）')}/><FilePanelToggle open={sideOpen} onToggle={onToggleSide}/>
          </div>
        </header>
        <div className="chat-scroll">
          <div className="chat-col">{children}{localMessages.map((text,i)=><div key={i}><div className="msg is-user"><div className="bubble">{text}</div></div><div className="msg is-assistant"><ThinkingSummary/><p>已保留你补充的信息。请继续明确研究对象、主要结局和需要的交付形式，便于组织后续任务。</p></div></div>)}<div ref={lastReply}/></div>
        </div>
        <ChatComposer placeholder={placeholder} model={model} onModelChange={onModelChange} onToast={onToast} onSend={text=>setLocalMessages(v=>[...v,text])} />
      </div>
      {sideOpen ? (
        <aside className="chat-side">
          <div className="chat-side-head">
            <h2>{side?.title || "文件"}</h2>
            <button type="button" className="icon-button" aria-label="关闭" onClick={onToggleSide}><X size={16} /></button>
          </div>
          {side?.content}
        </aside>
      ) : null}
    </div>
  );
}

export function DrawingChat({ onToast, delivery }) {
  const [model, setModel] = useState("SHUYU Image");
  const [side, setSide] = useState(() => window.innerWidth > 767);
  const [summary, setSummary] = useState(false);

  return (
    <ChatFrame
      title="科研绘图流程"
      model={model}
      onModelChange={setModel}
      sideOpen={side}
      onToggleSide={() => setSide((open) => !open)}
      placeholder="继续描述需要修改的内容，例如：把左侧的箭头改成绿色并加粗..."
      onToast={onToast}
      side={{
        title: "文件",
        content: (
          <div className="side-files">
            <FileCard name="scientific-drawing-cafe742250b1.png" type="PNG" onToast={onToast} delivery={delivery} />
          </div>
        ),
      }}
    >
      <div className="msg is-user">
        <div className="bubble">
          <p>请绘制「FSP1–维生素K抑制铁死亡」。</p>
          <p>【绘图内容】 绘制双面板医学机制图，标题为“FSP1–维生素K循环抑制铁死亡”。左侧显示VK环氧化物→VK→VKH₂，两次还原分别由VKOR催化；华法林仅抑制这两步VKOR反应。FSP1提供不受华法林影响的独立VK→VKH₂旁路，与主循环共享VK和VKH₂端点。GGCX使VKH₂回到VK环氧化物，并耦联蛋白结合的Glu→Gla羧化，形成功能性凝血蛋白；配以原创血管示意图。</p>
          <p>右侧显示FSP1将VK还原为VKH₂，同时NADPH转为NADP⁺。VKH₂捕获膜脂自由基PLOO•／PLO•，抗氧化反应后回到VK，而非VK环氧化物。自由基捕获抑制脂质过氧化，脂质过氧化促进铁死亡。抑制关系使用垂直T形端点，反应使用箭头，两个面板之间不画运输箭头。</p>
          <p>【绘图配置】 比例：16:9　输出格式：PNG　配色方案：Nature 参考（NPG）　视觉风格：扁平插画　标签语言：英文　图片背景：纯白 #FFFFFF　模型：SHUYU Image</p>
        </div>
      </div>

      <Collapse label="查看过程总结" open={summary} onToggle={() => setSummary((open) => !open)}>
        <StepList items={["解析图注与节点关系", "拆分左右双面板布局", "生成机制图并校正连线方向"]} />
      </Collapse>

      <div className="msg is-assistant">
        <p>示例绘图任务已完成。你可以继续描述需要修改的内容。</p>
        <div className="file-grid one">
          <FileCard name="scientific-drawing-cafe742250b1.png" type="PNG" onToast={onToast} delivery={delivery} />
        </div>
      </div>
    </ChatFrame>
  );
}

export function MultiStepChat({ title, onToast, delivery }) {
  const [model, setModel] = useState("SHUYU Pro");
  const [side, setSide] = useState(() => window.innerWidth > 767);
  const [steps1, setSteps1] = useState(false);
  const [steps2, setSteps2] = useState(false);
  const [steps3, setSteps3] = useState(false);

  const files = [
    ["FETM_神经发育障碍家庭健康管理_研究方案.docx", "DOCX"],
    ["FETM_神经发育障碍家庭健康管理_研究方案.pdf", "PDF"],
    ["graphical_abstract.png", "PNG"],
    ["使用说明与待确认清单.md", "MD"],
    ["FETM_论文交付包.zip", "ZIP"],
  ];

  return (
    <ChatFrame
      title={title || "自由对话-多步骤完整演示"}
      model={model}
      onModelChange={setModel}
      sideOpen={side}
      onToggleSide={() => setSide((open) => !open)}
      placeholder="提出您的医学科研学术疑问，例如：心衰合并衰弱患者有哪些最新高分临床研究热点？"
      onToast={onToast}
      side={{
        title: "文件 · 2",
        content: (
          <div className="side-files">
            {files.slice(0, 2).map(([name, type]) => (
              <FileCard key={name} name={name} type={type} onToast={onToast} delivery={delivery} />
            ))}
          </div>
        ),
      }}
    >
      <div className="msg is-user"><div className="bubble">我想做一个神经发育障碍家庭健康管理服务方向的论文</div></div>

      <Collapse label="查看执行过程（2 个步骤）" open={steps1} onToggle={() => setSteps1((open) => !open)}>
        <StepList items={["解析研究方向与论文类型", "生成可选研究路径"]} />
      </Collapse>

      <div className="msg is-assistant">
        <p>🔀 “神经发育障碍家庭健康管理服务”可对应综述、现况调查、干预研究、工具开发、真实世界数据分析或政策述评，不同类型对数据、伦理审批和写作周期的要求差别很大。</p>
        <p>这个方向可以写成很多种论文，我需要先确认您想做的类型和现有条件，才能给出可执行的方案。您更倾向哪一种？</p>
        <div className="ds-chat-prompts chat-replay-options">
          {[
            ["综述/范围综述", "系统梳理家庭健康管理模式与证据，不需要自有数据"],
            ["横断面现况调查", "需问卷数据，分析家庭照护负担、服务利用、未满足需求等"],
            ["干预研究或研究方案", "如家庭赋能/照护者培训/远程管理，需伦理与实施条件"],
            ["工具开发与信效度验证", "如家庭健康管理需求/能力量表"],
            ["真实世界数据/队列二次分析", "我已有医院或随访数据"],
            ["政策与服务模式述评", "Perspective/Commentary，偏观点与框架"],
          ].map(([title, desc], index) => (
            <ConversationPrompt key={title} title={title} description={desc} outlined selected={index === 2}/>
          ))}
        </div>
      </div>

      <div className="msg is-user"><div className="bubble">干预研究或研究方案（如家庭赋能/照护者培训/远程管理，需伦理与实施条件）</div></div>

      <Collapse label="查看执行过程（4 个步骤）" open={steps2} onToggle={() => setSteps2((open) => !open)}>
        <StepList items={["明确研究设计与结局", "核对伦理与实施条件", "生成方案骨架", "确认数据现状"]} />
      </Collapse>

      <div className="msg is-assistant">
        <p>🔀 这一步决定文章结构：protocol 以设计与分析计划为主体；结果论文需要样本流程、基线表、效应量与讨论。若您暂无偏好，我可以按最可行的默认方案推进。</p>
        <p>还差一个关键信息：您目前是「干预还没做、要写研究方案（protocol）」还是「干预已做完、要把结果写成论文」？如果您对人群和干预形式已有设定，请直接在回复里补一句（例如：ADHD学龄儿童 + 家长团体培训 + 12周）。</p>
        <div className="ds-chat-prompts chat-replay-options">
          {[
            ["尚无数据", "写随机对照试验（RCT）研究方案"],
            ["尚无数据", "写准实验/前后对照研究方案（更易在单中心落地）"],
            ["已有数据", "已完成干预，写结果论文"],
            ["已有数据", "只是预试验/小样本，写 pilot 或可行性研究"],
            ["", "你按最可行的方案默认推进，我后续再调整"],
          ].map(([tag, title], index) => (
            <ConversationPrompt key={title} title={title} badge={tag} outlined selected={index === 4}/>
          ))}
        </div>
      </div>

      <div className="msg is-user"><div className="bubble">你按最可行的方案默认推进，我后续再调整</div></div>

      <Collapse label="查看执行过程（247 个步骤）" open={steps3} onToggle={() => setSteps3((open) => !open)}>
        <StepList items={["检索 WHO CST 与照护者培训证据", "完成样本量与效能计算", "绘制研究流程图与时间轴", "生成 DOCX / PDF 交付件并核查格式"]} />
      </Collapse>

      <div className="stage-progress">
        <span>阶段进展</span>
        <span className="stage-progress-bar"><span style={{ width: "100%" }} /></span>
        <button type="button" className="text-link" onClick={() => onToast("展开过程总结")}>查看过程总结</button>
      </div>

      <div className="msg is-assistant msg-doc">
        <p>按照默认方案，我已经完成一份可直接修改后投稿的 <strong>研究方案（study protocol）</strong>，并不是结果论文。核心设计如下：</p>
        <ul>
          <li>单中心、前瞻性、非随机同期对照的准实验研究</li>
          <li>160对亲子（干预组80对、对照组80对），4个波次</li>
          <li>12周FETM方案：6次照护者团体课程 + 4次远程个体教练 + 12周数字微课/行为日记 + 1次服务协调与家庭健康计划，另可选2次同伴支持</li>
          <li>主要结局：12周PSOC效能感维度；24周随访观察维持效应</li>
          <li>分析：ITT、线性混合效应模型、多重插补、IPTW、E值、敏感性分析及过程评价</li>
          <li>报告规范：TREND + TIDieR</li>
        </ul>
        <p className="doc-h">交付文件</p>
        <ul>
          <li>FETM_神经发育障碍家庭健康管理_研究方案.docx：可编辑全文，20页、约1.37万字、6张表、3幅图、37条参考文献</li>
          <li>FETM_神经发育障碍家庭健康管理_研究方案.pdf：排版预览版</li>
          <li>graphical_abstract.png：图文摘要</li>
          <li>使用说明与待确认清单.md：待填信息、参数调整建议、审稿人可能质疑点及投稿建议</li>
          <li>FETM_论文交付包.zip：以上文件及3幅图的打包版</li>
        </ul>
        <p className="doc-h">需要您补充或确认</p>
        <ol>
          <li>医院/科室全称、作者与单位、通信作者、基金项目</li>
          <li>伦理批件号、ChiCTR注册号</li>
          <li>交通补助金额</li>
          <li>是否已有授权的中文版FES；如没有，按方案在预试验中完成翻译与信效度检验</li>
          <li>目标期刊（决定摘要长度、参考文献格式和图表数量）</li>
        </ol>
        <p className="doc-h">两点提醒</p>
        <ul>
          <li>非随机设计、照护者自报结局、单中心来源是本文的主要局限，文中已在“3.4 局限性与风险控制”中正面讨论，并给出盲法评估、协变量调整、IPTW、E值和敏感性分析等控制措施。</li>
          <li>如果您实际上 <strong>已经有干预数据</strong>，这篇文章应改为结果论文，结构需换成样本流程、基线表、结局表、效应量和讨论；届时我可以按同一分析计划帮您重跑并改写。</li>
        </ul>
        <p>下一步我也可以按目标期刊重新排版、压缩摘要、写cover letter，或把方案改写成开题报告/伦理申请书。</p>

        <div className="file-grid">
          {files.map(([name, type]) => (
            <FileCard key={name} name={name} type={type} onToast={onToast} delivery={delivery} />
          ))}
        </div>
      </div>
    </ChatFrame>
  );
}

const RECOMMENDATIONS = [
  ["基金申报", "撰写具体研究目标", "为基金申请撰写包含重要性和研究路径的 Specific Aim", "96%"],
  ["基金申报", "撰写研究计划", "梳理研究假设、方法、时间表和预期结果", "95%"],
  ["基金申报", "基金申报书审核", "审核基金申报书，提出可行的修改意见。", "94%"],
  ["基金申报", "撰写研究意义部分", "阐明拟开展研究的重要性和潜在影响", "93%"],
  ["基金申报", "撰写创新性部分", "说明拟采用研究路径的创新点", "92%"],
  ["基金申报", "撰写预算说明", "为基金申请撰写预算依据和经费说明", "86%"],
];

const TODOS = [
  "读取真实 workflow 目录与路径模板",
  "筛选与国自然基金申报相关的候选 workflow 并核对字段",
  "按契约输出 workflow-recommendations JSON 并记录缺失能力",
];

export function WorkflowAssistantChat({ onOpenWorkflow, onToast }) {
  const [model, setModel] = useState("SHUYU Flash");
  const [side, setSide] = useState(() => window.innerWidth > 767);
  const [steps, setSteps] = useState(false);
  const [summary, setSummary] = useState(false);

  return (
    <ChatFrame
      title="工作流推荐助手"
      model={model}
      onModelChange={setModel}
      sideOpen={side}
      onToggleSide={() => setSide((open) => !open)}
      placeholder="描述您的科研需求，例如：国自然基金申报应该按什么顺序组合工作流？"
      onToast={onToast}
      side={{
        title: "待办事项",
        content: (
          <>
            <ol className="todo-list">
              {TODOS.map((item) => <li key={item}>{item}</li>)}
            </ol>
            <div className="side-sep" />
            <div className="side-files">
              <div className="side-empty">未选择文件<p>选择文件以查看详情</p></div>
            </div>
          </>
        ),
      }}
    >
      <Collapse label="查看执行过程（21 个步骤）" open={steps} onToggle={() => setSteps((open) => !open)}>
        <StepList items={["读取 workflow 目录", "匹配国自然基金申报相关能力", "核对推荐度与输入字段"]} />
      </Collapse>

      <div className="msg is-assistant">
        <p>国家自然科学基金申报建议按「研究目标—研究意义—研究计划—创新性—预算—整体审核」的顺序组合执行，各环节可复用同一研究主题逐段成文。</p>

        <div className="coverage-note">
          <span className="badge badge-amber">系统暂未覆盖</span>
          <p>当前系统目录里没有找到可直接覆盖「国自然申请代码与科学问题属性选择、形式审查自查（限项、签字盖章、附件清单）」的独立 workflow，建议在正式提交前人工核对基金委当年度项目指南与形式审查要求。</p>
        </div>
        <div className="coverage-note">
          <span className="badge badge-amber">系统暂未覆盖</span>
          <p>当前系统目录里没有找到可直接覆盖「研究基础与前期工作基础、可行性分析专门撰写」的独立 workflow，该部分内容需由申请人结合既往成果自行撰写，可参考研究意义、创新性与风险缓解相关内容组织。</p>
        </div>

        <div className="rec-list">
          {RECOMMENDATIONS.map(([cat,title,desc])=><SkillCard key={title} item={{id:title,name:title,description:desc,category:cat,kind:'skill',score:null,verified:false,icon:'file',tone:'blue',online:true,previewExclusive:title==='基金申报书审核'}} context="chat" onDetail={()=>onOpenWorkflow?.(title)} onCall={()=>onOpenWorkflow?.(title)}/>)}
        </div>

        <FollowUpQuestions outlined
          questions={["撰写具体研究目标需要我准备哪些信息和材料？", "研究意义、研究计划、创新性和预算应按什么顺序推进？", "申报书审核环节需要上传哪些文件、会给出什么意见？"]}
          onChoose={question => onToast("已选择：" + question)}/>
        <button type="button" className="collapse-row small" aria-expanded={summary} onClick={() => setSummary((open) => !open)}>
          查看过程总结 <ChevronDown size={14} className={summary ? "rot" : ""} />
        </button>
        {summary ? <div className="summary-box">已核对 21 个步骤：读取目录、匹配能力、按契约生成推荐清单并标注缺失能力。</div> : null}
      </div>
      <span className="sr-only"><Sparkles size={1} /><FolderPlus size={1} /><Eye size={1} /></span>
    </ChatFrame>
  );
}

