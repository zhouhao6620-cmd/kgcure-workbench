import { ChevronRight } from 'lucide-react';
import { AbilityIcon } from '../design-preview/components.jsx';
import { AGENTS, SKILLS } from '../design-preview/data.js';
export function HomeSurface({title,description,composer,onCapability,footer,shortcuts,capabilities=[SKILLS[0],SKILLS[1],AGENTS[1],AGENTS[2]]}) {
 return <div className="sp-home"><div className="sp-home-stack"><div className="sp-home-intro"><h1>{title}</h1>{description&&<p title={description}>{description}</p>}</div>{composer}{shortcuts ?? <div className="sp-quick-grid">{capabilities.map(item=><button type="button" className="sp-quick-card" key={item.id} onClick={()=>onCapability(item)}><AbilityIcon item={item} size={19}/><span><strong>{item.name}</strong><small>{item.description}</small></span><ChevronRight size={14}/></button>)}</div>}{footer}</div></div>;
}
