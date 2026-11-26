import { Pencil, Pin, Settings, Share2, Download, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { WorkspaceNavigation, WorkspaceFloatingTools } from './WorkspaceNavigation.jsx';
import { BillingInviteDialog } from "../pages/BillingUsage.jsx";
import { Button, Modal, cx } from '../design-preview/components.jsx';
import { spaceOwnerId } from './space-access.js';
const SCENES={evidence:'/workspace/evidence-search',topic:'/workspace/topic-selection',grant:'/workspace/grant-application',drawing:'/workspace/scientific-drawing'};
const SPACES=[{id:'db79430b945744a4aa9b3676d21f5fba',name:'神经发育障碍'}];
export function BusinessFrame({path,account,approvalCount,accountTier,accountQuotaRemaining,collapsed,mobileOpen,onCollapsed,onMobileOpen,onNavigate,onSearch,onNotice,sessions,spaces=SPACES,onSessionAction,onSpaceAction,children}) {
 const [dialog,setDialog]=useState(null);
 const [historyMenu,setHistoryMenu]=useState(null),[historyDialog,setHistoryDialog]=useState(null),[historyTitle,setHistoryTitle]=useState('');
 const [spaceMenu,setSpaceMenu]=useState(null),[spaceDialog,setSpaceDialog]=useState(null);
 const historyRef=useRef(null),spaceRef=useRef(null);
 useEffect(()=>{
  function pointer(event){
   if(!historyRef.current?.contains(event.target)&&!event.target.closest('.sp-history-more'))setHistoryMenu(null);
   if(!spaceRef.current?.contains(event.target)&&!event.target.closest('.sp-space-more'))setSpaceMenu(null);
  }
  function key(event){if(event.key==='Escape'){setHistoryMenu(null);setHistoryDialog(null);setSpaceMenu(null);setSpaceDialog(null);}}
  document.addEventListener('pointerdown',pointer);document.addEventListener('keydown',key);
  return()=>{document.removeEventListener('pointerdown',pointer);document.removeEventListener('keydown',key);};
 },[]);
 function historyAction(type){const item=historyMenu.item;setHistoryMenu(null);if(type==='export'){onSessionAction?.('export',item);return;}setHistoryTitle(item.title);setHistoryDialog({type,item});}
 function openHistory(item,trigger){if(historyMenu?.item.id===item.id){setHistoryMenu(null);return;}const r=trigger.getBoundingClientRect();setHistoryMenu({item,x:Math.max(8,Math.min(innerWidth-206,r.right-190)),y:Math.max(8,Math.min(innerHeight-194,r.bottom+4))});}
 function openSpaceMenu(item,trigger){
  if(spaceMenu?.item.id===item.id){setSpaceMenu(null);return;}
  const r=trigger.getBoundingClientRect();
  setHistoryMenu(null);
  setSpaceMenu({item,x:Math.max(8,Math.min(innerWidth-206,r.right-190)),y:Math.max(8,Math.min(innerHeight-174,r.bottom+4))});
 }
 function spaceAction(type){
  const item=spaceMenu?.item;
  if(!item)return;
  setSpaceMenu(null);
  if(type!=='delete'){onSpaceAction?.(type,item);return;}
  setSpaceDialog({type,item});
 }
 const newTask=()=>onNavigate('/workspace/chats/new');
 useEffect(()=>{function keys(e){if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='j'){e.preventDefault();newTask();}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();onSearch();}}document.addEventListener('keydown',keys);return()=>document.removeEventListener('keydown',keys);},[onNavigate,onSearch]);
 const isChat=path.startsWith('/workspace/chats/')&&path!=='/workspace/chats/new';
 return <div className={cx('sp-design-app business-workspace',collapsed&&'sp-nav-collapsed',mobileOpen&&'sp-mobile-open',isChat&&'ds-is-chat')}>
  {mobileOpen&&<button type="button" className="sp-nav-scrim" aria-label="关闭导航遮罩" onClick={()=>onMobileOpen(false)}/>}
  <WorkspaceNavigation account={account} approvalCount={approvalCount} accountTier={accountTier} accountQuotaRemaining={accountQuotaRemaining} collapsed={collapsed} mobileOpen={mobileOpen} onCollapse={()=>{onCollapsed(true);onMobileOpen(false);}} onNewTask={newTask} onScene={scene=>onNavigate(SCENES[scene])} onCapabilities={kind=>onNavigate('/workspace/'+(kind==='skill'?'skills':'agents'))} activeScene={Object.keys(SCENES).find(k=>SCENES[k]===path)} activeCapability={path.startsWith('/workspace/skills')?'skill':path.startsWith('/workspace/agents')?'agent':null} filesActive={path==='/workspace/my-files'} spaces={spaces} sessions={sessions} currentId={isChat?path.split('/').pop():null} onFiles={()=>onNavigate('/workspace/my-files')} onAllSpaces={()=>onNavigate('/workspace/research-space')} onSpace={item=>onNavigate('/workspace/research-space/'+item.id)} onNewSpace={()=>onNavigate('/workspace/research-space')} spaceMenuId={spaceMenu?.item.id} onSpaceMenu={openSpaceMenu} historyMenuId={historyMenu?.item.id} onHistoryMenu={openHistory} onOpenSession={item=>onNavigate('/workspace/chats/'+item.id)} onSearch={onSearch} onNavigate={onNavigate} onAccountAction={setDialog} onNotice={onNotice}/>
  <main className="main ds-business-main"><div className="ds-floating-tools"><WorkspaceFloatingTools onNewTask={newTask} onSearch={onSearch} onExpand={()=>{onCollapsed(false);onMobileOpen(true);}}/></div>{children}</main>
  {historyMenu&&<div className="sp-history-menu" ref={historyRef} role="menu" aria-label="历史对话操作" style={{left:historyMenu.x,top:historyMenu.y}}><button type="button" role="menuitem" onClick={()=>historyAction('rename')}><Pencil size={14}/>重命名</button><button type="button" role="menuitem" onClick={()=>historyAction('share')}><Share2 size={14}/>分享</button><button type="button" role="menuitem" onClick={()=>historyAction('export')}><Download size={14}/>导出 Markdown</button><hr/><button type="button" role="menuitem" className="sp-danger-text" onClick={()=>historyAction('hide')}><Trash2 size={14}/>移除</button></div>}
  {spaceMenu&&<div className="sp-history-menu" ref={spaceRef} role="menu" aria-label="科研空间操作" style={{left:spaceMenu.x,top:spaceMenu.y}}>
   <button type="button" role="menuitem" onClick={()=>spaceAction('pin')}><Pin size={14}/>{spaceMenu.item.pinned?'取消置顶':'置顶'}</button>
   {spaceOwnerId(spaceMenu.item)===account?.id&&<>
    <button type="button" role="menuitem" onClick={()=>spaceAction('settings')}><Settings size={14}/>科研空间设置</button>
    <hr/><button type="button" role="menuitem" className="sp-danger-text" onClick={()=>spaceAction('delete')}><Trash2 size={14}/>删除</button>
   </>}
  </div>}
  {historyDialog&&<Modal title={historyDialog.type==='rename'?'重命名对话':historyDialog.type==='share'?'分享对话':'移除'} onClose={()=>setHistoryDialog(null)}>
   {historyDialog.type==='rename'?<form onSubmit={event=>{event.preventDefault();if(!historyTitle.trim())return;onSessionAction?.('rename',historyDialog.item,historyTitle.trim());setHistoryDialog(null);}}><label className="sp-field"><span>对话名称</span><input autoFocus required aria-label="对话名称" value={historyTitle} onChange={event=>setHistoryTitle(event.target.value)}/></label><div className="sp-dialog-actions"><Button onClick={()=>setHistoryDialog(null)}>取消</Button><button type="submit" className="sp-button sp-button-primary">保存</button></div></form>:historyDialog.type==='share'?<><p className="ds-prose">本地预览未启用公开分享。你可以导出对话记录，检查并自行分享。</p><Button onClick={()=>onSessionAction?.('export',historyDialog.item)}>导出对话记录</Button></>:<><p className="ds-prose">从本地导航与搜索中隐藏此条目，保留会话数据与直接访问地址。</p><div className="sp-dialog-actions"><Button onClick={()=>setHistoryDialog(null)}>取消</Button><Button variant="danger" onClick={()=>{onSessionAction?.('hide',historyDialog.item);setHistoryDialog(null);}}>移除</Button></div></>}
  </Modal>}
  {spaceDialog&&<Modal title="删除科研空间" onClose={()=>setSpaceDialog(null)}>
   <p className="ds-prose">删除后，空间内文件仍可在「我的文件库」中查看，历史对话和文件不会丢失。</p>
   <div className="sp-dialog-actions"><Button onClick={()=>setSpaceDialog(null)}>放弃</Button><Button variant="danger" onClick={()=>{onSpaceAction?.('delete',spaceDialog.item);setSpaceDialog(null);}}>确认删除</Button></div>
  </Modal>}
    {dialog==='invite'&&<BillingInviteDialog onClose={()=>setDialog(null)}/>}
{dialog==='logout'&&<Modal title={dialog==='logout'?'退出登录':'邀请好友'} onClose={()=>setDialog(null)}><p className="sp-dialog-copy">{dialog==='logout'?'退出当前本地演示，返回欢迎页。':'邀请好友体验 KGcure 学术科研工作台。邀请链接将在接入账户服务后提供。'}</p><div className="sp-dialog-actions"><Button onClick={()=>setDialog(null)}>{dialog==='logout'?'取消':'知道了'}</Button>{dialog==='logout'&&<Button variant="danger" onClick={()=>{setDialog(null);onNavigate('/welcome');}}>退出登录</Button>}</div></Modal>}
 </div>;
}
