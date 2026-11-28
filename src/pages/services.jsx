import { sitePath } from "../site-path.js";
import { Badge } from "../components.jsx";
import { useState } from "react";
import {
  ArrowUp,
  ChevronDown,
  Image as ImageIcon,
  Palette,
  Paperclip,
  Sparkles,
} from "lucide-react";
import { BoundComposer } from "../design-system/BoundComposer.jsx";
import { HighlightedTitle } from "../design-system/Typography.jsx";
import { Pagination } from "../design-system/Pagination.jsx";
import "../design-system/drawing.css";
import { DrawingControls } from "../design-system/DrawingControls.jsx";
import { BusinessCases, TaskCaseGallery } from "../design-system/BusinessCases.jsx";
import { CaseCoverCard } from "../design-system/CaseCoverCard.jsx";
import { evidenceCases } from "../cases/evidence.js";
import { topicCases } from "../cases/topic.js";
import { grantCases } from "../cases/grant.js";

const SERVICES = {
  evidence: {
    title: "从临床疑问到高质量证据，精准循证搜索",
    subtitle:
      "分为四大专项检索类型：主题文献、选题查新、前沿研究与指南共识，智能拆解 PICO、核验学术创新、捕捉最新预印本与对比权威指南。",
    tabs: ["主题文献", "选题查新", "前沿研究", "指南共识"],
    placeholders: {
      主题文献:
        "输入临床疑问 (PICO) 或科研主题，例如：Comparative Efficacy of Biologics for Patients with Severe Eosinophilic Asthma: A Network Meta-analysis...",
      选题查新: "输入拟申报的课题名称或研究假说，例如：肠道菌群代谢物与术后认知功能障碍的关联及机制研究...",
      前沿研究:
        "输入关注的专业方向，例如：SGLT2 抑制剂在心肾保护领域近六个月的高质量研究与预印本...",
      指南共识: "输入疾病领域与关注问题，例如：2 型糖尿病合并慢性肾脏病的多学会指南推荐差异...",
    },
    fieldLabel: "循证搜索研究需求",
    caseTitle: "典型检索案例",
    cases: evidenceCases,
  },
  topic: {
    title: "从临床问题到创新课题，聚焦科研方向",
    subtitle:
      "涵盖交叉创新、灵感风暴、学术全景、前沿追踪、科学问题凝练与假说论证，智能切换引导提示词，内嵌标杆范例即选即用。",
    tabs: ["发现研究方向", "设计创新选题", "明确问题假设"],
    placeholders: {
      发现研究方向:
        "输入目标疾病或核心研究方向，例如：CAR-T细胞治疗在实体瘤中的演进、SGLT2抑制剂心肾保护网络...",
      设计创新选题:
        "输入疾病领域与可用的数据资源，例如：基于院内 5 年随访数据，设计肿瘤免疫治疗应答预测的选题...",
      明确问题假设:
        "输入初步的研究想法，例如：想研究睡眠障碍与代谢综合征的关系，希望把问题收敛成可检验的假设...",
    },
    fieldLabel: "科研选题研究需求",
    caseTitle: "典型选题案例",
    cases: topicCases,
  },
  grant: {
    title: "从立项构想到标书完善，提升申报质量",
    subtitle:
      "覆盖国自然、科技部重大专项与省市课题全周期，涵盖研究计划、核心内容、实施可行性、支撑材料与专家级评审把关。",
    tabs: ["立项与核心内容撰写", "实施与可行性设计", "申报支撑材料", "申报审核与优化"],
    placeholders: {
      立项与核心内容撰写:
        "输入您的课题名称、申报类别与拟资助周期，例如：基于空间组学的肺纤维化微环境细胞演化机制研究计划...",
      实施与可行性设计:
        "输入研究方案与团队条件，例如：单中心前瞻性队列，2 年周期，可获取影像组学与随访数据...",
      申报支撑材料:
        "输入需要准备的支撑材料，例如：研究基础、前期工作、伦理批件、预实验数据与图表说明...",
      申报审核与优化:
        "粘贴申报书摘要或正文片段，例如：请从创新性、可行性、科学问题属性三个维度提出修改意见...",
    },
    fieldLabel: "基金申报研究需求",
    caseTitle: "典型申报案例",
    cases: grantCases,
  },
};

export function ServicePage({ kind, onToast, onStart, onDemo, showCaseType = false }) {
  const config = SERVICES[kind];
  const [tab, setTab] = useState(config.tabs[0]);
  const [value, setValue] = useState("");

  const placeholder = config.placeholders[tab] || config.placeholders[config.tabs[0]];

  return (
    <div className="view svc-view">
      <div className="svc-hero">
        <h1 className="svc-title"><HighlightedTitle>{config.title}</HighlightedTitle></h1>
        <p className="svc-sub ds-one-line" title={config.subtitle}>{({evidence:'检索文献、核对证据，找到可靠的科研依据。',topic:'从临床问题出发，发现方向、凝练问题与研究假设。',grant:'覆盖标书撰写、方案论证与申报审核。'})[kind]}</p>

        <div className="svc-tabs sp-filter-chips" role="tablist" aria-label="检索类型">
          {config.tabs.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              className={"sp-filter" + (tab === item ? " is-active" : "")}
              onClick={() => setTab(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <BoundComposer value={value} onChange={setValue} placeholder={placeholder} inputLabel={config.fieldLabel} onToast={onToast} showCapabilities={false} showSpace={false} onSubmit={data=>onStart({...data,origin:{scene:kind,task:tab}})}/>
        <p className="svc-disclaimer">内容由AI生成，仅供参考</p>
      </div>

      {onDemo ? <TaskCaseGallery onOpenCase={onDemo}/> :
        <BusinessCases title={config.caseTitle} cases={config.cases} kind={kind} showCaseType={showCaseType}/>}
    </div>
  );
}

const DRAW_CASES = [
  { file: "M01", cat: "医学机制图", title: "FSP1–维生素K抑制铁死亡", desc: "呈现经典维生素K循环与抗铁死亡非经典循环之间的联系。" },
  { file: "M02", cat: "医学机制图", title: "铜死亡与线粒体蛋白聚集", desc: "展示铜离子、脂酰化蛋白聚集与铜死亡的关键关系。" },
  { file: "M03", cat: "医学机制图", title: "NLRP3炎症小体组装与激活", desc: "区分预激、复合体组装及炎症因子成熟三个阶段。" },
  { file: "M04", cat: "医学机制图", title: "cGAS–STING调控肿瘤免疫", desc: "呈现肿瘤、抗原呈递细胞及免疫细胞之间的信号联系。" },
  { file: "S01", cat: "医学示意图", title: "血脑屏障的分层结构", desc: "通过血管截面说明内皮、周细胞与星形胶质细胞足突的空间关系。" },
  { file: "S02", cat: "医学示意图", title: "外泌体形成、释放与摄取", desc: "展示供体细胞、多囊泡体、外泌体以及受体细胞的连接过程。" },
  { file: "S03", cat: "医学示意图", title: "CAR-T治疗的五类主要挑战", desc: "用五个独立场景展示抗原逃逸、脱靶组织、浸润和免疫抑制等问题。" },
  { file: "S04", cat: "医学示意图", title: "mRNA药物研发与生产流程", desc: "从序列设计和体外转录到载体包封、评价及临床研究。" },
  { file: "G01", cat: "图文摘要", title: "CAR/CCR双信号识别淋巴瘤", desc: "对比传统CD19 CAR与CAR/CCR组合的活性和选择性。" },
  { file: "G02", cat: "图文摘要", title: "一步法mRNA CAR-T细胞制备", desc: "对比激活磁珠多步骤流程与激活型脂质纳米颗粒一步流程。" },
  { file: "G03", cat: "图文摘要", title: "肥胖脂肪组织与代谢健康图谱", desc: "汇总MHO/MUO队列、脂肪组织测序与细胞类型相关发现。" },
  { file: "G04", cat: "图文摘要", title: "运动与外周组织代谢适应", desc: "比较肥胖/T2D与运动对脂肪、骨骼肌和肝脏的影响。" },
  { file: "P01", cat: "其他", title: "RECOVERY阿司匹林试验入组流程", desc: "重绘从筛选、随机分配到28天意向性分析的真实试验流程。" },
  { file: "I01", cat: "其他", title: "肺部CT随病程变化的三时点对照", desc: "保留真实影像，整理第4、8、14天CT对照与简短说明。" },
  { file: "D01", cat: "其他", title: "2000与2017年儿童死亡率空间对照", desc: "对比99个中低收入国家二级行政区的5岁以下儿童死亡率。" },
  { file: "T01", cat: "其他", title: "mRNA治疗技术发展里程碑", desc: "根据2022年综述梳理从mRNA发现到疫苗临床应用的关键节点。" },
  { file: "F01", cat: "其他", title: "衰老的十类特征与三个层级", desc: "将该文的十类衰老特征按分子、细胞和系统层级组织。" },
  { file: "C01", cat: "其他", title: "疫情科研仪表盘历史快照", desc: "保留论文中日期、筛选区、韩国行政区地图和病例色阶的关系。" },
];

const DRAW_CATS = ["全部", "医学机制图", "医学示意图", "图文摘要", "其他"];

export function DrawingPage({ onOpenChat, onToast, onStart, showCaseType = false }) {
  const [cat, setCat] = useState("全部");
  const [drawingType,setDrawingType]=useState("自由绘图");
  const [page,setPage]=useState(1);
  const [ratio, setRatio] = useState("自动");
  const [format, setFormat] = useState("自动");
  const [color, setColor] = useState("自动");
  const [style, setStyle] = useState("自动");
  const [lang, setLang] = useState("自动");
  const [bg, setBg] = useState("自动");
  const [value, setValue] = useState("");

  const list = cat === "全部" ? DRAW_CASES : DRAW_CASES.filter((item) => item.cat === cat);
  const pageCount=Math.ceil(list.length/9),current=Math.min(page,Math.max(1,pageCount));
  const visible=list.slice((current-1)*9,current*9);

  return (
    <div className="view draw-view">
      <div className="draw-hero">
        <h1 className="draw-title"><HighlightedTitle>从科研数据到专业图表，让研究成果清晰呈现</HighlightedTitle></h1>
        <p className="svc-sub ds-one-line" title="描述研究内容，绘制机制图、医学示意图与图文摘要。">描述研究内容，绘制机制图、医学示意图与图文摘要。</p>
        <div className="ds-drawing-studio">

        <DrawingControls values={{ratio,format,color,style,lang,bg}} onChange={(key,value)=>({ratio:setRatio,format:setFormat,color:setColor,style:setStyle,lang:setLang,bg:setBg})[key](value)}/>
        <BoundComposer value={value} onChange={setValue} placeholder="描述想绘制的科研图片" inputLabel="描述想绘制的科研图片" initialModel="image" showCapabilities={false} showSpace={false} onToast={onToast} onSubmit={data=>onStart({...data,origin:{scene:'drawing',configuration:{drawingType,ratio,format,color,style,lang,bg}}})}/>
        <div className="ds-drawing-modes" role="tablist" aria-label="绘图类型">{[['自由绘图','P01'],['医学机制图','M01'],['医学示意图','S01'],['图文摘要','G01']].map(([label,file])=><button type="button" role="tab" aria-selected={drawingType===label} key={label} onClick={()=>setDrawingType(label)}><span><img src={sitePath('/cases/'+file+'.webp')} alt=""/></span>{label}</button>)}</div>
        </div>
      </div>

      <section className="draw-gallery" aria-labelledby="drawing-case-heading">
        <div className="ds-drawing-gallery-heading">
          <h2 id="drawing-case-heading" className="ds-case-gallery-title">典型绘图案例</h2>
          <div className="sp-sort ds-drawing-case-filters" role="group" aria-label="绘图案例分类">
            {DRAW_CATS.map(item => (
              <button type="button" key={item} aria-pressed={cat === item}
                className={cat === item ? 'is-active' : undefined}
                onClick={() => { setCat(item); setPage(1); }}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="ds-image-case-grid">
          {visible.map(item => <CaseCoverCard key={item.file} title={item.title}
            image={sitePath(`/cases/${item.file}.webp`)}
            category={showCaseType ? (item.cat === '其他' ? '科研绘图' : item.cat) : undefined}/>)}
        </div>
        <Pagination page={current} total={pageCount} onChange={setPage} label="绘图案例分页"/>
      </section>

      {ratio || format || color ? null : null}
      <span className="sr-only">
        <ImageIcon size={1} />
        <Palette size={1} />
        <Sparkles size={1} />
        <Badge>0</Badge>
      </span>
    </div>
  );
}

function ConfigRow({ label, options, value, onChange, last }) {
  return (
    <div className={"config-row" + (last ? " is-last" : "")}>
      <span className="config-label">{label}</span>
      <div className="config-options">
        {options.map((item) => (
          <button key={item} type="button" className={"config-option" + (value === item ? " is-active" : "")} onClick={() => onChange(item)}>
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

