import { sitePath } from "../site-path.js";
import { RecommendationHeading } from '../design-system/RecommendationHeading.jsx';
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Award, Blocks, BookOpen, Check, ChevronDown, ChevronRight, Copy, Download, FileText, Folder, Heart, Info, Layers, Lightbulb, MessageCirclePlus, MessageSquarePlus, MoreHorizontal, Orbit, Palette, PanelLeft, Plus, Ruler, Search, Share2, ThumbsUp, Trash2, User, Workflow, X } from "lucide-react";
import { useRouter } from "../router.jsx";
import { AGENTS, ALL_CAPABILITIES, demoMessages, EXAMPLE_PROMPT, HOME_COPY, INITIAL_HISTORY, INITIAL_SPACES, makePreviewFile, MODELS, SKILLS } from "./data.js";
import { SkillGlyph, AgentGlyph, AbilityIcon, AgentBadge, AgentCard, AgentParameters, Button, Composer, cx, EmptyState, IconButton, Modal, SkillCard, Tag } from "./components.jsx";
import { downloadWord } from "./word-file.js";
import "../design-system/styles.css";
import { HistorySearch } from "../design-system/HistorySearch.jsx";
import { HomeSurface } from "../design-system/HomeSurface.jsx";
import { WorkspaceNavigation, WorkspaceFloatingTools } from "../design-system/WorkspaceNavigation.jsx";
import { ControlGallery } from "./ControlGallery.jsx";
import { DrawingPage, ServicePage } from "../pages/services.jsx";
import "./spec-preview.css";
import { ThinkingSummary, AgentIdentity, IntentConfirmation, IntentSummary, FollowUps, FilePanelToggle, RegressionConfig, TaskJourney, DeliveryCard } from "./ConversationPatterns.jsx";

const uid = () => crypto.randomUUID();
const NAV = [{ scene: "evidence", icon: Search }, { scene: "topic", icon: Lightbulb }, { scene: "grant", icon: Award }, { scene: "drawing", icon: Palette }];
const VIEWS = [{ id: "create", name: "创建对话" }, { id: "chat", name: "对话态" }, { id: "components", name: "卡片与控件" }];

const SAMPLE_DELIVERIES = [
  { ...makePreviewFile(), id: "drawer-word-example", conversationId: "example", name: "临床研究证据整理与实施方案_示例.docx", type: "DOCX" },
  { ...makePreviewFile(), id: "drawer-markdown-example", conversationId: "example", name: "系统综述纳排标准与研究任务说明_示例.md", type: "MD" },
];

function downloadText(name, content) {
  const url = URL.createObjectURL(new Blob([content], { type: "text/markdown;charset=utf-8" }));
  const a = document.createElement("a"); a.href = url; a.download = name; a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function DesignPreview({ delivery }) {
  const router = useRouter();
  const view = VIEWS.some(item => item.id === router.get("view")) ? router.get("view") : "create";
  const [scene, setScene] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [sections, setSections] = useState({ spaces: true, history: true });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [annotate, setAnnotate] = useState(false);
  const [draft, setDraft] = useState("");
  const [model, setModel] = useState("pro");
  const [ability, setAbility] = useState(null);
  const [spaces, setSpaces] = useState(INITIAL_SPACES);
  const [space, setSpace] = useState("personal");
  const [attachments, setAttachments] = useState([]);
  const [sessions, setSessions] = useState(() => INITIAL_HISTORY.map(item => ({ ...item, messages: demoMessages(item.id === "example" ? EXAMPLE_PROMPT : "请帮我整理「" + item.title + "」的研究目标与任务。"), model: "pro", space: "personal" })));
  const [currentId, setCurrentId] = useState("example");
  const [messages, setMessages] = useState(demoMessages);
  const [files, setFiles] = useState(SAMPLE_DELIVERIES);
  const [fileOpen, setFileOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState(0);
  const [menu, setMenu] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [notice, setNotice] = useState("");
  const [liked, setLiked] = useState([]);
  const [formName, setFormName] = useState("");
  const [formError, setFormError] = useState(false);
  const timer = useRef(null);
  const scroll = useRef(null);
  const menuRef = useRef(null);
  const dialogOpen = useRef(false);
  dialogOpen.current = Boolean(dialog || searchOpen);
  const current = sessions.find(item => item.id === currentId);
  const copy = HOME_COPY[scene];

  function notify(text) { window.clearTimeout(timer.current); setNotice(text); timer.current = window.setTimeout(() => setNotice(""), 2800); }
  function openView(next, section) { router.navigate("/design-system?view=" + next + (section ? "&section=" + section : "")); setMobileOpen(false); setMenu(null); }
  function newTask(nextScene = "home") { setScene(nextScene); setDraft(""); setAttachments([]); setAbility(null); setSpace("personal"); setFileOpen(false); openView("create"); }
  function openSearch() { setSearchOpen(true); setSearchQuery(""); setSearchIndex(0); setMenu(null); }
  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => { const previous = document.title; document.title = "数愈 AI · 设计规范预览"; return () => { document.title = previous; }; }, []);
  useEffect(() => { setSessions(items => items.map(item => item.id === currentId ? { ...item, messages, model, space } : item)); }, [messages, currentId, model, space]);
  useEffect(() => {
    function key(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "j") { event.preventDefault(); newTask(); }
      if (event.key === "Escape" && !dialogOpen.current) { setMenu(null); setMobileOpen(false); setFileOpen(false); }
    }
    function pointer(event) { if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest(".sp-history-more")) setMenu(null); }
    document.addEventListener("keydown", key); document.addEventListener("pointerdown", pointer);
    return () => { document.removeEventListener("keydown", key); document.removeEventListener("pointerdown", pointer); };
  }, []);
  useEffect(() => {
    if (view === "components") {
      const section = router.get("section");
      if (section) requestAnimationFrame(() => document.getElementById(section === "agents" ? "sp-agent-section" : "sp-skill-section")?.scrollIntoView({ block: "start" }));
    }
  }, [view, router.search]);

  function attachFiles(items) { setAttachments(previous => [...previous, ...items.map(file => ({ id: uid(), name: file.name, size: file.size }))]); notify("已添加本地附件名称，未上传文件"); }
  function openSession(item) { setCurrentId(item.id); setMessages(item.messages); setModel(item.model); setSpace(item.space); setDraft(""); setAttachments([]); setAbility(null); setSearchOpen(false); setFileOpen(false); openView("chat"); }
  function responseFor(item, topic) { if (item?.id === "statistics" || /回归分析/.test(topic)) return { id: uid(), role: "assistant", type: "regression" }; return item?.kind === "agent" ? { id: uid(), role: "assistant", type: "parameters", capabilityId: item.id, topic } : { id: uid(), role: "assistant", type: item ? "skill" : "overview", capabilityId: item?.id }; }
  function enterConversation(text, selected = null) {
    const user = { id: uid(), role: "user", text, attachments: [...attachments], model, capabilityId: selected?.id };
    const next = [user, responseFor(selected, text)];
    const id = uid();
    setSessions(items => [{ id, title: text.slice(0, 24), messages: next, space, model }, ...items]);
    setCurrentId(id); setMessages(next); setDraft(""); setAttachments([]); setAbility(null); openView("chat");
  }
  function send() {
    const text = draft.trim() || "请帮我整理附件中的研究资料。";
    if (view === "create") enterConversation(text, ability);
    else { setMessages(items => [...items, { id: uid(), role: "user", text, attachments: [...attachments], model }, responseFor(null, text)]); setDraft(""); setAttachments([]); requestAnimationFrame(() => scroll.current?.scrollTo({ top: scroll.current.scrollHeight, behavior: "smooth" })); }
  }
  function call(item) {
    if (!item.online) { setDialog({ type: "capability", item }); return; }
    setDialog(null);
    const text = "使用「" + item.name + "」，结合当前研究问题与材料继续。";
    if (view === "chat") {
      const topic = messages.filter(message => message.role === "user").at(-1)?.text || "";
      setMessages(items => [...items, { id: uid(), role: "user", text, model, attachments: [], capabilityId: item.id }, responseFor(item, topic)]);
      requestAnimationFrame(() => scroll.current?.scrollTo({ top: scroll.current.scrollHeight, behavior: "smooth" }));
    } else enterConversation(draft.trim() || text, item);
  }
  function runAgent(message, topic, notes) {
    const nextId=uid();
    setMessages(items=>[...items.map(entry=>entry.id===message.id?{...entry,configured:true,topic,notes}:entry),{id:uid(),role:"user",text:"我已确认任务配置。"+(notes ? "\n"+notes : ""),model,attachments:[]},{id:nextId,role:"assistant",type:"running",capabilityId:message.capabilityId,topic,notes}]);
    requestAnimationFrame(()=>scroll.current?.scrollTo({top:scroll.current.scrollHeight,behavior:"smooth"}));
  }
  function finishAgent(message) {
    const preview = makePreviewFile(message.topic, ALL_CAPABILITIES.find(item=>item.id===message.capabilityId)?.steps);
    const file={...preview,content:preview.content+(message.notes?"\n## 已确认输入配置\n\n"+message.notes+"\n":""),id:message.id,conversationId:currentId};
    setFiles(items=>[...items.filter(entry=>entry.id!==file.id&&entry.id!==file.id+"-word"),file,{...file,id:file.id+"-word",name:file.name.replace(/\.md$/,".docx"),type:"DOCX"}]);
    setMessages(items=>items.map(entry=>entry.id===message.id?{...entry,type:"track"}:entry));
    notify("本地演示完成，已生成示例文件");
  }
  function downloadFile(file) {
    if (file.type === "DOCX") downloadWord(file.name, file.content);
    else downloadText(file.name, file.content);
  }
  function exportSession(item = current) {
    if (!item) return;
    const body = "# " + item.title + "\n\n> 设计规范预览中的本地示例，不包含真实模型结果。\n\n" + item.messages.map(message => (message.role === "user" ? "## 用户\n\n" + message.text : "## 助手示例\n\n明确研究问题、组织材料与可复核的任务流程。") + (message.attachments?.length ? "\n\n附件名称：" + message.attachments.map(file => file.name).join("、") : "")).join("\n\n");
    downloadText(item.title.slice(0, 24).replace(/[\\/:*?"<>|]/g, "_") + "_示例.md", body);
  }
  const detail = item => setDialog({ type: "capability", item });
  const sharedComposer = { draft, onDraft: setDraft, model, onModel: setModel, ability, onAbility: setAbility, space, spaces, onSpace: setSpace, attachments, onAttach: attachFiles, onRemove: id => setAttachments(items => items.filter(file => file.id !== id)), onSend: send, onViewAll: kind => openView("components", kind === "agent" ? "agents" : "skills"), onNewSpace: () => { setFormName(""); setFormError(false); setDialog({ type: "new-space" }); }, onPickExisting: () => setDialog({ type: "sample-attachment" }), annotate };
  const searchResults = sessions.filter(item => item.title.toLowerCase().includes(searchQuery.trim().toLowerCase()));
  const visibleFiles = files.filter(file => file.conversationId === currentId);

  function menuAction(type) {
    const item = sessions.find(session => session.id === menu?.id); setMenu(null);
    if (!item) return;
    if (type === "export") { exportSession(item); return; }
    setFormError(false); setFormName(item.title); setDialog({ type, item });
  }
  function recommendations() {
    return <><section className="sp-recommendation-group"><RecommendationHeading kind="skill">推荐科研 Skill</RecommendationHeading><div className="sp-recommendation-grid sp-three-skills">{SKILLS.slice(0,3).map(item=><SkillCard key={item.id} item={item} context="chat" onDetail={detail} onCall={call}/>)}</div></section><section className="sp-recommendation-group"><RecommendationHeading kind="agent">推荐科研 Agent</RecommendationHeading><div className="sp-two-agents">{AGENTS.slice(0,2).map(item=><AgentCard key={item.id} item={item} context="chat" onDetail={detail} onCall={call}/>)}</div></section><FollowUps onChoose={text=>{setDraft(text);requestAnimationFrame(()=>document.querySelector('.sp-compose-chat textarea')?.focus());}}/></>;
  }
  function renderAssistant(message) {
    const item = ALL_CAPABILITIES.find(capability => capability.id === message.capabilityId);
    if (message.type === "intent") return <><ThinkingSummary/><p>可以。围绕 GLP-1 与心血管结局，建议先明确你希望得到的研究成果，再确定纳入人群、对照方式与主要结局。</p><p>如果你准备整合已有文献，推荐选择<strong>系统评价与 Meta 分析</strong>；如果已有研究数据，也可以先分析影响因素。</p><IntentConfirmation selected={message.intentIndex} locked={message.intentIndex!=null} onChoose={(text,index)=>{
      const target=index===1?SKILLS.find(x=>x.id==='statistics'):AGENTS[0];
      setMessages(items=>[...items.map(entry=>entry.id===message.id?{...entry,intentIndex:index}:entry),{id:uid(),role:'user',text:'确认，我希望'+text+'。使用「'+target.name+'」继续。',capabilityId:target.id,attachments:[],model},responseFor(target,message.topic)]);
      requestAnimationFrame(()=>scroll.current?.querySelector('.sp-message:last-child')?.scrollIntoView({block:'start',behavior:'smooth'}));
    }}/></>;
    if (message.type === "regression") return <><IntentSummary topic="根据数据列名与结局类型，配置回归分析任务。" onEdit={() => setDraft("调整回归分析目标：")} /><RegressionConfig onConfirm={() => notify("已保留本地配置，未执行统计分析")} /></>;
    if (message.type === "parameters" && item) return <><p>{message.configured ? "配置已确认，以下保留本次任务输入。" : <>已选择「{item.name}」。请补充下方配置，确认后继续。</>}</p><TaskJourney steps={item.steps} waiting /><AgentIdentity item={item} description={message.configured?"已保留本次输入，可回看确认内容":"补充任务信息，确认后开始整理研究方案"}/><AgentParameters item={item} locked={message.configured} initialTopic={message.topic} onRun={(topic, notes) => runAgent(message, topic, notes)} /></>;
    if ((message.type === "track" || message.type === "running") && item) {
      const file = files.find(entry => entry.id === message.id);
      return <><div className="sp-agent-identity"><img src={sitePath("/design-preview/agent-robot.webp")} alt="Agent 机器人"/><div><div><strong>{item.name}</strong></div><span>{message.type === "running" ? "任务计划与执行过程" : "任务演示已完成，可查看过程与交付"}</span></div></div><details className="sp-task-summary"><summary><AgentGlyph size={16} /><strong>已确认的任务配置</strong><span>查看</span><ChevronDown size={14} /></summary><div><p><b>研究主题：</b>{message.topic}</p>{message.notes && <p><b>其他要求：</b>{message.notes}</p>}<p>使用当前会话的模型、材料与科研空间归属。</p></div></details><TaskJourney key={"run-" + message.id} steps={item.steps} completed={message.type === "track"} autoRun={message.type === "running"} onComplete={()=>finishAgent(message)} />{message.type === "track" && <><section className="sp-output-content"><h4>研究任务说明</h4><p>已根据你的配置整理任务范围与交付结构。正式执行时，将按纳入标准核对证据，并保留筛选与分析依据。</p><ul><li>研究主题：{message.topic}</li><li>下一步：按已确认的研究范围制定检索式，记录纳入与排除依据，并建立数据提取表。</li><li>交付形式：{item.output}</li></ul></section><p className="sp-assistant-note">以下为输出与文件样式示例，未执行真实科研任务。</p>{file && <div className="sp-source-deliveries">{files.filter(entry=>entry.id===message.id || entry.id===message.id+"-word").map(entry=><DeliveryCard key={entry.id} file={entry} delivery={delivery} onDownload={()=>downloadFile(entry)}/>)}</div>}{recommendations()}</>}</>;
    }
    if (message.type === "skill" && item) return <><div className="sp-called-ability"><AbilityIcon item={item} size={17} /><strong>{item.name}</strong><Tag>Skill</Tag></div><p>当前会话已保留研究问题、附件名称和科研空间归属。这里展示单项能力调用后的对话样式，你可以继续补充研究对象、时间范围与需要的交付形式。</p><p className="sp-assistant-note">交互样例未接入真实模型，不提供虚构的检索或统计结果。</p></>;
    return <><IntentSummary onEdit={() => setDraft("我希望调整研究目标：")} /><p>建议先明确研究问题，再组织证据与后续任务。可以从以下三个方面收敛研究范围：</p><h3>先把研究问题说清楚</h3><ul><li><strong>研究对象：</strong>明确目标人群、样本与纳入条件。</li><li><strong>比较方式：</strong>说明关注的干预、暴露或对照。</li><li><strong>主要结局：</strong>确定需要回答的问题及评价指标。</li></ul><p>信息明确后，再选择对应的科研能力。单项任务可以使用 Skill，连续的多步骤任务可以交给 Agent。<button type="button" className="sp-citation" aria-label="查看引用样式示例" onClick={() => setDialog({ type: "citation" })}>1</button></p>{recommendations()}<p className="sp-assistant-note">以上内容与评分均为交互样例，不包含真实文献检索结果。</p></>;
  }

  return <div className={cx("sp-design-app ds-spec-preview", view === "chat" && "ds-is-chat", collapsed && "sp-nav-collapsed", mobileOpen && "sp-mobile-open", annotate && "sp-show-measures")}>
    {mobileOpen && <button type="button" className="sp-nav-scrim" aria-label="关闭导航遮罩" onClick={() => setMobileOpen(false)} />}
    <WorkspaceNavigation collapsed={collapsed} mobileOpen={mobileOpen} onCollapse={() => {setCollapsed(true);setMobileOpen(false);}} onNewTask={() => newTask()} onScene={newTask} onCapabilities={kind => openView('components',kind === 'agent' ? 'agents' : 'skills')} activeScene={view === 'create' ? scene : null} activeCapability={view === 'components' ? (router.get('section') === 'agents' ? 'agent' : 'skill') : null} spaces={spaces} sessions={sessions} currentId={view === 'chat' ? currentId : null} onSpace={item => {newTask();setSpace(item.id);}} onNewSpace={() => {setFormName('');setFormError(false);setDialog({type:'new-space'});}} onOpenSession={openSession} historyMenuId={menu?.id} onHistoryMenu={(item,trigger) => {if(menu?.id===item.id){setMenu(null);return;}const r=trigger.getBoundingClientRect();setMenu({id:item.id,x:Math.max(8,Math.min(window.innerWidth-206,r.right-190)),y:Math.min(window.innerHeight-192,r.bottom+5)});}} onSearch={openSearch} onNavigate={target => router.navigate(target)} onAccountAction={action=>setDialog({type:action==='logout'?'account-signout':'account-invite'})} onNotice={notify}/>
    <main className={cx("sp-workspace", fileOpen && "sp-has-file-panel")}><header className="sp-topbar"><div className="sp-topbar-left"><WorkspaceFloatingTools onNewTask={() => newTask()} onExpand={() => {setCollapsed(false);setMobileOpen(true);}} onSearch={openSearch}/><span className="sp-topbar-title">{view === "chat" ? current?.title || "科研对话" : view === "components" ? "设计规范" : copy.label}</span></div><nav className="sp-view-switch" aria-label="规范预览视图">{VIEWS.map(item => <button type="button" key={item.id} aria-current={view === item.id ? "page" : undefined} className={cx(view === item.id && "is-active")} onClick={() => openView(item.id)}>{item.name}</button>)}</nav><select className="sp-mobile-view" aria-label="切换规范预览视图" value={view} onChange={event => openView(event.target.value)}>{VIEWS.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select><div className="sp-topbar-actions"><span className="sp-review-label">规范预览</span><button type="button" className={cx("sp-dimension-toggle", annotate && "is-active")} aria-pressed={annotate} onClick={() => setAnnotate(value => !value)}><Ruler size={16} /><span>尺寸</span></button>{view === "chat" && <><IconButton label="分享当前示例对话" onClick={() => setDialog({ type: "share", item: current })}><Share2 size={17} /></IconButton><FilePanelToggle label="会话文件" open={fileOpen} controls="sp-conversation-files" onToggle={() => setFileOpen(value => !value)}/></>}</div></header>
      {view === "create" && <div className="sp-page-scroll sp-spec-entry">
        {scene === "home" ? (
          <HomeSurface
            title={<>从一个问题，到真正的<span className="sp-title-accent">科研成果</span></>}
            description={copy.description}
            composer={<Composer {...sharedComposer} />}
            onCapability={detail}
          />
        ) : (
          <div className="business-workspace sp-spec-workspace"><div className="ds-first-level sp-spec-channel">
            {scene === "drawing" ? (
              <DrawingPage showCaseType onToast={notify} onStart={data => enterConversation(data.text)} />
            ) : (
              <ServicePage key={scene} kind={scene} showCaseType onToast={notify} onStart={data => enterConversation(data.text)} />
            )}
          </div></div>
        )}
      </div>}
      {view === "components" && <ControlGallery onDetail={detail} onCall={call} onNotice={notify} onDelete={() => setDialog({ type: "delete-sample" })} annotate={annotate} onPreviewScene={newTask} deliverySamples={SAMPLE_DELIVERIES} delivery={delivery} onDownloadFile={downloadFile} onPreviewDrawer={() => {
        const example = sessions.find(item => item.id === "example") || current;
        if (example) openSession(example);
        else openView("chat");
        setFileOpen(true);
      }} />}
      {view === "chat" && <div className="sp-chat-layout"><div className="sp-chat-center"><div className="sp-chat-scroll" ref={scroll}><div className={cx("sp-reading-column", annotate && "sp-measured")} data-measure="正文阅读列 752px">{space !== "personal" && <div className="sp-chat-space"><Folder size={14} />{spaces.find(item => item.id === space)?.name}</div>}{messages.map(message => <article className={cx("sp-message", message.role === "user" ? "sp-user-message" : "sp-assistant-message")} key={message.id} aria-label={message.role === "user" ? "我的消息" : "助手示例回复"}>{message.role === "user" ? <div className="sp-user-bubble">{message.capabilityId && <span className="sp-message-capability">{ALL_CAPABILITIES.find(item => item.id === message.capabilityId)?.kind === 'skill' ? <SkillGlyph size={14}/> : <AgentGlyph size={14}/>} {ALL_CAPABILITIES.find(item => item.id === message.capabilityId)?.name}</span>}<p>{message.text.startsWith("我已确认任务配置。") ? <><span className="sp-user-confirmation-title">我已确认任务配置。</span>{message.text.slice("我已确认任务配置。".length).replace(/^\n/, "")}</> : message.text}</p>{message.attachments?.length > 0 && <div className="sp-message-files">{message.attachments.map(file => <span key={file.id}><FileText size={13} />{file.name}</span>)}</div>}</div> : <><div className="sp-assistant-body">{renderAssistant(message)}</div><div className="sp-message-actions"><IconButton label="复制示例回复" onClick={async () => { try { await navigator.clipboard.writeText("交互样例：先明确研究对象、比较方式与主要结局，再选择科研能力。此内容不是实际科研结果。"); notify("示例回复已复制"); } catch { notify("浏览器未允许复制"); } }}><Copy size={16} /></IconButton><IconButton label={liked.includes(message.id) ? "取消有帮助标记" : "标记示例回复有帮助"} aria-pressed={liked.includes(message.id)} onClick={() => setLiked(items => items.includes(message.id) ? items.filter(id => id !== message.id) : [...items, message.id])}><ThumbsUp size={16} /></IconButton><IconButton label="分享示例对话" onClick={() => setDialog({ type: "share", item: current })}><Share2 size={16} /></IconButton></div></>}</article>)}</div></div><div className="sp-chat-composer-dock"><Composer {...sharedComposer} chat /><p className="sp-preview-disclaimer">交互样例，不调用真实科研模型</p></div></div>{fileOpen && <aside id="sp-conversation-files" className="sp-file-panel" aria-label="会话文件抽屉">
        <header><h2>文件 · {visibleFiles.length}</h2><IconButton label="关闭文件抽屉" onClick={() => setFileOpen(false)}><X size={18} aria-hidden="true"/></IconButton></header>
        {visibleFiles.length ? <div className="sp-spec-file-list">{visibleFiles.map(file => (
          <DeliveryCard key={file.id} file={file} delivery={delivery} onDownload={() => downloadFile(file)}/>
        ))}</div> : <div className="sp-file-empty"><FileText size={28} strokeWidth={1.4} /><strong>当前还没有文件</strong><p>试用一个 Agent，查看交付文件的呈现方式。</p></div>}
      </aside>}</div>}
      {annotate && <div className="sp-measure-legend"><Ruler size={13} /><span>左侧导航 260</span><span>输入框 776</span><span>阅读列 752</span>{fileOpen && <span>文件抽屉 440 / 292</span>}<span>工作区内容 1000</span><span>单位 px，均为最大宽度或固定尺寸</span></div>}
    </main>
    {menu && <div className="sp-history-menu" role="menu" aria-label="历史对话操作" ref={menuRef} style={{ left: menu.x, top: Math.max(8, menu.y) }}><button type="button" role="menuitem" onClick={() => menuAction("rename")}><FileText size={15} />重命名</button><button type="button" role="menuitem" onClick={() => menuAction("share")}><Share2 size={15} />分享</button><button type="button" role="menuitem" onClick={() => menuAction("export")}><Download size={15} />导出 Markdown</button><hr /><button type="button" role="menuitem" className="sp-danger-text" onClick={() => menuAction("delete")}><Trash2 size={15} />删除</button></div>}
    {searchOpen && <HistorySearch sessions={sessions} onClose={() => setSearchOpen(false)} onChoose={item => {setSearchOpen(false);openSession(item);}}/>}
    {dialog && <Modal title={dialog.type === "capability" ? "能力详情" : dialog.type === "sample-attachment" ? "选择示例附件" : dialog.type === "rename" ? "重命名对话" : dialog.type === "new-space" ? "新建示例科研空间" : dialog.type === "delete" || dialog.type === "delete-sample" ? "删除示例" : dialog.type === "share" ? "分享对话" : dialog.type === "account" ? "个人中心" : dialog.type === "account-signout" ? "退出登录" : dialog.type === "account-invite" ? "邀请好友" : "引用样式说明"} onClose={() => { setDialog(null); setFormError(false); }} wide={dialog.type === "capability"}>
      {dialog.type === "capability" && <div className="sp-capability-detail"><div className="sp-detail-heading"><AbilityIcon item={dialog.item} size={25} /><div><h3>{dialog.item.name}</h3><p>{dialog.item.description}</p></div></div><div className="sp-detail-tags">{dialog.item.kind === "agent" ? <AgentBadge /> : <Tag>{dialog.item.kind === "case" ? "案例模板" : "Skill"}</Tag>}<Tag tone={dialog.item.online ? "green" : "neutral"}>{dialog.item.online ? "可调用样式示例" : "尚未上线"}</Tag>{dialog.item.reviewed && <Tag tone="blue">{dialog.item.score.toFixed(1)} 评分示例</Tag>}</div>{dialog.item.steps && <div className="sp-detail-flow"><h4>执行流程</h4><ol>{dialog.item.steps.map(step => <li key={step}>{step}</li>)}</ol><p>预期交付：{dialog.item.output}</p></div>}<dl className="sp-detail-meta"><div><dt>来源作者</dt><dd>数愈团队（示例）</dd></div><div><dt>展示版本</dt><dd>设计评审样板</dd></div></dl><p className="sp-detail-note">此处展示详情信息与调用入口样式，能力状态和评分均为演示数据。</p><div className="sp-detail-actions"><Button variant="primary" disabled={!dialog.item.online} onClick={() => { if (dialog.item.kind === "case") { setDialog(null); setDraft(dialog.item.prompt); openView("create"); } else call(dialog.item); }}>{dialog.item.online ? dialog.item.kind === "agent" ? "配置任务" : dialog.item.kind === "case" ? "使用此案例" : "在对话中使用" : "尚未上线"}</Button><Button aria-pressed={favorites.includes(dialog.item.id)} onClick={() => setFavorites(items => items.includes(dialog.item.id) ? items.filter(id => id !== dialog.item.id) : [...items, dialog.item.id])}><Heart size={15} fill={favorites.includes(dialog.item.id) ? "currentColor" : "none"} />{favorites.includes(dialog.item.id) ? "已收藏" : "收藏"}</Button></div></div>}
      {dialog.type === "sample-attachment" && <><p className="sp-detail-note">以下文件仅用于附件样式评审，不包含真实研究材料。</p><button type="button" className="sp-sample-attachment-row" onClick={() => { setAttachments(items => [...items, { id: uid(), name: "研究资料摘要_示例.md", size: 0 }]); setDialog(null); notify("已选择示例附件名称"); }}><FileText size={20} /><span>研究资料摘要_示例.md</span><Plus size={16} /></button></>}
      {(dialog.type === "rename" || dialog.type === "new-space") && <form noValidate onSubmit={event => { event.preventDefault(); if (!formName.trim()) { setFormError(true); return; } if (dialog.type === "rename") setSessions(items => items.map(item => item.id === dialog.item.id ? { ...item, title: formName.trim() } : item)); else { const id = uid(); setSpaces(items => [...items, { id, name: formName.trim() }]); setSpace(id); notify("已添加本地示例空间"); } setDialog(null); }}><label className="sp-field"><span>{dialog.type === "rename" ? "对话名称" : "空间名称"}</span><input aria-label={dialog.type === "rename" ? "对话名称" : "空间名称"} value={formName} onChange={event => { setFormName(event.target.value); setFormError(false); }} aria-invalid={formError} />{formError && <small className="sp-field-error">名称不能为空。</small>}</label><div className="sp-dialog-actions"><Button onClick={() => setDialog(null)}>取消</Button><button type="submit" className="sp-button sp-button-primary">保存</button></div></form>}
      {(dialog.type === "delete" || dialog.type === "delete-sample") && <><p className="sp-dialog-copy">{dialog.type === "delete" ? "将移除本预览中的「" + dialog.item.title + "」。不会修改真实账户中的会话。" : "这是危险操作的确认样式，不会删除任何业务数据。"}</p><div className="sp-dialog-actions"><Button onClick={() => setDialog(null)}>取消</Button><Button variant="danger" onClick={() => { if (dialog.type === "delete") { setSessions(items => items.filter(item => item.id !== dialog.item.id)); if (currentId === dialog.item.id) newTask(); } setDialog(null); notify("示例删除操作已完成"); }}>确认删除示例</Button></div></>}
      {dialog.type === "share" && <div className="sp-info-sample"><Info size={19} /><div><strong>本地样板未启用公开分享</strong><p>真实对话分享需要先定义可见范围和访问权限。你可以导出示例对话来检查导出样式。</p><Button small onClick={() => exportSession(dialog.item)}>导出示例对话</Button></div></div>}
      {dialog.type === "citation" && <div className="sp-info-sample"><BookOpen size={20} /><div><strong>引用与来源的展示位置</strong><p>这是可点击引用标记的样式示例。正式内容应链接可核验的文献、作者和原始来源，本预览不虚构参考文献。</p></div></div>}
      {dialog.type === "account-invite" && <div className="sp-account-preview"><div><h3>邀请好友一起科研</h3><p>邀请好友体验 KGcure 学术科研工作台。邀请链接将在接入账户服务后提供。</p></div><Button onClick={() => setDialog(null)}>知道了</Button></div>}
      {dialog.type === "account-signout" && <div className="sp-account-preview"><div><p>这是本地预览，退出将返回欢迎页。</p></div><Button onClick={() => setDialog(null)}>取消</Button><Button variant="danger" onClick={() => { setDialog(null); router.navigate('/welcome'); }}>退出登录</Button></div>}
      {dialog.type === "account" && <div className="sp-account-preview"><span className="sp-avatar"><User size={20} /></span><div><h3>个人中心</h3><p>本次评审保留账户入口，资料、会员与设置沿用已有业务页面。</p></div><Button onClick={() => { setDialog(null); router.navigate("/workspace/profile"); }}>查看原有个人资料页<ArrowUpRight size={14} /></Button></div>}
    </Modal>}
    {notice && <div className="sp-toast" role="status"><Check size={15} />{notice}</div>}
  </div>;
}
