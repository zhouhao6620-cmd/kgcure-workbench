import { CaseCategory } from '../design-preview/components.jsx';
import './case-covers.css';

export function CaseCoverCard({ title, image, category, cover = false, children }) {
  return <article className="ds-image-case">
    <span className="ds-image-case-cover">
      {children || <img src={image} alt="" loading="lazy" className={cover ? 'is-cover' : undefined}/>}
      {category && <CaseCategory>{category}</CaseCategory>}
    </span>
    <span className="ds-image-case-title" title={title}>{title}</span>
  </article>;
}
