import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, FileImage, RectangleHorizontal, SlidersHorizontal } from 'lucide-react';
import { Button, Modal } from '../design-preview/components.jsx';

const RATIOS=['自动','16:9','4:3','1:1','9:16'];
const FORMATS=['自动','PNG','JPG','PDF','SVG'];
const PALETTES=[
 {label:'自动',colors:['#a5b2c7','#c6d2df','#e1e7ee','#edf0f4']},
 {label:'Nature 参考（NPG）',colors:['#e64b35','#4dbbd5','#00a087','#3c5488']},
 {label:'暖色学术',colors:['#ba5543','#dd9375','#d8b078','#f0d9b5']},
 {label:'冷色学术',colors:['#436b95','#65a6ab','#a5c7d0','#dce8ee']},
 {label:'黑白灰',colors:['#262a31','#68717f','#b2bac5','#eef0f3']},
];
const ADVANCED=[['style','视觉风格',['自动','学术简约','扁平插画','线稿示意','三维质感','医学写实']],['lang','标签语言',['自动','中文','英文','中英双语']],['bg','图片背景',['自动','纯白','透明','深色']]];
function Swatches({colors}){return <span className="ds-draw-swatches" aria-hidden="true">{colors.map(color=><i style={{backgroundColor:color}} key={color}/>)}</span>;}

export function DrawingControls({values,onChange}){
 const [open,setOpen]=useState(null);const root=useRef(null),trigger=useRef(null);
 const palette=PALETTES.find(p=>p.label===values.color)||PALETTES[0];
 useEffect(()=>{if(!open||open==='advanced')return;const outside=e=>{if(!root.current?.contains(e.target))setOpen(null);};document.addEventListener('pointerdown',outside);return()=>document.removeEventListener('pointerdown',outside);},[open]);
 function close(){setOpen(null);trigger.current?.focus();}
 function toggle(key,e){trigger.current=e.currentTarget;setOpen(value=>value===key?null:key);if(key!=='advanced')requestAnimationFrame(()=>root.current?.querySelector('[role=menuitemradio][aria-checked=true]')?.focus());}
 function choose(key,value){onChange(key,value);close();}
 function keys(e){if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close();}if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)&&open){const menu=root.current?.querySelector('[role=menu]');if(!menu)return;e.preventDefault();const items=[...menu.querySelectorAll('button')],i=items.indexOf(document.activeElement),next=e.key==='Home'?0:e.key==='End'?items.length-1:(i+(e.key==='ArrowUp'?-1:1)+items.length)%items.length;items[next]?.focus();}}
 return <div className="ds-draw-controls" ref={root} onKeyDown={keys}>
  <div className="ds-draw-control"><button type="button" className="sp-tool-select" aria-label={'绘图比例：'+values.ratio} aria-haspopup="menu" aria-expanded={open==='ratio'} onClick={e=>toggle('ratio',e)}><RectangleHorizontal size={16}/><span>比例 · {values.ratio}</span><ChevronDown size={12}/></button>{open==='ratio'&&<div className="ds-draw-menu" role="menu" aria-label="绘图比例">{RATIOS.map(value=><button type="button" role="menuitemradio" aria-checked={values.ratio===value} key={value} onClick={()=>choose('ratio',value)}><span className="ds-draw-ratio-icon" aria-hidden="true"><i style={{width:value==='9:16'?9:16,aspectRatio:value==='自动'?'4/3':value.replace(':','/')}}/></span><span>{value}</span>{values.ratio===value&&<Check size={16}/>}</button>)}</div>}</div>
  <div className="ds-draw-control"><button type="button" className="sp-tool-select" aria-label={'绘图配色：'+values.color} title={values.color} aria-haspopup="menu" aria-expanded={open==='color'} onClick={e=>toggle('color',e)}><Swatches colors={palette.colors}/><span>色块配色</span><ChevronDown size={12}/></button>{open==='color'&&<div className="ds-draw-menu" role="menu" aria-label="绘图配色">{PALETTES.map(item=><button type="button" role="menuitemradio" aria-checked={values.color===item.label} key={item.label} onClick={()=>choose('color',item.label)}><Swatches colors={item.colors}/><span>{item.label}</span>{values.color===item.label&&<Check size={16}/>}</button>)}</div>}</div>
  <div className="ds-draw-control"><button type="button" className="sp-tool-select" aria-label={'图片格式：'+values.format} aria-haspopup="menu" aria-expanded={open==='format'} onClick={e=>toggle('format',e)}><FileImage size={16}/><span>图片格式{values.format==='自动'?'':' · '+values.format}</span><ChevronDown size={12}/></button>{open==='format'&&<div className="ds-draw-menu ds-draw-format-menu" role="menu" aria-label="图片格式">{FORMATS.map(value=><button type="button" role="menuitemradio" aria-checked={values.format===value} key={value} onClick={()=>choose('format',value)}><span>{value}</span>{values.format===value&&<Check size={16}/>}</button>)}</div>}</div>
  <button type="button" className="sp-tool-select" aria-haspopup="dialog" onClick={e=>toggle('advanced',e)}><SlidersHorizontal size={16}/><span>高级设置</span></button>
  {open==='advanced'&&<Modal title="高级设置" onClose={close}><div className="ds-draw-advanced">{ADVANCED.map(([key,label,options])=><section key={key} role="group" aria-label={label}><h3>{label}</h3><div>{options.map(value=><button type="button" aria-pressed={values[key]===value} key={value} onClick={()=>onChange(key,value)}>{value}</button>)}</div></section>)}</div><div className="sp-dialog-actions"><Button onClick={()=>{['style','lang','bg'].forEach(key=>onChange(key,'自动'));}}>恢复默认</Button><Button variant="primary" onClick={close}>完成</Button></div></Modal>}
 </div>;
}
