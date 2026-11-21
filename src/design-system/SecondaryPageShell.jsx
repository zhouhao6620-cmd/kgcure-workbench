import { sitePath } from "../site-path.js";
import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button, IconButton, Modal } from '../design-preview/components.jsx';
import './secondary.css';
import { EVALUATION_PATH } from '../content/review-capabilities.js';
import { capabilityById, capabilityPath } from '../content/catalog.js';

const NavigationContext=createContext(null);
export function PageNavigation({children}){
 const target=useContext(NavigationContext);
 return target ? createPortal(children,target) : null;
}
const ToolbarContext=createContext(undefined);
export function PageActions({children}){
 const target=useContext(ToolbarContext);
 if(target===undefined)return children;
 return target?createPortal(children,target):null;
}
export function secondaryParent(path){
 if(path.startsWith('/workspace/research-space/'))return '/workspace/research-space';
 if(path.startsWith('/workspace/cases/')){const item=capabilityById(path.split('/')[3]);return item?capabilityPath(item):'/workspace/skills';}
 if(path.startsWith('/workspace/skills/'))return '/workspace/skills';
 if(path.startsWith('/workspace/agents/'))return '/workspace/agents';
 if(path.startsWith('/workspace/workflows/template/'))return path.includes('/cases/')?path.split('/cases/')[0]:'/workspace/agents';
 if(path==='/workspace/contribute')return '/workspace/skills';
 if(path==='/workspace/profile/verification')return '/workspace/profile';
 if(path==='/workspace/my-favorites')return '/workspace/profile';
 if(path==='/workspace/membership/checkout')return '/workspace/membership-plans';
 if(path==='/workspace/recharge')return '/workspace/membership?view=points';
 if(path==='/workspace/membership-plans')return '/workspace/membership';
 return '/workspace/chats/new';
}
export function SecondaryPageShell({path,onNavigate,onToast,children,scrollRef,firstLevel=false}){
 const [target,setTarget]=useState(null),[share,setShare]=useState(false),[navTarget,setNavTarget]=useState(null);
 const link=location.origin+sitePath(path)+location.search;
 const context=new URLSearchParams(location.search);
 const fromSpace=context.get('space');
 let parent=path===EVALUATION_PATH
  ? (context.get('mode')==='agent'?'/workspace/agents':'/workspace/skills')
  : secondaryParent(path);
 if(path==='/workspace/contribute'&&context.get('kind')==='agent')parent='/workspace/agents';
 if (context.get('preview') === 'free' && ['/workspace/recharge', '/workspace/membership-plans', '/workspace/membership/checkout'].includes(path)) {
  parent += (parent.includes('?') ? '&' : '?') + 'preview=free';
 }
 if(/^\/workspace\/(skills|agents)\//.test(path)&&fromSpace){
  parent='/workspace/research-space/'+encodeURIComponent(fromSpace);
  if(context.get('folder'))parent+='?folder='+encodeURIComponent(context.get('folder'));
 }else if(/^\/workspace\/(skills|agents)\//.test(path)&&context.get('from')==='favorites'){
  parent='/workspace/my-favorites'+(path.startsWith('/workspace/agents/')?'?kind=agent':'');
 }else if(path.startsWith('/workspace/cases/')&&(fromSpace||context.get('from')==='favorites')){
  parent+=location.search;
 }
 async function copy(){try{await navigator.clipboard.writeText(link);onToast('已复制本地预览链接');}catch{onToast('请选中并复制链接');}}
 return <ToolbarContext.Provider value={target}><NavigationContext.Provider value={navTarget}><section className="ds-secondary-shell">
  <header className="ds-secondary-bar" aria-label="页面操作栏"><button type="button" className="ds-secondary-back" aria-label="返回" onClick={()=>onNavigate(parent)}><ArrowLeft size={18}/><span>返回</span></button><div className="ds-secondary-navigation" ref={setNavTarget}/><div className="ds-secondary-bar-actions">{path!=='/workspace/my-favorites'&&<IconButton label="分享当前页面" onClick={()=>setShare(true)}><Share2 size={18}/></IconButton>}<div className="ds-secondary-context-actions" ref={setTarget}/></div></header>
  <div className={'page-scroll ds-secondary-scroll'+(firstLevel?' ds-first-level ds-store-scroll':'')} ref={scrollRef}>{children}</div>
  {share&&<Modal title="分享页面" onClose={()=>setShare(false)}><p className="ds-prose">复制当前页面的本地预览链接。</p><label className="sp-field"><span>页面链接</span><input readOnly aria-label="页面分享链接" value={link} onFocus={e=>e.target.select()}/></label><p className="ds-muted">链接仅在可访问当前本地服务的环境中有效。</p><div className="sp-dialog-actions"><Button onClick={()=>setShare(false)}>关闭</Button><Button variant="primary" onClick={copy}>复制链接</Button></div></Modal>}
 </section></NavigationContext.Provider></ToolbarContext.Provider>;
}
