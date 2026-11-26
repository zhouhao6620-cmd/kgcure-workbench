import { sitePath } from "../site-path.js";
import { WorkspaceSelect } from '../design-system/WorkspaceSelect.jsx';
import { PageActions } from '../design-system/SecondaryPageShell.jsx';
import { MembershipRedeemDialog } from "./BillingUsage.jsx";
import { ProcurementInquiry } from "./ProcurementInquiry.jsx";
import { SAMPLE_BALANCE } from "./billing-usage-data.js";
import { canUseExclusiveCapability, DAILY_TASK_BENEFIT_LABEL, DAILY_TASK_EXAMPLES, membershipBenefits } from '../content/membership.js';
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ClipboardCheck,
  Coins,
  CreditCard,
  Download,
  FileText,
  Eye,
  FlaskConical,
  FolderOpen,
  Gift,
  Image as ImageIcon,
  Layers,
  MessageCircle,
  MoreHorizontal,
  Orbit,
  Pencil,
  Share2,
  ShieldCheck,
  Search,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";
import { AgentGlyph, ApprovalEmptyIllustration, Button, EmptyState as WorkspaceEmptyState, IconButton, Modal, RecordEmptyIllustration, SearchEmptyIllustration, SkillGlyph, StatusTag, Tag, TrashEmptyIllustration } from "../design-preview/components.jsx";
import { DeliveryFileIcon, RecordContributor } from "../design-preview/ConversationPatterns.jsx";
import { downloadText } from "../content/catalog.js";
import { downloadWord } from "../design-preview/word-file.js";
import { Badge, Btn, PageHead, Tabs } from "../components.jsx";
import { Pagination } from "../design-system/Pagination.jsx";
import { spaceMemberPreview } from "../design-system/space-access.js";
import "./membership-plans.css";

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
const DEMO_LIBRARY_FILES = FILES.map((row, index) => [...row, `demo-library:${index}`]);
const FILES_LIBRARY_OVERRIDES_KEY = 'kgcure-my-files-overrides-v1';

function readFileLibraryOverrides() {
  try { return JSON.parse(localStorage.getItem(FILES_LIBRARY_OVERRIDES_KEY) || '{}') || {}; }
  catch { return {}; }
}

function fileLibraryView(sessions, libraryFiles, overrides = readFileLibraryOverrides()) {
  const localFiles=sessions.flatMap(session=>(session.files||[]).map(file=>({...file,title:session.title,date:new Date(session.createdAt).toLocaleDateString('zh-CN',{timeZone:'Asia/Shanghai'})})));
  const preservedFiles=[...libraryFiles,...localFiles].filter((file,index,items)=>items.findIndex(item=>item.id===file.id)===index);
  const fileLookup=new Map(preservedFiles.map(file=>[file.id,file]));
  const preservedRows=preservedFiles.map(file=>[
    file.name,
    file.type==='DOCX'?'W':file.type==='PDF'?'P':file.type==='XLSX'?'X':file.type==='ZIP'?'Z':'M',
    file.source||'文件库',
    file.title||file.spaceName||'我的文件库',
    file.date||'',
    file.size||'',
    file.id,
  ]);
  const baseRows=[...preservedRows,...DEMO_LIBRARY_FILES];
  const hiddenIds=overrides.hiddenIds||[];
  const renamedFiles=overrides.names||{};
  const allRows=baseRows.filter(row=>!hiddenIds.includes(row[6])).map(row=>[renamedFiles[row[6]]||row[0],...row.slice(1)]);
  return { allRows, fileLookup };
}

export function libraryAttachmentFiles(sessions, libraryFiles) {
  const { allRows, fileLookup } = fileLibraryView(sessions, libraryFiles);
  return allRows.map(row => {
    const id = row[6];
    const file = fileLookup.get(id);
    return { id, name: row[0], size: file?.byteSize ?? file?.size };
  });
}

export function MyFiles({ onToast, sessions=[], libraryFiles=[], onAddFiles }) {
  const [tab, setTab] = useState("最近使用");
  const [page, setPage] = useState(1);
  const [query,setQuery]=useState(''),[format,setFormat]=useState('全部'),[source,setSource]=useState('全部'),[preview,setPreview]=useState(null);
  const [overrides,setOverrides]=useState(readFileLibraryOverrides);
  const [openMoreId,setOpenMoreId]=useState(null),[renameTarget,setRenameTarget]=useState(null),[shareTarget,setShareTarget]=useState(null),[deleteTarget,setDeleteTarget]=useState(null),[renameValue,setRenameValue]=useState('');
  const moreRef=useRef(null);
  const { allRows, fileLookup } = fileLibraryView(sessions, libraryFiles, overrides);
  const fileTabItems=[
    {key:'最近使用',label:<span className="files-library-tab-label">最近使用<span className="files-library-tab-count">{allRows.length}</span></span>},
    {key:'全部文件',label:<span className="files-library-tab-label">全部文件<span className="files-library-tab-count">{allRows.length}</span></span>},
    {key:'回收站',label:<span className="files-library-tab-label">回收站<span className="files-library-tab-count">0</span></span>},
  ];
  const rows=allRows.filter(row=>tab!=='回收站'&&(!query||row[0].toLowerCase().includes(query.toLowerCase()))&&(format==='全部'||row[0].toLowerCase().endsWith('.'+format.toLowerCase()))&&(source==='全部'||row[2]===source));
  const pageCount=Math.max(1,Math.ceil(rows.length/10));
  const currentPage=Math.min(page,pageCount);
  const pagedRows=rows.slice((currentPage-1)*10,currentPage*10);
  function view(row){setPreview({name:row[0],content:fileLookup.get(row[6])?.content,type:fileLookup.get(row[6])?.type,source:row[2],date:row[4]});}
  function download(row){
    const file=fileLookup.get(row[6]);
    if(typeof file?.content!=='string'){
      onToast('该文件仅保留记录，暂无可下载正文');
      return;
    }
    file.type==='DOCX'?downloadWord(row[0],file.content):downloadText(row[0],file.content);
  }
  function beginRename(row){setOpenMoreId(null);setRenameTarget({id:row[6],name:row[0]});setRenameValue(row[0]);}
  function renameFile(event){event.preventDefault();const nextName=renameValue.trim();if(!renameTarget||!nextName)return;setOverrides(current=>({...current,names:{...(current.names||{}),[renameTarget.id]:nextName}}));setRenameTarget(null);onToast('文件已重命名');}
  function deleteFile(){if(!deleteTarget)return;setOverrides(current=>({...current,hiddenIds:[...new Set([...(current.hiddenIds||[]),deleteTarget.id])]}));if(preview?.name===deleteTarget.name)setPreview(null);setDeleteTarget(null);setOpenMoreId(null);onToast('文件已删除');}
  useEffect(()=>{try{localStorage.setItem(FILES_LIBRARY_OVERRIDES_KEY,JSON.stringify(overrides));}catch{}},[overrides]);
  useEffect(()=>{setPage(1);},[tab,query,format,source]);
  useEffect(()=>{
    if(!openMoreId)return;
    function closeOutside(event){if(!moreRef.current?.contains(event.target)&&!event.target.closest('.files-library-more-trigger'))setOpenMoreId(null);}
    function closeEscape(event){if(event.key==='Escape')setOpenMoreId(null);}
    document.addEventListener('pointerdown',closeOutside);document.addEventListener('keydown',closeEscape);
    return()=>{document.removeEventListener('pointerdown',closeOutside);document.removeEventListener('keydown',closeEscape);};
  },[openMoreId]);


  return (
    <div className="view acct-view files-library">
      <header className="acct-head files-library-head"><div><h1>我的文件库</h1><p>查找科研对话的交付文件和本地文件记录。</p></div>
        <label className="sp-button sp-button-secondary ds-upload-button"><Upload size={16}/>添加本地文件
          <input type="file" multiple aria-label="添加到我的文件" onChange={e=>{
            const additions=Array.from(e.target.files||[]).map(file=>({
              id:crypto.randomUUID(), name:file.name, type:file.name.split('.').at(-1)?.toUpperCase(),
              source:'本地附件名称', title:'未关联对话',
              date:new Date().toLocaleDateString('zh-CN',{timeZone:'Asia/Shanghai'}),
              byteSize:file.size, size:(file.size/1024).toFixed(1)+' KB',
            }));
            if(!additions.length)return;
            onAddFiles(additions);setPage(1);e.target.value='';
            onToast('已记录本地文件名称，未上传文件正文');
          }}/>
        </label>
      </header>
      <div className="files-library-toolbar">
        <Tabs className="ds-detail-tabs files-library-tabs" items={fileTabItems}
          value={tab} onChange={setTab} ariaLabel="文件分类"/>
      </div>
      {tab !== "回收站" && <div className="files-library-controls">
        <label className="sp-search-field files-library-search"><Search size={16}/><input aria-label="搜索文件名称" placeholder="搜索文件名称" value={query} onChange={e=>setQuery(e.target.value)}/></label>
        <div className="files-library-filter-group">
          <WorkspaceSelect label="文件来源筛选" value={source} onChange={setSource} options={[{value:'全部',label:'全部来源'},...new Set(allRows.map(row=>row[2]))]}/>
          <WorkspaceSelect label="文件格式筛选" value={format} onChange={setFormat} options={[{value:'全部',label:'全部格式'},'MD','DOCX','PDF','PNG','CSV','XLSX','ZIP']}/>
        </div>
      </div>}
      {rows.length ? <section aria-label="文件列表" className="files-library-results">
        <header><p className="files-result-count" aria-live="polite">共 {rows.length} 个文件</p><span>按最近使用排序</span></header>
        <ul className="files-library-list">{pagedRows.map(row=>{
          const [name,,origin,conversation,date,size,id]=row;
          const key=id||name;
          const formatLabel=name.split('.').at(-1)?.toUpperCase()||'FILE';
          return <li className="files-library-row-card" key={key}>
            <button type="button" className="files-library-main" title={name} aria-label={'预览 '+name} onClick={()=>view(row)}>
              <DeliveryFileIcon type={formatLabel} name={name}/>
              <span className="files-library-copy"><strong>{name}</strong><small><span>最新更新 {date}</span><span className="files-library-dot">·</span><span>{formatLabel}</span><span className="files-library-dot">·</span><span className="files-library-origin" title={origin+' · '+conversation+' · '+size}>{origin} · {conversation}</span></small></span>
            </button>
            <div className="files-library-actions">
              <IconButton label={"预览 "+name} onClick={()=>view(row)}><Eye size={16}/></IconButton>
              {fileLookup.has(id)&&<IconButton label={"下载 "+name} onClick={()=>download(row)}><Download size={16}/></IconButton>}
              <div className="workRecordMore" ref={openMoreId===id?moreRef:undefined}>
                <button type="button" className="workRecordMoreButton files-library-more-trigger" aria-label={'更多操作 '+name} title="更多操作" aria-haspopup="menu" aria-expanded={openMoreId===id} onClick={()=>setOpenMoreId(openMoreId===id?null:id)}><MoreHorizontal size={18}/></button>
                {openMoreId===id&&<div className="workRecordMoreMenu" role="menu" aria-label={'更多操作 '+name}>
                  <button type="button" role="menuitem" onClick={()=>beginRename(row)}><Pencil size={15} aria-hidden="true"/><span>重命名</span></button>
                  <button type="button" role="menuitem" onClick={()=>{setOpenMoreId(null);download(row);}}><Download size={15} aria-hidden="true"/><span>下载</span></button>
                  <button type="button" role="menuitem" onClick={()=>{setOpenMoreId(null);setShareTarget({name,origin,conversation,date});}}><Share2 size={15} aria-hidden="true"/><span>分享</span></button>
                  <button type="button" className="is-danger" role="menuitem" onClick={()=>{setOpenMoreId(null);setDeleteTarget({id,name});}}><Trash2 size={15} aria-hidden="true"/><span>删除</span></button>
                </div>}
              </div>
            </div>
          </li>;
        })}</ul>
        <Pagination page={currentPage} total={pageCount} onChange={setPage} label="我的文件分页"/>
      </section> : <WorkspaceEmptyState className={tab==="回收站"?"files-library-empty":undefined} icon={tab==="回收站"?TrashEmptyIllustration:(query||format!=="全部"||source!=="全部")?SearchEmptyIllustration:RecordEmptyIllustration}
        description={tab==="回收站"?"回收站里暂无文件。":"调整关键词、来源或文件格式后再试。"}
        onReset={tab!=="回收站"&&(query||format!=="全部"||source!=="全部")?()=>{setQuery("");setFormat("全部");setSource("全部");}:undefined}>
        {tab==="回收站"?"回收站为空":"没有匹配的文件"}
      </WorkspaceEmptyState>}
      {renameTarget&&<Modal title="重命名文件" onClose={()=>setRenameTarget(null)}><form onSubmit={renameFile}><label className="sp-field"><span>文件名称</span><input autoFocus required value={renameValue} onChange={event=>setRenameValue(event.target.value)}/></label><div className="sp-dialog-actions"><Button onClick={()=>setRenameTarget(null)}>放弃</Button><button type="submit" className="sp-button sp-button-primary">保存修改</button></div></form></Modal>}
      {shareTarget&&<Modal title="分享文件" onClose={()=>setShareTarget(null)}><div className="ds-prose"><p>分享「{shareTarget.name}」</p><p>本地预览不会创建公开链接。真实产品中可生成仅空间成员可访问的分享入口。</p></div><div className="sp-dialog-actions"><Button onClick={()=>setShareTarget(null)}>完成</Button></div></Modal>}
      {deleteTarget&&<Modal title="删除文件" onClose={()=>setDeleteTarget(null)}><div className="ds-prose"><p>删除「{deleteTarget.name}」后，将从我的文件列表中移除。</p></div><div className="sp-dialog-actions"><Button onClick={()=>setDeleteTarget(null)}>放弃</Button><Button variant="danger" onClick={deleteFile}>确认删除</Button></div></Modal>}
      {preview&&<Modal title={preview.name} wide onClose={()=>setPreview(null)}>{preview.content?<><pre className="sp-file-preview">{preview.content}</pre><Btn kind="primary" onClick={()=>preview.type==='DOCX'?downloadWord(preview.name,preview.content):downloadText(preview.name,preview.content)}>下载文件</Btn></>:<div className="ds-prose"><p>当前仅保留文件元数据，未取得此文件正文。</p><p>来源：{preview.source}<br/>记录时间：{preview.date}</p><p>此预览不会生成或下载伪造的原始文件。</p></div>}</Modal>}
    </div>
  );
}

const VERIFIED_PROFILE_EXAMPLE = {
  realName: '周*', idNumber: '3****************3',
  organization: '医疗机构 · 示例医院', role: '临床医生 · 主治医师',
  needs: ['文献检索', '数据分析'],
};

export function ProfilePage({ onToast, verified, verification, reviewSubmission, onVerify }) {
  const details = verified ? VERIFIED_PROFILE_EXAMPLE : verification;
  const verificationSection = useRef(null);

  useEffect(() => {
    if (!reviewSubmission || !verification) return;
    const frame = requestAnimationFrame(() => {
      verificationSection.current?.focus({ preventScroll: true });
      verificationSection.current?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [reviewSubmission, verification]);

  return (
    <div className="view acct-view account-flat profile-view">
      <div className="acct-head profile-head">
        <h1>个人资料</h1>
        <p>管理账户信息和实名认证。</p>
        <div className="profile-verification-entry">
          {details ? <Tag tone="green" icon={ShieldCheck}>已实名认证</Tag>
            : <Button variant="primary" onClick={onVerify}><ShieldCheck size={16} aria-hidden="true" />马上认证</Button>}
        </div>
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
      {details && <section className="account-section profile-identity" ref={verificationSection} tabIndex={-1} aria-labelledby="profile-identity-title">
        <header><h2 id="profile-identity-title">实名认证</h2></header>
        <div>
          <InfoRow label="姓名" value={details.realName || '未填写'} trailing={
            <Tag tone="green" icon={ShieldCheck}>已实名认证</Tag>
          } />
          <InfoRow label="身份证号" value={details.idNumber} />
          <InfoRow label="所属机构" value={details.organization || '未填写'} />
          <InfoRow label="科研身份" value={details.role || '未选择'} />
          <InfoRow label="主要科研需求" value={details.needs.join('、') || '未选择'} />
        </div>
      </section>}
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

const POINTS_PER_YUAN = 100;
const planNumber = new Intl.NumberFormat('zh-CN');
const money = new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const PLANS = [
  { id: 'BASIC', name: '基础版', useCase: '适合日常文献、分析与常规科研', checkoutHint: '日常文献与分析', price: 79, quota: 10000, icon: FlaskConical },
  { id: 'PLUS', name: 'Plus', useCase: '适合持续科研、论文与数据分析', checkoutHint: '论文与数据分析', price: 299, quota: 40000, icon: Layers },
  { id: 'PRO', name: 'Pro', useCase: '适合高频科研、多项目与复杂任务', checkoutHint: '多项目与复杂任务', price: 999, quota: 150000, icon: Orbit },
];

function PlanAvailability({ included, children }) {
  const StatusIcon = included ? Check : X;
  return <li className="plan-feature-line plan-feature-status" data-included={included}>
    <StatusIcon size={16} aria-hidden="true" />
    <span>{children}<span className="sp-visually-hidden">{included ? '，已包含' : '，未包含'}</span></span>
  </li>;
}

function PlanCard({ plan, currentPlan, onCheckout }) {
  const tier = plan.id.toLowerCase();
  const { collaboration, academy } = membershipBenefits(tier);
  const hasExclusiveAccess = canUseExclusiveCapability(tier);
  const rechargePrice = plan.quota / POINTS_PER_YUAN;
  const multiple = plan.quota / PLANS[0].quota;
  const isCurrent = plan.id === currentPlan;
  const action = isCurrent ? '续费' : currentPlan === 'FREE' ? '开通' : plan.id === 'PRO' ? '升级' : '选择';
  return <article className="plan-card" data-plan={plan.id} aria-labelledby={`plan-${plan.id}`}>
    <header className="plan-card-head">
      <div className="plan-card-title">
        <h2 id={`plan-${plan.id}`}>{plan.name}</h2>
        {isCurrent && <span className="plan-current-badge" title="当前方案"><BadgeCheck size={14} aria-hidden="true" />当前</span>}
      </div>
      <plan.icon className="plan-card-mark" size={36} strokeWidth={1.2} aria-hidden="true" />
      <p>{plan.useCase}</p>
    </header>
    <div className="plan-pricing">
      <p className="plan-price"><span className="plan-currency">¥</span>{planNumber.format(plan.price)}<span className="plan-period"> / 月</span></p>
      {multiple > 1 && <span className="plan-multiplier" title={`相当于基础版月度科研额度的 ${multiple} 倍`}>
        <strong>{multiple}<span>×</span></strong><small>基础额度</small>
      </span>}
    </div>
    <dl className="plan-quota">
      <dt>赠送科研额度</dt>
      <dd><strong>{planNumber.format(plan.quota)}</strong> 积分/月</dd>
    </dl>
    <p className="plan-savings" title={`同等额度直接充值需 ¥${planNumber.format(rechargePrice)}`}>
      比直接积分充值省 ¥{planNumber.format(rechargePrice - plan.price)}
    </p>
    <Button variant={plan.id === 'PLUS' ? 'primary' : 'secondary'}
      className={plan.id === 'PRO' ? 'plan-cta-pro' : undefined} onClick={() => onCheckout(plan.id)}>
      {action}{plan.id === 'BASIC' ? '' : ' '}{plan.name}
    </Button>
    <ul className="plan-features">
      <li className="plan-feature-line plan-feature-basic">
        <MessageCircle size={16} strokeWidth={1.65} aria-hidden="true" />
        <div className="plan-feature-copy">
          <span className="plan-feature-title">{DAILY_TASK_BENEFIT_LABEL}</span>
          <span className="plan-feature-examples">
            {DAILY_TASK_EXAMPLES.map(example => <Tag key={example}>{example}</Tag>)}
          </span>
        </div>
      </li>
      <li className="plan-feature-line plan-feature-title"><ImageIcon size={16} strokeWidth={1.65} aria-hidden="true" />科研绘图</li>
      <li className="plan-feature-group">
        <span className="plan-feature-line plan-feature-title"><SkillGlyph size={16} />科研 Skill</span>
        <ul className="plan-feature-details">
          <PlanAvailability included>普通 Skill</PlanAvailability>
          {hasExclusiveAccess && <PlanAvailability included>专享 Skill</PlanAvailability>}
        </ul>
      </li>
      <li className="plan-feature-group">
        <span className="plan-feature-line plan-feature-title"><AgentGlyph size={16} />科研 Agent</span>
        <ul className="plan-feature-details">
          <PlanAvailability included>普通 Agent</PlanAvailability>
          {hasExclusiveAccess && <PlanAvailability included>专享 Agent</PlanAvailability>}
        </ul>
      </li>
      <li className="plan-feature-group">
        <span className="plan-feature-line plan-feature-title"><FolderOpen size={16} strokeWidth={1.65} aria-hidden="true" />科研空间</span>
        <ul className="plan-feature-details">
          <PlanAvailability included={collaboration}>{collaboration ? '支持邀请成员协作' : '不支持邀请协作'}</PlanAvailability>
        </ul>
      </li>
      {academy && <PlanAvailability included>KGcure 学院课程</PlanAvailability>}
    </ul>
  </article>;
}

export function MembershipPlans({ onCheckout, onBack, tier }) {
  const [dialog, setDialog] = useState(null);
  const currentPlan = tier.toUpperCase();
  const closeDialog = () => setDialog(null);
  return <div className="view acct-view plans-view">
    <div className="crumb"><button type="button" className="text-link" onClick={onBack}>← 返回</button> / <strong>会员套餐</strong></div>
    <PageActions>
      <Button className="plan-procurement-entry" aria-haspopup="dialog" onClick={() => setDialog('procurement')}>
        <Building2 size={16} aria-hidden="true" />药械医院采购
      </Button>
    </PageActions>
    <header className="plans-heading">
      <h1>选择适合你的方案</h1>
      <p>根据科研需求选择套餐，随时可以升级或续费</p>
    </header>
    <section aria-label="会员套餐">
      <div className="plan-grid">
        {PLANS.map(plan => <PlanCard key={plan.id} plan={plan} currentPlan={currentPlan} onCheckout={onCheckout} />)}
      </div>
      <div className="plan-redeem-row">
        <Button aria-haspopup="dialog" onClick={() => setDialog('redeem')}>
          <Gift size={16} strokeWidth={1.6} aria-hidden="true" />使用兑换码兑换
        </Button>
      </div>
    </section>
    {dialog === 'redeem' && <MembershipRedeemDialog onClose={closeDialog} />}
    {dialog === 'procurement' && <ProcurementInquiry onClose={closeDialog} />}
  </div>;
}

function PaymentOptions({ selected, onChange }) {
  return <div className="pay-row">
    {[
      ["微信支付", "wechat-pay.png"],
      ["支付宝", "alipay.png"],
    ].map(([name, logo]) => (
      <button key={name} type="button" className={"pay-option" + (selected === name ? " is-active" : "")}
        aria-pressed={selected === name} onClick={() => onChange(name)}>
        <img className="pay-provider-logo" src={sitePath(`/payment/${logo}`)} width={32} height={32} alt="" />
        <span><strong>{name}</strong><span className="row-hint">{name}扫一扫快捷支付</span></span>
      </button>
    ))}
  </div>;
}

export function Checkout({ plan = "BASIC", tier, onBack, onToast }) {
  const [selected, setSelected] = useState(plan);
  const [months, setMonths] = useState(1);
  const [pay, setPay] = useState("微信支付");
  const current = PLANS.find(item => item.id === selected) || PLANS[0];
  const price = current.price;
  const total = price * months;

  return (
    <div className="view acct-view checkout-view ds-checkout">
      <div className="crumb"><button type="button" className="text-link" onClick={onBack}>← 返回套餐列表</button> / <strong>会员套餐结算</strong></div>
      <div className="acct-head checkout-heading">
        <h1>会员套餐结算</h1>
        <p>选择套餐、购买时长和支付方式。</p>
      </div>
      <PageActions><div className="checkout-membership-meta"><Badge tone="slate">{membershipBenefits(tier).name}</Badge><Button onClick={onBack}><ClipboardCheck size={16} aria-hidden="true"/>查看权益</Button></div></PageActions>

      <div className="checkout-layout">
        <div className="checkout-main">
          <section className="checkout-step">
            <h2>选择会员套餐</h2>
            <div className="checkout-plans">
              {PLANS.map(item => (
                <button key={item.id} type="button" className={"checkout-plan" + (current.id === item.id ? " is-active" : "")} aria-pressed={current.id === item.id} onClick={() => setSelected(item.id)}>
                  <span className="row-hint">{item.checkoutHint}</span>
                  <strong>{item.name}</strong>
                  <span className="checkout-plan-price">¥{planNumber.format(item.price)} / 月</span>
                  <span className="checkout-plan-detail">赠送科研额度<br />{planNumber.format(item.quota)} 积分/月</span>
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
                  <strong>¥{money.format(price * m)}</strong>
                </button>
              ))}
            </div>
            <p className="note">会员科研额度按月刷新，充值积分长期保留。</p>
          </section>

          <section className="checkout-step">
            <h2>选择支付方式</h2>
            <PaymentOptions selected={pay} onChange={setPay} />
            <p className="note">会员服务与发票说明</p>
          </section>
        </div>

        <aside className="order-card" aria-label="订单确认" data-plan={current.id}>
          <div className="order-head">订单确认</div>
          <CreditCard className="checkout-order-mark" size={88} strokeWidth={1} aria-hidden="true"/>
          <h3>{current.name}</h3>
          <p className="row-hint">{months}个月会员 · 科研套餐</p>
          <dl className="order-list">
            <div><dt>套餐单价</dt><dd>¥{money.format(price)} / 月</dd></div>
            <div><dt>购买时长</dt><dd>{months}个月</dd></div>
            <div><dt>赠送科研额度</dt><dd>{planNumber.format(current.quota)} 积分/月</dd></div>
            <div><dt>支付方式</dt><dd>{pay}</dd></div>
            <div><dt>开通账户</dt><dd>微信用户57585</dd></div>
          </dl>
          <div className="order-total"><span>应付金额</span><strong>¥{money.format(total)}</strong></div>
          <Btn kind="primary" className={"full checkout-pay-button" + (current.id === 'PRO' ? ' plan-cta-pro' : '')} onClick={() => onToast("原型演示：将生成支付二维码")}>确认并生成支付二维码</Btn>
          <button type="button" className="order-alt" onClick={() => onToast("请他人代付（原型演示）")}>请他人代付</button>
          <p className="order-hint">通过微信 / 支付宝完成支付</p>
        </aside>
      </div>
    </div>
  );
}

export function Recharge({ onBack, onRecords, onToast }) {
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

      <PageActions><div className="checkout-membership-meta"><Badge tone="blue">{SAMPLE_BALANCE.toLocaleString("zh-CN")} 积分</Badge><Button onClick={onRecords}><FileText size={16} aria-hidden="true"/>积分明细</Button></div></PageActions>

      <div className="checkout-layout">
        <div className="checkout-main">
          <section className="checkout-step">
            <h2>选择充值额度 <span className="row-hint">¥1 = {POINTS_PER_YUAN} 积分</span></h2>
            <div className="recharge-grid">
              {options.map((item) => (
                <button key={item} type="button" className={"recharge-option" + (amount === item ? " is-active" : "")} aria-pressed={amount === item} onClick={() => setAmount(item)}>
                  <span className="row-hint">通用积分</span>
                  <strong>{planNumber.format(item * POINTS_PER_YUAN)}</strong>
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
            <PaymentOptions selected={pay} onChange={setPay} />
            <p className="note">充值说明与发票</p>
          </section>
        </div>

        <aside className="order-card">
          <div className="order-head">订单确认</div>
          <CreditCard className="checkout-order-mark" size={88} strokeWidth={1} aria-hidden="true"/>
          <h3>{planNumber.format(amount * POINTS_PER_YUAN)} 通用积分</h3>
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

const APPROVAL_STATUS = {
  pending: { label: '待审批', tone: 'warning' },
  approved: { label: '审核通过', tone: 'success' },
  rejected: { label: '已驳回', tone: 'error' },
};
const approvalDate = new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
});

export function Approvals({ incoming = [], outgoing = [], onResolve, onFiles }) {
  const [tab, setTab] = useState(() => incoming.length ? '待我审批' : '我发起的');
  const reviewing = tab === '待我审批';
  const records = reviewing ? incoming : outgoing;
  return (
    <div className="view acct-view account-flat approvals-view">
      <header className="acct-head"><h1>我的审批</h1><p>查看发起的下载申请和待处理审批。</p></header>
      <Tabs className="sp-filter-chips approval-filters" ariaLabel="下载审批" items={['我发起的', '待我审批']} value={tab} onChange={setTab} />
      <div className="billing-records" role="tabpanel" aria-label={tab}>
        {records.length ? <ul className="workApprovalList">{records.map(request => {
          const status = APPROVAL_STATUS[request.status];
          return <li key={request.id} className="workApprovalItem">
            <DeliveryFileIcon type={request.fileType} name={request.fileName} />
            <div className="workApprovalCopy">
              <strong title={request.fileName}>{request.fileName}</strong>
              <p>{request.spaceName}<span aria-hidden="true"> · </span>{approvalDate.format(request.createdAt)}</p>
            </div>
            <div className="workApprovalActions">
              {reviewing && <RecordContributor name={request.requesterName} description={'申请人：'+request.requesterName}
                avatar={request.requesterId===spaceMemberPreview.id?spaceMemberPreview.avatar:undefined}/>}
              {reviewing && request.status==='pending' ? <>
                <Button small onClick={() => onResolve(request, 'rejected')}><X size={16} strokeWidth={1.65} aria-hidden="true"/>驳回</Button>
                <Button small variant="primary" onClick={() => onResolve(request, 'approved')}><Check size={16} strokeWidth={1.65} aria-hidden="true"/>通过</Button>
              </> : <StatusTag status={status.tone}>{status.label}</StatusTag>}
            </div>
          </li>;
        })}</ul> : <WorkspaceEmptyState icon={ApprovalEmptyIllustration}
          description={reviewing ? '收到文件下载申请后，可在这里处理。' : '发起文件下载申请后，可在这里查看进度。'}
          action={!reviewing && <Button onClick={onFiles}>前往我的文件 <ArrowRight size={16}/></Button>}>
          {reviewing ? '暂无待审批申请' : '暂无发起的申请'}
        </WorkspaceEmptyState>}
      </div>
    </div>
  );
}

export function AccountFrame({ children }) {
  return <div className="view acct-view">{children}</div>;
}

export const AccountIcons = { Download, ImageIcon, User };

