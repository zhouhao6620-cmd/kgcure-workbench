import { useId, useState } from 'react';
import { Bookmark, ChevronDown, Languages, LibraryBig } from 'lucide-react';
import { ApprovalEmptyIllustration, Button, EmptyState, RecordEmptyIllustration, SearchEmptyIllustration, SpaceEmptyIllustration } from './components.jsx';
import { ConversationPrompt, FollowUpHeading } from '../design-system/ConversationPrompt.jsx';
import { LanguageOptions } from '../design-system/LanguageOptions.jsx';
import { Pagination } from '../design-system/Pagination.jsx';
import { PageActions, SecondaryPageShell } from '../design-system/SecondaryPageShell.jsx';

export const SIZE_NOTES = [
  ['工作区内容', '最大 1000px', '一级页、二级页及账户页居中，随屏幕宽度缩放。'],
  ['创建任务输入框', '最大 776px 宽 · 默认 176px 高', '创建对话、频道和科研绘图共用尺寸。长文本和附件可撑开输入框。'],
  ['对话态', '752px 阅读列 · 776px 输入区', '尺寸为上限，底部使用紧凑输入框。左上角的对话标题为 14px。'],
  ['左侧导航', '桌面 260px', '展开时固定宽度。窄屏改为可开合的侧边抽屉。展开时的 Logo 等比显示，图像宽 156.6px。'],
  ['二级页操作栏', '固定高 60px', '左侧返回，右侧页面操作与分享，正文独立滚动。'],
  ['首屏标题位置', '桌面 96–160px · 窄屏 88px', '建议从工作区顶部量到标题行框。创建对话、循证搜索、科研选题、基金申报和科研绘图共享标题起点。桌面留白随视口高度调整，900px 高时为 144px。'],
  ['商店与列表页顶距', '桌面 96px · 窄屏 88px', 'Skill、Agent、科研空间列表从工作区顶部量到标题行框。长列表滚动时沿用同一起点。'],
  ['商店列表分页', '每页最多 6 行', '按当前列数计算每页卡片数。桌面 Skill 最多 24 张，Agent 最多 18 张。翻页后回到 Hub 标题。'],
  ['详情与账户页顶距', '操作栏下 36px · 窄屏 28px', '从 60px 固定操作栏底部量到内容区。能力详情、案例、空间详情、文件与账户页共用。'],
  ['右侧文件抽屉', '宽屏 440px · 紧凑 292px', '对话头栏用 18px 书脊图标和 14px「文件」文字，两者与分享图标同色。窄屏仅显示图标，展开时入口使用浅蓝底。没有文件时，72px 灰阶文件夹插画和标题在抽屉正文垂直居中。低于 1280px 改为覆盖式抽屉，宽度最多为可用宽度减 32px。'],
  ['交付物卡片', '高 80px · 正文双列等分', '正文随阅读列缩放，752px 阅读列下每张 370px，列间距 12px。窄屏和抽屉单列，卡片标题 14px，说明 12px。'],
  ['未登录大首页', '最大 1120px', '沿用官网版式与原有设计元素。'],
];

const DETAIL_TABS = [
  ['概述', '介绍能力的用途、适用场景和所需材料。'],
  ['文件', '集中查看与任务相关的材料和交付文件。'],
  ['评论', '查看围绕当前内容的讨论。'],
  ['版本历史', '核对更新记录与版本说明。'],
  ['评测报告', '查看评测方法、结果与适用范围。'],
];

function DetailTabsExample() {
  const [active, setActive] = useState(0);
  const id = useId();

  function handleKey(event, index) {
    const order = { ArrowLeft: (index - 1 + DETAIL_TABS.length) % DETAIL_TABS.length, ArrowRight: (index + 1) % DETAIL_TABS.length, Home: 0, End: DETAIL_TABS.length - 1 };
    const next = order[event.key];
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    event.currentTarget.parentElement.children[next].focus();
  }

  return <div className="sp-spec-detail-tabs-example">
    <div className="sp-spec-detail-tabs" role="tablist" aria-label="详情章节">
      {DETAIL_TABS.map(([label], index) => <button key={label} type="button" role="tab" id={id + index} aria-selected={active === index} aria-controls={id + '-panel'} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => handleKey(event, index)}>{label}</button>)}
    </div>
    <p role="tabpanel" id={id + '-panel'} aria-labelledby={id + active}>{DETAIL_TABS[active][1]}</p>
  </div>;
}

export function LayoutSpec({ onNotice, onPreviewScene, onPreviewDrawer }) {
  const [bookmarked, setBookmarked] = useState(false);

  return <section className="sp-gallery-section" id="spec-layout">
    <div className="sp-section-heading"><h2>页面布局</h2></div>
    <dl className="sp-spec-dimensions">
      {SIZE_NOTES.map(([label, size, note]) => <div key={label}>
        <dt>{label}</dt><dd><strong>{size}</strong><p>{note}</p></dd>
      </div>)}
    </dl>
    <div className="sp-spec-scene-links">
      <Button small onClick={() => onPreviewScene('home')}>创建对话</Button>
      <Button small onClick={() => onPreviewScene('evidence')}>频道标签</Button>
      <Button small onClick={() => onPreviewScene('grant')}>基金申报</Button>
      <Button small onClick={() => onPreviewScene('drawing')}>绘图配置</Button>
      <Button small onClick={onPreviewDrawer}><LibraryBig size={18} strokeWidth={1.7} aria-hidden="true"/>文件抽屉</Button>
    </div>
    <h3 className="sp-spec-subheading">二级页标题区与操作栏</h3>
    <div className="sp-spec-secondary">
      <SecondaryPageShell path="/design-system" onNavigate={() => onNotice('示例中的返回按钮会回到上一级')} onToast={onNotice}>
        <div className="sp-spec-secondary-content">
          <PageActions>
            <Button small aria-pressed={bookmarked} onClick={() => setBookmarked(value => !value)}>
              <Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} aria-hidden="true"/>
              {bookmarked ? '已收藏' : '收藏'}
            </Button>
          </PageActions>
          <h4 className="sp-spec-secondary-title">文献智能检索</h4>
          <p className="sp-spec-secondary-description">从研究问题出发，查找、核对并整理相关证据。</p>
          <h5 className="sp-spec-secondary-section">适用场景</h5>
          <p>支持研究问题初查、循证整理和文献追踪。</p>
        </div>
      </SecondaryPageShell>
    </div>
    <p className="sp-section-note">右侧深色和浅色操作按钮使用 14px 半粗文字，搭配 16px 线性图标。</p>
    <p className="sp-section-note">能力详情、空间、案例和账户页共用此层级。页标题桌面 28/40px、手机 24/34px，标题与描述相隔 8px。描述 14/24px、次级文字色，可自然换行。栏目标题 20/28px，正文 14/24px，辅助信息 12/20px。</p>
  </section>;
}

export function PromptSpec({ onChoose }) {
  const groups = [
    ['继续问', 'followup', [ ['要准备哪些资料？'], ['怎样明确交付范围？', '列出交付物、验收标准，以及哪些内容需要提前补充。'] ]],
    ['确认你的研究方向', 'intent', [ ['系统评价与 Meta 分析'], ['识别关键危险因素', '筛选潜在因素，明确数据来源和分析方法。'] ]],
  ];
  return <div className="sp-spec-prompts">
    <p className="sp-section-note">按钮按内容定宽，最大 480px，窄屏保留至少 16px 余量。标题与说明分别单行省略。</p>
    {groups.map(([heading, kind, items]) => <div className="sp-spec-prompt-group ds-chat-prompts" key={kind}>
      {kind === 'followup' ? <FollowUpHeading as="h3"/> : <h3>{heading}</h3>}
      {items.map(([title, description], index) => <ConversationPrompt key={title} title={title} description={description}
        prefix={kind === 'intent' ? `目标 ${index + 1}　` : undefined} outlined={kind === 'intent'} onChoose={() => onChoose(title)}/>)}
    </div>)}
  </div>;
}

export function NavigationSpec() {
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState('简体中文');
  const [languageOpen, setLanguageOpen] = useState(false);
  const [filter, setFilter] = useState('全部');

  return <section className="sp-gallery-section" id="spec-navigation">
    <div className="sp-section-heading"><div><h2>标签、分页与语言菜单</h2><p>菜单操作统一为 14px，辅助说明为 12px。</p></div></div>
    <h3 className="sp-spec-subheading">筛选胶囊 · 36px</h3>
    <div className="sp-filter-chips sp-spec-filter-chips" role="group" aria-label="筛选胶囊示例">
      {['全部','文献调研','论文写作','基金申报'].map(item => <button type="button" key={item} className={'sp-filter' + (filter === item ? ' is-active' : '')} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
    </div>
    <p className="sp-section-note">统一使用 36px 高、左右 16px 内边距和 999px 圆角。选中项黑底白字、600 字重；未选中项浅灰底次级文字、500 字重。所有出现位置采用一致的上下 6px 额外留白。</p>
    <h3 className="sp-spec-subheading">下划线标签 · 16px</h3>
    <DetailTabsExample/>
    <p className="sp-section-note">所有下划线标签统一为 16px。未选中项使用 500 字重和次级文字色；选中项使用 600 字重、正文黑色，并保留下划线。账单、文件库、详情章节和工作流共用此规则。</p>
    <div className="sp-spec-control-grid">
      <div className="sp-spec-control-example">
        <h3>数字分页</h3>
        <Pagination page={page} total={12} onChange={setPage} label="规范示例分页" />
      </div>
      <div className="sp-spec-control-example">
        <h3>语言菜单</h3>
        <div className="sp-spec-language">
          <Button small aria-haspopup="menu" aria-expanded={languageOpen} onClick={() => setLanguageOpen(!languageOpen)}><Languages size={16}/>{language}<ChevronDown size={12}/></Button>
          {languageOpen && <LanguageOptions language={language} onClose={() => setLanguageOpen(false)} onSelect={value => { setLanguage(value); setLanguageOpen(false); }} />}
        </div>
      </div>
    </div>
  </section>;
}

export function EmptyStateSpec() {
  return <section className="sp-gallery-section" id="spec-empty">
    <div className="sp-section-heading"><div><h2>缺省态</h2><p>页面与列表级空状态共用同一视觉框和文字层级。</p></div></div>
    <div className="sp-empty-spec-grid">
      <article><EmptyState icon={ApprovalEmptyIllustration} description="发起文件下载申请后，可在这里查看进度。">暂无审批</EmptyState><small>审批或申请为空</small></article>
      <article><EmptyState icon={RecordEmptyIllustration} description="购买或兑换会员后，账单会显示在这里。">暂无记录</EmptyState><small>账单、发票或记录为空</small></article>
      <article><EmptyState icon={SearchEmptyIllustration} onReset={() => {}}>没有匹配的科研能力</EmptyState><small>筛选或搜索无结果</small></article>
      <article><EmptyState icon={SpaceEmptyIllustration} description="可在空间上传文件，或者发起任务对话。">暂无内容</EmptyState><small>空间或列表为空</small></article>
    </div>
    <p className="sp-section-note">审批、记录、搜索无结果和空间无内容分别使用独立插画，统一放在 108 × 108px 画板内，全部使用中性灰阶，不带品牌蓝或彩色状态点。图标下留 12px，再依次放置 16/24px、600 字重标题和 14/22px 常规字重描述。标题与描述间距 8px，操作按钮距描述 10px。页面级缺省态都复用这四个图标，不另行缩放。</p>
  </section>;
}
