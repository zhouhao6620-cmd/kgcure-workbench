import { CapabilityFilters, useCapabilityFilters } from "../design-system/CapabilityFilters.jsx";
import { IconLibrary } from "../design-system/IconLibrary.jsx";
import { MembershipBadge } from "./AccountControl.jsx";
import { useState } from "react";
import { Check, Copy, Heart, Info, Search, X } from "lucide-react";
import { AGENTS, EXAMPLE_PROMPT, SKILLS } from "./data.js";
import { SkillGlyph, AgentGlyph, StatusTag, AgentBadge, AgentCard, AgentParameters, Button, CaseCategory, cx, EmptyState, IconButton, LoadingButton, NewBadge, SkillCard, Tag } from "./components.jsx";

import { AgentIdentity, CaseGallery, DeliveryCard, RegressionConfig, TaskJourney } from "./ConversationPatterns.jsx";

import { EmptyStateSpec, LayoutSpec, NavigationSpec, PromptSpec } from "./SpecPatterns.jsx";
import { RecommendationHeading } from "../design-system/RecommendationHeading.jsx";
import { BUSINESS_AGENTS, capabilityPath } from "../content/catalog.js";
import { REVIEW_CAPABILITIES } from "../content/review-capabilities.js";
import { useRouter } from "../router.jsx";

const reviewAgent = REVIEW_CAPABILITIES.find(item => item.kind === "agent");
const agentCardExamples = [reviewAgent, BUSINESS_AGENTS[0], BUSINESS_AGENTS.find(item => item.exclusive)];

const COLORS = [
  ["主蓝", "--ds-primary", "#3964FE"], ["正文", "--ds-ink", "#0F1115"],
  ["次级文字", "--ds-secondary", "#626873"], ["导航背景", "--ds-sidebar", "#F9FAFB"],
  ["导航选中", "--ds-nav-selected", "#F0F2F5"], ["消息背景", "--ds-message", "#EDF3FE"],
  ["常规边框", "--ds-line", "#E2E5EB"], ["通用卡片边框", "--ds-card-line", "#EEF0F4"],
];

const SECTIONS = [
  ["spec-layout", "页面布局"], ["spec-type", "颜色与字号"], ["sp-buttons-tags", "按钮与标签"],
  ["spec-navigation", "分页与菜单"], ["sp-skill-section", "科研 Skill"], ["sp-agent-section", "科研 Agent"],
  ["case-spec", "科研案例"], ["spec-empty", "缺省态"], ["spec-chat", "对话组件"], ["sp-icon-library", "图标"], ["sp-semantic-tags", "能力标识与标签"],
];

function TypographySpec({onNotice}) {
  return <section className="sp-gallery-section" id="spec-type">
    <div className="sp-section-heading"><h2>颜色与字号</h2></div>
    <div className="sp-swatches">
      {COLORS.map(([name, token, value]) => <div className="sp-swatch" key={token}>
        <span style={{ backgroundColor: `var(${token})` }} /><strong>{name}</strong><small>{value}</small>
      </div>)}
    </div>
    <div className="sp-type-samples">
      <div><span>一级标题</span><strong className="sp-type-heading">从问题到科研成果</strong><small>34 / 46<br/>手机 26 / 38</small></div>
      <div><span>一级页说明</span><span className="sp-spec-type-desc">整理科研问题、证据与任务</span><small>16 / 26</small></div>
      <div><span>科研正文</span><p>研究问题、证据来源与方法边界，应当清晰、可读、可复核。</p><small>16 / 28</small></div>
      <div><span>案例标题</span><span className="sp-spec-type-case">系统综述与证据整理案例</span><small>14 / 22</small></div>
      <div><span>界面文字</span><span className="sp-spec-type-ui">任务状态、辅助说明、标签</span><small>12 / 20</small></div>
      <div><span>按钮文字</span><Button small onClick={() => onNotice("已触发按钮样例")}>创建任务</Button><small>14 / 22</small></div>
    </div>
  </section>;
}

export function ControlGallery({ onDetail, onCall, onNotice, onDelete, annotate, onPreviewScene, onPreviewDrawer, deliverySamples, delivery, onDownloadFile }) {
  const router = useRouter();
  const {query,setQuery,category,setCategory,source,setSource,list,reset}=useCapabilityFilters(SKILLS);
  const [favorite, setFavorite] = useState(false);
  const [task, setTask] = useState("");
  const [formError, setFormError] = useState(false);
  const [saved, setSaved] = useState(false);
  const [configMode, setConfigMode] = useState("agent");
  const [configConfirmed, setConfigConfirmed] = useState(false);

  return <div className="sp-page-scroll" data-testid="component-scroll"><div className={cx("sp-sheet sp-gallery", annotate && "sp-measured")} data-measure="工作区内容最大 1000px">
    <div className="sp-gallery-intro"><div><h1>设计规范</h1><p>核对页面尺寸、字号和可操作的组件样例。</p></div><Tag tone="blue">待确认</Tag></div>
    <nav className="sp-spec-index" aria-label="规范目录">
      {SECTIONS.map(([id, label]) => <a key={id} href={'#'+id} onClick={event => { event.preventDefault(); document.getElementById(id)?.scrollIntoView({ block: 'start' }); }}>{label}</a>)}
    </nav>
    <LayoutSpec onNotice={onNotice} onPreviewScene={onPreviewScene} onPreviewDrawer={onPreviewDrawer}/>
    <TypographySpec onNotice={onNotice}/>
    <section className="sp-gallery-section" id="sp-buttons-tags"><div className="sp-section-heading"><div><h2>按钮与标签</h2><p>主要、次要、危险、禁用与处理中状态。</p></div></div><div className="sp-component-row sp-spec-buttons"><LoadingButton onComplete={() => onNotice("加载状态演示结束")} /><Button onClick={() => onNotice("次要操作的反馈样式")}>次要按钮</Button><Button variant="ghost" onClick={() => onNotice("轻量文字操作的反馈样式")}>文字按钮</Button><Button variant="danger" onClick={onDelete}>删除示例</Button><Button disabled>暂不可用</Button><span className="sp-control-divider" /><IconButton label={favorite ? "取消示例收藏" : "收藏示例"} aria-pressed={favorite} className={favorite ? "sp-is-favorite" : undefined} onClick={() => setFavorite(value => !value)}><Heart size={17} fill={favorite ? "currentColor" : "none"} /></IconButton><IconButton label="复制规范摘要" onClick={async () => { try { await navigator.clipboard.writeText("数愈设计规范样板：工作区最大 1000px，创建输入框最大宽 776px / 默认高 176px，对话阅读列最大 752px。界面文字 12px，按钮 14px，案例标题 14px 次级文字色。"); onNotice("规范摘要已复制"); } catch { onNotice("浏览器未允许复制，请从尺寸面板查看摘要"); } }}><Copy size={17} /></IconButton></div><div className="sp-component-row sp-tag-examples"><Tag>Skill</Tag><AgentBadge /><StatusTag status="info">评测示例</StatusTag><StatusTag status="success">可调用</StatusTag><StatusTag status="warning">待补充</StatusTag><StatusTag status="neutral">尚未上线</StatusTag></div></section>
    <NavigationSpec/>
    <section className="sp-gallery-section" id="sp-skill-section"><div className="sp-section-heading"><div><h2>科研 Skill</h2><p>桌面四列。卡片上下 12px、左右 14px，内容组之间 8px。</p></div><label className="sp-search-field"><Search size={16} /><input aria-label="搜索示例 Skill" placeholder="搜索 Skill" value={query} onChange={event => setQuery(event.target.value)} />{query && <IconButton label="清空 Skill 搜索" onClick={() => setQuery("")}><X size={14} /></IconButton>}</label></div>
      <CapabilityFilters categories={["全部","文献检索","统计分析","论文写作","基金申报"]} category={category} onCategory={setCategory} source={source} onSource={setSource}/>

      {list.length ? <div className="sp-skill-grid" data-testid="skill-grid">{list.map(item => <SkillCard key={item.id} item={item} context="spec" onDetail={onDetail} onCall={onCall} />)}</div> : <EmptyState onReset={reset}>没有匹配的 Skill</EmptyState>}
      <p className="sp-section-note"><Info size={13} />能力、评分、核验状态和使用量均为评审样例，不代表实际核验或上线状态。</p>
    </section>
    <section className="sp-gallery-section" id="sp-agent-section">
      <div className="sp-section-heading"><div><h2>科研 Agent</h2><p>分类、能力数量和描述同色。核心能力两列，每个名称单行。底栏右侧显示打开图标或接入状态。</p></div></div>
      <div className="sp-agent-grid" data-testid="agent-grid">
        {agentCardExamples.map(item => <AgentCard key={item.id} item={item} context="spec"
          unavailable={item !== reviewAgent} onUnavailable={() => onNotice("暂无接入")}
          onDetail={item => router.navigate(capabilityPath(item))}/>)}
      </div>
    </section>
    <div id="case-spec"><CaseGallery onChoose={item => onDetail({ ...item, kind: 'case', online: true, steps: ['了解任务', '补充研究材料', '配置执行'], output: '示例成果结构', icon: item.id === 'analysis' ? 'chart' : item.id === 'grant' ? 'file' : 'book' })} /></div>
    <EmptyStateSpec/>
    <section className="sp-gallery-section" id="spec-chat">
      <div className="sp-section-heading"><div><h2>对话内任务组件</h2><p>Agent 名称 20px、说明 14px。研究方向标题 16px，任务链 Skill 标记 14px、单行高 34px。</p></div></div>
      <div className="sp-spec-chat-content">
        <div className="sp-spec-config-tabs" role="group" aria-label="任务配置样例">
          <Button small aria-pressed={configMode === "agent"} onClick={() => setConfigMode("agent")}>Agent 输入配置</Button>
          <Button small aria-pressed={configMode === "regression"} onClick={() => setConfigMode("regression")}>回归分析配置</Button>
        </div>
        {configMode === "agent" ? <>
          <AgentIdentity item={AGENTS[0]} description={configConfirmed ? "已保留本次输入，可回看确认内容" : "补充任务信息，确认后开始整理研究方案"}/>
          <AgentParameters item={AGENTS[0]} initialTopic={EXAMPLE_PROMPT} locked={configConfirmed} onRun={() => { setConfigConfirmed(true); onNotice("已确认本地配置样例"); }}/>
          {configConfirmed && <Button small onClick={() => setConfigConfirmed(false)}>修改配置</Button>}
        </> : <RegressionConfig onConfirm={() => onNotice("已确认本地配置样例")} />}
        <h3 className="sp-spec-subheading">任务轨道与任务链</h3>
        <TaskJourney steps={['材料核对','分析配置','执行分析','结果整理']} />
        <h3 className="sp-spec-subheading">交付物</h3>
        <p className="sp-section-note">卡片高 80px。正文按阅读列双列等分，窄屏和抽屉单列。</p>
        <div className="sp-source-deliveries">
          {deliverySamples.map(file => <DeliveryCard key={file.id} file={file} delivery={delivery} onDownload={() => onDownloadFile(file)}/>)}
        </div>
        <section className="sp-recommendation-group"><RecommendationHeading kind="skill">推荐科研 Skill</RecommendationHeading></section>
        <section className="sp-recommendation-group">
          <RecommendationHeading kind="agent">推荐科研 Agent</RecommendationHeading>
          <div className="sp-two-agents">
            {AGENTS.slice(0, 2).map(item => <AgentCard key={item.id} item={item} context="chat" onCall={onCall}/>)}
          </div>
        </section>
        <PromptSpec onChoose={text => onNotice("已选择「" + text + "」")}/>
      </div>
    </section>
    <IconLibrary/>
    <section className="sp-gallery-section" id="sp-semantic-tags"><div className="sp-section-heading"><div><h2>能力标识与语义标签</h2><p>身份标识用 2px 圆角和 500 字重。主题标签与卡片角标用 2px 圆角和 400 字重。</p></div></div><div className="sp-identity-spec"><div><SkillGlyph size={32}/><Tag>Skill</Tag><p>叠层能力 · 单项科研技能</p></div><div><AgentGlyph size={32}/><AgentBadge/><p>机器人 · 多步骤科研任务</p></div></div>
      <p className="sp-section-note">主题标签用 400 字重。支持选择时，通过底色、边框和文字颜色反馈选中状态。</p>
      <div className="sp-component-row sp-tag-spec-topics"><Tag>论文精读</Tag><Tag>科研选题</Tag><Tag>可行性评估</Tag></div>
      <p className="sp-section-note">快捷入口用 4px 圆角，名称用 500 字重，说明用 400 字重。</p>
      <div className="sp-component-row">
        <button type="button" className="ds-home-shortcut is-skill" onClick={() => onNotice("已选择「文献检索」")}><SkillGlyph size={16}/><strong>文献检索</strong></button>
        <button type="button" className="ds-home-shortcut is-agent" onClick={() => onNotice("已选择「构建预测模型」")}><AgentGlyph size={16}/><strong>构建预测模型</strong><span className="ds-home-shortcut-copy">规划建模与验证流程</span></button>
      </div>
      <div className="sp-semantic-grid">{[{status:'success',label:'已完成',text:'任务成功、配置已确认'},{status:'processing',label:'处理中',text:'正在运行、等待结果'},{status:'warning',label:'待确认',text:'需要补充输入或人工确认'},{status:'error',label:'执行失败',text:'操作失败、需要修正或重试'},{status:'info',label:'参考信息',text:'提示、说明与来源信息'},{status:'neutral',label:'未开始',text:'尚未执行或暂未上线'}].map(x=><div key={x.status}><StatusTag status={x.status}>{x.label}</StatusTag><p>{x.text}</p></div>)}</div><div className="sp-component-row sp-tag-examples"><Tag tone="green">2.0.0</Tag><Tag tone="violet">实验能力</Tag><Tag tone="gold">精选模板</Tag>{["free","basic","plus","pro"].map(tier=><MembershipBadge key={tier} tier={tier}/>)}<NewBadge/><CaseCategory>文献检索</CaseCategory></div><p className="sp-section-note">版本与分类使用文字标签；紫色、金色表示属性，不代替成功或警告状态。</p></section>
    <section className="sp-gallery-section"><div className="sp-section-heading"><div><h2>表单与即时反馈</h2><p>有明确标签、可见焦点和具体的错误恢复提示。</p></div></div><div className="sp-form-example"><form noValidate onSubmit={event => { event.preventDefault(); if (!task.trim()) { setFormError(true); setSaved(false); return; } setSaved(true); setFormError(false); }}><label className="sp-field"><span>任务名称 <span className="sp-required">*</span></span><input aria-label="示例任务名称" value={task} placeholder="例如：临床研究文献筛选" onChange={event => { setTask(event.target.value); setFormError(false); setSaved(false); }} aria-invalid={formError} aria-describedby="sp-example-field-help" /><small id="sp-example-field-help" className={formError ? "sp-field-error" : ""}>{formError ? "请填写任务名称后再保存。" : "建议用研究对象与任务目标命名。"}</small></label><button type="submit" className="sp-button sp-button-primary">保存示例</button>{saved && <span role="status" className="sp-inline-success"><Check size={15} />已保存「{task.trim()}」的本地示例</span>}</form><div className="sp-info-sample"><Info size={17} /><div><strong>说明信息</strong><p>附件只在本地记录文件名；模型调用、真实上传与账户权限不在本次样板内。</p></div></div></div></section>
    <footer className="sp-gallery-footer">以本页确认的规则作为后续业务页验收基线。</footer>
  </div></div>;
}
