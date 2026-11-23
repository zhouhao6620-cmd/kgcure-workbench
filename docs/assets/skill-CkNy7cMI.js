const e=`<!doctype html>
<html lang="zh-CN"><head><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; font-src data:; base-uri 'none'; form-action 'none'"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>SCI 论文精读与证据核验 Skill · 数愈科研</title><style>/* KGcure · Detail V6
   Source: workbench design-system. User overrides: 1280px / 260px rail / 16px tabs / 12px minimum. */
:root{--ds-primary:#3964fe;--ds-primary-hover:#2f55e7;--ds-ink:#0f1115;--ds-secondary:#626873;--ds-muted:#8791a0;--ds-line:#e2e5eb;--ds-card-line:#eef0f4;--ds-sidebar:#f9fafb;--ds-nav-selected:#f0f2f5;--ds-radius-card:10px;--ds-radius-control:6px;--green:#287a43;--green-soft:#f0f9ed;--amber:#98641e;--rose:#bf3542;--violet:#8051b7;--brand:var(--ds-primary);--text:var(--ds-ink);--muted:var(--ds-secondary);--border:var(--ds-line);--surface:#f7f8fa;--radius:10px;--workspace-width:1280px}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:88px;color-scheme:light}body{margin:0;background:#fff;color:var(--ds-ink);font-family:"PingFang SC","Microsoft YaHei","Noto Sans CJK SC",system-ui,sans-serif;font-size:14px;line-height:1.6;-webkit-font-smoothing:antialiased}button,input{font:inherit}button{cursor:pointer}button,a{-webkit-tap-highlight-color:transparent}a{color:inherit;text-decoration:none}button:focus-visible,a:focus-visible{outline:2px solid var(--ds-primary);outline-offset:4px}h1,h2,h3,h4,p{margin:0}button{color:inherit}svg{flex:none}.svg-sprite{position:absolute;width:0;height:0;overflow:hidden}.ic,.icon{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;vertical-align:middle}.ds-icon{width:20px;height:20px;fill:none;stroke:none;vertical-align:middle}[hidden]{display:none!important}
/* Existing workbench shell */
.sp-sidebar{position:fixed;inset:0 auto 0 0;width:260px;display:flex;flex-direction:column;padding:0 12px;background:var(--ds-sidebar);border-right:1px solid #edf0f3;z-index:50;transition:transform .18s ease}.sp-sidebar-head{height:60px;flex:none;display:flex;align-items:center;justify-content:space-between}.sp-brand{position:relative;width:154px;height:52px;overflow:hidden;border:0;background:transparent;display:block}.sp-brand img{position:absolute;left:-13.8px;top:-2px;width:156.6px;height:auto}.icon-button{width:30px;height:30px;border:0;border-radius:6px;display:inline-grid;place-items:center;background:transparent;color:#76808e}.icon-button:hover{background:#eef0f4;color:#172130}.icon-button .ic{width:17px;height:17px}.sp-new-task{width:100%;height:40px;margin:6px 0 24px;border:0;border-radius:100px;background:#fff;box-shadow:0 1px 4px #17233a14;display:flex;align-items:center;justify-content:center;gap:8px;font-weight:600;position:relative}.sp-new-task kbd{position:absolute;right:13px;font-family:inherit;font-size:12px;font-weight:400;color:#939baa}.sp-sidebar-scroll{flex:1;overflow-y:auto;min-height:0;scrollbar-width:thin}.sp-main-nav{display:grid;gap:2px}.sp-nav-link{border:0;background:none;display:flex;align-items:center;gap:11px;min-height:40px;padding:0 10px;border-radius:8px;font-size:14px;font-weight:400;text-align:left}.sp-nav-link .ic,.sp-nav-link .ds-icon{width:18px;height:18px;color:#657080}.sp-nav-link:hover{background:#eff1f4}.sp-nav-link.is-active{background:var(--ds-nav-selected);font-weight:500}.sp-nav-link.is-active .ds-icon{color:var(--ds-primary)}.new-pill{font-size:12px;color:var(--ds-primary);margin-left:auto}.sp-nav-heading{font-size:14px;font-weight:400;color:#828b98;padding:15px 10px 6px}.sp-nav-section-head{display:flex;align-items:center;justify-content:space-between;margin-top:15px;padding:4px 6px 4px 10px;color:#828b98}.sp-nav-section-head>span{font-size:14px;display:flex;align-items:center;gap:6px}.sp-nav-section-head>div{display:flex;align-items:center;gap:5px}.sp-nav-section-head .ic{width:14px;height:14px}.small-action{font-size:12px;border:0;background:none;color:#8791a0;padding:4px}.sp-history-link{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding:8px 10px;border-radius:7px;font-size:14px;color:#5c6470}.sp-history-link:hover{background:#eff1f4}.sp-account-footer{flex:none;margin-top:16px;padding:12px 5px 14px;border-top:1px solid #eef0f3;display:flex;align-items:center;gap:10px}.sp-account-footer img{width:32px;height:32px;object-fit:cover;border-radius:50%}.account-copy{flex:1;display:flex;align-items:center;gap:8px}.account-copy strong{font-size:14px;font-weight:500}.account-copy span{padding:1px 5px;font-size:12px;border:1px solid #d9dee9;border-radius:4px;color:#768398}.sp-account-footer>.ic{width:15px;height:15px;color:#7b8492}
.work-area{margin-left:260px;min-width:0;transition:margin .18s ease}.work-topbar{height:60px;border-bottom:1px solid #f0f1f4;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:16px}.top-left{display:flex;align-items:center;gap:12px;color:#6e7784;font-size:14px}.top-left strong{font-weight:500;color:var(--ds-ink)}.top-left .top-divider{color:#c5cbd4}.top-left>.ic{width:17px;height:17px}.top-right{display:flex;align-items:center;gap:14px}.preview-state{font-size:12px;color:#8d96a3}.page-switch{display:flex;align-items:center;gap:3px;border:1px solid #e6e9ef;border-radius:6px;padding:3px;background:#f8f9fb}.page-switch a{font-size:12px;line-height:24px;padding:0 10px;border-radius:4px;color:#7b8492}.page-switch a.current{color:#242b35;background:#fff;box-shadow:0 1px 3px #17233a12}.open-sidebar{display:none}.scrim{display:none}.detail-page{width:calc(100% - 48px);max-width:var(--workspace-width);margin:0 auto;padding:32px 0 32px}
/* Open profile header */
.hero{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:24px;align-items:stretch;padding-bottom:30px}.hero-primary{display:flex;flex-direction:column;align-items:flex-start;min-width:0}.hero-kicker{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:16px}.kind-badge,.category-badge{display:inline-flex;align-items:center;gap:7px;padding:5px 10px;border-radius:4px;font-size:14px;font-weight:500;line-height:22px}.kind-badge{background:#edf3fe;color:var(--ds-primary)}.kind-badge .ds-icon{width:20px;height:20px}.kind-badge.agent{color:#8e601c;background:#fbf4e8}.category-badge{background:#f2f4f7;color:#465161;font-weight:400}.hero h1{font-size:32px;line-height:1.4;letter-spacing:-.025em;font-weight:650;max-width:900px}.hero-lead{font-size:15px;line-height:1.85;color:#626b78;max-width:760px;margin-top:14px}.hero-byline{display:flex;align-items:center;flex-wrap:wrap;gap:10px;color:#838d9a;font-size:12px;margin-top:18px}.hero-byline i{height:10px;width:1px;background:#d7dce3}.hero-actions{margin-top:auto;padding-top:24px;display:flex;align-items:center;gap:9px}.primary-btn,.secondary-btn{height:38px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:0 14px;font-size:14px;border:1px solid transparent;white-space:nowrap}.primary-btn{background:var(--ds-primary);color:white}.primary-btn:hover{background:var(--ds-primary-hover)}.secondary-btn{background:#fff;border-color:#e2e5eb;color:#626873}.secondary-btn:hover{background:#f7f9fc;border-color:#d3dbe7}.secondary-btn[aria-pressed=true]{color:var(--ds-primary);background:#edf3fe;border-color:#d3dfff}.primary-btn .ic,.secondary-btn .ic{width:16px;height:16px}.hero-aside{border:1px solid var(--ds-line);border-radius:10px;padding:18px;background:#fbfcfe;display:flex;flex-direction:column;min-width:0}.hero-panel-title{font-size:14px;font-weight:600;display:flex;align-items:center;gap:7px}.hero-panel-title .ic{width:16px;height:16px;color:#8491a2}.rating-large{display:flex;align-items:baseline;gap:7px;margin-top:16px}.rating-large strong{font-size:58px;line-height:1.1;letter-spacing:-3px;font-weight:650}.rating-large span{font-size:14px;color:#8a94a2}.rating-stars{position:relative;width:max-content;margin-top:6px;font-family:Arial,sans-serif;letter-spacing:4px;font-size:24px;line-height:32px;color:#e4e7ed}.rating-stars .stars-filled{position:absolute;inset:0 auto 0 0;width:94%;overflow:hidden;white-space:nowrap;color:#e5a23b}.rating-note{margin-top:11px;font-size:13px;color:#7b8695}.panel-link{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:var(--ds-primary);padding-top:16px;margin-top:auto}.panel-link .ic{width:15px;height:15px}.panel-link:hover{text-decoration:underline}.hero-capabilities{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px 8px;margin-top:19px}.hero-capability{display:flex;align-items:center;gap:8px;min-width:0}.hero-capability>.ic{width:24px;height:24px;padding:4px;box-sizing:content-box;border-radius:7px;background:#eef3ff;color:#3964fe}.hero-capability:nth-child(2)>.ic{color:#287a43;background:#eff7f1}.hero-capability:nth-child(3)>.ic{color:#a47128;background:#fff5e7}.hero-capability:nth-child(4)>.ic{color:#8051b7;background:#f4effc}.hero-capability span{font-size:13px;line-height:1.5;max-width:56px}.hero-kpis{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;border-top:1px solid #e8ecf3;margin-top:auto;padding-top:16px}.hero-kpis strong{display:block;font-size:17px;line-height:26px;font-weight:600;color:#354150;white-space:nowrap}.hero-kpis span{display:block;font-size:12px;color:#8a94a2;white-space:nowrap}.hero-agent .hero-kpis{margin-top:21px}
/* 16px anchor navigation and shared body */
.anchor-nav{display:flex;gap:27px;border-bottom:1px solid var(--ds-line);position:sticky;top:0;z-index:25;background:rgba(255,255,255,.97);backdrop-filter:blur(12px);overflow-x:auto;scrollbar-width:none}.anchor-nav::-webkit-scrollbar{display:none}.anchor-nav a{font-size:16px;line-height:24px;white-space:nowrap;padding:17px 0 15px;color:#707987;border-bottom:2px solid transparent;flex:none}.anchor-nav a:hover{color:#1b2638}.anchor-nav a.current{color:#141b26;font-weight:600;border-bottom-color:#141b26}.detail-grid{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:24px;align-items:start;padding-top:34px}.detail-main{min-width:0;container-type:inline-size;container-name:detail}.content-section{scroll-margin-top:84px;margin-bottom:46px;min-width:0}.content-section:last-child{margin-bottom:0}.section-heading{margin:0 0 18px}.section-heading-top{display:flex;align-items:baseline;gap:12px}.section-heading h2,.section-no{font-size:22px;line-height:32px;font-weight:600;letter-spacing:-.02em}.section-no{color:#a9b2bf;font-variant-numeric:tabular-nums;font-weight:500}.ability-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.ability-card{border:1px solid #e7ebf1;border-radius:10px;padding:18px;display:flex;align-items:flex-start;gap:13px;background:#fff;min-width:0}.ability-icon{width:38px;height:38px;border-radius:8px;display:grid;place-items:center;background:#edf3fe;color:#3964fe;flex:none}.ability-card:nth-child(2) .ability-icon{background:#f0f9ed;color:#287a43}.ability-card:nth-child(3) .ability-icon{background:#fff6e8;color:#a65b08}.ability-card:nth-child(4) .ability-icon{background:#f4effc;color:#8051b7}.ability-icon .ic{width:22px;height:22px}.ability-card h3{font-size:15px;line-height:24px;font-weight:600}.ability-card p{font-size:13px;line-height:21px;color:#788292;margin-top:4px}.ability-text{min-width:0}.feature-highlights{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:18px;padding-top:17px;border-top:1px solid #edf0f4}.feature-highlight{display:flex;align-items:flex-start;gap:9px}.feature-highlight .ic{width:18px;height:18px;color:#8998ad;margin-top:1px}.feature-highlight strong{font-size:13px;font-weight:500;display:block}.feature-highlight p{font-size:12px;color:#8791a0;margin-top:3px;line-height:19px}
.skill-capability-layout{display:grid;grid-template-columns:220px minmax(0,1fr);gap:16px;align-items:stretch}.repository{background:#151920;border:1px solid #222936;color:#ebeff5;border-radius:10px;padding:19px 17px;font-size:13px;min-width:0}.repository-heading{display:flex;align-items:center;gap:8px;color:#8e9cae;font-size:12px;letter-spacing:.035em}.repository-heading .ic{width:15px;height:15px}.repository-root{font-family:ui-monospace,"SFMono-Regular",Consolas,monospace;font-size:13px;font-weight:600;margin:18px 0 12px;display:flex;align-items:center;gap:8px}.repository-root .ic{width:16px;height:16px;color:#87aaff}.repository-tree{list-style:none;margin:0 0 0 7px;padding:0 0 0 17px;border-left:1px solid #3a4350}.repository-tree li{position:relative;padding:3px 0 8px}.repository-tree li:before{content:"";position:absolute;width:12px;height:1px;background:#3a4350;left:-17px;top:14px}.repository-tree strong{font-size:13px;font-family:ui-monospace,"SFMono-Regular",Consolas,monospace;font-weight:400;display:block}.repository-tree li:first-child strong{color:#99b8ff}.repository-tree span{display:block;font-size:12px;color:#8f9daf;margin-top:1px}.skill-capability-layout .ability-card{padding:17px 15px;flex-direction:column;gap:11px}.skill-capability-layout .ability-icon{width:32px;height:32px}
/* Audience and boundaries */
.fit-grid{display:grid;grid-template-columns:1fr 1fr;border:1px solid #e5e9ef;border-radius:10px;overflow:hidden}.fit-audience,.fit-boundaries{padding:20px}.fit-boundaries{border-left:1px solid #e5e9ef;background:#fcfcfd}.fit-grid h3{font-size:14px;font-weight:600;display:flex;align-items:center;gap:8px;margin-bottom:17px}.fit-grid h3 .ic{width:17px;height:17px;color:#7d8da4}.audience-list{display:grid;gap:17px}.audience-item{display:flex;gap:12px;align-items:center}.audience-glyph{width:36px;height:36px;border-radius:50%;background:#f1f4f9;display:grid;place-items:center;color:#7285a4;flex:none}.audience-glyph .ic{width:19px;height:19px}.audience-item strong{display:block;font-size:14px;font-weight:500}.audience-item span{display:block;font-size:12px;color:#85909e;line-height:20px;margin-top:2px}.fit-boundaries ul{list-style:none;padding:0;margin:0;display:grid;gap:18px}.fit-boundaries li{display:flex;gap:10px;align-items:flex-start;font-size:13px;color:#697382;line-height:23px}.fit-boundaries li .ic{color:#b99258;width:16px;height:16px;margin-top:3px}
/* Materials: official document cards are appended from workbench source */
.materials-group+.materials-group{margin-top:24px}.materials-heading{display:flex;align-items:center;gap:9px;margin-bottom:12px}.materials-heading h3{font-size:15px;font-weight:500}.materials-heading .ic{width:18px;height:18px;color:#7185a1}.materials-heading .materials-count{font-size:12px;color:#96a0af;margin-left:auto}.materials-files{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.materials-heading.outputs .ic{color:#45966e}
/* restrained assessment */
.subhead-inline{display:flex;align-items:center;justify-content:space-between;gap:15px;margin:0 0 12px}.subhead-inline h3{font-size:14px;font-weight:500}.sample-case-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:20px}.sample-case{background:#f8f9fb;padding:13px 12px;border-radius:6px;min-width:0;border:1px solid #f0f2f5}.sample-top{display:flex;justify-content:space-between;gap:5px;color:#8793a4;font-size:12px;margin-bottom:8px}.sample-top small{font-size:12px;color:#a5aeba}.sample-case strong{font-size:13px;font-weight:500;display:block;line-height:22px}.sample-case p{font-size:12px;color:#8791a0;margin-top:4px;line-height:20px}.eval-shell{display:grid;grid-template-columns:300px minmax(0,1fr);gap:24px;border:1px solid #e5e9ef;border-radius:10px;padding:22px}.eval-graphic{display:flex;align-items:center;flex-direction:column;justify-content:center;min-width:0}.eval-title{font-size:14px;font-weight:500;align-self:flex-start;margin-bottom:11px}.eval-graphic svg{display:block;width:270px;height:230px;max-width:none}.eval-detail{display:grid;gap:14px;align-content:center}.dimension-row>div:first-child{display:flex;align-items:center;justify-content:space-between;gap:12px}.dimension-row strong{font-size:14px;font-weight:500}.dimension-row>div>span{font-size:12px;color:#7c8796;font-variant-numeric:tabular-nums}.dimension-meter{height:4px;background:#edf1f6;border-radius:10px;margin-top:8px;overflow:hidden}.dimension-meter i{display:block;height:100%;border-radius:10px;background:#6b88f8}.dimension-meter i.amber{background:#c69b5e}.dimension-row p{font-size:12px;color:#8791a0;margin-top:5px;line-height:19px}.eval-verdict{margin-top:12px;padding:15px 18px;background:#f5f8fe;border-radius:8px;display:flex;gap:16px;align-items:flex-start}.eval-verdict>span{display:flex;align-items:center;gap:7px;white-space:nowrap;color:#4567bb;font-size:13px;font-weight:500}.eval-verdict .ic{width:17px;height:17px}.eval-verdict p{font-size:13px;color:#6b7788;line-height:23px}.eval-verdict p strong{font-weight:500;color:#43526b}.method-block{margin-top:25px;border-top:1px solid #eceff4;padding-top:20px}.method-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}.method-title h3{font-size:16px;font-weight:600}.method-block h4{font-size:13px;font-weight:500;color:#7c8795;margin:17px 0 11px}.method-coverage,.method-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}.protocol-coverage,.protocol-step{padding:13px;border-radius:7px;background:#f8f9fb;min-width:0}.protocol-coverage>.ic{color:#7890b0;width:19px;height:19px;margin-bottom:7px}.protocol-coverage strong,.protocol-step strong{display:block;font-size:13px;font-weight:500}.protocol-coverage p,.protocol-step p{font-size:12px;line-height:20px;color:#8893a1;margin-top:4px}.protocol-step{position:relative;background:white;border:1px solid #e8ecf3}.step-symbol{display:flex;margin-bottom:8px;color:#7890b0}.step-symbol .ic{width:18px;height:18px}.protocol-step:not(:last-child):after{content:"→";position:absolute;right:-12px;top:24px;font-size:16px;color:#a3b3c8;z-index:1;background:white}.method-note{margin-top:14px;display:flex;align-items:flex-start;gap:8px;font-size:12px;color:#8d96a2;line-height:20px}.method-note .ic{width:15px;height:15px;margin-top:2px}
/* Preserved reference comparison */
.penetration-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.pen-card{border-radius:10px;border:1px solid var(--ds-line);background:white;overflow:hidden;display:flex;flex-direction:column;min-width:0}.pen-card.is-prompt{border-color:#f2d5dc}.pen-card.is-good,.pen-card.is-agent{border-color:#c8e2d6}.pen-head{padding:14px 15px;display:flex;align-items:center;justify-content:space-between;gap:7px;border-bottom:1px solid #eef0f4;flex-wrap:wrap}.pen-card.is-prompt .pen-head{background:#fff7f8;border-bottom-color:#f2d5dc}.pen-card.is-good .pen-head,.pen-card.is-agent .pen-head{background:#f3faf6;border-bottom-color:#c8e2d6}.pen-head strong{font-size:14px;font-weight:600}.pen-tag{font-size:12px;padding:2px 5px;border-radius:4px;white-space:nowrap}.pen-card.is-prompt .pen-tag{color:#b76b7c;background:#fff0f2}.pen-card.is-good .pen-tag,.pen-card.is-agent .pen-tag{color:#408b6a;background:#eaf6ef}.pen-svg-wrap{padding:13px 11px;background:#fcfcfd;overflow-x:auto}.pen-svg-wrap svg{display:block;width:100%;min-width:320px;height:auto}.pen-points{margin:0;padding:16px;list-style:none;display:grid;gap:12px;border-top:1px solid #eef0f4}.pen-points li{display:flex;align-items:flex-start;gap:8px;font-size:13px;line-height:1.8;color:#687384}.pen-points li strong{font-weight:500;color:#384454}.pen-dot{width:18px;height:18px;margin-top:3px;border-radius:50%;display:grid;place-items:center;flex:none;font-size:12px;font-weight:600}.pen-card.is-prompt .pen-dot{background:#ffedf0;color:#be2d45}.pen-card.is-good .pen-dot,.pen-card.is-agent .pen-dot{background:#e4f3eb;color:#087f5b}
/* A single quiet peer carousel */
.right-rail{position:sticky;top:86px;min-width:0}.peer-heading{font-size:18px;font-weight:600;line-height:32px;margin:0 0 18px}.peer-carousel{border:1px solid #e4e9f0;border-radius:10px;background:#fff;overflow:hidden}.peer-slide{padding:18px 16px 15px;min-height:212px}.peer-person{display:flex;align-items:center;gap:10px}.peer-person img{width:38px;height:38px;object-fit:cover;border-radius:50%;flex:none}.peer-identity{flex:1;min-width:0}.peer-identity>div{display:flex;align-items:center;justify-content:space-between;gap:6px}.peer-identity strong{font-size:14px;font-weight:600}.peer-identity time{font-size:12px;color:#9aa3b0;white-space:nowrap}.peer-org{font-size:12px;color:#8791a0;margin-top:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.peer-credentials{display:flex;gap:5px;align-items:center;font-size:12px;color:#7e8c9e;margin-top:12px}.peer-credentials .ic{width:13px;height:13px;color:#899caf}.peer-task{margin-top:15px;padding-top:14px;border-top:1px solid #edf0f5;font-size:13px}.peer-task .used{font-size:12px;color:#97a0ad;margin-right:4px}.capability-link{display:inline-flex;align-items:center;gap:6px;color:#3964fe;font-size:14px;font-weight:500;max-width:100%;vertical-align:middle;border-radius:4px}.capability-link.agent{color:#956721}.capability-link .ds-icon{width:17px;height:17px}.capability-link .ic{width:12px;height:12px;opacity:0;transition:opacity .15s}.capability-link:hover{text-decoration:underline;text-underline-offset:4px}.capability-link:hover .ic,.capability-link:focus-visible .ic{opacity:1}.peer-task p{font-size:13px;color:#6a7585;line-height:23px;margin-top:9px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-height:46px}.peer-controls{display:flex;align-items:center;gap:8px;padding:10px 13px;border-top:1px solid #eff2f6;background:#fcfcfd}.peer-dots{display:flex;gap:5px;align-items:center}.peer-dot{border:0;padding:0;width:5px;height:5px;background:#dce2eb;border-radius:10px}.peer-dot.is-current{width:14px;background:#6b82be}.peer-count{font-size:12px;color:#abb2bf;margin-left:auto;font-variant-numeric:tabular-nums}.peer-count [data-slide-index]{color:#718098}.peer-arrows{display:flex;gap:3px}.peer-arrows button{height:26px;width:26px;border:1px solid #e6eaf1;border-radius:5px;display:grid;place-items:center;background:white;color:#8791a2}.peer-arrows button:hover{border-color:#9fb3e7;color:#3964fe}.peer-arrows .ic{width:14px;height:14px}
/* Four existing case entry cards */
.cases-section{margin-top:44px;padding-top:30px;border-top:1px solid #e6eaf0;scroll-margin-top:84px}.cases-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.actual-case-card{display:block;text-align:left;border:1px solid #e4e9f0;border-radius:10px;overflow:hidden;min-width:0;transition:border-color .15s,box-shadow .15s;background:white;cursor:pointer}.actual-case-card:hover{border-color:#bacbed;box-shadow:0 4px 15px #233a6210}.case-preview{position:relative;height:144px;display:flex;align-items:center;justify-content:center;background:#f4f7fc;padding-top:16px}.case-preview svg{display:block;width:210px;max-width:95%;height:auto}.case-category{position:absolute;left:13px;top:12px;font-size:12px;color:#71839f}.tone-2{background:#f2f8f5}.tone-3{background:#f6f4fb}.tone-4{background:#faf7f1}.case-copy{padding:15px 14px 16px}.case-copy h3{font-size:14px;font-weight:500;line-height:23px;min-height:46px}.case-copy p{font-size:12px;color:#8f99a6;margin-top:7px}.page-footnote{margin-top:28px;padding-top:18px;border-top:1px solid #eff1f5;display:flex;justify-content:space-between;gap:20px;font-size:12px;color:#9aa3af;line-height:20px}.page-footnote p{max-width:910px}.page-footnote>span{white-space:nowrap}.mock-toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(12px);max-width:calc(100vw - 32px);padding:11px 17px;border-radius:8px;background:#192332;color:white;font-size:13px;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;z-index:100;box-shadow:0 5px 25px #10223925}.mock-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
/* Reflow rather than shrinking text */
.sidebar-collapsed .sp-sidebar{transform:translateX(-100%)}.sidebar-collapsed .work-area{margin-left:0}.sidebar-collapsed .open-sidebar{display:inline-grid}
@container detail (max-width:820px){.skill-capability-layout{grid-template-columns:200px minmax(0,1fr)}.skill-capability-layout .ability-card{padding:14px 12px}.skill-capability-layout .ability-card h3{font-size:14px}.eval-shell{grid-template-columns:270px minmax(0,1fr);gap:18px;padding:18px}.sample-case-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@container detail (max-width:740px){.skill-capability-layout{grid-template-columns:1fr}.repository{display:grid;grid-template-columns:180px 1fr;gap:0 18px}.repository-heading{grid-column:1}.repository-root{grid-column:1;margin:14px 0 0;align-self:start}.repository-tree{grid-column:2;grid-row:1 / 3;display:grid;grid-template-columns:1fr 1fr;gap:7px 15px;border:0;padding:0;margin:0}.repository-tree li{padding:0}.repository-tree li:before{display:none}.skill-capability-layout .ability-card{flex-direction:row;gap:12px;padding:17px}.penetration-grid{grid-template-columns:1fr}.eval-shell{grid-template-columns:1fr;padding:20px}.eval-graphic{align-items:center}.eval-title{align-self:center}.eval-detail{grid-template-columns:1fr 1fr;gap:20px}.feature-highlights{gap:12px}.fit-audience,.fit-boundaries{padding:17px}}
@container detail (max-width:530px){.fit-grid{grid-template-columns:1fr}.fit-boundaries{border-left:0;border-top:1px solid #e5e9ef}.materials-files{grid-template-columns:1fr}.ability-grid{grid-template-columns:1fr}.skill-capability-layout .ability-card{align-items:center}.feature-highlights{grid-template-columns:1fr;gap:13px}.repository{display:block}.repository-tree{margin-top:15px;display:grid;grid-template-columns:1fr 1fr;gap:13px}.repository-root{margin-top:15px}.method-coverage,.method-steps{grid-template-columns:repeat(2,minmax(0,1fr))}.protocol-step:after{display:none}.eval-verdict{flex-direction:column;gap:6px}.eval-detail{grid-template-columns:1fr}}
@media(max-width:1280px){.detail-grid{grid-template-columns:minmax(0,1fr)}.right-rail{position:static;margin-top:4px}.peer-carousel{max-width:500px}.peer-slide{min-height:0}.peer-task p{min-height:0}.peer-heading{font-size:18px}.cases-section{margin-top:32px}.hero h1{font-size:30px}}
@media(max-width:1023px){.sp-sidebar{transform:translateX(-100%)}.work-area{margin-left:0}.open-sidebar{display:inline-grid}.sidebar-open .sp-sidebar{transform:translateX(0)}.sidebar-open .scrim{display:block;position:fixed;inset:0;border:0;background:#16233933;z-index:45}.detail-page{padding-top:26px}.hero h1{font-size:29px}.hero-lead{font-size:14px}.anchor-nav{gap:24px}.cases-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.case-copy h3{min-height:0}.hero-kicker{gap:6px}.kind-badge,.category-badge{font-size:13px;padding:4px 8px}}
@media(max-width:760px){.hero{grid-template-columns:minmax(0,1fr);gap:22px}.hero-aside{padding:18px;min-height:0}.hero-skill .hero-aside{display:grid;grid-template-columns:1fr 1fr;gap:0 15px;align-items:center}.hero-skill .hero-panel-title{grid-column:1 / -1}.rating-large{grid-column:1;grid-row:2 / 4;margin-top:14px}.rating-stars{grid-column:2;grid-row:2;font-size:23px;letter-spacing:3px;margin-top:14px}.rating-note{grid-column:2;grid-row:3;margin-top:0;font-size:12px}.hero-skill .panel-link{grid-column:1 / -1;padding-top:12px;margin-top:12px;border-top:1px solid #e6eaf2}.hero-capabilities{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.hero-capability{flex-direction:column;align-items:flex-start;gap:7px}.hero-capability span{max-width:none;font-size:13px}.hero-kpis{padding-top:13px;margin-top:16px}.hero-kpis>div{text-align:center}.hero-actions{padding-top:21px}.detail-grid{padding-top:27px}.section-heading h2,.section-no{font-size:21px}.top-left{gap:8px}.top-left>span:not(.top-divider){display:none}.hero h1{font-size:28px}.cases-grid{gap:12px}.page-footnote{display:block}.page-footnote>span{display:block;margin-top:8px}}
@media(max-width:480px){.work-topbar{padding:0 16px;gap:8px}.top-right{gap:8px}.preview-state{display:none}.top-left .top-divider{display:none}.detail-page{width:calc(100% - 32px);padding-top:22px}.hero h1{font-size:26px;line-height:1.45}.hero-lead{line-height:1.8}.hero-byline{gap:7px}.hero-actions{gap:7px}.primary-btn,.secondary-btn{padding:0 11px}.hero-kicker{margin-bottom:13px}.anchor-nav{gap:22px}.anchor-nav a{padding-top:14px;padding-bottom:13px;font-size:16px}.section-heading h2,.section-no{font-size:20px}.section-heading-top{gap:10px}.section-heading{margin-bottom:16px}.content-section{margin-bottom:34px}.cases-grid{grid-template-columns:1fr}.case-preview{height:145px}.case-copy{padding:14px}.case-copy h3{min-height:0}.case-copy p{margin-top:5px}.hero-aside{padding:16px}.rating-large strong{font-size:52px}.rating-stars{font-size:21px;letter-spacing:2px}.repository{padding:17px}.peer-carousel{max-width:none}.peer-slide{padding:17px}.hero-capability>.ic{width:23px;height:23px}.hero-capability span{font-size:12px}.sample-case-grid{gap:8px}.sample-case{padding:12px 10px}.eval-shell{padding:15px}.method-coverage,.method-steps{gap:9px}.pen-head{padding:13px}.pen-svg-wrap{padding:9px 8px}.pen-points{padding:14px}.cases-section{padding-top:25px}.hero-panel-title{font-size:14px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{transition:none!important;animation:none!important}}

/* Exact delivery-card component geometry and effective styling extracted from
   KGcure live CSS index-CyaKEvcR.css, 2026-11-20.
   The saving/downloading controls are omitted per user's request.
   Parent layout may be changed; keep the card/icon/type rules intact. */
.sp-source-deliveries {
  display:grid;
  grid-template-columns:repeat(2,minmax(0,1fr));
  gap:12px;
  margin:16px 0 24px;
}
.sp-source-delivery-card {
  display:flex;
  align-items:center;
  gap:10px;
  min-width:0;
  height:var(--ds-delivery-card-height,80px);
  min-height:var(--ds-delivery-card-height,80px);
  padding:12px;
  overflow:hidden;
  border:1px solid var(--ds-card-line,#eef0f4);
  border-radius:8px;
  background:#fff;
  transition:background-color .16s ease,border-color .16s ease;
}
.sp-source-delivery-card:hover {
  background:#fafbfc;
  border-color:var(--ds-card-hover,#d5ddeb);
}
.sp-delivery-main {
  display:flex;
  align-items:center;
  gap:12px;
  min-width:0;
  flex:1;
  overflow:hidden;
  background:transparent;
  padding:0;
  border:0;
  text-align:left;
}
.sp-delivery-file-icon {
  position:relative;
  display:grid;
  place-items:center;
  flex:none;
  width:30px;
  height:36px;
  border-radius:3px;
  background:var(--delivery-file-color,#64748b);
  box-shadow:inset 0 0 0 1px #0000000a;
  overflow:hidden;
}
.sp-delivery-file-icon.is-markdown {--delivery-file-color:#3478f6}
.sp-delivery-file-icon.is-image {--delivery-file-color:#8b5cf6}
.sp-delivery-file-icon.is-presentation {--delivery-file-color:#f08c24}
.sp-delivery-file-icon.is-word {--delivery-file-color:#2563c9}
.sp-delivery-file-icon.is-pdf {--delivery-file-color:#c93732}
.sp-delivery-file-icon:after {
  content:"";
  position:absolute;
  right:0;
  top:0;
  width:9px;
  height:9px;
  background:#ffffffeb;
  clip-path:polygon(0 0,100% 100%,100% 0);
}
.sp-delivery-file-icon svg {
  position:relative;
  z-index:1;
  width:17px;
  height:17px;
  overflow:visible;
  fill:none;
  stroke:#fff;
  stroke-width:1.8;
  stroke-linecap:round;
  stroke-linejoin:round;
}
.sp-delivery-file-icon svg.sp-delivery-file-letter {fill:#fff;stroke:none}
.sp-delivery-info {display:block;min-width:0}
.sp-delivery-info strong {
  display:block;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  font-size:14px;
  line-height:22px;
  font-weight:600;
  color:#252b34;
}
.sp-delivery-info small {
  display:block;
  font-size:12px;
  line-height:20px;
  color:#939ba6;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  margin-top:3px;
}
@media(max-width:1099px){.sp-source-deliveries{grid-template-columns:1fr}}
@media(max-width:699px){.sp-source-delivery-card{gap:8px}}

.arch-board {
  container-name: agent-architecture;
  container-type: inline-size;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--border, #e2e5eb);
  border-radius: var(--radius, 10px);
  background: #fff;
  color: var(--text, #0f1115);
  font-size: 13px;
  line-height: 1.6;
}
.arch-board *, .arch-board *::before, .arch-board *::after { box-sizing: border-box; }
.arch-inner { padding: 20px; }
.arch-icon { display: inline-block; width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; flex: 0 0 auto; vertical-align: middle; }
.arch-top { display: grid; grid-template-columns: 218px minmax(0, 1fr); gap: 16px; align-items: stretch; }
.arch-package { padding: 18px 16px; border: 1px solid #292e3b; border-radius: 8px; background: #1b1f2a; color: #e7ebf3; }
.arch-package-heading { display: flex; align-items: center; gap: 8px; color: #abb5c6; font-size: 12px; font-weight: 500; letter-spacing: .06em; }
.arch-package-heading .arch-icon { width: 16px; height: 16px; }
.arch-repo-root { display: flex; align-items: center; gap: 7px; margin-top: 17px; }
.arch-repo-root .arch-icon { width: 16px; height: 16px; color: #bdc5d5; }
.arch-repo-root strong { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 13px; font-weight: 600; }
.arch-repo-root > span { margin-left: auto; font-size: 12px; color: #a6b0c1; }
.arch-tree { margin: 10px 0 0 7px; padding: 0; list-style: none; }
.arch-tree li { position: relative; display: flex; align-items: baseline; flex-wrap: wrap; gap: 1px 7px; padding: 3px 0 3px 15px; border-left: 1px solid #515a6d; min-height: 29px; }
.arch-tree li::before { content: ""; position: absolute; left: 0; top: 15px; width: 9px; border-top: 1px solid #515a6d; }
.arch-tree li:last-child { border-left-color: transparent; }
.arch-tree li:last-child::after { content: ""; position: absolute; left: -1px; top: 0; height: 16px; border-left: 1px solid #515a6d; }
.arch-file-name { color: #e1e6f1; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12px; line-height: 1.8; }
.arch-file-name--entry { color: #c8bdff; }
.arch-file-note { color: #aab4c4; font-size: 12px; line-height: 1.8; }
.arch-process { display: grid; grid-template-columns: minmax(0, 1fr) 13px minmax(0, 1fr) 13px minmax(0, 1fr); gap: 6px; align-items: stretch; min-width: 0; }
.arch-step { min-width: 0; padding: 16px 12px 13px; border: 1px solid var(--border, #e2e5eb); border-radius: 8px; background: #fff; display: flex; flex-direction: column; align-items: flex-start; }
.arch-step-icon { display: inline-flex; justify-content: center; align-items: center; width: 32px; height: 32px; margin-bottom: 15px; border-radius: 8px; background: #edf2ff; color: var(--brand, #3964fe); }
.arch-step--core { border-color: #ccd7ff; background: #fafbff; }
.arch-step--core .arch-step-icon { color: #fff; background: var(--brand, #3964fe); }
.arch-step--router .arch-step-icon { color: #805fc6; background: #f1edfa; }
.arch-step h3 { display: flex; gap: 6px; align-items: baseline; flex-wrap: wrap; margin: 0; padding: 0; color: var(--text, #0f1115); font-size: 14px; line-height: 1.6; font-weight: 600; letter-spacing: 0; }
.arch-step-number { color: #8591a6; font-size: inherit; font-weight: 500; }
.arch-step--core .arch-step-number { color: var(--brand, #3964fe); }
.arch-step p { margin: 9px 0 15px; color: var(--muted, #626873); font-size: 13px; line-height: 1.7; }
.arch-step-example { margin-top: auto; padding: 8px 9px; background: var(--surface, #f7f8fa); border-radius: 6px; color: #596273; font-size: 12px; line-height: 1.7; }
.arch-step-note { display: flex; gap: 6px; align-items: center; margin-top: auto; padding: 6px 0 2px; color: #6b7585; font-size: 12px; line-height: 1.6; }
.arch-step-note > span { width: 5px; height: 5px; border-radius: 50%; background: #aebbd2; flex: 0 0 auto; }
.arch-connector { display: flex; align-items: center; justify-content: center; color: #a3aec1; }
.arch-connector .arch-icon { width: 16px; height: 16px; }
.arch-flow-label { display: flex; align-items: center; justify-content: center; gap: 14px; margin: 19px 0 14px; color: #6b7483; font-size: 12px; font-weight: 500; }
.arch-flow-label::before, .arch-flow-label::after { content: ""; height: 1px; flex: 1; background: var(--border, #e2e5eb); }
.arch-flow-label > span { display: inline-flex; gap: 7px; align-items: center; }
.arch-flow-label .arch-icon { width: 16px; height: 16px; color: var(--brand, #3964fe); }
.arch-capabilities { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; }
.arch-capability { --arch-tone: #3b63c7; --arch-tint: #edf2ff; min-width: 0; overflow: hidden; border: 1px solid var(--border, #e2e5eb); border-radius: 8px; background: #fff; }
.arch-capability--analysis { --arch-tone: #9c6b22; --arch-tint: #fbf2e3; }
.arch-capability--evidence { --arch-tone: #26856b; --arch-tint: #eaf5f0; }
.arch-capability--writing { --arch-tone: #805cc4; --arch-tint: #f2edfa; }
.arch-capability--clinical { --arch-tone: #b66a43; --arch-tint: #fcf0e9; }
.arch-capability h4 { display: flex; gap: 7px; align-items: center; margin: 0; padding: 11px 9px 10px; border-bottom: 1px solid #edf0f4; color: #384456; font-size: 14px; font-weight: 600; line-height: 1.5; }
.arch-category-icon { display: inline-flex; justify-content: center; align-items: center; width: 25px; height: 25px; background: var(--arch-tint); border-radius: 6px; color: var(--arch-tone); flex: 0 0 auto; }
.arch-category-icon .arch-icon { width: 16px; height: 16px; }
.arch-skills { display: flex; flex-direction: column; gap: 5px; list-style: none; margin: 0; padding: 8px; }
.arch-skills li { display: flex; gap: 6px; align-items: center; min-height: 30px; margin: 0; padding: 5px 7px; border-radius: 4px; background: var(--surface, #f7f8fa); color: #596476; font-size: 12px; line-height: 1.6; }
.arch-skills li::before { content: ""; width: 4px; height: 4px; border-radius: 50%; background: #a5b0c2; flex: 0 0 auto; }
.arch-tools { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
.arch-tool { padding: 12px; min-width: 0; border: 1px solid var(--border, #e2e5eb); border-radius: 8px; background: #fafbfc; }
.arch-tool h4 { display: flex; align-items: center; gap: 7px; margin: 0 0 10px; color: #455163; font-size: 14px; font-weight: 600; line-height: 1.6; }
.arch-tool h4 .arch-icon { width: 15px; height: 15px; color: #8a95a6; }
.arch-tool-items { display: flex; gap: 6px; flex-wrap: wrap; }
.arch-tool-items > span { display: inline-flex; align-items: center; min-height: 27px; padding: 3px 6px; border: 1px solid #e7eaf0; border-radius: 4px; background: #fff; color: #6a7586; font-size: 12px; line-height: 1.6; overflow-wrap: anywhere; }
.arch-return { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 6px 10px; margin: 17px 0; color: #7a8699; font-size: 12px; line-height: 1.7; }
.arch-return .arch-icon { width: 20px; height: 16px; color: #a0b0c8; }
.arch-return strong { color: #5e6d82; font-size: 12px; font-weight: 500; }
.arch-delivery { display: grid; grid-template-columns: 190px minmax(0, 1fr); gap: 14px; align-items: center; padding: 15px 16px; border: 1px solid #d9e9e3; border-radius: 8px; background: #f4faf7; }
.arch-delivery-lead { display: flex; align-items: center; gap: 10px; min-width: 0; }
.arch-delivery-icon { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 34px; border-radius: 6px; background: #e4f2eb; color: #2b8866; flex: 0 0 auto; }
.arch-delivery-lead strong { color: #275f49; font-size: 14px; line-height: 1.6; font-weight: 600; }
.arch-deliverables { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin: 0; padding: 0; list-style: none; }
.arch-deliverables li { display: flex; align-items: center; gap: 6px; color: #527362; font-size: 12px; line-height: 1.6; }
.arch-deliverables .arch-icon { width: 16px; height: 16px; color: #329872; }

@container agent-architecture (max-width: 880px) {
  .arch-inner { padding: 16px; }
  .arch-top { grid-template-columns: 200px minmax(0, 1fr); gap: 12px; }
  .arch-package { padding: 16px 13px; }
  .arch-tree li { gap: 1px 6px; }
  .arch-file-note { font-size: 12px; line-height: 1.65; }
  .arch-process { gap: 4px; grid-template-columns: minmax(0, 1fr) 10px minmax(0, 1fr) 10px minmax(0, 1fr); }
  .arch-step { padding: 14px 10px 12px; }
  .arch-step h3 { gap: 3px 5px; }
  .arch-capabilities { gap: 8px; }
  .arch-capability h4 { padding-left: 8px; padding-right: 8px; gap: 5px; }
  .arch-category-icon { width: 23px; height: 23px; }
  .arch-skills { padding: 7px; }
  .arch-skills li { padding-left: 5px; padding-right: 5px; gap: 5px; }
  .arch-tool { padding: 10px; }
  .arch-delivery { grid-template-columns: 165px minmax(0, 1fr); padding: 13px; gap: 12px; }
  .arch-deliverables { gap: 8px; }
}
@container agent-architecture (max-width: 740px) {
  .arch-top { grid-template-columns: 1fr; gap: 14px; }
  .arch-package { padding: 16px; }
  .arch-repo-root { margin-top: 13px; }
  .arch-repo-root > span { margin-left: 5px; }
  .arch-tree { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 16px; }
  .arch-tree li { flex-direction: row; gap: 5px 8px; }
  .arch-tree li:last-child { border-left-color: #515a6d; }
  .arch-tree li:last-child::after { display: none; }
  .arch-step { padding: 15px 13px; }
  .arch-step-icon { margin-bottom: 11px; }
  .arch-capabilities { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; }
  .arch-capability { grid-column: span 2; }
  .arch-capability:nth-last-child(-n+2) { grid-column: span 3; }
  .arch-tools { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .arch-tool { padding: 12px; }
  .arch-delivery { grid-template-columns: 1fr; gap: 13px; }
  .arch-delivery-lead strong { font-size: 14px; }
}
@container agent-architecture (max-width: 500px) {
  .arch-inner { padding: 13px; }
  .arch-tree { display: block; }
  .arch-tree li { display: flex; flex-direction: row; gap: 8px; min-height: 30px; padding-top: 3px; padding-bottom: 3px; }
  .arch-tree li:last-child { border-left-color: transparent; }
  .arch-tree li:last-child::after { display: block; }
  .arch-process { grid-template-columns: 1fr; gap: 7px; }
  .arch-step { display: grid; grid-template-columns: 32px minmax(0, 1fr); gap: 0 10px; padding: 14px; }
  .arch-step-icon { grid-column: 1; grid-row: 1 / span 3; margin: 0; }
  .arch-step h3, .arch-step p, .arch-step-example, .arch-step-note { grid-column: 2; }
  .arch-step h3 { margin-top: 2px; }
  .arch-step p { margin: 5px 0 9px; }
  .arch-step-example { margin-top: 0; }
  .arch-step-note { padding-top: 0; }
  .arch-connector { height: 14px; }
  .arch-connector .arch-icon { transform: rotate(90deg); }
  .arch-capabilities { grid-template-columns: 1fr; gap: 9px; }
  .arch-capability, .arch-capability:nth-last-child(-n+2) { grid-column: auto; }
  .arch-capability h4 { padding: 9px 11px; }
  .arch-skills { flex-direction: row; flex-wrap: wrap; gap: 6px; padding: 9px 10px; }
  .arch-skills li { padding: 4px 7px; min-height: 28px; }
  .arch-flow-label { gap: 10px; margin: 16px 0 12px; }
  .arch-tools { grid-template-columns: 1fr; gap: 9px; }
  .arch-tool h4 { margin-bottom: 8px; }
  .arch-return { gap: 4px 7px; margin: 15px 0; }
  .arch-return > span { flex-basis: 100%; text-align: center; }
  .arch-return .arch-icon { transform: rotate(90deg); }
  .arch-deliverables { grid-template-columns: 1fr; gap: 9px; }
  .arch-delivery { padding: 13px; }
}

/* Optional, local front-end architecture demonstration. */
.arch-demo-toolbar { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px 16px; min-height: 59px; padding: 12px 20px; border-bottom: 1px solid var(--border, #e2e5eb); background: #fbfcfe; }
.arch-demo-status { display: flex; align-items: center; flex-wrap: wrap; gap: 7px; color: #596578; font-size: 12px; line-height: 1.6; }
.arch-demo-dot { flex: 0 0 auto; width: 6px; height: 6px; background: #a8b2c3; border-radius: 50%; }
.arch-demo-caption { color: #7c8799; padding-right: 7px; border-right: 1px solid var(--border, #e2e5eb); }
.arch-demo-count { padding-left: 4px; color: #8791a0; font-size: 12px; font-variant-numeric: tabular-nums; white-space: nowrap; }
.arch-demo-controls { display: flex; align-items: center; gap: 7px; }
.arch-demo-button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 32px; margin: 0; padding: 5px 10px; border: 1px solid var(--border, #e2e5eb); border-radius: 6px; background: #fff; color: #5d687b; font: inherit; font-size: 12px; font-weight: 500; line-height: 1.6; white-space: nowrap; cursor: pointer; transition: background .16s, border-color .16s, box-shadow .16s; }
.arch-demo-button .arch-icon { width: 15px; height: 15px; }
.arch-demo-button:hover { border-color: #b5c4e3; background: #f5f8ff; }
.arch-demo-button:focus-visible { outline: 2px solid var(--brand, #3964fe); outline-offset: 3px; }
.arch-demo-play { min-width: 94px; border-color: var(--brand, #3964fe); background: var(--brand, #3964fe); color: #fff; }
.arch-demo-play:hover { border-color: var(--brand, #3964fe); background: var(--brand, #3964fe); box-shadow: 0 0 0 3px #3964fe14; }
.arch-play-shape { fill: currentColor; stroke-width: 1; }
.arch-pause-shape { display: none; stroke-width: 3; }
.arch-is-running .arch-play-shape { display: none; }
.arch-is-running .arch-pause-shape { display: block; }
.arch-is-running .arch-demo-dot { background: var(--brand, #3964fe); animation: arch-dot-pulse 1.2s ease-in-out infinite; }
.arch-is-paused .arch-demo-dot { background: #a48b52; }
.arch-is-complete .arch-demo-dot { background: #2e9c76; }
.arch-is-running [data-arch-status] { color: var(--brand, #3964fe); }
.arch-is-complete [data-arch-status] { color: #268361; }
.arch-step, .arch-package, .arch-capability, .arch-tool, .arch-skills li, .arch-tool-items > span, .arch-delivery, .arch-deliverables li { transition: border-color .24s, background .24s, box-shadow .24s, color .24s; }
.arch-step.arch-visited, .arch-capability.arch-visited, .arch-tool.arch-visited { border-color: #ccdace; background: #fcfdfc; }
.arch-package.arch-visited { border-color: #4f675e; }
.arch-step.arch-active, .arch-capability.arch-active, .arch-tool.arch-active { border-color: var(--brand, #3964fe); background: #f8faff; box-shadow: 0 0 0 2px #3964fe12; }
.arch-step.arch-active .arch-step-icon { box-shadow: 0 0 0 4px #3964fe10; }
.arch-package.arch-active { border-color: #9989e6; box-shadow: 0 0 0 2px #8d76d71f; }
.arch-package.arch-active .arch-file-name { color: #dad2ff; }
.arch-skills li.arch-selected { background: #edf2ff; color: #3c5d9c; }
.arch-skills li.arch-selected::before { background: var(--brand, #3964fe); }
.arch-capability.arch-active .arch-skills li.arch-selected::before { animation: arch-dot-pulse 1.2s ease-in-out infinite; }
.arch-tool-items > span.arch-selected { border-color: #b9cafa; background: #edf3ff; color: #345b9f; }
.arch-tool.arch-active .arch-tool-items > span.arch-selected { box-shadow: 0 0 0 2px #3964fe09; }
.arch-connector.arch-edge-visited, .arch-output-connector.arch-edge-visited { color: #6f9e8b; }
.arch-connector.arch-edge-active, .arch-output-connector.arch-edge-active { color: var(--brand, #3964fe); }
.arch-connector.arch-edge-active .arch-icon, .arch-output-connector.arch-edge-active .arch-icon, .arch-return.arch-edge-active .arch-icon { stroke-dasharray: 6 3; animation: arch-arrow-dash .85s linear infinite; }
.arch-flow-label.arch-edge-visited::before, .arch-flow-label.arch-edge-visited::after { background: #b6d1c3; }
.arch-flow-label.arch-edge-active { color: var(--brand, #3964fe); }
.arch-flow-label.arch-edge-active::before, .arch-flow-label.arch-edge-active::after { background: repeating-linear-gradient(90deg, #c9d6ff 0 12px, #3964fe 12px 24px, #c9d6ff 24px 36px); background-size: 72px 1px; animation: arch-line-flow 1.2s linear infinite; }
.arch-flow-label.arch-edge-active .arch-icon { animation: arch-dot-pulse 1.1s ease-in-out infinite; }
.arch-return.arch-active, .arch-return.arch-active strong { color: var(--brand, #3964fe); }
.arch-return.arch-active .arch-icon { color: var(--brand, #3964fe); }
.arch-return.arch-visited, .arch-return.arch-visited strong { color: #6b887a; }
.arch-output-connector { display: flex; justify-content: center; align-items: center; height: 18px; margin: -7px 0 10px; color: #aab6c7; }
.arch-output-connector .arch-icon { width: 16px; height: 16px; }
.arch-delivery-state { display: block; margin-top: 3px; font-size: 12px; line-height: 1.6; font-weight: 400; color: #6c8c79; }
.arch-output-pending { border-color: #e3e8e5; background: #fafcfb; }
.arch-output-pending .arch-delivery-icon { background: #edf1ef; color: #82938b; }
.arch-output-pending .arch-delivery-lead strong, .arch-output-pending .arch-deliverables li { color: #758078; }
.arch-output-pending .arch-delivery-state { color: #818b85; }
.arch-output-pending .arch-deliverables .arch-icon { color: #a1b0a7; }
.arch-delivery.arch-active { border-color: #56a884; background: #f3faf6; box-shadow: 0 0 0 2px #2e9c7612; }
.arch-deliverables li.arch-output-ready { animation: arch-output-appear .45s ease-out both; animation-delay: var(--arch-output-delay, 0ms); }
.arch-is-complete .arch-delivery { border-color: #b4d7c5; background: #f4faf7; }
.arch-is-complete .arch-deliverables li.arch-output-ready { animation: none; }
.arch-is-paused *, .arch-is-paused *::before, .arch-is-paused *::after { animation-play-state: paused !important; }
@keyframes arch-dot-pulse { 0%, 100% { opacity: .52; } 50% { opacity: 1; } }
@keyframes arch-line-flow { from { background-position: 0 0; } to { background-position: 72px 0; } }
@keyframes arch-arrow-dash { from { stroke-dashoffset: 18; } to { stroke-dashoffset: 0; } }
@keyframes arch-output-appear { from { opacity: .55; } to { opacity: 1; } }
@container agent-architecture (max-width: 880px) {
  .arch-demo-toolbar { padding-left: 16px; padding-right: 16px; }
}
@container agent-architecture (max-width: 500px) {
  .arch-demo-toolbar { padding: 12px 13px; gap: 10px; }
  .arch-demo-status { flex-basis: 100%; gap: 6px; }
  .arch-demo-controls { margin-left: auto; }
  .arch-demo-count { margin-left: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .arch-board *, .arch-board *::before, .arch-board *::after { animation: none !important; transition: none !important; }
}

/* Skill evaluation V7: scoped component; colors and scores follow approved baseline. */
.ev7-evaluation{container-name:ev7-evaluation;container-type:inline-size;min-width:0;color:var(--ds-ink,#0f1115);font-size:14px;line-height:1.6}
.ev7-evaluation *,.ev7-evaluation *::before,.ev7-evaluation *::after{box-sizing:border-box}
.ev7-evaluation :is(h3,h4,p,figure,ol,ul){margin:0}
.ev7-icon{display:block;flex:none;width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.ev7-evaluation .ev7-subheading{font-size:16px;line-height:24px;font-weight:600;letter-spacing:0;margin:0 0 14px}
.ev7-cases{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-bottom:22px}
.ev7-case{min-width:0;padding:15px 16px 14px;border:1px solid #e9edf3;border-radius:var(--ds-radius-card,10px);background:#fafbfc}
.ev7-case-blue{--ev7-case-color:#3b82f6;--ev7-badge-color:#2868d4;--ev7-case-wash:#edf4ff}
.ev7-case-green{--ev7-case-color:#18a872;--ev7-badge-color:#117c52;--ev7-case-wash:#eaf8f2}
.ev7-case-purple{--ev7-case-color:#a665f0;--ev7-badge-color:#8950d3;--ev7-case-wash:#f5edfd}
.ev7-case-orange{--ev7-case-color:#ee972f;--ev7-badge-color:#ae620c;--ev7-case-wash:#fff4e6}
.ev7-case-head{display:flex;align-items:center;gap:9px;min-width:0}
.ev7-case-badge{display:inline-flex;align-items:center;flex:none;min-height:22px;padding:2px 7px;border-radius:4px;background:var(--ev7-badge-color);color:#fff;font-size:12px;font-weight:600;line-height:18px;white-space:nowrap}
.ev7-case-head h4{min-width:0;font-size:14px;font-weight:600;line-height:22px;color:#263043}
.ev7-case-head>.ev7-icon{width:22px;height:22px;color:var(--ev7-case-color);margin-left:auto}
.ev7-case p{margin-top:10px;color:#6b7585;font-size:12px;line-height:20px}
.ev7-visual{display:grid;grid-template-columns:292px minmax(0,1fr);gap:28px;padding:24px;border:1px solid var(--ds-line,#e2e5eb);border-radius:var(--ds-radius-card,10px);background:#fff}
.ev7-radar{display:flex;min-width:0;flex-direction:column;align-items:center;justify-content:center}
.ev7-radar figcaption{align-self:flex-start;color:#334155;font-size:14px;font-weight:600;line-height:22px}
.ev7-radar-plot{display:flex;align-items:center;justify-content:center;max-width:100%;overflow-x:auto;margin-top:14px}
.ev7-radar-plot>svg{display:block;flex:0 0 292px;width:292px;height:276px;min-width:292px;max-width:none;overflow:visible}
.ev7-radar-label{font-family:inherit;font-size:12px;font-weight:400;fill:#647083}
.ev7-radar-scale{display:flex;align-items:center;justify-content:center;gap:6px;color:#929aab;font-size:12px;line-height:20px;margin-top:2px}
.ev7-radar-scale:before{content:"";display:block;width:14px;height:3px;border-radius:3px;background:#7b61ec}
.ev7-dimensions{min-width:0;display:grid;align-content:start;gap:16px}
.ev7-dimension{min-width:0;padding-bottom:16px;border-bottom:1px solid #edf0f5}
.ev7-dimension:last-child{border-bottom:0;padding-bottom:0}
.ev7-dim-blue{--ev7-dim:#3b82f6;--ev7-dim-light:#75c5fc;--ev7-dim-wash:#eef5ff}
.ev7-dim-green{--ev7-dim:#18a872;--ev7-dim-light:#59d5a2;--ev7-dim-wash:#ebf8f2}
.ev7-dim-purple{--ev7-dim:#a665f0;--ev7-dim-light:#d38af7;--ev7-dim-wash:#f5eefc}
.ev7-dim-orange{--ev7-dim:#ee972f;--ev7-dim-light:#f6c45d;--ev7-dim-wash:#fff5e7}
.ev7-dim-head{display:flex;align-items:center;gap:10px;min-width:0}
.ev7-dim-icon{display:grid;place-items:center;width:32px;height:32px;flex:none;border-radius:50%;background:var(--ev7-dim-wash);color:var(--ev7-dim)}
.ev7-dim-icon .ev7-icon{width:18px;height:18px}
.ev7-dim-head h4{font-size:14px;font-weight:600;line-height:22px;color:#253044}
.ev7-score{display:inline-flex;align-items:baseline;gap:4px;margin-left:auto;color:#425068;white-space:nowrap;font-size:16px;line-height:24px;font-weight:600;font-variant-numeric:tabular-nums}
.ev7-score small{font-size:12px;font-weight:400;color:#99a2b0;line-height:20px}
.ev7-score-track{height:7px;margin-top:10px;background:#f0f2f6;border-radius:5px;overflow:hidden}
.ev7-score-track>span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--ev7-dim),var(--ev7-dim-light))}
.ev7-dimension p{margin-top:9px;color:#697587;font-size:12px;line-height:20px}
.ev7-verdict{display:flex;align-items:flex-start;gap:12px;padding:17px 18px;margin-top:14px;border:1px solid #e3ede6;border-radius:var(--ds-radius-card,10px);background:#f7faf8}
.ev7-verdict>.ev7-icon{color:#2c9b70;width:20px;height:20px;margin-top:1px}
.ev7-verdict-body{min-width:0}
.ev7-verdict h3{font-size:14px;line-height:22px;font-weight:600;color:#315444}
.ev7-verdict p{margin-top:5px;font-size:12px;line-height:21px;color:#627166}
.ev7-verdict p strong{font-weight:500;color:#445c4d}
.ev7-verdict .ev7-verdict-boundary{color:#81705a;margin-top:3px}
.ev7-method{margin-top:28px}
.ev7-method-title{display:flex;align-items:center;gap:8px;margin-bottom:16px}
.ev7-method-title>.ev7-icon{width:19px;height:19px;color:#748096}
.ev7-method-title h3{font-size:16px;font-weight:600;line-height:24px}
.ev7-method-group+.ev7-method-group{margin-top:20px}
.ev7-method-group>h4{font-size:14px;font-weight:500;line-height:22px;color:#495569;margin-bottom:12px}
.ev7-coverage{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.ev7-coverage-item{min-width:0;display:flex;flex-direction:column;align-items:flex-start;padding:14px 12px;border:1px solid #eef0f4;border-radius:8px;background:#fafbfc}
.ev7-coverage-item>.ev7-icon{color:#8290a5;width:19px;height:19px;margin-bottom:9px}
.ev7-coverage-item strong{font-size:14px;font-weight:600;line-height:21px;color:#465165}
.ev7-coverage-item p{margin-top:4px;font-size:12px;line-height:20px;color:#8a94a3}
.ev7-method-steps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;list-style:none;padding:0}
.ev7-method-step{position:relative;min-width:0;display:flex;flex-direction:column;align-items:flex-start}
.ev7-method-step:not(:last-child):after{content:"";position:absolute;top:13px;left:36px;right:0;border-top:1px dashed #dbe1eb}
.ev7-step-no{display:grid;place-items:center;width:27px;height:27px;background:#eef2f7;border-radius:50%;font-size:12px;font-weight:600;line-height:20px;color:#728098;margin-bottom:9px;font-variant-numeric:tabular-nums}
.ev7-method-step strong{font-size:14px;font-weight:600;line-height:21px;color:#465165}
.ev7-method-step p{margin-top:4px;font-size:12px;line-height:20px;color:#8a94a3}
.ev7-method-note{display:flex;gap:8px;align-items:flex-start;padding-top:14px;margin-top:18px;border-top:1px solid #edf0f4}
.ev7-method-note .ev7-icon{width:15px;height:15px;color:#8b96a7;margin-top:2px}
.ev7-method-note p{font-size:12px;line-height:20px;color:#8a94a3}
@container ev7-evaluation (max-width:820px){
 .ev7-visual{gap:20px;padding:20px}
 .ev7-dimensions{gap:14px}
 .ev7-dimension{padding-bottom:14px}
}
@container ev7-evaluation (max-width:720px){
 .ev7-visual{grid-template-columns:minmax(0,1fr);gap:24px;padding:20px}
 .ev7-radar figcaption{align-self:center}
 .ev7-radar-plot{margin-top:6px}
 .ev7-dimensions{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 18px}
 .ev7-dimension{padding-bottom:0;border-bottom:0}
 .ev7-coverage{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
 .ev7-method-steps{grid-template-columns:repeat(2,minmax(0,1fr));gap:20px 16px}
 .ev7-method-step:nth-child(2n):after{display:none}
}
@container ev7-evaluation (max-width:480px){
 .ev7-cases{grid-template-columns:minmax(0,1fr);gap:10px;margin-bottom:18px}
 .ev7-case{padding:13px 14px}
 .ev7-case-head{gap:8px}
 .ev7-case p{margin-top:7px}
 .ev7-visual{padding:17px 16px;gap:24px}
 .ev7-dimensions{grid-template-columns:minmax(0,1fr);gap:16px}
 .ev7-dimension{padding-bottom:16px;border-bottom:1px solid #edf0f5}
 .ev7-dimension:last-child{padding-bottom:0;border-bottom:0}
 .ev7-verdict{padding:15px 14px;gap:9px}
 .ev7-method{margin-top:24px}
 .ev7-coverage-item{padding:12px}
 .ev7-method-note{gap:6px}
}

/* V7: approved delta over the V6 workbench shell. */
.hero{gap:24px;padding-bottom:28px}
.hero-kicker{gap:12px;margin-bottom:17px}
.kind-badge,.category-badge{font-size:14px;line-height:22px;min-height:34px;padding:6px 12px}
.hero-category{font-size:14px;color:#7c8696;font-weight:500;line-height:22px}
.hero-separator{width:4px;height:4px;border-radius:50%;background:#b5bdc9}
.hero-tags{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-top:18px}
.hero-tags .category-badge{min-height:32px;padding:5px 12px;background:#f3f5f8;color:#6b7688;font-weight:400}
.hero-lead{margin-top:14px;line-height:1.85}
.hero-byline{margin-top:17px}
.hero-actions{padding-top:23px}
.save-btn{color:#cc4056;border-color:#edd5da;background:#fff}
.save-btn:hover{color:#c8334c;border-color:#eab9c3;background:#fff7f8}
.save-btn[aria-pressed=true]{color:#ce3e56;border-color:#efbdc7;background:#fff0f3}
.save-btn[aria-pressed=true] .ic{fill:#fbd2dc}
.hero-aside.hero-rating{padding:20px;justify-content:flex-start;background:#fcfcfe}
.hero-rating .rating-large{margin-top:0}
.hero-rating .rating-large strong{color:#e38b19;font-size:56px;letter-spacing:-2.5px;line-height:1.12}
.hero-rating .rating-large>span{font-size:14px;color:#a0a7b1}
.hero-rating .rating-stars{font-size:24px;line-height:32px;letter-spacing:3px;margin-top:7px;color:#e6e8ed}
.hero-rating .stars-filled{color:#e99a26}
.mini-metrics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px 15px;width:100%;margin-top:23px}
.mini-metric{min-width:0;--meter:#3b82f6;--meter-end:#75c5fc}
.mini-metric.green{--meter:#18a872;--meter-end:#59d5a2}
.mini-metric.purple{--meter:#a665f0;--meter-end:#d38af7}
.mini-metric.orange{--meter:#ee972f;--meter-end:#f6c45d}
.mini-labels{display:flex;align-items:center;justify-content:space-between;gap:5px;font-size:12px;line-height:20px;color:#6b7483}
.mini-labels strong{font-size:12px;font-weight:600;color:#576273;font-variant-numeric:tabular-nums}
.mini-track{height:6px;background:#eaeef4;border-radius:5px;overflow:hidden;margin-top:6px}
.mini-track>span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,var(--meter),var(--meter-end))}
.hero-rating .panel-link{margin-top:auto;padding-top:21px;font-size:13px}
.hero-agent .hero-kpis{margin-top:auto;padding-top:18px}
.hero-agent .hero-capabilities{margin-bottom:23px}
/* Clear titles; real introductions only in the capability section. */
.section-heading{margin-bottom:16px}
.section-heading h2,.section-no{font-size:18px;line-height:28px;letter-spacing:0}
.section-heading h2{font-weight:600}
.section-no{font-weight:500;color:#a6afbd}
.section-heading-top{gap:10px}
.content-section{margin-bottom:38px}
.core-intro{font-size:14px;line-height:1.9;color:#657080;max-width:920px;margin-bottom:14px}
.core-points{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin:0 0 22px;padding:0;list-style:none}
.core-points li{display:flex;align-items:flex-start;gap:8px;min-width:0;color:#7a8594;font-size:12px;line-height:21px}
.core-points .ic{width:16px;height:16px;margin-top:3px;color:#8b9bb3}
.core-points strong{display:block;font-size:14px;line-height:22px;font-weight:500;color:#384657;margin-bottom:3px}
.core-points p{font-size:12px;line-height:21px}
.ability-card h3{font-size:14px;line-height:23px}
.fit-boundaries{background:#fff8ef;border-left-color:#f1e3d1}
.fit-boundaries h3{color:#985d1d}
.fit-boundaries h3 .ic{color:#d98a26}
.fit-boundaries li{color:#a56c31}
.fit-boundaries li .ic{color:#d38a2b}
/* Compact comparison. SVG width is fixed so text does not grow with the column. */
.pen-head strong{font-size:14px;line-height:22px}
.pen-tag{font-size:12px;line-height:20px}
.pen-svg-wrap{padding:14px 10px;overflow-x:auto}
.pen-svg-wrap svg{display:block;width:320px;min-width:320px;max-width:none;height:156px;margin:0 auto}
.pen-points{gap:10px;padding:15px}
.pen-points li{font-size:12px;line-height:21px}
.pen-points li strong{font-size:12px;font-weight:600}
.pen-dot{font-size:12px;margin-top:2px}
/* Quiet automatic peer cards, no visible pagination or totals. */
.peer-heading{font-size:16px;line-height:28px;margin-bottom:16px}
.peer-carousel{background:#fff}
.peer-slide{padding:18px 16px;min-height:228px}
.peer-person img{width:38px;height:38px}
.peer-org{font-size:12px;line-height:19px;margin-top:3px;white-space:normal;overflow:visible;text-overflow:clip}
.peer-credentials{display:inline-flex;width:max-content;gap:5px;align-items:center;margin-top:12px;padding:2px 7px;min-height:22px;background:#252830;color:#fff;border-radius:4px;font-size:12px;line-height:18px}
.peer-credentials .ic{color:#fff;width:13px;height:13px}
.peer-task{margin-top:14px;padding-top:13px}
.peer-task p{font-size:12px;line-height:21px;margin-top:9px;min-height:42px}
.peer-task .used{font-size:12px}
.capability-link{font-size:14px}
.peer-slide.peer-entering{animation:v7-peer-enter .45s ease both}
@keyframes v7-peer-enter{from{opacity:.2;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
.follow-actions{display:grid;gap:10px;margin-top:22px}
.follow-actions .primary-btn,.follow-actions .secondary-btn{width:100%;height:38px}
.follow-actions .secondary-btn{color:#5e6b80;background:#fff}
.follow-actions .secondary-btn:hover{color:#3964fe;background:#f7f9ff;border-color:#b6c8f7}
/* Cases stay inside the left body column. Only the thumbnail is framed. */
.detail-main .cases-section{margin-top:36px;padding-top:0;border-top:0;scroll-margin-top:84px}
.detail-main .cases-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
.actual-case-card{border:0;border-radius:0;overflow:visible;background:transparent;box-shadow:none}
.actual-case-card:hover{border:0;box-shadow:none}
.case-preview{height:auto;aspect-ratio:16/9;padding:16px 8px 5px;border:1px solid #e0e6ef;border-radius:10px;overflow:hidden;transition:border-color .15s,background-color .15s}
.actual-case-card:hover .case-preview{border-color:#b7c9ed;background:#f1f5fc}
.case-preview svg{width:190px;max-width:94%;height:auto}
.case-category{left:auto;right:8px;top:8px;padding:2px 7px;border:1px solid #dee4ee;border-radius:4px;background:#ffffffed;color:#758093;font-size:12px;line-height:20px}
.case-copy{padding:10px 0 0}
.case-copy h3{font-size:14px;line-height:23px;min-height:46px;max-height:46px;font-weight:500;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.case-copy p{display:none}
.page-footnote{margin-top:32px}
@container detail (max-width:740px){
 .detail-main .cases-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 14px}
 .core-points{grid-template-columns:1fr;gap:11px;margin-bottom:20px}
 .core-points strong{display:inline;margin-right:7px}
 .core-points p{display:inline}
 .pen-svg-wrap{padding:12px 8px}
}
@container detail (max-width:420px){
 .detail-main .cases-grid{grid-template-columns:minmax(0,1fr);gap:22px}
 .case-preview{aspect-ratio:1.95}
 .case-copy h3{min-height:0}
 .fit-boundaries{border-top-color:#f1e3d1}
}
@media(max-width:1280px){
 .detail-page{padding-bottom:100px}
 .follow-actions{position:fixed;bottom:14px;left:284px;right:24px;display:flex;gap:10px;z-index:40;background:#ffffffed;backdrop-filter:blur(12px);padding:10px;border:1px solid #e5e9f0;border-radius:10px;box-shadow:0 5px 24px #1d355d12;margin:0}
 .follow-actions .primary-btn,.follow-actions .secondary-btn{flex:1;min-width:0}
 .sidebar-collapsed .follow-actions{left:24px}
}
@media(max-width:1023px){
 .follow-actions{left:16px;right:16px}
 .sidebar-collapsed .follow-actions{left:16px}
 .kind-badge,.category-badge{font-size:14px}
}
@media(max-width:760px){
 .hero-skill .hero-aside.hero-rating{display:flex;flex-direction:column;align-items:flex-start;padding:20px}
 .hero-rating .rating-large{margin-top:0}
 .hero-rating .rating-stars{margin-top:8px}
 .mini-metrics{margin-top:20px;gap:15px 24px}
 .hero-rating .panel-link{width:100%;margin-top:17px;padding-top:0;border-top:0}
 .hero-agent .hero-kpis{margin-top:0;width:100%}
 .hero-agent .hero-capabilities{margin-bottom:20px}
 .section-heading h2,.section-no{font-size:18px;line-height:28px}
 .peer-heading{font-size:16px}
 .hero-tags{gap:9px}
 .hero-category{font-size:14px}
 .hero-kicker{gap:9px}
}
@media(max-width:480px){
 .hero-kicker{margin-bottom:14px}
 .kind-badge{padding:5px 10px;min-height:32px}
 .hero-tags .category-badge{padding:5px 10px;min-height:32px}
 .hero-category{font-size:14px}
 .hero-tags{margin-top:15px}
 .hero-rating .rating-large strong{font-size:52px}
 .hero-rating .rating-stars{font-size:24px;letter-spacing:3px}
 .section-heading h2,.section-no{font-size:18px;line-height:28px}
 .content-section{margin-bottom:32px}
 .follow-actions{bottom:10px;padding:9px;gap:9px}
 .follow-actions .primary-btn,.follow-actions .secondary-btn{height:38px;font-size:14px}
 .core-intro{font-size:14px}
}
@media(prefers-reduced-motion:reduce){.peer-slide.peer-entering{animation:none}}
</style><style data-version="v8">/* V8: approved changes over the preserved V7 baseline. */
:root{--workspace-width:1160px;--detail-rail-width:280px}
.hero,.detail-grid{grid-template-columns:minmax(0,1fr) var(--detail-rail-width);gap:24px}
button,[role="button"],.sp-new-task,.sp-nav-link,.small-action,.icon-button,.primary-btn,.secondary-btn,.arch-demo-button{font-weight:500}
.task-start{gap:8px;min-width:0;font-weight:500}
.task-start .ic,.task-start .ds-icon{width:18px;height:18px}
body[data-page="agent"] .task-start{background:#0f1115;border-color:#0f1115;color:#fff}
body[data-page="agent"] .task-start:hover{background:#282c33;border-color:#282c33}
body[data-page="skill"] .task-start{background:#3964fe;border-color:#3964fe;color:#fff}
body[data-page="skill"] .task-start:hover{background:#2f55e7;border-color:#2f55e7}
.work-topbar .share-btn{height:34px;padding:0 12px;gap:7px;background:#fff;color:#626873;font-weight:500}
.work-topbar .share-btn:hover{background:#f7f9fc;color:#242a33}
.hero-actions{flex-wrap:wrap;row-gap:10px}

/* Continuous reading above the existing repository and capability cards. */
.core-intro{font-size:14px;line-height:26px;color:#0f1115;max-width:100%;margin:0 0 16px;font-weight:400}
.core-points{display:grid;grid-template-columns:minmax(0,1fr);gap:9px;margin:0 0 23px;padding:0;list-style:none}
.core-points li{display:flex;align-items:flex-start;gap:10px;color:#0f1115;font-size:14px;line-height:24px}
.core-points .ic{width:17px;height:17px;margin-top:3px;color:#77869a}
.core-points li>div{display:flex;align-items:baseline;gap:10px;min-width:0;flex:1}
.core-points strong{display:block;flex:none;margin:0;color:#0f1115;font-size:14px;line-height:24px;font-weight:600}
.core-point-divider{display:block;width:1px;height:12px;flex:none;background:#dce1e8;align-self:center}
.core-points p{display:block;flex:1;min-width:0;font-size:14px;line-height:24px;color:#22262d;font-weight:400;margin:0}

/* Two identity tags, then the specific institution, then the task. */
.peer-slide{padding:16px;min-height:238px}
.peer-person{align-items:flex-start;gap:10px}
.peer-person img{width:38px;height:38px;margin-top:2px}
.peer-identity{min-width:0;flex:1}
.peer-identity>.peer-name-row{display:flex;align-items:baseline;justify-content:space-between;gap:6px}
.peer-name-row strong{font-size:14px;line-height:22px;font-weight:600;color:#0f1115}
.peer-name-row time{font-size:12px;line-height:20px;white-space:nowrap;color:#98a1ae}
.peer-identity>.peer-tags{display:flex;align-items:center;justify-content:flex-start;flex-wrap:wrap;gap:6px;margin-top:6px}
.peer-tags>span{display:inline-flex;align-items:center;gap:4px;min-height:22px;padding:2px 7px;border-radius:4px;font-size:12px;line-height:18px;white-space:nowrap;font-weight:500}
.peer-type{color:#737d8c;background:#f2f4f7}
.peer-role{color:#fff;background:#252830}
.peer-role .ic{width:12px;height:12px;color:#fff;stroke-width:1.8}
.peer-identity>.peer-org{font-size:12px;line-height:20px;margin-top:6px;min-height:40px;color:#7c8695;white-space:normal;overflow-wrap:anywhere}
.peer-task{margin-top:14px;padding-top:13px;border-top:1px solid #edf0f5}
.peer-task p{font-size:14px;line-height:23px;margin-top:8px;min-height:46px;color:#667184}
.peer-task .capability-link{font-size:14px;line-height:23px}

@media(max-width:1280px){
 .detail-grid{grid-template-columns:minmax(0,1fr)}
 .peer-slide{min-height:238px}
 .peer-task p{min-height:46px}
}
@media(max-width:760px){
 .hero{grid-template-columns:minmax(0,1fr)}
}
@media(max-width:480px){
 .work-topbar .share-btn{height:32px;padding:0 10px}
 .follow-actions{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:8px;padding:8px}
 .follow-actions .primary-btn,.follow-actions .secondary-btn{padding:0 8px;gap:6px;min-width:0;font-size:14px;font-weight:500}
 .follow-actions .task-start .ic,.follow-actions .task-start .ds-icon{width:16px;height:16px}
 .core-points li{gap:8px}
 .core-points li>div{gap:8px}
 .peer-slide{padding:16px}
}
@media(max-width:360px){
 .follow-actions{grid-template-columns:minmax(0,1fr)}
 .detail-page{padding-bottom:144px}
 .core-points li>div{display:block}
 .core-points strong{display:inline;margin-right:8px}
 .core-point-divider{display:none}
 .core-points p{display:inline}
}

/* V8 evaluation conclusion: restrained report summary, scoped to this component. */
.ev8-verdict{margin-top:16px;min-width:0;overflow:hidden;border:1px solid #e2e8e4;border-radius:var(--ds-radius-card,10px);background:#fff;color:var(--ds-ink,#0f1115);box-shadow:0 2px 5px #19362903}
.ev8-verdict-heading{display:flex;align-items:flex-start;gap:12px;padding:19px 20px 18px}
.ev8-verdict-mark{display:grid;place-items:center;flex:none;width:34px;height:34px;border:1px solid #e3eee7;border-radius:9px;background:#f2f8f4;color:#318361}
.ev8-verdict-icon{display:block;flex:none;width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.ev8-verdict-heading-copy{min-width:0}
.ev8-verdict h3{font-size:14px;line-height:22px;font-weight:600;color:#1f3028}
.ev8-verdict .ev8-verdict-summary{margin:4px 0 0;font-size:14px;line-height:24px;font-weight:400;color:#303b35}
.ev8-verdict-details{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));border-top:1px solid #edf0ed;background:#fcfdfc}
.ev8-verdict-item{min-width:0;padding:16px 20px 17px}
.ev8-verdict-item h4{display:flex;align-items:center;gap:8px;font-size:14px;line-height:22px;font-weight:600;color:#283a30}
.ev8-verdict-item h4 .ev8-verdict-icon{width:16px;height:16px;color:#449272}
.ev8-verdict-item p{margin:7px 0 0;font-size:12px;line-height:22px;font-weight:400;color:#66736c}
.ev8-verdict-review{border-left:1px solid #edf0ed;background:#fffdf9}
.ev8-verdict-review h4{color:#85622d}
.ev8-verdict-review h4 .ev8-verdict-icon{color:#bc893c}
.ev8-verdict-review p{color:#796b56}
@container ev7-evaluation (max-width:560px){
 .ev8-verdict-heading{padding:16px;gap:10px}
 .ev8-verdict-details{grid-template-columns:minmax(0,1fr)}
 .ev8-verdict-item{padding:14px 16px}
 .ev8-verdict-review{border-left:0;border-top:1px solid #edf0ed}
}
</style><style data-version="v9">/* V9 final polish. All other V8 decisions remain in place. */
:root{--workspace-width:1100px}
.peer-heading{font-size:14px;line-height:22px;font-weight:600;margin-bottom:12px}
.peer-slide{padding:14px;min-height:0}
.peer-person{gap:9px}
.peer-person img{width:36px;height:36px;margin-top:1px}
.peer-name-row strong{font-size:14px;line-height:21px}
.peer-name-row time{font-size:12px;line-height:19px}
.peer-identity>.peer-tags{gap:7px;margin-top:4px}
.peer-tags>span{min-height:20px;padding:1px 6px;border-radius:3px;font-size:12px;line-height:18px;font-weight:500}
.peer-tags>.peer-type{padding:0;background:transparent;color:#946e2c;gap:4px}
.peer-type .ic{width:13px;height:13px;color:#b48a43;stroke-width:1.8}
.peer-role{background:#2b2e35;color:#fff}
.peer-identity>.peer-org{margin-top:4px;min-height:0;font-size:12px;line-height:19px;color:#7c8695}
.peer-task{margin-top:10px;padding-top:10px}
.peer-task .capability-link{font-size:14px;line-height:22px}
.peer-task p{margin-top:6px;min-height:44px;font-size:13px;line-height:22px}
.follow-actions{margin-top:16px}
/* Comparison notes retain their complete text and can wrap naturally. */
.pen-points li{min-width:0;align-items:flex-start;line-height:22px}
.pen-points li>span:last-child{display:block;min-width:0;flex:1;white-space:normal;overflow:visible;overflow-wrap:anywhere}
.pen-points li strong{white-space:normal}
@media(max-width:1280px){.follow-actions{margin-top:0}}

/* V9: concise assessment summary; preserve the applicability and review boundary. */
.ev9-verdict{margin-top:16px;padding:16px 18px;min-width:0;border:1px solid #e2e8e5;border-radius:var(--ds-radius-card,10px);background:#fff;color:var(--ds-ink,#0f1115)}
.ev9-verdict-heading{display:flex;align-items:center;gap:8px;min-width:0}
.ev9-verdict-icon{display:block;flex:none;width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}
.ev9-verdict-heading>.ev9-verdict-icon{color:#34886b}
.ev9-verdict h3{margin:0;color:#263a31;font-size:14px;font-weight:600;line-height:22px}
.ev9-verdict .ev9-verdict-summary{margin:6px 0 0 26px;color:#252c29;font-size:14px;font-weight:400;line-height:24px}
.ev9-verdict .ev9-verdict-boundary{display:flex;align-items:flex-start;gap:6px;margin:9px 0 0 26px;color:#92733f;font-size:12px;font-weight:400;line-height:21px}
.ev9-verdict-boundary>.ev9-verdict-icon{width:14px;height:14px;margin-top:3px;color:#b58b44}
.ev9-verdict-boundary>span{min-width:0}
@container ev7-evaluation (max-width:480px){
 .ev9-verdict{padding:14px}
 .ev9-verdict .ev9-verdict-summary{margin-left:0}
 .ev9-verdict .ev9-verdict-boundary{margin-left:0}
}
</style><style data-version="v10">/* V10: navigation spacing, peer badges and institution alignment. */
.anchor-nav a{line-height:24px;padding-bottom:10px}
.right-rail{top:64px}
.peer-tags>.peer-type{min-height:22px;padding:1px 6px;border:1px solid #f0e1c6;background:#fbf3e3;color:#946e2c;gap:4px}
.peer-tags>.peer-role{min-height:22px;padding:1px 6px;border:1px solid #2b2e35;background:#2b2e35;color:#fff;gap:4px}
.peer-role .ic{width:12px;height:12px;stroke-width:1.8;color:#fff}
.peer-slide>.peer-org{margin:8px 0 0;min-height:0;font-size:12px;line-height:20px;color:#0f1115;text-align:left;white-space:normal;overflow-wrap:anywhere}

</style><style data-version="v11">/* V11: selectable capability tags, aligned comparison notes and final delivery. */
.hero-tags{--tag-ink:#3158d8;--tag-tint:#edf2ff;--tag-line:#bdccff}
.hero-tags[data-tag-kind="agent"]{--tag-ink:#171c24;--tag-tint:#eceef2;--tag-line:#c9ced7}
.hero-tags button.category-badge{appearance:none;min-height:34px;padding:5px 12px;border:1px solid transparent;font-family:inherit;font-size:14px;font-weight:500;line-height:22px;cursor:pointer;transition:background .16s ease,border-color .16s ease,color .16s ease,transform .1s ease}
.hero-tags button.category-badge:hover{background:var(--tag-tint);color:var(--tag-ink);border-color:var(--tag-line)}
.hero-tags button.category-badge:active{transform:translateY(1px)}
.hero-tags button.category-badge[aria-pressed="true"]{background:var(--tag-tint);color:var(--tag-ink);border-color:var(--tag-line)}
.hero-tags button.category-badge:focus-visible{outline:2px solid var(--tag-ink);outline-offset:3px}

.arch-tool{border-style:dashed}

.pen-points{gap:14px}
.pen-points li{display:grid;grid-template-columns:18px minmax(0,1fr);align-items:start;column-gap:8px}
.pen-points .pen-dot{margin-top:2px;line-height:1}
.pen-dot svg{display:block;width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2.25;stroke-linecap:round;stroke-linejoin:round}
.pen-note-body{min-width:0;text-align:left;overflow-wrap:anywhere}
.pen-points li .pen-note-title{display:block;margin:0;font-size:14px;font-weight:600;line-height:22px;color:#384454}
.pen-points .pen-note-description{margin:3px 0 0;font-size:12px;font-weight:400;line-height:21px;color:#687384;white-space:normal;overflow-wrap:anywhere}

/* Keep the workbench's file-card geometry and place outputs on a quiet surface. */
.materials-group--final{padding:14px;border:1px solid #e0e9e4;border-radius:10px;background:#f8fbf9}
.materials-group--final .materials-heading{margin-bottom:12px}
.materials-group--final .materials-heading h3{color:#254434;font-size:15px;font-weight:600}
.materials-group--final .materials-heading>.ic{color:#348c68}
.materials-group--final .materials-count{padding:2px 7px;border-radius:4px;background:#eaf3ee;color:#547662;font-size:12px;line-height:18px}

/* The architecture output node retains its original animation hooks. */
.arch-delivery{display:block;padding:14px;border-radius:8px;background:#f7faf8}
.arch-delivery .arch-delivery-lead{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.arch-delivery .arch-delivery-icon{width:32px;height:36px;border-radius:7px}
.arch-delivery-copy{min-width:0;flex:1}
.arch-delivery .arch-delivery-lead strong{display:block;color:#254434;font-size:14px;line-height:22px;font-weight:600}
.arch-delivery-subtitle{display:block;margin-top:2px;color:#718078;font-size:12px;line-height:20px}
.arch-delivery .arch-delivery-state{flex:none;margin:0 0 0 auto;padding:3px 7px;border:1px solid #e1e9e4;border-radius:4px;background:#fff;color:#708078;font-size:12px;line-height:20px}
.arch-delivery .arch-deliverables{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0 0;padding:0}
.arch-delivery .arch-deliverables li{display:flex;align-items:center;gap:10px;min-width:0;min-height:66px;padding:10px;border:1px solid #e3eae6;border-radius:6px;background:#fff;color:#303a34}
.arch-output-file-copy{display:block;min-width:0;flex:1}
.arch-output-file-copy strong{display:block;color:#303a34;font-size:12px;line-height:20px;font-weight:500;overflow-wrap:anywhere}
.arch-output-file-copy small{display:block;margin-top:2px;color:#8b9690;font-size:12px;line-height:18px}
.arch-deliverables .sp-delivery-file-icon{width:25px;height:30px;border-radius:3px}
.arch-deliverables .sp-delivery-file-icon svg{width:15px;height:15px}
.arch-deliverables .sp-delivery-file-icon::after{width:8px;height:8px}
.arch-output-pending .arch-output-file-copy strong{color:#5d6c63}
.arch-is-complete .arch-delivery .arch-delivery-state{border-color:#cce6d8;background:#eaf6ef;color:#2c8060}
.arch-delivery.arch-active .arch-deliverables li,.arch-is-complete .arch-delivery .arch-deliverables li{border-color:#d2e6d9}
@container agent-architecture (max-width:500px){
 .arch-delivery{padding:12px}
 .arch-delivery .arch-deliverables{grid-template-columns:1fr}
 .arch-delivery .arch-delivery-state{margin-left:42px}
}
@media(prefers-reduced-motion:reduce){
 .hero-tags button.category-badge{transition:none}
 .hero-tags button.category-badge:active{transform:none}
}
</style><!-- workbench-theme --></head>
<body data-page="skill"><svg aria-hidden="true" class="svg-sprite" xmlns="http://www.w3.org/2000/svg"><defs><symbol id="i-arrow-left" viewBox="0 0 24 24"><path d="M19 12H5m7 7-7-7 7-7"></path></symbol><symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12h14m-7-7 7 7-7 7"></path></symbol><symbol id="i-chevron-left" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6"></path></symbol><symbol id="i-chevron-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"></path></symbol><symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"></path></symbol><symbol id="i-panel-left" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M9 3v18"></path></symbol><symbol id="i-message-square-plus" viewBox="0 0 24 24"><path d="M21 11.5c0 5-4 8.5-9 8.5-2 0-3.3-.3-5-1l-4 2v-5a8.7 8.7 0 0 1-1-4.5C2 6.6 6.5 3 12 3s9 3.5 9 8.5z"></path><path d="M12 7v8m-4-4h8"></path></symbol><symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><path d="m16 16 5 5"></path></symbol><symbol id="i-lightbulb" viewBox="0 0 24 24"><path d="M9 18h6m-5 3h4M9 15c-3-2-4-4-4-7a7 7 0 0 1 14 0c0 3-1 5-4 7l-1 2h-4z"></path></symbol><symbol id="i-award" viewBox="0 0 24 24"><circle cx="12" cy="8" r="5"></circle><path d="m8 12-2 9 6-3 6 3-2-9"></path></symbol><symbol id="i-palette" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 1.4-3.4 1.7 1.7 0 0 1 .9-2.8H19c2 0 3-1.8 3-4A9 9 0 0 0 12 3Z"></path><circle cx="7" cy="11" r="1"></circle><circle cx="10" cy="7" r="1"></circle><circle cx="15" cy="7" r="1"></circle></symbol><symbol id="i-zap" viewBox="0 0 24 24"><path d="m13 2-9 12h8l-1 8 9-12h-8z"></path></symbol><symbol id="i-workflow" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="9" y="15" width="7" height="6" rx="1"></rect><path d="M6.5 10v3h11v-3M12.5 13v2"></path></symbol><symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></symbol><symbol id="i-library" viewBox="0 0 24 24"><path d="M4 5v15h4V5H4Zm6-2v17h4V3h-4Zm6 4v13h4V7h-4Z"></path></symbol><symbol id="i-folder" viewBox="0 0 24 24"><path d="M3 7a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9H3z"></path></symbol><symbol id="i-more" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle></symbol><symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4 3-6 8-6s8 2 8 6"></path></symbol><symbol id="i-heart" viewBox="0 0 24 24"><path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10a5 5 0 0 1 8.5-3.3 5 5 0 0 1 8.5 3.3Z"></path></symbol><symbol id="i-share-2" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.7 13.4 6.6 4.2M15.3 6.4 8.7 10.6"></path></symbol><symbol id="i-book-open" viewBox="0 0 24 24"><path d="M12 7c-3-2-6-3-10-2v14c4-1 7 0 10 2 3-2 6-3 10-2V5c-4-1-7 0-10 2ZM12 7v14"></path></symbol><symbol id="i-file-search" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><circle cx="11" cy="14" r="3"></circle><path d="m13.2 16.2 3 3"></path></symbol><symbol id="i-list-checks" viewBox="0 0 24 24"><path d="m3 7 2 2 4-4M12 7h9M3 17l2 2 4-4m3 2h9"></path></symbol><symbol id="i-table-2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 10h18M10 3v18"></path></symbol><symbol id="i-file-chart" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6"></path><path d="M8 17v-3m4 3v-6m4 6v-4"></path></symbol><symbol id="i-brain-circuit" viewBox="0 0 24 24"><path d="M12 8a4 4 0 0 0-7-3 4 4 0 0 0-1 6 4 4 0 0 0 1 6 4 4 0 0 0 7 3V8Zm0 0a4 4 0 0 1 7-3 4 4 0 0 1 1 6 4 4 0 0 1-1 6 4 4 0 0 1-7 3V8Z"></path><path d="M8 9v5m8-4v5"></path></symbol><symbol id="i-shield-check" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path><path d="m9 12 2 2 4-4"></path></symbol><symbol id="i-network" viewBox="0 0 24 24"><circle cx="12" cy="4" r="2"></circle><circle cx="5" cy="18" r="2"></circle><circle cx="19" cy="18" r="2"></circle><path d="m12 6-7 10m7-10 7 10M7 18h10"></path></symbol><symbol id="i-clipboard-list" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="18" rx="2"></rect><rect x="9" y="2" width="6" height="4" rx="1"></rect><path d="M9 11h6m-6 4h6m-6 4h4"></path></symbol><symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1.5"></circle></symbol><symbol id="i-graduation-cap" viewBox="0 0 24 24"><path d="m2 9 10-5 10 5-10 5-10-5Zm5 3v5c3 3 7 3 10 0v-5M21 10v7"></path></symbol><symbol id="i-stethoscope" viewBox="0 0 24 24"><path d="M6 3v7a6 6 0 0 0 12 0V3M3 3h5M16 3h5"></path><path d="M12 16v2a4 4 0 0 0 8 0v-2"></path><circle cx="20" cy="14" r="2"></circle></symbol><symbol id="i-briefcase-business" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="14" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18M10 13v2h4v-2"></path></symbol><symbol id="i-users-round" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"></circle><path d="M2 20v-1c0-4 3-6 7-6s7 2 7 6v1M16 5a3 3 0 0 1 0 6M18 14c3 0 4 3 4 6"></path></symbol><symbol id="i-alert-triangle" viewBox="0 0 24 24"><path d="m10.3 3.7-8.5 14.5A2 2 0 0 0 3.5 21h17a2 2 0 0 0 1.7-2.8L13.7 3.7a2 2 0 0 0-3.4 0Z"></path><path d="M12 9v5m0 3h.01"></path></symbol><symbol id="i-scan-search" viewBox="0 0 24 24"><path d="M4 9V5a1 1 0 0 1 1-1h4m6 0h4a1 1 0 0 1 1 1v4M4 15v4a1 1 0 0 0 1 1h4m6 0h4a1 1 0 0 0 1-1v-4"></path><circle cx="11" cy="11" r="3"></circle><path d="m13.5 13.5 3 3"></path></symbol><symbol id="i-git-branch" viewBox="0 0 24 24"><circle cx="6" cy="3" r="2"></circle><circle cx="6" cy="21" r="2"></circle><circle cx="18" cy="6" r="2"></circle><path d="M6 5v14m0-7c9 0 12-2 12-4"></path></symbol><symbol id="i-check-check" viewBox="0 0 24 24"><path d="m2 12 4 4 8-8m-6 4 4 4 10-10"></path></symbol><symbol id="i-file-stack" viewBox="0 0 24 24"><path d="M10 3H5a2 2 0 0 0-2 2v13m5-11v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V11l-5-4zM16 7v5h5"></path></symbol><symbol id="i-clock-3" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M12 6v6l4 2"></path></symbol><symbol id="i-flask-conical" viewBox="0 0 24 24"><path d="M9 3h6M10 3v7L4 20a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2l-6-10V3M8 15h8"></path></symbol><symbol id="i-circle-dot" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="3"></circle></symbol><symbol id="i-fingerprint" viewBox="0 0 24 24"><path d="M12 11a2 2 0 0 0-2 2c0 3-.7 5-2 7m4-9a2 2 0 0 1 2 2c0 3-.7 6-1.5 8M6 15v-2a6 6 0 0 1 12 0v3M3 15v-2a9 9 0 0 1 18 0v2"></path></symbol><symbol id="i-history" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-7M3 5v5h5M12 7v5l4 2"></path></symbol><symbol id="i-database" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14c0 2 4 3 9 3s9-1 9-3V5M3 12c0 2 4 3 9 3s9-1 9-3"></path></symbol><symbol id="i-quote" viewBox="0 0 24 24"><path d="M9 7H5v7h5V7Zm10 0h-4v7h5V7Z"></path></symbol><symbol id="i-file-check" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6m-12 7 2 2 4-4"></path></symbol><symbol id="i-file-input" viewBox="0 0 24 24"><path d="M12 2h6l4 4v14a2 2 0 0 1-2 2H9m9-20v5h4M2 13h14m-4-4 4 4-4 4"></path></symbol><symbol id="i-file-output" viewBox="0 0 24 24"><path d="M12 2h6l4 4v14a2 2 0 0 1-2 2H9m9-18v5h4M2 13h14m-4-4 4 4-4 4"></path></symbol><symbol id="i-layers" viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"></path></symbol><symbol id="i-book-marked" viewBox="0 0 24 24"><path d="M5 3h14v18l-7-4-7 4V3Z"></path></symbol><symbol id="i-settings-2" viewBox="0 0 24 24"><path d="M3 7h18M3 17h18M9 4v6M15 14v6"></path></symbol><symbol id="i-book" viewBox="0 0 24 24"><path d="M12 7c-3-2-6-3-10-2v14c4-1 7 0 10 2 3-2 6-3 10-2V5c-4-1-7 0-10 2ZM12 7v14"></path></symbol><symbol id="i-chart" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6"></path><path d="M8 17v-3m4 3v-6m4 6v-4"></path></symbol><symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"></path><path d="m9 12 2 2 4-4"></path></symbol><symbol id="i-file" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6m-12 7 2 2 4-4"></path></symbol><symbol id="i-arrow-down" viewBox="0 0 24 24"><path d="M12 4v16m-7-7 7 7 7-7"></path></symbol><symbol id="i-code" viewBox="0 0 24 24"><path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16"></path></symbol><symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"></path></symbol><symbol id="i-arrow-up-right" viewBox="0 0 24 24"><path d="M6 18 18 6M6 6h12v12"></path></symbol><symbol id="i-play" viewBox="0 0 24 24"><path d="m8 5 11 7-11 7z"></path></symbol><!-- capability-symbols --></defs></svg><div class="work-area"><main class="detail-page"><header class="hero hero-skill" id="top"><div class="hero-primary"><div class="hero-kicker"><span class="kind-badge skill"><svg class="ds-icon" aria-hidden="true"><use href="#ds-skill"></use></svg>科研 Skill</span><span class="detail-exclusive"><svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#ds-exclusive"></use></svg>专享</span></div><h1>SCI 论文精读与证据核验 Skill</h1><p class="hero-lead">将论文观点、关键数据与图表放在一起精读，逐条关联 DOI 和原文位置，生成可复核、可用于组会与综述的阅读成果。</p><div class="hero-tags" role="group" aria-label="能力标签" data-tag-kind="skill"><button class="category-badge" type="button" aria-pressed="false">论文精读</button><button class="category-badge" type="button" aria-pressed="false">证据核验</button><button class="category-badge" type="button" aria-pressed="false">图表联动</button><button class="category-badge" type="button" aria-pressed="false">组会汇报</button></div><p class="hero-byline"><span>数愈科研评测团队</span><i></i><span>v2.4</span><i></i><span>更新于 2026-11-18</span></p><div class="hero-actions"><button class="primary-btn local-action task-start" data-message="静态设计预览：此入口将连接科研工作台中的真实任务。" aria-label="使用Skill开始任务"><svg class="ds-icon" aria-hidden="true"><use href="#ds-skill"></use></svg><span>使用Skill开始任务</span></button><button class="secondary-btn save-btn" aria-pressed="false"><svg class="ic " aria-hidden="true"><use href="#i-heart"></use></svg><span>收藏</span></button></div></div><div class="hero-aside hero-rating" aria-label="综合评分与能力概览"><div class="rating-large"><strong>4.7</strong><span>/ 5.0</span></div><div class="rating-stars" role="img" aria-label="4.7 星，页面设计模拟评分"><span aria-hidden="true">★★★★★</span><span class="stars-filled" aria-hidden="true">★★★★★</span></div><div class="mini-metrics"><div class="mini-metric blue"><div class="mini-labels"><span>观点保真</span><strong>4.8</strong></div><div class="mini-track" role="meter" aria-label="观点保真" aria-valuemin="0" aria-valuemax="5" aria-valuenow="4.8"><span style="width:96%"></span></div></div><div class="mini-metric green"><div class="mini-labels"><span>证据追溯</span><strong>4.9</strong></div><div class="mini-track" role="meter" aria-label="证据追溯" aria-valuemin="0" aria-valuemax="5" aria-valuenow="4.9"><span style="width:98%"></span></div></div><div class="mini-metric purple"><div class="mini-labels"><span>图表联动</span><strong>4.6</strong></div><div class="mini-track" role="meter" aria-label="图表联动" aria-valuemin="0" aria-valuemax="5" aria-valuenow="4.6"><span style="width:92%"></span></div></div><div class="mini-metric orange"><div class="mini-labels"><span>复杂附表</span><strong>3.8</strong></div><div class="mini-track" role="meter" aria-label="复杂附表" aria-valuemin="0" aria-valuemax="5" aria-valuenow="3.8"><span style="width:76%"></span></div></div></div><a class="panel-link hero-certification-link" href="#skill-evaluation" title="查看完整评测"><!-- evaluation-certification --><svg class="ic" aria-hidden="true"><use href="#i-arrow-right"></use></svg></a></div></header><nav class="anchor-nav" aria-label="详情页章节"><a href="#skill-abilities" class="current">核心能力</a><a href="#skill-audience" class="">适用人群和边界</a><a href="#skill-inputs" class="">准备与交付</a><a href="#skill-evaluation" class="">多维评测</a><a href="#skill-compare" class="">实例穿透</a><a href="#skill-cases" class="">真实案例</a></nav><div class="detail-grid"><div class="detail-main"><section class="content-section" id="skill-abilities"><header class="section-heading"><div class="section-heading-top"><span class="section-no" aria-hidden="true">01</span><h2>核心能力</h2></div></header><p class="core-intro">面向英文医学科研论文，围绕研究问题、研究设计与关键结局开展结构化精读，将作者的核心观点、限定条件和阴性结果放回原文语境中理解。阅读过程中，逐项关联关键数据、图表与证据出处，保留 DOI 和原文位置，方便核对结论依据。最终形成相互对应的精读笔记、证据清单与图表解读，便于文献综述、组会汇报和课题讨论，并标明缺失信息及仍需人工复核的内容。</p><ul class="core-points"><li><svg class="ic" aria-hidden="true"><use href="#i-book-open"></use></svg><div><strong>读懂核心</strong><span class="core-point-divider" aria-hidden="true"></span><p>梳理研究设计与主要结局，保留作者观点及其适用条件。</p></div></li><li><svg class="ic" aria-hidden="true"><use href="#i-file-search"></use></svg><div><strong>核对证据</strong><span class="core-point-divider" aria-hidden="true"></span><p>将关键数据与 DOI、原文位置对应，标明待核验信息。</p></div></li><li><svg class="ic" aria-hidden="true"><use href="#i-file-stack"></use></svg><div><strong>形成成果</strong><span class="core-point-divider" aria-hidden="true"></span><p>整理精读笔记、证据清单与图表解读，便于复核和汇报。</p></div></li></ul><div class="skill-capability-layout"><aside class="repository" aria-label="论文精读技能包"><div class="repository-heading"><svg class="ic " aria-hidden="true"><use href="#i-code"></use></svg>SKILL PACKAGE</div><div class="repository-root"><svg class="ic " aria-hidden="true"><use href="#i-folder"></use></svg>paper-reading/</div><ul class="repository-tree"><li><strong>SKILL.md</strong><span>精读规则与输出约束</span></li><li><strong>references/</strong><span>方法与核验规范</span></li><li><strong>scripts/</strong><span>数据与引用检查</span></li><li><strong>assets/</strong><span>精读报告模板</span></li></ul></aside><div class="ability-grid"><article class="ability-card"><div class="ability-icon"><svg class="ic " width="23" height="23" aria-hidden="true"><use href="#i-book-open"></use></svg></div><div class="ability-text"><h3>核心观点精读</h3><p>区分研究发现、限制条件和作者原意。</p></div></article><article class="ability-card"><div class="ability-icon"><svg class="ic " width="23" height="23" aria-hidden="true"><use href="#i-file-search"></use></svg></div><div class="ability-text"><h3>证据来源核验</h3><p>将引文、DOI 与原文位置对应呈现。</p></div></article><article class="ability-card"><div class="ability-icon"><svg class="ic " width="23" height="23" aria-hidden="true"><use href="#i-table-2"></use></svg></div><div class="ability-text"><h3>图表数据联动</h3><p>正文指标、表格与图像一起理解。</p></div></article><article class="ability-card"><div class="ability-icon"><svg class="ic " width="23" height="23" aria-hidden="true"><use href="#i-list-checks"></use></svg></div><div class="ability-text"><h3>结构化精读成果</h3><p>输出可复核、便于汇报的研究笔记。</p></div></article></div></div></section><section class="content-section" id="skill-audience"><header class="section-heading"><div class="section-heading-top"><span class="section-no" aria-hidden="true">02</span><h2>适用人群和边界</h2></div></header><div class="fit-grid"><div class="fit-audience"><h3><svg class="ic " width="16" height="16" aria-hidden="true"><use href="#i-users-round"></use></svg> 适用人群</h3><div class="audience-list"><div class="audience-item"><div class="audience-glyph"><svg class="ic " width="19" height="19" aria-hidden="true"><use href="#i-graduation-cap"></use></svg></div><div><strong>医学硕博生</strong><span>论文选题、文献综述与组会准备</span></div></div><div class="audience-item"><div class="audience-glyph"><svg class="ic " width="19" height="19" aria-hidden="true"><use href="#i-stethoscope"></use></svg></div><div><strong>临床医生</strong><span>快速掌握高质量临床研究要点</span></div></div><div class="audience-item"><div class="audience-glyph"><svg class="ic " width="19" height="19" aria-hidden="true"><use href="#i-briefcase-business"></use></svg></div><div><strong>医学研究团队</strong><span>对比干预证据、核对研究结果</span></div></div></div></div><div class="fit-boundaries"><h3><svg class="ic " width="16" height="16" aria-hidden="true"><use href="#i-shield-check"></use></svg> 使用边界</h3><ul><li><svg class="ic " width="14" height="14" aria-hidden="true"><use href="#i-alert-triangle"></use></svg><span>无法可靠读取的扫描件需要先整理文本</span></li><li><svg class="ic " width="14" height="14" aria-hidden="true"><use href="#i-alert-triangle"></use></svg><span>复杂附表与关键数值仍需人工回源核对</span></li><li><svg class="ic " width="14" height="14" aria-hidden="true"><use href="#i-alert-triangle"></use></svg><span>不替代系统综述的正式双人独立提取</span></li></ul></div></div></section><section class="content-section" id="skill-inputs"><header class="section-heading"><div class="section-heading-top"><span class="section-no" aria-hidden="true">03</span><h2>准备与交付</h2></div></header><div class="materials-group"><div class="materials-heading "><svg class="ic " aria-hidden="true"><use href="#i-file-input"></use></svg><h3>需要准备</h3><span class="materials-count">2 项</span></div><div class="materials-files"><article class="sp-source-delivery-card">
  <div class="sp-delivery-main">
    <span class="sp-delivery-file-icon is-pdf" aria-hidden="true"><svg viewBox="0 0 18 18"><path d="M8.8 2.2c-.7 3.2.2 6.5 2.4 9.2 1.3 1.6 2.7 2.7 3.8 2.9.8.1 1.1-.6.6-1.2-.8-1-3.6-1.1-6.4-.5-2.8.6-5.5 1.8-6.5 2.8-.6.6-.1 1.3.7 1 1.8-.8 3.6-3.5 4.8-6.1 1.3-2.8 2-5.7 1.5-7.8-.2-.8-.8-.9-.9-.3z"></path></svg></span>
    <span class="sp-delivery-info">
      <strong title="论文原文全文.pdf">论文原文全文.pdf</strong>
      <small>必需 · 包含正文与图表 · PDF</small>
    </span>
  </div>
</article><article class="sp-source-delivery-card">
  <div class="sp-delivery-main">
    <span class="sp-delivery-file-icon is-generic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg></span>
    <span class="sp-delivery-info">
      <strong title="精读关注重点.txt">精读关注重点.txt</strong>
      <small>可选 · 关注的结局与研究问题 · TXT</small>
    </span>
  </div>
</article></div></div><div class="materials-group materials-group--final"><div class="materials-heading outputs"><svg class="ic " aria-hidden="true"><use href="#i-file-output"></use></svg><h3>最终交付</h3><span class="materials-count">2 项</span></div><div class="materials-files"><article class="sp-source-delivery-card">
  <div class="sp-delivery-main">
    <span class="sp-delivery-file-icon is-word" aria-hidden="true"><svg class="sp-delivery-file-letter" viewBox="0 0 18 18"><path d="M1.8 3h2.8l1.7 7.7L8 3h2.2l1.7 7.7L13.6 3h2.7l-3 12h-2.6L9 8.2 7.3 15H4.7z"></path></svg></span>
    <span class="sp-delivery-info">
      <strong title="结构化论文精读报告.docx">结构化论文精读报告.docx</strong>
      <small>研究设计、核心观点与局限 · Word</small>
    </span>
  </div>
</article><article class="sp-source-delivery-card">
  <div class="sp-delivery-main">
    <span class="sp-delivery-file-icon is-generic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path><path d="M14 2v5a1 1 0 0 0 1 1h5"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg></span>
    <span class="sp-delivery-info">
      <strong title="证据与图表核对清单.xlsx">证据与图表核对清单.xlsx</strong>
      <small>关键数据、DOI 与原文页码 · XLSX</small>
    </span>
  </div>
</article></div></div></section><section class="content-section" id="skill-evaluation"><header class="section-heading"><div class="section-heading-top"><span class="section-no" aria-hidden="true">04</span><h2>多维评测报告</h2></div></header><div class="ev7-evaluation">
  <h3 class="ev7-subheading">代表性测试用例</h3>
  <div class="ev7-cases">
    <article class="ev7-case ev7-case-blue">
      <div class="ev7-case-head"><span class="ev7-case-badge">案例 1</span><h4>测试常规文献</h4><svg class="ev7-icon" aria-hidden="true"><use href="#i-book-open"></use></svg></div>
      <p>结构清晰的临床试验 · 研究设计与结局提取</p>
    </article>
    <article class="ev7-case ev7-case-green">
      <div class="ev7-case-head"><span class="ev7-case-badge">案例 2</span><h4>测试复杂结局</h4><svg class="ev7-icon" aria-hidden="true"><use href="#i-file-search"></use></svg></div>
      <p>多时间点和亚组分析 · 核对统计口径是否混淆</p>
    </article>
    <article class="ev7-case ev7-case-purple">
      <div class="ev7-case-head"><span class="ev7-case-badge">案例 3</span><h4>测试图表附表</h4><svg class="ev7-icon" aria-hidden="true"><use href="#i-table-2"></use></svg></div>
      <p>跨页表格与小字号内容 · 核对图表与正文是否一致</p>
    </article>
    <article class="ev7-case ev7-case-orange">
      <div class="ev7-case-head"><span class="ev7-case-badge">案例 4</span><h4>测试异常材料</h4><svg class="ev7-icon" aria-hidden="true"><use href="#i-alert-triangle"></use></svg></div>
      <p>缺失字段与扫描资料 · 检查是否明确报告边界</p>
    </article>
  </div>

  <div class="ev7-visual">
    <figure class="ev7-radar">
      <figcaption>多维能力评测</figcaption>
      <div class="ev7-radar-plot">
        <svg viewBox="0 0 292 276" width="292" height="276" role="img" aria-labelledby="ev7-radar-title ev7-radar-desc">
          <title id="ev7-radar-title">Skill 四维评测雷达图</title>
          <desc id="ev7-radar-desc">满分五分：观点保真4.8，证据追溯4.9，图表联动4.6，复杂附表3.8。图中数值为页面设计数据。</desc>
          <g fill="none" stroke="#e7e8f1" stroke-width="1">
            <polygon points="146,121 163,138 146,155 129,138"></polygon>
            <polygon points="146,104 180,138 146,172 112,138"></polygon>
            <polygon points="146,87 197,138 146,189 95,138"></polygon>
            <polygon points="146,70 214,138 146,206 78,138"></polygon>
            <polygon points="146,53 231,138 146,223 61,138"></polygon>
            <path d="M146 53V223M61 138H231"></path>
          </g>
          <polygon points="146,56.4 229.3,138 146,216.2 81.4,138" fill="#7b61ec" fill-opacity=".16" stroke="#7b61ec" stroke-width="2.7" stroke-linejoin="round"></polygon>
          <g fill="#7b61ec" stroke="#fff" stroke-width="1.4"><circle cx="146" cy="56.4" r="3.4"></circle><circle cx="229.3" cy="138" r="3.4"></circle><circle cx="146" cy="216.2" r="3.4"></circle><circle cx="81.4" cy="138" r="3.4"></circle></g>
          <g class="ev7-radar-label" font-size="12">
            <text x="146" y="31" text-anchor="middle">观点保真</text>
            <text x="290" y="142" text-anchor="end">证据追溯</text>
            <text x="146" y="252" text-anchor="middle">图表联动</text>
            <text x="2" y="142" text-anchor="start">复杂附表</text>
          </g>
        </svg>
      </div>
      <div class="ev7-radar-scale">满分 5.0</div>
    </figure>

    <div class="ev7-dimensions">
      <article class="ev7-dimension ev7-dim-blue">
        <div class="ev7-dim-head"><span class="ev7-dim-icon"><svg class="ev7-icon" aria-hidden="true"><use href="#i-book-open"></use></svg></span><h4>观点保真</h4><span class="ev7-score">4.8 <small>/ 5.0</small></span></div>
        <div class="ev7-score-track" role="meter" aria-label="观点保真" aria-valuemin="0" aria-valuemax="5" aria-valuenow="4.8"><span style="width:96%"></span></div>
        <p>保持作者结论、限定条件与阴性结果。</p>
      </article>
      <article class="ev7-dimension ev7-dim-green">
        <div class="ev7-dim-head"><span class="ev7-dim-icon"><svg class="ev7-icon" aria-hidden="true"><use href="#i-shield-check"></use></svg></span><h4>证据追溯</h4><span class="ev7-score">4.9 <small>/ 5.0</small></span></div>
        <div class="ev7-score-track" role="meter" aria-label="证据追溯" aria-valuemin="0" aria-valuemax="5" aria-valuenow="4.9"><span style="width:98%"></span></div>
        <p>将 DOI、原文位置与关键数据对应呈现。</p>
      </article>
      <article class="ev7-dimension ev7-dim-purple">
        <div class="ev7-dim-head"><span class="ev7-dim-icon"><svg class="ev7-icon" aria-hidden="true"><use href="#i-table-2"></use></svg></span><h4>图表联动</h4><span class="ev7-score">4.6 <small>/ 5.0</small></span></div>
        <div class="ev7-score-track" role="meter" aria-label="图表联动" aria-valuemin="0" aria-valuemax="5" aria-valuenow="4.6"><span style="width:92%"></span></div>
        <p>联合解读正文指标、表格与图像信息。</p>
      </article>
      <article class="ev7-dimension ev7-dim-orange">
        <div class="ev7-dim-head"><span class="ev7-dim-icon"><svg class="ev7-icon" aria-hidden="true"><use href="#i-scan-search"></use></svg></span><h4>复杂附表</h4><span class="ev7-score">3.8 <small>/ 5.0</small></span></div>
        <div class="ev7-score-track" role="meter" aria-label="复杂附表" aria-valuemin="0" aria-valuemax="5" aria-valuenow="3.8"><span style="width:76%"></span></div>
        <p>跨页小字与密集附表需要重点人工复核。</p>
      </article>
    </div>
  </div>

  <dl class="skill-evaluation-notes">
    <div class="skill-evaluation-note skill-evaluation-scope">
      <dt><svg aria-hidden="true"><use href="#i-check-check"></use></svg>适用范围</dt>
      <dd>适用于英文科研文献的结构化精读与证据初核。</dd>
    </div>
    <div class="skill-evaluation-note skill-evaluation-review">
      <dt><svg aria-hidden="true"><use href="#i-alert-triangle"></use></svg>需人工复核</dt>
      <dd>低清扫描、跨页附表及最终学术判断仍需人工确认。</dd>
    </div>
  </dl>
  <div class="ev7-method">
    <div class="ev7-method-title"><svg class="ev7-icon" aria-hidden="true"><use href="#i-clipboard-list"></use></svg><h3>评测方法</h3></div>
    <div class="ev7-method-group">
      <h4>测试集覆盖</h4>
      <div class="ev7-coverage">
        <div class="ev7-coverage-item"><svg class="ev7-icon" aria-hidden="true"><use href="#i-book-open"></use></svg><strong>标准任务</strong><p>常规 RCT 和结构化正文</p></div>
        <div class="ev7-coverage-item"><svg class="ev7-icon" aria-hidden="true"><use href="#i-git-branch"></use></svg><strong>复杂结局</strong><p>多时间点、亚组和复合终点</p></div>
        <div class="ev7-coverage-item"><svg class="ev7-icon" aria-hidden="true"><use href="#i-table-2"></use></svg><strong>补充材料</strong><p>小字号表格与图像信息</p></div>
        <div class="ev7-coverage-item"><svg class="ev7-icon" aria-hidden="true"><use href="#i-alert-triangle"></use></svg><strong>异常输入</strong><p>缺失数据、扫描件或冲突</p></div>
      </div>
    </div>
    <div class="ev7-method-group">
      <h4>统一对照流程</h4>
      <ol class="ev7-method-steps">
        <li class="ev7-method-step"><span class="ev7-step-no">01</span><strong>固定条件</strong><p>同模型、同文件与统一任务</p></li>
        <li class="ev7-method-step"><span class="ev7-step-no">02</span><strong>双组运行</strong><p>普通 Prompt 与 Skill 对照</p></li>
        <li class="ev7-method-step"><span class="ev7-step-no">03</span><strong>标准核对</strong><p>逐项比对原文与目标字段</p></li>
        <li class="ev7-method-step"><span class="ev7-step-no">04</span><strong>独立评分</strong><p>按统一 Rubric 记录差异</p></li>
      </ol>
    </div>
    <div class="ev7-method-note"><svg class="ev7-icon" aria-hidden="true"><use href="#i-file-check"></use></svg><p>记录模型与 Skill 版本、任务输入、运行次数、评分标准及原始输出，保留错误与复核记录。</p></div>
  </div>
</div>
</section><section class="content-section" id="skill-compare"><header class="section-heading"><div class="section-heading-top"><span class="section-no" aria-hidden="true">05</span><h2>实例穿透</h2></div></header><div class="penetration-grid">
                  <article class="pen-card is-prompt">
                    <div class="pen-head"><strong>普通 Prompt 裸跑</strong><span class="pen-tag">典型全局问题</span></div>
                    <div class="pen-svg-wrap">
                      <svg viewBox="0 0 320 156" role="img" aria-label="普通Prompt问题示意图">
                        <rect x="8" y="8" width="176" height="60" rx="7" fill="#fff" stroke="#f2b8c2" stroke-width="1.3"></rect>
                        <text x="18" y="30" font-size="14" font-weight="600" fill="#be123c">概括摘要（观点偏移）</text>
                        <line x1="18" y1="44" x2="168" y2="44" stroke="#f5cdd4" stroke-width="4" stroke-linecap="round"></line>
                        <line x1="18" y1="56" x2="128" y2="56" stroke="#f5cdd4" stroke-width="4" stroke-linecap="round"></line>
                        <rect x="196" y="8" width="116" height="60" rx="7" fill="#fff5f6" stroke="#f2b8c2" stroke-dasharray="4,3" stroke-width="1.3"></rect>
                        <text x="254" y="31" text-anchor="middle" font-size="14" font-weight="600" fill="#be123c">证据清单</text>
                        <text x="254" y="52" text-anchor="middle" font-size="12" fill="#9f4a59">✕ 无 DOI/页码</text>
                        <rect x="8" y="84" width="136" height="60" rx="7" fill="#fff" stroke="#e2e5eb" stroke-width="1.3"></rect>
                        <text x="76" y="108" text-anchor="middle" font-size="14" font-weight="600" fill="#2c3440">正文数据精读</text>
                        <text x="76" y="129" text-anchor="middle" font-size="12" fill="#be123c">遗漏失访率/P值</text>
                        <text x="160" y="120" text-anchor="middle" font-size="14" font-weight="700" fill="#be123c">≠</text>
                        <rect x="176" y="84" width="136" height="60" rx="7" fill="#fff" stroke="#e2e5eb" stroke-width="1.3"></rect>
                        <text x="244" y="108" text-anchor="middle" font-size="14" font-weight="600" fill="#2c3440">图表独立罗列</text>
                        <text x="244" y="129" text-anchor="middle" font-size="12" fill="#9f4a59">与数据割裂</text>
                      </svg>
                    </div>
                    <ul class="pen-points">
                      <li><span class="pen-dot" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg></span><div class="pen-note-body"><strong class="pen-note-title">观点曲解：</strong><p class="pen-note-description">把无统计学差异的次要结局写为“改善趋势”</p></div></li>
                      <li><span class="pen-dot" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg></span><div class="pen-note-body"><strong class="pen-note-title">证据清单无 DOI：</strong><p class="pen-note-description">仅给笼统结论，无法回查原文与页码</p></div></li>
                      <li><span class="pen-dot" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg></span><div class="pen-note-body"><strong class="pen-note-title">数据精读丢失：</strong><p class="pen-note-description">遗漏失访率、ITT/PP 样本差异等关键口径</p></div></li>
                      <li><span class="pen-dot" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"></path></svg></span><div class="pen-note-body"><strong class="pen-note-title">表格与数据分离：</strong><p class="pen-note-description">正文与图表数值割裂，人工二次核对繁琐</p></div></li>
                    </ul>
                  </article>

                  <article class="pen-card is-good">
                    <div class="pen-head"><strong>使用本 Skill 精读</strong><span class="pen-tag">结构化全局提升</span></div>
                    <div class="pen-svg-wrap">
                      <svg viewBox="0 0 320 156" role="img" aria-label="Skill结构化示意图">
                        <rect x="8" y="8" width="176" height="60" rx="7" fill="#fff" stroke="#8fd4bc" stroke-width="1.4"></rect>
                        <text x="18" y="30" font-size="14" font-weight="600" fill="#087f5b">✓ 锚定原始核心观点</text>
                        <text x="18" y="51" font-size="12" fill="#4f5866">保留限定条件与阴性结果</text>
                        <line x1="184" y1="38" x2="196" y2="38" stroke="#3964fe" stroke-width="1.8"></line>
                        <rect x="196" y="8" width="116" height="60" rx="7" fill="#edf3fe" stroke="#b9ccff" stroke-width="1.3"></rect>
                        <text x="254" y="31" text-anchor="middle" font-size="14" font-weight="600" fill="#3964fe">证据清单</text>
                        <text x="254" y="52" text-anchor="middle" font-size="12" fill="#2c3440">DOI + 页码可核</text>
                        <rect x="8" y="84" width="304" height="60" rx="7" fill="#eefaf5" stroke="#8fd4bc" stroke-width="1.4"></rect>
                        <text x="20" y="106" font-size="14" font-weight="600" fill="#087f5b">数据精读 + 图表解读合并输出</text>
                        <rect x="20" y="114" width="124" height="22" rx="4" fill="#fff" stroke="#bfe6d7"></rect>
                        <text x="82" y="129" text-anchor="middle" font-size="12" fill="#2c3440">HR / CI / 失访率</text>
                        <line x1="144" y1="125" x2="176" y2="125" stroke="#087f5b" stroke-width="1.8"></line>
                        <rect x="176" y="114" width="124" height="22" rx="4" fill="#fff" stroke="#bfe6d7"></rect>
                        <text x="238" y="129" text-anchor="middle" font-size="12" fill="#2c3440">Table &amp; Fig 同屏</text>
                      </svg>
                    </div>
                    <ul class="pen-points">
                      <li><span class="pen-dot" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l4 4L19 6"></path></svg></span><div class="pen-note-body"><strong class="pen-note-title">保持核心观点：</strong><p class="pen-note-description">严格忠实作者结论与统计显著性边界，零脑补</p></div></li>
                      <li><span class="pen-dot" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l4 4L19 6"></path></svg></span><div class="pen-note-body"><strong class="pen-note-title">证据清单可核验：</strong><p class="pen-note-description">每条核心数据附带 DOI 与原文页码，一键回源</p></div></li>
                      <li><span class="pen-dot" aria-hidden="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l4 4L19 6"></path></svg></span><div class="pen-note-body"><strong class="pen-note-title">数据和图表精读放到一起：</strong><p class="pen-note-description">正文指标与图表数值联动呈现，直接用于汇报</p></div></li>
                    </ul>
                  </article>
                </div></section><section class="cases-section" id="skill-cases"><header class="section-heading"><div class="section-heading-top"><span class="section-no" aria-hidden="true">06</span><h2>真实案例</h2></div></header><div class="cases-grid"><article class="actual-case-card local-action" tabindex="0" role="button" aria-label="查看案例：免疫治疗临床研究全文精读" data-message="案例入口保留，正式页面将打开现有任务对话。"><div class="case-preview tone-1"><span class="case-category">论文精读</span><svg viewBox="0 0 220 110" aria-hidden="true"><rect x="40" y="13" width="140" height="85" rx="6" fill="#fff" stroke="#cbd6ed"></rect><rect x="54" y="27" width="82" height="5" rx="2" fill="#bac9e1"></rect><rect x="54" y="41" width="110" height="3" rx="2" fill="#dfe5ed"></rect><rect x="54" y="51" width="93" height="3" rx="2" fill="#dfe5ed"></rect><rect x="54" y="61" width="108" height="3" rx="2" fill="#dfe5ed"></rect><rect x="54" y="75" width="48" height="11" rx="3" fill="#e7f0ff"></rect><rect x="109" y="75" width="54" height="11" rx="3" fill="#eaf6f0"></rect></svg></div><div class="case-copy"><h3 title="免疫治疗临床研究全文精读">免疫治疗临床研究全文精读</h3></div></article><article class="actual-case-card local-action" tabindex="0" role="button" aria-label="查看案例：心血管试验效果指标回源核对" data-message="案例入口保留，正式页面将打开现有任务对话。"><div class="case-preview tone-2"><span class="case-category">证据核验</span><svg viewBox="0 0 220 110" aria-hidden="true"><rect x="24" y="23" width="172" height="65" rx="7" fill="#fff" stroke="#cdd7e5"></rect><path d="M24 42h172M24 58h172M24 74h172M89 23v65M149 23v65" stroke="#e0e5ec"></path><rect x="90" y="43" width="59" height="14" fill="#e9f6f0"></rect><rect x="150" y="59" width="45" height="14" fill="#edf2ff"></rect><path d="M37 32h28M99 32h30M157 32h26" stroke="#b5c5dc" stroke-width="3" stroke-linecap="round"></path></svg></div><div class="case-copy"><h3 title="心血管试验效果指标回源核对">心血管试验效果指标回源核对</h3></div></article><article class="actual-case-card local-action" tabindex="0" role="button" aria-label="查看案例：临床队列论文局限性提炼" data-message="案例入口保留，正式页面将打开现有任务对话。"><div class="case-preview tone-3"><span class="case-category">组会汇报</span><svg viewBox="0 0 220 110" aria-hidden="true"><rect x="24" y="34" width="49" height="38" rx="7" fill="#fff" stroke="#bfcfff"></rect><rect x="86" y="34" width="49" height="38" rx="7" fill="#fff" stroke="#d9ccef"></rect><rect x="148" y="34" width="49" height="38" rx="7" fill="#fff" stroke="#b4decf"></rect><path d="M73 53h13m49 0h13" stroke="#a3b1c5" stroke-width="2"></path><circle cx="48" cy="46" r="5" fill="#cbdafa"></circle><path d="M38 59h20" stroke="#d9e0ec" stroke-width="3"></path><circle cx="110" cy="46" r="5" fill="#ddd1f0"></circle><path d="M99 59h22" stroke="#d9e0ec" stroke-width="3"></path><circle cx="173" cy="46" r="5" fill="#bfe7d4"></circle><path d="M163 59h20" stroke="#d9e0ec" stroke-width="3"></path></svg></div><div class="case-copy"><h3 title="临床队列论文局限性提炼">临床队列论文局限性提炼</h3></div></article><article class="actual-case-card local-action" tabindex="0" role="button" aria-label="查看案例：临床研究森林图与附表联合解读" data-message="案例入口保留，正式页面将打开现有任务对话。"><div class="case-preview tone-4"><span class="case-category">图表解析</span><svg viewBox="0 0 220 110" aria-hidden="true"><rect x="28" y="20" width="164" height="72" rx="7" fill="#fff" stroke="#d7dde7"></rect><path d="M44 78h132M44 78V35" stroke="#cbd5e1"></path><rect x="53" y="54" width="15" height="24" rx="2" fill="#cbdafa"></rect><rect x="81" y="41" width="15" height="37" rx="2" fill="#a9c5ff"></rect><rect x="109" y="60" width="15" height="18" rx="2" fill="#bddfd1"></rect><rect x="137" y="34" width="15" height="44" rx="2" fill="#89c9b0"></rect><path d="M49 43l39-17 43 13 28-9" fill="none" stroke="#829cbb" stroke-width="2" stroke-dasharray="3,3"></path></svg></div><div class="case-copy"><h3 title="临床研究森林图与附表联合解读">临床研究森林图与附表联合解读</h3></div></article></div></section></div><aside class="right-rail"><h2 class="peer-heading">科研同行都在用</h2><div class="peer-carousel" tabindex="0" aria-roledescription="carousel" aria-label="科研同行使用动态，聚焦或悬停时暂停轮换" aria-live="off"><article class="peer-slide" data-slide="0"><div class="peer-person"><img src="data:image/png;base64,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" alt="模拟用户头像" width="36" height="36"><div class="peer-identity"><div class="peer-name-row"><strong>林**</strong><time>3天前</time></div><div class="peer-tags"><span class="peer-type"><svg class="ic" aria-hidden="true"><use href="#i-shield-check"></use></svg>医院认证</span><span class="peer-role"><svg class="ic" aria-hidden="true"><use href="#i-stethoscope"></use></svg>临床医生</span></div></div></div><p class="peer-org" title="北京协和医院 · 心内科">北京协和医院 · 心内科</p><div class="peer-task"><span class="used">使用</span><a class="capability-link skill" href="#top"><svg class="ds-icon" aria-hidden="true"><use href="#ds-skill"></use></svg><span>SCI 论文精读</span><svg class="ic " aria-hidden="true"><use href="#i-arrow-up-right"></use></svg></a><p title="核验心衰研究的主要结局，整理带出处的图表与证据。">核验心衰研究的主要结局，整理带出处的图表与证据。</p></div></article><article class="peer-slide" data-slide="1" hidden><div class="peer-person"><img src="data:image/png;base64,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" alt="模拟用户头像" width="36" height="36"><div class="peer-identity"><div class="peer-name-row"><strong>陈**</strong><time>4小时前</time></div><div class="peer-tags"><span class="peer-type"><svg class="ic" aria-hidden="true"><use href="#i-shield-check"></use></svg>院校认证</span><span class="peer-role"><svg class="ic" aria-hidden="true"><use href="#i-graduation-cap"></use></svg>医学博士生</span></div></div></div><p class="peer-org" title="复旦大学上海医学院">复旦大学上海医学院</p><div class="peer-task"><span class="used">使用</span><a class="capability-link skill" href="#top"><svg class="ds-icon" aria-hidden="true"><use href="#ds-skill"></use></svg><span>SCI 论文精读</span><svg class="ic " aria-hidden="true"><use href="#i-arrow-up-right"></use></svg></a><p title="为组会精读免疫治疗论文，统一提取研究设计与局限。">为组会精读免疫治疗论文，统一提取研究设计与局限。</p></div></article><article class="peer-slide" data-slide="2" hidden><div class="peer-person"><img src="data:image/png;base64,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" alt="模拟用户头像" width="36" height="36"><div class="peer-identity"><div class="peer-name-row"><strong>周**</strong><time>2周前</time></div><div class="peer-tags"><span class="peer-type"><svg class="ic" aria-hidden="true"><use href="#i-shield-check"></use></svg>医院认证</span><span class="peer-role"><svg class="ic" aria-hidden="true"><use href="#i-user"></use></svg>研究人员</span></div></div></div><p class="peer-org" title="中山大学肿瘤防治中心">中山大学肿瘤防治中心</p><div class="peer-task"><span class="used">使用</span><a class="capability-link skill" href="#top"><svg class="ds-icon" aria-hidden="true"><use href="#ds-skill"></use></svg><span>SCI 论文精读</span><svg class="ic " aria-hidden="true"><use href="#i-arrow-up-right"></use></svg></a><p title="对照竞品研究，复核关键指标与原文页码。">对照竞品研究，复核关键指标与原文页码。</p></div></article><article class="peer-slide" data-slide="3" hidden><div class="peer-person"><img src="data:image/png;base64,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" alt="模拟用户头像" width="36" height="36"><div class="peer-identity"><div class="peer-name-row"><strong>赵**</strong><time>1个月前</time></div><div class="peer-tags"><span class="peer-type"><svg class="ic" aria-hidden="true"><use href="#i-shield-check"></use></svg>医院认证</span><span class="peer-role"><svg class="ic" aria-hidden="true"><use href="#i-stethoscope"></use></svg>住院医师</span></div></div></div><p class="peer-org" title="四川大学华西医院 · 肿瘤科">四川大学华西医院 · 肿瘤科</p><div class="peer-task"><span class="used">使用</span><a class="capability-link skill" href="#top"><svg class="ds-icon" aria-hidden="true"><use href="#ds-skill"></use></svg><span>SCI 论文精读</span><svg class="ic " aria-hidden="true"><use href="#i-arrow-up-right"></use></svg></a><p title="联合解读正文与森林图，准备课题讨论材料。">联合解读正文与森林图，准备课题讨论材料。</p></div></article></div><div class="follow-actions" aria-label="详情页快捷操作" hidden><button class="primary-btn local-action task-start" data-message="静态设计预览：此入口将连接科研工作台中的真实任务。" aria-label="使用Skill开始任务"><svg class="ds-icon" aria-hidden="true"><use href="#ds-skill"></use></svg><span>使用Skill开始任务</span></button><button class="secondary-btn demo-link" data-demo-page="skill"><svg class="ic " aria-hidden="true"><use href="#i-play"></use></svg>查看完整演示</button></div></aside></div></main></div><div class="mock-toast" role="status" aria-live="polite"></div><script data-review-controls>
(() => {
  'use strict';
  const body=document.body;
  const signal=(action,value)=>parent.postMessage({type:'kgcure-review-page',action,value},'*');
  const activate=(element,run)=>{
    element.addEventListener('click',run);
    if(element.getAttribute('role')==='button')element.addEventListener('keydown',event=>{
      if(event.key==='Enter'||event.key===' '){event.preventDefault();run();}
    });
  };
  document.querySelectorAll('.task-start').forEach(element=>activate(element,()=>signal('run')));
  document.querySelectorAll('.actual-case-card').forEach((element,index)=>activate(element,()=>signal('case',index)));
  for(const anchor of document.querySelectorAll('main a[href^="#"]')){
    anchor.addEventListener('click',event=>{
      const target=document.getElementById(anchor.getAttribute('href').slice(1));
      if(!target)return;
      event.preventDefault();
      target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
    });
  }
  const save=document.querySelector('.save-btn');
  function renderSaved(saved){
    save.setAttribute('aria-pressed',String(saved));
    save.querySelector('span').textContent=saved?'已收藏':'收藏';
  }
  renderSaved(body.dataset.saved==='true');
  window.addEventListener('message',event=>{
    if(event.source===window.parent&&event.data?.type==='kgcure-review-favorite'&&typeof event.data.saved==='boolean')renderSaved(event.data.saved);
  });
  save.addEventListener('click',()=>{
    const next=save.getAttribute('aria-pressed')!=='true';
    renderSaved(next);
    signal('save',next);
  });

  const carousel=document.querySelector('.peer-carousel');
  const slides=[...(carousel?.querySelectorAll('.peer-slide') || [])];
  let selected=0,peerTimer=null;
  const pauseReasons=new Set();
  const clearPeerTimer=()=>{if(peerTimer!==null)clearTimeout(peerTimer);peerTimer=null;};
  function schedulePeer(){
    clearPeerTimer();
    if(pauseReasons.size||document.hidden||slides.length<2)return;
    peerTimer=setTimeout(()=>{
      selected=(selected+1)%slides.length;
      slides.forEach((s,i)=>{s.hidden=i!==selected;s.classList.toggle('peer-entering',i===selected);});
      schedulePeer();
    },5200);
  }
  const pausePeer=reason=>{pauseReasons.add(reason);clearPeerTimer();};
  const resumePeer=reason=>{pauseReasons.delete(reason);schedulePeer();};
  carousel?.addEventListener('mouseenter',()=>pausePeer('pointer'));
  carousel?.addEventListener('mouseleave',()=>resumePeer('pointer'));
  carousel?.addEventListener('focusin',()=>pausePeer('focus'));
  carousel?.addEventListener('focusout',e=>{if(!carousel.contains(e.relatedTarget))resumePeer('focus');});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden)pausePeer('hidden');else resumePeer('hidden');
  });
  window.addEventListener('pagehide',clearPeerTimer);
  schedulePeer();

  const links=[...document.querySelectorAll('.anchor-nav a')];
  const targets=links.map(a=>document.querySelector(a.getAttribute('href')));
  const heroActions=document.querySelector('.hero-actions');
  const follow=document.querySelector('.follow-actions');
  let scheduled=false;
  let navigationState='';
  window.addEventListener('message',event=>{
    if(event.source!==parent||event.data?.type!=='kgcure-review-jump')return;
    const index=event.data.index;
    targets[index]?.scrollIntoView({behavior:'instant',block:'start'});
  });
  function refreshPosition(){
    let active=0;
    targets.forEach((t,i)=>{if(t&&t.getBoundingClientRect().top<=115)active=i;});
    links.forEach((a,i)=>{a.classList.toggle('current',i===active);if(i===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});
    const docked=document.querySelector('.anchor-nav').getBoundingClientRect().top<=1;
    const state=docked+':'+active;
    if(state!==navigationState){
      navigationState=state;
      signal('navigation',{docked,active,labels:links.map(link=>link.textContent.trim())});
    }
    document.documentElement.classList.toggle('review-tabs-docked',docked);
    follow.hidden=heroActions.getBoundingClientRect().bottom>=62;
    scheduled=false;
  }
  const schedulePosition=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(refreshPosition);}};
  window.addEventListener('scroll',schedulePosition,{passive:true});
  window.addEventListener('resize',schedulePosition,{passive:true});
  document.querySelector('.demo-link')?.addEventListener('click',()=>signal('demo'));
  refreshPosition();
})();
<\/script><script><\/script><script data-version="v11">(() => {
  'use strict';
  document.querySelectorAll('.hero-tags').forEach(group => {
    const tags = Array.from(group.querySelectorAll('button.category-badge'));
    tags.forEach(button => {
      button.addEventListener('click', () => {
        const select = button.getAttribute('aria-pressed') !== 'true';
        tags.forEach(tag => tag.setAttribute('aria-pressed', String(select && tag === button)));
      });
    });
  });
})();
<\/script></body></html>
`;export{e as default};
