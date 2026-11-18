import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import './language.css';

export function useLanguagePreference(){
 const read=()=>{try{return localStorage.getItem('kgcure-language')==='English'?'English':'简体中文';}catch{return '简体中文';}};
 const [language,setValue]=useState(read);
 useEffect(()=>{const sync=()=>setValue(read());window.addEventListener('kgcure-language-change',sync);window.addEventListener('storage',sync);return()=>{window.removeEventListener('kgcure-language-change',sync);window.removeEventListener('storage',sync);};},[]);
 function setLanguage(value){setValue(value);try{localStorage.setItem('kgcure-language',value);}catch{}window.dispatchEvent(new Event('kgcure-language-change'));}
 return [language,setLanguage];
}
export function LanguageOptions({language,onSelect,onClose,style,className='',menuRef}){
 return <div className={'ds-language-options '+className} role="menu" aria-label="选择语言" style={style} ref={menuRef} onKeyDown={e=>{
  if(e.key==='Escape'){e.preventDefault();e.stopPropagation();onClose?.();}
  if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();e.stopPropagation();const items=[...e.currentTarget.querySelectorAll('button')],i=items.indexOf(document.activeElement);items[e.key==='Home'?0:e.key==='End'?1:(i+1)%items.length]?.focus();}
 }}>
  {['简体中文','English'].map(item=><button key={item} type="button" role="menuitemradio" aria-checked={language===item} onClick={()=>onSelect(item)}><span>{item}</span>{language===item&&<Check size={18}/>}</button>)}
 </div>;
}
