import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Loader2, RotateCcw } from 'lucide-react';
import { capabilityDemoTitle } from '../content/capability-demos.js';
import { downloadText } from '../content/catalog.js';
import { DeliveryCard, ThinkingSummary } from '../design-preview/ConversationPatterns.jsx';
import { AgentGlyph, Button, Modal, SkillGlyph, StatusTag } from '../design-preview/components.jsx';
import { ChatFrame } from './chats.jsx';
import './capability-demo.css';

export function CapabilityDemo({ item, demo, delivery, onExit, onRun, onToast }) {
  const [phase, setPhase] = useState(0);
  const [replay, setReplay] = useState(0);
  const [sideOpen, setSideOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const scroll = useRef(null);
  const followLatest = useRef(true);
  const finalPhase = 3 + demo.steps.length;
  const completed = phase === finalPhase;
  const type = item.kind === 'skill' ? 'Skill' : 'Agent';
  const Glyph = item.kind === 'skill' ? SkillGlyph : AgentGlyph;
  const shareLink = new URL(window.location.pathname, window.location.origin).href;
  const hasDelivery = Boolean(demo.file);
  const file = hasDelivery ? {
    id: item.id + '-demo',
    name: demo.file + '（演示样例）.md',
    description: '任务演示交付',
    type: 'MD',
    content: [
      '# ' + demo.file,
      '> 任务演示样例，仅展示工作流程。',
      '## 任务输入\n\n' + demo.request,
      '## 输入配置\n\n' + demo.configuration.map(([label, value]) => '- ' + label + '：' + value).join('\n'),
      '## 执行过程\n\n' + demo.steps.map(([label, detail]) => '- ' + label + '：' + detail).join('\n'),
      '## 交付摘要\n\n' + demo.result,
    ].join('\n\n'),
  } : null;

  useEffect(() => {
    if (completed) return;
    const delay = phase === 1 ? 1800 : 950;
    const timer = window.setTimeout(() => {
      const nextPhase = phase + 1;
      setPhase(nextPhase);
      if (nextPhase === finalPhase && hasDelivery) setSideOpen(true);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [completed, finalPhase, hasDelivery, phase, replay]);

  useLayoutEffect(() => {
    const panel = scroll.current;
    if (panel && followLatest.current) panel.scrollTop = phase === 0 ? 0 : panel.scrollHeight;
  }, [phase, replay]);

  function restart() {
    followLatest.current = true;
    setSideOpen(false);
    setPhase(0);
    setReplay(count => count + 1);
  }

  function trackScroll(event) {
    const panel = event.currentTarget;
    followLatest.current = panel.scrollHeight - panel.scrollTop - panel.clientHeight < 64;
  }

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(shareLink);
      onToast('已复制演示链接');
    } catch {
      onToast('请选中并复制演示链接');
    }
  }

  const deliveryCard = completed && file && <DeliveryCard file={file} delivery={delivery} onDownload={() => downloadText(file.name, file.content)}/>;

  return <><ChatFrame
    title={capabilityDemoTitle}
    onExit={onExit}
    scrollRef={scroll}
    onScroll={trackScroll}
    onShare={() => setShareOpen(true)}
    sideOpen={sideOpen}
    onToggleSide={() => setSideOpen(open => !open)}
    side={{
      title: deliveryCard ? '交付文件' : '文件',
      content: <div className="side-files capability-demo-file-preview">
        {deliveryCard ? <>{deliveryCard}<pre className="sp-file-preview" aria-label="交付文件正文" tabIndex={0}>{file.content}</pre></>
          : <p className="ds-muted">{completed || !hasDelivery ? '本次演示没有交付文件。' : '交付文件将在演示结束后显示。'}</p>}
      </div>,
    }}
    composer={<div className="chat-composer-wrap">
      <section className="sp-compose-block sp-compose-chat" aria-label="演示控制">
        <div className="sp-composer capability-demo-dock">
          <p className="capability-demo-status" data-playing={!completed} role="status">
            {completed ? '实例已完成，马上开始你的任务吧～' : '正在为你回放，真实的实例任务对话动态'}
          </p>
          <div className="capability-demo-actions">
            <button type="button" className="sp-button capability-demo-replay" disabled={!completed} onClick={restart}>
              {completed ? <><RotateCcw size={16} aria-hidden="true"/>重新演示</>
                : <><Loader2 className="sp-spin" size={16} aria-hidden="true"/>任务回放中</>}
            </button>
            <button type="button" className="sp-button sp-button-primary" data-kind={item.kind} onClick={onRun}><Glyph size={18} aria-hidden="true"/>使用{type}开始任务</button>
          </div>
        </div>
      </section>
      <p className="disclaimer">示例任务回放 · 内容仅供演示</p>
    </div>}
  >
    <div key={replay} className="capability-demo-transcript">
      <div className="msg is-user"><div className="bubble"><span className="capability-demo-identity" data-kind={item.kind}><Glyph size={16}/>{item.name}</span>{demo.request}</div></div>
      {phase >= 1 && <div className="msg is-assistant">
        <ThinkingSummary label="任务理解" duration="过程记录"><p>{demo.understanding}</p></ThinkingSummary>
        <p>{demo.understanding}</p>
        <section className="capability-demo-configuration" aria-label="输入配置">
          <header><strong>输入配置</strong><StatusTag status={phase >= 2 ? 'success' : 'warning'}>{phase >= 2 ? '已确认' : '待确认'}</StatusTag></header>
          <dl>{demo.configuration.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        </section>
      </div>}
      {phase >= 2 && <div className="msg is-user"><div className="bubble">我已确认任务配置，请按这个范围继续。</div></div>}
      {phase >= 3 && <div className="msg is-assistant">
        <p><strong>执行过程</strong></p>
        <ol className="capability-demo-steps">
          {demo.steps.slice(0, phase - 2).map(([label, detail], index) => <li key={label}>
            <details><summary><span>{label}</span><small>{phase > index + 3 ? '已完成' : '演示中'}</small></summary><p>{detail}</p></details>
          </li>)}
        </ol>
      </div>}
      {completed && <div className="msg is-assistant">
        {deliveryCard && <p><strong>任务交付</strong></p>}
        <p>{demo.result}</p>
        {deliveryCard && <div className="file-grid one">{deliveryCard}</div>}
      </div>}
    </div>
  </ChatFrame>
    {shareOpen && <Modal title="分享对话" onClose={() => setShareOpen(false)}>
      <label className="sp-field"><span>演示链接</span><input readOnly value={shareLink} onFocus={event => event.target.select()}/></label>
      <div className="sp-dialog-actions">
        <Button onClick={() => setShareOpen(false)}>关闭</Button>
        <Button variant="primary" onClick={copyShareLink}>复制链接</Button>
      </div>
    </Modal>}
  </>;
}
