import { ChevronRight, MessageSquare } from 'lucide-react';
import './conversation-prompts.css';

export function ConversationPrompt({ title, description, prefix, badge, outlined = false, selected, disabled = false, onChoose }) {
  const Element = onChoose ? 'button' : 'div';
  const tooltip = [badge, prefix ? `${prefix}${title}` : title, description].filter(Boolean).join('\n');

  return <Element
    {...(onChoose ? { type: 'button', disabled, onClick: onChoose, 'aria-pressed': selected } : {})}
    className={`ds-chat-prompt${outlined ? ' is-outlined' : ''}${selected ? ' is-selected' : ''}`}
    title={tooltip}
  >
    <span className="ds-chat-prompt-copy">
      {badge && <span className="ds-chat-prompt-badge">{badge}</span>}
      <span className="ds-chat-prompt-title">{prefix && <b>{prefix}</b>}{title}</span>
      {description && <small className="ds-chat-prompt-description">{description}</small>}
    </span>
    <ChevronRight size={16} aria-hidden="true"/>
  </Element>;
}

export function FollowUpHeading({ as: Heading = 'h4' }) {
  return <Heading className="ds-followup-heading"><MessageSquare size={18} aria-hidden="true"/>继续问</Heading>;
}

export function FollowUpQuestions({ questions, onChoose, outlined = false }) {
  return <section className="ds-chat-followups" aria-label="继续问">
    <FollowUpHeading/>
    <div className="ds-chat-prompts">
      {questions.map(question => <ConversationPrompt key={question} title={question} outlined={outlined} onChoose={() => onChoose(question)}/>)}
    </div>
  </section>;
}
