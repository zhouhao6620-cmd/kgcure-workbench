import { useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export function WorkspaceSelect({ label, value, options, onChange, disabled, showLabel, placeholder, clearable }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef(null);
  const menu = useRef(null);
  const id = useId();
  const choices = options.map(option => typeof option === 'string' ? { value: option, label: option } : option);

  function show(last = false) {
    setOpen(true);
    requestAnimationFrame(() => {
      const option = menu.current?.querySelector('[aria-checked=true]')
        ?? menu.current?.querySelector(last ? 'button:last-child' : 'button');
      option?.focus();
    });
  }
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  function onKeyDown(event) {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      event.stopPropagation();
      close();
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    if (!open) return show(event.key === 'ArrowUp');
    const buttons = [...menu.current.querySelectorAll('button')];
    const step = event.key === 'ArrowDown' ? 1 : -1;
    buttons[(buttons.indexOf(document.activeElement) + step + buttons.length) % buttons.length]?.focus();
  }
  return <div className="ds-field-select" onKeyDown={onKeyDown} onBlur={event=>{if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);}}>
    {showLabel && <span className="ds-field-select-label">{label}</span>}
    <button type="button" className="ds-field-select-trigger" ref={trigger} disabled={disabled}
      aria-label={label} aria-haspopup="menu" aria-expanded={open} aria-controls={open ? id : undefined}
      data-placeholder={!value && Boolean(placeholder) ? '' : undefined}
      onClick={()=>open ? setOpen(false) : show()}>
      <span>{choices.find(choice=>choice.value===value)?.label ?? (value || placeholder)}</span><ChevronDown size={16} aria-hidden="true"/>
    </button>
    {open && !disabled && <div className="ds-field-select-menu" role="menu" aria-label={label} id={id} ref={menu}>
      {choices.map(choice=><button type="button" role="menuitemradio" key={choice.value} aria-checked={choice.value===value}
        onClick={()=>{onChange(choice.value);close();}}><span>{choice.label}</span>{choice.value===value && <Check size={16} aria-hidden="true"/>}</button>)}
      {clearable && value && <button type="button" role="menuitem" className="ds-field-select-clear"
        onClick={()=>{onChange('');close();}}>清除选择</button>}
    </div>}
  </div>;
}
