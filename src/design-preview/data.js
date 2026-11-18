export const HOME_COPY = {
  home: { label: "创建新任务", title: "从一个问题，到真正的科研成果", description: "专为学术科研打造的一站式AI工作台，把证据、选题、设计、分析、科研产出和完整项目连接起来" },
  evidence: { label: "循证搜索", title: "从临床疑问到高质量证据，精准循证搜索", description: "分为四大专项检索类型：主题文献、选题查新、前沿研究与指南共识，智能拆解 PICO、核验学术创新、捕捉最新预印本与对比权威指南。" },
  topic: { label: "科研选题", title: "从临床问题到创新课题，聚焦科研方向", description: "涵盖交叉创新、灵感风暴、学术全景、前沿追踪、科学问题凝练与假说论证，智能切换引导提示词，内嵌标杆范例即选即用。" },
  grant: { label: "基金申报", title: "从立项构想到标书完善，提升申报质量", description: "覆盖国自然、科技部重大专项与省市课题全周期，涵盖研究计划、核心内容、实施可行性、支撑材料与专家级评审把关。" },
  drawing: { label: "科研绘图", title: "从科研数据到专业图表，让研究成果清晰呈现", description: "" },
};

export const MODELS = [
  { id: "pro", name: "Shuyu Pro", description: "适合复杂推理与多步骤科研任务" },
  { id: "flash", name: "Shuyu Flash", description: "适合快速问答、改写与内容总结" },
  { id: "image", name: "Shuyu Image", description: "用于科研图片的生成与修改" },
];

// All evaluation and availability fields below are explicit preview fixtures.
export const SKILLS = [
  { id: "literature", kind: "skill", name: "文献智能检索", description: "检索相关研究，整理可追溯的文献证据。", category: "文献检索", icon: "book", tone: "blue", score: 4.8, verified: true, reviewed: true, community: true, online: true, usage: 2480 },
  { id: "statistics", kind: "skill", name: "通用统计分析", description: "选择统计方法，整理规范的结果与图表。", category: "统计分析", icon: "chart", tone: "violet", score: 4.7, verified: true, reviewed: true, community: false, online: true, usage: 1860 },
  { id: "writing", kind: "skill", name: "学术论文润色", description: "优化论文语言表达，保留原意与专业术语。", category: "论文写作", icon: "pen", tone: "teal", score: 4.6, verified: false, reviewed: true, community: true, online: true, usage: 3200 },
  { id: "grant-review", kind: "skill", name: "基金申报书审核", description: "从创新性与可行性出发，提出修改建议。", category: "基金申报", icon: "file", tone: "sand", score: null, verified: false, reviewed: false, community: true, online: false, usage: 0 },
];

export const AGENTS = [
  { id: "review-agent", kind: "agent", name: "系统评价与 Meta 分析", description: "从研究问题出发，组织证据与分析流程。", category: "文献研究", icon: "workflow", tone: "blue", online: true, steps: ["场景确认", "文献调研", "选题推荐", "可行性评估", "方案生成", "报告生成"], output: "证据汇总与分析报告" },
  { id: "paper-agent", kind: "agent", name: "完整论文初稿生成", description: "围绕研究资料，组织可复核的论文初稿。", category: "论文写作", icon: "file", tone: "teal", online: true, steps: ["整理资料", "规划结构", "撰写初稿", "核对引用"], output: "论文初稿与参考文献" },
  { id: "grant-agent", kind: "agent", name: "科研基金申报", description: "把研究构想整理为结构完整的申报材料。", category: "基金申报", icon: "award", tone: "sand", online: true, steps: ["明确目标", "研究设计", "撰写材料", "检查完善"], output: "申请书与研究方案" },
];

export const ALL_CAPABILITIES = [...SKILLS, ...AGENTS];
export const INITIAL_SPACES = [{ id: "personal", name: "个人会话" }, { id: "clinical", name: "临床研究课题组" }, { id: "meta", name: "Meta 分析课题" }];
export const EXAMPLE_PROMPT = "我想研究 GLP-1 受体激动剂与心血管结局，先帮我整理研究问题，再推荐合适的科研能力。";
export const INITIAL_HISTORY = [
  { id: "example", title: "GLP-1 与心血管结局研究" },
  { id: "statistics-example", title: "临床研究统计分析" },
  { id: "grant-example", title: "基金申报书结构讨论" },
];

export function demoMessages(text = EXAMPLE_PROMPT) {
  return [
    { id: "example-user", role: "user", text, model: "pro", attachments: [] },
    { id: "example-intent", role: "assistant", type: "intent", topic: text },
  ];
}

export function makePreviewFile(topic = EXAMPLE_PROMPT, steps = AGENTS[0].steps) {
  return { name: "研究问题与任务说明_示例.md", content: `# 研究问题与任务说明\n\n> 设计规范预览中的示例文件，不是真实模型生成或文献检索结果。\n\n## 研究主题\n\n${topic}\n\n## 建议的任务步骤\n\n${steps.map((step,index)=>`${index+1}. ${step}`).join("\n")}\n` };
}
