import { sitePath } from "../site-path.js";
import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, ChevronRight, ClipboardCheck, Coins, CreditCard, Crown, Gift, Heart, Languages, LogOut, User } from 'lucide-react';
import './account-control.css';
import { QuotaProgress } from '../design-system/QuotaProgress.jsx';
import { SAMPLE_QUOTA_REMAINING, SAMPLE_RESET } from '../pages/billing-usage-data.js';
import { LanguageOptions, useLanguagePreference } from '../design-system/LanguageOptions.jsx';

const TIERS = { free:'免费', basic:'基础', plus:'Plus', pro:'PRO' };
export function MembershipBadge({tier='free'}) {
 return <span className={'sp-membership-badge sp-membership-'+tier}>{TIERS[tier] || TIERS.free}</span>;
}
const GROUPS = [
 [{label:'账单与用量',icon:CreditCard,target:'/workspace/membership'},{label:'积分充值',icon:Coins,target:'/workspace/recharge'}],
 [{label:'个人资料',icon:User,target:'/workspace/profile'},{label:'我的收藏',icon:Heart,target:'/workspace/my-favorites'},{label:'我的审批',icon:ClipboardCheck,target:'/workspace/approvals'},{label:'邀请好友',icon:Gift,target:'invite'}]
];
export function AccountControl({nickname='周浩',tier='free',quotaRemaining=SAMPLE_QUOTA_REMAINING,onNavigate,onAction,onNotice,visible=true}) {
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
 function choose(target) {
  close();
  if (!target.startsWith('/')) { onAction?.(target); return; }
  const billingTarget = target.startsWith('/workspace/membership') || target === '/workspace/recharge';
  onNavigate?.(quotaRemaining === null && billingTarget ? target + '?preview=free' : target);
 }
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
   <button type="button" role="menuitem" className="sp-account-quota" onClick={()=>choose('/workspace/membership')}>
    <span className="sp-account-quota-heading"><span>周额度剩余</span><strong>{quotaRemaining === null ? '未开通' : `${quotaRemaining}%`}</strong></span>
    {quotaRemaining !== null && <>
     <QuotaProgress remaining={quotaRemaining} className="sp-account-quota-track" />
     <span className="sp-account-quota-reset"><time dateTime={SAMPLE_RESET.dateTime}>{SAMPLE_RESET.date}</time>重置</span>
    </>}
   </button>
   {GROUPS.map((group,i)=><div className="sp-account-menu-group" role="group" key={i}>{group.map(({label,icon:Icon,target})=><button key={label} role="menuitem" type="button" className={target === 'invite' ? 'sp-account-menu-item sp-account-invite' : 'sp-account-menu-item'} onClick={()=>choose(target)}><Icon size={18}/><span>{label}</span></button>)}</div>)}
   <div className="sp-account-menu-group" role="group"><button data-language-trigger type="button" role="menuitem" className="sp-account-menu-item" aria-haspopup="menu" aria-expanded={languageOpen} onClick={e=>{const rect=e.currentTarget.getBoundingClientRect();setLanguagePosition({left:window.innerWidth>=660?Math.min(rect.right+16,window.innerWidth-224):Math.max(16,Math.min(rect.left,window.innerWidth-224)),top:Math.max(12,Math.min(rect.top,window.innerHeight-130))});setLanguageOpen(v=>!v);requestAnimationFrame(()=>wrapper.current?.querySelector('[role=menuitemradio][aria-checked=true]')?.focus());}}><Languages size={18}/><span>Language</span><ChevronRight size={14}/></button></div>
   <div className="sp-account-menu-group" role="group"><button role="menuitem" type="button" className="sp-account-menu-item is-danger" onClick={()=>choose('logout')}><LogOut size={18}/><span>退出登录</span></button></div>
  </div>}
  {open&&languageOpen&&<LanguageOptions className="sp-account-languages" style={languagePosition} language={language} onClose={()=>{setLanguageOpen(false);panel.current?.querySelector('[data-language-trigger]')?.focus();}} onSelect={item=>{setLanguage(item);setLanguageOpen(false);onNotice?.('已选择 '+item+'（语言选项预览）');requestAnimationFrame(()=>panel.current?.querySelector('[data-language-trigger]')?.focus());}}/>}
 </div>;
}
