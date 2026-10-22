// @ts-nocheck — Faithfully migrated user-supplied JavaScript class and template.
import React from "react";
import whiteLogo from "@/assets/logo-white.png.asset.json";
import darkLogo from "@/assets/logo.png.asset.json";

const FLOWS = [
  { name: 'Hipotekarni krediti', e1: 'Financiranje', e1s: 'DO 5 MIO €', e2: 'Naložba', e2s: 'ZAVAROVANO Z NEPREMIČNINO', n3: 'Nepremičnina', n3s: 'ZAVAROVANJE',
    d: 'Podjetjem zagotavljamo financiranje do 5 milijonov € ob ustreznem zavarovanju z nepremičnino.' },
  { name: 'Odkup terjatev', e1: 'Takojšnje izplačilo', e1s: 'VAŠE TERJATVE', e2: 'Sredstva', e2s: 'BREZ ČAKANJA NA KUPCA', n3: 'Poslovanje', n3s: 'LIKVIDNOST',
    d: 'Odkupimo vašo terjatev in vam sredstva izplačamo takoj, plačilo ob zapadlosti poravna dolžnik.' },
  { name: 'Kratkoročno financiranje', e1: 'Dodatna sredstva', e1s: 'ZA KRAJŠE OBDOBJE', e2: 'Premostitev', e2s: 'HITRA IZVEDBA', n3: 'Tekoče potrebe', n3s: 'KRATKOROČNO',
    d: 'Dodatna sredstva za krajše obdobje – znesek, obdobje in način vračila določimo individualno.' },
  { name: 'Projektno financiranje', e1: 'Financiranje', e1s: 'LASTNI KAPITAL', e2: 'Investicija', e2s: 'V PROJEKT', n3: 'Projekt', n3s: 'IZVEDBA INVESTICIJE',
    d: 'Financiramo poslovne in investicijske projekte – pogoje oblikujemo glede na namen in višino investicije.' }
];

const ICONS = [
  <>
    <path d="M-22,22 V-2 L0,-20 L22,-2 V22 Z M-6,22 V8 H6 V22" className="flow-17"></path>
    <path d="M-29,3 L0,-24 L29,3" strokeWidth="3" className="flow-18"></path>
  </>,
  <>
    <path d="M-16,-24 H8 L18,-14 V24 H-16 Z M8,-24 V-14 H18 M-9,-6 H10 M-9,2 H10" className="flow-17"></path>
    <path d="M-8,13 L-2,18 L10,8" strokeWidth="3" className="flow-18"></path>
  </>,
  <>
    <circle cx="0" cy="5" r="19" className="flow-17"></circle>
    <path d="M-6,-21 H6 M0,-21 V-14 M15,-11 L19,-15" className="flow-17"></path>
    <path d="M0,5 L9,-5" strokeWidth="3" className="flow-18"></path>
    <circle cx="0" cy="5" r="2.5" fill="var(--brand)" stroke="none"></circle>
  </>,
  <>
    <path d="M-28,24 V2 L-11,-9 V24 M-3,24 V-24 H25 V24 M-34,24 H34" className="flow-17"></path>
    <path d="M5,-14 H8 M15,-14 H18 M5,-4 H8 M15,-4 H18 M5,6 H8 M15,6 H18" strokeWidth="3" className="flow-18"></path>
  </>
];

export default class MoneyFlow extends React.Component {
  state = { wide: true, idx: 0 };
  root = React.createRef();
  anims = [];
  timer = null;
  visible = false;

  componentDidMount() {
    this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.onResize = () => { const el = this.root.current; const wide = (el ? el.offsetWidth : window.innerWidth) >= 640; if (wide !== this.state.wide) this.setState({ wide }); };
    this.ro = new ResizeObserver(this.onResize); this.root.current && this.ro.observe(this.root.current); this.onResize();
    // Run the glowing loop only while the diagram is on screen; it repaints every frame.
    this.io = new IntersectionObserver(([entry]) => { this.visible = entry.isIntersecting; this.syncPlayback(); }, { rootMargin: '100px 0px' });
    this.root.current && this.io.observe(this.root.current);
    this.onVisibility = () => this.syncPlayback();
    document.addEventListener('visibilitychange', this.onVisibility);
    this.start();
  }
  componentDidUpdate(p, s) {
    if (s.idx !== this.state.idx) this.swap();
    if (s.wide !== this.state.wide) this.start();
    this.syncPlayback();
  }
  componentWillUnmount() { this.stop(); this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); document.removeEventListener('visibilitychange', this.onVisibility); }

  stop() { this.anims.forEach(a => a.cancel()); this.anims = []; clearInterval(this.timer); this.timer = null; }

  syncPlayback() {
    const run = this.visible && !document.hidden;
    this.anims.forEach(a => { if (run && a.playState === 'paused') a.play(); else if (!run && a.playState === 'running') a.pause(); });
    const D = (this.props.speed ?? 4.5) * 1000;
    if (!run && this.timer) { clearInterval(this.timer); this.timer = null; }
    else if (run && !this.timer && (this.props.autoplay ?? true)) this.timer = setInterval(() => this.next(), D);
  }

  swap() {
    const r = this.root.current; if (!r || this.reduce) return;
    r.querySelectorAll('[data-swap]').forEach(el => el.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.16,1,.3,1)' }));
  }

  start() {
    this.stop();
    const r = this.root.current; if (!r) return;
    const D = (this.props.speed ?? 4.5) * 1000;
    if (!this.reduce) {
      const seg = [[0.06, 0.44], [0.5, 0.88]];
      r.querySelectorAll('[data-g]').forEach(p => {
        const [a, b] = seg[+p.getAttribute('data-g')], len = p.getAttribute('stroke-dasharray').split(' ')[0];
        this.anims.push(p.animate([{ offset: 0, strokeDashoffset: len }, { offset: a, strokeDashoffset: len, easing: 'cubic-bezier(.45,0,.25,1)' }, { offset: b, strokeDashoffset: -1000 }, { offset: 1, strokeDashoffset: -1000 }], { duration: D, iterations: Infinity }));
      });
      const hits = { 0: 0.06, 1: 0.44, 2: 0.88 };
      r.querySelectorAll('[data-n]').forEach(c => {
        const t = hits[c.getAttribute('data-n')];
        c.style.transformBox = 'fill-box'; c.style.transformOrigin = 'center';
        this.anims.push(c.animate([{ offset: 0, opacity: 0, transform: 'scale(1)' }, { offset: t - 0.001, opacity: 0, transform: 'scale(1)' }, { offset: t, opacity: 1, transform: 'scale(1)' }, { offset: Math.min(0.999, t + 0.1), opacity: 0, transform: 'scale(1.3)' }, { offset: 1, opacity: 0, transform: 'scale(1.3)' }], { duration: D, iterations: Infinity }));
      });
      const bar = r.querySelector('[data-tprog="' + this.state.idx + '"]');
      r.querySelectorAll('[data-tprog]').forEach(b => { b.style.transform = 'scaleX(0)'; });
      if (bar && (this.props.autoplay ?? true)) this.anims.push(bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: D, easing: 'linear' }));
    }
    this.anims = this.anims.filter(a => a.effect && a.effect.target && a.effect.target.isConnected);
    this.syncPlayback();
  }
  next() { this.setState(s => ({ idx: (s.idx + 1) % FLOWS.length }), () => this.start()); }
  pick(i) { this.setState({ idx: i }, () => this.start()); }

  render() {
    const v = this.renderVals();
    const icon = (tr) => <g transform={tr} fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{ICONS.map((g, i) => <g key={i} style={{ opacity: v['op' + i], transition: 'opacity .5s' }}>{g}</g>)}</g>;
    return <div ref={v.rootRef} className="flow-1">
      <div className="flow-2"></div>
      <div className="flow-3">{v.tabs.map(t => (
        <button type="button" key={t.i} onClick={t.pick} aria-pressed={t.on} className="flow-4" style={{ "--tbg": t.bg, "--tborder": t.border, "--tnum": t.numColor, "--tcolor": t.color, "--tbar": t.bar }}>
          <span className="flow-5"></span>
          <span data-tprog={t.i} className="flow-6"></span>
          <span className="flow-7">{t.num}</span>
          <span className="flow-8">{t.name}</span>
        </button>
      ))}</div>
      <div className="flow-9">
        {v.wide && <div data-wide=""><svg viewBox="0 0 1200 400" fontFamily="Geist, system-ui, sans-serif" className="flow-10">
          <defs><filter id="gw" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="7"></feGaussianBlur></filter></defs>
          <path d="M232,170 L528,170" fill="none" strokeWidth="2" className="flow-11"></path>
          <path d="M672,170 L968,170" fill="none" strokeWidth="2" className="flow-11"></path>
          <path d="M520,162 L530,170 L520,178" fill="none" strokeWidth="2" className="flow-12"></path>
          <path d="M960,162 L970,170 L960,178" fill="none" strokeWidth="2" className="flow-12"></path>
          <path data-g="0" d="M232,170 L528,170" pathLength="1000" fill="none" stroke="var(--brand)" strokeWidth="10" strokeLinecap="round" strokeDasharray="160 1200" strokeDashoffset="160" filter="url(#gw)"></path>
          <path data-g="0" d="M232,170 L528,170" pathLength="1000" fill="none" stroke="var(--pink2)" strokeWidth="3" strokeLinecap="round" strokeDasharray="160 1200" strokeDashoffset="160"></path>
          <path data-g="1" d="M672,170 L968,170" pathLength="1000" fill="none" stroke="var(--brand)" strokeWidth="10" strokeLinecap="round" strokeDasharray="160 1200" strokeDashoffset="160" filter="url(#gw)"></path>
          <path data-g="1" d="M672,170 L968,170" pathLength="1000" fill="none" stroke="var(--pink2)" strokeWidth="3" strokeLinecap="round" strokeDasharray="160 1200" strokeDashoffset="160"></path>
          <g data-swap="">
            <text x="380" y="140" textAnchor="middle" fontSize="22" fontWeight="550" letterSpacing="-0.5" className="flow-13">{v.cur.e1}</text>
            <text x="380" y="210" textAnchor="middle" fontSize="13" fontFamily="Geist Mono, monospace" letterSpacing="1.5" className="flow-14">{v.cur.e1s}</text>
            <text x="820" y="140" textAnchor="middle" fontSize="22" fontWeight="550" letterSpacing="-0.5" className="flow-13">{v.cur.e2}</text>
            <text x="820" y="210" textAnchor="middle" fontSize="13" fontFamily="Geist Mono, monospace" letterSpacing="1.5" className="flow-14">{v.cur.e2s}</text>
            <text x="1040" y="282" textAnchor="middle" fontSize="22" fontWeight="550" className="flow-13">{v.cur.n3}</text>
            <text x="1040" y="308" textAnchor="middle" fontSize="12" fontFamily="Geist Mono, monospace" letterSpacing="1.5" className="flow-15">{v.cur.n3s}</text>
          </g>
          <circle cx="160" cy="170" r="72" strokeWidth="1.5" className="flow-16"></circle>
          <circle data-n="0" cx="160" cy="170" r="72" fill="none" stroke="var(--brand)" strokeWidth="3" opacity="0"></circle>
          <image href={whiteLogo.url} x="104" y="155" width="112" height="32" className="flow-19"></image>
          <image href={darkLogo.url} x="104" y="155" width="112" height="32" className="flow-20"></image>
          <text x="160" y="282" textAnchor="middle" fontSize="22" fontWeight="550" className="flow-13">{"terjatve.si"}</text>
          <text x="160" y="308" textAnchor="middle" fontSize="12" fontFamily="Geist Mono, monospace" letterSpacing="1.5" className="flow-14">{"FINANCER"}</text>
          <circle cx="600" cy="170" r="72" strokeWidth="1.5" className="flow-16"></circle>
          <circle data-n="1" cx="600" cy="170" r="72" fill="none" stroke="var(--brand)" strokeWidth="3" opacity="0"></circle>
          <text x="600" y="180" textAnchor="middle" fontSize="28" fontWeight="600" letterSpacing="-1" className="flow-13">{"Vi"}</text>
          <text x="600" y="282" textAnchor="middle" fontSize="22" fontWeight="550" className="flow-13">{"Vaše podjetje"}</text>
          <text x="600" y="308" textAnchor="middle" fontSize="12" fontFamily="Geist Mono, monospace" letterSpacing="1.5" className="flow-14">{"PREJEMNIK"}</text>
          <circle cx="1040" cy="170" r="72" strokeWidth="1.5" className="flow-16"></circle>
          <circle data-n="2" cx="1040" cy="170" r="72" fill="none" stroke="var(--brand)" strokeWidth="3" opacity="0"></circle>
          {icon('translate(1040,170)')}
        </svg></div>}
        {v.narrow && <div data-narrow=""><svg viewBox="0 0 400 720" fontFamily="Geist, system-ui, sans-serif" className="flow-10">
          <defs><filter id="gn" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="7"></feGaussianBlur></filter></defs>
          <path d="M100,156 L100,304" fill="none" strokeWidth="2" className="flow-11"></path>
          <path d="M100,416 L100,564" fill="none" strokeWidth="2" className="flow-11"></path>
          <path d="M92,296 L100,306 L108,296" fill="none" strokeWidth="2" className="flow-12"></path>
          <path d="M92,556 L100,566 L108,556" fill="none" strokeWidth="2" className="flow-12"></path>
          <path data-g="0" d="M100,156 L100,304" pathLength="1000" fill="none" stroke="var(--brand)" strokeWidth="10" strokeLinecap="round" strokeDasharray="180 1200" strokeDashoffset="180" filter="url(#gn)"></path>
          <path data-g="0" d="M100,156 L100,304" pathLength="1000" fill="none" stroke="var(--pink2)" strokeWidth="3" strokeLinecap="round" strokeDasharray="180 1200" strokeDashoffset="180"></path>
          <path data-g="1" d="M100,416 L100,564" pathLength="1000" fill="none" stroke="var(--brand)" strokeWidth="10" strokeLinecap="round" strokeDasharray="180 1200" strokeDashoffset="180" filter="url(#gn)"></path>
          <path data-g="1" d="M100,416 L100,564" pathLength="1000" fill="none" stroke="var(--pink2)" strokeWidth="3" strokeLinecap="round" strokeDasharray="180 1200" strokeDashoffset="180"></path>
          <g data-swap="">
            <text x="134" y="226" fontSize="20" fontWeight="550" className="flow-13">{v.cur.e1}</text>
            <text x="134" y="250" fontSize="11.5" fontFamily="Geist Mono, monospace" letterSpacing="1.1" className="flow-14">{v.cur.e1s}</text>
            <text x="134" y="486" fontSize="20" fontWeight="550" className="flow-13">{v.cur.e2}</text>
            <text x="134" y="510" fontSize="11.5" fontFamily="Geist Mono, monospace" letterSpacing="1.1" className="flow-14">{v.cur.e2s}</text>
            <text x="176" y="616" fontSize="20" fontWeight="550" className="flow-13">{v.cur.n3}</text>
            <text x="176" y="640" fontSize="11.5" fontFamily="Geist Mono, monospace" letterSpacing="1.1" className="flow-15">{v.cur.n3s}</text>
          </g>
          <circle cx="100" cy="100" r="56" strokeWidth="1.5" className="flow-16"></circle>
          <circle data-n="0" cx="100" cy="100" r="56" fill="none" stroke="var(--brand)" strokeWidth="3" opacity="0"></circle>
          <image href={whiteLogo.url} x="58" y="88" width="84" height="24" className="flow-19"></image>
          <image href={darkLogo.url} x="58" y="88" width="84" height="24" className="flow-20"></image>
          <text x="176" y="96" fontSize="20" fontWeight="550" className="flow-13">{"terjatve.si"}</text>
          <text x="176" y="120" fontSize="11.5" fontFamily="Geist Mono, monospace" letterSpacing="1.1" className="flow-14">{"FINANCER"}</text>
          <circle cx="100" cy="360" r="56" strokeWidth="1.5" className="flow-16"></circle>
          <circle data-n="1" cx="100" cy="360" r="56" fill="none" stroke="var(--brand)" strokeWidth="3" opacity="0"></circle>
          <text x="100" y="369" textAnchor="middle" fontSize="24" fontWeight="600" className="flow-13">{"Vi"}</text>
          <text x="176" y="356" fontSize="20" fontWeight="550" className="flow-13">{"Vaše podjetje"}</text>
          <text x="176" y="380" fontSize="11.5" fontFamily="Geist Mono, monospace" letterSpacing="1.1" className="flow-14">{"PREJEMNIK"}</text>
          <circle cx="100" cy="620" r="56" strokeWidth="1.5" className="flow-16"></circle>
          <circle data-n="2" cx="100" cy="620" r="56" fill="none" stroke="var(--brand)" strokeWidth="3" opacity="0"></circle>
          {icon('translate(100,620) scale(.85)')}
        </svg></div>}
        <p data-swap="" className="flow-21">{v.cur.d}</p>
      </div>
    </div>;
  }

  renderVals() {
    const { wide, idx } = this.state;
    const auto = this.props.autoplay ?? true;
    const op = i => (i === idx ? 1 : 0);
    const tabs = FLOWS.map((f, i) => { const on = i === idx; return { i, on, num: '0' + (i + 1), name: f.name, bg: on ? 'color-mix(in oklch, var(--brand) 10%, transparent)' : 'var(--cardA)', border: on ? 'color-mix(in oklch, var(--brand) 60%, transparent)' : 'rgba(var(--ink),.1)', numColor: on ? 'var(--brand)' : 'rgba(var(--ink),.28)', color: on ? 'var(--fg)' : 'var(--body)', bar: on && !auto ? 1 : 0, pick: () => this.pick(i) }; });
    return { rootRef: this.root, wide, narrow: !wide, tabs, cur: FLOWS[idx], op0: op(0), op1: op(1), op2: op(2), op3: op(3) };
  }
}
