import { sitePath } from "../site-path.js";
import { SkillGlyph } from '../design-preview/components.jsx';

export function RecommendationHeading({kind,children}) {
 return <h4 className="sp-recommendation-heading"><span className="sp-recommendation-heading-icon" aria-hidden="true">{kind==='agent'?<img src={sitePath("/design-preview/agent-robot.webp")} alt=""/>:<SkillGlyph size={20}/>}</span><span className="sp-recommendation-heading-label">{children}</span></h4>;
}
