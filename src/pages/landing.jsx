import { Fragment, useEffect, useRef, useState } from 'react';
import { AppWindow, ArrowUp, BadgeCheck, BookOpen, Bot, Building2, Database, Layers3, Mail, Menu, ShieldCheck, UserRound, X } from 'lucide-react';
import { sitePath } from '../site-path.js';
import Audience from './portal/Audience.jsx';
import Capabilities from './portal/Capabilities.jsx';
import Network from './portal/Network.jsx';
import '../design-system/landing.css';
import './portal/capabilities.css';

const navigation=[['数愈科研','top'],['平台能力','capabilities'],['生态伙伴','partners'],['适用人群','audience'],['科研服务','services']];
const services=[
  [Building2,'机构科研合作','对接机构科研项目'],
  [Database,'医疗与真实世界数据','对接真实世界研究数据'],
  [BookOpen,'专病数据集','按病种组织研究数据'],
  [ShieldCheck,'知识产权与成果转化','支持成果确权与转化'],
];

function Brand() {
  return <svg className="portal-brand" viewBox="190 197 1796 346" role="img" aria-label="KGcure">
    <image href={sitePath('/design-preview/kgcure-logo.png')} width="2172" height="724"/>
  </svg>;
}

function MacMark() {
  return <svg viewBox="3 2 17 20" fill="currentColor" aria-hidden="true">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>;
}

function WindowsMark() {
  return <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path d="M2 2h7.5v7.5H2zM10.5 2H18v7.5h-7.5zM2 10.5h7.5V18H2zM10.5 10.5H18V18h-7.5z"/>
  </svg>;
}

function Devices(){
  const root=sitePath('/landing-art/portal/');
  return <figure className="portal-devices" aria-label="Mac 笔记本与手机上的新建任务界面">
    <div className="device-desktop"><div className="laptop-lid">
      <div className="device-screen"><img src={root+'new-task.png'} width="1980" height="1230" alt="电脑端新建任务界面，显示科研导航、输入框与能力推荐"/></div>
    </div><div className="laptop-base" aria-hidden="true"><div className="laptop-deck"><i/><b/></div><div className="laptop-edge"/></div></div>
    <div className="device-phone"><div className="phone-glass"><i aria-hidden="true"/><img src={root+'new-task-phone.png'} width="585" height="1200" alt="手机端新建任务界面"/></div></div>
  </figure>;
}

export function LandingPage({onLogin}) {
  const [menuOpen,setMenuOpen]=useState(false);
  const [activeSection,setActiveSection]=useState('top');
  const header=useRef(null),menu=useRef(null);
  useEffect(()=>{
    if(!menuOpen)return;
    const outside=e=>{if(!header.current?.contains(e.target))setMenuOpen(false)};
    const escape=e=>{if(e.key==='Escape'){setMenuOpen(false);menu.current?.focus()}};
    document.addEventListener('pointerdown',outside);
    document.addEventListener('keydown',escape);
    return ()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape)};
  },[menuOpen]);
  useEffect(()=>{
    const sections=navigation.map(([,id])=>document.getElementById(id));
    let frame=0;
    function sync(){
      frame=0;
      const threshold=(header.current?.offsetHeight || 52)+Math.min(110,innerHeight*.12);
      const current=sections.filter(section=>section.getBoundingClientRect().top<=threshold).at(-1);
      const atEnd=sections.at(-1).getBoundingClientRect().bottom<=innerHeight+2;
      setActiveSection(atEnd?'services':current?.id ?? 'top');
    }
    function schedule(){if(!frame)frame=requestAnimationFrame(sync)}
    function followHash(){
      sections.find(section=>section.id===location.hash.slice(1))?.scrollIntoView();
      schedule();
    }
    followHash();
    document.addEventListener('scroll',schedule,{capture:true,passive:true});
    window.addEventListener('resize',schedule);
    window.addEventListener('hashchange',followHash);
    const sizes=new ResizeObserver(schedule);
    sections.forEach(section=>sizes.observe(section));
    return ()=>{
      document.removeEventListener('scroll',schedule,true);
      window.removeEventListener('resize',schedule);
      window.removeEventListener('hashchange',followHash);
      sizes.disconnect();
      cancelAnimationFrame(frame);
    };
  },[]);
  return <div className="kg-portal" id="top">
    <header className="portal-header" ref={header}><div className="portal-shell">
      <a href="#top" aria-label="KGcure 首页"><Brand/></a>
      <button ref={menu} type="button" className="portal-menu" aria-expanded={menuOpen} aria-controls="portal-nav" aria-label={menuOpen?'收起导航':'展开导航'} onClick={()=>setMenuOpen(v=>!v)}>{menuOpen?<X size={21}/>:<Menu size={21}/>}</button>
      <nav id="portal-nav" className={menuOpen?'open':''} aria-label="首页导航">{navigation.map(([name,id])=><a key={id} href={'#'+id} aria-current={activeSection===id?'location':undefined} onClick={()=>setMenuOpen(false)}>{name}</a>)}</nav>
    </div></header>
    <main>
      <section className="portal-hero"><div className="portal-shell">
        <div className="portal-message">
          <h1><span className="portal-title-lead">一站式可信</span>{' '}学术科研工作台</h1>
          <p>从选题到成稿，一站覆盖科研全流程与各类场景。<br className="hero-break"/>用可追溯的证据和可复核的方法，支撑研究结论。</p>
          <div className="portal-actions"><button className="org-login" onClick={()=>onLogin('/login?identity=hospital')}><Building2 size={16}/>医院 / 机构登录</button><button className="person-login" onClick={()=>onLogin('/login')}><UserRound size={16}/>个人用户登录</button></div>
        </div><Devices/>
      </div></section>
      <Capabilities/><Network/><Audience/>
    </main>
    <footer className="portal-footer" id="services">
      <div className="portal-service-band">
        <section className="portal-shell portal-services" aria-label="专业科研服务">
          {services.map(([Icon,name,desc],index)=><Fragment key={name}>
            {index>0 && <span className="portal-service-divider" aria-hidden="true"/>}
            <article><Icon aria-hidden="true"/><h3>{name}</h3><p>{desc}</p></article>
          </Fragment>)}
        </section>
      </div>
      <div className="portal-shell portal-footer-main">
        <div><Brand/><p>一站式可信学术科研工作台</p></div>
        <div><h3>产品中心</h3>
          <a href={sitePath('/workspace/chats/new')}><AppWindow aria-hidden="true"/>科研工作台</a>
          <span><MacMark/>Mac 客户端 <small>即将上线</small></span>
          <span><WindowsMark/>Windows 客户端 <small>即将上线</small></span>
        </div>
        <div><h3>科研能力</h3><a href={sitePath('/workspace/skills')}><Layers3 aria-hidden="true"/>科研 Skill</a><a href={sitePath('/workspace/agents')}><Bot aria-hidden="true"/>科研 Agent</a><a href={sitePath('/workspace/evaluation-standards')}><BadgeCheck aria-hidden="true"/>专业评测体系</a></div>
        <div><h3>联系我们</h3><a href="mailto:service@kgcure.com"><Mail aria-hidden="true"/>service@kgcure.com</a></div>
      </div>
      <div className="portal-legal-band">
        <div className="portal-shell portal-legal"><span>© 2026 KGcure 数愈科研</span><a href="#top"><ArrowUp aria-hidden="true"/>回到顶部</a></div>
      </div>
    </footer>
  </div>;
}
