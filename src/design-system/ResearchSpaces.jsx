import { sitePath } from "../site-path.js";
import { PageActions } from './SecondaryPageShell.jsx';
import { useState } from 'react';
import { ArrowRight, FileText, Folder, FolderOpen, Layers, MessageSquare, MinusCircle, Plus, Search, Settings2, Upload, UserRound, Users, X } from 'lucide-react';
import { AgentGlyph, Button, IconButton, Modal, SkillGlyph, Tag } from '../design-preview/components.jsx';
import { HighlightedTitle } from './Typography.jsx';
import { capabilityById, capabilityPath, downloadText } from '../content/catalog.js';
import { downloadWord } from '../design-preview/word-file.js';
import './spaces.css';
import './workspace-details.css';
export const ORIGINAL_SPACE_ID='db79430b945744a4aa9b3676d21f5fba';
const DEMO_MEMBERS=['A','B','C'].map((initial,index)=>({name:'成员 '+initial,initial,role:'示例成员',tone:index+1}));
export function initialResearchSpaces(){try{const saved=JSON.parse(localStorage.getItem('kgcure-spaces-v2')||'null');if(Array.isArray(saved))return saved;}catch{}return [{id:ORIGINAL_SPACE_ID,name:'神经发育障碍',goal:'制作风险预测模型',members:[{name:'周浩',role:'管理员'}],capabilityIds:['1042','1028','35a3e188211447888f499c11d0b90345','1031'],folders:[{id:'plan',name:'制定研究方案'}],files:[{id:'original-asd',name:'ASD遗传学选题报告.md',folderId:'plan',type:'MD',source:'原克隆成果记录',date:'2026/09/20'}]}];}
export function ResearchSpaces({spaces,onSpaces,sessions,onNavigate,onStart,spaceId,onToast}){
 const [folder,setFolder]=useState(()=>spaces.find(s=>s.id===spaceId)?.folders.find(f=>f.id===new URLSearchParams(location.search).get('folder'))?.id||'all'),[filter,setFilter]=useState('全部'),[dialog,setDialog]=useState(null),[name,setName]=useState(''),[preview,setPreview]=useState(null);
 const space=spaces.find(x=>x.id===spaceId);
 function patch(value){onSpaces(spaces.map(x=>x.id===space.id?{...x,...value}:x));}
 function open(type){setName('');setDialog(type);}
 function create(e){e.preventDefault();if(!name.trim())return;if(dialog==='space'){const id=crypto.randomUUID();onSpaces([...spaces,{id,name:name.trim(),goal:'',members:[{name:'周浩',role:'管理员'}],capabilityIds:[],folders:[],files:[]}]);setDialog(null);onNavigate('/workspace/research-space/'+id);}else if(dialog==='folder'){patch({folders:[...space.folders,{id:crypto.randomUUID(),name:name.trim()}]});setDialog(null);}else if(dialog==='invite'){onToast('已保留邀请草稿；未发送邀请或授予访问权限');setDialog(null);}}
 if(!spaceId){return <div className="view ds-space-page"><div className="ds-space-heading"><div><h1>我的科研空间</h1><p>{spaces.length} 个空间 · 集中管理科研任务、共享能力与研究成果</p></div></div><PageActions><div className="ds-space-list-actions"><Button onClick={()=>onNavigate('/workspace/my-files')}><FileText size={16}/>我的文件</Button><Button variant="primary" onClick={()=>open('space')}><Plus size={16}/>新建科研空间</Button></div></PageActions><div className="ds-space-grid">{spaces.map(item=><button type="button" className="ds-space-entry" key={item.id} onClick={()=>{setFolder('all');onNavigate('/workspace/research-space/'+item.id);}}><Folder size={28}/><Tag>科研空间</Tag><h2>{item.name}</h2><p>{item.goal||'科研任务、共享成果与团队协作'}</p><span><Users size={14}/>{item.members.length} 位成员 · {item.folders.length} 个任务<ArrowRight size={16}/></span></button>)}</div>{!spaces.length&&<div className="sp-empty-state"><p>暂无科研空间</p></div>}{dialog==='space'&&<Modal title="新建科研空间" onClose={()=>setDialog(null)}><form onSubmit={create}><label className="sp-field"><span>空间名称</span><input autoFocus required value={name} onChange={e=>setName(e.target.value)} placeholder="例如：临床队列研究"/></label><p className="ds-muted">在本机保存空间和任务配置，不创建线上共享空间。</p><div className="sp-dialog-actions"><Button onClick={()=>setDialog(null)}>取消</Button><button type="submit" className="sp-button sp-button-primary">创建空间</button></div></form></Modal>}</div>;}
 if(!space)return <div className="view ds-page-empty"><h1>未找到此科研空间</h1><Button onClick={()=>onNavigate('/workspace/research-space')}>返回空间列表</Button></div>;
 const spaceSessions=sessions.filter(x=>x.space===space.id);
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
 const files=[...space.files,...spaceSessions.flatMap(session=>(session.files||[]).map(file=>({...file,folderId:session.origin?.folderId,sessionId:session.id,date:file.date||session.updatedAt||session.createdAt})))];
 const records=[
  ...spaceSessions.map(session=>({id:session.id,kind:'对话',name:session.title,folderId:session.origin?.folderId,summary:session.messages?.find(m=>m.role==='user')?.text,author:session.author||'周浩',date:session.updatedAt||session.createdAt,select:()=>onNavigate('/workspace/chats/'+session.id)})),
  ...files.map(file=>({id:file.id,kind:'文件',name:file.name,folderId:file.folderId,summary:file.source||'对话生成的任务说明',date:file.date,author:file.author||(file.sessionId?'周浩':null),select:()=>setPreview(file)}))
 ].sort((a,b)=>(Date.parse(b.date)||Number(b.date)||0)-(Date.parse(a.date)||Number(a.date)||0));
 const scoped=records.filter(r=>folder==='all'||r.folderId===folder);
 const visible=scoped.filter(r=>filter==='全部'||filter===r.kind);
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
   patch({files:[...space.files,...additions]});setFilter('文件');onToast('已保存本地文件名称');
  }
  setDialog(null);
 }
 return <article className="view ds-space-page integratedSpace">
  <PageActions><Button small onClick={()=>open('manage')}><Settings2 size={16}/>成员管理</Button></PageActions>
  <aside className="workGroups" aria-label="项目分组"><header><h2>项目分组</h2><IconButton label="新建任务文件夹" onClick={()=>open('folder')}><Plus size={16}/></IconButton></header>
  {[{id:'all',name:'全部项目'},...space.folders].map(g=><button key={g.id} aria-pressed={folder===g.id} onClick={()=>setFolder(g.id)}>{g.id==='all'?<Layers size={16}/>:<Folder size={16}/>}<span>{g.name}</span><small>{g.id==='all'?records.length:records.filter(r=>r.folderId===g.id).length}</small></button>)}</aside>
  <div className="workSpaceBody"><section className="workSpaceOverview">
   <div className="workSpaceIdentity">
    <div>
     <header><h1>{space.name}</h1><p>{space.goal&&<small>研究目标　</small>}{space.goal||'科研任务、共享成果与团队协作'}</p></header>
     <div className="workMembers"><span>{displayedMembers.map((member,index)=><MemberAvatar key={member.name+index} member={member} tone={index}/>)}</span><small>{displayedMembers.length} 位成员{demoMembers.length>0?'（含示例）':''}</small><Button small onClick={()=>open('invite')}><Plus size={14}/>邀请成员</Button></div>
    </div>
    <span className="workSpaceFolder" aria-hidden="true"><Folder strokeWidth={.7}/><Folder strokeWidth={.7}/></span>
   </div>
   <div className="workAbilityLabel"><h2 id="space-capabilities-heading">空间常用科研能力</h2><button onClick={()=>open('capability')}>管理</button></div>
   <nav aria-labelledby="space-capabilities-heading">{capabilities.map(item=><button className={'ds-home-shortcut is-'+item.kind} key={item.id} title={item.description} onClick={()=>onNavigate(capabilityPath(item)+'?space='+encodeURIComponent(space.id)+(folder==='all'?'':'&folder='+encodeURIComponent(folder)))}>{item.kind==='skill'?<SkillGlyph size={16}/>:<AgentGlyph size={16}/>}<strong>{item.name}</strong></button>)}{!capabilities.length&&<button onClick={()=>open('capability')}>添加科研能力</button>}</nav>
  </section>
  <div className="workLibraryBar"><nav aria-label="项目内容筛选">{['全部','文件','对话'].map(t=><button key={t} aria-pressed={filter===t} onClick={()=>setFilter(t)}>{t} <small>{scoped.filter(r=>t==='全部'||r.kind===t).length}</small></button>)}</nav><div className="workLibraryActions"><Button aria-disabled="true" tabIndex={-1}><Upload size={16} aria-hidden="true"/>上传文件</Button><Button variant="primary" aria-disabled="true" tabIndex={-1}><Plus size={16} aria-hidden="true"/>创建新任务</Button></div></div>
  <div className="workRecords">{visible.map(r=><button key={r.kind+r.id} onClick={r.select}><span className="workRecordTop"><i data-kind={r.kind}>{r.kind==='文件'?<FileText size={21}/>:<MessageSquare size={21}/>}</i><span><strong title={r.name}>{r.name}</strong><small title={r.summary}>{r.summary}</small></span></span>
   <span className="workRecordGroup">{space.folders.find(f=>f.id===r.folderId)?.name||'空间'} · {r.kind}</span><span className="workRecordFoot"><span>{r.author==='周浩'?<img src={sitePath("/design-preview/account-avatar.jpg")} alt=""/>:<UserRound size={16}/>} {r.author||'贡献者未记录'}</span><small>{r.date?'更新于 '+formatDate(r.date):'更新时间未记录'}</small></span></button>)}</div>
  {!visible.length&&<div className="sp-empty-state"><FolderOpen size={24}/><h3>当前项目还没有{filter==='全部'?'内容':filter}</h3></div>}
 {space.id===ORIGINAL_SPACE_ID&&<details className="ds-legacy-stages"><summary>原研究阶段参考</summary><p>保留原空间的研究计划作为参考；空间中的任务无需逐阶段推进。</p><ol>{['制定研究方案','明确研究人群与结局指标','数据提取与队列构建','数据清洗与质量控制','候选变量处理与筛选','风险预测模型构建','模型验证与性能评价','模型可视化与临床适用性评估','结果整理与统计分析','论文撰写与投稿'].map(x=><li key={x}>{x}</li>)}</ol></details>}
 </div>
 {(dialog==='chat'||dialog==='file')&&<Modal title={dialog==='chat'?'发起对话':'添加文件'} onClose={()=>setDialog(null)}><form onSubmit={submitRecord}>
  <label className="sp-field"><span>归属项目</span><select name="folder" defaultValue={folder==='all'?'':folder}><option value="">空间（未分组）</option>{space.folders.map(f=><option key={f.id} value={f.id}>{f.name}</option>)}</select></label>
  {dialog==='chat'?<label className="sp-field"><span>对话主题</span><input name="topic" required autoFocus placeholder="输入研究问题"/></label>:<label className="sp-field"><span>本地文件</span><input type="file" required name="files" multiple/></label>}
  <div className="sp-dialog-actions"><Button onClick={()=>setDialog(null)}>取消</Button><button className="sp-button sp-button-primary" type="submit">{dialog==='chat'?'开始对话':'添加文件'}</button></div></form></Modal>}
 {dialog==='manage'&&<SpaceMemberSettings members={displayedMembers} onRemove={canRemoveMembers?removeMember:undefined} onClose={()=>setDialog(null)}/>}
 {(dialog==='invite'||dialog==='folder'||dialog==='capability')&&<Modal title={{invite:'邀请成员',folder:'新建任务文件夹',capability:'管理科研能力'}[dialog]} wide={dialog==='capability'} onClose={()=>setDialog(null)}>{dialog==='capability'?<CapabilityChoices selected={space.capabilityIds} onToggle={id=>patch({capabilityIds:space.capabilityIds.includes(id)?space.capabilityIds.filter(x=>x!==id):[...space.capabilityIds,id]})}/>:<form onSubmit={create}><label className="sp-field"><span>{dialog==='folder'?'任务名称':'邀请对象'}</span><input autoFocus required value={name} onChange={e=>setName(e.target.value)} placeholder={dialog==='folder'?'例如：文献调研':'填写姓名或邮箱，生成本地邀请草稿'}/></label><p className="ds-muted">{dialog==='invite'?'当前仅预览邀请配置，不发送邀请。':'任务文件夹用于归集相关对话和文件。'}</p><div className="sp-dialog-actions"><Button onClick={()=>setDialog(null)}>取消</Button><button type="submit" className="sp-button sp-button-primary">{dialog==='invite'?'保留邀请草稿':'创建文件夹'}</button></div></form>}</Modal>}
 {preview&&<Modal title={preview.name} wide onClose={()=>setPreview(null)}>{preview.content?<><pre className="sp-file-preview">{preview.content}</pre><Button onClick={()=>preview.type==='DOCX'?downloadWord(preview.name,preview.content):downloadText(preview.name,preview.content)}>下载文件</Button>{preview.sessionId&&<Button onClick={()=>{setPreview(null);onNavigate('/workspace/chats/'+preview.sessionId);}}>查看来源对话</Button>}</>:<div className="ds-prose"><p>{preview.source==='原克隆成果记录'?'这是原克隆空间保留的成果记录。当前未取得文件正文，因此仅展示文件元数据。':preview.source==='历史交付文件记录'?'已保存历史交付记录。原始文件未收录于本地样板。':'已在本机保留附件名称；未读取或上传文件正文。'}</p><p>文件名称：{preview.name}</p>{preview.date&&<p>来源记录时间：{preview.date}</p>}</div>}</Modal>}</article>;
}
import { CAPABILITIES } from '../content/catalog.js';
function MemberAvatar({member,tone,decorative=false}){
 return <span className="workAvatar" data-tone={(member.tone??tone)%4} title={decorative?undefined:member.name+' · '+member.role} aria-hidden={decorative||undefined}>
  {member.name==='周浩'?<img src={sitePath("/design-preview/account-avatar.jpg")} alt={decorative?'':member.name}/>:member.initial||member.name.slice(-1)}
 </span>;
}
function SpaceMemberSettings({members,onRemove,onClose}){
 return <Modal title="成员管理" onClose={onClose}>
  <p className="ds-prose">成员可查看空间共享内容。个人会话默认不自动共享；本地预览没有授予任何线上权限。</p>
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
 </Modal>;
}
function formatDate(value){
 const date=new Date(value);
 return Number.isNaN(date.getTime())?String(value):date.toLocaleDateString('zh-CN');
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
   return <div key={item.id}><span className={'workChoiceIcon '+item.kind}>{item.kind==='skill'?<SkillGlyph size={18}/>:<AgentGlyph size={18}/>}</span><span><strong>{item.name}</strong><small>{item.description}</small></span>
    <button className={added?'workRemoveAction':undefined} aria-label={(added?'移除':'添加')+item.name} aria-pressed={added} onClick={()=>onToggle(item.id)}>{added?<MinusCircle size={16}/>:<Plus size={16}/>} {added?'移除':'添加'}</button></div>
  })}{!options.length&&<p>没有匹配的科研能力</p>}</div>
 </>;
}
