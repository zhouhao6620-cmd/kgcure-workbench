import { CaseCategory } from '../design-preview/components.jsx';
import { evidenceCases } from '../cases/evidence.js';

const SHORT_CASE_TYPES = {
  论文查新与相似研究核验: '选题查新',
  查找近期预印本: '前沿研究',
  '临床指南 / 共识检索与总结': '指南共识',
  研究版图绘制: '研究版图',
  追踪研究趋势: '趋势追踪',
  创新点发现: '创新发现',
  研究问题深度澄清: '问题澄清',
  明确研究假设: '研究假设',
};

function caseThumbnail(svg, compact) {
  const artwork = svg.replace(/<rect width="240" height="110"[^>]*><\/rect>/, '');
  return compact ? artwork : artwork.replace('viewBox="0 0 240 110"', 'viewBox="0 -35 240 180"');
}

export function BusinessCases({ title, cases, kind, showCaseType, onOpenCase, className = '' }) {
  const Card = onOpenCase ? 'button' : 'article';
  return <section className={'case-section ' + className}>
    <h2 className="ds-case-gallery-title">{title}</h2>
    <div className="case-grid">
      {cases.map(item => <Card key={item.title}
        className={onOpenCase ? 'case-card ds-card-interaction-trigger' : 'case-card'}
        type={onOpenCase ? 'button' : undefined}
        onClick={onOpenCase}>
        {showCaseType ? <span className={onOpenCase ? 'case-thumb ds-card-interaction' : 'case-thumb'}>
          <CaseCategory>{kind === 'grant' ? '基金申报' : SHORT_CASE_TYPES[item.tag] ?? item.tag}</CaseCategory>
          <span className="ds-case-art" aria-hidden="true" dangerouslySetInnerHTML={{ __html: caseThumbnail(item.svg, true) }}/>
        </span> : <span className="case-thumb" dangerouslySetInnerHTML={{ __html: caseThumbnail(item.svg, false) }}/>}
        <span className="case-body">
          {!showCaseType && <span className="case-tag">{item.tag}</span>}
          <span className="case-title">{item.title}</span>
        </span>
      </Card>)}
    </div>
  </section>;
}

export function TaskCaseGallery({ onOpenCase }) {
  return <BusinessCases title="典型科研案例" cases={evidenceCases} showCaseType onOpenCase={onOpenCase} className="ds-task-case-gallery"/>;
}
