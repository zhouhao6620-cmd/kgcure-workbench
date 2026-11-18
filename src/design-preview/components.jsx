import { useEffect, useRef, useState } from "react";
import { ArrowUp, Award, BarChart3, Blocks, BookOpen, Check, ClipboardCheck, ChevronDown, ChevronRight, FileText, Folder, Layers, Loader2, Paperclip, PenLine, Plus, Search, Star, Tag as TagIcon, Upload, Workflow, X, CircleCheck, Clock3, CircleAlert, CircleX, Info } from "lucide-react";
import deepseekIcons from "./deepseek-icons.json";
import { AGENTS, MODELS, SKILLS } from "./data.js";

export const cx = (...values) => values.filter(Boolean).join(" ");
const ICONS = { book: BookOpen, chart: BarChart3, pen: PenLine, file: FileText, award: Award, workflow: AgentGlyph };

export function AbilityIcon({ item, size = 20, vivid = false }) {
  const Icon = ICONS[item.icon] || Blocks;
  return <span className={cx("sp-ability-icon", "sp-tone-" + (vivid ? ({ statistics: "teal", writing: "violet", "paper-agent": "violet", "grant-review": "red" }[item.id] || item.tone) : item.tone))}><Icon size={size} strokeWidth={1.7} /></span>;
}

export function Button({ children, variant = "secondary", small = false, className, ...props }) {
  return <button type="button" className={cx("sp-button", "sp-button-" + variant, small && "sp-button-small", className)} {...props}>{children}</button>;
}

export function DeepSeekIcon({ name, size = 16 }) {
 const icon = deepseekIcons[name];
 return icon ? <svg width={size} height={size} viewBox={icon.viewBox} fill="none" aria-hidden="true">{icon.paths.map((path,i)=><path key={i} {...path}/>)}</svg> : null;
}
export function IconButton({ label, children, className, ...props }) {
 const kind = /收起导航|展开导航/.test(label) ? 'panel' : /搜索.*对话/.test(label) ? 'search' : /复制示例回复/.test(label) ? 'copy' : /分享.*对话/.test(label) ? 'share' : null;
 const text = label === '复制示例回复' ? '复制' : label === '分享示例对话' || label === '分享当前示例对话' ? '分享' : label;
 const tooltip = kind || /有帮助|重新生成/.test(label);
 return <button type="button" title={tooltip ? undefined : label} aria-label={label} data-tooltip={tooltip ? text : undefined} className={cx("sp-icon-button", tooltip && "sp-deepseek-action", className)} {...props}>{kind ? <DeepSeekIcon name={kind}/> : children}</button>;
}

// Shared type identities. One 24px optical grid, legible at 16–24px.
export function SkillGlyph({size=20,...props}) {
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="m12 3 9 4.5-9 4.5-9-4.5L12 3Z"/><path d="m3 12 9 4.5 9-4.5M3 16.5l9 4.5 9-4.5"/></svg>;
}
export function AgentGlyph({size=20,...props}) {
 return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="4" y="7" width="16" height="13" rx="4"/><path d="M12 3v4M2 12v4m20-4v4M9 16h6"/><circle cx="12" cy="3" r="1" fill="currentColor" stroke="none"/><path d="M9 11.5v1M15 11.5v1" strokeWidth="2.4"/></svg>;
}
export function SkillBadge() { return <span className="sp-skill-badge"><SkillGlyph size={18}/><span>Skill</span></span>; }
export function Tag({ children, tone = "neutral", icon:Icon }) {
 if(children==='Skill')return <SkillBadge/>;
 return <span className={cx("sp-tag", "sp-tag-" + tone)}>{Icon&&<Icon size={14}/>}<span>{children}</span></span>;
}
export function NewBadge() { return <span className="sp-new-badge">NEW</span>; }
export function CaseCategory({ children }) {
  return <span className="ds-case-category">
    <TagIcon size={12} strokeWidth={1.6} aria-hidden="true"/>
    <span>{children}</span>
  </span>;
}
export function StatusTag({ status, children }) {
 const states={success:['green',CircleCheck],processing:['blue',Loader2],warning:['amber',Clock3],error:['red',CircleX],info:['blue',Info],neutral:['neutral',CircleAlert]};
 const [tone,Icon]=states[status]||states.neutral;
 return <span className={cx('sp-tag','sp-tag-'+tone)}><Icon size={14} className={status==='processing'?'sp-spin':undefined}/><span>{children}</span></span>;
}
export function AgentBadge() {
 return <span className="sp-agent-badge"><AgentGlyph size={18}/><span>Agent</span></span>;
}

export function StarRating({ score }) {
 const rated=Number.isFinite(score);
 return <span className="sp-five-rating" aria-label={rated?`${score.toFixed(1)} / 5 星，示例评分`:'暂无评分'}><span className="sp-five-stars" aria-hidden="true">{Array.from({length:5},(_,i)=><span className="sp-rating-star" key={i}><Star size={14}/><span style={{width:`${rated?Math.max(0,Math.min(1,score-i))*100:0}%`}}><Star size={14}/></span></span>)}</span><b>{rated?score.toFixed(1):'待评'}</b></span>;
}

export function SkillCard({ item, context = "store", onDetail, onCall }) {
 const isChat=context==='chat';
 return <article className="sp-skill-card sp-capability-v2 sp-gray-capability" data-capability-id={item.id}><button type="button" className="sp-card-hit" onClick={()=>isChat&&item.online?onCall(item):onDetail(item)} aria-label={isChat&&item.online?'使用 '+item.name:'查看 '+item.name+'详情'}>
 <span className="sp-gray-top"><AbilityIcon item={item} size={24} vivid/><span className="sp-gray-heading"><strong title={item.name}>{item.name}</strong><StarRating score={item.score}/></span></span>
 <span className="sp-card-description" title={item.description}>{item.description}</span>
 <SkillBadge/><span className="sp-gray-bottom"><span className="sp-gray-badges"><span className={item.verified?'sp-verification is-verified':'sp-verification'}>{item.verified?<CircleCheck size={13}/>:<CircleAlert size={13}/>}{item.community ? (item.verified ? '社区贡献 · 已通过测评' : '社区贡献 · 待评测') : item.verified ? '已通过测评' : (item.sourceLabel || '数愈收录 · 待评测')}</span>{item.demo && <span>演示</span>}</span><span className="sp-gray-action" aria-hidden="true"><ArrowUp size={16}/></span></span>
 </button></article>;
}
export function AgentCard({ item, context = "store", onDetail, onCall }) {
 const isChat=context==='chat';
 const stages=item.steps.length>3?[item.steps[0],item.steps[Math.floor(item.steps.length/2)],item.steps.at(-1)]:item.steps;
 return <article className="sp-agent-card sp-capability-v2 sp-gray-capability" data-capability-id={item.id}><button type="button" className="sp-card-hit" onClick={()=>isChat?onCall(item):onDetail(item)} aria-label={isChat?'启动 '+item.name:'查看 '+item.name+'详情'}>
 <span className="sp-gray-top"><span className="sp-agent-card-icon" aria-hidden="true"><AgentGlyph size={24}/></span><span className="sp-gray-heading"><strong title={item.name}>{item.name}</strong><small>{item.category}{item.steps.length ? ` · ${item.steps.length} 步工作流` : " · 流程待补充"}</small></span></span>
 <span className="sp-card-description" title={item.description}>{item.description}</span>
 {item.steps.length > 0 && <span className="sp-gray-flow" aria-label={"完整流程："+item.steps.join("、")} title={item.steps.join(" → ")}>{stages.map(step=><span key={step}><i aria-hidden="true"/><span>{step}</span></span>)}</span>}
 <span className="sp-gray-bottom sp-gray-agent-bottom"><span className="sp-gray-output"><FileText size={16}/><span><small>预期交付</small><strong>{item.output}</strong></span></span><span className="sp-gray-action sp-gray-launch" aria-hidden="true"><ArrowUp size={16}/></span></span>
 </button></article>;
}

export function Composer({ chat = false, draft, onDraft, model, onModel, ability, onAbility, space, spaces, onSpace, attachments, onAttach, onRemove, onSend, onViewAll, onNewSpace, onPickExisting, annotate = false, placeholder, inputLabel, showCapabilities = true, showSpace = true, configuration, skills = SKILLS, agents = AGENTS }) {
  const [open, setOpen] = useState(null);
  const [capabilityQuery, setCapabilityQuery] = useState("");
  const [menuPosition, setMenuPosition] = useState({});
  const triggerRef = useRef(null);
  const wrapper = useRef(null);
  const input = useRef(null);
  const fileInput = useRef(null);
  useEffect(() => {
    const el = input.current;
    if (!el) return;
    const base = chat ? 60 : 112;
    el.style.height = base + "px";
    el.style.height = Math.min(220, Math.max(base, el.scrollHeight)) + "px";
  }, [draft, chat]);
  useEffect(() => {
    function pointer(event) { if (!wrapper.current?.contains(event.target)) setOpen(null); }
    function key(event) { if (event.key === "Escape") setOpen(null); }
    document.addEventListener("pointerdown", pointer);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", pointer); document.removeEventListener("keydown", key); };
  }, []);
  function positionMenu(name, trigger) {
    if (!trigger) return;
    const r = trigger.getBoundingClientRect();
    const viewport = window.visualViewport;
    const vw = viewport?.width || window.innerWidth;
    const vh = (viewport?.height || window.innerHeight) + (viewport?.offsetTop || 0);
    const width = Math.min(name === "model" ? 300 : name === "space" ? 260 : 360, vw - 24);
    const preferredLeft = name === "model" ? r.right - width : r.left;
    const left = Math.max(12, Math.min(vw - width - 12, preferredLeft));
    const room = chat ? r.top - (viewport?.offsetTop || 0) - 16 : vh - r.bottom - 16;
    setMenuPosition({ position: "fixed", left, right: "auto", width, top: chat ? "auto" : r.bottom + 8, bottom: chat ? window.innerHeight - r.top + 8 : "auto", maxHeight: Math.max(48, Math.min(360, room)) });
  }
  function toggle(name, trigger) {
    if (open === name) { setOpen(null); return; }
    triggerRef.current = trigger;
    setCapabilityQuery("");
    positionMenu(name, trigger);
    setOpen(name);
  }
  useEffect(() => {
    if (!open) return;
    const place = () => positionMenu(open, triggerRef.current);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    window.visualViewport?.addEventListener("resize", place);
    return () => { window.removeEventListener("resize", place); window.removeEventListener("scroll", place, true); window.visualViewport?.removeEventListener("resize", place); };
  }, [open, chat]);
  const selectedModel = MODELS.find(item => item.id === model) || MODELS[0];
  function send(event) { event.preventDefault(); if (!draft.trim() && !attachments.length) return; setOpen(null); onSend(); }
  function capabilityPicker(kind) {
    const isSkill = kind === "skill";
    const items = isSkill ? skills : agents;
    const filtered = items.filter(item => (item.name + item.description).toLowerCase().includes(capabilityQuery.trim().toLowerCase()));
    const selected = ability?.kind === kind;
    const Icon = isSkill ? SkillGlyph : AgentGlyph;
    return <div className="sp-picker-anchor"><button type="button" className={cx("sp-tool-select", selected && "is-selected")} aria-label={isSkill ? "选择科研 Skill" : "选择科研 Agent"} aria-expanded={open === kind} aria-haspopup="menu" onClick={event => toggle(kind, event.currentTarget)}><Icon size={15} /><span className="sp-ability-select-label">{selected ? ability.name : <><span className="sp-label-prefix">科研 </span>{isSkill ? "Skill" : "Agent"}</>}</span><ChevronDown size={12} /></button>
      {open === kind && <div className="sp-popover sp-capability-picker" style={menuPosition} aria-label={isSkill ? "科研 Skill 选择面板" : "科研 Agent 选择面板"}><label className="sp-capability-search"><Search size={16} /><input autoFocus onKeyDown={event => { if (event.key === "Enter") { event.preventDefault(); const first = filtered.find(item => item.online); if (first) { onAbility(ability?.id === first.id ? null : first); setOpen(null); } } if (event.key === "ArrowDown") { event.preventDefault(); event.currentTarget.closest(".sp-capability-picker")?.querySelector("button[role=menuitemradio]:not(:disabled)")?.focus(); } }} value={capabilityQuery} onChange={event => setCapabilityQuery(event.target.value)} aria-label={isSkill ? "搜索科研 Skill" : "搜索科研 Agent"} placeholder={isSkill ? "搜索科研 Skill" : "搜索科研 Agent"} />{capabilityQuery && <IconButton label="清空能力搜索" onClick={() => setCapabilityQuery("")}><X size={13} /></IconButton>}</label><div className="sp-capability-results" role="menu">{filtered.length ? filtered.map(item => <button type="button" role="menuitemradio" aria-checked={ability?.id === item.id} disabled={!item.online} className="sp-menu-choice sp-capability-option" key={item.id} onClick={() => { onAbility(ability?.id === item.id ? null : item); setOpen(null); }}><span className="sp-capability-kind-icon"><Icon size={19} strokeWidth={1.7} /></span><span><strong>{item.name}</strong><small>{item.online ? item.description : "尚未上线，暂不可调用"}</small></span>{ability?.id === item.id && <Check size={15} />}</button>) : <p className="sp-picker-empty">没有匹配的{isSkill ? " Skill" : " Agent"}</p>}</div><button type="button" className="sp-capability-view-all" onClick={() => { setOpen(null); onViewAll?.(kind); }}>{isSkill ? "查看全部 Skill" : "查看全部Agent"}</button></div>}
    </div>;
  }
  return <div className={cx("sp-compose-block", chat ? "sp-compose-chat" : "sp-compose-home", annotate && "sp-measured")} ref={wrapper} data-measure={chat ? "输入框 776 × 124px" : "首页输入框 776 × 176px"}>
    <form className="sp-composer" onSubmit={send} aria-label={chat ? "对话输入框" : "创建任务输入框"}>
      <textarea ref={input} value={draft} onChange={event => onDraft(event.target.value)} rows={2} aria-label={inputLabel || (chat ? "继续对话" : "输入科研问题")} placeholder={placeholder || (chat ? "继续描述你的问题，或补充研究材料…" : "描述你的科研问题，或上传已有的研究资料…")} onKeyDown={event => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); event.currentTarget.form.requestSubmit(); } }} />
      {attachments.length > 0 && <div className="sp-attachments">{attachments.map(file => <span className="sp-attachment" key={file.id}><FileText size={14} /><span title={file.name}>{file.name}</span><IconButton label={"移除附件 " + file.name} onClick={() => onRemove(file.id)}><X size={12} /></IconButton></span>)}</div>}
      {configuration}
      <div className="sp-composer-tools"><div className="sp-composer-left"><IconButton label="添加附件" className="sp-attachment-icon" onClick={() => fileInput.current?.click()}><Paperclip size={19} /></IconButton><input className="sp-visually-hidden" tabIndex={-1} type="file" ref={fileInput} multiple aria-label="选择本地附件" onChange={event => { onAttach(Array.from(event.target.files || [])); event.target.value = ""; }} />{!chat && showCapabilities && <>{capabilityPicker("skill")}{capabilityPicker("agent")}</>}</div><div className="sp-composer-right"><div className="sp-picker-anchor"><button type="button" className="sp-model-select" aria-label="选择模型" aria-expanded={open === "model"} aria-haspopup="menu" onClick={event => toggle("model", event.currentTarget)}><span><span className="sp-model-brand">Shuyu </span>{selectedModel.name.replace("Shuyu ", "")}</span><ChevronDown size={12} /></button>{open === "model" && <div className="sp-popover sp-model-picker" style={menuPosition} role="menu" aria-label="选择模型"><div className="sp-menu-caption">选择模型</div>{MODELS.map(item => <button type="button" key={item.id} className="sp-menu-choice" role="menuitemradio" aria-checked={model === item.id} onClick={() => { onModel(item.id); setOpen(null); }}><span><strong>{item.name}</strong><small>{item.description}</small></span>{model === item.id && <Check size={16} />}</button>)}</div>}</div><button type="submit" className="sp-send" aria-label="发送消息" disabled={!draft.trim() && !attachments.length}><ArrowUp size={21} strokeWidth={2} /></button></div></div>
    </form>
    {!chat && showSpace && <div className="sp-space-strip"><div className="sp-picker-anchor"><button type="button" className="sp-space-select" aria-label="选择任务归属空间" title="不选择科研空间时，任务属于个人会话" aria-expanded={open === "space"} aria-haspopup="menu" onClick={event => toggle("space", event.currentTarget)}><Folder size={16} /><span>{space === "personal" ? "选择科研空间" : spaces.find(item => item.id === space)?.name}</span><ChevronDown size={12} /></button>{open === "space" && <div className="sp-popover sp-space-picker" style={menuPosition} role="menu" aria-label="任务归属空间">{spaces.filter(item => item.id !== "personal").map(item => <button type="button" className="sp-menu-choice" role="menuitemradio" aria-checked={space === item.id} key={item.id} onClick={() => { onSpace(item.id); setOpen(null); }}><Folder size={15} /><span>{item.name}</span>{space === item.id && <Check size={15} />}</button>)}<hr /><button type="button" className="sp-menu-choice" role="menuitem" onClick={() => { setOpen(null); onNewSpace?.(); }}><Plus size={15} /><span>新建科研空间</span></button><button type="button" className="sp-menu-choice" role="menuitemradio" aria-checked={space === "personal"} onClick={() => { onSpace("personal"); setOpen(null); }}><span>不选择科研空间</span>{space === "personal" && <Check size={15} />}</button></div>}</div></div>}
  </div>;
}

export function Modal({ title, children, onClose, wide = false, footer, placement = "center" }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement;
    const candidates = () => Array.from(ref.current?.querySelectorAll('button:not([disabled]), input, textarea, select, a[href], [tabindex="0"]') || []);
    (ref.current?.querySelector("input,textarea") || candidates()[0])?.focus();
    function key(event) {
      if (event.key === "Escape") { event.preventDefault(); closeRef.current(); }
      if (event.key === "Tab") {
        const items = candidates();
        if (!items.length) return;
        if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1)?.focus(); }
        else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0]?.focus(); }
      }
    }
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("keydown", key); if (previous?.isConnected) previous.focus(); };
  }, []);
  return <div className={cx("sp-modal-backdrop", placement === "search" && "sp-search-backdrop")} onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}><section ref={ref} className={cx("sp-modal", wide && "sp-modal-wide")} role="dialog" aria-modal="true" aria-label={title}><header className="sp-modal-header"><h2>{title}</h2><IconButton label="关闭弹窗" onClick={onClose}><X size={18} /></IconButton></header><div className="sp-modal-body">{children}</div>{footer && <footer className="sp-modal-footer">{footer}</footer>}</section></div>;
}

export function DocumentEmptyIllustration() {
  return <span className="ds-document-empty-art" aria-hidden="true">
    <FileText strokeWidth={.8}/>
    <ClipboardCheck strokeWidth={.75}/>
  </span>;
}

export function EmptyState({ children = "没有找到相关内容", icon: Icon = Search, description = "试试其他关键词，或清除当前筛选。", onReset, action }) {
  return <div className="sp-empty">
    <Icon size={28} strokeWidth={1.5} aria-hidden="true"/>
    <h3>{children}</h3>
    {description && <p>{description}</p>}
    {action ?? (onReset && <Button onClick={onReset}>清除筛选</Button>)}
  </div>;
}

export function AgentParameters({ item, initialTopic, onRun, locked = false }) {
  const [topic,setTopic]=useState(initialTopic || "");
  const [population,setPopulation]=useState("成人患者");
  const [comparison,setComparison]=useState("GLP-1 受体激动剂 vs 常规治疗");
  const [outcome,setOutcome]=useState("主要心血管不良事件、全因死亡");
  const [range,setRange]=useState("近 5 年");
  const [material,setMaterial]=useState("");
  const [error,setError]=useState(false);
  const filled=[topic,population,comparison,outcome].filter(x=>x.trim()).length;
  return <form className="sp-agent-parameters sp-agent-config sp-refined-config" onSubmit={event=>{event.preventDefault();if(locked)return;if(filled<4){setError(true);return;}setError(false);onRun(topic.trim(),["研究对象："+population,"干预与对照："+comparison,"主要结局："+outcome,"文献范围："+range,material&&"资料名称："+material].filter(Boolean).join("；"));}} noValidate>
    <header className="sp-refined-config-head"><div><div className="sp-refined-config-title"><strong>输入配置</strong></div><p>核对研究范围与输入材料，带 * 的为必填项</p></div><StatusTag status={locked?"success":"warning"}>{locked?"已确认":"待确认"}</StatusTag></header>
    <label className="sp-field"><span>研究问题 <span className="sp-required">*</span></span><textarea disabled={locked} aria-label="Agent 研究问题" value={topic} onChange={e=>setTopic(e.target.value)} rows={2} aria-invalid={error&&!topic.trim()}/></label>
    <div className="sp-agent-config-grid"><label className="sp-field"><span>研究对象 <span className="sp-required">*</span></span><input disabled={locked} aria-label="Agent 研究对象" value={population} onChange={e=>setPopulation(e.target.value)} aria-invalid={error&&!population.trim()}/></label><label className="sp-field"><span>干预与对照 <span className="sp-required">*</span></span><input disabled={locked} aria-label="Agent 干预与对照" value={comparison} onChange={e=>setComparison(e.target.value)} aria-invalid={error&&!comparison.trim()}/></label></div>
    <div className="sp-agent-config-grid"><label className="sp-field"><span>主要结局 <span className="sp-required">*</span></span><input disabled={locked} aria-label="Agent 主要结局" value={outcome} onChange={e=>setOutcome(e.target.value)} aria-invalid={error&&!outcome.trim()}/></label><label className="sp-field"><span>文献范围</span><select disabled={locked} aria-label="Agent 文献范围" value={range} onChange={e=>setRange(e.target.value)}><option>近 5 年</option><option>近 10 年</option><option>不限时间</option></select></label></div>
    <p className="sp-config-field-hint">以上为系统建议，请按实际研究问题核对。</p>
    <div className="sp-config-material-label">研究资料 <span>可选</span></div>
    {material ? <div className="sp-config-material-file"><FileText size={20}/><span>{material}</span><button type="button" disabled={locked} aria-label="移除任务配置附件" onClick={()=>setMaterial("")}><X size={14}/></button></div> : <label className="sp-config-upload"><Upload size={20}/><span>上传文件</span><input disabled={locked} type="file" aria-label="Agent 研究资料" onChange={e=>setMaterial(e.target.files[0]?.name || "")}/></label>}

    {error&&<p className="sp-field-error" role="alert">请补齐研究问题、研究对象、干预与对照和主要结局。</p>}
    <footer className="sp-parameter-foot"><button type="submit" disabled={locked} className="sp-button sp-button-primary">{locked?"配置已确认":"确认配置并继续"}</button><span>已填写 {filled} / 4 项必填信息</span></footer>
  </form>;
}

export function LoadingButton({ onComplete }) {
  const [loading, setLoading] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  return <Button variant="primary" disabled={loading} aria-busy={loading} onClick={() => { setLoading(true); timer.current = window.setTimeout(() => { setLoading(false); onComplete(); }, 800); }}>{loading ? <><Loader2 size={15} className="sp-spin" />处理中</> : "主要按钮"}</Button>;
}
