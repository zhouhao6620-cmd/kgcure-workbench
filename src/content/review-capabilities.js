export const EVALUATION_PATH = '/workspace/evaluation-standards';

export const certifiedEvaluationLabel = '已通过KGcure评测认证';
export const missingEvaluationLabel = '暂无评测认证信息';

export function hasEvaluationCertification(item) {
  return item?.verified === true || (item?.demo === true && item.previewCertified === true);
}

export const REVIEW_CAPABILITIES = [
  {
    id: 'sci-paper-evidence-review',
    kind: 'skill',
    previewExclusive: true,
    name: 'SCI 论文精读与证据核验 Skill',
    description: '拆解论文方法与结果，将结论回溯至正文、图表和补充材料。',
    category: '文献阅读与证据核验',
    group: '文献检索与阅读',
    icon: 'book',
    tone: 'blue',
    demo: true,
    online: true,
    score: 4.7,
    previewCertified: true,
    sourceLabel: '设计样例',
    steps: [],
    fields: [
      { label: '研究问题', required: true, description: '说明需要核验的论文结论或关键指标。' },
      { label: '论文出处', required: false, description: '提供 DOI、标题或可定位的文献来源。' },
    ],
    materials: '论文正文及相关图表、附表。若有重点段落或核验目标，可随材料一并说明。',
    output: '论文精读报告与证据核验清单',
    deliverables: '论文精读报告与证据核验清单',
    reviewCases: ['免疫治疗临床研究全文精读', '心血管试验效果指标回源核对', '临床队列论文局限性提炼', '临床研究森林图与附表联合解读'],
  },
  {
    id: 'research-topic-feasibility',
    kind: 'agent',
    name: '科研选题可行性预研 Agent',
    description: '围绕研究设想梳理文献、数据和方法条件，形成可行性判断与方案框架。',
    category: '科研选题与方案设计',
    group: '科研选题与方案设计',
    icon: 'workflow',
    tone: 'violet',
    demo: true,
    online: true,
    steps: ['确认研究方向', '调研文献与证据', '比较候选选题', '评估可行性', '整理方案与报告'],
    coreAbilities: [
      ['network', '问题拆解与范围定义'],
      ['database', '文献与数据条件核查'],
      ['target', '候选课题比较优选'],
      ['files', '立项成果打包'],
    ],
    preparationCount: '1–3',
    estimatedMinutes: 6,
    fields: [
      { label: '研究问题', required: true, description: '说明计划研究的问题、目标和范围。' },
      { label: '已有条件', required: false, description: '列出可用数据、已有文献或研究约束。' },
    ],
    materials: '研究设想或问题描述。可补充候选数据源、参考文献与团队已有材料。',
    output: '选题可行性报告与研究方案框架',
    deliverables: '选题可行性报告与研究方案框架',
    reviewCases: ['公共数据库肿瘤预后方向预研', '临床干预效果选题可行性分析', '饮食炎症相关研究方向比较', '临床研究课题方案框架整理'],
  },
];
