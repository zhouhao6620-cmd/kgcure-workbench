import { sitePath } from "../site-path.js";
import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Download, FileText, Folder, FolderInput, FolderOpen, History, Layers, Lock, MessageSquare, MinusCircle, MoreHorizontal, Pencil, Plus, Save, Search, Settings, Share2, Target, Trash2, Upload, UserPlus, Users, X } from 'lucide-react';
import { AgentGlyph, Button, EmptyState, IconButton, Modal, RecordEmptyIllustration, SkillGlyph, SpaceEmptyIllustration, Tag } from '../design-preview/components.jsx';
import { DeliveryFileIcon, RecordContributor } from '../design-preview/ConversationPatterns.jsx';
import { HighlightedTitle } from './Typography.jsx';
import { capabilityById, capabilityPath, downloadText, hasPreviewDetail } from '../content/catalog.js';
import { downloadWord } from '../design-preview/word-file.js';
import { Pagination } from './Pagination.jsx';
import { AttachmentFileList, AttachmentSourceMenu } from './ComposerAttachmentPicker.jsx';
import { addSpaceLog, DEFAULT_PROJECT_FOLDER, downloadRequestFor, ORIGINAL_SPACE_ID, researchRecordFolderId, spaceMemberPreview, spaceOwnerId, spaceOwnerPreview } from './space-access.js';
import './spaces.css';
import './workspace-details.css';
const RECORDS_PER_PAGE=10;
function assignRecordFolder(space,recordId,folderId){
 return {
  ...space,
  recordFolders:{...space.recordFolders,[recordId]:folderId},
  files:(space.files||[]).map(file=>file.id===recordId?{...file,folderId}:file),
 };
}
const DEMO_MEMBERS=[
 {...spaceMemberPreview,initial:'J',role:'示例成员'},
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
   folders:[...(space.folders||[]),...DEMO_SPACE_FOLDERS.filter(demo=>!space.deletedFolderIds?.includes(demo.id)&&!space.folders?.some(folder=>folder.id===demo.id))],
   recordFolders,
   files:[...savedFiles,...DEMO_SPACE_FILES.filter(demo=>!savedFiles.some(file=>file.id===demo.id))],
  };
 })());
}
const ORIGINAL_RESTORE_FLAG='kgcure-original-space-restored-v1';
export function rememberOriginalSpaceDeletion(spaceId){
 if(spaceId===ORIGINAL_SPACE_ID)localStorage.setItem(ORIGINAL_RESTORE_FLAG,'1');
}
function defaultOriginalSpace(){
 return {id:ORIGINAL_SPACE_ID,ownerId:spaceOwnerPreview.id,name:'神经发育障碍',goal:'制作风险预测模型',members:[{name:'周浩',role:'管理员'}],capabilityIds:['1042','1028','35a3e188211447888f499c11d0b90345','1031','1003'],folders:[{id:'plan',name:'制定研究方案'}],files:[]};
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
 let spaces = [defaultOriginalSpace()];
 try{const saved=JSON.parse(localStorage.getItem('kgcure-spaces-v2')||'null');if(Array.isArray(saved))spaces=withoutRetiredDefaultSpace(restoreOriginalSpace(saved));}catch{}
 return mergeDemoFiles(spaces).map(space=>{
  const folders=space.folders||[];
  return folders.some(folder=>folder.id===DEFAULT_PROJECT_FOLDER.id) ? space : {...space,folders:[DEFAULT_PROJECT_FOLDER,...folders]};
 });
}

export function researchSpaceFiles(space, sessions) {
 return [
  ...(space.files || []),
  ...sessions.filter(session => session.space === space.id).flatMap(session =>
   (session.files || []).map(file => ({...file, folderId:session.origin?.folderId, sessionId:session.id, date:file.date||session.updatedAt||session.createdAt}))),
 ];
}

export function spaceMembers(space) {
 const legacyDemo = space.id === ORIGINAL_SPACE_ID && space.members.length === 1 && space.members[0].name === spaceOwnerPreview.name;
 const examples = legacyDemo ? DEMO_MEMBERS.filter(member => !space.removedDemoMemberInitials?.includes(member.initial)) : [];
 return [...space.members, ...examples];
}

const SPACE_FILTERS = ['全部', '文件成果', '我上传的', '任务对话', '空间日志'];

export function ResearchSpaces({spaces,onSpaces,sessions,onNavigate,spaceId,onToast,fileCount=0,actor=spaceOwnerPreview,onSettings,requests=[],onRequestDownload,attachmentLibrary=[]}){
 const [selectedFolder,setFolder]=useState(()=>new URLSearchParams(location.search).get('folder')),[filter,setFilter]=useState('全部'),[page,setPage]=useState(1),[dialog,setDialog]=useState(null),[name,setName]=useState(''),[goal,setGoal]=useState(''),[preview,setPreview]=useState(null),[openMoveId,setOpenMoveId]=useState(null),[openMoreId,setOpenMoreId]=useState(null),[renameTarget,setRenameTarget]=useState(null),[shareRecord,setShareRecord]=useState(null),[folderMoveTargetId,setFolderMoveTargetId]=useState(null);
 const [downloadTarget,setDownloadTarget]=useState(null);
 const [folderMenu,setFolderMenu]=useState(null);
 const [folderTarget,setFolderTarget]=useState(null);
 const [uploadOpen,setUploadOpen]=useState(false);
 const recordsRef=useRef(null);
 const folderMenuRef=useRef(null);
 const uploadRef=useRef(null);
 const uploadButton=useRef(null);
 const localInput=useRef(null);
 const space=spaces.find(x=>x.id===spaceId);
 const folder=space?.deletedFolderIds?.includes(selectedFolder) ? DEFAULT_PROJECT_FOLDER.id :
  space?.folders.some(item=>item.id===selectedFolder) ? selectedFolder : 'all';
 const visibleSpaces=withoutRetiredDefaultSpace(spaces);
 function patch(value, action, subject){
  const date=Date.now();
  onSpaces(current=>current.map(item=>{
   if(item.id!==space.id)return item;
   const next={...item,...value};
   return action ? addSpaceLog(next,actor,action,subject,date) : next;
  }));
 }
 function open(type){setName('');setGoal('');setFolderMoveTargetId(null);setRenameTarget(null);setDialog(type);}
 function closeDialog(){setDialog(null);setFolderMoveTargetId(null);setFolderTarget(null);}
 function beginNewFolder(recordId=null){setOpenMoveId(null);setName('');setFolderMoveTargetId(recordId);setDialog('folder');}
 function create(event){
  event.preventDefault();
  const title=name.trim();
  if(!title)return;
  const date=Date.now();
  if(dialog==='space'){
   const id=crypto.randomUUID();
   const created={id,ownerId:actor.id,name:title,goal:goal.trim(),members:[{...actor,role:'管理员'}],capabilityIds:[],folders:[DEFAULT_PROJECT_FOLDER],files:[]};
   onSpaces(current=>[...current,addSpaceLog(created,actor,'创建科研空间',title,date)]);
   closeDialog();
   onNavigate('/workspace/research-space/'+id);
  }else if(dialog==='folder'){
   const newFolder={id:crypto.randomUUID(),name:title};
   onSpaces(current=>current.map(item=>{
    if(item.id!==space.id)return item;
    const next=addSpaceLog({...item,folders:[...item.folders,newFolder]},actor,'新建项目分组',title,date);
    return folderMoveTargetId?assignRecordFolder(next,folderMoveTargetId,newFolder.id):next;
   }));
   if(folderMoveTargetId)onToast?.('已移动到「'+title+'」');
   closeDialog();
   setPage(1);
  }
 }
 useEffect(()=>{
  if(!openMoveId&&!openMoreId&&!folderMenu&&!uploadOpen)return;
  function closeOnOutside(event){
   if(openMoveId&&!event.target.closest('.workRecordMove'))setOpenMoveId(null);
   if(openMoreId&&!event.target.closest('.workRecordMore'))setOpenMoreId(null);
   if(folderMenu&&!folderMenuRef.current?.contains(event.target)&&!event.target.closest('.workGroupMore'))setFolderMenu(null);
   if(uploadOpen&&!uploadRef.current?.contains(event.target))setUploadOpen(false);
  }
  function closeOnEscape(event){
   if(event.key!=='Escape')return;
   setOpenMoveId(null);setOpenMoreId(null);setFolderMenu(null);setUploadOpen(false);
   if(folderMenu)folderMenu.trigger.focus();
   if(uploadOpen)uploadButton.current?.focus();
  }
  const closeFolderMenu=()=>setFolderMenu(null);
  if(folderMenu){
   window.addEventListener('resize',closeFolderMenu);
   window.addEventListener('scroll',closeFolderMenu,true);
  }
  document.addEventListener('pointerdown',closeOnOutside);
  document.addEventListener('keydown',closeOnEscape);
  return ()=>{
   document.removeEventListener('pointerdown',closeOnOutside);
   document.removeEventListener('keydown',closeOnEscape);
   window.removeEventListener('resize',closeFolderMenu);
   window.removeEventListener('scroll',closeFolderMenu,true);
  };
 },[openMoveId,openMoreId,folderMenu,uploadOpen]);
 if(!spaceId){return <div className="view ds-space-page">
  <div className="ds-space-heading"><div><h1>我的科研空间</h1><p>{visibleSpaces.length} 个科研空间 · 集中管理科研任务、共享能力与研究成果</p></div></div>
  <div className="ds-space-grid">
   <button type="button" className="ds-space-entry ds-file-library-entry ds-card-interaction" onClick={()=>onNavigate('/workspace/my-files')}>
    <span className="ds-space-entry-icon" aria-hidden="true"><FileLibraryMark/></span>
    <h2>我的文件库</h2>
    <p>集中查看科研交付文件和本地文件。</p>
    <span><FileText size={16}/>{fileCount} 个文件<ArrowRight className="ds-card-interaction-arrow" size={16}/></span>
   </button>
   {visibleSpaces.map(item=><button type="button" className="ds-space-entry ds-card-interaction" key={item.id} onClick={()=>onNavigate('/workspace/research-space/'+item.id)}><span className="ds-space-entry-icon" aria-hidden="true"><SpaceFolderMark/></span><h2 className="workSpaceTitle"><span>{item.name}</span>{item.isPrivate&&<PrivacyMark/>}</h2><p>{item.goal||'科研任务、共享成果与团队协作'}</p><span><Users size={16}/>{item.members.length} 位成员 · {(item.files?.length||0)+item.folders.filter(folder=>folder.id!==DEFAULT_PROJECT_FOLDER.id).length} 个任务<ArrowRight className="ds-card-interaction-arrow" size={16}/></span></button>)}
   {actor.id===spaceOwnerPreview.id&&<button type="button" className="ds-space-create-entry" onClick={()=>open('space')}><span className="ds-space-create-icon"><Plus size={24}/></span><strong>创建科研空间</strong></button>}
  </div>
  {dialog==='space'&&<Modal title="新建科研空间" onClose={()=>setDialog(null)}><form className="ds-space-dialog-form" onSubmit={create}><label className="sp-field"><span>空间名称</span><input autoFocus required value={name} onChange={e=>setName(e.target.value)} placeholder="例如：临床队列研究"/></label><label className="sp-field"><span>研究目标</span><input value={goal} onChange={e=>setGoal(e.target.value)} placeholder="例如：制作风险预测模型"/></label><div className="sp-dialog-actions"><Button onClick={()=>setDialog(null)}>取消</Button><button type="submit" className="sp-button sp-button-primary"><Plus size={16}/>创建空间</button></div></form></Modal>}
 </div>;}
 if(!space)return <div className="view ds-page-empty"><h1>未找到此科研空间</h1><Button onClick={()=>onNavigate('/workspace/research-space')}>返回空间列表</Button></div>;
 const demoConversations=space.id===ORIGINAL_SPACE_ID?DEMO_SPACE_CONVERSATIONS.map(demoConversationSession):[];
 const spaceSessions=[...sessions.filter(x=>x.space===space.id&&!DEMO_SPACE_CONVERSATIONS.some(demo=>demo.id===x.id)),...demoConversations];
 const displayedMembers=spaceMembers(space);
 const isOwner=actor.id===spaceOwnerId(space);
 const requiresApproval=space.isPrivate && !isOwner;
 const requestFor=file=>downloadRequestFor(requests,space.id,file.id,actor.id);
 function toggleFolderMenu(group,trigger){
  if(folderMenu?.group.id===group.id){setFolderMenu(null);return;}
  const rect=trigger.getBoundingClientRect();
  const maxMenuHeight=92;
  const top=rect.bottom+4+maxMenuHeight<=window.innerHeight ? rect.bottom+4 : rect.top-maxMenuHeight-4;
  setFolderMenu({group,trigger,left:Math.max(8,rect.right-145),top:Math.max(8,top)});
 }
 function beginFolderAction(type){
  const {group,trigger}=folderMenu;
  trigger.focus();
  setFolderMenu(null);
  setFolderTarget(group);
  setName(group.name);
  setDialog(type);
 }
 function renameFolder(event){
  event.preventDefault();
  const title=name.trim();
  if(!isOwner||!title)return;
  const date=Date.now();
  onSpaces(current=>current.map(item=>item.id===space.id&&item.folders.some(group=>group.id===folderTarget.id)
   ? addSpaceLog({...item,folders:item.folders.map(group=>group.id===folderTarget.id?{...group,name:title}:group)},actor,'重命名项目分组',title,date)
   : item));
  closeDialog();
  onToast(`已重命名为「${title}」`);
 }
 function deleteFolder(){
  if(!isOwner||folderTarget.id===DEFAULT_PROJECT_FOLDER.id)return;
  const {id,name}=folderTarget;
  const date=Date.now();
  onSpaces(current=>current.map(item=>{
   if(item.id!==space.id||!item.folders.some(group=>group.id===id))return item;
   const destination=DEFAULT_PROJECT_FOLDER.id;
   return addSpaceLog({
    ...item,
    folders:item.folders.filter(group=>group.id!==id),
    deletedFolderIds:[...(item.deletedFolderIds||[]),id],
    recordFolders:Object.fromEntries(Object.entries(item.recordFolders||{}).map(([recordId,folderId])=>[recordId,folderId===id?destination:folderId])),
    files:(item.files||[]).map(file=>file.folderId===id?{...file,folderId:destination}:file),
   },actor,'删除项目分组',name,date);
  }));
  if(folder===id){setFolder(DEFAULT_PROJECT_FOLDER.id);setFilter('全部');setPage(1);}
  closeDialog();
  onToast('分组已删除，内容已移入默认项目文件夹');
 }
 function changePage(next){
  setPage(next);
  requestAnimationFrame(()=>recordsRef.current?.scrollIntoView({block:'start',behavior:'smooth'}));
 }
 function moveRecord(record,folderId,folderName){
  const date=Date.now();
  onSpaces(current=>current.map(item=>item.id===space.id
   ? addSpaceLog(assignRecordFolder(item,record.id,folderId),actor,folderId?'移入「'+folderName+'」':'移出项目分组',record.name,date)
   : item));
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
  patch({recordNames:{...(space.recordNames||{}),[renameTarget.id]:name.trim()}},'重命名记录',name.trim());
  setDialog(null);
  setRenameTarget(null);
  onToast?.(`已重命名为「${name.trim()}」`);
 }
 function deleteRecord(record){
  patch({hiddenRecordIds:[...(space.hiddenRecordIds||[]),record.id]},'删除记录',record.name);
  setOpenMoreId(null);
  onToast?.(`已删除「${record.name}」`);
 }
 const files=researchSpaceFiles(space, spaceSessions);
 function downloadRecord(file){
  if(requiresApproval && requestFor(file)?.status!=='approved'){
   setPreview(null);
   setDownloadTarget(file);
   return;
  }
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
 const recordFolderId=record=>researchRecordFolderId(space,record.id,record.folderId);
 const scoped=records.filter(r=>folder==='all'||recordFolderId(r)===folder);
 const wasUploaded=record=>record.kind==='文件' && ['upload','本地附件名称'].includes(record.file.originType || record.file.source);
 const byFilter={
  '全部':scoped,
  '文件成果':scoped.filter(record=>record.kind==='文件'&&!wasUploaded(record)),
  '我上传的':scoped.filter(record=>wasUploaded(record)&&(record.file.uploaderId ? record.file.uploaderId===actor.id : record.author===actor.name)),
  '任务对话':scoped.filter(record=>record.kind==='对话'),
  '空间日志':space.logs || [],
 };
 const visible=byFilter[filter];
 const pageCount=Math.max(1,Math.ceil(visible.length/RECORDS_PER_PAGE));
 const currentPage=Math.min(page,pageCount);
 const pagedRecords=visible.slice((currentPage-1)*RECORDS_PER_PAGE,currentPage*RECORDS_PER_PAGE);
 const capabilities=space.capabilityIds.map(capabilityById).filter(Boolean);
 function addFiles(files,source){
  if(!files.length)return;
  const folderId=folder==='all'?DEFAULT_PROJECT_FOLDER.id:folder;
  const date=Date.now();
  const additions=files.map(file=>({
   id:crypto.randomUUID(),name:file.name,type:file.type||(file.name.includes('.')?file.name.split('.').pop().toUpperCase():undefined),
   content:file.content,byteSize:file.size,source,originType:'upload',uploaderId:actor.id,folderId,author:actor.name,date,
  }));
  onSpaces(current=>current.map(item=>item.id===space.id ? addSpaceLog({
   ...item,
   files:[...additions.map(file=>item.folders.some(group=>group.id===folderId)?file:{...file,folderId:DEFAULT_PROJECT_FOLDER.id}),...(item.files||[])],
  },actor,source==='我的文件库'?'从我的文件库添加文件':'添加本地文件记录',files.map(file=>file.name).join('、'),date):item));
  setFilter('我上传的');
  setPage(1);
  closeDialog();
  onToast(source==='我的文件库' ? '已从我的文件库添加到空间' : '已保存本地文件名称');
 }
 return <article className="view ds-space-page integratedSpace">
  <aside className="workGroups" aria-label="项目分组"><header><h2>项目分组</h2><IconButton label="新建项目分组" onClick={()=>open('folder')}><Plus size={16}/></IconButton></header>
  {[{id:'all',name:'全部项目'},...space.folders].map(group=>{
   const isAll=group.id==='all';
   const canManage=isOwner&&!isAll&&group.id!==DEFAULT_PROJECT_FOLDER.id;
   const expanded=folderMenu?.group.id===group.id;
   return <div key={group.id} className={'workGroupRow'+(canManage?' has-menu':'')+(expanded?' is-open':'')}>
    <button type="button" className="workGroupLink" aria-pressed={folder===group.id} onClick={()=>{setFolder(group.id);setPage(1);}}>
     {isAll?<Layers size={16} aria-hidden="true"/>:<Folder size={16} aria-hidden="true"/>}<span>{group.name}</span>
     <small>{isAll?records.length:records.filter(record=>recordFolderId(record)===group.id).length}</small>
    </button>
    {canManage&&<IconButton className="workGroupMore" label={'管理项目分组 '+group.name} aria-haspopup="menu" aria-expanded={expanded} onClick={event=>toggleFolderMenu(group,event.currentTarget)}><MoreHorizontal size={16} aria-hidden="true"/></IconButton>}
   </div>;
  })}</aside>
  <div className="workSpaceBody"><section className="workSpaceOverview">
   <div className="workSpaceIdentity">
    <div className="workSpaceIdentityCopy">
     <header>
      <h1 className="workSpaceTitle"><span>{space.name}</span>{space.isPrivate&&<PrivacyMark/>}</h1>
      <div className="workSpaceMeta">
       <span className="workSpaceMetaItem"><Target size={16} strokeWidth={1.65} aria-hidden="true"/><span>研究目标</span><strong>{space.goal||'科研任务、共享成果与团队协作'}</strong></span>
       <span className="workSpaceMetaItem"><SkillGlyph size={16}/><span>常用科研能力</span><strong>{capabilities.length} 项</strong></span>
      </div>
     </header>
     <div className="workSpaceMemberAvatars" aria-label={`${displayedMembers.length} 位成员`}>{displayedMembers.map((member,index)=><MemberAvatar key={member.name+index} member={member} tone={index}/>)}<span className="workMemberOverflowBadge" title={`共 ${displayedMembers.length} 位成员`} aria-label={`共 ${displayedMembers.length} 位成员`}>{displayedMembers.length}+</span></div>
    </div>
    <div className="workSpaceIdentityAside">
     <span className="workSpaceFolder" aria-hidden="true"><SpaceFolderMark/></span>
    </div>
   </div>
   <nav aria-label="常用可用能力">{capabilities.map(item=><button className={'ds-home-shortcut is-'+item.kind} key={item.id} title={item.description} disabled={!hasPreviewDetail(item)} onClick={()=>onNavigate(capabilityPath(item)+'?space='+encodeURIComponent(space.id)+(folder==='all'?'':'&folder='+encodeURIComponent(folder)))}>{item.kind==='skill'?<SkillGlyph size={16}/>:<AgentGlyph size={16}/>}<strong>{item.name}</strong>{!hasPreviewDetail(item)&&<small>暂无接入</small>}</button>)}{!capabilities.length&&<button type="button" className="ds-home-shortcut is-empty-capability" onClick={()=>open('capability')}><Plus size={16} aria-hidden="true"/><strong>添加常用科研能力</strong></button>}</nav>
   <div className="workSpaceActions">
    <div className="workSpaceUtilityActions">
     {isOwner&&<Button variant="ghost" className="workSpaceMemberManage" onClick={()=>onSettings(space.id)}><Settings size={16} strokeWidth={1.65} aria-hidden="true"/>科研空间设置</Button>}
     <Button variant="ghost" className="workSpaceMemberManage" onClick={()=>open('capability')}><SkillGlyph size={16}/>科研能力管理</Button>
    </div>
    <div>
     <div className="workUploadSource" ref={uploadRef}>
      <Button ref={uploadButton} aria-haspopup="menu" aria-expanded={uploadOpen} onClick={()=>setUploadOpen(!uploadOpen)}><Upload size={16} aria-hidden="true"/>上传文件</Button>
      {uploadOpen&&<AttachmentSourceMenu className="workUploadMenu" includeSpaces={false}
       onLocal={()=>{setUploadOpen(false);uploadButton.current?.focus();localInput.current?.click();}}
       onBrowse={()=>{uploadButton.current?.focus();setUploadOpen(false);setDialog('library');}}/>}
      <input ref={localInput} type="file" hidden multiple aria-label="选择本地文件" onChange={event=>{
       addFiles(Array.from(event.currentTarget.files,file=>({name:file.name,size:file.size})),'本地附件名称');
       event.currentTarget.value='';
      }}/>
     </div>
     <Button variant="primary" aria-disabled="true" tabIndex={-1}><Plus size={16} aria-hidden="true"/>创建新任务</Button>
    </div>
   </div>
  </section>
  <div className="workLibraryBar"><nav className="sp-filter-chips" aria-label="项目内容筛选">{SPACE_FILTERS.map(t=><button key={t} className={'sp-filter'+(filter===t?' is-active':'')} aria-pressed={filter===t} onClick={()=>{setFilter(t);setPage(1);}}>{t}</button>)}</nav></div>
  <div className="workRecords" ref={recordsRef}>{filter==='空间日志' ? pagedRecords.map((log,index)=><article className="workRecordCard workSpaceLog" key={log.date+'-'+index}>
   <span className="workRecordConversationIcon" aria-hidden="true"><History size={20} strokeWidth={1.65}/></span>
   <span className="workRecordCopy"><strong>{log.action}</strong><small>{log.actor}<span className="workRecordDot">·</span>{formatDateTime(log.date)}</small></span>
   <span className="workSpaceLogSubject" title={log.subject}>{log.subject}</span>
  </article>) : pagedRecords.map(r=>{
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
     <RecordContributor name={contributor} avatar={r.author===spaceOwnerPreview.name?spaceOwnerPreview.avatar:undefined}
      description={'更新于：'+(r.date?formatDateTime(r.date):'未记录')+'；贡献者：'+contributor}/>
    </div>
    <div className="workRecordActions">
     <div className="workRecordMove">
      <button type="button" className="workRecordMoveButton" aria-label={'移动 '+r.name} title="移动到项目分组" aria-haspopup="menu" aria-expanded={openMoveId===r.id} onClick={()=>{setOpenMoreId(null);setOpenMoveId(openMoveId===r.id?null:r.id);}}><FolderInput size={18}/></button>
      {openMoveId===r.id&&<div className="workRecordMoveMenu" role="menu" aria-label={'移动 '+r.name+' 到项目分组'}>
       <p className="sp-space-directory-caption">移动到项目分组</p>
       <div className="sp-space-directory-list">
        <button type="button" className="sp-space-directory-option" role="menuitemradio" aria-checked={!currentFolderId} onClick={()=>moveRecord(r,null,'空间')}>
         <Layers size={15} aria-hidden="true"/><span>空间（未分组）</span>{!currentFolderId&&<Check className="sp-space-check" size={15} aria-hidden="true"/>}
        </button>
        {space.folders.map(item=><button type="button" className="sp-space-directory-option" role="menuitemradio" aria-checked={currentFolderId===item.id} key={item.id} onClick={()=>moveRecord(r,item.id,item.name)}>
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
   ? <EmptyState className="workRecordsEmpty" icon={filter==='空间日志'?RecordEmptyIllustration:SpaceEmptyIllustration}
     description={filter==='空间日志'?'空间设置和记录变更后会显示在这里。':filter==='我上传的'?'你上传到当前范围的文件会显示在这里。':'可在空间上传文件，或者发起任务对话。'}>
     {filter==='空间日志'?'暂无空间日志':filter==='我上传的'?'暂无我上传的文件':'暂无内容'}
    </EmptyState>
   : <Pagination page={currentPage} total={pageCount} onChange={changePage} label="科研空间记录分页"/>}
 </div>
 {folderMenu&&<div className="sp-history-menu workGroupMenu" ref={folderMenuRef} role="menu" aria-label={'项目分组操作 '+folderMenu.group.name} style={{left:folderMenu.left,top:folderMenu.top}}>
  <button type="button" role="menuitem" autoFocus onClick={()=>beginFolderAction('rename-folder')}><Pencil size={14} aria-hidden="true"/>重命名</button>
  <button type="button" role="menuitem" className="sp-danger-text" onClick={()=>beginFolderAction('delete-folder')}><Trash2 size={14} aria-hidden="true"/>删除</button>
 </div>}
 {dialog==='rename-folder'&&folderTarget&&<Modal title="重命名项目分组" onClose={closeDialog}>
  <form onSubmit={renameFolder}><label className="sp-field"><span>分组名称</span><input autoFocus required value={name} onChange={event=>setName(event.target.value)}/></label>
   <div className="sp-dialog-actions"><Button onClick={closeDialog}>取消</Button><Button type="submit" variant="primary" disabled={!name.trim()}>保存</Button></div>
  </form>
 </Modal>}
 {dialog==='delete-folder'&&folderTarget&&<Modal title="删除项目分组" onClose={closeDialog}>
  <p className="ds-prose">删除「{folderTarget.name}」后，当前文件夹中的内容不会删除，会移入「默认项目文件夹」。</p>
  <div className="sp-dialog-actions"><Button onClick={closeDialog}>取消</Button><Button variant="danger" onClick={deleteFolder}>确认删除</Button></div>
 </Modal>}
 {dialog==='library'&&<Modal title="从我的文件库添加" onClose={closeDialog} wide placement="search">
  <AttachmentFileList source="library" library={attachmentLibrary} onSelect={({reference})=>{
   const file=attachmentLibrary.find(item=>item.id===reference.fileId);
   if(file)addFiles([file],'我的文件库');
  }}/>
 </Modal>}
 {downloadTarget&&<DownloadRequestDialog file={downloadTarget} request={requestFor(downloadTarget)}
  onClose={()=>setDownloadTarget(null)}
  onView={()=>{setDownloadTarget(null);onNavigate('/workspace/approvals');}}
  onSubmit={()=>{
   if(onRequestDownload(space,downloadTarget))setDownloadTarget(null);
  }}/>}
 {dialog==='rename'&&renameTarget&&<Modal title="重命名" onClose={()=>{setDialog(null);setRenameTarget(null);}}><form onSubmit={renameRecord}><label className="sp-field"><span>记录名称</span><input autoFocus required value={name} onChange={e=>setName(e.target.value)}/></label><div className="sp-dialog-actions"><Button onClick={()=>{setDialog(null);setRenameTarget(null);}}>取消</Button><button type="submit" className="sp-button sp-button-primary">保存</button></div></form></Modal>}
 {shareRecord&&<Modal title="分享" onClose={()=>setShareRecord(null)}><div className="ds-prose"><p>分享「{shareRecord.name}」</p><p>本地预览不会创建公开链接。真实产品中可生成仅空间成员可访问的分享入口。</p></div><div className="sp-dialog-actions"><Button onClick={()=>setShareRecord(null)}>完成</Button></div></Modal>}
 {(dialog==='folder'||dialog==='capability')&&<Modal title={{folder:'新建项目分组',capability:'管理科研能力'}[dialog]} wide={dialog==='capability'} onClose={closeDialog}>{dialog==='capability'?<CapabilityChoices selected={space.capabilityIds} onToggle={id=>patch({capabilityIds:space.capabilityIds.includes(id)?space.capabilityIds.filter(x=>x!==id):[...space.capabilityIds,id]})}/>:<form onSubmit={create}><label className="sp-field"><span>分组名称</span><input autoFocus required value={name} onChange={e=>setName(e.target.value)} placeholder="例如：文献调研"/></label><p className="ds-muted">项目分组用于归集相关对话和文件。{folderMoveTargetId?' 创建后将自动移动当前记录。':''}</p><div className="sp-dialog-actions"><Button onClick={closeDialog}>取消</Button><button type="submit" className="sp-button sp-button-primary">创建分组</button></div></form>}</Modal>}
 {preview&&<Modal title={preview.name||preview.title} wide onClose={()=>setPreview(null)}>{preview.messages?<div className="ds-prose">{preview.summary&&<p>{preview.summary}</p>}{preview.messages.map((message,index)=><p key={index}><b>{message.role==='user'?'提问':'回复'}：</b>{message.text}</p>)}<p className="ds-muted">本地模拟对话，未调用科研模型。</p></div>:preview.content?<><pre className="sp-file-preview">{preview.content}</pre><Button onClick={()=>downloadRecord(preview)}>下载文件</Button>{preview.sessionId&&<Button onClick={()=>{setPreview(null);onNavigate('/workspace/chats/'+preview.sessionId);}}>查看来源对话</Button>}</>:<div className="ds-prose"><p>{preview.source==='原克隆成果记录'?'这是原克隆空间保留的成果记录。当前未取得文件正文，因此仅展示文件元数据。':preview.source==='历史交付文件记录'?'已保存历史交付记录。原始文件未收录于本地样板。':preview.source==='我的文件库'?'此文件来自「我的文件库」，本地预览仅收录文件记录。':'已在本机保留附件名称；未读取或上传文件正文。'}</p><p>文件名称：{preview.name}</p>{preview.date&&<p>来源记录时间：{preview.date}</p>}</div>}</Modal>}</article>;
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
function PrivacyMark(){
 return <span className="workSpacePrivacyMark" role="img" aria-label="私密科研空间" title="私密科研空间">
  <Lock size={18} strokeWidth={1.65} aria-hidden="true"/>
 </span>;
}

function memberKey(member){ return member.id ?? member.name; }

export function DeleteResearchSpaceDialog({space,onClose,onDelete}){
 return <Modal title="删除科研空间" onClose={onClose}>
  <p className="ds-prose">删除「{space.name}」后，文件仍可在「我的文件库」中查看，历史对话仍可在对话列表中查看。</p>
  <div className="sp-dialog-actions"><Button onClick={onClose}>取消</Button><Button variant="danger" onClick={onDelete}>确认删除</Button></div>
 </Modal>;
}

export function ResearchSpaceSettings({space,onSave,onClose,onToast,onDelete}){
 const formId=useId();
 const privacyTitleId=useId();
 const descriptionId=useId();
 const [name,setName]=useState(space.name);
 const [goal,setGoal]=useState(space.goal || '');
 const [isPrivate,setIsPrivate]=useState(Boolean(space.isPrivate));
 const [removed,setRemoved]=useState([]);
 const [confirmDelete,setConfirmDelete]=useState(false);
 const members=spaceMembers(space).filter(member=>!removed.some(entry=>memberKey(entry)===memberKey(member)));
 const owner=space.members.find(member=>member.id===spaceOwnerId(space)) || space.members[0];
 async function copyInvite(){
  const link=new URL(sitePath('/workspace/research-space/'+space.id)+'?invite=1',window.location.href).href;
  try{
   await navigator.clipboard.writeText(link);
   onToast('邀请链接已复制');
  }catch{
   onToast('无法复制邀请链接，请检查剪贴板权限');
  }
 }
 function submit(event){
  event.preventDefault();
  if(!name.trim())return;
  onSave({name:name.trim(),goal:goal.trim(),isPrivate},removed);
 }
 if(confirmDelete)return <DeleteResearchSpaceDialog space={space} onClose={()=>setConfirmDelete(false)} onDelete={onDelete}/>;
 return <Modal title="科研空间设置" className="sp-modal-large-title workSettingsModal" onClose={onClose}
  footer={<div className="workSettingsActions">
   <Button variant="ghost" className="workSettingsDelete" onClick={()=>setConfirmDelete(true)}><Trash2 size={16} strokeWidth={1.65} aria-hidden="true"/>删除空间</Button>
   <div className="workSettingsSaveActions">
    <Button onClick={copyInvite}><UserPlus size={16} strokeWidth={1.65} aria-hidden="true"/>邀请新成员</Button>
    <Button variant="primary" type="submit" form={formId} disabled={!name.trim()}><Save size={16} strokeWidth={1.65} aria-hidden="true"/>保存空间设置</Button>
   </div>
  </div>}>
  <form id={formId} className="workSettingsForm" onSubmit={submit}>
   <label className="sp-field"><span>空间名称</span><input required value={name} onChange={event=>setName(event.target.value)}/></label>
   <label className="sp-field"><span>研究目标</span><textarea rows={2} placeholder="填写研究目标" value={goal} onChange={event=>setGoal(event.target.value)}/></label>
   <div className="workPrivacySetting">
    <div><h3 id={privacyTitleId}>隐私安全设置</h3>
     <p id={descriptionId}>开启开关后，空间成员下载文件，需经过所有者审批</p>
    </div>
    <button type="button" className="workPrivacySwitch" role="switch" aria-labelledby={privacyTitleId} aria-describedby={descriptionId}
     aria-checked={isPrivate} onClick={()=>setIsPrivate(value=>!value)}><span/></button>
   </div>
   <section className="workSettingsMembers" aria-label="空间成员">
    <h3>空间成员 <span>{members.length}</span></h3>
    <ul className="workMemberChoices">
     {members.map((member,index)=><li key={member.id??member.name}>
      <MemberAvatar member={member} tone={index} decorative/>
      <span className="workSettingsMemberName" title={member.name}>{member.name}</span>
      {member===owner&&<span className="workSettingsOwner">所有者</span>}
      {member!==owner&&member.role!=='管理员'&&<IconButton className="workRemoveAction" label={'移除 '+member.name} onClick={event=>{
       const item=event.currentTarget.closest('li');
       const next=item.nextElementSibling?.querySelector('button') || item.previousElementSibling?.querySelector('button');
       (next || item.closest('form').querySelector('input'))?.focus();
       setRemoved(current=>[...current,member]);
      }}><MinusCircle size={16} strokeWidth={1.65} aria-hidden="true"/></IconButton>}
     </li>)}
    </ul>
   </section>
  </form>
 </Modal>;
}

export function applyResearchSpaceSettings(space,actor,settings,removed,date){
 let updated={...space,...settings,members:space.members.filter(member=>!removed.some(entry=>memberKey(entry)===memberKey(member))),
  removedDemoMemberInitials:[...new Set([...(space.removedDemoMemberInitials||[]),...removed.filter(member=>DEMO_MEMBERS.includes(member)).map(member=>member.initial)])]};
 if(space.name!==settings.name || (space.goal||'')!==settings.goal) {
  updated=addSpaceLog(updated,actor,'更新科研空间设置',settings.name,date);
 }
 if(Boolean(space.isPrivate)!==settings.isPrivate) {
  updated=addSpaceLog(updated,actor,settings.isPrivate?'开启私密科研空间':'关闭私密科研空间',settings.name,date);
 }
 return removed.reduce((current,member)=>addSpaceLog(current,actor,'移除成员',member.name,date),updated);
}

function DownloadRequestDialog({file,request,onClose,onSubmit,onView}){
 const pending=request?.status==='pending';
 const approved=request?.status==='approved';
 return <Modal title="申请下载" onClose={onClose}>
  <div className="workDownloadFile"><DeliveryFileIcon type={file.type} name={file.name}/><strong>{file.name}</strong></div>
  <p className="ds-prose">{pending?'申请已提交，正在等待空间所有者审批。':approved?'申请已通过。关闭弹窗后，再次点击下载即可。':'该空间已开启隐私设置。申请通过后，你可直接下载此文件。'}</p>
  {request?.status==='rejected'&&<p className="workDownloadFeedback">上次申请未通过，你可以重新提交。</p>}
  <div className="sp-dialog-actions"><Button onClick={onClose}>{pending||approved?'关闭':'取消'}</Button>
   {pending?<Button variant="primary" onClick={onView}>查看申请</Button>:!approved&&<Button variant="primary" onClick={onSubmit}>提交申请</Button>}
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
   <label className="sp-search-field sp-capability-query"><Search size={16} aria-hidden="true"/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="搜索能力名称" aria-label="搜索可添加能力"/></label>
  </div>
  <div id="space-capability-choices" className="workChoices" key={kind}>{options.map(item=>{
   const added=selected.includes(item.id);
   return <div key={item.id}><span className="workChoiceIcon">{item.kind==='skill'?<SkillGlyph size={20}/>:<AgentGlyph size={20}/>}</span><span><strong>{item.name}</strong><small>{item.description}</small></span>
    <button className={added?'workRemoveAction':undefined} aria-label={(added?'移除':'添加')+item.name} aria-pressed={added} onClick={()=>onToggle(item.id)}>{added?<MinusCircle size={16}/>:<Plus size={16}/>} {added?'移除':'添加'}</button></div>
  })}{!options.length&&<p>没有匹配的科研能力</p>}</div>
 </>;
}
