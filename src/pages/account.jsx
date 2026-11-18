import { sitePath } from "../site-path.js";
import { WorkspaceSelect } from '../design-system/WorkspaceSelect.jsx';
import { PageActions } from '../design-system/SecondaryPageShell.jsx';
import { HighlightedTitle } from "../design-system/Typography.jsx";
import { useState } from "react";
import {
  ArrowRight,
  Bookmark,
  Check,
  ClipboardCheck,
  Coins,
  CreditCard,
  Crown,
  Download,
  FileText,
  Eye,
  FlaskConical,
  FolderOpen,
  Gift,
  Image as ImageIcon,
  Layers,
  Orbit,
  RefreshCw,
  ShieldCheck,
  Star,
  Search,
  Upload,
  User,
} from "lucide-react";
import { Button, DocumentEmptyIllustration, EmptyState as WorkspaceEmptyState, IconButton, Modal, Tag } from "../design-preview/components.jsx";
import { downloadText } from "../content/catalog.js";
import { downloadWord } from "../design-preview/word-file.js";
import { Badge, Btn, EmptyState, PageHead, Tabs, Toggle } from "../components.jsx";

const FILES = [
  ["AKK_减脂_科研头脑风暴纪要_v1.md", "M", "对话生成", "AKK益生菌减脂研究切入点", "2026/11/14 12:39", "43.1 KB"],
  ["AKK_减脂_科研头脑风暴纪要_v1.docx", "W", "对话生成", "AKK益生菌减脂研究切入点", "2026/11/14 12:39", "406.4 KB"],
  ["FETM_论文交付包.zip", "Z", "对话生成", "神经发育障碍家庭健康管理", "2026/11/14 12:29", "3.5 MB"],
  ["使用说明与待确认清单.md", "M", "对话生成", "神经发育障碍家庭健康管理", "2026/11/14 12:29", "5.9 KB"],
  ["graphical_abstract.png", "P", "对话生成", "神经发育障碍家庭健康管理", "2026/11/14 12:29", "412.8 KB"],
  ["FETM_神经发育障碍家庭健康管理_研究方案.pdf", "P", "对话生成", "神经发育障碍家庭健康管理", "2026/11/14 12:29", "1.6 MB"],
  ["FETM_神经发育障碍家庭健康管理_研究方案.docx", "W", "对话生成", "神经发育障碍家庭健康管理", "2026/11/14 12:29", "926.1 KB"],
  ["fig3_rct_heatmap.png", "P", "对话生成", "AKK减脂循证搜索工作流", "2026/11/14 12:06", "88.2 KB"],
  ["fig2_citations.png", "P", "对话生成", "AKK减脂循证搜索工作流", "2026/11/14 12:06", "76.5 KB"],
  ["fig1_flow.png", "P", "对话生成", "AKK减脂循证搜索工作流", "2026/11/14 12:06", "64.9 KB"],
  ["ASD遗传学选题报告.md", "M", "对话生成", "神经发育障碍", "2026/09/20 10:45", "18.3 KB"],
  ["SEER_宫颈癌肝转移_变量字典.xlsx", "X", "上传", "工作流推荐助手", "2026/10/16 09:12", "212.6 KB"],
];

export function MyFiles({ onToast, sessions=[] }) {
  const [tab, setTab] = useState("最近使用");
  const [favorite, setFavorite] = useState(false);
  const [query,setQuery]=useState(''),[format,setFormat]=useState('全部'),[source,setSource]=useState('全部'),[favorites,setFavorites]=useState([]),[preview,setPreview]=useState(null),[uploads,setUploads]=useState([]);
  const localFiles=sessions.flatMap(session=>session.files.map(file=>({...file,title:session.title,date:new Date(session.createdAt).toLocaleDateString('zh-CN',{timeZone:'Asia/Shanghai'})})));
  const fileLookup=new Map(localFiles.map(file=>[file.id,file]));
  const allRows=[...uploads,...localFiles.map(file=>[file.name,file.type==='DOCX'?'W':'M','本地任务说明',file.title,file.date,'本地生成',file.id]),...FILES];
  const rows=allRows.filter(row=>tab!=='回收站'&&(!query||row[0].toLowerCase().includes(query.toLowerCase()))&&(format==='全部'||row[0].toLowerCase().endsWith('.'+format.toLowerCase()))&&(source==='全部'||row[2]===source)&&(!(favorite||tab==='我的收藏')||favorites.includes(row[6]||row[0])));
  function view(row){setPreview({name:row[0],content:fileLookup.get(row[6])?.content,type:fileLookup.get(row[6])?.type,source:row[2],date:row[4]});}
  function download(row){const file=fileLookup.get(row[6]);if(!file){view(row);return;}file.type==='DOCX'?downloadWord(file.name,file.content):downloadText(file.name,file.content);}


  return (
    <div className="view acct-view files-library">
      <header className="acct-head"><h1>我的文件</h1><p>查找科研对话的交付文件和本地文件记录。</p></header>
      <PageActions>
        <IconButton label="刷新文件列表" onClick={() => onToast("已刷新")}><RefreshCw size={16}/></IconButton>
        <label className="sp-button sp-button-secondary ds-upload-button"><Upload size={16}/>添加本地文件
          <input type="file" multiple aria-label="添加到我的文件" onChange={e=>{
            const additions=Array.from(e.target.files||[]).map(file=>[file.name,'F','本地附件名称','未关联对话',new Date().toLocaleDateString('zh-CN',{timeZone:'Asia/Shanghai'}),(file.size/1024).toFixed(1)+' KB',crypto.randomUUID()]);
            if(!additions.length)return;
            setUploads(items=>[...additions,...items]);e.target.value='';
            onToast('已记录本地文件名称，未上传文件正文');
          }}/>
        </label>
      </PageActions>
      <Tabs className="ds-detail-tabs files-library-tabs" items={["最近使用", "全部文件", "我的收藏", "回收站"]}
        value={tab} onChange={setTab} ariaLabel="文件分类"/>
      {tab !== "回收站" && <div className="files-library-controls">
        <label className="sp-search-field"><Search size={16}/><input aria-label="搜索文件名称" placeholder="搜索文件名称" value={query} onChange={e=>setQuery(e.target.value)}/></label>
        <WorkspaceSelect label="文件来源筛选" value={source} onChange={setSource} options={[{value:'全部',label:'全部来源'},...new Set(allRows.map(row=>row[2]))]}/>
        <WorkspaceSelect label="文件格式筛选" value={format} onChange={setFormat} options={[{value:'全部',label:'全部格式'},'MD','DOCX','PDF','PNG','CSV','XLSX','ZIP']}/>
        {tab !== "我的收藏" && <Toggle checked={favorite} onChange={setFavorite} label="仅看收藏"/>}
      </div>}
      {rows.length ? <section aria-label="文件列表">
        <p className="files-result-count" aria-live="polite">共 {rows.length} 个文件</p>
        <ul className="files-library-list">{rows.map(row=>{
          const [name,,origin,conversation,date,size,id]=row;
          const key=id||name;
          const starred=favorites.includes(key);
          return <li key={key}>
            <FileText size={20} className="files-library-icon" aria-hidden="true"/>
            <div className="files-library-name"><button type="button" title={name} onClick={()=>view(row)}>{name}</button><small title={conversation}>{origin} · {conversation}</small></div>
            <div className="files-library-date"><span>{date}</span><small>{size}</small></div>
            <div className="files-library-actions">
              <IconButton label={"预览 "+name} onClick={()=>view(row)}><Eye size={16}/></IconButton>
              {fileLookup.has(id)&&<IconButton label={"下载 "+name} onClick={()=>download(row)}><Download size={16}/></IconButton>}
              <IconButton label={(starred?"取消收藏 ":"收藏文件 ")+name} aria-pressed={starred} onClick={()=>setFavorites(items=>starred?items.filter(x=>x!==key):[...items,key])}><Star size={16} fill={starred?"currentColor":"none"}/></IconButton>
            </div>
          </li>;
        })}</ul>
      </section> : <WorkspaceEmptyState icon={FolderOpen}
        description={tab==="回收站"?"回收站里暂无文件。":tab==="我的收藏"?"收藏后的文件会显示在这里。":"调整关键词、来源或文件格式后再试。"}
        onReset={tab!=="回收站"&&(query||format!=="全部"||source!=="全部"||favorite)?()=>{setQuery("");setFormat("全部");setSource("全部");setFavorite(false);}:undefined}>
        {tab==="回收站"?"回收站为空":tab==="我的收藏"?"暂无收藏文件":"没有匹配的文件"}
      </WorkspaceEmptyState>}
      {preview&&<Modal title={preview.name} wide onClose={()=>setPreview(null)}>{preview.content?<><pre className="sp-file-preview">{preview.content}</pre><Btn kind="primary" onClick={()=>preview.type==='DOCX'?downloadWord(preview.name,preview.content):downloadText(preview.name,preview.content)}>下载文件</Btn></>:<div className="ds-prose"><p>当前仅保留文件元数据，未取得此文件正文。</p><p>来源：{preview.source}<br/>记录时间：{preview.date}</p><p>此预览不会生成或下载伪造的原始文件。</p></div>}</Modal>}
    </div>
  );
}

export function ProfilePage({ onToast }) {
  return (
    <div className="view acct-view account-flat profile-view">
      <div className="acct-head">
        <h1>个人资料</h1>
        <p>管理账户信息和实名认证。</p>
      </div>

      <section className="account-section">
        <header><h2>账户资料</h2></header>
        <div>
          <div className="avatar-row">
            <div className="avatar-big"><img src={sitePath("/design-preview/account-avatar.jpg")} alt="周浩头像"/></div>
            <div><strong>头像</strong><p className="row-hint">JPG、PNG 或 WebP，最大 5 MB</p></div>
            <Button small variant="ghost" onClick={() => onToast("更新头像（原型演示）")}>更新头像</Button>
          </div>
          <InfoRow label="昵称" value="周浩" action="修改昵称" onAction={() => onToast("修改昵称")} />
        </div>
      </section>
      <section className="account-section">
        <header><h2>登录与安全</h2></header>
        <div>
          <InfoRow label="手机号" value="151****5968" action="修改手机号" onAction={() => onToast("修改手机号")} />
          <InfoRow label="邮箱" value="未设置" action="设置邮箱" onAction={() => onToast("设置邮箱")} />
          <InfoRow label="微信" value="已绑定" action="解绑" onAction={() => onToast("解绑微信（原型演示）")} />
          <InfoRow label="账户密码" value="未设置" action="设置密码" onAction={() => onToast("设置密码（原型演示）")} />
        </div>
      </section>
      <section className="account-section">
        <header><h2>实名认证</h2></header>
        <div>
          <InfoRow label="姓名" value="周*" trailing={<span className="profile-verification"><Tag tone="green" icon={ShieldCheck}>已实名认证</Tag></span>} />
          <InfoRow label="身份证号" value="3****************3" />
        </div>
      </section>
    </div>
  );
}

function InfoRow({ label, value, action, onAction, trailing }) {
  return (
    <div className="info-row">
      <span className="info-label">{label}</span>
      <span className="info-value">{value}</span>
      {trailing}
      {action ? <button type="button" className="sp-button sp-button-ghost sp-button-small" onClick={onAction}>{action}</button> : null}
    </div>
  );
}

export function AccountQuota({ onUpgrade, onRecharge }) {
  const [tab, setTab] = useState("使用分析");

  return (
    <div className="view acct-view account-flat quota-view">
      <div className="crumb"><span>会员与账单</span> / <strong>积分与套餐</strong></div>
      <div className="acct-head">
        <h1>积分与套餐</h1>
        <p>查看可用额度，了解你的 AI 使用与积分消耗。</p>
      </div>

      <PageActions><Button className="account-upgrade" onClick={onUpgrade}><Crown size={16}/>升级会员套餐</Button></PageActions>
      <section className="billing-summary" aria-label="额度与余额">
        <div><p>套餐剩余额度</p><h2>0% <Tag>免费版</Tag></h2><small>已用完 · 长期有效</small></div>
        <div><p>长期积分</p><h2>5,900 <small>积分</small></h2><small>永久有效</small></div>
        <div><p>集团分发积分</p><h2>0 <small>积分</small></h2><small>按集团规则有效</small></div>
      </section>
      <Button onClick={onRecharge}><Coins size={16}/>充值积分</Button>
      <Tabs className="ds-detail-tabs account-filter-tabs" items={["积分流水", "使用分析", "统计说明"]} value={tab} onChange={setTab} />
      {tab === "积分流水" && <WorkspaceEmptyState icon={FileText} description="当前预览暂无逐笔扣减数据。">暂无积分流水</WorkspaceEmptyState>}
      {tab === "统计说明" && <section className="acct-card"><h2>积分扣减顺序</h2><p>依次使用集团分发积分、套餐额度和长期积分。免费版额度长期有效，不随周期刷新。</p><p>使用分析按用途汇总消耗和扣减次数。</p></section>}
      {tab === "使用分析" && <section className="acct-card quota-analysis">
        <div className="usage-head"><h2>使用概览</h2><span className="row-hint">示例数据 · 2026.10.16 – 2026.11.14</span></div>

        <div className="stat-grid">
          {[
            ["套餐累计消耗", "100%", "按每次扣减时的套餐额度累计"],
            ["长期积分消耗", "7,384", "积分　仅统计 AI 使用扣减"],
            ["扣减记录数", "29", "条　套餐与长期积分分别计数"],
            ["活跃天数", "7", "天　所选时段内有使用的天数"],
          ].map(([label, value, hint]) => (
            <div key={label} className="stat-card">
              <span className="stat-label">{label}</span>
              <strong>{value}</strong>
              <span className="stat-hint">{hint}</span>
            </div>
          ))}
        </div>

        <div className="chart-block">
          <div className="chart-head"><span>消耗趋势</span><span className="row-hint">示例趋势</span></div>
          <svg className="line-chart" viewBox="0 0 640 180" preserveAspectRatio="none" role="img" aria-label="消耗趋势折线图">
            <line x1="40" y1="150" x2="620" y2="150" stroke="#e2e8f0" />
            <line x1="40" y1="100" x2="620" y2="100" stroke="#f1f5f9" />
            <line x1="40" y1="50" x2="620" y2="50" stroke="#f1f5f9" />
            <path d="M40 140 L160 132 L280 112 L400 86 L520 54 L620 44 L620 150 L40 150 Z" fill="rgba(26,91,255,0.08)" />
            <path d="M40 140 L160 132 L280 112 L400 86 L520 54 L620 44" fill="none" stroke="#1a5bff" strokeWidth="2.5" strokeLinecap="round" />
            {[0, 1, 2, 3].map((i) => <text key={i} x={40 + i * 193} y={172} fontSize="11" fill="#94a3b8">{["10.16", "10.25", "11.04", "11.14"][i]}</text>)}
          </svg>
          <div className="chart-legend"><span>长期积分</span><span>套餐百分比</span></div>
        </div>

        <div className="usage-bottom">
          <div className="donut-wrap">
            <div className="donut" role="img" aria-label="类型占比：科研工作流 58.74%，AI 使用（未分类）41.26%"><span>58.74%</span></div>
            <div className="donut-legend">
              <p><span className="dot blue" /> 科研工作流 <strong>58.74%</strong></p>
              <p><span className="dot slate" /> AI 使用（未分类） <strong>41.26%</strong></p>
              <span className="row-hint">按类型汇总 · 2 个使用类型</span>
            </div>
          </div>
          <div className="quota-table-scroll"><table className="usage-table">
            <thead><tr><th>使用类型</th><th>扣减记录数</th><th>套餐累计消耗</th><th>长期积分消耗</th></tr></thead>
            <tbody>
              <tr><td>AI 使用（未分类）<span className="row-hint">历史记录缺少用途标记</span></td><td>22 条</td><td>100%</td><td>3,047 积分</td></tr>
              <tr><td>科研工作流<span className="row-hint">通过科研工作流发起的使用</span></td><td>7 条</td><td>0%</td><td>4,337 积分</td></tr>
              <tr className="total"><td>合计</td><td>29 条</td><td>100%</td><td>7,384 积分</td></tr>
            </tbody>
          </table></div>
        </div>
        <p className="note">仅展示分类统计，不展示对话内容、任务名称或单次请求详情。</p>
      </section>}
    </div>
  );
}

export function Membership({ onPlans, onQuota, onRecharge, onToast }) {
  const [tab, setTab] = useState("账单记录");
  return (
    <div className="view acct-view account-flat billing-view">
      <div className="crumb"><span>账户管理</span> / <strong>会员与账单</strong></div>
      <div className="acct-head">
        <h1>会员与账单</h1>
        <p>管理会员权益，查看套餐额度与账单记录。</p>
      </div>

      <PageActions><Button className="account-upgrade" onClick={onPlans}><Crown size={16}/>升级会员套餐</Button></PageActions>
      <section className="billing-summary" aria-label="套餐与积分概览">
        <div><p>当前套餐</p><h2><span className="billing-plan-name">免费版</span> <Tag>使用中</Tag></h2><small>长期有效 · 1 个科研空间</small></div>
        <div><p>长期积分</p><h2>5,900 <small>积分</small></h2><small>永久有效</small></div>
        <div><p>集团分发积分</p><h2>0 <small>积分</small></h2><small>按集团规则有效</small></div>
      </section>
      <div className="billing-actions">
        <p>套餐额度已用完，后续用量将从长期积分抵扣。</p>
        <div>
          <Button onClick={onQuota}><FileText size={16}/>积分消费明细</Button>
          <Button onClick={onRecharge}><Coins size={16}/>充值积分</Button>
          <Button onClick={() => onToast("兑换会员（原型演示）")}><Gift size={16}/>兑换会员</Button>
        </div>
      </div>
      <Tabs className="ds-detail-tabs account-filter-tabs" items={["账单记录", "发票申请记录"]} value={tab} onChange={setTab} />
      <section className="billing-records" aria-label={tab}>
        {tab === "账单记录" ? (
          <WorkspaceEmptyState icon={DocumentEmptyIllustration} description="购买或兑换会员后，账单会显示在这里。">暂无账单记录</WorkspaceEmptyState>
        ) : (
          <WorkspaceEmptyState icon={DocumentEmptyIllustration} description="购买会员后可申请发票。"
            action={<Button onClick={() => onToast("当前暂无可开票订单")}>申请发票</Button>}>
            暂无发票申请
          </WorkspaceEmptyState>
        )}
      </section>
    </div>
  );
}

const PLANS = [
  { id: 'FREE', name: '免费版', tag: '体验', price: '¥0', unit: '/ 永久免费', line: '无需付费 · 注册即享', desc: '适合轻量体验与偶尔使用', quota: '基础额度', refresh: '长期有效，不随周期刷新', spaces: '1 个', cta: '当前使用中', icon: Bookmark },
  { id: 'BASIC', name: '基础版', tag: '日常科研', price: '¥79', unit: '/ 月', line: '按月结算 · 灵活开通', desc: '适合日常文献、分析与常规科研', quota: '标准额度', refresh: '每7天自动刷新', spaces: '2 个', cta: '立即开通 基础版', icon: FlaskConical },
  { id: 'PLUS', name: '专家版 Plus', tag: '最受欢迎 · 深度科研首选', price: '¥299', unit: '/ 月', line: '按月结算 · 灵活开通', desc: '适合持续科研、论文与数据分析', quota: '高额度', refresh: '每7天自动刷新', spaces: '5 个', cta: '立即升级 Plus', icon: Layers },
  { id: 'PRO', name: '专家版 Pro', tag: '高频科研', price: '¥659', unit: '/ 月', line: '按月结算 · 灵活开通', desc: '适合高频科研、多项目与复杂任务', quota: '最高额度', refresh: '每7天自动刷新', spaces: '不限', cta: '立即升级 Pro', icon: Orbit },
];

const FEATURES = ['自由对话', '科研任务', '专业工作流', '高频科研场景'];

export function MembershipPlans({ onCheckout, onBack, onToast }) {
  return <div className="view acct-view plans-view">
    <div className="crumb"><button type="button" className="text-link" onClick={onBack}>← 返回</button> / <strong>会员套餐</strong></div>
    <header className="acct-head plans-heading">
      <div><h1>选择适合你的方案</h1><p>根据科研需求选择套餐，随时可以升级或续费。</p></div>
    </header>
    <div className="plan-grid" aria-label="会员套餐">
      {PLANS.map(plan => <article key={plan.id} className="plan-card" data-plan={plan.id}>
        <header className="plan-card-head">
          <plan.icon className="plan-card-mark" size={60} strokeWidth={1} aria-hidden="true"/>
          <span className="plan-tag">{plan.tag}</span>
          <h2>{plan.name}</h2>
        </header>
        <div className="plan-price">{plan.price}<span>{plan.unit}</span></div>
        <p className="plan-billing">{plan.line}</p>
        <p className="plan-desc">{plan.desc}</p>
        <dl className="plan-entitlements">
          <div><dt>科研额度</dt><dd><strong>{plan.quota}</strong></dd></div>
          <div><dt>刷新周期</dt><dd className="plan-refresh">{plan.refresh}</dd></div>
          <div><dt>科研项目空间</dt><dd><strong>{plan.spaces}</strong></dd></div>
        </dl>
        <ul className="plan-features">{FEATURES.map(item => <li key={item}><Check size={13} aria-hidden="true"/>{item}</li>)}</ul>
        <Btn kind={plan.id === 'PLUS' ? 'primary' : 'secondary'}
          className={plan.id === 'PRO' ? 'plan-cta-pro' : undefined}
          disabled={plan.id === 'FREE'} onClick={() => onCheckout(plan.id)}>{plan.cta}</Btn>
      </article>)}
    </div>
    <div className="plan-redeem-row">
      <button type="button" className="plan-redeem" onClick={() => onToast('输入兑换码（原型演示）')}>
        <Gift size={16} strokeWidth={1.6} aria-hidden="true"/>立即兑换会员
      </button>
    </div>
  </div>;
}

const CHECKOUT_PLANS = [
  ["基础版", "日常科研", "¥79 / 月", "4,500 积分 / 7 天", "2 个科研空间"],
  ["专家版 Plus", "进阶科研", "¥299 / 月", "22,500 积分 / 7 天", "5 个科研空间"],
  ["专家版 Pro", "重度科研", "¥659 / 月", "50,000 积分 / 7 天", "不限数量科研空间"],
];

export function Checkout({ plan = "BASIC", onBack, onToast }) {
  const [selected, setSelected] = useState(plan === "PLUS" ? 1 : plan === "PRO" ? 2 : 0);
  const [months, setMonths] = useState(1);
  const [pay, setPay] = useState("微信支付");
  const price = [79, 299, 659][selected];
  const total = price * months;
  const current = CHECKOUT_PLANS[selected];

  return (
    <div className="view acct-view checkout-view ds-checkout">
      <div className="crumb"><button type="button" className="text-link" onClick={onBack}>← 返回套餐列表</button> / <strong>会员套餐结算</strong></div>
      <div className="acct-head checkout-heading">
        <h1>会员套餐结算</h1>
        <p>选择套餐、购买时长和支付方式。</p>
      </div>
      <PageActions><div className="checkout-membership-meta"><Badge tone="slate">免费版</Badge><Button onClick={onBack}><ClipboardCheck size={16} aria-hidden="true"/>查看权益</Button></div></PageActions>

      <div className="checkout-layout">
        <div className="checkout-main">
          <section className="checkout-step">
            <h2>选择会员套餐</h2>
            <div className="checkout-plans">
              {CHECKOUT_PLANS.map((item, index) => (
                <button key={item[0]} type="button" className={"checkout-plan" + (selected === index ? " is-active" : "")} aria-pressed={selected === index} onClick={() => setSelected(index)}>
                  <span className="row-hint">{item[1]}</span>
                  <strong>{item[0]}</strong>
                  <span className="checkout-plan-price">{item[2]}</span>
                  <span className="checkout-plan-detail">{item[3]}<br/>{item[4]}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="checkout-step">
            <h2>选择购买时长 <span className="row-hint">按月单价计算</span></h2>
            <div className="duration-row">
              {[[1, "1个月"], [3, "3个月"], [6, "6个月"], [12, "1年"]].map(([m, label]) => (
                <button key={m} type="button" className={"duration" + (months === m ? " is-active" : "")} aria-pressed={months === m} onClick={() => setMonths(m)}>
                  <span>{label}</span>
                  <strong>¥{(price * m).toFixed(2)}</strong>
                </button>
              ))}
            </div>
            <p className="note">套餐科研额度每7天刷新，通用积分长期保留。</p>
          </section>

          <section className="checkout-step">
            <h2>选择支付方式</h2>
            <div className="pay-row">
              {["微信支付", "支付宝"].map((item) => (
                <button key={item} type="button" className={"pay-option" + (pay === item ? " is-active" : "")} aria-pressed={pay === item} onClick={() => setPay(item)}>
                  <span className={"pay-logo " + (item === "微信支付" ? "wechat" : "alipay")}>{item === "微信支付" ? "微" : "支"}</span>
                  <span><strong>{item}</strong><span className="row-hint">{item}扫一扫快捷支付</span></span>
                </button>
              ))}
            </div>
            <p className="note">会员服务与发票说明</p>
          </section>
        </div>

        <aside className="order-card" aria-label="订单确认" data-plan={selected === 2 ? "PRO" : undefined}>
          <div className="order-head">订单确认</div>
          <CreditCard className="checkout-order-mark" size={88} strokeWidth={1} aria-hidden="true"/>
          <h3>{current[0]}</h3>
          <p className="row-hint">{months}个月会员 · 科研套餐</p>
          <dl className="order-list">
            <div><dt>套餐单价</dt><dd>¥{price}.00 / 月</dd></div>
            <div><dt>购买时长</dt><dd>{months}个月</dd></div>
            <div><dt>周期额度</dt><dd>{current[3]}</dd></div>
            <div><dt>支付方式</dt><dd>{pay}</dd></div>
            <div><dt>开通账户</dt><dd>微信用户57585</dd></div>
          </dl>
          <div className="order-total"><span>应付金额</span><strong>¥{total.toFixed(2)}</strong></div>
          <Btn kind="primary" className={"full checkout-pay-button" + (selected === 2 ? " plan-cta-pro" : "")} onClick={() => onToast("原型演示：将生成支付二维码")}>确认并生成支付二维码</Btn>
          <button type="button" className="order-alt" onClick={() => onToast("请他人代付（原型演示）")}>请他人代付</button>
          <p className="order-hint">通过微信 / 支付宝完成支付</p>
        </aside>
      </div>
    </div>
  );
}

export function Recharge({ onBack, onToast }) {
  const [amount, setAmount] = useState(100);
  const [pay, setPay] = useState("微信支付");
  const options = [10, 50, 100, 500];

  return (
    <div className="view acct-view checkout-view ds-checkout">
      <div className="crumb"><button type="button" className="text-link" onClick={onBack}>← 返回上一页</button> / <strong>积分充值</strong></div>
      <div className="acct-head">
        <h1>积分充值</h1>
        <p>选择充值金额和支付方式。</p>
      </div>

      <PageActions><div className="checkout-membership-meta"><Badge tone="blue">5,900 积分</Badge><Button onClick={() => onToast("查看积分明细（原型演示）")}><FileText size={16} aria-hidden="true"/>积分明细</Button></div></PageActions>

      <div className="checkout-layout">
        <div className="checkout-main">
          <section className="checkout-step">
            <h2>选择充值额度 <span className="row-hint">¥1 = 100 积分</span></h2>
            <div className="recharge-grid">
              {options.map((item) => (
                <button key={item} type="button" className={"recharge-option" + (amount === item ? " is-active" : "")} aria-pressed={amount === item} onClick={() => setAmount(item)}>
                  <span className="row-hint">通用积分</span>
                  <strong>{(item * 100).toLocaleString()}</strong>
                  <span>¥{item.toFixed(2)}</span>
                  {item === 100 ? <span className="mini-flag">常用额度</span> : null}
                </button>
              ))}
            </div>
            <div className="custom-amount">
              <span>自定义金额</span>
              <div className="amount-input"><span>¥</span><input value={String(amount)} onChange={(event) => { const n = Number(event.target.value.replace(/[^0-9]/g, "")); setAmount(Number.isFinite(n) ? Math.min(8000, n) : 0); }} aria-label="自定义充值金额" /></div>
              <span className="row-hint">单笔 ¥1–¥8,000，仅支持整数</span>
            </div>
          </section>

          <section className="checkout-step">
            <h2>选择支付方式</h2>
            <div className="pay-row">
              {["微信支付", "支付宝"].map((item) => (
                <button key={item} type="button" className={"pay-option" + (pay === item ? " is-active" : "")} aria-pressed={pay === item} onClick={() => setPay(item)}>
                  <span className={"pay-logo " + (item === "微信支付" ? "wechat" : "alipay")}>{item === "微信支付" ? "微" : "支"}</span>
                  <span><strong>{item}</strong><span className="row-hint">{item}扫一扫快捷支付</span></span>
                </button>
              ))}
            </div>
            <p className="note">充值说明与发票</p>
          </section>
        </div>

        <aside className="order-card">
          <div className="order-head">订单确认</div>
          <CreditCard className="checkout-order-mark" size={88} strokeWidth={1} aria-hidden="true"/>
          <h3>{(amount * 100).toLocaleString()} 通用积分</h3>
          <p className="row-hint">一次充值 · 长期有效</p>
          <dl className="order-list">
            <div><dt>充值金额</dt><dd>¥{amount.toFixed(2)}</dd></div>
            <div><dt>支付方式</dt><dd>{pay}</dd></div>
            <div><dt>到账账户</dt><dd>微信用户57585</dd></div>
          </dl>
          <div className="order-total"><span>应付金额</span><strong>¥{amount.toFixed(2)}</strong></div>
          <Btn kind="primary" className="full checkout-pay-button" onClick={() => onToast("原型演示：将生成支付二维码")}>确认并生成支付二维码</Btn>
          <button type="button" className="order-alt" onClick={() => onToast("请他人代付（原型演示）")}>请他人代付</button>
          <p className="order-hint">支付成功后积分自动到账</p>
        </aside>
      </div>
    </div>
  );
}

export function Approvals({ onFiles }) {
  const [tab, setTab] = useState("我发起的");
  return (
    <div className="view acct-view account-flat approvals-view">
      <header className="acct-head"><h1>我的审批</h1><p>查看发起的下载申请和待处理审批。</p></header>
      <Tabs className="sp-filter-chips approval-filters" items={["我发起的", "待我审批"]} value={tab} onChange={setTab} />
      <div className="billing-records">
        <WorkspaceEmptyState icon={DocumentEmptyIllustration} description={tab === "我发起的" ? "发起文件下载申请后，可在这里查看进度。" : "收到文件下载申请后，可在这里处理。"} action={tab === "我发起的" && <Button onClick={onFiles}>前往我的文件 <ArrowRight size={16}/></Button>}>{tab === "我发起的" ? "暂无发起的申请" : "暂无待审批申请"}</WorkspaceEmptyState>
      </div>
    </div>
  );
}

export function AccountFrame({ children }) {
  return <div className="view acct-view">{children}</div>;
}

export const AccountIcons = { Download, ImageIcon, User };

