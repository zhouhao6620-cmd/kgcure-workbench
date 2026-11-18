import { sitePath } from "../site-path.js";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ChevronDown,
  BarChart3,
  Workflow,
  BookOpen,
  Building2,
  CheckCircle2,
  Database,
  GraduationCap,
  Languages,
  Microscope,
  ShieldCheck,
  Stethoscope,
  Target,
  Search,
  Compass,
  ClipboardCheck,
} from "lucide-react";

import { Button, SkillCard, AgentCard } from "../design-preview/components.jsx";
import { BoundComposer } from "../design-system/BoundComposer.jsx";
import { CaseGallery } from "../design-preview/ConversationPatterns.jsx";
import { HOME_COPY } from "../design-preview/data.js";
import "../design-system/landing.css";
import { LanguageOptions, useLanguagePreference } from '../design-system/LanguageOptions.jsx';
import { BUSINESS_SKILLS, BUSINESS_AGENTS, capabilityPath } from "../content/catalog.js";
import { BusinessCases } from "../design-system/BusinessCases.jsx";

const NAV = [
  ["可信科研", "trust"],
  ["合作案例", "partners"],
  ["为你而来", "roles"],
];

const EXAMPLES = [
  "GLP-1RA 能降低心血管风险吗？",
  "帮我精读这篇 Nature Medicine 论文",
  "糖尿病再入院风险值得研究吗？",
  "术前营养和术后并发症怎么研究？",
  "600 例肝癌数据怎么做生存分析？",
  "这份国自然申请书还有哪些问题？",
];

const TRUST = [
  {
    title: "结论有出处，证据可核验",
    desc: "不只核对“有没有这篇论文”，更要核对“它是否支持这个结论”。关键判断关联证据与原始来源，研究分歧和适用边界明确呈现，不用一串引用代替核验。",
    chips: ["结论与原文对照", "DOI / PMID 溯源", "研究分歧提示", "证据边界标注"],
  },
  {
    title: "方法有依据，分析可复核",
    desc: "不只给你一张图、一个 P 值，更让你说清结果怎么来的。方法怎么选、数据怎么处理、参数怎么设、结论能说到哪，与分析结果一起交付可复核的依据。",
    chips: ["缺失数据插补", "模型偏倚审计", "方法参数复核", "分析记录回查"],
  },
  {
    title: "过程看得见，关键决策你做主",
    desc: "不必逐步指挥 AI，也不把课题交给黑箱。任务推进中看见阶段成果，遇到重要方案由你确认；需要调整方向、补充材料或停止执行，主动权始终在你。",
    chips: ["阶段成果先看", "关键方案确认", "执行中途调整", "任务停止重试"],
  },
  {
    title: "科研空间，让课题可视化管理",
    desc: "课题做了几个月，不该每次打开都从头交代。阶段成果、已确认方案与历史版本集中管理，看清做到哪、用哪版、下一步做什么。",
    chips: ["课题进展总览", "已确认成果归集", "当前与历史版本", "下一步任务续接"],
  },
];

const PARTNERS = [
  ["四川大学华西医院", "南方医科大学", "扬子江药业集团有限公司", "郑州大学第一附属医院", "罗氏诊断产品（上海）有限公司", "成都医学院", "河南省人民医院", "江苏恒瑞医药股份有限公司"],
  ["蚌埠医科大学", "重庆医科大学附属第一医院", "欧姆龙健康医疗（中国）有限公司", "德阳数据交易所", "南方医科大学深圳医院", "正大天晴药业", "重庆医科大学", "南方医院"],
  ["浙江核力欣健药业有限公司", "珠江医院", "四川大学", "中山大学肿瘤防治中心黄埔院区", "北京国际大数据交易所", "郑州大学", "杭州惠每医疗科技有限公司", "湖北省人民医院"],
  ["成都市二医院", "雄安新区城市可信数据空间", "中山大学", "四川省妇幼医院", "四川厌氧生物科技有限公司", "深圳宝安人民医院", "河南科技大学", "武汉协和医院"],
];

const LAND_CASES = [
  ["国自然基金申报", "Graves病抗甲状腺药物治疗后复发的机制、风险预测与干预策略研究", "内分泌科", "解析Graves病治疗后复发相关机制，构建风险预测模型，探索风险分层与个体化干预策略。"],
  ["临床预测模型", "非小细胞肺癌患者ALK-TKI治疗后肝功能异常预测与风险分层模型", "肿瘤科", "基于临床真实世界数据，识别肝功能异常相关风险因素，构建预测模型与风险分层工具。"],
  ["医疗数据集", "镇痛镇静多中心真实世界数据集建设", "麻醉科", "建立多中心镇痛镇静标准化数据体系，开展数据治理与质量评价，形成可持续复用的真实世界科研数据集。"],
];

const ROLES = [
  ["医学生", "从读懂文献，", "到真正做自己的课题", "从文献阅读、选题开题，到研究设计、数据分析和论文写作，数愈把零散科研任务串成一条完整路径，帮助你逐步建立独立科研能力，并把研究推进到可用成果。", ["文献精读", "论文翻译", "选题探索", "研究设计", "数据分析", "论文写作"]],
  ["临床医生", "把临床中的问题，", "变成可以研究的科研项目", "一个病例现象、一组临床数据、一个反复出现的问题，都可能成为科研起点。数愈帮助你先查证据、判断价值，再推进研究设计、数据分析和论文产出。", ["循证搜索", "临床选题", "回顾性研究", "预测模型", "数据分析"]],
  ["科室主任", "从看一个课题，", "到推进一个科室的科研成果", "不只是自己做科研，更要判断方向、审核方案、推进项目和沉淀成果。数愈帮助你从单个课题评审延伸到基金申报、项目进展和科室科研资产管理。", ["前沿扫描", "课题评审", "基金申报", "科研项目", "科研空间"]],
];

export function LandingPage({ onLogin }) {
  const [value, setValue] = useState("");
  const [languageOpen,setLanguageOpen]=useState(false);
  const [language,setLanguage]=useLanguagePreference();
  const languageRoot=useRef(null),languageTrigger=useRef(null);
  useEffect(()=>{if(!languageOpen)return;const outside=e=>{if(!languageRoot.current?.contains(e.target))setLanguageOpen(false);};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);},[languageOpen]);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="landing sp-design-app ds-public">
      <header className="land-head">
        <a className="land-logo" href="#top" onClick={(event) => { event.preventDefault(); scrollTo("top"); }}><img src={sitePath("/design-preview/kgcure-logo.png")} alt="KGcure"/></a>
        <nav className="land-nav">
          {NAV.map(([label, id]) => (
            <button key={id} type="button" onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </nav>
        <div className="land-head-actions">
          <div className="ds-public-language" ref={languageRoot} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setLanguageOpen(false);}}><button ref={languageTrigger} type="button" className="lang-switch" aria-label="Language" aria-haspopup="menu" aria-expanded={languageOpen} onClick={()=>{setLanguageOpen(v=>!v);requestAnimationFrame(()=>languageRoot.current?.querySelector('[role=menuitemradio][aria-checked=true]')?.focus());}}><Languages size={18}/><span>{language==='English'?'English':'中文'}</span><ChevronDown size={14}/></button>{languageOpen&&<LanguageOptions language={language} onClose={()=>{setLanguageOpen(false);languageTrigger.current?.focus();}} onSelect={item=>{setLanguage(item);setLanguageOpen(false);languageTrigger.current?.focus();}}/>}</div>
          <Button variant="primary" onClick={()=>onLogin()}>登录 / 注册</Button>
        </div>
      </header>

      <main id="top" className="land-main">
        <section className="land-hero">
          <div className="land-hero-decoration" aria-hidden="true">
            <svg className="land-hero-art is-left" viewBox="0 0 320 400" fill="none"><path d="M-85 280C90 440 325 258 226 97C170 4 53 35 51 130C48 250 240 289 313 180"/><path d="M-46 301C111 447 322 273 254 111C215 21 92 0 24 60"/><path d="M71 183 136 129 210 158 238 230 174 284 100 255Z"/><circle cx="71" cy="183" r="5"/><circle cx="210" cy="158" r="5"/></svg>
            <svg className="land-hero-art is-right" viewBox="0 0 320 400" fill="none"><path d="M375 23C233-59 67 56 87 188C102 286 270 362 352 251"/><path d="M390 7C242-95 25 47 64 209C99 351 301 387 370 278"/><path d="m82 114 70-28 64 42 2 73-72 27-63-42Z"/><circle cx="82" cy="114" r="4"/><circle cx="216" cy="128" r="4"/></svg>
          </div>
          <h1>从一个问题，<br/>到真正的<span className="sp-title-accent">科研成果</span></h1>
          <p>{HOME_COPY.home.description}</p>
          <div className="land-golden-composer"><BoundComposer value={value} onChange={setValue} placeholder="描述你的科研问题，或补充已有的研究想法…" showCapabilities={false} showSpace={false} onSubmit={data=>{try{sessionStorage.setItem('kgcure-landing-draft',value);sessionStorage.setItem('kgcure-landing-payload',JSON.stringify(data));}catch{}onLogin();}}/></div>
          <div className="land-examples">
            {EXAMPLES.map((item,index) => (
              <button key={item} type="button" onClick={() => setValue(item)}>{[<Search size={16}/>,<BookOpen size={16}/>,<Compass size={16}/>,<Workflow size={16}/>,<BarChart3 size={16}/>,<ClipboardCheck size={16}/>][index]}<span>{item}</span></button>
            ))}
          </div>

          <div className="land-stats">
            {[["3000 +", "一线三甲医生验证"], ["5800 +", "科研成果交付"], ["258 +", "医学专业 Skill"], ["190 +", "科研工作流"]].map(([num, label]) => (
              <div key={label}><strong>{num}</strong><span>{label}</span></div>
            ))}
          </div>
        </section>



        <section id="trust" className="land-section trust-section">
          <div className="land-trust-intro"><h2><span className="sp-title-accent">别让1%的AI幻觉，</span><br />带偏整个科研课题</h2>
          <p className="land-lead">科研不能止于“看起来正确”。数愈将医学专业能力、证据核验与方法复核融入科研全过程，让关键判断有据可查、执行过程由你掌控、研究成果持续沉淀。</p></div>
          <div className="trust-grid">
            {TRUST.map((item, index) => (
              <article key={item.title} className="trust-card">
                <span className="trust-feature-icon">{index===0?<BookOpen size={24}/>:index===1?<BarChart3 size={24}/>:index===2?<Workflow size={24}/>:<Database size={24}/>}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="trust-chips">{item.chips.map((chip) => <span key={chip}>{chip}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="partners" className="land-section partner-section">
          <h2>医学人，正在用数愈做出成果</h2>
          <p className="land-lead">携手合作伙伴，让专业科研服务更多医学人。</p>
          <div className="partner-rows">
            {PARTNERS.map((row, index) => (
              <div key={index} className="partner-row">
                {row.map((name, i) => (
                  <span key={name + i} className="partner-chip" title={name}>{name}</span>
                ))}
              </div>
            ))}
          </div>
          <div className="land-case-grid">
            {LAND_CASES.map(([tag, title, dept, desc]) => (
              <article key={title} className="land-case">
                <span className="land-case-tag">{tag}</span>
                <h3>{title}</h3>
                <p><strong>{dept}</strong> {desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="roles" className="land-section roles-section">
          <h2>不同医学人科研角色，数愈都可以帮到你</h2>
          <p className="land-lead">从医学生到临床骨干，科室主任，从单个任务到完整课题，围绕不同科研阶段组合相应能力，把问题持续推进成可用成果。</p>
          <div className="role-cards">
            {ROLES.map((role, index) => (
              <article key={role[0]} className="role-card">
                <span className="role-icon"><img src={sitePath("/landing-art/role-"+["student","doctor","director"][index]+".png")} alt=""/></span>
                <h3>{role[0]}</h3>
                <p className="role-line"><span>{role[1]}</span><strong>{role[2]}</strong></p>
                <p className="role-desc">{role[3]}</p>
                <div className="role-chips">{role[4].map((chip,i) => <span key={chip}>{[<BookOpen size={16}/>,<Search size={16}/>,<Compass size={16}/>,<Workflow size={16}/>,<BarChart3 size={16}/>,<ClipboardCheck size={16}/>][i%6]}{chip}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="land-section land-capabilities"><div className="land-section-heading"><h2>把研究任务，交给合适的<span className="sp-title-accent">专业能力</span></h2><p className="land-lead">单项任务使用 Skill，多步骤任务交给 Agent。</p></div><div className="land-capability-heading">科研 Skill</div><div className="sp-three-skills sp-recommendation-grid">{BUSINESS_SKILLS.filter(x=>["1042","1028","1003"].includes(x.id)).map(item=><SkillCard key={item.id} item={item} onDetail={item=>onLogin(capabilityPath(item))} onCall={item=>onLogin(capabilityPath(item))}/>)}</div><div className="land-capability-heading"><img src={sitePath("/design-preview/agent-robot.webp")} alt=""/>科研 Agent</div><div className="sp-two-agents">{BUSINESS_AGENTS.filter(x=>["35a3e188211447888f499c11d0b90345","1001"].includes(x.id)).map(item=><AgentCard key={item.id} item={item} onDetail={item=>onLogin(capabilityPath(item))} onCall={item=>onLogin(capabilityPath(item))}/>)}</div><p className="land-sample-note">能力内容取自数愈线上目录，未取得正式评测记录的能力保留待评状态。</p><BusinessCases onChoose={item=>onLogin('/workspace/cases/'+item.id+'/'+item.cases[0].id)}/></section>

        <section className="land-contact">
          <div className="contact-services">
            {[
              ["机构科研合作", "医院 · 科室 · 药械企业", Building2],
              ["医疗数据与 RWD", "专病数据 · 真实世界数据", Database],
              ["知识产权与成果转化", "确权 · 登记 · 转化", ShieldCheck],
            ].map(([title, desc, Icon]) => (
              <div key={title} className="contact-item">
                <Icon size={18} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
          <div className="contact-main">
            <div>
              <span className="land-logo small"><img src={sitePath("/design-preview/kgcure-logo.png")} alt="KGcure"/></span>
              <p>联系邮箱</p>
              <a href="mailto:service@kgcure.com">service@kgcure.com</a>
            </div>
            <div className="qr-box">
              <span>企业微信</span>
              <div className="qr-placeholder">二维码</div>
            </div>
          </div>
          <div className="land-legal">
            <span>© 2025 四川数愈医疗科技有限公司</span>
            <span>蜀ICP备2025170029号-1</span>
            <span>川公网安备 51011502001029号</span>
          </div>
        </section>
      </main>

      <span className="sr-only"><BookOpen size={1} /><Microscope size={1} /><Target size={1} /><CheckCircle2 size={1} /></span>
    </div>
  );
}

