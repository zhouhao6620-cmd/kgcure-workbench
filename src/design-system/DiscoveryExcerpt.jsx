const extracts = [
  {
    heading: '先核对现有资源能回答什么问题',
    lead: '这个案例从宫颈癌肝转移患者的预后问题出发。第一步先把数据能覆盖的范围写清楚，再判断哪些问题值得继续查。',
    columns: ['研究资源', '需要确认'],
    rows: [['SEER 登记数据', '提交版本、登记处范围和可用年份'], ['研究对象', '初诊时已记录肝转移的患者'], ['外部队列', '是否具备独立中心数据，用于外部验证']],
    quote: '真正的约束不是样本量，而是变量可及性与方法学差异化。',
  },
  {
    heading: '把检索结果整理成竞争研究清单',
    lead: '案例按已有研究回答过的问题整理线索，并保留检索式和文献标识，方便回查。',
    columns: ['检索线索', '回放中记录的主题'],
    rows: [['PMID 42305523', '肝转移患者的预后列线图'], ['PMID 33863313', '初诊肝转移发生率与危险因素'], ['PMID 42755801', '转移模式的分层']],
    quote: '本报告为定向证据扫描（PubMed，非系统综述），未做双人筛选与偏倚风险评价',
  },
  {
    heading: '从文献空白筛出数据能支持的研究问题',
    lead: '案例将已有预测模型与候选问题逐项对照，同时标出了登记数据无法支持的方向。',
    columns: ['待判断的方向', '案例中的判断'],
    rows: [['再做确诊时的静态预测', '已有同类工作，需要补充差异化问题'], ['随访期间更新预后', '保留为候选方向，进一步核对条件生存与竞争风险'], ['预测随访期间新发肝转移', '缺少随访复发记录，从候选范围中移除']],
    quote: 'SEER 仅记录初诊时转移状态，无随访期复发数据',
  },
  {
    heading: '比较候选方向，保留优选理由',
    lead: '回放中保留了主选题、配套方向和备选路线。下列分数来自这份案例的选题评分。',
    columns: ['候选方向节选', '案例评分', '用途'],
    rows: [['条件生存与竞争风险动态预后', '13.5 / 15', '优选方向'], ['治疗获益时间窗与 RMST 量化', '12.5 / 15', '配套研究'], ['可解释机器学习与时间分割验证', '12.5 / 15', '备选路线']],
    quote: '基于 SEER 数据库的宫颈癌肝转移患者条件生存与竞争风险动态预后模型构建与验证',
  },
  {
    heading: '将优选方向整理为可讨论的实施方案',
    lead: '案例成果索引列出了执行方案包含的材料，同时留下会影响验证设计的待确认事项。',
    columns: ['方案组成', '索引记录'],
    rows: [['研究设计', '研究问题、变量字典、图表清单'], ['执行安排', '12 步统计流程、18 个月时间线与风险应对'], ['验证条件', '登记处范围、独立中心队列与统计支持']],
    quote: '这决定验证层级能否从"时间分割"升级为"地理外部"。',
  },
];

export function DiscoveryExcerpt({ index }) {
  const part = extracts[index];
  if (!part) return null;
  return <article className="caseManuscript">
    <small>案例回放节选</small><h3>{part.heading}</h3><p>{part.lead}</p>
    <table><thead><tr>{part.columns.map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
    <tbody>{part.rows.map(([first,...rest]) => <tr key={first}><th scope="row">{first}</th>{rest.map(cell => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table>
    <details key={index}><summary>核对案例原文</summary><blockquote>{part.quote}</blockquote></details>
  </article>;
}
