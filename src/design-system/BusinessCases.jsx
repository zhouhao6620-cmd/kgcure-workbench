import { sitePath } from "../site-path.js";
import { FileText } from 'lucide-react';
import { CaseCategory } from '../design-preview/components.jsx';
import { capabilityById } from '../content/catalog.js';
import { CaseCoverCard } from './CaseCoverCard.jsx';

const CASES = [
  { id: '35a3e188211447888f499c11d0b90345', image: 'agent-discovery' },
  { id: '1001', image: 'agent-paper' },
  { id: '1031', image: 'agent-modeling' },
];
const LITERATURE_CASE = { id: '1042', image: 'skill-literature' };

export function BusinessCases({ imageCards = false }) {
  const cases = imageCards ? [...CASES, LITERATURE_CASE] : CASES;
  return <section className="ds-home-cases"><h2 className="ds-case-gallery-title">典型科研案例</h2>
    <div className={imageCards ? 'ds-image-case-grid ds-home-case-grid' : undefined}>
      {cases.map(({ id, image }) => {
        const item = capabilityById(id);
        const entry = item.cases[0];
        return imageCards
          ? <CaseCoverCard key={id} title={entry.name} image={sitePath(`/store-art/${image}.webp`)} cover/>
          : <article className="ds-home-case-story" key={id}>
            <span className="ds-home-case-paper"><CaseCategory>{item.group}</CaseCategory><FileText size={22}/><strong>{entry.name}</strong><i/><span>{item.output}</span></span>
            <b>{entry.name}</b><small>{item.kind === 'skill' ? 'Skill' : 'Agent'} · {item.name}</small>
          </article>;
      })}
    </div>
  </section>;
}
