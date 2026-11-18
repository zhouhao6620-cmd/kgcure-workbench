import { useEffect, useMemo, useState } from 'react';
export function useCapabilityFilters(items,storageKey){
 const read=key=>{try{return JSON.parse(sessionStorage.getItem(storageKey)||'{}')[key];}catch{return null;}};
 const [query,setQuery]=useState(()=>storageKey?read('query')||'':''),[category,setCategory]=useState(()=>storageKey?read('category')||'全部':'全部'),[source,setSource]=useState(()=>storageKey?read('source')||'推荐':'推荐');
 useEffect(()=>{if(storageKey)sessionStorage.setItem(storageKey,JSON.stringify({query,category,source}));},[storageKey,query,category,source]);
 const list=useMemo(()=>items.filter(item=>(category==='全部'||(item.group || item.category)===category)&&(`${item.name} ${item.description}`).toLowerCase().includes(query.trim().toLowerCase())&&(source==='推荐'||(source==='独立测评'?item.verified===true:item.community===true))),[items,category,source,query]);
 function reset(){setQuery('');setCategory('全部');setSource('推荐');}
 return {query,setQuery,category,setCategory,source,setSource,list,reset};
}
export function CapabilityFilters({ categories, category, onCategory, source, onSource, showSources = true, heading, count }) {
 const sources = showSources && <div className="sp-sort" role="group" aria-label="Skill 来源筛选">{['推荐', '独立测评', '开源社区'].map(item => <button type="button" key={item} aria-pressed={source === item} className={source === item ? 'is-active' : ''} onClick={() => onSource(item)}>{item}</button>)}</div>;
 return <>
  {heading && <div className="ds-hub-heading">{heading}{sources}</div>}
  <div className="sp-filter-bar"><div className="sp-filter-chips" role="group" aria-label="能力分类">{categories.map(item => <button type="button" key={item} className={'sp-filter' + (category === item ? ' is-active' : '')} aria-pressed={category === item} onClick={() => onCategory(item)}>{item}</button>)}</div>{heading ? count : sources}</div>
 </>;
}
