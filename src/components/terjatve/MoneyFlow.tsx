// @ts-nocheck — Faithfully migrated user-supplied JavaScript class and template.
import { useSiteContent, translateContent, resolveImage, contentText } from './content';
import React from "react";
import { Button } from "@/components/ui/button";
import whiteLogo from "@/assets/logo-white.png.asset.json";
import darkLogo from "@/assets/logo.png.asset.json";
import companyPhoto from "@/assets/podjetje.jpg.asset.json";
import { SERVICE_PHOTOS, FEATURED_IDS } from "./servicePhotos";

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

const NODE_PHOTOS = FEATURED_IDS.map(id => SERVICE_PHOTOS[id]);

export default class MoneyFlow extends React.Component {
  text(key, fallback) { return contentText(this.props.content, key, fallback); }
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
      r.querySelectorAll('[data-gh], [data-gv]').forEach(el => {
        const vertical = el.hasAttribute('data-gv');
        const [a, b] = seg[Number(el.getAttribute(vertical ? 'data-gv' : 'data-gh'))];
        const from = vertical ? 'translateY(-100%)' : 'translateX(-100%)';
        const to = vertical ? 'translateY(300%)' : 'translateX(300%)';
        this.anims.push(el.animate([{ offset: 0, transform: from }, { offset: a, transform: from, easing: 'cubic-bezier(.45,0,.25,1)' }, { offset: b, transform: to }, { offset: 1, transform: to }], { duration: D, iterations: Infinity }));
      });
      r.querySelectorAll('[data-ring]').forEach(el => {
        const t = [0.03, 0.44, 0.88][Number(el.getAttribute('data-ring'))];
        this.anims.push(el.animate([{ offset: 0, opacity: 0 }, { offset: t, opacity: 0 }, { offset: Math.min(.99, t + .04), opacity: 1 }, { offset: Math.min(.995, t + .1), opacity: 0 }, { offset: 1, opacity: 0 }], { duration: D, iterations: Infinity }));
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
    return <div ref={v.rootRef} className="flow-1">
      <div className="flow-3">{v.tabs.map(t => (
        <Button variant="original" size="original" type="button" key={t.i} onClick={t.pick} aria-pressed={t.on} className="flow-4" style={{ "--tbg": t.bg, "--tborder": t.border, "--tcolor": t.color, "--tbar": t.bar }}>
          <span className="flow-5" /><span data-tprog={t.i} className="flow-6" /><span className="flow-8">{t.name}</span>
        </Button>
      ))}</div>
      <div className="flow-9" role="group" aria-label={`${v.cur.name}: terjatve.si, vaše podjetje, poslovanje`}>
        <div className="flow-node flow-node--logo">
          <span data-ring="0" className="flow-node__ring" />
          <div className="flow-node__logos">
            <img src={resolveImage(this.props.content, whiteLogo.url)} alt={this.text("text.17tnfo8", "terjatve.si")} className="flow-19" />
            <img src={resolveImage(this.props.content, darkLogo.url)} alt={this.text("text.17tnfo8", "terjatve.si")} className="flow-20" />
          </div>
        </div>
        {this.renderConnector(0, v.cur.e1, v.cur.e1s)}
        <div className="flow-node flow-node--photo">
          <img src={resolveImage(this.props.content, companyPhoto.url)} alt={this.text("text.8a30gp", "Vaše podjetje")} className="flow-node__photo" />
          <span className="flow-node__shade" />
          <span data-ring="1" className="flow-node__ring" />
          <div className="flow-node__copy"><span className="flow-node__title">Vaše podjetje</span></div>
        </div>
        {this.renderConnector(1, v.cur.e2, v.cur.e2s)}
        <div className="flow-node flow-node--photo">
          {NODE_PHOTOS.map((src, i) => <img key={src} src={resolveImage(this.props.content, src)} alt={i === this.state.idx ? v.cur.n3 : ''} className={`flow-node__photo flow-service-photo${i === this.state.idx ? ' is-active' : ''}`} />)}
          <span className="flow-node__shade" />
          <span data-ring="2" className="flow-node__ring" />
          <div className="flow-node__copy">
            <span data-swap="" className="flow-node__badge">{v.cur.n3}</span>
            <span className="flow-node__title">Poslovanje</span>
          </div>
        </div>
      </div>
      <p data-swap="" className="flow-21">{v.cur.d}</p>
    </div>;
  }

  renderConnector(i, title, subtitle) {
    return <div className="flow-connector">
      <div className="flow-connector__track">
        <span data-gh={i} className="flow-connector__glow flow-connector__glow--horizontal" />
        <span data-gv={i} className="flow-connector__glow flow-connector__glow--vertical" />
      </div>
      <svg className="flow-connector__arrow" width="12" height="16" viewBox="0 0 12 16" fill="none" aria-hidden="true"><path d="M2 2l7 6-7 6" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div data-swap="" className="flow-connector__copy">
        <span className="flow-connector__title">{title}</span>
        <span className="flow-connector__subtitle">{subtitle}</span>
      </div>
    </div>;
  }

  renderVals() {
    const { wide, idx } = this.state;
    const auto = this.props.autoplay ?? true;
    const op = i => (i === idx ? 1 : 0);
    const tabs = FLOWS.map((f, i) => { const on = i === idx; return { i, on, num: '0' + (i + 1), name: translateContent(f.name, this.props.content), bg: on ? 'color-mix(in oklch, var(--brand) 10%, transparent)' : 'var(--cardA)', border: on ? 'color-mix(in oklch, var(--brand) 60%, transparent)' : 'rgba(var(--ink),.1)', numColor: on ? 'var(--brand)' : 'rgba(var(--ink),.28)', color: on ? 'var(--fg)' : 'var(--body)', bar: on && !auto ? 1 : 0, pick: () => this.pick(i) }; });
    return { rootRef: this.root, wide, narrow: !wide, tabs, cur: translateContent(FLOWS[idx], this.props.content), op0: op(0), op1: op(1), op2: op(2), op3: op(3) };
  }
}
