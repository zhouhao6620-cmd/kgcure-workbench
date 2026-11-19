import { useState } from 'react';

// Editorial examples for the local detail preview. These are not measured runs.
export const processExamples = {
  '59405ee32866425ab3ed47b790e2579e': [
    {
      title: '改写过程', task: '精简研究进度说明，保留事实与时间。',
      input: '团队计划就两批问卷数据开展缺失值相关的检查工作，并于周五之前完成对问题清单的汇总整理。',
      steps: [
        ['提取事实', '圈出动作、对象和截止时间。', '团队／两批问卷／检查缺失值／周五前汇总问题清单'],
        ['删减套话', '将名词化表达改为具体动作。', '“开展缺失值相关的检查工作” → “检查缺失值”'],
        ['调整句序', '按实际发生的先后顺序组织两个动作。', '先检查两批问卷，再汇总问题清单。'],
        ['回查原句', '逐项核对范围、时间和任务状态。', '保留“两批”和“周五前”，保留计划语气。'],
      ],
      output: '团队将检查两批问卷的缺失值，并在周五前汇总问题清单。',
      comparison: '团队将高效开展数据质量管理工作。', note: '这句概括省略了问卷批次、检查项目和截止时间。', quote: '两批问卷数据……缺失值……周五之前……问题清单',
    },
    {
      title: '失败样本', task: '精简初步结果，保留不确定性。',
      input: '初步分析提示 A 与 B 可能相关，结果仍需在独立样本中验证。',
      steps: [
        ['定位限定词', '标出证据强度和验证条件。', '“初步”“可能”“仍需”'],
        ['检查误改', '逐句对照草拟的改写。', '“A 会引起 B”引入了原句没有的因果关系。'],
        ['修复措辞', '恢复相关关系和后续验证条件。', 'A 与 B 可能相关，仍需独立样本验证。'],
        ['人工复核', '检查证据强度是否与原句一致。', '保留初步分析的限定，不新增因果判断。'],
      ],
      output: '初步分析提示 A 与 B 可能相关，仍需独立样本验证。', comparison: '分析证实 A 会引起 B。', note: '“证实”和“引起”同时提高了证据强度，也改变了关系类型。', quote: '初步分析提示 A 与 B 可能相关',
    },
  ],
};

export function SkillProcess({ item }) {
  const [exampleIndex, setExample] = useState(0);
  const [stepIndex, setStep] = useState(0);
  const examples = processExamples[item.id];
  if (!examples) {
    const parts = (item.flow || '').split(/\n\s*\n/).map(s => s.trim());
    const title = item.steps[stepIndex];
    const position = parts.indexOf(title);
    const note = position >= 0 && parts[position + 1];
    return <>
      <div className="detailStageLine" aria-label="处理步骤">{item.steps.map((step,i) =>
        <button type="button" key={step} aria-pressed={i === stepIndex} onClick={() => setStep(i)}>{i+1}. {step}</button>)}</div>
      <p aria-live="polite">{note && !item.steps.includes(note) ? note : title}</p>
    </>;
  }
  const sample = examples[exampleIndex];
  const stage = sample.steps[stepIndex];
  return <div className="detailReplay">
    <div className="replaySwitch" aria-label="选择演示样本">{examples.map((entry,i) =>
      <button type="button" key={entry.title} aria-pressed={exampleIndex === i} onClick={() => { setExample(i); setStep(0); }}>{entry.title}</button>)}
      <small>模拟样本</small>
    </div>
    <h3>{sample.task}</h3>
    <dl className="replayLines"><div><dt>输入原文</dt><dd>{sample.input}</dd></div></dl>
    <div className="detailStageLine" aria-label="选择处理步骤">{sample.steps.map(([label],i) =>
      <button type="button" key={label} aria-pressed={i === stepIndex} onClick={() => setStep(i)}>{i+1}. {label}</button>)}</div>
    <div className="replayStage" aria-live="polite"><strong>{stage[1]}</strong><p>{stage[2]}</p></div>
    <div className="replayCompare">
      <div><h4>{exampleIndex ? '错误改写' : '普通改写示例'}</h4><p><del>{sample.comparison}</del></p><small>{sample.note}</small></div>
      <div><h4>核对后输出</h4><p><strong>{sample.output}</strong></p><details key={sample.title}><summary>核对原文</summary><blockquote>{sample.quote}</blockquote></details></div>
    </div>
  </div>;
}
