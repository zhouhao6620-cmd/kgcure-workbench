import { useLayoutEffect, useRef } from 'react';
import source from '../../design-system/review-pages/skill.html?raw';
import detailTheme from '../../design-system/review-pages/detail-theme.css?raw';
import tokens from '../../design-system/tokens.css?raw';
import { skillGlyph } from '../../design-system/capability-glyphs.js';
import { sitePath } from '../../site-path.js';

const detailURL = sitePath('/workspace/skills/sci-paper-evidence-review');
const svgNS = 'http://www.w3.org/2000/svg';
const homepageExamples = [
  '核对心衰研究的主要结局、随访时间和不良事件，整理带原文页码的图表与证据清单。',
  '为组会精读免疫治疗论文，整理纳入标准、疗效结局和研究局限，汇总成便于讨论的笔记。',
  '对照同类肿瘤研究，核对样本量、主要指标与原文页码，并标注不同研究之间的数据差异。',
  '联合解读论文正文与森林图，复核效应量、置信区间和异质性，为课题讨论整理证据摘要。',
];

function createPeerRow() {
  // Reuse the detail page's card layout and identities for the homepage examples.
  const reference = new DOMParser().parseFromString(source, 'text/html');
  const fragment = document.createDocumentFragment();
  const style = document.createElement('style');
  const sheet = [...reference.querySelectorAll('style')].map(node => node.textContent).join('\n');
  style.textContent = (sheet + '\n' + tokens + '\n' + detailTheme).replaceAll(':root', ':host') + `
    :host { display:block; font:14px/1.6 "PingFang SC","Microsoft YaHei","Noto Sans CJK SC",system-ui,sans-serif; color:#0f1115; }
    :host { overflow:clip; overflow-clip-margin:12px; }
    .detail-page.peer-row { --visible:3; display:flex; gap:16px; width:100%; max-width:none; min-height:0; padding:0; margin:0; text-align:left; background:none; }
    .peer-row .peer-carousel { flex:0 0 calc((100% + 16px) / var(--visible) - 16px); min-width:0; max-width:none; box-shadow:0 3px 10px #26344c0c; }
    .peer-row .peer-slide > .peer-org { font-size:14px; line-height:22px; }
    .peer-row .peer-task p { max-width:25em; min-height:44px; font-size:14px; line-height:22px; }
    @media(max-width:950px){.detail-page.peer-row{--visible:2}}
    @media(max-width:610px){.detail-page.peer-row{--visible:1}}
  `;
  fragment.append(style);
  const sprite = reference.querySelector('.svg-sprite').cloneNode(false);
  const slides = [...reference.querySelectorAll('.peer-carousel .peer-slide')];
  const ids = new Set(slides.flatMap(card => [...card.querySelectorAll('use')].map(use => use.getAttribute('href').slice(1))));
  for (const id of ids) {
    const original = reference.getElementById(id);
    if (original) sprite.append(original.cloneNode(true));
  }
  // The live review frame injects its Skill symbol when it opens.
  const symbol = document.createElementNS(svgNS,'symbol');
  symbol.id = 'ds-skill';
  Object.entries({viewBox:skillGlyph.viewBox,fill:'none',stroke:'currentColor','stroke-width':skillGlyph.strokeWidth,'stroke-linecap':'round','stroke-linejoin':'round'}).forEach(([key,val])=>symbol.setAttribute(key,val));
  for (const [tag,attrs] of skillGlyph.shapes) {
    const shape=document.createElementNS(svgNS,tag);
    Object.entries(attrs).forEach(([key,val])=>shape.setAttribute(key,val));
    symbol.append(shape);
  }
  sprite.append(symbol);
  fragment.append(sprite);
  const row = document.createElement('div');
  row.className='detail-page peer-row';
  for (const original of slides) {
    const card=document.createElement('div');
    card.className='peer-carousel';
    const slide=original.cloneNode(true);
    slide.hidden=false;
    slide.querySelector('.capability-link').href=detailURL;
    const example=homepageExamples[slide.dataset.slide];
    if(example){
      const description=slide.querySelector('.peer-task p');
      description.textContent=example;
      description.title=example;
    }
    card.append(slide);
    row.append(card);
  }
  fragment.append(row);
  return fragment;
}

export default function PeerCards() {
  const container = useRef(null);
  const advance = useRef(null);
  const touch = useRef(null);
  useLayoutEffect(()=>{
    const host=container.current;
    const root=host.shadowRoot || host.attachShadow({mode:'open'});
    root.replaceChildren(createPeerRow());
    const row=root.querySelector('.peer-row');
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    let animation,visible=false;
    function syncVisibility(){
      const count=Number(getComputedStyle(row).getPropertyValue('--visible'));
      [...row.children].forEach((card,i)=>{card.inert=i>=count});
    }
    function step(direction){
      if(animation)return;
      if(direction<0)row.prepend(row.lastElementChild);
      const width=row.children[1].offsetLeft-row.children[0].offsetLeft;
      const shifted='translateX(-'+width+'px)';
      const finish=()=>{
        if(direction>0)row.append(row.firstElementChild);
        syncVisibility();
        animation=null;
      };
      if(motion.matches){finish();return}
      animation=row.animate(direction>0?[{transform:'none'},{transform:shifted}]:[{transform:shifted},{transform:'none'}],
        {duration:440,easing:'cubic-bezier(.25,.72,.24,1)'});
      animation.onfinish=finish;
    }
    advance.current=step;
    syncVisibility();
    const size=new ResizeObserver(syncVisibility);
    size.observe(host);
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting});
    observer.observe(host);
    const timer=setInterval(()=>{
      if(visible && !document.hidden && !motion.matches && !root.activeElement && !host.matches(':hover') && !host.parentElement.matches(':focus-within'))step(1);
    },6200);
    return ()=>{clearInterval(timer);observer.disconnect();size.disconnect();animation?.cancel();advance.current=null};
  },[]);
  return <div className="portal-peer-strip" role="region" aria-roledescription="轮播" aria-label="科研同行使用场景">
    <div ref={container} className="portal-peers" tabIndex={0} aria-label="同行卡片，可用左右方向键切换"
      onKeyDown={e=>{if(e.target===e.currentTarget && ['ArrowLeft','ArrowRight'].includes(e.key)){
        e.preventDefault();advance.current?.(e.key==='ArrowRight'?1:-1);
      }}}
      onTouchStart={e=>{touch.current=[e.touches[0].clientX,e.touches[0].clientY]}}
      onTouchCancel={()=>{touch.current=null}}
      onTouchEnd={e=>{
        if(!touch.current)return;
        const dx=e.changedTouches[0].clientX-touch.current[0],dy=e.changedTouches[0].clientY-touch.current[1];
        if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)*1.5)advance.current?.(dx<0?1:-1);
        touch.current=null;
      }}/>
  </div>;
}
