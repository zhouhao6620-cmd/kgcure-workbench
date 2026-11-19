// Demonstration material for reviewing the detail-page structure. These are
// fixed writing samples, not claims about a new live run or an independent audit.
export const skillEvaluationDossiers = {
  '59405ee32866425ab3ed47b790e2579e': {
    protocol: [
      ['样本范围', '2 组固定改写样本'],
      ['复核方式', '逐句对照原意与限定词'],
      ['演示日期', '2026-11-19'],
      ['数据状态', '演示评测'],
    ],
    constraints: [
      {
        label: '锁定事实',
        detail: '先圈出主体、对象、时间和任务状态，改写时逐项保留。',
        proof: '两批问卷、缺失值检查、周五前、计划执行',
      },
      {
        label: '删减套话',
        detail: '把“高效推进”“相关工作”等概括改回具体动作。',
        proof: '“开展数据质量管理工作”改为“检查缺失值”',
      },
      {
        label: '保留语气',
        detail: '区分计划、进行中和已完成，不把预期写成事实。',
        proof: '保留“将检查”，不改成“已完成检查”',
      },
      {
        label: '回查边界',
        detail: '保留证据强度和验证条件，不提升因果或确定性。',
        proof: '保留“初步”“可能”“仍需验证”',
      },
    ],
    samples: [
      {
        title: '可修复样本',
        task: '精简研究进度说明，保留事实与时间。',
        input: '团队计划就两批问卷数据开展缺失值相关的检查工作，并于周五之前完成对问题清单的汇总整理。',
        beforeLabel: '普通改写',
        beforeNote: '语言变顺了，但任务状态与具体范围被覆盖。',
        before: [
          { text: '团队已', flaw: '计划被写成已完成' },
          { text: '高效完成数据质量管理工作', flaw: '对象和检查项目被概括' },
          { text: '，并按计划推进后续事项。', flaw: '周五前汇总清单被省略' },
        ],
        after: [
          { field: '执行主体', value: '团队', source: 'source-1' },
          { field: '处理对象', value: '两批问卷数据', source: 'source-1' },
          { field: '具体动作', value: '检查缺失值', source: 'source-1' },
          { field: '截止时间', value: '周五之前', source: 'source-2' },
          { field: '后续交付', value: '汇总问题清单', source: 'source-2' },
          { field: '任务状态', value: '计划执行', source: 'source-1' },
        ],
        output: '团队将检查两批问卷的缺失值，并在周五前汇总问题清单。',
        green: '保留“两批”“周五前”和计划语气，删掉空泛概括后，动作、对象和交付仍然完整。',
        red: '改写可以改善表达，但不能替研究者核对问卷批次、问题清单和实际进度。',
        sources: {
          'source-1': {
            location: '输入原句 · 第 1 句',
            verified: '逐词对照通过',
            quote: '团队计划就两批问卷数据开展缺失值相关的检查工作',
            note: '主体、批次、检查项目与计划状态均来自这一句。',
          },
          'source-2': {
            location: '输入原句 · 后半句',
            verified: '逐词对照通过',
            quote: '并于周五之前完成对问题清单的汇总整理',
            note: '保留截止时间与交付物，只把名词化表达改成具体动作。',
          },
        },
      },
      {
        title: '失败边界',
        task: '精简初步结果，保留不确定性。',
        input: '初步分析提示 A 与 B 可能相关，结果仍需在独立样本中验证。',
        beforeLabel: '错误改写',
        beforeNote: '句子更简洁，但结论被过度确定。',
        before: [
          { text: '分析证实 A 会引起 B', flaw: '“相关”被改成“引起”' },
          { text: '，该结论可直接用于后续研究。', flaw: '“初步”“可能”和验证条件被删除' },
        ],
        after: [
          { field: '证据阶段', value: '初步分析', source: 'source-1' },
          { field: '关系措辞', value: 'A 与 B 可能相关', source: 'source-1' },
          { field: '后续条件', value: '在独立样本中验证', source: 'source-2' },
          { field: '因果判断', value: '未确认', source: 'source-1' },
        ],
        output: '初步分析提示 A 与 B 可能相关，仍需在独立样本中验证。',
        green: '保留“初步”“可能”“仍需验证”，没有把观察性关系提升为因果结论。',
        red: '这类改写必须人工复核。语言能力无法替研究者判断研究设计是否支持因果结论。',
        sources: {
          'source-1': {
            location: '输入原句 · 前半句',
            verified: '风险词已拦截',
            quote: '初步分析提示 A 与 B 可能相关',
            note: '证据强度与关系类型保持在原句范围内。',
          },
          'source-2': {
            location: '输入原句 · 后半句',
            verified: '验证条件已保留',
            quote: '结果仍需在独立样本中验证',
            note: '没有把待验证结果写成可直接应用的结论。',
          },
        },
      },
    ],
    dimensionEvidence: [
      {
        method: '两组样本逐句对照输入原文，检查主体、范围、时间、词义与任务状态。',
        data: '关键事实 11/11 项保留；计划被误写成完成的样本 0 条。',
        note: '表达更具体，但跨段衔接仍需作者复读。',
      },
      {
        method: '检查改写后是否仍包含原文的任务对象、截止时间和后续交付。',
        data: '两组样本均保留原任务的关键信息，没有新增未提供的事实。',
        note: '原文本身信息不足时，不要求模型用推测补齐。',
      },
      {
        method: '把每个改写字段回指到输入句，并检查是否存在无依据的新增内容。',
        data: '本次演示字段均能回到原句；模型不会自动验证事实真伪。',
        note: '数字、统计口径和研究结论仍需回到原始材料核对。',
      },
      {
        method: '对相同输入重复改写，比较事实保留和限定词处理是否稳定。',
        data: '演示关注固定约束是否执行；未包含多轮盲测记录。',
        note: '正式评测应补充测试版本、重复轮次和评分人记录。',
      },
      {
        method: '检查是否直接输入原文、结果是否便于逐句审阅与复制。',
        data: '输入为普通文本；输出以改写文本为主，未承诺文件导出。',
        note: '适合论文段落、报告和组会材料的局部修改。',
      },
    ],
  },
};
