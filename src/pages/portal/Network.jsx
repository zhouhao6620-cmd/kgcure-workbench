import { lazy, Suspense, useEffect, useState } from 'react';
import { institutions } from './content.js';
import { sitePath } from '../../site-path.js';

const PeerCards=lazy(()=>import('./PeerCards.jsx'));
const narrow='(max-width:699px)';

export default function Network() {
  const [rowCount,setRowCount]=useState(()=>matchMedia(narrow).matches?2:3);
  useEffect(()=>{
    const width=matchMedia(narrow);
    const updateWidth=()=>setRowCount(width.matches?2:3);
    width.addEventListener('change',updateWidth);
    return ()=>width.removeEventListener('change',updateWidth);
  },[]);
  return <section id="partners" className="portal-section portal-network" aria-labelledby="portal-partners-title"><div className="portal-shell">
    <header className="portal-intro">
      <h2 id="portal-partners-title"><span>众多机构与<span className="portal-partners-emphasis">科研同行</span>，</span><span>都在选择数愈KGcure</span></h2>
      <p>三甲医院、全球药械企业、高校、医疗科技企业</p>
    </header>
    <div className="portal-reel">
      {Array.from({length:rowCount},(_,row)=>{
        const items=institutions.filter((_,index)=>index%rowCount===row);
        return <div key={row} className="portal-logo-lane" tabIndex={0} role="group" aria-label={`第 ${row+1} 行机构标识`}><div className="portal-logo-track">
          {[0,1].map(copy=><div key={copy} className="portal-logo-group" aria-hidden={copy===1||undefined}>
            {items.map(([file,name])=><div key={file} className="portal-logo-card"><img loading="lazy" src={sitePath('/landing-art/portal/'+file+'.png')} alt=""/><span>{name}</span></div>)}
          </div>)}</div></div>;
      })}
    </div>
    <Suspense fallback={<div className="portal-peers" aria-busy="true"/>}><PeerCards/></Suspense>
  </div></section>;
}
