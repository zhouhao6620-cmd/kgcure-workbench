import { sitePath } from "../site-path.js";
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Bot, Check, Download, FileText, Folder, FolderInput, FolderOpen, Layers, Link2, MessageSquare, MinusCircle, MoreHorizontal, Pencil, Plus, Search, Share2, Target, Trash2, Upload, UserRound, Users, X } from 'lucide-react';
import { AgentGlyph, Button, EmptyState, IconButton, Modal, SkillGlyph, SpaceEmptyIllustration, Tag } from '../design-preview/components.jsx';
import { DeliveryFileIcon } from '../design-preview/ConversationPatterns.jsx';
import { HighlightedTitle } from './Typography.jsx';
import { capabilityById, capabilityPath, downloadText } from '../content/catalog.js';
import { downloadWord } from '../design-preview/word-file.js';
import { Pagination } from './Pagination.jsx';
import './spaces.css';
import './workspace-details.css';
export const ORIGINAL_SPACE_ID='db79430b945744a4aa9b3676d21f5fba';
const RECORDS_PER_PAGE=10;
function assignRecordFolder(space,recordId,folderId){
 const recordFolders={...space.recordFolders};
 if(folderId)recordFolders[recordId]=folderId;
 else delete recordFolders[recordId];
 return {
  ...space,
  recordFolders,
  files:(space.files||[]).map(file=>file.id===recordId?{...file,folderId}:file),
 };
}
const DEMO_MEMBERS=[
 {name:'焦龙',initial:'J',role:'示例成员',avatar:'/design-preview/members/jiao-long.png'},
 {name:'向飞',initial:'X',role:'示例成员',avatar:'/design-preview/members/xiang-fei.png'},
 {name:'李二牛',initial:'L',role:'示例成员',avatar:'/design-preview/members/li-erniu.png'},
];
const DEMO_SPACE_FILES=[
 {id:'demo-v2-plan-pdf',name:'神经发育障碍_风险预测模型研究方案.pdf',folderId:'plan',type:'PDF',source:'制定研究方案',author:'周浩',date:'2026-11-18T16:42:00'},
 {id:'demo-v2-plan-md',name:'研究人群与结局指标定义.md',folderId:'plan',type:'MD',source:'制定研究方案',author:'焦龙',date:'2026/11/13',content:'# 研究人群与结局指标定义\n\n围绕研究目标整理目标人群、纳入条件、主要结局与随访窗口。'},
 {id:'demo-v2-literature-pdf',name:'家庭管理干预系统综述检索策略.pdf',folderId:'literature',type:'PDF',source:'文献调研',author:'向飞',date:'2026-11-17T10:20:00'},
 {id:'demo-v2-literature-md',name:'文献纳排标准与数据提取表.md',folderId:'literature',type:'MD',source:'文献调研',author:'周浩',date:'2026/11/12',content:'# 文献纳排标准与数据提取表\n\n记录数据库、检索日期、纳入排除标准及字段提取规则。'},
 {id:'demo-v2-literature-zip',name:'候选研究文献筛选记录.zip',folderId:'literature',type:'ZIP',source:'文献调研',author:'李二牛',date:'2026/11/08'},
 {id:'demo-v2-data-xlsx',name:'家庭健康管理随访变量字典.xlsx',folderId:'data',type:'XLSX',source:'数据清洗',author:'周浩',date:'2026/11/16'},
 {id:'demo-v2-data-pdf',name:'队列数据清洗与缺失值处理报告.pdf',folderId:'data',type:'PDF',source:'数据清洗',author:'焦龙',date:'2026/11/11'},
 {id:'demo-v2-data-zip',name:'统计分析脚本与清洗日志.zip',folderId:'data',type:'ZIP',source:'数据清洗',author:'向飞',date:'2026/11/06'},
 {id:'demo-v2-model-pdf',name:'FETM风险预测模型训练与验证.pdf',folderId:'model',type:'PDF',source:'模型构建',author:'周浩',date:'2026-11-15T14:35:00'},
 {id:'demo-v2-model-md',name:'模型校准与临床适用性评估说明.md',folderId:'model',type:'MD',source:'模型构建',author:'李二牛',date:'2026/11/09',content:'# 模型校准与临床适用性评估说明\n\n汇总校准曲线、区分度和决策曲线结果，并记录模型适用边界。'},
 {id:'demo-v2-writing-zip',name:'论文投稿材料与图表附件.zip',folderId:'writing',type:'ZIP',source:'论文撰写',author:'周浩',date:'2026/11/10'}
];
const LEGACY_DEMO_FILE_IDS=new Set(['original-asd','demo-plan-pdf','demo-gene-md','demo-evidence-zip','demo-model-pdf','demo-scripts-zip','demo-validation-md','demo-variables-xlsx','demo-statistics-zip','demo-journal-pdf','demo-gene-appendix-zip']);
const DEMO_SPACE_FOLDERS=[
 {id:'literature',name:'文献调研'},
 {id:'data',name:'数据清洗'},
 {id:'model',name:'模型构建'},
 {id:'writing',name:'论文撰写'}
];
const DEMO_SPACE_CONVERSATIONS=[
 {id:'demo-space-plan-chat',name:'确定研究问题与结局指标',folderId:'plan',author:'周浩',date:'2026/11/18',summary:'围绕风险预测目标梳理研究对象、比较方式、主要结局和随访时间。'},
 {id:'demo-space-literature-chat',name:'系统综述检索式与纳排标准',folderId:'literature',author:'焦龙',date:'2026/11/17',summary:'讨论数据库范围、检索词组合、纳入排除条件以及灰色文献处理。'},
 {id:'demo-space-data-chat',name:'缺失值与异常值处理方案',folderId:'data',author:'向飞',date:'2026/11/16',summary:'比较删除、多重插补和敏感性分析在不同缺失机制下的适用范围。'},
 {id:'demo-space-model-chat',name:'风险预测模型校准与验证',folderId:'model',author:'李二牛',date:'2026/11/15',summary:'检查校准曲线、内部验证和外部验证结果，明确模型适用边界。'},
 {id:'demo-space-writing-chat',name:'研究结果与论文结构梳理',folderId:'writing',author:'周浩',date:'2026/11/14',summary:'根据研究方案和模型结果组织论文各部分，梳理主要图表与结论。'}
];
function demoConversationSession(demo){
 return {
  ...demo,
  space:ORIGINAL_SPACE_ID,
  origin:{folderId:demo.folderId},
  messages:[
   {role:'user',text:demo.summary},
   {role:'assistant',text:'这是本地科研空间中的对话记录示例。可根据当前研究目标继续梳理资料、明确分析方式，或进入已有任务查看配置。'},
  ],
  files:[],
 };
}
function mergeDemoFiles(spaces){
 return spaces.map(space=>space.id!==ORIGINAL_SPACE_ID?space:(()=>{
  const upgradeCapabilitySample=space.demoCapabilityVersion!==1;
  const recordFolders=Object.fromEntries(Object.entries(space.recordFolders||{}).filter(([id])=>!LEGACY_DEMO_FILE_IDS.has(id)));
  const savedFiles=(space.files||[]).filter(file=>!LEGACY_DEMO_FILE_IDS.has(file.id));
  return {
   ...space,
   capabilityIds:upgradeCapabilitySample?[...new Set([...(space.capabilityIds||[]),'1003'])]:space.capabilityIds,
   demoCapabilityVersion:1,
   folders:[...(space.folders||[]),...DEMO_SPACE_FOLDERS.filter(demo=>!space.folders?.some(folder=>folder.id===demo.id))],
   recordFolders,
   files:[...savedFiles,...DEMO_SPACE_FILES.filter(demo=>!savedFiles.some(file=>file.id===demo.id))],
  };
 })());
}
const ORIGINAL_RESTORE_FLAG='kgcure-original-space-restored-v1';
function defaultOriginalSpace(){
 return {id:ORIGINAL_SPACE_ID,name:'神经发育障碍',goal:'制作风险预测模型',members:[{name:'周浩',role:'管理员'}],capabilityIds:['1042','1028','35a3e188211447888f499c11d0b90345','1031','1003'],folders:[{id:'plan',name:'制定研究方案'}],files:[]};
}
function restoreOriginalSpace(spaces){
 if(spaces.some(space=>space.id===ORIGINAL_SPACE_ID))return spaces;
 try{if(localStorage.getItem(ORIGINAL_RESTORE_FLAG)==='1')return spaces;}catch{return spaces;}
 try{localStorage.setItem(ORIGINAL_RESTORE_FLAG,'1');}catch{}
 return [defaultOriginalSpace(),...spaces];
}
function withoutRetiredDefaultSpace(spaces){
 return spaces.filter(space=>space?.id!=='personal'&&!space?.isDefault&&space?.name!=='默认空间'&&String(space?.name||'').trim().toLowerCase()!=='test');
}
export function initialResearchSpaces(){
 try{const saved=JSON.parse(localStorage.getItem('kgcure-spaces-v2')||'null');if(Array.isArray(saved))return mergeDemoFiles(withoutRetiredDefaultSpace(restoreOriginalSpace(saved)));}catch{}
 return mergeDemoFiles([defaultOriginalSpace()]);
}
export function ResearchSpaces({spaces,onSpaces,sessions,onNavigate,onStart,spaceId,onToast,fileCount=0}){
 const [folder,setFolder]=useState(()=>spaces.find(s=>s.id===spaceId)?.folders.find(f=>f.id===new URLSearchParams(location.search).get('folder'))?.id||'all'),[filter,setFilter]=useState('全部'),[page,setPage]=useState(1),[dialog,setDialog]=useState(null),[name,setName]=useState(''),[goal,setGoal]=useState(''),[preview,setPreview]=useState(null),[openMoveId,setOpenMoveId]=useState(null),[openMoreId,setOpenMoreId]=useState(null),[renameTarget,setRenameTarget]=useState(null),[shareRecord,setShareRecord]=useState(null),[folderMoveTargetId,setFolderMoveTargetId]=useState(null);
 const recordsRef=useRef(null);
 const space=spaces.find(x=>x.id===spaceId);
 const visibleSpaces=withoutRetiredDefaultSpace(spaces);
 function patch(value){onSpaces(spaces.map(x=>x.id===space.id?{...x,...value}:x));}
 function open(type){setName('');setGoal('');setFolderMoveTargetId(null);setRenameTarget(null);setDialog(type);}
 function closeDialog(){setDialog(null);setFolderMoveTargetId(null);}
 function beginNewFolder(recordId=null){setOpenMoveId(null);setName('');setFolderMoveTargetId(recordId);setDialog('folder');}
 function create(e){e.preventDefault();if(!name.trim())return;if(dialog==='space'){const id=crypto.randomUUID();onSpaces([...spaces,{id,name:name.trim(),goal:goal.trim(),members:[{name:'周浩',role:'管理员'}],capabilityIds:[],folders:[],files:[]}]);closeDialog();onNavigate('/workspace/research-space/'+id);}else if(dialog==='folder'){const newFolder={id:crypto.randomUUID(),name:name.trim()};onSpaces(current=>current.map(item=>{if(item.id!==space.id)return item;const next={...item,folders:[...item.folders,newFolder]};return folderMoveTargetId?assignRecordFolder(next,folderMoveTargetId,newFolder.id):next;}));if(folderMoveTargetId)onToast?.('已移动到「'+newFolder.name+'」');closeDialog();setPage(1);}}
 async function copySpaceInviteLink(){
  const inviteLink=new URL(sitePath('/workspace/research-space/'+space.id)+'?invite=1',window.location.href).href;
  try{
   if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(inviteLink);
   else throw new Error('Clipboard API unavailable');
   onToast?.('邀请链接已复制');
  }catch{
   const input=document.createElement('textarea');
   input.value=inviteLink;
   input.setAttribute('readonly','');
   input.style.position='fixed';
   input.style.opacity='0';
   document.body.appendChild(input);
   input.select();
   const copied=document.execCommand('copy');
   input.remove();
   onToast?.(copied?'邀请链接已复制':'邀请链接已生成，请手动复制');
  }
 }
 useEffect(()=>{
  if(!openMoveId&&!openMoreId)return;
  function closeOnOutside(event){
   if(openMoveId&&!event.target.closest('.workRecordMove'))setOpenMoveId(null);
   if(openMoreId&&!event.target.closest('.workRecordMore'))setOpenMoreId(null);
  }
  function closeOnEscape(event){if(event.key==='Escape'){setOpenMoveId(null);setOpenMoreId(null);}}
  document.addEventListener('pointerdown',closeOnOutside);
  document.addEventListener('keydown',closeOnEscape);
  return ()=>{
   document.removeEventListener('pointerdown',closeOnOutside);
   document.removeEventListener('keydown',closeOnEscape);
  };
 },[openMoveId,openMoreId]);
 if(!spaceId){return <div className="view ds-space-page">
  <div className="ds-space-heading"><div><h1>我的科研空间</h1><p>{visibleSpaces.length} 个科研空间 · 集中管理科研任务、共享能力与研究成果</p></div></div>
  <div className="ds-space-grid">
   <button type="button" className="ds-space-entry ds-file-library-entry" onClick={()=>onNavigate('/workspace/my-files')}>
    <span className="ds-space-entry-icon" aria-hidden="true"><FileLibraryMark/></span>
    <h2>我的文件库</h2>
    <p>集中查看科研交付文件和本地文件。</p>
    <span><FileText size={16}/>{fileCount} 个文件<ArrowRight size={16}/></span>
   </button>
   {visibleSpaces.map(item=><button type="button" className="ds-space-entry" key={item.id} onClick={()=>{setFolder('all');onNavigate('/workspace/research-space/'+item.id);}}><span className="ds-space-entry-icon" aria-hidden="true"><SpaceFolderMark/></span><h2>{item.name}</h2><p>{item.goal||'科研任务、共享成果与团队协作'}</p><span><Users size={16}/>{item.members.length} 位成员 · {(item.files?.length||0)+(item.folders?.length||0)} 个任务<ArrowRight size={16}/></span></button>)}
   <button type="button" className="ds-space-create-entry" onClick={()=>open('space')}><span className="ds-space-create-icon"><Plus size={24}/></span><strong>创建科研空间</strong></button>
  </div>
  {dialog==='space'&&<Modal title="新建科研空间" onClose={()=>setDialog(null)}><form className="ds-space-dialog-form" onSubmit={create}><label className="sp-field"><span>空间名称</span><input autoFocus required value={name} onChange={e=>setName(e.target.value)} placeholder="例如：临床队列研究"/></label><label className="sp-field"><span>研究目标</span><input value={goal} onChange={e=>setGoal(e.target.value)} placeholder="例如：制作风险预测模型"/></label><div className="sp-dialog-actions"><Button onClick={()=>setDialog(null)}>取消</Button><button type="submit" className="sp-button sp-button-primary"><Plus size={16}/>创建空间</button></div></form></Modal>}
 </div>;}
 if(!space)return <div className="view ds-page-empty"><h1>未找到此科研空间</h1><Button onClick={()=>onNavigate('/workspace/research-space')}>返回空间列表</Button></div>;
 const demoConversations=space.id===ORIGINAL_SPACE_ID?DEMO_SPACE_CONVERSATIONS.map(demoConversationSession):[];
 const spaceSessions=[...sessions.filter(x=>x.space===space.id&&!DEMO_SPACE_CONVERSATIONS.some(demo=>demo.id===x.id)),...demoConversations];
 const members=space.members;
 const demoTeam=space.id===ORIGINAL_SPACE_ID && members.length===1 && members[0].name==='周浩';
 const demoMembers=demoTeam?DEMO_MEMBERS.filter(member=>!space.removedDemoMemberInitials?.includes(member.initial)):[];
 const displayedMembers=[...members,...demoMembers];
 const canRemoveMembers=members.some(member=>member.name==='周浩' && member.role==='管理员');
 function removeMember(member){
  onSpaces(current=>current.map(item=>{
   if(item.id!==space.id)return item;
   if(DEMO_MEMBERS.includes(member)){
    const removed=item.removedDemoMemberInitials??[];
    return removed.includes(member.initial)?item:{...item,removedDemoMemberInitials:[...removed,member.initial]};
   }
   return {...item,members:item.members.filter(candidate=>candidate!==member)};
  }));
  onToast('已移除 '+member.name);
 }
 function changePage(next){
  setPage(next);
  requestAnimationFrame(()=>recordsRef.current?.scrollIntoView({block:'start',behavior:'smooth'}));
 }
 function moveRecord(recordId,folderId,folderName){
  onSpaces(current=>current.map(item=>item.id===space.id?assignRecordFolder(item,recordId,folderId):item));
  setOpenMoveId(null);
  setPage(1);
  onToast?.(folderId?'已移动到「'+folderName+'」':'已移出项目分组');
 }
 function beginRename(record){
  setOpenMoreId(null);
  setRenameTarget(record);
  setName(record.name);
  setDialog('rename');
 }
 function renameRecord(event){
  event.preventDefault();
  if(!renameTarget||!name.trim())return;
  patch({recordNames:{...(space.recordNames||{}),[renameTarget.id]:name.trim()}});
  setDialog(null);
  setRenameTarget(null);
  onToast?.(`已重命名为「${name.trim()}」`);
 }
 function deleteRecord(record){
  patch({hiddenRecordIds:[...(space.hiddenRecordIds||[]),record.id]});
  setOpenMoreId(null);
  onToast?.(`已删除「${record.name}」`);
 }
 const files=[...space.files,...spaceSessions.flatMap(session=>(session.files||[]).map(file=>({...file,folderId:session.origin?.folderId,sessionId:session.id,date:file.date||session.updatedAt||session.createdAt})))];
 function downloadRecord(file){
  if(!file.content){onToast?.('本地样板未收录该文件正文，暂不能下载');return;}
  file.type==='DOCX'?downloadWord(file.name,file.content):downloadText(file.name,file.content);
 }
 const records=[
  ...spaceSessions.map(session=>({id:session.id,kind:'对话',session,name:session.title||session.name,folderId:session.origin?.folderId,summary:session.messages?.find(m=>m.role==='user')?.text,author:session.author||'周浩',date:session.updatedAt||session.createdAt||session.date,select:()=>session.messages?setPreview(session):onNavigate('/workspace/chats/'+session.id),open:session.messages?()=>setPreview(session):()=>onNavigate('/workspace/chats/'+session.id)})),
  ...files.map(file=>({id:file.id,kind:'文件',file,type:file.type,name:file.name,folderId:file.folderId,summary:file.source||'对话生成的任务说明',date:file.date,author:file.author||(file.sessionId?'周浩':null),select:()=>setPreview(file)}))
 ].map(record=>{
  const renamed=space.recordNames?.[record.id];
  if(!renamed)return record;
  if(record.kind==='文件'){
   const file={...record.file,name:renamed};
   return {...record,name:renamed,file,select:()=>setPreview(file)};
  }
  if(record.session?.messages){
   const session={...record.session,title:renamed};
   return {...record,name:renamed,select:()=>setPreview(session),open:()=>setPreview(session)};
  }
  return {...record,name:renamed};
 }).filter(record=>!space.hiddenRecordIds?.includes(record.id)).sort((a,b)=>(Date.parse(b.date)||Number(b.date)||0)-(Date.parse(a.date)||Number(a.date)||0));
 const recordFolderId=record=>space.recordFolders?.[record.id]||record.folderId;
 const scoped=records.filter(r=>folder==='all'||recordFolderId(r)===folder);
 const visible=scoped.filter(r=>filter==='全部'||filter===r.kind);
 const pageCount=Math.max(1,Math.ceil(visible.length/RECORDS_PER_PAGE));
 const currentPage=Math.min(page,pageCount);
 const pagedRecords=visible.slice((currentPage-1)*RECORDS_PER_PAGE,currentPage*RECORDS_PER_PAGE);
 const capabilities=space.capabilityIds.map(capabilityById).filter(Boolean);
 function submitRecord(event){
  event.preventDefault();
  const data=new FormData(event.currentTarget),folderId=data.get('folder')||undefined;
  if(dialog==='chat'){
   const text=String(data.get('topic')||'').trim();
   if(text)onStart({space:space.id,text,origin:{folderId}});
  }else{
   const additions=data.getAll('files').filter(f=>f.name).map(f=>({id:crypto.randomUUID(),name:f.name,type:f.name.split('.').pop().toUpperCase(),source:'本地附件名称',folderId,author:'周浩',date:Date.now()}));
   if(!additions.length)return;
   patch({files:[...space.files,...additions]});setFilter('文件');setPage(1);onToast('已保存本地文件名称');
  }
  setDialog(null);
 }
 return <article className="view ds-space-page integratedSpace">
  <aside className="workGroups" aria-label="项目分组"><header><h2>项目分组</h2><IconButton label="新建项目分组" onClick={()=>open('folder')}><Plus size={16}/></IconButton></header>
  {[{id:'all',name:'全部项目'},...space.folders].map(g=><button key={g.id} aria-pressed={folder===g.id} onClick={()=>{setFolder(g.id);setPage(1);}}>{g.id==='all'?<Layers size={16}/>:<Folder size={16}/>}<span>{g.name}</span><small>{g.id==='all'?records.length:records.filter(r=>recordFolderId(r)===g.id).length}</small></button>)}</aside>
  <div className="workSpaceBody"><section className="workSpaceOverview">
   <div className="workSpaceIdentity">
    <div className="workSpaceIdentityCopy">
     <header>
      <h1>{space.name}</h1>
      <div className="workSpaceMeta">
       <span className="workSpaceMetaItem"><Target size={16} aria-hidden="true"/><span>研究目标</span><strong>{space.goal||'科研任务、共享成果与团队协作'}</strong></span>
       <span className="workSpaceMetaItem"><Layers size={16} aria-hidden="true"/><span>常用科研能力</span><strong>{capabilities.length} 项</strong></span>
      </div>
     </header>
     <div className="workSpaceMemberAvatars" aria-label={`${displayedMembers.length} 位成员`}>{displayedMembers.map((member,index)=><MemberAvatar key={member.name+index} member={member} tone={index}/>)}<span className="workMemberOverflowBadge" title={`共 ${displayedMembers.length} 位成员`} aria-label={`共 ${displayedMembers.length} 位成员`}>{displayedMembers.length}+</span></div>
    </div>
    <div className="workSpaceIdentityAside">
     <span className="workSpaceFolder" aria-hidden="true"><SpaceFolderMark/></span>
    </div>
   </div>
   <nav aria-label="常用可用能力">{capabilities.map(item=><button className={'ds-home-shortcut is-'+item.kind} key={item.id} title={item.description} onClick={()=>onNavigate(capabilityPath(item)+'?space='+encodeURIComponent(space.id)+(folder==='all'?'':'&folder='+encodeURIComponent(folder)))}>{item.kind==='skill'?<SkillGlyph size={16}/>:<AgentGlyph size={16}/>}<strong>{item.name}</strong></button>)}{!capabilities.length&&<button type="button" className="ds-home-shortcut is-empty-capability" onClick={()=>open('capability')}><Plus size={16} aria-hidden="true"/><strong>添加常用科研能力</strong></button>}</nav>
   <div className="workSpaceActions">
    <div className="workSpaceUtilityActions">
     <Button variant="ghost" className="workSpaceMemberManage" onClick={()=>open('manage')}><Users size={16}/>空间成员管理</Button>
     <Button variant="ghost" className="workSpaceMemberManage" onClick={()=>open('capability')}><Bot size={16}/>科研能力管理</Button>
    </div>
    <div><Button aria-disabled="true" tabIndex={-1}><Upload size={16} aria-hidden="true"/>上传文件</Button><Button variant="primary" aria-disabled="true" tabIndex={-1}><Plus size={16} aria-hidden="true"/>创建新任务</Button></div>
   </div>
  </section>
  <div className="workLibraryBar"><nav className="sp-filter-chips" aria-label="项目内容筛选">{['全部','文件','对话'].map(t=><button key={t} className={'sp-filter'+(filter===t?' is-active':'')} aria-pressed={filter===t} onClick={()=>{setFilter(t);setPage(1);}}>{t} <small>{scoped.filter(r=>t==='全部'||r.kind===t).length}</small></button>)}</nav></div>
  <div className="workRecords" ref={recordsRef}>{pagedRecords.map(r=>{
   const currentFolderId=recordFolderId(r);
   const folderName=space.folders.find(f=>f.id===currentFolderId)?.name||'空间';
   const fileFormat=r.kind==='文件'?(r.type||r.name.split('.').at(-1)).toUpperCase():'对话';
   const contributor=r.author||'贡献者未记录';
   return <article className={'workRecordCard'+(openMoveId===r.id||openMoreId===r.id?' has-open-menu':'')} key={r.kind+r.id}>
    <button type="button" className="workRecordMain" onClick={r.open||r.select}>
     {r.kind==='文件'?<DeliveryFileIcon type={r.type} name={r.name}/>:<span className="workRecordConversationIcon" aria-hidden="true"><MessageSquare size={21}/></span>}
     <span className="workRecordCopy"><strong title={r.name}>{r.name}</strong><small><span className="workRecordUpdated">{r.date?'最新更新 '+formatDateTime(r.date):'更新时间未记录'}</span><span className="workRecordDot">·</span><span className="workRecordFormat">{fileFormat}</span><span className="workRecordDot">·</span><span className="workRecordFolder">{folderName}</span></small></span>
    </button>
    <div className="workRecordMeta">
     <span className="workRecordContributor" title={'更新于：'+(r.date?formatDateTime(r.date):'未记录')+'；贡献者：'+contributor} aria-label={'更新于：'+(r.date?formatDateTime(r.date):'未记录')+'；贡献者：'+contributor}>
      <span>{r.author==='周浩'?<img src={sitePath("/design-preview/account-avatar.jpg")} alt=""/>:<UserRound size={17}/>}</span><span className="workRecordContributorName">{contributor}</span>
     </span>
    </div>
    <div className="workRecordActions">
     <div className="workRecordMove">
      <button type="button" className="workRecordMoveButton" aria-label={'移动 '+r.name} title="移动到项目分组" aria-haspopup="menu" aria-expanded={openMoveId===r.id} onClick={()=>{setOpenMoreId(null);setOpenMoveId(openMoveId===r.id?null:r.id);}}><FolderInput size={18}/></button>
      {openMoveId===r.id&&<div className="workRecordMoveMenu" role="menu" aria-label={'移动 '+r.name+' 到项目分组'}>
       <p className="sp-space-directory-caption">移动到项目分组</p>
       <div className="sp-space-directory-list">
        <button type="button" className="sp-space-directory-option" role="menuitemradio" aria-checked={!currentFolderId} onClick={()=>moveRecord(r.id,null,'空间')}>
         <Layers size={15} aria-hidden="true"/><span>空间（未分组）</span>{!currentFolderId&&<Check className="sp-space-check" size={15} aria-hidden="true"/>}
        </button>
        {space.folders.map(item=><button type="button" className="sp-space-directory-option" role="menuitemradio" aria-checked={currentFolderId===item.id} key={item.id} onClick={()=>moveRecord(r.id,item.id,item.name)}>
         <Folder size={15} aria-hidden="true"/><span>{item.name}</span>{currentFolderId===item.id&&<Check className="sp-space-check" size={15} aria-hidden="true"/>}
        </button>)}
       </div>
       <div className="sp-space-directory-divider" role="separator" aria-hidden="true"/>
       <button type="button" className="sp-space-directory-option is-new" role="menuitem" onClick={()=>beginNewFolder(r.id)}><Plus size={15} aria-hidden="true"/><span>新建项目分组</span></button>
      </div>}
     </div>
     <div className="workRecordMore">
      <button type="button" className="workRecordMoreButton" aria-label={'更多操作 '+r.name} title="更多操作" aria-haspopup="menu" aria-expanded={openMoreId===r.id} onClick={()=>{setOpenMoveId(null);setOpenMoreId(openMoreId===r.id?null:r.id);}}><MoreHorizontal size={18}/></button>
      {openMoreId===r.id&&<div className="workRecordMoreMenu" role="menu" aria-label={'更多操作 '+r.name}>
       {r.kind==='文件'
         ? <button type="button" role="menuitem" onClick={()=>{setOpenMoreId(null);downloadRecord(r.file);}}><Download size={15} aria-hidden="true"/><span>下载</span></button>
         : <button type="button" role="menuitem" onClick={()=>{setOpenMoreId(null);r.open?.();}}><ArrowUpRight size={15} aria-hidden="true"/><span>查看对话</span></button>}
       <button type="button" role="menuitem" onClick={()=>beginRename(r)}><Pencil size={15} aria-hidden="true"/><span>重命名</span></button>
       <button type="button" role="menuitem" onClick={()=>{setOpenMoreId(null);setShareRecord(r);}}><Share2 size={15} aria-hidden="true"/><span>分享</span></button>
       <button type="button" className="is-danger" role="menuitem" onClick={()=>deleteRecord(r)}><Trash2 size={15} aria-hidden="true"/><span>删除</span></button>
      </div>}
     </div>
    </div>
   </article>;
  })}</div>
  {!visible.length
   ? <EmptyState className="workRecordsEmpty" icon={SpaceEmptyIllustration} description="可在空间上传文件，或者发起任务对话。">暂无内容</EmptyState>
   : <Pagination page={currentPage} total={pageCount} onChange={changePage} label="科研空间记录分页"/>}
 </div>
 {(dialog==='chat'||dialog==='file')&&<Modal title={dialog==='chat'?'发起对话':'添加文件'} onClose={()=>setDialog(null)}><form onSubmit={submitRecord}>
  <label className="sp-field"><span>归属项目</span><select name="folder" defaultValue={folder==='all'?'':folder}><option value="">空间（未分组）</option>{space.folders.map(f=><option key={f.id} value={f.id}>{f.name}</option>)}</select></label>
  {dialog==='chat'?<label className="sp-field"><span>对话主题</span><input name="topic" required autoFocus placeholder="输入研究问题"/></label>:<label className="sp-field"><span>本地文件</span><input type="file" required name="files" multiple/></label>}
  <div className="sp-dialog-actions"><Button onClick={()=>setDialog(null)}>取消</Button><button className="sp-button sp-button-primary" type="submit">{dialog==='chat'?'开始对话':'添加文件'}</button></div></form></Modal>}
 {dialog==='manage'&&<SpaceMemberSettings members={displayedMembers} onRemove={canRemoveMembers?removeMember:undefined} onCopyInvite={copySpaceInviteLink} onClose={()=>setDialog(null)}/>}
 {dialog==='rename'&&renameTarget&&<Modal title="重命名" onClose={()=>{setDialog(null);setRenameTarget(null);}}><form onSubmit={renameRecord}><label className="sp-field"><span>记录名称</span><input autoFocus required value={name} onChange={e=>setName(e.target.value)}/></label><div className="sp-dialog-actions"><Button onClick={()=>{setDialog(null);setRenameTarget(null);}}>取消</Button><button type="submit" className="sp-button sp-button-primary">保存</button></div></form></Modal>}
 {shareRecord&&<Modal title="分享" onClose={()=>setShareRecord(null)}><div className="ds-prose"><p>分享「{shareRecord.name}」</p><p>本地预览不会创建公开链接。真实产品中可生成仅空间成员可访问的分享入口。</p></div><div className="sp-dialog-actions"><Button onClick={()=>setShareRecord(null)}>完成</Button></div></Modal>}
 {(dialog==='folder'||dialog==='capability')&&<Modal title={{folder:'新建项目分组',capability:'管理科研能力'}[dialog]} wide={dialog==='capability'} onClose={closeDialog}>{dialog==='capability'?<CapabilityChoices selected={space.capabilityIds} onToggle={id=>patch({capabilityIds:space.capabilityIds.includes(id)?space.capabilityIds.filter(x=>x!==id):[...space.capabilityIds,id]})}/>:<form onSubmit={create}><label className="sp-field"><span>分组名称</span><input autoFocus required value={name} onChange={e=>setName(e.target.value)} placeholder="例如：文献调研"/></label><p className="ds-muted">项目分组用于归集相关对话和文件。{folderMoveTargetId?' 创建后将自动移动当前记录。':''}</p><div className="sp-dialog-actions"><Button onClick={closeDialog}>取消</Button><button type="submit" className="sp-button sp-button-primary">创建分组</button></div></form>}</Modal>}
 {preview&&<Modal title={preview.name||preview.title} wide onClose={()=>setPreview(null)}>{preview.messages?<div className="ds-prose">{preview.summary&&<p>{preview.summary}</p>}{preview.messages.map((message,index)=><p key={index}><b>{message.role==='user'?'提问':'回复'}：</b>{message.text}</p>)}<p className="ds-muted">本地模拟对话，未调用科研模型。</p></div>:preview.content?<><pre className="sp-file-preview">{preview.content}</pre><Button onClick={()=>preview.type==='DOCX'?downloadWord(preview.name,preview.content):downloadText(preview.name,preview.content)}>下载文件</Button>{preview.sessionId&&<Button onClick={()=>{setPreview(null);onNavigate('/workspace/chats/'+preview.sessionId);}}>查看来源对话</Button>}</>:<div className="ds-prose"><p>{preview.source==='原克隆成果记录'?'这是原克隆空间保留的成果记录。当前未取得文件正文，因此仅展示文件元数据。':preview.source==='历史交付文件记录'?'已保存历史交付记录。原始文件未收录于本地样板。':'已在本机保留附件名称；未读取或上传文件正文。'}</p><p>文件名称：{preview.name}</p>{preview.date&&<p>来源记录时间：{preview.date}</p>}</div>}</Modal>}</article>;
}
import { CAPABILITIES } from '../content/catalog.js';
function MemberAvatar({member,tone,decorative=false}){
 return <span className="workAvatar" data-tone={(member.tone??tone)%4} title={decorative?undefined:member.name+' · '+member.role} aria-hidden={decorative||undefined}>
  {member.avatar||member.name==='周浩'?<img src={sitePath(member.avatar||"/design-preview/account-avatar.jpg")} alt={decorative?'':member.name}/>:member.initial||member.name.slice(-1)}
 </span>;
}
function FileLibraryMark(){
 return <svg className="workSpaceFolderMark" viewBox="7 2.5 61.5 61.5" fill="none" aria-hidden="true">
  <defs>
   <linearGradient id="libraryPaper" x1="20" y1="7" x2="50" y2="64" gradientUnits="userSpaceOnUse">
    <stop stopColor="#FFFFFF"/><stop offset=".62" stopColor="#FBFCFD"/><stop offset="1" stopColor="#F1F4F7"/>
   </linearGradient>
   <linearGradient id="libraryEdge" x1="38" y1="5" x2="38" y2="64" gradientUnits="userSpaceOnUse">
    <stop stopColor="#C9D0D8"/><stop offset="1" stopColor="#E1E5EA"/>
   </linearGradient>
   <linearGradient id="libraryBlue" x1="49" y1="43" x2="66" y2="61" gradientUnits="userSpaceOnUse">
    <stop stopColor="#BCD1F8"/><stop offset=".52" stopColor="#91B1EE"/><stop offset="1" stopColor="#698EDC"/>
   </linearGradient>
   <filter id="libraryShadow" x="2" y="1" width="72" height="68" filterUnits="userSpaceOnUse">
    <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#43504B" floodOpacity=".08"/>
   </filter>
  </defs>
  <g filter="url(#libraryShadow)">
   <path d="M26 12h12c2.2 0 4 1.8 4 4v19H22V16c0-2.2 1.8-4 4-4Z" fill="#F8FAFC" stroke="#C7D0DA" strokeWidth="1.25"/>
   <path d="M35 12h9c2.2 0 4 1.8 4 4v19H35V12Z" fill="#EEF3FA" stroke="#BEC9D7" strokeWidth="1.25"/>
   <rect x="9" y="27" width="58" height="37" rx="8" fill="url(#libraryPaper)" stroke="url(#libraryEdge)" strokeWidth="1.25"/>
   <path d="M10 36.5h56" stroke="#D8DEE5" strokeWidth="1.1"/>
   <path d="M10 37.5h56" stroke="#FFFFFF" strokeOpacity=".82" strokeWidth=".7"/>
   <rect x="17" y="42" width="16" height="4" rx="2" fill="#DCE3EB"/>
   <path d="M17 51h25M17 56h19" stroke="#D3DAE3" strokeWidth="1.8" strokeLinecap="round"/>
   <path d="M28 34v-5M46 34v-9" stroke="#AAB6C5" strokeWidth="1.6" strokeLinecap="round"/>
   <rect x=".8" y="1.1" width="13.4" height="18.2" rx="2.6" transform="translate(53 41)" fill="#5D7DBB" opacity=".14"/>
   <rect x=".2" y=".15" width="13.6" height="18" rx="2.4" transform="translate(53 41)" fill="url(#libraryBlue)"/>
   <path d="M1.15 3.85h11.7M1.15 5.15h11.7M3.45 6.85h6.95" transform="translate(53 41)" stroke="#F7FAFF" strokeWidth=".9" strokeLinecap="round" strokeOpacity=".92"/>
  </g>
 </svg>;
}
function SpaceFolderMark(){
 return <svg className="workSpaceFolderMark" viewBox="7 2.5 61.5 61.5" fill="none" aria-hidden="true">
  <defs>
   <linearGradient id="spaceFolderPaper" x1="28" y1="4" x2="49" y2="65" gradientUnits="userSpaceOnUse">
    <stop stopColor="#FFFFFF"/>
    <stop offset=".58" stopColor="#FCFDFC"/>
    <stop offset="1" stopColor="#F4F6F4"/>
   </linearGradient>
   <linearGradient id="spaceFolderEdge" x1="38" y1="3.5" x2="38" y2="64" gradientUnits="userSpaceOnUse">
    <stop stopColor="#CCD2CF"/>
    <stop offset=".48" stopColor="#D7DCD9"/>
    <stop offset="1" stopColor="#E2E5E2"/>
   </linearGradient>
   <linearGradient id="spaceFolderPurple" x1="59" y1="43" x2="67" y2="62" gradientUnits="userSpaceOnUse">
    <stop stopColor="#C9B2F4"/>
    <stop offset=".52" stopColor="#AB8DE9"/>
    <stop offset="1" stopColor="#8E6ED8"/>
   </linearGradient>
   <radialGradient id="spaceFolderLight" cx="0" cy="0" r="1" gradientTransform="translate(38 8) rotate(90) scale(58 45)" gradientUnits="userSpaceOnUse">
    <stop stopColor="#FFFFFF" stopOpacity=".95"/>
    <stop offset=".72" stopColor="#FFFFFF" stopOpacity="0"/>
   </radialGradient>
   <linearGradient id="spaceFolderShade" x1="38" y1="34" x2="38" y2="65" gradientUnits="userSpaceOnUse">
    <stop stopColor="#CAD2CE" stopOpacity="0"/>
    <stop offset="1" stopColor="#CAD2CE" stopOpacity=".18"/>
   </linearGradient>
   <pattern id="spaceFolderGrain" width="7" height="7" patternUnits="userSpaceOnUse">
    <circle cx="1.3" cy="1.2" r=".32" fill="#87928D" opacity=".14"/>
    <circle cx="5.5" cy="4.9" r=".24" fill="#FFFFFF" opacity=".8"/>
   </pattern>
   <clipPath id="spaceFolderClip">
    <path d="M7.5 15C7.5 8.72 12.59 3.5 18.87 3.5h19.05c3.24 0 6.34 1.33 8.59 3.69l4.34 4.56a11.42 11.42 0 0 0 8.38 3.72h2.64c3.59 0 6.5 2.91 6.5 6.5V51c0 6.28-5.09 11.5-11.37 11.5H18.87C12.59 62.5 7.5 57.28 7.5 51V15Z"/>
   </clipPath>
   <filter id="spaceFolderShadow" x="2" y="1" width="72" height="68" filterUnits="userSpaceOnUse">
    <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#43504B" floodOpacity=".075"/>
   </filter>
  </defs>
  <g filter="url(#spaceFolderShadow)">
   <path d="M7.5 15C7.5 8.72 12.59 3.5 18.87 3.5h19.05c3.24 0 6.34 1.33 8.59 3.69l4.34 4.56a11.42 11.42 0 0 0 8.38 3.72h2.64c3.59 0 6.5 2.91 6.5 6.5V51c0 6.28-5.09 11.5-11.37 11.5H18.87C12.59 62.5 7.5 57.28 7.5 51V15Z" fill="url(#spaceFolderPaper)" stroke="url(#spaceFolderEdge)" strokeWidth="1.2"/>
   <g clipPath="url(#spaceFolderClip)">
    <rect x="8" y="4" width="60" height="59" fill="url(#spaceFolderLight)"/>
    <rect x="8" y="4" width="60" height="59" fill="url(#spaceFolderGrain)" opacity=".62"/>
    <rect x="8" y="36" width="60" height="27" fill="url(#spaceFolderShade)"/>
    <path d="M10.5 24.25h55" stroke="#DDE2DF" strokeWidth="1.05" strokeLinecap="round"/>
    <path d="M10.5 25.25h55" stroke="#FFFFFF" strokeOpacity=".7" strokeWidth=".65" strokeLinecap="round"/>
    <text x="11.5" y="56.5" fill="#D6DBD8" fillOpacity=".54" fontFamily="PingFang SC, Noto Sans CJK SC, system-ui, sans-serif" fontSize="13" fontWeight="600" letterSpacing=".2" textLength="41" lengthAdjust="spacingAndGlyphs">KGcure</text>
   </g>
   <g transform="translate(54 42)">
    <rect x=".8" y="1.1" width="13.4" height="18.2" rx="2.6" fill="#8870B8" opacity=".13"/>
    <rect x=".2" y=".15" width="13.6" height="18" rx="2.4" fill="url(#spaceFolderPurple)"/>
    <path d="M1.15 3.85h11.7" stroke="#FBF8FF" strokeOpacity=".95" strokeWidth="1.05" strokeLinecap="round"/>
    <path d="M1.15 5.15h11.7" stroke="#7156B6" strokeOpacity=".34" strokeWidth=".55"/>
    <path d="M3.45 6.85h6.95" stroke="#F5EEFF" strokeOpacity=".95" strokeWidth=".8" strokeLinecap="round"/>
    <path d="M1 4.2v11.35" stroke="#FFFFFF" strokeOpacity=".22" strokeWidth=".7"/>
   </g>
  </g>
 </svg>;
}
function SpaceMemberSettings({members,onRemove,onCopyInvite,onClose}){
 return <Modal title="空间成员管理" onClose={onClose}>
  <p className="ds-prose">成员可查看空间共享内容。未归属科研空间的任务不自动共享；本地预览没有授予任何线上权限。</p>
  <ul className="workChoices workMemberChoices" aria-label="空间成员">
   {members.map((member,index)=><li key={member.id??member.name}>
    <MemberAvatar member={member} tone={index} decorative/>
    <span><strong>{member.name}</strong><small>{member.role}</small></span>
    {onRemove&&member.role!=='管理员'&&<button type="button" className="workRemoveAction" aria-label={'移除 '+member.name} onClick={event=>{
     const row=event.currentTarget.closest('li');
     const nextAction=row.nextElementSibling?.querySelector('button')
      ||row.previousElementSibling?.querySelector('button')
      ||row.closest('[role="dialog"]')?.querySelector('.sp-modal-header button');
     nextAction?.focus();
     onRemove(member);
    }}><MinusCircle size={16} aria-hidden="true"/>移除</button>}
   </li>)}
  </ul>
  <div className="workMemberInvite">
   <Button variant="primary" className="workMemberInviteButton" onClick={onCopyInvite}><Link2 size={16} aria-hidden="true"/>复制链接邀请好友加入</Button>
  </div>
 </Modal>;
}
function formatDateTime(value){
 if(!value)return '';
 if(typeof value==='string'&&/^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/.test(value)){
  const [year,month,day]=value.split(/[/-]/);
  return `${year}/${month.padStart(2,'0')}/${day.padStart(2,'0')}`;
 }
 const date=new Date(value);
 if(Number.isNaN(date.getTime()))return String(value);
 return new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(date).replaceAll('-','/');
}
function CapabilityChoices({selected,onToggle}){
 const [query,setQuery]=useState('');
 const [kind,setKind]=useState('skill');
 const search=query.trim();
 const options=CAPABILITIES.filter(item=>item.kind===kind&&(item.name+item.category).includes(search))
  .sort((a,b)=>Number(selected.includes(b.id))-Number(selected.includes(a.id)));
 return <>
  <div className="workCapabilityFilters">
   <div className="sp-filter-chips" role="group" aria-label="科研能力类型">
    <button type="button" className={'sp-filter'+(kind==='skill'?' is-active':'')} aria-pressed={kind==='skill'} aria-controls="space-capability-choices" onClick={()=>setKind('skill')}>科研 Skill</button>
    <button type="button" className={'sp-filter'+(kind==='agent'?' is-active':'')} aria-pressed={kind==='agent'} aria-controls="space-capability-choices" onClick={()=>setKind('agent')}>科研 Agent</button>
   </div>
   <label className="sp-search-field"><Search size={16} aria-hidden="true"/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="搜索能力名称" aria-label="搜索可添加能力"/></label>
  </div>
  <div id="space-capability-choices" className="workChoices" key={kind}>{options.map(item=>{
   const added=selected.includes(item.id);
   return <div key={item.id}><span className="workChoiceIcon">{item.kind==='skill'?<SkillGlyph size={20}/>:<AgentGlyph size={20}/>}</span><span><strong>{item.name}</strong><small>{item.description}</small></span>
    <button className={added?'workRemoveAction':undefined} aria-label={(added?'移除':'添加')+item.name} aria-pressed={added} onClick={()=>onToggle(item.id)}>{added?<MinusCircle size={16}/>:<Plus size={16}/>} {added?'移除':'添加'}</button></div>
  })}{!options.length&&<p>没有匹配的科研能力</p>}</div>
 </>;
}
