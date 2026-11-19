import { useEffect, useRef, useState } from 'react';
import { BusinessCases } from './BusinessCases.jsx';
import { BoundComposer } from './BoundComposer.jsx';
import { HomeSurface } from './HomeSurface.jsx';
import { useRouter } from '../router.jsx';
import { AgentGlyph, SkillGlyph } from '../design-preview/components.jsx';
import { HOME_COPY } from '../design-preview/data.js';
import { capabilityById } from '../content/catalog.js';

const SHORTCUTS = [
  [
    [['1042', '查找专题文献'], ['1001', '把研究材料整理成论文初稿'], ['1028', '按变量类型选择统计方法']],
    [['1054', '梳理研究设计'], ['1035', '估算样本量'], ['1017', '整理组会汇报']],
  ],
  [
    [['1039', '分析变量与结局的关联'], ['1046', '拟定综述的检索与纳入标准'], ['1003', '润色论文章节']],
    [['35a3e188211447888f499c11d0b90345', '从研究空白找选题'], ['1012', '翻译论文段落'], ['1031', '规划建模与验证流程']],
  ],
  [
    [['1016', '把研究数据做成图表'], ['1124', '规划试验分组与结局'], ['79d470ab439e4f80a540a61c09dae2fd', '预审论文']],
    [['1002', '搭建综述结构'], ['54e55c02d102417994d786a0239a5103', '检查申报材料'], ['1138', '设计临床风险评估']],
  ],
];

function HomeShortcuts({ onNavigate }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const viewport = scrollRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canHover = window.matchMedia('(hover: hover)');
    let direction = 1;

    const timer = window.setInterval(() => {
      if (document.hidden || reducedMotion.matches || viewport.matches(':focus-within')
        || (canHover.matches && viewport.matches(':hover'))) return;

      const pageHeight = viewport.clientHeight;
      const page = Math.round(viewport.scrollTop / pageHeight);
      if (page === 0) direction = 1;
      if (page === SHORTCUTS.length - 1) direction = -1;
      viewport.scrollTo({ top: (page + direction) * pageHeight });
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return <div className="ds-home-shortcuts" role="group" aria-label="科研能力推荐">
    <div ref={scrollRef} className="ds-home-shortcut-scroll" role="region"
      aria-label="上下滚动浏览推荐" tabIndex={0}>
      {SHORTCUTS.map(rows => <div className="ds-home-shortcut-screen" key={rows[0][0][0]}>
        {rows.map(items => <div className="ds-home-shortcut-row" key={items[0][0]}>
          {items.map(([id, example]) => {
            const item = capabilityById(id);
            const isSkill = item.kind === 'skill';
            const Glyph = isSkill ? SkillGlyph : AgentGlyph;
            return <button type="button" key={id} className={`ds-home-shortcut is-${item.kind}`}
              title={`${item.name} · ${example}`} onClick={() => onNavigate(isSkill ? '/workspace/skills' : '/workspace/agents')}>
              <Glyph size={16}/><strong>{item.name}</strong>
              <span className="ds-home-shortcut-copy">{example}</span>
            </button>;
          })}
        </div>)}
      </div>)}
    </div>
  </div>;
}

export function BusinessHome({ onNavigate, onToast, onStart, onRequireCapability }) {
  const [landingPayload] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('kgcure-landing-payload') || 'null'); } catch { return null; }
  });
  const router = useRouter();
  const [value, setValue] = useState(() => {
    try { return sessionStorage.getItem('kgcure-landing-draft') || ''; } catch { return ''; }
  });
  const selectedAbility = capabilityById(router.get('ability') || router.get('workflowId')) || null;
  useEffect(() => {
    try { sessionStorage.removeItem('kgcure-landing-draft'); sessionStorage.removeItem('kgcure-landing-payload'); } catch {}
  }, []);

  return <HomeSurface title={<>从一个问题，到真正的<span className="sp-title-accent">科研成果</span></>} description={HOME_COPY.home.description}
    composer={<BoundComposer key={selectedAbility?.id || 'home'} initialModel={landingPayload?.model || 'pro'} initialAttachments={landingPayload?.attachments || []}
      initialAbility={selectedAbility} initialSpace={router.get('space') || 'personal'} value={value} onChange={setValue} onSubmit={onStart} onToast={onToast} onNavigate={onNavigate} onRequireCapability={onRequireCapability}/>}
    shortcuts={<HomeShortcuts onNavigate={onNavigate}/>} footer={<BusinessCases onNavigate={onNavigate} imageCards/>}/>;
}
