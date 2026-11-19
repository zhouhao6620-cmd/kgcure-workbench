import { sitePath } from "../site-path.js";
import { BarChart3, BookOpen, Check, FileText, Search, PenLine, Upload } from 'lucide-react';
import { AgentGlyph, SkillGlyph } from '../design-preview/components.jsx';
import { DeliveryFileIcon } from '../design-preview/ConversationPatterns.jsx';
import './icon-library.css';
const DELIVERY_FILE_EXAMPLES = [['MD','Markdown'],['PNG','图片'],['PPTX','PPT'],['DOCX','Word'],['PDF','PDF'],['ZIP','压缩包']];
function AccentFile(){return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 3H5v18h14V9l-6-6Z" stroke="#343a44"/><path d="M13 3v6h6M8 13h7M8 17h4" stroke="var(--ds-primary)"/></svg>;}
export function IconLibrary(){
 const entries=[
  {id:'linear',title:'线性矢量 · 纯色',description:'导航、菜单与辅助操作；使用中性灰，选中可用正文黑色。',icons:<><Search/><Upload/><SkillGlyph/><AgentGlyph/></>,meta:'16 / 20 / 24px · 统一线稿'},
  {id:'color',title:'彩色能力图标',description:'按能力类别区分；浅色容器与单色线稿配对，保持统一比例。',icons:<><span className="sp-icon-swatch is-blue"><BookOpen/></span><span className="sp-icon-swatch is-green"><BarChart3/></span><span className="sp-icon-swatch is-purple"><PenLine/></span><span className="sp-icon-swatch is-red"><FileText/></span></>,meta:'蓝 / 绿 / 紫 / 红 · 36px 容器'},
  {id:'accent',title:'中性灰 · 局部点缀',description:'任务阶段与过程反馈；主体灰黑，关键笔画用主蓝点缀。',icons:<><AccentFile/><span className="sp-icon-accent-check"><Check/></span><span className="sp-icon-accent-chart"><BarChart3/></span></>,meta:'主蓝 #3964FE · 局部强调'},
  {id:'brand',title:'品牌与 Agent 身份',description:'Agent 用黑底金线机器人；紫色与金色保留为品牌识别。',icons:<><span className="sp-agent-card-icon"><AgentGlyph size={24}/></span><img src={sitePath("/design-preview/agent-robot.webp")} alt="Agent 机器人"/><span className="sp-icon-brand-purple"><SkillGlyph size={24}/></span></>,meta:'黑金 / 品牌紫 · 不代替状态颜色'}
 ];
 return <section className="sp-gallery-section" id="sp-icon-library"><div className="sp-section-heading"><div><h2>图标规范</h2><p>统一线宽、尺寸和容器比例，用颜色区分能力与操作状态。</p></div></div>
  <div className="sp-capability-icon-boards" aria-label="科研能力图标设计画板">
   <article><span className="sp-icon-artboard"><SkillGlyph size={72}/></span><div><h3>科研 Skill</h3><p>叠层能力，单项科研技能。创建任务下拉框、导航与管理列表共用。</p><small>108 × 108 设计画板 · 6.2px 线宽</small></div></article>
   <article><span className="sp-icon-artboard"><AgentGlyph size={72}/></span><div><h3>科研 Agent</h3><p>机器人任务，多步骤科研工作流。创建任务下拉框、导航与管理列表共用。</p><small>108 × 108 设计画板 · 6.2px 线宽</small></div></article>
  </div>
  <div className="sp-icon-spec-grid">{entries.map(x=><article className="sp-icon-spec-card" key={x.id}><div className={'sp-icon-spec-examples sp-icon-spec-'+x.id} aria-label={x.title+'示例'}>{x.icons}</div><h3>{x.title}</h3><p>{x.description}</p><small>{x.meta}</small></article>)}</div><p className="sp-section-note">状态图标同时搭配文字：绿色成功、橙色待确认、红色失败、灰色未开始。颜色不作为唯一识别依据。</p>
  <article className="sp-icon-spec-card sp-delivery-icon-spec">
   <h3>交付文件图标</h3>
   <p>文件卡片和右侧抽屉共用 30 × 36 px 折角图标，以颜色和白色符号区分格式。</p>
   <ul>{DELIVERY_FILE_EXAMPLES.map(([type, label]) => <li key={type}><DeliveryFileIcon type={type}/><span>{label}</span></li>)}</ul>
  </article>
 </section>;
}
