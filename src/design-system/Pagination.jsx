import './pagination.css';

export function Pagination({page,total,onChange,label='列表分页'}) {
 if(total<=1)return null;
 const selected=new Set([1,total,page-1,page,page+1]);
 if(page<=3)[1,2,3].forEach(n=>selected.add(n));
 if(page>=total-2)[total-2,total-1,total].forEach(n=>selected.add(n));
 const numbers=[...selected].filter(n=>n>=1&&n<=total).sort((a,b)=>a-b);
 const entries=[];
 numbers.forEach((n,i)=>{if(i&&n-numbers[i-1]>1)entries.push('gap-'+n);entries.push(n);});
 return <nav className="ds-pagination" aria-label={label}>
  <button type="button" className="ds-page-direction" disabled={page===1} onClick={()=>onChange(page-1)}>上一页</button>
  {entries.map(n=>typeof n==='string'?<span className="ds-page-gap" aria-hidden="true" key={n}>…</span>:<button type="button" key={n} className={page>3&&page<total-2&&n!==1&&n!==total&&n!==page?'ds-page-neighbour':undefined} aria-label={'第 '+n+' 页'} aria-current={n===page?'page':undefined} onClick={()=>onChange(n)}>{n}</button>)}
  <button type="button" className="ds-page-direction" disabled={page===total} onClick={()=>onChange(page+1)}>下一页</button>
 </nav>;
}
