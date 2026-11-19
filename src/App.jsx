import { COMMUNITY_SKILL_EXAMPLES } from './content/community-skill-examples.js';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "./router.jsx";
import {
  ArrowRight,
  ArrowUp,
  Award,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  CreditCard,
  FlaskConical,
  Folder,
  Languages,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Menu,
  MessageSquarePlus,
  MessagesSquare,
  Microscope,
  MoreHorizontal,
  Palette,
  PanelLeftClose,
  Paperclip,
  Search,
  Sparkles,
  Upload,
  User,
  X,
} from "lucide-react";
import { categories, researchWorkflows, shortcuts } from "./data.js";
import { Approvals, Checkout, MembershipPlans, MyFiles, ProfilePage, Recharge } from "./pages/account.jsx";
import { PersonalVerification } from "./pages/PersonalVerification.jsx";
import { BillingUsage } from "./pages/BillingUsage.jsx";
import { SAMPLE_QUOTA_REMAINING } from "./pages/billing-usage-data.js";
import { DrawingChat, MultiStepChat, WorkflowAssistantChat } from "./pages/chats.jsx";
import { LandingPage } from "./pages/landing.jsx";
import { DrawingPage, ServicePage } from "./pages/services.jsx";
import { ResearchSpaceDetail, ResearchSpaceList } from "./pages/spaces.jsx";
import { WorkflowCase, WorkflowDetail, WorkflowList } from "./pages/workflows.jsx";
import { HistorySearch } from "./design-system/HistorySearch.jsx";
import { BusinessFrame } from "./design-system/BusinessFrame.jsx";
import { CapabilityStore } from "./design-system/CapabilityStore.jsx";
import { BusinessHome } from "./design-system/BusinessHome.jsx";
import { DesignPreview } from "./design-preview/DesignPreview.jsx";
import { CapabilityDetail } from './design-system/CapabilityDetail.jsx';
import { ResearchConversation, makeSession } from './design-system/ResearchConversation.jsx';
import { ResearchSpaces, initialResearchSpaces } from './design-system/ResearchSpaces.jsx';
import { ContributionPage } from './design-system/ContributionPage.jsx';
import { CapabilityCase } from './design-system/CapabilityCase.jsx';
import { SecondaryPageShell } from './design-system/SecondaryPageShell.jsx';
import { capabilityById, capabilityPath, downloadText } from './content/catalog.js';
import { canUseCapability, EXCLUSIVE_AGENT_REQUIREMENT, previewMembershipTier } from './content/membership.js';
import { Button, Modal } from './design-preview/components.jsx';

const cx = (...items) => items.filter(Boolean).join(" ");

const models = [
  { name: "SHUYU Flash", description: "响应速度更快，兼顾质量与使用成本，适合问答、改写、总结等常规任务" },
  { name: "SHUYU Pro", description: "具备更强的分析与推理能力，适合专业研究、复杂问题和多步骤任务" },
  { name: "SHUYU Image", description: "生成和修改科研图片，支持图片参考与多种格式导出" },
];

const CONVERSATIONS = [
  { id: "d6afecac-2d0c-49e5-952f-ea432738f373", title: "工作流全流程展示" },
  { id: "e9dd87e0-b232-479d-b0a9-5ba249a76a78", title: "科研绘图流程" },
  { id: "d6c2cf5e-73a8-4ec2-999e-07ff5c2f2943", title: "自由对话-多步骤完整演示" },
  { id: "d00e51b8-6552-4d64-9042-9c537a7f8c61", title: "工作流推荐助手" },
];

function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function AccountMenu({ onNavigate, onClose }) {
  return (
    <div className="menu account-menu" role="menu" aria-label="账户菜单">
      <button type="button" role="menuitem" className="menu-item" onClick={() => onNavigate("/workspace/my-files")}>
        <Folder size={16} /><span>我的文件</span>
      </button>
      <button type="button" role="menuitem" className="menu-item" onClick={() => onNavigate("/workspace/approvals")}>
        <ClipboardCheck size={16} /><span>我的审批</span>
      </button>
      <div className="menu-divider" />
      <button type="button" role="menuitem" className="menu-item" onClick={() => onNavigate("/workspace/membership")}>
        <CreditCard size={16} /><span>账单与用量</span>
      </button>
      <button type="button" role="menuitem" className="menu-item" onClick={() => onNavigate("/workspace/membership-plans")}>
        <Sparkles size={16} /><span>会员套餐</span>
      </button>
      <button type="button" role="menuitem" className="menu-item" onClick={() => onNavigate("/workspace/profile")}>
        <User size={16} /><span>个人资料</span>
      </button>
      <div className="menu-divider" />
      <button type="button" role="menuitem" className="menu-item" onClick={() => onNavigate("/workspace/profile")}>
        <Languages size={16} /><span>语言</span><ChevronRight size={14} className="menu-chevron" />
      </button>
      <div className="menu-divider" />
      <button type="button" className="menu-item is-danger" onClick={() => { onClose(); onNavigate("/welcome"); }}>
        <LogOut size={16} /><span>退出登录</span>
      </button>
    </div>
  );
}

function Sidebar({ path, collapsed, mobileOpen, accountOpen, accountRef, onToggleCollapse, onCloseMobile, onToggleAccount, onSearch, onNavigate }) {
  const isChat = path.startsWith("/workspace/chats/") && path !== "/workspace/chats/new";
  const activeId = isChat ? path.split("/").pop() : null;

  return (
    <>
      {mobileOpen ? <button type="button" aria-label="关闭侧边栏" className="sidebar-scrim" onClick={onCloseMobile} /> : null}
      <aside className={cx("sidebar", collapsed && "is-collapsed", mobileOpen && "is-open")}>
        <div className="sidebar-head">
          <span className="logo-full">KGcure</span>
          <span className="logo-mini">KG</span>
          <button type="button" className="icon-button sidebar-collapse" aria-label="切换侧边栏" onClick={onToggleCollapse}>
            <PanelLeftClose size={16} />
          </button>
          <button type="button" className="icon-button sidebar-close-mobile" aria-label="关闭侧边栏" onClick={onCloseMobile}>
            <X size={16} />
          </button>
        </div>

        <div className="sidebar-primary">
          <button type="button" className="primary-action primary-create" onClick={() => onNavigate("/workspace/chats/new")}>
            <MessageSquarePlus size={18} /><span>新对话</span>
          </button>
          <button type="button" className="primary-action primary-task" onClick={() => onNavigate("/workspace/chats/new?task=research")}>
            <Microscope size={18} /><span>新科研任务</span>
          </button>
        </div>

        <div className="sidebar-scroll">
          <nav className="sidebar-nav" aria-label="高频科研场景">
            {[
              { label: "循证搜索", icon: Search, target: "/workspace/evidence-search" },
              { label: "科研选题", icon: Lightbulb, target: "/workspace/topic-selection" },
              { label: "基金申报", icon: Award, target: "/workspace/grant-application" },
              { label: "科研绘图", icon: Palette, target: "/workspace/scientific-drawing" },
            ].map(({ label, icon: Icon, target }) => (
              <button key={label} type="button" className={cx("side-link", path === target && "is-active")} onClick={() => onNavigate(target)}>
                <Icon size={18} /><span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-section">
            <div className="section-head">
              <span>我的科研空间</span>
              <button type="button" className="section-link" onClick={() => onNavigate("/workspace/research-space")}>全部 (1)</button>
            </div>
            <button
              type="button"
              className={cx("side-link space-link", path.startsWith("/workspace/research-space/") && "is-active")}
              onClick={() => onNavigate("/workspace/research-space/db79430b945744a4aa9b3676d21f5fba")}
            >
              <span className="dot-spacer" /><span>神经发育障碍</span>
            </button>
          </div>

          <div className="sidebar-section recent-section">
            <div className="section-head recent-head">
              <span>最近的对话</span>
              <button type="button" className="icon-button small" aria-label="搜索对话" onClick={onSearch}><Search size={14} /></button>
            </div>
            {CONVERSATIONS.map((item) => (
              <div className="conversation-row" key={item.id}>
                <button
                  type="button"
                  className={cx("conversation-link", activeId === item.id && "is-active")}
                  onClick={() => onNavigate("/workspace/chats/" + item.id)}
                >
                  {item.title}
                </button>
                <button type="button" className="icon-button more-button" aria-label="更多"><MoreHorizontal size={18} /></button>
              </div>
            ))}
          </div>
        </div>

        <div className="account-footer" ref={accountRef}>
          <button type="button" className="account-button" aria-label="账户菜单" aria-expanded={accountOpen} onClick={onToggleAccount}>
            <span className="avatar"><User size={16} /></span>
            <span className="account-info">
              <span className="account-name">周浩</span>
              <span className="account-plan">普通用户</span>
            </span>
            <ChevronDown size={16} className="account-chevron" />
          </button>
          {accountOpen ? <AccountMenu onNavigate={onNavigate} onClose={onToggleAccount} /> : null}
        </div>
      </aside>
    </>
  );
}

function ModeTabs({ mode, onChange }) {
  return (
    <nav className="mode-tabs" aria-label="工作模式">
      <span className={cx("mode-indicator", mode === "research" && "is-research")} aria-hidden="true" />
      <button type="button" aria-current={mode === "chat" ? "page" : undefined} className={cx("mode-tab", mode === "chat" && "is-active")} onClick={() => onChange("chat")}>
        <MessagesSquare size={20} /><span>自由对话</span>
      </button>
      <button type="button" aria-current={mode === "research" ? "page" : undefined} className={cx("mode-tab", mode === "research" && "is-active")} onClick={() => onChange("research")}>
        <FlaskConical size={20} /><span>科研任务</span>
      </button>
    </nav>
  );
}

function Composer({ mode, value, onChange, onSubmit, model, modelOpen, attachOpen, onToggleModel, onSelectModel, onToggleAttach, onToast }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(180, Math.max(82, el.scrollHeight)) + "px";
  }, [value]);

  return (
    <div className="composer-wrap">
      <form
        className="composer"
        onSubmit={(event) => { event.preventDefault(); onSubmit(); }}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
              event.preventDefault();
              onSubmit();
            }
          }}
          placeholder={mode === "chat"
            ? "提出您的医学科研学术疑问，例如：心衰合并衰弱患者有哪些最新高分临床研究热点？"
            : "输入您的科研立项想法，例如：构建一个30天再入院风险预测模型并输出方案..."}
          aria-label="输入科研问题"
          rows={2}
        />

        <div className="composer-footer">
          <div className="composer-tool">
            <button type="button" className="icon-button attach-button" aria-label="添加附件" aria-expanded={attachOpen} onClick={onToggleAttach}>
              <Paperclip size={14} />
            </button>
            {attachOpen ? (
              <div className="menu attach-menu" role="menu" aria-label="添加附件">
                <button type="button" role="menuitem" className="menu-item" onClick={() => onToast("上传文件（原型演示）")}>
                  <Upload size={16} /><span>上传文件</span>
                </button>
                <button type="button" role="menuitem" className="menu-item" onClick={() => onToast("我的文件（原型演示）")}>
                  <Folder size={16} /><span>我的文件</span>
                </button>
              </div>
            ) : null}
          </div>

          <div className="composer-spacer" />

          <div className="composer-model">
            <button type="button" className="model-button" aria-label="选择模型" aria-expanded={modelOpen} onClick={onToggleModel}>{model}</button>
            {modelOpen ? (
              <div className="menu model-menu" role="menu" aria-label="选择模型">
                <div className="menu-caption">选择模型</div>
                {models.map((item) => (
                  <button key={item.name} type="button" role="menuitemradio" aria-checked={model === item.name} className="model-option" onClick={() => onSelectModel(item.name)}>
                    <span className="model-name">{item.name}</span>
                    <span className="model-description">{item.description}</span>
                    {model === item.name ? <Check size={16} className="model-check" /> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <button type="submit" className="submit-button" aria-label="提交" disabled={!value.trim()}><ArrowUp size={16} /></button>
        </div>
      </form>
      <p className="disclaimer">内容由AI生成，仅供参考</p>
    </div>
  );
}

function ShortcutGrid({ onOpen }) {
  return (
    <div className="shortcut-grid">
      {shortcuts.map(({ label, icon: Icon, color, background, description, path }) => (
        <button key={label} type="button" className="shortcut" title={description} onClick={() => onOpen(path)}>
          <span className="shortcut-icon" style={{ background, color }}><Icon size={24} strokeWidth={2} /></span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

function ResearchWorkspace({ onOpen }) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <div className="research-sections">
      <section className="research-section">
        <div className="section-title-row">
          <h2><LayoutDashboard size={16} />我的科研空间</h2>
          <button type="button" className="view-all" onClick={() => onOpen("/workspace/research-space")}>查看全部 <ArrowRight size={14} /></button>
        </div>
        <div className="project-grid">
          <button type="button" className="project-card" onClick={() => onOpen("/workspace/research-space/db79430b945744a4aa9b3676d21f5fba")}>
            <div className="project-meta">
              <span className="status-pill">进行中</span>
              <span className="stage-count">1/10 阶段</span>
            </div>
            <div className="project-title">神经发育障碍</div>
            <div className="project-stage"><span className="stage-dot" />制定研究方案</div>
            <div className="project-enter">进入 <ArrowRight size={14} /></div>
          </button>
        </div>
      </section>

      <section className="research-section workflow-section">
        <div className="section-title-row">
          <h2><Microscope size={16} />医学科研全流程工作流支持</h2>
          <button type="button" className="view-all" onClick={() => onOpen("/workspace/workflows")}>全部工作流 <ArrowRight size={14} /></button>
        </div>

        <div className="category-row" role="tablist" aria-label="工作流分类">
          {categories.map((category, index) => (
            <button
              key={category.title}
              type="button"
              role="tab"
              aria-selected={index === activeCategory}
              className={cx("category-card", index === activeCategory && "is-active")}
              onClick={() => setActiveCategory(index)}
            >
              <span className="category-count">{category.count}</span>
              <span className="category-title">{category.title}</span>
              <span className="category-description">{category.description}</span>
            </button>
          ))}
        </div>

        <div className="workflow-grid">
          {researchWorkflows.map((workflow) => (
            <article key={workflow.title} className="workflow-card">
              <div className="workflow-meta">
                <span className="workflow-icon" style={{ background: workflow.background, color: workflow.color }}>
                  <workflow.icon size={20} />
                </span>
                <span className="workflow-category">{workflow.category}</span>
                <button
                  type="button"
                  className={cx("heart-button", workflow.favorite && "is-on")}
                  aria-label={workflow.favorite ? "取消收藏工作流" : "收藏工作流"}
                  onClick={() => onOpen("heart:" + workflow.title)}
                >
                  <HeartIcon filled={workflow.favorite} />
                </button>
              </div>
              <h3>{workflow.title}</h3>
              <p>{workflow.description}</p>
              <button type="button" className="workflow-enter" onClick={() => onOpen("workflow:" + workflow.title)}>
                进入工作流 <ArrowRight size={14} />
              </button>
            </article>
          ))}
        </div>

        <button type="button" className="workflow-more" onClick={() => onOpen("/workspace/workflows")}>
          查看科研选题与方案设计全部16项工作流 <ArrowRight size={14} />
        </button>
      </section>
    </div>
  );
}

function SearchDialog({ onClose, onNavigate }) {
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current?.focus(); }, []);

  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="search-dialog" role="dialog" aria-modal="true" aria-label="对话搜索">
        <div className="dialog-head">
          <h2>对话搜索</h2>
          <button type="button" className="icon-button" aria-label="关闭" onClick={onClose}><X size={16} /></button>
        </div>
        <input ref={inputRef} className="search-input" placeholder="搜索对话" aria-label="搜索对话" />
        <div className="search-results">
          {CONVERSATIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="search-result"
              onClick={() => { onClose(); onNavigate("/workspace/chats/" + item.id); }}
            >
              <span className="result-title">{item.title}</span>
              <span className="result-meta">3 天前</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function NewChatPage({ mode, onNavigate, onToast }) {
  const [value, setValue] = useState("");
  const [model, setModel] = useState("SHUYU Pro");
  const [modelOpen, setModelOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);
  const composerRef = useRef(null);

  useEffect(() => {
    function onPointer(event) {
      if (composerRef.current && !composerRef.current.contains(event.target)) {
        setModelOpen(false);
        setAttachOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  function submit() {
    if (!value.trim()) return;
    setValue("");
    setModelOpen(false);
    setAttachOpen(false);
    onToast("原型演示：已进入多步骤科研会话");
    onNavigate("/workspace/chats/d6c2cf5e-73a8-4ec2-999e-07ff5c2f2943");
  }

  function openShortcut(target) {
    if (!target) { onToast("原型演示：打开快捷工作流"); return; }
    if (target.startsWith("workflow:")) { onNavigate("/workspace/workflows/template/35a3e188211447888f499c11d0b90345"); return; }
    if (target.startsWith("heart:")) { onToast("已更新收藏状态（原型演示）"); return; }
    onNavigate(target);
  }

  return (
    <div className={cx("page", mode === "research" && "is-research")}>
      <div className="hero">
        <ModeTabs
          mode={mode}
          onChange={(next) => {
            onNavigate(next === "research" ? "/workspace/chats/new?task=research" : "/workspace/chats/new");
            setModelOpen(false);
            setAttachOpen(false);
          }}
        />

        {mode === "chat" ? (
          <>
            <h1 className="hero-title">从一个问题，到真正的<span>科研成果</span></h1>
            <p className="hero-subtitle">专为医学科研设计的一站式 AI 科研系统，把证据、选题、设计、分析、科研产出和完整项目连接起来，帮你从问题持续推进到成果。</p>
          </>
        ) : (
          <>
            <h1 className="hero-title">从一个假设，到系统的<span>科研全流程</span></h1>
            <p className="hero-subtitle">专为医学科研深度任务打造的全自主 AI 工作流，把方案设计、数据清洗、统计建模、成果交付与阶段认定连接起来。</p>
          </>
        )}

        <div ref={composerRef}>
          <Composer
            mode={mode}
            value={value}
            onChange={setValue}
            onSubmit={submit}
            model={model}
            modelOpen={modelOpen}
            attachOpen={attachOpen}
            onToggleModel={() => { setModelOpen((open) => !open); setAttachOpen(false); }}
            onSelectModel={(next) => { setModel(next); setModelOpen(false); }}
            onToggleAttach={() => { setAttachOpen((open) => !open); setModelOpen(false); }}
            onToast={onToast}
          />
        </div>

        {mode === "chat" ? <ShortcutGrid onOpen={openShortcut} /> : <ResearchWorkspace onOpen={openShortcut} />}
      </div>
    </div>
  );
}

export function App() {
  const router = useRouter();
  const path = router.path;
  const previewTier = router.get('preview');
  const tier = previewMembershipTier(previewTier);
  const [localSessions,setLocalSessions]=useState(()=>{try{return JSON.parse(localStorage.getItem('kgcure-sessions-v2')||'[]');}catch{return [];}});
  const [spaces,setSpaces]=useState(initialResearchSpaces);
  const [historyOverrides,setHistoryOverrides]=useState(()=>{try{return JSON.parse(localStorage.getItem('kgcure-history-overrides')||'{}');}catch{return {};}});
  useEffect(()=>localStorage.setItem('kgcure-history-overrides',JSON.stringify(historyOverrides)),[historyOverrides]);
  const visibleHistory=[...localSessions,...CONVERSATIONS].filter(item=>!historyOverrides[item.id]?.hidden).map(item=>({...item,title:historyOverrides[item.id]?.title||item.title}));
  useEffect(()=>{localStorage.setItem('kgcure-sessions-v2',JSON.stringify(localSessions));},[localSessions]);
  useEffect(()=>{localStorage.setItem('kgcure-spaces-v2',JSON.stringify(spaces));},[spaces]);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [guest, setGuest] = useState(() => {
    try { return window.localStorage.getItem("kgcure-guest") === "1"; } catch { return false; }
  });
  const [resetUsed, setResetUsed] = useState(false);
  const [verificationPreview, setVerificationPreview] = useState(null);
  const [restrictedAgent, setRestrictedAgent] = useState(null);
  const accountRef = useRef(null);
  const scrollRef = useRef(null);
  const toastTimer = useRef(null);

  function showToast(message) {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  }

  function saveDelivery(file, spaceId, sessionId) {
    const space = spaces.find(item => item.id === spaceId);
    if (!space) return showToast('此科研空间已不存在');
    const session = localSessions.find(item => item.id === sessionId);
    const id = 'delivery:' + (sessionId || 'design-preview') + ':' + file.id;
    if (space.files.some(item => item.id === id) || (session?.space === spaceId && session.files.some(item => item.id === file.id))) {
      return showToast('「' + space.name + '」中已有此文件');
    }
    const hasContent = typeof file.content === 'string';
    const record = {...file, id, sessionId, author:'周浩', date:Date.now(), source:hasContent ? '对话交付' : '历史交付文件记录'};
    setSpaces(current => current.map(item => item.id === spaceId && !item.files.some(saved => saved.id === id)
      ? {...item, files:[...item.files, record]} : item));
    showToast((hasContent ? '文件已保存到「' : '文件记录已保存到「') + space.name + '」');
  }

  function setGuestState(next) {
    setGuest(next);
    try { window.localStorage.setItem("kgcure-guest", next ? "1" : "0"); } catch {}
  }

  function navigate(target) {
    if (target === "/welcome") {
      setVerificationPreview(null);
      setGuestState(true);
      router.navigate("/");
      setMobileOpen(false);
      setAccountOpen(false);
      return;
    }
    const url = new URL(target, window.location.origin);
    if (previewTier && url.pathname.startsWith('/workspace') && !url.searchParams.has('preview')) {
      url.searchParams.set('preview', tier);
    }
    router.navigate(url.href);
    setRestrictedAgent(null);
    setMobileOpen(false);
    setAccountOpen(false);
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setMobileOpen(false);
    setAccountOpen(false);
  }, [path]);

  useEffect(() => () => { if (toastTimer.current) window.clearTimeout(toastTimer.current); }, []);

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") {
        setAccountOpen(false);
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }
    function onPointer(event) {
      if (accountRef.current && !accountRef.current.contains(event.target)) setAccountOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, []);

  const mode = router.get("task") === "research" ? "research" : "chat";
  const isCase = path.startsWith("/workspace/workflows/") && path.includes("/cases/") && !capabilityById(path.split("/")[4]);
  const isChat = path.startsWith("/workspace/chats/") && path !== "/workspace/chats/new";
  const isHome = path === "/workspace" || path === "/" || path === "/workspace/chats/new";
  const isStore = ["/workspace/skills", "/workspace/agents", "/workspace/workflows", "/workspace/research-space"].includes(path);
  const isFirstLevel = isHome || ["/workspace/evidence-search", "/workspace/topic-selection", "/workspace/grant-application", "/workspace/scientific-drawing", "/workspace/skills", "/workspace/agents", "/workspace/research-space", "/workspace/workflows"].includes(path);

  function requireCapabilityAccess(ability) {
    const item = typeof ability === 'string' ? capabilityById(ability) : ability;
    if (canUseCapability(item, tier)) return true;
    setRestrictedAgent(item);
    return false;
  }

  function startTask(data={}) {
    if (!requireCapabilityAccess(data.ability)) return false;
    const session=makeSession(data);setLocalSessions(items=>[session,...items]);navigate('/workspace/chats/'+session.id);
  }
  function sessionAction(type,item,title){
    if(type==='rename'){
      setHistoryOverrides(values=>({...values,[item.id]:{...values[item.id],title}}));
      setLocalSessions(values=>values.map(session=>session.id===item.id?{...session,title}:session));
    }
    if(type==='hide')setHistoryOverrides(values=>({...values,[item.id]:{...values[item.id],hidden:true}}));
    if(type==='export'){
      const session=localSessions.find(value=>value.id===item.id);
      const body=session?session.messages.map(message=>(message.role==='user'?'## 用户':'## 助手')+'\n\n'+(message.text||'本地任务配置与计划预览')).join('\n\n'):'> 原克隆历史记录。此导航保留标题，原始正文以对应示例页面为准。';
      downloadText(item.title+'.md','# '+item.title+'\n\n'+body);
    }
  }
  function runCapability(item){startTask({ability:item,space:router.get('space')||'personal',origin:router.get('folder')?{folderId:router.get('folder')}:undefined,text:'使用「'+item.name+'」，请协助我完成科研任务。'});}
  const hasBillingMembership = tier !== 'free';

  function renderStandard() {
    if (isHome) return <BusinessHome key={router.search} onStart={startTask} onNavigate={navigate} onToast={showToast} onRequireCapability={requireCapabilityAccess}/>;
    if (path === "/workspace/skills" || path === "/workspace/agents") return <CapabilityStore onRecommend={task=>startTask({text:'我希望'+task.name+'，请先帮我推荐合适的科研能力。',origin:{category:task.category}})} key={path} kind={path.endsWith('skills')?'skill':'agent'} onNavigate={navigate}/>;
    if (path === '/workspace/contribute') return <ContributionPage onToast={showToast}/>;
    if (path.startsWith('/workspace/cases/')) {const [, , ,abilityId,caseId]=path.split('/');return <CapabilityCase item={capabilityById(abilityId)} caseId={caseId} onNavigate={navigate} onRun={runCapability}/>;}
    if (/^\/workspace\/(skills|agents)\//.test(path)) {const id=path.split('/').at(-1),item=capabilityById(id) || (path.startsWith('/workspace/skills/') && COMMUNITY_SKILL_EXAMPLES.find(example=>example.id===id));return item?<CapabilityDetail key={item.id} item={item} tier={tier} onNavigate={navigate} onToast={showToast} onRun={runCapability}/>:<div className="view ds-page-empty"><h1>未找到该能力</h1><button onClick={()=>navigate('/workspace/skills')}>返回商店</button></div>;}
    if (path === "/workspace/evidence-search") return <ServicePage showCaseType key="evidence" onStart={startTask} kind="evidence" onToast={showToast} />;
    if (path === "/workspace/topic-selection") return <ServicePage showCaseType key="topic" onStart={startTask} kind="topic" onToast={showToast} />;
    if (path === "/workspace/grant-application") return <ServicePage showCaseType key="grant" onStart={startTask} kind="grant" onToast={showToast} />;
    if (path === "/workspace/scientific-drawing") return <DrawingPage onStart={startTask} onOpenChat={() => navigate("/workspace/chats/e9dd87e0-b232-479d-b0a9-5ba249a76a78")} onToast={showToast} />;
    if (path === "/workspace/research-space") return <ResearchSpaces spaces={spaces} onSpaces={setSpaces} sessions={localSessions} onStart={startTask} onNavigate={navigate} onToast={showToast}/>;
    if (path.startsWith("/workspace/research-space/")) return <ResearchSpaces key={path} spaces={spaces} onSpaces={setSpaces} sessions={localSessions} onStart={startTask} onNavigate={navigate} spaceId={path.split('/').at(-1)} onToast={showToast}/>;
    if (path === "/workspace/workflows") return <CapabilityStore onRecommend={task=>startTask({text:task.name,origin:{category:task.category}})} key="legacy-agents" kind="agent" onNavigate={navigate}/>;
    if (path.startsWith("/workspace/workflows/template/")) {
      const sourceId=path.split('/')[4],item=capabilityById(sourceId);
      if(item&&path.includes('/cases/'))return <CapabilityCase item={item} caseId={path.split('/').at(-1)} onNavigate={navigate} onRun={runCapability}/>;
      if(item)return <CapabilityDetail key={item.id} item={item} tier={tier} onNavigate={navigate} onToast={showToast} onRun={runCapability}/>;
      return (
        <WorkflowDetail
          onBack={() => navigate("/workspace/workflows")}
          onRun={() => navigate("/workspace/chats/d6c2cf5e-73a8-4ec2-999e-07ff5c2f2943")}
          onCase={() => navigate("/workspace/workflows/template/35a3e188211447888f499c11d0b90345/cases/2cc847b8-ad85-41ba-af44-822c77e69250")}
          onToast={showToast}
        />
      );
    }
    if (path === "/workspace/my-files") return <MyFiles sessions={localSessions} onToast={showToast} />;
    if (path === "/workspace/profile") return <ProfilePage onToast={showToast}
      verified={router.get('verification') === 'verified'}
      verification={verificationPreview} reviewSubmission={router.get('verification') === 'submitted'}
      onVerify={() => navigate('/workspace/profile/verification')} />;
    if (path === "/workspace/profile/verification") return <PersonalVerification onToast={showToast} onSubmit={summary => {
      setVerificationPreview(summary);
      setToast(null);
      navigate('/workspace/profile?verification=submitted');
    }} />;
    if (path === "/workspace/membership" || path === "/workspace/account-quota") {
      const view = (router.get("view") === "points" || path === "/workspace/account-quota") ? "points" : "member";
      return <BillingUsage
        view={view}
        tier={tier}
        resetUsed={resetUsed}
        onUseReset={() => setResetUsed(true)}
        showRecords={router.get("section") === "records"}
        onViewChange={next => navigate(next === 'points' ? '/workspace/membership?view=points' : '/workspace/membership')}
        onPlans={() => navigate('/workspace/membership-plans')}
        onRecharge={() => navigate('/workspace/recharge')}
        onToast={showToast}
      />;
    }
    if (path === "/workspace/membership-plans") {
      return <MembershipPlans tier={tier}
        onCheckout={plan => navigate('/workspace/membership/checkout?plan=' + plan + '&months=1')}
        onBack={() => navigate('/workspace/membership')} />;
    }
    if (path === "/workspace/membership/checkout") {
      return <Checkout plan={router.get("plan") || "BASIC"} tier={tier}
        onBack={() => navigate('/workspace/membership-plans')} onToast={showToast} />;
    }
    if (path === "/workspace/recharge") {
      return <Recharge onBack={() => navigate('/workspace/membership?view=points')}
        onRecords={() => navigate('/workspace/membership?view=points&section=records')}
        onToast={showToast} />;
    }
    if (path === "/workspace/approvals") return <Approvals onFiles={() => navigate("/workspace/my-files")} />;

    return (
      <div className="page">
        <div className="not-found">
          <h1>页面待克隆</h1>
          <p>这个入口还没有对应的原型页面。</p>
          <button type="button" className="workflow-enter" onClick={() => navigate("/workspace/chats/new")}>回到首页 <ArrowRight size={14} /></button>
        </div>
      </div>
    );
  }

  function renderChat() {
    const id = path.split("/").pop();
    const session=localSessions.find(x=>x.id===id);
    const delivery = {spaces, onSave:(file, spaceId) => saveDelivery(file, spaceId, id)};
    if(session)return <ResearchConversation key={id} session={session} tier={tier} onRequireCapability={requireCapabilityAccess} onUpdate={next=>setLocalSessions(items=>items.map(x=>x.id===next.id?{...next,updatedAt:Date.now()}:x))} onNavigate={navigate} delivery={delivery}/>;
    if (id === "e9dd87e0-b232-479d-b0a9-5ba249a76a78") return <DrawingChat onToast={showToast} delivery={delivery} />;
    if (id === "d00e51b8-6552-4d64-9042-9c537a7f8c61") {
      return <WorkflowAssistantChat onOpenWorkflow={() => navigate("/workspace/workflows/template/35a3e188211447888f499c11d0b90345")} onToast={showToast} />;
    }
    if(!["d6afecac-2d0c-49e5-952f-ea432738f373","d6c2cf5e-73a8-4ec2-999e-07ff5c2f2943"].includes(id))return <div className="ds-page-empty"><h1>当前没有此对话的本地记录</h1><p>请从历史列表打开已有会话，或创建新任务。</p><button className="sp-button" onClick={()=>navigate("/workspace/chats/new")}>创建新任务</button></div>;
    return <MultiStepChat title={id === "d6afecac-2d0c-49e5-952f-ea432738f373" ? "工作流全流程展示" : undefined} onToast={showToast} delivery={delivery} />;
  }

  if (path === "/design-system") return <><DesignPreview delivery={{spaces, onSave:saveDelivery}} />{toast && <div className="toast" role="status">{toast}</div>}</>;

  if (guest || path === "/welcome") {
    return (
      <div className="app-bare">
        <LandingPage onLogin={(target) => { setGuestState(false); router.navigate(typeof target==='string'?target:"/workspace/chats/new"); }} />
        {toast ? <div className="toast" role="status">{toast}</div> : null}
      </div>
    );
  }

  if (isCase) {
    return (
      <div className="app-bare">
        <WorkflowCase
          onExit={() => navigate("/workspace/workflows/template/35a3e188211447888f499c11d0b90345")}
          onRun={() => navigate("/workspace/chats/d00e51b8-6552-4d64-9042-9c537a7f8c61")}
          onToast={showToast}
        />
        {toast ? <div className="toast" role="status">{toast}</div> : null}
      </div>
    );
  }

  return (
    <BusinessFrame path={path} accountTier={tier} accountQuotaRemaining={hasBillingMembership ? (resetUsed ? 100 : SAMPLE_QUOTA_REMAINING) : null} collapsed={collapsed} mobileOpen={mobileOpen} onCollapsed={setCollapsed} onMobileOpen={setMobileOpen} onNavigate={navigate} onSearch={() => setSearchOpen(true)} onNotice={showToast} sessions={visibleHistory} onSessionAction={sessionAction} spaces={spaces} onSpaces={setSpaces}>
      {isChat ? renderChat() : isStore ? <SecondaryPageShell key={path} path={path} firstLevel onNavigate={navigate} onToast={showToast} scrollRef={scrollRef}>{renderStandard()}</SecondaryPageShell> : isFirstLevel ? <div className={cx("page-scroll",isHome&&"ds-business-home-scroll","ds-first-level")} ref={scrollRef}>{renderStandard()}</div> : <SecondaryPageShell key={path} path={path} onNavigate={navigate} onToast={showToast} scrollRef={scrollRef}>{renderStandard()}</SecondaryPageShell>}
      {searchOpen ? <HistorySearch sessions={visibleHistory} onClose={() => setSearchOpen(false)} onChoose={item=>{setSearchOpen(false);navigate("/workspace/chats/"+item.id);}}/> : null}
      {restrictedAgent && <Modal title={restrictedAgent.name} onClose={() => setRestrictedAgent(null)}>
        <p>{EXCLUSIVE_AGENT_REQUIREMENT}</p>
        <div className="sp-dialog-actions"><Button onClick={() => setRestrictedAgent(null)}>关闭</Button><Button variant="primary" onClick={() => navigate('/workspace/membership-plans')}>查看会员权益</Button></div>
      </Modal>}
      {toast ? <div className="toast" role="status">{toast}</div> : null}
    </BusinessFrame>
  );
}

