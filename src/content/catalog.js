import rawCatalog from './catalog.json';
import { EDITORIAL, AGENT_CORRECTIONS } from './editorial.js';
import { skillAssessmentExample } from './skill-assessment-examples.js';
const catalog=rawCatalog.map(item=>({...item,...(EDITORIAL[item.id]||{}),...(AGENT_CORRECTIONS[item.id]||{}),sourceIntro:item.intro,sourceSteps:item.steps,sourceDeliverables:item.deliverables,adapted:Boolean(EDITORIAL[item.id]||AGENT_CORRECTIONS[item.id])}));
// Prototype assignments for reviewing the Agent entitlement flow.
const previewExclusiveAgentIds = new Set(['1138', '1001', '1142']);
for (const item of catalog) {
  if (item.kind === 'agent') item.exclusive = previewExclusiveAgentIds.has(item.id);
  const assessment = skillAssessmentExample(item.id);
  if (assessment) Object.assign(item, { assessment, score: assessment.score, reviewed: true, sourceLabel: '已评测 · 演示' });
}
export const CAPABILITIES = catalog;
export const BUSINESS_SKILLS = catalog.filter(item => item.kind === 'skill');
export const BUSINESS_AGENTS = catalog.filter(item => item.kind === 'agent');
export const capabilityPath = item => '/workspace/' + (item.kind === 'skill' ? 'skills/' : 'agents/') + item.id;
export const capabilityById = id => catalog.find(item => item.id === id);
export const BUSINESS_SPACES = [{id:'personal',name:'个人会话'},{id:'db79430b945744a4aa9b3676d21f5fba',name:'神经发育障碍'}];
export const STORE_FEATURES = {
  skill: [
    { id: '1042', image: 'skill-literature', tone: 'blue', kicker: '循证研究', title: '让每一次检索，都有据可循', description: '从研究问题到可追溯的文献证据' },
    { id: '1028', image: 'skill-statistics', tone: 'mint', kicker: '数据分析', title: '把数据，整理成清晰的答案', description: '选择方法，核对前提，解释结果' },
    { id: '1003', image: 'skill-writing', tone: 'rose', kicker: '学术表达', title: '保留你的思考，打磨专业表达', description: '从论文段落到完整的学术表达' },
    { id: '54e55c02d102417994d786a0239a5103', tone: 'violet', kicker: '基金申报', title: '在提交前，检查申报书', description: '逐项核对结构与论证，梳理修改建议' },
  ],
  agent: [
    { id: '35a3e188211447888f499c11d0b90345', image: 'agent-discovery', tone: 'violet', kicker: '研究起点', title: '从一个想法，到可行的研究方向', description: '梳理文献空白，比较创新构想' },
    { id: 'afff2281c5d240e9b918480df6cf7846', image: 'agent-modeling', tone: 'blue', kicker: '数据与模型', title: '把复杂建模，连接成完整流程', description: '从数据预检到模型评价与交付' },
    { id: '1001', image: 'agent-paper', tone: 'sand', kicker: '成果交付', title: '让研究资料，逐步成为论文', description: '整理结构，撰写初稿，核对引用' },
    { id: '1046', tone: 'mint', kicker: '证据整合', title: '把综述问题写成研究方案', description: '定义纳入标准，规划检索与筛选' },
  ],
};
export function downloadText(name,content){const url=URL.createObjectURL(new Blob([content],{type:'text/markdown;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
