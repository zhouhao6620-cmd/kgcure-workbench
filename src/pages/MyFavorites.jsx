import { useRef, useState } from 'react';
import { Check, HeartOff, SlidersHorizontal } from 'lucide-react';
import { Tabs } from '../components.jsx';
import { AgentCard, Button, EmptyState, RecordEmptyIllustration, SkillCard } from '../design-preview/components.jsx';
import { capabilityPath, hasPreviewDetail } from '../content/catalog.js';
import './my-favorites.css';

export function MyFavorites({ kind, items, onNavigate, onFavorite, onToast }) {
  const [managing, setManaging] = useState(false);
  const manageButton = useRef(null);
  const skills = items.filter(item => item.kind === 'skill');
  const agents = items.filter(item => item.kind === 'agent');
  const isSkill = kind === 'skill';
  const visible = isSkill ? skills : agents;
  const Card = isSkill ? SkillCard : AgentCard;
  const tabItems = [{ key: 'skill', name: '科研Skill', count: skills.length }, { key: 'agent', name: '科研Agent', count: agents.length }]
    .map(({ key, name, count }) => ({
      key,
      label: <span className="files-library-tab-label">{name}<span className="files-library-tab-count">{count}</span></span>,
    }));

  function removeFavorite(item, event) {
    const row = event.currentTarget.closest('li');
    const sibling = row.nextElementSibling || row.previousElementSibling;
    if (onFavorite(item.id, false)) {
      (sibling?.querySelector('.favorites-remove') || manageButton.current)?.focus();
      onToast('已取消收藏');
    }
  }

  return <div className="view acct-view files-library favorites-library">
    <header className="acct-head files-library-head">
      <h1>我的收藏</h1>
      <Button ref={manageButton} onClick={() => setManaging(value => !value)}
        aria-pressed={managing}
        disabled={!managing && !visible.length} className="favorites-manage">
        {managing ? <Check size={16} aria-hidden="true"/> : <SlidersHorizontal size={16} aria-hidden="true"/>}
        {managing ? '完成' : '管理收藏'}
      </Button>
    </header>
    <div className="files-library-toolbar">
      <Tabs className="ds-detail-tabs files-library-tabs" items={tabItems} value={kind}
        onChange={next => onNavigate('/workspace/my-favorites' + (next === 'agent' ? '?kind=agent' : ''))} ariaLabel="收藏类型"/>
    </div>
    {visible.length ? <ul className={`favorites-grid ${isSkill ? 'sp-skill-grid' : 'sp-agent-grid'}`}
      aria-label={isSkill ? '收藏的 Skill' : '收藏的 Agent'}>
      {visible.map(item => <li className="favorites-card" key={item.id}>
        <Card item={item} context="channel" unavailable={!hasPreviewDetail(item)}
          onDetail={() => onNavigate(capabilityPath(item) + '?from=favorites')}/>
        {managing && <Button small className="favorites-remove" aria-label={`取消收藏 ${item.name}`}
          onClick={event => removeFavorite(item, event)}><HeartOff size={14} aria-hidden="true"/>取消收藏</Button>}
      </li>)}
    </ul> : <EmptyState icon={RecordEmptyIllustration} className="favorites-empty"
      description={`在 ${isSkill ? 'Skill' : 'Agent'} 详情页点击「收藏」，就能在这里找到。`}>
      {isSkill ? '暂无收藏的 Skill' : '暂无收藏的 Agent'}
    </EmptyState>}
  </div>;
}
