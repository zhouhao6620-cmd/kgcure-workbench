import { sitePath } from "../site-path.js";
import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, ChevronRight, ClipboardCheck, Coins, CreditCard, Crown, Gift, Languages, LogOut, User } from 'lucide-react';
import './account-control.css';
import { LanguageOptions, useLanguagePreference } from '../design-system/LanguageOptions.jsx';

const TIERS = { free:'免费', basic:'基础', plus:'Plus', pro:'PRO' };
export function MembershipBadge({tier='free'}) {
 return <span className={'sp-membership-badge sp-membership-'+tier}>{TIERS[tier] || TIERS.free}</span>;
}
const GROUPS = [
 [{label:'会员与账单',icon:CreditCard,target:'/workspace/membership'},{label:'积分充值',icon:Coins,target:'/workspace/recharge'}],
 [{label:'个人资料',icon:User,target:'/workspace/profile'},{label:'我的审批',icon:ClipboardCheck,target:'/workspace/approvals'},{label:'邀请好友',icon:Gift,target:'invite'}]
];
export function AccountControl({nickname='周浩',tier='free',onNavigate,onAction,onNotice,visible=true}) {
 const [open,setOpen]=useState(false),[languageOpen,setLanguageOpen]=useState(false),[languagePosition,setLanguagePosition]=useState({});
 const [language,setLanguage]=useLanguagePreference();
 const wrapper=useRef(null),trigger=useRef(null),panel=useRef(null),id=useId();
 useEffect(()=>{if(!visible){setOpen(false);setLanguageOpen(false);}},[visible]);
 useEffect(()=>{
  if(!open)return;
  const outside=e=>{if(!wrapper.current?.contains(e.target)){setOpen(false);setLanguageOpen(false);}};
  document.addEventListener('pointerdown',outside);
  return()=>document.removeEventListener('pointerdown',outside);
 },[open]);
 function close(focus=false){setOpen(false);setLanguageOpen(false);if(focus)trigger.current?.focus();}
 function show(){setOpen(true);requestAnimationFrame(()=>panel.current?.querySelector('[role=menuitem]')?.focus());}
 function choose(target){close();if(target.startsWith('/'))onNavigate?.(target);else onAction?.(target);}
 function keys(e){
  if(e.key==='Escape'){e.preventDefault();e.stopPropagation();if(languageOpen){setLanguageOpen(false);panel.current?.querySelector('[data-language-trigger]')?.focus();}else close(true);return;}
  const items=[...panel.current.querySelectorAll('[role=menuitem],[role=menuitemradio]')];const index=items.indexOf(document.activeElement);
  if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){
   e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?items.length-1:(index+(e.key==='ArrowDown'?1:-1)+items.length)%items.length;items[next]?.focus();
  }
 }
 return <div className="sp-account-control" ref={wrapper} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))close();}}>
  <button ref={trigger} type="button" className="sp-account sp-account-trigger" aria-label={'账户菜单：'+nickname} aria-haspopup="menu" aria-expanded={open} aria-controls={open?id:undefined} onClick={()=>open?close():show()} onKeyDown={e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();show();}}}>
   <span className="sp-avatar sp-photo-avatar"><img src={sitePath("/design-preview/account-avatar.jpg")} alt=""/></span><strong className="sp-account-nickname">{nickname}</strong><MembershipBadge tier={tier}/><ChevronDown size={14}/>
  </button>
  {open&&<div className="sp-account-popover" role="menu" aria-label="账户菜单" id={id} ref={panel} onKeyDown={keys}>
   <button type="button" role="menuitem" className="sp-membership-upgrade" onClick={()=>choose('/workspace/membership-plans')}><Crown size={20}/><span>购买会员</span><ChevronRight size={16}/></button>
   <div className="sp-account-quota" aria-label="周额度用量 39%，预览样例"><div><span>周额度用量</span><span>39%</span></div><div role="progressbar" aria-label="周额度用量" aria-valuemin={0} aria-valuemax={100} aria-valuenow={39}><span style={{width:'39%'}}/></div></div>
   {GROUPS.map((group,i)=><div className="sp-account-menu-group" role="group" key={i}>{group.map(({label,icon:Icon,target})=><button key={label} role="menuitem" type="button" className="sp-account-menu-item" onClick={()=>choose(target)}><Icon size={18}/><span>{label}</span></button>)}</div>)}
   <div className="sp-account-menu-group" role="group"><button data-language-trigger type="button" role="menuitem" className="sp-account-menu-item" aria-haspopup="menu" aria-expanded={languageOpen} onClick={e=>{const rect=e.currentTarget.getBoundingClientRect();setLanguagePosition({left:window.innerWidth>=660?Math.min(rect.right+16,window.innerWidth-224):Math.max(16,Math.min(rect.left,window.innerWidth-224)),top:Math.max(12,Math.min(rect.top,window.innerHeight-130))});setLanguageOpen(v=>!v);requestAnimationFrame(()=>wrapper.current?.querySelector('[role=menuitemradio][aria-checked=true]')?.focus());}}><Languages size={18}/><span>Language</span><ChevronRight size={14}/></button></div>
   <div className="sp-account-menu-group" role="group"><button role="menuitem" type="button" className="sp-account-menu-item is-danger" onClick={()=>choose('logout')}><LogOut size={18}/><span>退出登录</span></button></div>
  </div>}
  {open&&languageOpen&&<LanguageOptions className="sp-account-languages" style={languagePosition} language={language} onClose={()=>{setLanguageOpen(false);panel.current?.querySelector('[data-language-trigger]')?.focus();}} onSelect={item=>{setLanguage(item);setLanguageOpen(false);onNotice?.('已选择 '+item+'（语言选项预览）');requestAnimationFrame(()=>panel.current?.querySelector('[data-language-trigger]')?.focus());}}/>}
 </div>;
}
