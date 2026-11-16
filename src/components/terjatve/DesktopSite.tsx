// @ts-nocheck — Faithfully migrated user-supplied JavaScript class and template.
import { useSiteContent, translateContent, resolveImage, contentText } from './content';
import React from "react";
import { Button } from "@/components/ui/button";
import whiteLogo from "@/assets/logo-white.png.asset.json";
import darkLogo from "@/assets/logo.png.asset.json";
import partnership from "@/assets/partnerstvo.jpg.asset.json";
import MoneyFlow from "./MoneyFlow";
import FeaturedServiceCard from "./FeaturedServiceCard";
import BuildingPhoto from "./BuildingPhoto";
import { FEATURED_IDS, SERVICE_PHOTOS } from "./servicePhotos";

export default class DesktopSite extends React.Component<{ content?: Record<string, string>; animations?: boolean; customCursor?: boolean }> {
  text(key, fallback) { return contentText(this.props.content, key, fallback); }
  SERVICES = [
    { id: 'hipotekarni', name: 'Hipotekarni krediti', head: 'Hipotekarno financiranje', form: 'Hipotekarno financiranje', tag: 'Financiranje do 5 milijonov €',
      short: ['Podjetjem zagotavljamo financiranje ob ustreznem zavarovanju z nepremičnino.', 'Višino, obdobje in pogoje financiranja določimo individualno glede na želeni znesek, vrednost nepremičnine in okoliščine posameznega primera.'],
      chips: ['Do 5 milijonov €', 'Lastni kapital', 'Hitra obravnava', 'Individualni pogoji'],
      moreTitle: 'Več o hipotekarnem financiranju',
      more: ['Hipotekarno financiranje omogoča podjetjem pridobitev finančnih sredstev ob ustreznem zavarovanju z nepremičnino.', 'Omogočamo financiranje do 5 milijonov €, pri čemer se višina financiranja in pogoji določijo individualno glede na vrednost nepremičnine in posamezen posel.', 'Ker financiranje zagotavljamo z lastnim kapitalom, lahko odločitev sprejmemo hitro. Ob popolni dokumentaciji in ustreznem zavarovanju je pri določenih poslih mogoča izvedba v 2–3 dneh.'],
      moreChips: ['Do 5 milijonov €', 'Lastni kapital', 'Hitra izvedba'], cta: 'Pošljite povpraševanje' },
    { id: 'odkup', name: 'Odkup terjatev', head: 'Odkup terjatev', form: 'Odkup terjatev', tag: 'Še isti dan do sredstev iz vaših terjatev.',
      short: ['Odkupujemo zapadle in nezapadle terjatve do pravnih oseb ter podjetjem omogočamo hitrejši dostop do finančnih sredstev.', 'Vsako terjatev obravnavamo individualno. Pogoji odkupa so odvisni od terjatve, dolžnika, obdobja financiranja in drugih okoliščin posameznega posla.'],
      chips: ['Zapadle in nezapadle terjatve', 'Lastni kapital', 'Hitra obravnava', 'Individualni pogoji'],
      moreTitle: 'Več o odkupu terjatev',
      more: ['Če ne želite čakati na plačilo svojega kupca, nam lahko terjatev ponudite v odkup.', 'Po prejemu osnovnih podatkov preverimo terjatev in dolžnika ter pripravimo pogoje odkupa. Višina financiranja in strošek se določita individualno glede na boniteto dolžnika, obdobje financiranja in druge značilnosti posameznega posla.', 'Po sklenitvi dogovora sredstva nakažemo vam, plačilo terjatve pa ob zapadlosti poravna dolžnik.', 'Ker odkup financiramo z lastnim kapitalom, lahko po prejemu vseh potrebnih informacij postopek izvedemo hitro.'],
      moreChips: [], cta: 'Pošljite terjatev v pregled' },
    { id: 'kratkorocno', name: 'Kratkoročno financiranje', head: 'Kratkoročno financiranje', form: 'Kratkoročno financiranje', tag: 'Hitro do dodatnih finančnih sredstev.',
      short: ['Kratkoročno financiranje je namenjeno podjetjem, ki želijo dodatna sredstva za krajše obdobje.', 'S stranko se individualno dogovorimo o znesku, obdobju financiranja in načinu vračila. Financiranje je mogoče ob ustreznem zavarovanju z nepremičnino, premičnino večje vrednosti ali drugo dogovorjeno obliko zavarovanja.'],
      chips: ['Lastni kapital', 'Hitra izvedba', 'Prilagodljivo obdobje', 'Individualni dogovor'],
      moreTitle: 'Več o kratkoročnem financiranju',
      more: ['Pri kratkoročnem financiranju najprej določimo želeni znesek in obdobje financiranja ter način vračila.', 'Glede na posamezen primer se dogovorimo tudi o ustrezni obliki zavarovanja. To je lahko nepremičnina, vozilo, delovni stroj ali druga premičnina večje vrednosti, lahko pa se glede na posel dogovorimo tudi za drugo obliko zavarovanja.', 'Ker sredstva zagotavljamo iz lastnega kapitala, lahko po prejemu potrebnih informacij in dokumentacije postopek izvedemo hitro.'],
      moreChips: [], cta: 'Pošljite povpraševanje' },
    { id: 'projektno', name: 'Projektno financiranje', head: 'Projektno financiranje', form: 'Projektno financiranje', tag: 'Financiranje za izvedbo vašega projekta.',
      short: ['Financiramo poslovne in investicijske projekte. Vsak projekt obravnavamo individualno ter financiranje oblikujemo glede na višino in namen investicije, obdobje financiranja ter možnosti ustreznega zavarovanja.', 'Ker financiramo z lastnim kapitalom, lahko odločitve sprejemamo hitro in se prilagodimo značilnostim posameznega projekta.'],
      chips: ['Lastni kapital', 'Hitra obravnava', 'Individualni pogoji', 'Prilagodljivo financiranje'],
      moreTitle: 'Več o projektnem financiranju',
      more: ['Projektno financiranje je namenjeno podjetjem za izvedbo poslovnih in investicijskih projektov.', 'Po prejemu osnovnih informacij pregledamo projekt, višino želenega financiranja, predvideno obdobje financiranja in možnosti zavarovanja.', 'Na podlagi konkretnega projekta pripravimo pogoje financiranja in se s stranko dogovorimo o nadaljnji izvedbi.'],
      moreChips: [], cta: 'Pošljite povpraševanje' },
    { id: 'faktoring', name: 'Dobaviteljski faktoring', head: 'Dobaviteljski faktoring', form: 'Dobaviteljski faktoring', tag: 'Mi poravnamo dobavitelja. Vi pridobite čas za plačilo.',
      short: ['Mi vam poravnamo vašo obveznost do dobavitelja, vi pa obveznost do nas poravnate v dogovorjenem roku.', 'Obdobje financiranja je lahko od 1 do 3 mesecev. Višino financiranja, rok plačila in ustrezno zavarovanje določimo individualno glede na posamezen posel.'],
      chips: ['1–6 mesecev', 'Lastni kapital', 'Hitra izvedba', 'Individualni dogovor'],
      moreTitle: 'Več o dobaviteljskem faktoringu',
      more: ['Dobaviteljski faktoring podjetju omogoča, da je njegova obveznost do dobavitelja poravnana takoj, podjetje pa pridobi dodaten čas za plačilo.', 'Postopek je preprost: po dogovoru poravnamo obveznost vašemu dobavitelju, vi pa sredstva skupaj z dogovorjenim stroškom financiranja poravnate nam v dogovorjenem roku.', 'Obdobje financiranja je lahko od 1 do 3 mesece, pogoje pa določimo individualno glede na posamezen primer.', 'Tako dobavitelj prejme plačilo, vaše podjetje pa ohrani sredstva za tekoče poslovanje.'],
      moreChips: [], cta: 'Pošljite povpraševanje' }
  ];
  STEPS = [
    { n: '01', t: 'Predstavite nam svoj primer', d: 'Pošljete nam osnovne informacije o želenem financiranju, projektu, terjatvi ali obveznosti.' },
    { n: '02', t: 'Preverimo možnosti financiranja', d: 'Pregledamo znesek, obdobje financiranja, dokumentacijo in možnosti ustreznega zavarovanja.' },
    { n: '03', t: 'Dogovorimo pogoje', d: 'Vsak primer obravnavamo individualno in vam predstavimo pogoje financiranja.' },
    { n: '04', t: 'Izvedemo financiranje', d: 'Po dogovoru in prejemu potrebne dokumentacije financiranje izvedemo v najkrajšem možnem času – pri določenih poslih tudi v 2–3 dneh.' }
  ];
  REASONS = [
    { t: 'Lastni kapital', d: 'Financiranje zagotavljamo z lastnimi sredstvi, kar nam omogoča hitro odločanje in večjo prilagodljivost.' },
    { t: 'Do 5 milijonov €', d: 'Omogočamo tudi financiranje večjih poslovnih in investicijskih projektov.' },
    { t: 'Hitra izvedba', d: 'Povpraševanja obravnavamo hitro. Pri določenih poslih je ob popolni dokumentaciji mogoča izvedba v 2–3 dneh.' },
    { t: 'Individualni dogovor', d: 'Vsak primer je drugačen, zato višino, obdobje, način vračila in pogoje financiranja določimo individualno.' },
    { t: 'Več kot 20 let izkušenj', d: 'Dolgoletne izkušnje na področju financiranja podjetij nam omogočajo hitro presojo različnih poslovnih situacij.' }
  ];
  MARQUEE = ['Lastni kapital', 'Hitra izvedba', 'Individualni dogovor', 'Financiranje do 5 milijonov €', 'Izvedba v 2–3 dneh', 'Več kot 20 let izkušenj'];

  state = { open: {}, service: '', files: [], sent: false, sending: false, errors: {}, wide: true };
  root = React.createRef();
  cleanups = [];
  anims = [];
  animated = new WeakSet();

  componentDidMount() {
    const root = this.root.current; if (!root) return;
    let t0 = null; try { t0 = localStorage.getItem('terjatve-theme'); } catch (e) {}
    this.applyTheme(t0 || document.documentElement.dataset.theme || 'light', false);
    const on = (t, ev, fn, o) => { t.addEventListener(ev, fn, o); this.cleanups.push(() => t.removeEventListener(ev, fn, o)); };
    this.motion = (this.props.animations ?? true) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const resize = () => { const wide = window.innerWidth >= 960; if (wide !== this.state.wide) this.setState({ wide }); };
    resize(); on(window, 'resize', resize);
    this.initScroll(root, on);
    this.initPointer(root, on);
    if (this.motion) { this.initIntro(root); this.initReveal(root); this.initLoops(root); }
  }

  componentDidUpdate(prev) {
    if (prev.customCursor !== this.props.customCursor) this.applyCursor();
    if (prev.animations !== this.props.animations) { this.motion = this.props.animations ?? true; this.onScroll && this.onScroll(); }
  }

  componentWillUnmount() {
    this.cleanups.forEach(f => f());
    this.io && this.io.disconnect(); this.cio && this.cio.disconnect();
    this.anims.forEach(a => a.cancel());
    cancelAnimationFrame(this.raf);
  }

  initScroll(root, on) {
    const nav = root.querySelector('[data-nav]'), about = root.querySelector('[data-reveal-text]'), orb = root.querySelector('[data-orb]');
    let tick = false;
    const update = () => {
      tick = false;
      const y = window.scrollY, H = window.innerHeight, max = document.documentElement.scrollHeight - H;
      if (nav) { nav.style.setProperty('--sp', max > 0 ? Math.min(1, y / max).toFixed(4) : '0'); nav.style.setProperty('--s', y > 24 ? '1' : '0'); }
      const grid = root.querySelector('[data-steps]');
      if (grid) {
        const els = grid.querySelectorAll('[data-step]'), r = grid.getBoundingClientRect();
        const p = this.motion ? Math.min(1, Math.max(0, (H * 0.85 - r.top) / (H * 0.5))) : 1;
        els.forEach((el, i) => el.style.setProperty('--on', p >= i / els.length + 0.04 ? '1' : '0'));
      }
      if (about) {
        const r = about.getBoundingClientRect();
        const p = this.motion ? Math.min(1, Math.max(0, (H * 0.88 - r.top) / (r.height + H * 0.3))) : 1;
        about.style.setProperty('--p', (p * 112 - 6).toFixed(2) + '%');
      }
      root.querySelectorAll('[data-par]').forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        el.style.transform = this.motion ? 'translate3d(0,' + (((r.top + r.height / 2) - H / 2) * -0.12).toFixed(1) + 'px,0)' : '';
      });
      if (orb) orb.style.transform = this.motion ? 'translate3d(0,' + (y * 0.3).toFixed(1) + 'px,0)' : '';
    };
    this.onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(update); } };
    on(window, 'scroll', this.onScroll, { passive: true });
    on(window, 'resize', this.onScroll);
    update();
  }

  applyCursor() {
    this.useCursor = !!this.fine && (this.props.customCursor ?? true);
    if (this.ringEl) this.ringEl.style.display = this.useCursor ? 'block' : 'none';
  }

  initPointer(root, on) {
    const ring = root.querySelector('[data-ring]'), circ = root.querySelector('[data-ring-c]'), label = root.querySelector('[data-ring-label]'), hero = root.querySelector('[data-hero]');
    this.ringEl = ring; this.applyCursor();
    let mx = window.innerWidth * 0.7, my = window.innerHeight * 0.3, rx = mx, ry = my, gx = mx, gy = my, mag = null, last = '';
    const move = e => {
      mx = e.clientX; my = e.clientY;
      const t = e.target && e.target.closest ? e.target : null;
      const spot = t && t.closest('[data-spot]');
      if (spot && !spot.classList.contains('featured-service')) { const r = spot.getBoundingClientRect(); spot.style.setProperty('--mx', (mx - r.left) + 'px'); spot.style.setProperty('--my', (my - r.top) + 'px'); }
      const m = t && this.motion && this.fine ? t.closest('[data-magnet]') : null;
      if (mag && mag !== m) { mag.style.transform = ''; mag = null; }
      if (m) { const r = m.getBoundingClientRect(); m.style.transform = 'translate(' + ((mx - r.left - r.width / 2) * 0.18).toFixed(1) + 'px,' + ((my - r.top - r.height / 2) * 0.3).toFixed(1) + 'px)'; mag = m; }
      if (this.useCursor && circ && ring) {
        const c = t && t.closest('[data-cursor]');
        const lab = c ? c.getAttribute('data-cursor') : '';
        const inter = !lab && t && t.closest('a,button,input,select,textarea,label');
        const key = lab ? 'L' + lab : inter ? 'I' : 'N';
        if (key !== last) {
          last = key;
          circ.style.transform = lab ? 'scale(2.7)' : inter ? 'scale(1.6)' : 'scale(1)';
          circ.style.background = lab ? 'var(--brand)' : 'transparent';
          circ.style.borderColor = lab ? 'var(--brand)' : inter ? 'color-mix(in oklch, var(--fg) 85%, transparent)' : 'color-mix(in oklch, var(--fg) 55%, transparent)';
          label.textContent = lab; label.style.opacity = lab ? '1' : '0';
        }
        ring.style.opacity = '1';
      }
    };
    on(window, 'pointermove', move, { passive: true });
    on(document.documentElement, 'mouseleave', () => { if (ring) ring.style.opacity = '0'; });
    let lgx = '', lgy = '', running = false;
    const loop = () => {
      let busy = false;
      const dx = mx - rx, dy = my - ry;
      if (Math.abs(dx) > 0.2 || Math.abs(dy) > 0.2) { rx += dx * 0.2; ry += dy * 0.2; busy = true; } else { rx = mx; ry = my; }
      if (ring && this.useCursor) ring.style.transform = 'translate3d(' + rx.toFixed(1) + 'px,' + ry.toFixed(1) + 'px,0)';
      if (hero && this.motion) {
        const r = hero.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          const tx = mx - r.left, ty = my - r.top;
          if (Math.abs(tx - gx) > 1 || Math.abs(ty - gy) > 1) { gx += (tx - gx) * 0.07; gy += (ty - gy) * 0.07; busy = true; }
          const sx = gx.toFixed(0) + 'px', sy = gy.toFixed(0) + 'px';
          if (sx !== lgx) { hero.style.setProperty('--gx', sx); lgx = sx; }
          if (sy !== lgy) { hero.style.setProperty('--gy', sy); lgy = sy; }
        }
      }
      this.raf = busy ? requestAnimationFrame(loop) : 0;
      running = busy;
    };
    const kick = () => { if (!running) { running = true; this.raf = requestAnimationFrame(loop); } };
    on(window, 'pointermove', kick, { passive: true });
    on(window, 'scroll', kick, { passive: true });
    kick();
  }

  initIntro(root) {
    const ease = 'cubic-bezier(.16,1,.3,1)';
    root.querySelectorAll('[data-iw]').forEach((w, i) => w.animate([{ transform: 'translateY(110%) rotate(5deg)' }, { transform: 'none' }], { duration: 1250, delay: 150 + i * 95, easing: ease, fill: 'backwards' }));
    root.querySelectorAll('[data-intro]').forEach(el => el.animate([{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'none' }], { duration: 1100, delay: +el.getAttribute('data-intro') || 0, easing: ease, fill: 'backwards' }));
  }

  initReveal(root) {
    const H = window.innerHeight;
    this.io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      this.io.unobserve(en.target);
      const el = en.target; el.style.opacity = '';
      el.animate([{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }], { duration: 1100, delay: +el.getAttribute('data-rv') || 0, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
    }), { rootMargin: '0px 0px -6% 0px' });
    root.querySelectorAll('[data-rv]').forEach(el => { if (el.getBoundingClientRect().top > H * 0.94) { el.style.opacity = '0'; this.io.observe(el); } });

    this.cio = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return;
      this.cio.unobserve(en.target);
      const tn = en.target.firstChild; if (!tn) return;
      const to = +en.target.getAttribute('data-count'), fin = tn.__fin, t0 = performance.now() + 250;
      const step = now => { const k = Math.min(1, Math.max(0, (now - t0) / 1700)), v = 1 - Math.pow(1 - k, 4); tn.nodeValue = k < 1 ? String(Math.round(to * v)) : fin; if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }), { threshold: 0.6 });
    root.querySelectorAll('[data-count]').forEach(el => {
      const tn = el.firstChild;
      if (tn && tn.nodeType === 3 && el.getBoundingClientRect().top > H * 0.9) { tn.__fin = tn.nodeValue; tn.nodeValue = '0'; this.cio.observe(el); }
    });
  }

  initLoops(root) {
    root.querySelectorAll('[data-marquee]').forEach(el => {
      if (this.animated.has(el)) return; this.animated.add(el);
      const rev = el.getAttribute('data-marquee') === 'r';
      const a = el.animate([{ transform: 'translateX(' + (rev ? '-50%' : '0') + ')' }, { transform: 'translateX(' + (rev ? '0' : '-50%') + ')' }], { duration: +el.getAttribute('data-dur') || 40000, iterations: Infinity });
      this.anims.push(a);
      const host = el.parentElement;
      host.addEventListener('mouseenter', () => a.updatePlaybackRate(0.2));
      host.addEventListener('mouseleave', () => a.updatePlaybackRate(1));
    });
    root.querySelectorAll('[data-pulse]').forEach(el => {
      if (this.animated.has(el)) return; this.animated.add(el);
      this.anims.push(el.animate([{ transform: 'scale(1)', opacity: 0.8 }, { transform: 'scale(3.2)', opacity: 0 }], { duration: 2000, iterations: Infinity, easing: 'cubic-bezier(.16,1,.3,1)' }));
    });
    root.querySelectorAll('[data-drift]').forEach(el => {
      if (this.animated.has(el)) return; this.animated.add(el);
      this.anims.push(el.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: 'translate(-8%,6%) scale(1.14)' }, { transform: 'translate(5%,-4%) scale(.94)' }, { transform: 'translate(0,0) scale(1)' }], { duration: 20000, iterations: Infinity, easing: 'ease-in-out' }));
    });
  }

  scrollToEl(el, off) {
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' });
  }

  toggle(id) {
    const root = this.root.current;
    if (this.state.open[id]) {
      const el = root && root.querySelector('[data-detail="' + id + '"]');
      const close = () => this.setState(s => ({ open: { ...s.open, [id]: false } }));
      if (el && this.motion) {
        const a = el.animate([{ height: el.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 450, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
        a.onfinish = close;
      } else close();
    } else {
      this.setState(s => ({ open: { ...s.open, [id]: true } }), () => {
        const el = root && root.querySelector('[data-detail="' + id + '"]');
        if (el && this.motion) el.animate([{ height: '0px', opacity: 0 }, { height: el.offsetHeight + 'px', opacity: 1 }], { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)' });
      });
    }
  }

  go(e, id) {
    if (e && e.preventDefault) e.preventDefault();
    if (!this.state.open[id]) this.toggle(id);
    setTimeout(() => this.scrollToEl(document.getElementById('svc-' + id), 90), 40);
  }

  ask(form) {
    this.setState({ service: form, errors: { ...this.state.errors, service: null } });
    this.scrollToEl(document.getElementById('povprasevanje'), 70);
  }

  submit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget), errors = {};
    if (!String(fd.get('name') || '').trim()) errors.name = 'Vpišite ime in priimek ali naziv podjetja.';
    if (!/^\S+@\S+\.\S+$/.test(String(fd.get('email') || '').trim())) errors.email = 'Vpišite veljaven e-poštni naslov.';
    if (!this.state.service) errors.service = 'Izberite vrsto financiranja.';
    this.setState({ errors });
    if (Object.keys(errors).length) return;
    this.setState({ sending: true });
    this.setState({ sending: false, errors: { delivery: 'Pošiljanje še ni povezano. Za oddajo potrebujemo e-poštni naslov prejemnika.' } });
  }

  applyTheme(t, anim) {
    const d = document.documentElement;
    if (anim) { d.classList.add('theme-anim'); clearTimeout(this.tt); this.tt = setTimeout(() => d.classList.remove('theme-anim'), 650); try { localStorage.setItem('terjatve-theme', t); } catch (e) {} }
    d.dataset.theme = t;
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'light' ? 'var(--original-f6f5f2)' : 'var(--original-0a0a0b)');
  }
  render() { const v = this.renderVals(); return <><p role="status" className="delivery-status">{this.state.errors.delivery}</p><div ref={v.rootRef} className="desktop-84"><div data-ring="" className="desktop-85"><div data-ring-c="" className="desktop-86"></div><div data-ring-label="" className="desktop-87"></div></div><header data-nav="" className="desktop-88"><div className="desktop-89"></div><div className="desktop-90"></div><div className="desktop-91"><a href="#top" aria-label={this.text("text.edyrrt", "terjatve.si — na vrh")} className="desktop-92"><img src={resolveImage(this.props.content, whiteLogo.url)} alt={this.text("text.17tnfo8", "terjatve.si")} className="desktop-93" /><img src={resolveImage(this.props.content, darkLogo.url)} alt={this.text("text.17tnfo8", "terjatve.si")} className="desktop-94" /></a>{v.wide && <><nav className="desktop-95"><a href="#storitve" className="desktop-96">{this.text("text.kzcm63", "Storitve")}</a><a href="#sodelovanje" className="desktop-97">{this.text("text.1yto3dj", "Sodelovanje")}</a><a href="#o-nas" className="desktop-98">{this.text("text.1ft6yrg", "O nas")}</a><a href="#kontakt" className="desktop-100">{this.text("text.ikhj77", "Kontakt")}</a></nav></>}<div className="desktop-101"><Button type="button" onClick={v.toggleTheme} aria-label={this.text("text.nkal05", "Preklopi svetli / temni način")} title={this.text("text.4rc58z", "Svetli / temni način")} className="desktop-102" variant="original" size="original"><svg width="17" height="17" viewBox="0 0 18 18" fill="none" className="desktop-103"><path d="M15 11.2A6.5 6.5 0 016.8 3a6.5 6.5 0 108.2 8.2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="desktop-104"></path></svg><svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="desktop-105"><circle cx="9" cy="9" r="3.4" stroke="currentColor" strokeWidth="1.5" className="desktop-106"></circle><path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="desktop-107"></path></svg></Button><a href="#povprasevanje" data-magnet="" className="desktop-108"><span className="desktop-109"></span>{this.text("text.12tihsf", "\n      Povpraševanje\n      ")}<span className="desktop-110"><svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="desktop-111"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.7" className="desktop-112"></path></svg></span></a></div></div></header><section id="top" data-hero="" data-screen-label="Naslovnica" className="desktop-113"><div className="desktop-114"></div><div data-orb="" className="desktop-115"><div data-drift="" className="desktop-116"></div></div><div className="desktop-117"></div><div className="desktop-118"><div className="desktop-119"><div data-intro="0" className="desktop-120"><span className="desktop-121"><span className="desktop-122"></span><span data-pulse="" className="desktop-123"></span></span>{this.text("text.14dcb0n", "\n        Financiranje za podjetja · Lastni kapital\n      ")}</div><h1 className="desktop-124"><span className="desktop-125"><span className="desktop-126"><span data-iw="" className="desktop-127">{this.text("text.1xu6k1n", "Vaš")}</span></span>{" "}<span className="desktop-128"><span data-iw="" className="desktop-129">{this.text("text.1rg21ue", "projekt")}</span></span></span>{" "}<span className="desktop-131"><span className="desktop-132"><span data-iw="" className="desktop-133">{this.text("text.52629e", "Naše")}</span></span>{" "}<span className="desktop-134"><span data-iw="" className="desktop-135">{this.text("text.adhurj", "financiranje")}</span></span></span></h1><div className="desktop-137"><div data-intro="550" className="desktop-138"><p className="desktop-139">{this.text("text.1pzx9kq", "Finančne rešitve, prilagojene vašim poslovnim ciljem.")}</p><p className="desktop-140">{this.text("text.1xvod04", "Z lastnim kapitalom zagotavljamo projektne in druge oblike financiranja za podjetja ter omogočamo takojšnje izplačilo finančnih sredstev.")}</p></div><div data-intro="700" className="desktop-141"><p className="desktop-142">{this.text("text.1pngtr1", "Od prvega pogovora do finančne rešitve – osebno, hitro in prilagodljivo.")}</p><div className="desktop-143"><a href="#povprasevanje" data-magnet="" className="desktop-144"><span className="desktop-145"></span>{this.text("text.m6lsuf", "\n              Pošljite povpraševanje\n              ")}<span className="desktop-146"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="desktop-147"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" className="desktop-148"></path></svg></span></a><a href="#storitve" className="desktop-149">{this.text("text.5lrj5g", "Naše storitve")}<span className="desktop-150"><svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="desktop-151"><path d="M7 1v12M2 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" className="desktop-152"></path></svg></span></a></div></div></div></div><div data-intro="850" className="desktop-153"><div className="desktop-154"><span className="desktop-155">{this.text("text.1uo4smt", "Izpostavljene storitve")}</span>{" "}<span className="desktop-156"></span></div><div className="desktop-158">{v.featured.map(s => <FeaturedServiceCard key={s.id} service={s} />)}</div></div></div></section><div className="desktop-170"><div data-marquee="" data-dur="46000" className="desktop-171">{v.marquee.map((m, itemIndex) => <React.Fragment key={itemIndex}><span className="desktop-172"><span className="desktop-173">{m}</span><span className="desktop-174"></span></span></React.Fragment>)}</div></div><BuildingPhoto full delay={200} /><section id="financiranje" data-screen-label="Financiranje za podjetja" className="desktop-175"><div className="desktop-176"><div data-rv="" className="desktop-177"><span className="desktop-178"></span>{this.text("text.ohltfj", "Financiranje za podjetja")}</div><div className="desktop-179"><h2 data-rv="80" className="desktop-180"><span className="desktop-181">{this.text("text.192pma4", "Lastni kapital")}</span><span className="desktop-183">{this.text("text.1q8lhxk", "Hitra izvedba")}</span><span className="desktop-185">{this.text("text.12tu4j1", "Individualni dogovor")}</span></h2><div data-rv="180" className="desktop-187"><p className="desktop-188">{this.text("text.1lpe85q", "Podjetjem zagotavljamo različne oblike financiranja z lastnim kapitalom. To nam omogoča hitro odločanje, prilagodljivost in individualno obravnavo vsakega posla.")}</p><a href="#povprasevanje" data-magnet="" className="desktop-189"><span className="desktop-190"></span>{this.text("text.1vdubif", "\n          Pošljite povpraševanje\n          ")}<span className="desktop-191"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="desktop-192"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" className="desktop-193"></path></svg></span></a></div></div><div className="desktop-194"><div data-rv="0" className="desktop-195"><span className="desktop-196"></span><div className="desktop-197"><span className="desktop-198">{this.text("text.r80q38", "do")}</span><span data-count="5" className="desktop-199">{"5"}</span><span className="desktop-200">{this.text("text.gy7a9s", "mio €")}</span></div><div className="desktop-201">{this.text("text.4z8r2u", "Financiranje do 5 milijonov €")}</div></div><div data-rv="120" className="desktop-202"><span className="desktop-203"></span><div className="desktop-204"><span className="desktop-205">{this.text("text.1oaklcj", "2–3")}</span><span className="desktop-206">{this.text("text.1mxs1fu", "dni")}</span></div><div className="desktop-207">{this.text("text.g1dl5f", "Možnost izvedbe v 2–3 dneh")}</div></div><div data-rv="240" className="desktop-208"><span className="desktop-209"></span><div className="desktop-210"><span className="desktop-211"><span data-count="20" className="desktop-212">{this.text("text.13dvipr", "20")}</span><span className="desktop-213">{"+"}</span></span><span className="desktop-214">{this.text("text.mb9u62", "let")}</span></div><div className="desktop-215">{this.text("text.2qoapd", "Več kot 20 let izkušenj")}</div></div></div></div></section><section id="storitve" data-screen-label="Storitve" className="desktop-216"><div className="desktop-217"><div className="desktop-218"><div className="desktop-219"><div data-rv="" className="desktop-220"><span className="desktop-221"></span>{this.text("text.kzcm63", "Storitve")}</div><h2 data-rv="80" className="desktop-222">{this.text("text.5lrj5g", "Naše storitve")}</h2></div><p data-rv="160" className="desktop-224">{this.text("text.o65jh", "Izberite storitev za podrobnosti")}</p></div><div className="desktop-225">{v.services.map((s, itemIndex) => <React.Fragment key={itemIndex}><div id={s.anchor} data-rv={s.delay} className="desktop-226"><Button type="button" onClick={s.toggle} data-cursor={s.cursorLabel} aria-expanded={s.open} className="desktop-227" variant="original" size="original"><span className="desktop-228"></span><span className="desktop-229"><span className="desktop-231">{s.name}</span><span className="desktop-232">{s.tag}</span></span><span className="desktop-233" style={{"--state-0": s.circleBg,"--state-1": s.circleBorder,"--state-2": s.rot}}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="desktop-234"><path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.6" className="desktop-235"></path></svg></span></Button>{s.open && <><div data-detail={s.id} className="desktop-236"><div className="desktop-237"><div className="desktop-238">{resolveImage(this.props.content, SERVICE_PHOTOS[s.id]) && <img className="service-detail-photo" src={resolveImage(this.props.content, SERVICE_PHOTOS[s.id])} alt={s.name} loading="lazy" />}<div className="desktop-239">{s.head}</div>{s.short.map((p, itemIndex) => <React.Fragment key={itemIndex}><p className="desktop-240">{p}</p></React.Fragment>)}<div className="desktop-241">{s.chips.map((c, itemIndex) => <React.Fragment key={itemIndex}><span className="desktop-242">{c}</span></React.Fragment>)}</div></div><div className="desktop-243"><h3 className="desktop-244">{s.moreTitle}</h3>{s.more.map((p, itemIndex) => <React.Fragment key={itemIndex}><p className="desktop-245">{p}</p></React.Fragment>)}{s.hasMoreChips && <><div className="desktop-246">{s.moreChipsText}</div></>}<div className="desktop-247"><Button type="button" onClick={s.ask} data-magnet="" className="desktop-248" variant="original" size="original"><span className="desktop-249"></span>{s.cta}<span className="desktop-250"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="desktop-251"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" className="desktop-252"></path></svg></span></Button></div></div></div></div></>}</div></React.Fragment>)}</div></div></section><section id="sodelovanje" data-screen-label="Kako poteka sodelovanje" className="desktop-253"><div className="desktop-254"><div className="desktop-255"><div data-rv="" className="desktop-256"><span className="desktop-257"></span>{this.text("text.1yto3dj", "Sodelovanje")}</div><div className="desktop-258"><h2 data-rv="80" className="desktop-259">{this.text("text.1vjg7rz", "Kako poteka sodelovanje")}<span className="desktop-260">{"?"}</span></h2><p data-rv="160" className="desktop-261">{this.text("text.1b2umrd", "Od povpraševanja do financiranja v nekaj korakih")}</p></div><div data-steps="" className="desktop-262">{v.steps.map((s, itemIndex) => <React.Fragment key={itemIndex}><div data-step="" data-rv={s.delay} className="desktop-263"><span className="desktop-264"></span><span className="desktop-265"></span><h3 className="desktop-267">{s.t}</h3><p className="desktop-268">{s.d}</p></div></React.Fragment>)}</div></div></div></section><section data-screen-label="Denarni tok" data-rv="" className="desktop-269"><div className="desktop-270"><MoneyFlow content={this.props.content} /></div></section><section id="prednosti" data-screen-label="Zakaj izbrati nas" className="desktop-271"><div className="desktop-272"><div data-rv="" className="desktop-273"><span className="desktop-274"></span>{this.text("text.v0pwe9", "Prednosti")}</div><h2 data-rv="80" className="desktop-275">{this.text("text.120bzpx", "Zakaj izbrati nas")}<span className="desktop-276">{"?"}</span></h2><div className="desktop-277">{v.reasons.map((r, itemIndex) => <React.Fragment key={itemIndex}><div data-spot="" data-rv={r.delay} className="desktop-278"><span className="desktop-279"></span><div className="desktop-280"><span className="desktop-282"></span></div><div className="desktop-283"><h3 className="desktop-284">{r.t}</h3><p className="desktop-285">{r.d}</p></div></div></React.Fragment>)}</div></div></section><section data-screen-label="Fotografija" className="desktop-286"><div data-par="" className="desktop-287"><img src={resolveImage(this.props.content, partnership.url)} alt={this.text("text.1jnq5xu", "Sklenitev dogovora o financiranju")} className="desktop-288" /></div><div className="desktop-289"></div><div className="desktop-290"></div><div className="desktop-291"></div><div className="desktop-292"><p data-rv="" className="desktop-293">{this.text("text.cyybc0", "Osebno, hitro in prilagodljivo")}</p></div></section><section id="o-nas" data-screen-label="O nas" className="desktop-295"><div className="desktop-296"><div data-rv="" className="desktop-297"><span className="desktop-298"></span>{this.text("text.1ft6yrg", "O nas")}</div><h2 data-rv="80" className="desktop-299">{this.text("text.18ppef6", "Več kot 20 let izkušenj na področju financiranja")}</h2><p className="desktop-301"><span data-reveal-text="" className="desktop-302">{this.text("text.16mvslt", "Naša skupina podjetij se ponaša z več kot 20-letnimi izkušnjami na področju financiranja podjetij. Financiranje zagotavljamo z lastnim kapitalom, zato lahko odločitve sprejemamo hitro in vsak primer obravnavamo individualno")}</span></p><div className="desktop-303"><div data-rv="" className="desktop-304"><span className="desktop-305">{this.text("text.vogr8z", "Naš cilj")}</span><p className="desktop-306">{this.text("text.adzx7", "Naš cilj je preprost: razumeti konkretno situacijo stranke, preveriti možnosti financiranja ter poiskati rešitev, ki omogoča hitro in učinkovito izvedbo posla.")}</p></div></div></div></section><section id="povprasevanje" data-screen-label="Povpraševanje" className="desktop-334"><div className="desktop-335"></div><div className="desktop-336"><div className="desktop-337" style={{"--state-0": v.stickyPos}}><div data-rv="" className="desktop-338"><span className="desktop-339"></span>{this.text("text.1y4naov", "Pošljite povpraševanje")}</div><h2 data-rv="80" className="desktop-340">{this.text("text.ibvzod", "Povejte nam, kaj želite financirati")}</h2><p data-rv="160" className="desktop-342">{this.text("text.17m8hvj", "Predstavite nam svoj projekt, terjatev, obveznost ali želeni znesek financiranja. Na podlagi osnovnih informacij bomo preverili možnosti in vas kontaktirali glede nadaljnjih korakov")}</p></div><div data-rv="120" className="desktop-343">{v.notSent && <><h3 className="desktop-344">{this.text("text.10omwbk", "Skupaj poiščimo ustrezno finančno rešitev")}</h3><p className="desktop-345">{this.text("text.1xs7kug", "Potrebujete financiranje ali želite preveriti možnosti sodelovanja? Predstavite nam svoj projekt oziroma želeno obliko financiranja in osnovne podatke, mi pa bomo vaše povpraševanje pregledali ter vas kontaktirali.")}</p><form onSubmit={v.submit} className="desktop-346"><label className="desktop-347"><span className="desktop-348">{this.text("text.1fl2li8", "Ime in priimek / Podjetje *")}</span><input name="name" type="text" autoComplete="organization" placeholder={this.text("text.1gg8v0x", "Janez Novak, Podjetje d.o.o.")} className="desktop-349" />{v.errors.name && <><span className="desktop-350">{v.errors.name}</span></>}</label><label className="desktop-351"><span className="desktop-352">{this.text("text.1l1xqg0", "E-pošta *")}</span><input name="email" type="text" inputMode="email" autoComplete="email" placeholder={this.text("text.e4dtjl", "ime@podjetje.si")} className="desktop-353" />{v.errors.email && <><span className="desktop-354">{v.errors.email}</span></>}</label><label className="desktop-355"><span className="desktop-356">{this.text("text.183zvks", "Telefon")}</span><input name="phone" type="tel" autoComplete="tel" placeholder={this.text("text.ghmpq5", "+386")} className="desktop-357" /></label><label className="desktop-358"><span className="desktop-359">{this.text("text.oc45cj", "Vrsta financiranja *")}</span><span className="desktop-360"><select name="service" value={v.service} onChange={v.onService} className="desktop-361"><option value="" className="desktop-362">{this.text("text.14sxirx", "Izberite vrsto financiranja")}</option><option value="Hipotekarno financiranje" className="desktop-363">{this.text("text.p5mqdx", "Hipotekarno financiranje")}</option><option value="Kratkoročno financiranje" className="desktop-364">{this.text("text.rhinnu", "Kratkoročno financiranje")}</option><option value="Projektno financiranje" className="desktop-365">{this.text("text.cw3ggl", "Projektno financiranje")}</option><option value="Odkup terjatev" className="desktop-366">{this.text("text.6a6cy7", "Odkup terjatev")}</option><option value="Dobaviteljski faktoring" className="desktop-367">{this.text("text.1o8p6an", "Dobaviteljski faktoring")}</option><option value="Drugo" className="desktop-368">{this.text("text.tajgio", "Drugo")}</option></select><svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="desktop-369"><path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" className="desktop-370"></path></svg></span>{v.errors.service && <><span className="desktop-371">{v.errors.service}</span></>}</label><label className="desktop-372"><span className="desktop-373">{this.text("text.177lq4n", "Okvirni znesek financiranja")}</span><span className="desktop-374"><input name="amount" type="text" inputMode="numeric" placeholder={this.text("text.j6z8i6", "npr. 250.000")} className="desktop-375" /><span className="desktop-376">{"€"}</span></span></label><label className="desktop-377"><span className="desktop-378">{this.text("text.110ovml", "Sporočilo / kratek opis povpraševanja")}</span><textarea name="message" rows="4" placeholder={this.text("text.1i31qj5", "Na kratko opišite projekt, terjatev ali obveznost …")} className="desktop-379"></textarea></label><div className="desktop-380"><label className="desktop-381"><input type="file" name="files" multiple={true} onChange={v.onFiles} className="desktop-382" /><span className="desktop-383"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="desktop-384"><path d="M8 11V2M4 5.5L8 1.5l4 4M2 11v3h12v-3" stroke="currentColor" strokeWidth="1.5" className="desktop-385"></path></svg></span><span className="desktop-386"><span className="desktop-387">{this.text("text.vmttga", "Priložite dokumentacijo")}</span><span className="desktop-388">{this.text("text.9zawpn", "Povlecite datoteke sem ali kliknite za izbiro")}</span></span></label>{v.hasFiles && <><div className="desktop-389">{v.files.map((f, itemIndex) => <React.Fragment key={itemIndex}><span className="desktop-390"><span className="desktop-391"></span>{f.name}<span className="desktop-392">{f.size}</span></span></React.Fragment>)}</div></>}</div><div className="desktop-393"><span className="desktop-394">{this.text("text.ttktvw", "* Obvezna polja")}</span><Button type="submit" disabled={v.sending} data-magnet="" className="desktop-395" variant="original" size="original"><span className="desktop-396"></span>{v.notSending && <><span className="desktop-397">{this.text("text.1y4naov", "Pošljite povpraševanje")}</span></>}{v.sending && <><span className="desktop-398">{this.text("text.csoafc", "Pošiljanje …")}</span></>}<span className="desktop-399"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="desktop-400"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" className="desktop-401"></path></svg></span></Button></div></form></>}{v.sent && <><div className="desktop-402"><span className="desktop-403"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="desktop-404"><path d="M5 13.5l5.5 5.5L21 7.5" stroke="var(--original-ffffff)" strokeWidth="2.2" className="desktop-405"></path></svg></span><h3 className="desktop-406">{this.text("text.11aik1p", "Hvala, povpraševanje smo prejeli")}</h3><p className="desktop-407">{this.text("text.102qgxv", "Vaše povpraševanje bomo pregledali in vas kontaktirali glede nadaljnjih korakov.")}</p><Button type="button" onClick={v.reset} className="desktop-408" variant="original" size="original">{this.text("text.ak30o1", "Pošljite novo povpraševanje")}</Button></div></>}</div></div></section><section id="kontakt" data-screen-label="Kontakt" className="desktop-409"><div className="desktop-410"><div className="desktop-411"><div data-rv="" className="desktop-412"><span className="desktop-413"></span>{this.text("text.ikhj77", "Kontakt")}</div><h2 data-rv="80" className="desktop-414">{this.text("text.1hixy3k", "Imate vprašanje? Stopite v stik z nami")}</h2><p data-rv="140" className="desktop-416">{this.text("text.1m90pyf", "Z veseljem bomo preverili možnosti financiranja glede na vaše povpraševanje")}</p><div data-rv="200" className="desktop-417"><div className="desktop-418"><span className="desktop-419"></span><span className="desktop-420">{this.text("text.plih3u", "Podjetje")}</span><span className="desktop-421">{this.text("text.18oemnv", "B IN B FIN d.o.o.")}</span></div><div className="desktop-422"><span className="desktop-423"></span><span className="desktop-424">{this.text("text.orkjlu", "Naslov")}</span><span className="desktop-425">{this.text("text.1up552f", "Litijska cesta 43, 1000 Ljubljana")}</span></div><div className="desktop-426"><span className="desktop-427"></span><span className="desktop-428">{this.text("text.183zvks", "Telefon")}</span><span className="desktop-429">{this.text("text.1iz3zxo", "01/547 36 22")}</span></div><div className="desktop-430"><span className="desktop-431"></span><span className="desktop-432">{this.text("text.vjaxgu", "E-pošta")}</span><span className="desktop-433">{this.text("text.82iw8q", "info@terjatve.si")}</span></div><div className="desktop-434"><span className="desktop-435"></span><span className="desktop-436">{this.text("text.nrj4u1", "Delovni čas")}</span><span className="desktop-437">{this.text("text.1dyml7e", "Ponedeljek–petek: 7.30–15.30")}</span></div></div></div><div className="desktop-438-col"><div data-rv="160" className="desktop-438"><iframe title={this.text("text.aobnme", "Lokacija — Litijska cesta 43, Ljubljana")} src="https://www.google.com/maps?q=Litijska+cesta+43,+1000+Ljubljana&z=15&output=embed" loading="lazy" className="desktop-439"></iframe><div className="desktop-440"><span data-pulse="" className="desktop-441"></span><span className="desktop-442"></span></div><a href="https://maps.app.goo.gl/Q3mMBqKGTYsGTWBQ6" target="_blank" rel="noopener" data-cursor="Zemljevid" className="desktop-443"><span className="desktop-444"><span className="desktop-445">{this.text("text.1up552f", "Litijska cesta 43, 1000 Ljubljana")}</span><span className="desktop-446">{this.text("text.lkpg4o", "Prikaz lokacije")}</span></span><span className="desktop-447"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="desktop-448"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" className="desktop-449"></path></svg></span></a></div></div></div></section><footer data-screen-label="Noga" className="desktop-450"><div className="desktop-451"><div className="desktop-452"><p className="desktop-453">{this.text("text.1qczl7l", "Od prvega pogovora do finančne rešitve – osebno, hitro in prilagodljivo")}</p><div className="desktop-455"><div className="desktop-456"><span className="desktop-457">{this.text("text.kzcm63", "Storitve")}</span>{v.services.map((s, itemIndex) => <React.Fragment key={itemIndex}><a href="#storitve" onClick={s.go} className="desktop-458">{s.name}</a></React.Fragment>)}</div><div className="desktop-459"><span className="desktop-460">{this.text("text.plih3u", "Podjetje")}</span><a href="#sodelovanje" className="desktop-461">{this.text("text.1yto3dj", "Sodelovanje")}</a><a href="#prednosti" className="desktop-462">{this.text("text.v0pwe9", "Prednosti")}</a><a href="#o-nas" className="desktop-463">{this.text("text.1ft6yrg", "O nas")}</a><a href="#povprasevanje" className="desktop-464">{this.text("text.1ln7m4n", "Povpraševanje")}</a><a href="#kontakt" className="desktop-465">{this.text("text.ikhj77", "Kontakt")}</a></div></div></div><img data-rv="" src={resolveImage(this.props.content, whiteLogo.url)} alt={this.text("text.17tnfo8", "terjatve.si")} className="desktop-466" /><img data-rv="" src={resolveImage(this.props.content, darkLogo.url)} alt={this.text("text.17tnfo8", "terjatve.si")} className="desktop-467" /><div className="desktop-468"><span className="desktop-469">{this.text("text.103meaj", "© 2026 B IN B FIN d.o.o. · Litijska cesta 43, 1000 Ljubljana")}</span><a href="#top" className="desktop-470">{this.text("text.7ttjko", "Na vrh")}<span className="desktop-471"><svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="desktop-472"><path d="M7 13V1M2 6l5-5 5 5" stroke="currentColor" strokeWidth="1.6" className="desktop-473"></path></svg></span></a></div></div><a href="/piskotki" className="legal-footer-link">{this.text("text.piskotki", "Piškotki")}</a></footer></div></>; }

  renderVals() {
    const { open, service, files, sent, sending, errors, wide } = this.state;
    const services = translateContent(this.SERVICES, this.props.content).map((s, i) => {
      const isOpen = !!open[s.id];
      return { ...s, num: '0' + (i + 1), anchor: 'svc-' + s.id, delay: i * 70, open: isOpen,
        cursorLabel: isOpen ? 'Zapri' : 'Odpri',
        circleBg: isOpen ? 'var(--brand)' : 'rgba(213,30,104,var(--h))',
        circleBorder: isOpen ? 'var(--brand)' : 'rgba(var(--ink),.2)',
        rot: isOpen ? '45deg' : 'calc(var(--h) * 90deg)',
        hasMoreChips: s.moreChips.length > 0, moreChipsText: s.moreChips.join('  •  '),
        toggle: () => this.toggle(s.id), ask: () => this.ask(s.form), go: e => this.go(e, s.id) };
    });
    const fmt = b => b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
    return {
      rootRef: this.root, stickyPos: 'relative', toggleTheme: () => this.applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light', true), wide,
      services, featured: FEATURED_IDS.flatMap(id => { const service = services.find(s => s.id === id); return service ? [service] : []; }).map((s, i) => ({ ...s, num: '0' + (i + 1), img: resolveImage(this.props.content, SERVICE_PHOTOS[s.id]) })),
      marquee: [...translateContent(this.MARQUEE, this.props.content), ...translateContent(this.MARQUEE, this.props.content)],
      steps: translateContent(this.STEPS, this.props.content).map((s, i) => ({ ...s, delay: i * 110 })),
      reasons: translateContent(this.REASONS, this.props.content).map((r, i) => ({ ...r, n: '0' + (i + 1) + ' / 05', delay: i * 80 })),
      service, errors, files, hasFiles: files.length > 0,
      onService: e => this.setState({ service: e.target.value, errors: { ...errors, service: null } }),
      onFiles: e => this.setState({ files: Array.from(e.target.files || []).map(f => ({ name: f.name, size: fmt(f.size) })) }),
      submit: e => this.submit(e),
      sent, notSent: !sent, sending, notSending: !sending,
      reset: () => this.setState({ sent: false, files: [], service: '', errors: {} })
    };
  }
}
