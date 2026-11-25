import { sitePath } from "../site-path.js";
import { ConversationPrompt, FollowUpQuestions } from '../design-system/ConversationPrompt.jsx';
import { useEffect, useId, useRef, useState } from 'react';
import { Archive, Download, FolderInput, ImagePlus, ChevronRight, PenLine, ArrowUpRight, Check, ChevronDown, Circle, FileCheck2, FileText, Folder, Layers, LibraryBig, Loader2, Pause, Play, Square, Pencil, Search, Sparkles, Upload, Workflow, X } from 'lucide-react';
import { SkillGlyph, StatusTag, AgentBadge, Button, CaseCategory, SpaceDirectoryOptions } from './components.jsx';

export function FilePanelToggle({ open, onToggle, controls, label = '文件面板' }) {
  return <button type="button" className="sp-file-toggle" aria-label={`${open ? '关闭' : '打开'}${label}`}
    aria-expanded={open} aria-controls={open ? controls : undefined} onClick={onToggle}>
    <LibraryBig size={18} strokeWidth={1.7} aria-hidden="true"/><span>文件</span>
  </button>;
}

export function ThinkingSummary({children,expanded,onToggle,label="已思考",duration="3 秒 · 示例"}) {
 const [localOpen,setOpen]=useState(false); const open=expanded ?? localOpen;
 return <section className="sp-think sp-initial-think" aria-label="问题理解摘要"><button type="button" aria-expanded={open} onClick={()=>onToggle?onToggle():setOpen(!open)}><Sparkles size={16}/><strong>{label}</strong><span className="sp-think-time">{duration}</span><ChevronDown size={14}/></button>{open&&<div>{children || <><p>已识别研究对象、干预与心血管结局。先确认研究目标，再补充研究范围，便于选择后续任务。</p><small>处理摘要示例</small></>}</div>}</section>;
}
export function AgentIdentity({ item, description }) {
 return <div className="sp-agent-identity"><img src={sitePath("/design-preview/agent-robot.webp")} alt=""/><div><div><strong>{item.name}</strong></div><span>{description}</span></div></div>;
}
export function IntentConfirmation({ onChoose, selected = null, locked = false }) {
 const choices=[{label:'系统评价与 Meta 分析',description:'整理 GLP-1 与心血管结局的证据'},{label:'识别关键危险因素',description:'识别与治疗结局相关的关键因素'},{label:'比较治疗效果',description:'梳理不同方案的效果与证据差异'}];
 return <section className="sp-intent-prompts"><h4>确认你的研究方向</h4><div className="ds-chat-prompts" role="group" aria-label="确认研究意图">{choices.map((choice,i)=><ConversationPrompt key={choice.label} title={choice.label} prefix={`目标 ${i+1}：`} outlined disabled={locked} selected={selected===i} onChoose={()=>onChoose(choice.description,i)}/>)}</div></section>;
}

export function IntentSummary({ topic, onEdit }) {
  return <div className="sp-intent"><span className="sp-process-icon"><Sparkles size={18}/></span><div><strong>需求理解</strong><p>{topic || '围绕研究对象、比较方式与主要结局，先整理问题，再选择合适的科研能力。'}</p></div><button type="button" onClick={onEdit}><Pencil size={14}/>修改</button></div>;
}
export function FollowUps({ onChoose }) {
 const questions=['如何确定主要结局？','适合纳入哪些研究？','怎样制定纳排标准？'];
 return <FollowUpQuestions questions={questions} onChoose={onChoose}/>;
}
export function RegressionConfig({ onConfirm }) {
  const [outcome,setOutcome]=useState('outcome_score'); const [method,setMethod]=useState('多元线性回归');
  const [variables,setVariables]=useState(['age','bmi','treatment_dose']); const [variable,setVariable]=useState('');
  const [file,setFile]=useState(null); const [error,setError]=useState(''); const [confirmed,setConfirmed]=useState(false);
  function add(){if(variable.trim()&&!variables.includes(variable.trim()))setVariables([...variables,variable.trim()]);setVariable('');}
  return <form className="sp-config-card sp-config-v5" noValidate onSubmit={e=>{e.preventDefault();if(!outcome.trim()||!variables.length||!file){setError('请补齐因变量、自变量，并选择数据文件。');return;}setError('');setConfirmed(true);onConfirm?.({outcome,method,variables,file:file.name});}}>
    <header><img className="sp-config-robot" src={sitePath("/design-preview/agent-robot.webp")} alt=""/><div><h4>回归分析配置</h4><p>核对变量与方法后，确认任务输入</p></div><StatusTag status={confirmed?"success":"warning"}>{confirmed?"已确认":"待确认"}</StatusTag></header>
    {confirmed ? <><div className="sp-config-receipt"><Check size={18}/><span>{method} · {variables.length} 个自变量<br/>{file.name}</span></div><Button small onClick={()=>setConfirmed(false)}>修改配置</Button><p className="sp-pattern-note">已保存本地配置样例，未执行统计分析。</p></> : <><div className="sp-config-fields"><label className="sp-field"><span>因变量 <span className="sp-required">*</span></span><input aria-label="回归因变量" value={outcome} onChange={e=>setOutcome(e.target.value)}/><small>系统建议，请核对实际数据列名</small></label><label className="sp-field"><span>回归类型</span><select aria-label="回归类型" value={method} onChange={e=>setMethod(e.target.value)}>{['多元线性回归','Logistic 回归','Cox 比例风险回归'].map(x=><option key={x}>{x}</option>)}</select><small>请根据结局类型选择</small></label></div>
    <div className="sp-field"><span>自变量 <span className="sp-required">*</span></span><div className="sp-variable-list">{variables.map(x=><span key={x}>{x}<button type="button" aria-label={'移除变量 '+x} onClick={()=>setVariables(variables.filter(v=>v!==x))}><X size={12}/></button></span>)}</div><div className="sp-variable-add"><input aria-label="添加自变量" placeholder="输入列名" value={variable} onChange={e=>setVariable(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();add();}}}/><Button small onClick={add}>添加变量</Button></div></div>
    <label className="sp-config-upload"><Upload size={20}/><span>{file?file.name:'上传文件'}</span><input type="file" aria-label="配置卡数据文件" accept=".csv,.xlsx" onChange={e=>{setFile(e.target.files[0]||null);setError('');}}/></label>
    {error&&<p role="alert" className="sp-field-error">{error}</p>}<footer><button type="submit" className="sp-button sp-button-primary">确认配置</button><span>{file?'材料已选择，请核对配置':'选择数据文件后即可继续'}</span></footer></>}
  </form>;
}
const PROCESS_ICONS=[Search,Layers,FileText,FileCheck2];
export function TaskJourney({ steps, waiting = false, completed = false, autoRun = false, onComplete, runtime, onRuntimeChange }) {
 const [stage,setStage]=useState(completed ? steps.length : runtime?.stage || 0);
 const [elapsed,setElapsed]=useState(runtime?.elapsed || 0);
 const [paused,setPaused]=useState(runtime?.paused || false); const [aborted,setAborted]=useState(runtime?.aborted || false);
 const [thinkOpen,setThinkOpen]=useState(!waiting && !completed);
 const [expanded,setExpanded]=useState(completed || waiting ? [] : [0]);
 const complete=stage===steps.length;
 const runtimeCallback=useRef(onRuntimeChange);runtimeCallback.current=onRuntimeChange;
 useEffect(()=>{runtimeCallback.current?.({stage,elapsed,paused,aborted});},[stage,elapsed,paused,aborted]);
 useEffect(()=>{if(waiting||paused||aborted||complete||!autoRun)return;let previous=performance.now();const id=setInterval(()=>{const now=performance.now();const delta=(now-previous)/1000;previous=now;setElapsed(value=>value+delta);},250);return()=>clearInterval(id);},[waiting,paused,aborted,complete,autoRun]);
 const completeSent=useRef(false); const callback=useRef(onComplete);callback.current=onComplete;
 useEffect(()=>{if(waiting || paused || aborted || !autoRun)return;if(stage>=steps.length){if(!completeSent.current){completeSent.current=true;callback.current?.();}return;}const timer=setTimeout(()=>{setStage(n=>n+1);setExpanded(stage+1<steps.length?[stage+1]:[]);if(stage+1===steps.length)setThinkOpen(false);},1800);return()=>clearTimeout(timer);},[stage,waiting,paused,aborted,autoRun,steps.length]);
 const summaries=steps.length===6?['核对研究场景、人群与主要结局，整理任务输入。','准备检索范围与筛选条件，建立文献清单结构。','围绕已确认的问题，整理可进一步研究的选题方向。','检查研究条件、数据可获得性与实施要求。','组织研究方法、资料提取和分析计划。','汇总已确认配置，生成任务说明与交付文件。']:['核对研究问题、研究范围与主要结局，整理任务输入。','组织检索与筛选条件，建立待核对的文献清单结构。','规划数据提取字段和分析要求，保留来源核验入口。','汇总已确认配置，生成本地任务说明与交付文件。'];
 const chainTitles=steps.length===6?['确认研究场景','准备文献调研','整理选题方向','核对可行性条件','规划研究方案','组织报告交付']:['整理研究输入','准备证据检索方案','规划数据提取与分析','组织任务交付'];
 const tools=steps.length===6?['研究问题整理','文献智能检索','科研选题整理','研究条件核对','研究方案规划','学术写作整理']:['研究问题整理','文献智能检索','通用统计分析','学术论文润色'];
 const status = waiting ? '等待输入配置' : aborted ? '任务演示已停止' : paused ? '任务演示已暂停' : complete ? '任务摘要已完成' : '正在整理任务：'+steps[stage];
 const toggle=i=>setExpanded(keys=>keys.includes(i)?keys.filter(k=>k!==i):[...keys,i]);
 return <section className="sp-journey sp-source-journey sp-compact-track" aria-label="任务轨道"><ol style={{'--track-count':steps.length}}>{steps.map((step,i)=><li key={step} className={i<stage?'is-done':i===stage&&!waiting?'is-current':''}><span><img src={sitePath('/design-preview/reference-icons/med-task-'+(steps.length===6?i:steps.length===4?[0,1,3,5][i]:i%6)+'.svg')} alt=""/></span><strong>{step}</strong></li>)}</ol>
 {!waiting && <><div className="sp-task-runtime"><span>本地任务演示</span>{!waiting&&!complete&&<div>{autoRun ? <>{!aborted&&<><button type="button" onClick={()=>{setPaused(!paused);setAborted(false);}}>{paused?<Play size={12}/>:<Pause size={12}/>} {paused?'继续':'暂停'}</button><button type="button" onClick={()=>{setAborted(true);setThinkOpen(false);}}><Square size={12}/>停止</button></>}{aborted&&<button type="button" onClick={()=>{setAborted(false);setPaused(false);setThinkOpen(true);}}>重试</button>}</> : <button type="button" onClick={()=>{setStage(n=>n+1);setExpanded(stage+1<steps.length?[stage+1]:[]);}}>演示下一阶段</button>}</div>}{complete&&<button type="button" onClick={()=>setExpanded(steps.map((_,i)=>i))}>回看任务链</button>}</div>
 <section className="sp-think" aria-label="思考摘要"><button type="button" aria-expanded={thinkOpen} onClick={()=>setThinkOpen(!thinkOpen)}>{autoRun&&!complete&&!paused&&!aborted?<Loader2 className="sp-spin" size={16}/>:<Sparkles size={16}/>}<strong>{status}</strong><span className="sp-think-time">{Math.floor(elapsed)} 秒</span><ChevronDown size={14}/></button>{thinkOpen&&<div><p>{waiting?'请先确认下方输入配置，再组织后续任务。':complete?'已将研究配置整理为任务说明。下方文件为本地生成的演示产物。':(steps.length===4||steps.length===6)?summaries[Math.min(stage,summaries.length-1)]:'核对当前输入，整理可复核的任务说明。'}</p></div>}</section>
 <section className="sp-thought-chain" aria-label="任务链"><h4>任务链</h4>{steps.map((step,i)=>{const nodeStatus=i<stage?'success':i===stage&&!waiting?(aborted?'abort':'loading'):'pending';return <div key={step} className={'sp-chain-node is-'+nodeStatus}><span className="sp-chain-dot">{nodeStatus==='success'?<Check size={14}/>:nodeStatus==='loading'&&!paused?<Loader2 size={14} className="sp-spin"/>:<Circle size={12}/>}</span><div><button type="button" aria-expanded={expanded.includes(i)} onClick={()=>toggle(i)}><strong>{(steps.length===4||steps.length===6)?chainTitles[i]:steps[i]}</strong><span>{nodeStatus==='success'?'演示完成':nodeStatus==='abort'?'已停止':nodeStatus==='loading'?(paused?'已暂停':'演示处理中'):'待开始'}</span><ChevronDown size={14}/></button>{expanded.includes(i)&&<div className="sp-chain-content"><p>{steps.length===4||steps.length===6?summaries[i]:'核对「'+step+'」的输入条件与正式交付要求。'}</p><div className="sp-chain-tool"><SkillGlyph size={14}/><span>{tools[i] || step}</span><small>Skill · 演示</small></div><p className="sp-chain-result">{nodeStatus==='success'?'已整理本阶段任务摘要':nodeStatus==='pending'?'等待前序任务完成':nodeStatus==='abort'?'已停止，可重试继续':paused?'已暂停，继续后整理当前阶段':'正在整理当前阶段的输入与交付要求'}</p></div>}</div></div>;})}</section></>}
 </section>;
}

const CASES = [
  { id: 'evidence', name: '临床研究的证据地图', description: '从临床问题整理检索方向和证据结构', type: '临床研究', prompt: '请围绕我的临床研究问题，整理检索关键词与证据地图。' },
  { id: 'analysis', name: '住院患者风险预测模型', description: '梳理结局、预测变量和模型验证方案', type: '预测模型', prompt: '请帮我规划住院患者风险预测模型，梳理结局、预测变量和验证方案。' },
  { id: 'grant', name: '青年基金申报书结构规划', description: '梳理选题依据、研究目标和技术路线', type: '基金申报', prompt: '请根据我的研究资料，梳理青年基金申报书的结构。' },
];

export function CaseGallery() {
  return <section className="sp-gallery-section sp-cases">
    <div className="sp-section-heading">
      <h2>案例卡片</h2>
      <span className="sp-subtle">样式示例</span>
    </div>
    <div className="sp-case-grid">
      {CASES.map(item => <article className="sp-case-card" key={item.id}>
        <span className="sp-case-preview">
          <CaseCategory>{item.type}</CaseCategory>
          <span className="sp-case-paper" aria-hidden="true">
            <span className="sp-case-rule"/>
            <span className="sp-case-lines"/>
            {item.id === 'evidence' && <span className="sp-case-table">
              {Array.from({ length: 9 }, (_, index) => <i key={index}/>)}
            </span>}
            {item.id === 'analysis' && <span className="sp-case-chart">
              {[38, 66, 48, 88, 58].map(height => <i key={height} style={{ height: height + '%' }}/>)}
            </span>}
            {item.id === 'grant' && <span className="sp-case-outline"><i/><i/><i/></span>}
          </span>
        </span>
        <span className="sp-case-caption">
          <strong>{item.name}</strong>

        </span>
      </article>)}
    </div>
    <p className="sp-section-note">封面为 16:9，类型角标位于封面右上角，标题放在图框下方。</p>
  </section>;
}

const DELIVERY_FILE_FORMATS = {
  MD: 'markdown', MARKDOWN: 'markdown',
  JPG: 'image', JPEG: 'image', PNG: 'image', WEBP: 'image', GIF: 'image', SVG: 'image', IMAGE: 'image',
  PPT: 'presentation', PPTX: 'presentation',
  DOC: 'word', DOCX: 'word', WORD: 'word',
  PDF: 'pdf',
  ZIP: 'archive', RAR: 'archive', '7Z': 'archive', TAR: 'archive', GZ: 'archive',
};

// The five reference marks are drawn in the free-chat specification's 18px view box.
const DELIVERY_FILE_MARKS = {
  markdown: <svg className="sp-delivery-file-letter" viewBox="0 0 18 18"><path d="M3 14V4h2.7L9 9.4 12.3 4H15v10h-2.5V8.1L9 13.5 5.5 8.1V14z"/></svg>,
  image: <svg viewBox="0 0 18 18"><circle cx="6" cy="6" r="1.3" fill="#fff" stroke="none"/><path d="M3.5 13l3.2-3 2.2 2 2.3-3 3.3 4"/></svg>,
  presentation: <svg className="sp-delivery-file-letter" viewBox="0 0 18 18"><path d="M4.2 15V3h5.1c3 0 4.7 1.6 4.7 4.2 0 2.7-1.8 4.3-4.9 4.3H7V15zm2.8-6h2c1.4 0 2.2-.6 2.2-1.8 0-1.1-.8-1.7-2.2-1.7H7z"/></svg>,
  word: <svg className="sp-delivery-file-letter" viewBox="0 0 18 18"><path d="M1.8 3h2.8l1.7 7.7L8 3h2.2l1.7 7.7L13.6 3h2.7l-3 12h-2.6L9 8.2 7.3 15H4.7z"/></svg>,
  pdf: <svg viewBox="0 0 18 18"><path d="M8.8 2.2c-.7 3.2.2 6.5 2.4 9.2 1.3 1.6 2.7 2.7 3.8 2.9.8.1 1.1-.6.6-1.2-.8-1-3.6-1.1-6.4-.5-2.8.6-5.5 1.8-6.5 2.8-.6.6-.1 1.3.7 1 1.8-.8 3.6-3.5 4.8-6.1 1.3-2.8 2-5.7 1.5-7.8-.2-.8-.8-.9-.9-.3z"/></svg>,
  archive: <Archive/>,
};

export function DeliveryFileIcon({ type, name }) {
  const extension = name?.split('.').at(-1).toUpperCase();
  const format = DELIVERY_FILE_FORMATS[type?.toUpperCase()] ?? DELIVERY_FILE_FORMATS[extension] ?? (type ? 'generic' : 'markdown');
  return <span className={`sp-delivery-file-icon is-${format}`} aria-hidden="true">
    {DELIVERY_FILE_MARKS[format] ?? <FileText/>}
  </span>;
}

export function DeliveryCard({ file, delivery, onDownload }) {
 const word = file.type === 'DOCX', markdown = !file.type || file.type === 'MD';
 const menuId = useId();
 const menu = useRef(null);
 const trigger = useRef(null);
 const [open, setOpen] = useState(false);
 const spaces = delivery.spaces;

 useEffect(() => {
  if (!open) return;
  window.addEventListener('scroll', positionMenu, true);
  window.addEventListener('resize', positionMenu);
  return () => {
   window.removeEventListener('scroll', positionMenu, true);
   window.removeEventListener('resize', positionMenu);
  };
 }, [open, spaces.length]);

 function positionMenu() {
  const {right, top, bottom} = trigger.current.getBoundingClientRect();
  const width = Math.min(224, window.innerWidth - 16);
  const below = window.innerHeight - bottom - 14;
  const above = top - 14;
 const rows = Math.max(spaces.length + 2, ...spaces.map(space => (space.folders?.length || 0) + 1));
 const flip = below < Math.min(240, 42 + rows * 36) && above > below;
  Object.assign(menu.current.style, {
   width: width + 'px',
   left: Math.max(8, Math.min(right - width, window.innerWidth - width - 8)) + 'px',
   top: flip ? 'auto' : bottom + 6 + 'px',
   bottom: flip ? window.innerHeight - top + 6 + 'px' : 'auto',
   maxHeight: Math.max(0, Math.min(240, flip ? above : below)) + 'px',
  });
 }

 return <article className="sp-source-delivery-card">
  <div className="sp-delivery-main">
   <DeliveryFileIcon type={file.type} name={file.name}/>
   <span className="sp-delivery-info"><strong title={file.name}>{file.name}</strong><small>{file.description || (word ? '研究任务实施方案' : markdown ? '研究过程与任务说明' : '会话交付文件')} · {word ? 'Word' : markdown ? 'Markdown' : file.type}</small></span>
  </div>
  <div className="sp-delivery-actions">
   <button type="button" ref={trigger} aria-label={'保存 ' + file.name} title="保存到空间" popoverTarget={menuId} onClick={positionMenu}><FolderInput size={18} aria-hidden="true"/></button>
   <button type="button" aria-label={'下载 ' + file.name} title="下载" onClick={onDownload}><Download size={18} aria-hidden="true"/></button>
  </div>
  <div className="sp-delivery-spaces" id={menuId} ref={menu} popover="auto" aria-label="保存到空间" role="menu" onToggle={event=>setOpen(event.newState === 'open')}>
   {open && <SpaceDirectoryOptions spaces={spaces} value={null} caption="保存到空间" libraryLabel="我的文件库"
    onPick={(spaceId, folderId)=>{menu.current.hidePopover();delivery.onSave(file, spaceId, folderId);}}
    onNew={()=>{menu.current.hidePopover();delivery.onNewSpace?.();}} />}
  </div>
 </article>;
}
