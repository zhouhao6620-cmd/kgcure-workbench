import { useEffect, useRef } from "react";
import { HighlightedTitle } from "./design-system/Typography.jsx";
import { Button as GoldenButton, EmptyState as SharedEmptyState, Tag as GoldenTag } from "./design-preview/components.jsx";
import { ArrowLeft, ChevronRight, X } from "lucide-react";

export function Btn({ children, kind = "secondary", size = "md", className = "", ...props }) {
  return <GoldenButton variant={kind === 'ghost' ? 'ghost' : kind === 'danger' ? 'danger' : kind === 'primary' ? 'primary' : 'secondary'} small={size === 'sm'} className={['btn','btn-'+kind,'btn-'+size,className].filter(Boolean).join(' ')} {...props}>{children}</GoldenButton>;
}

export function PageHead({ icon: Icon, title, subtitle, actions, onBack, backLabel, className = "" }) {
  return (
    <header className={"view-head " + className}>
      <div className="view-head-main">
        {onBack ? (
          <button type="button" className="back-link" onClick={onBack}>
            <ArrowLeft size={16} /> {backLabel || "返回"}
          </button>
        ) : null}
        <div className="view-title-row">
          {Icon ? (
            <span className="view-icon">
              <Icon size={20} />
            </span>
          ) : null}
          <h1 className="view-title"><HighlightedTitle>{title}</HighlightedTitle></h1>
        </div>
        {subtitle ? <p className="view-sub ds-one-line" title={subtitle}>{subtitle}</p> : null}
      </div>
      {actions ? <div className="view-actions">{actions}</div> : null}
    </header>
  );
}

export function Tabs({ items, value, onChange, className = "", ariaLabel = "标签页" }) {
  return (
    <div className={"tabs " + className} role="tablist" aria-label={ariaLabel}>
      {items.map((item) => {
        const key = typeof item === "string" ? item : item.key;
        const label = typeof item === "string" ? item : item.label;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={value === key}
            className={"tab" + (value === key ? " is-active" : "")}
            onClick={() => onChange(key)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button type="button" className="toggle-row" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)}>
      <span className="toggle-label">{label}</span>
      <span className={"toggle" + (checked ? " is-on" : "")}>
        <span className="toggle-knob" />
      </span>
    </button>
  );
}

export function Badge({ children, tone = "blue" }) {
  return <GoldenTag tone={{blue:"blue",green:"green",slate:"neutral",amber:"amber"}[tone] || tone}>{children}</GoldenTag>;
}

export function EmptyState({ icon: Icon, title, description, action }) {
  return <SharedEmptyState icon={Icon} description={description} action={action}>{title}</SharedEmptyState>;
}

export function Modal({ title, onClose, children, footer, width = 520 }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div
      className="modal-layer"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-card" role="dialog" aria-modal="true" aria-label={title} style={{ maxWidth: width }} tabIndex={-1} ref={ref}>
        <div className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="icon-button" aria-label="关闭" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer ? <div className="modal-foot">{footer}</div> : null}
      </div>
    </div>
  );
}

export function Field({ label, hint, children }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint ? <span className="field-hint">{hint}</span> : null}
    </label>
  );
}

export function ArrowLink({ children, onClick }) {
  return (
    <button type="button" className="arrow-link" onClick={onClick}>
      {children} <ChevronRight size={14} />
    </button>
  );
}

export function SectionHead({ title, meta, action }) {
  return (
    <div className="section-head-row">
      <div className="section-head-title">
        <h2>{title}</h2>
        {meta ? <span className="section-meta">{meta}</span> : null}
      </div>
      {action}
    </div>
  );
}

