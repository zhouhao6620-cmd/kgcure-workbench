import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, Eye, EyeOff, UserRound, X } from 'lucide-react';
import { sitePath } from '../site-path.js';
import './login.css';

const identities = [
  { id: 'personal', label: '个人用户登录', Icon: UserRound },
  { id: 'hospital', label: '医院机构登录', Icon: Building2 },
];
const loginMethods = [
  { id: 'phone', label: '手机号登录' },
  { id: 'email', label: '邮箱登录' },
];
const guidance = {
  terms: { title: '用户协议', body: '正式服务的用户协议由服务方提供。' },
  privacy: { title: '隐私政策', body: '正式服务的隐私政策由服务方提供。' },
  reset: { title: '找回密码', body: '找回密码由正式登录服务处理。' },
};

function ModeSelector({ value, onChange }) {
  return <fieldset className="kg-modes">
    <legend className="sr-only">登录身份</legend>
    {identities.map(({ id, label, Icon }) => <label key={id}>
      <input className="sr-only" type="radio" name="identity" value={id} checked={value === id}
        onChange={() => onChange(id)}/>
      <span className="kg-mode">
        <Icon size={18} strokeWidth={1.7} aria-hidden="true"/>
        {label}
      </span>
    </label>)}
  </fieldset>;
}

function MethodTabs({ value, onChange }) {
  function handleKeyDown(event, index) {
    let next;
    switch (event.key) {
      case 'ArrowRight': next = (index + 1) % loginMethods.length; break;
      case 'ArrowLeft': next = (index + loginMethods.length - 1) % loginMethods.length; break;
      case 'Home': next = 0; break;
      case 'End': next = loginMethods.length - 1; break;
      default: return;
    }
    event.preventDefault();
    event.currentTarget.parentElement.children[next].focus();
    onChange(loginMethods[next].id);
  }
  return <div className="kg-method-tabs" role="tablist" aria-label="登录方式">
    {loginMethods.map(({ id, label }, index) => <button key={id} id={'kg-tab-' + id}
      type="button" role="tab" aria-controls={'kg-panel-' + id}
      aria-selected={value === id} tabIndex={value === id ? 0 : -1}
      onClick={() => onChange(id)} onKeyDown={event => handleKeyDown(event, index)}>{label}</button>)}
  </div>;
}

function WeChatPanel() {
  return <aside className="kg-login-side kg-login-wechat" aria-labelledby="kg-wechat-title">
    <h2 id="kg-wechat-title">
      <svg width="26" height="23" viewBox="0 0 32 27" aria-hidden="true">
        <path fill="#07b75e" d="M12 1C5.8 1 1 4.9 1 10c0 2.9 1.6 5.4 4.1 7.1l-1 3.4 4.2-2c1.1.3 2.3.5 3.5.5-.5-1-.8-2.2-.8-3.4 0-5 4.8-9 10.7-9.1C20 3.2 16.4 1 12 1Z"/>
        <path fill="#07b75e" d="M21.5 7.8c-5.2 0-9.3 3.4-9.3 7.8s4.1 7.9 9.3 7.9c1.1 0 2.2-.2 3.2-.5l3.6 1.8-.8-3c2.2-1.5 3.4-3.7 3.4-6.2 0-4.4-4.2-7.8-9.4-7.8Z"/>
        <g fill="white"><circle cx="8" cy="7.6" r="1.25"/><circle cx="15.5" cy="7.6" r="1.25"/><circle cx="18.1" cy="13.8" r="1.1"/><circle cx="25" cy="13.8" r="1.1"/></g>
      </svg>微信扫码登录
    </h2>
    <img src={sitePath('/design-preview/wechat-demo-qr.svg')} alt="演示二维码" width="150" height="150"/>
    <p>本地演示二维码</p>
  </aside>;
}

function HospitalPanel() {
  return <div className="kg-login-side kg-login-hospital" aria-hidden="true">
    <svg width="144" height="144" viewBox="15 13 128 128" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M24 113h82M29 113V71a4 4 0 0 1 4-4h17m49-5h15a4 4 0 0 1 4 4v16"/>
      <path d="M50 113V44a4 4 0 0 1 4-4h41a4 4 0 0 1 4 4v69M58 40v-5a3 3 0 0 1 3-3h27a3 3 0 0 1 3 3v5"/>
      <path d="M74.5 49v16m-8-8h16" strokeWidth="2.4"/>
      <path d="M61 78h6m5 0h5m5 0h6m-27 9h6m5 0h5m5 0h6M37 78h5m-5 10h5m-5 10h5m64-23h4"/>
      <path d="M65 113v-13a3 3 0 0 1 3-3h13a3 3 0 0 1 3 3v13m-9.5-16v16"/>
      <path d="M117 87c4 3 9 5 14 6v9c0 9-6 15-14 19-8-4-14-10-14-19v-9c5-1 10-3 14-6Z"/>
      <path d="m112 104 3.5 3.5 6.5-7" strokeWidth="2.2"/>
    </svg>
  </div>;
}

function LoginDialog({ title, onClose, children }) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    node.showModal();
    return () => node.close();
  }, []);
  return <dialog className="kg-login-dialog" ref={dialog} aria-labelledby="kg-modal-title"
    onCancel={event => { event.preventDefault(); onClose(); }}>
    <header><h2 id="kg-modal-title">{title}</h2><button type="button" className="kg-icon-button" onClick={onClose} aria-label="关闭"><X size={20}/></button></header>
    {children}
  </dialog>;
}

function LoginForm({ identity, method, onLogin }) {
  const institution = identity === 'hospital';
  const phoneMode = method === 'phone';
  const secretInput = useRef(null);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [dialog, setDialog] = useState('');

  function submit(event) {
    event.preventDefault();
    onLogin();
  }

  return <>
    <form className="kg-login-form" onSubmit={submit} noValidate>
      <div>
        <div className="kg-field-head">
          <label htmlFor="kg-account">{phoneMode ? '手机号' : institution ? '机构邮箱' : '邮箱地址'}</label>
        </div>
        <div className="kg-login-field">
          {phoneMode && <span className="kg-prefix">+86</span>}
          <input id="kg-account" type="text" inputMode={phoneMode ? 'tel' : 'email'}
            placeholder={phoneMode ? '请输入手机号' : institution ? '请输入机构邮箱' : '请输入邮箱地址'}
            autoComplete={phoneMode ? 'tel-national' : 'username'}/>
        </div>
      </div>
      <div>
        <div className="kg-field-head">
          <label htmlFor="kg-secret">{phoneMode ? '验证码' : '密码'}</label>
          {!phoneMode && <button type="button" className="kg-text-action" onClick={() => setDialog('reset')}>忘记密码？</button>}
        </div>
        <div className="kg-login-field">
          <input ref={secretInput} id="kg-secret" type={phoneMode || visible ? 'text' : 'password'}
            inputMode={phoneMode ? 'numeric' : undefined} placeholder={phoneMode ? '请输入验证码' : '请输入密码'}
            autoComplete={phoneMode ? 'one-time-code' : 'current-password'}/>
          {phoneMode ? <button className="kg-text-action kg-code" type="button" onClick={() => {
            setMessage('验证码由正式登录服务发送。');
            secretInput.current?.focus();
          }}>获取验证码</button>
            : <button className="kg-icon-button" type="button" aria-label={visible ? '隐藏密码' : '显示密码'} onClick={() => setVisible(!visible)}>
              {visible ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>}
        </div>
      </div>
      <div>
        <div className="kg-agreement">
          <input type="checkbox" id="kg-agree" aria-label="同意用户协议和隐私政策"/>
          <span><label htmlFor="kg-agree">我已阅读并同意</label><button type="button" onClick={() => setDialog('terms')}>《用户协议》</button>与<button type="button" onClick={() => setDialog('privacy')}>《隐私政策》</button></span>
        </div>
        <div className="kg-login-feedback">
          <p role="status">{message}</p>
        </div>
        <button className="kg-login-submit kg-login-action" type="submit">马上登录 <ArrowRight size={17} aria-hidden="true"/></button>
      </div>
    </form>
    {guidance[dialog] && <LoginDialog title={guidance[dialog].title} onClose={() => setDialog('')}><p>{guidance[dialog].body}</p></LoginDialog>}
  </>;
}

export function Login({ onBack, onLogin }) {
  const [identity, setIdentity] = useState(() => new URLSearchParams(window.location.search).get('identity') === 'hospital' ? 'hospital' : 'personal');
  const [methods, setMethods] = useState({ personal: 'phone', hospital: 'phone' });
  const method = methods[identity];
  return <main className="kg-login">
    <header className="kg-login-top"><button type="button" onClick={onBack}><ArrowLeft size={16}/>返回首页</button></header>
    <div className="kg-login-stage">
      <h1 className="kg-login-heading">
        <span className="kg-logo" role="img" aria-label="KGcure" style={{ backgroundImage: 'url(' + sitePath('/design-preview/kgcure-logo.png') + ')' }}/>
        <span>马上登录</span>
      </h1>
      <ModeSelector value={identity} onChange={setIdentity}/>
      <MethodTabs value={method} onChange={id => setMethods(current => ({ ...current, [identity]: id }))}/>
      <div className="kg-login-body">
        <section aria-label={identity === 'personal' ? '个人用户登录表单' : '医院机构登录表单'}>
          {loginMethods.map(({ id }) => <div role="tabpanel" key={id} id={'kg-panel-' + id}
            aria-labelledby={'kg-tab-' + id} hidden={method !== id}>
            {method === id && <LoginForm key={identity} identity={identity} method={id} onLogin={() => onLogin(identity)}/>}
          </div>)}
        </section>
        {identity === 'personal' ? <WeChatPanel/> : <HospitalPanel/>}
      </div>
    </div>
  </main>;
}
