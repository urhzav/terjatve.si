// @ts-nocheck — Faithfully migrated user-supplied JavaScript class and template.
import React from "react";
import { Button } from "@/components/ui/button";
import whiteLogo from "@/assets/logo-white.png.asset.json";
import darkLogo from "@/assets/logo.png.asset.json";
import partnership from "@/assets/partnerstvo.jpg.asset.json";
import MoneyFlow from "./MoneyFlow";
import FeaturedServiceCard from "./FeaturedServiceCard";
import BuildingPhoto from "./BuildingPhoto";

export default class MobileSite extends React.Component {
  SERVICES = [
    { id: 'hipotekarni', name: 'Hipotekarni krediti', form: 'Hipotekarno financiranje', tag: 'Financiranje do 5 milijonov €',
      short: ['Podjetjem zagotavljamo financiranje ob ustreznem zavarovanju z nepremičnino.', 'Višino, obdobje in pogoje financiranja določimo individualno glede na želeni znesek, vrednost nepremičnine in okoliščine posameznega primera.'],
      chips: ['Do 5 milijonov €', 'Lastni kapital', 'Hitra obravnava', 'Individualni pogoji'],
      moreTitle: 'Več o hipotekarnem financiranju',
      more: ['Hipotekarno financiranje omogoča podjetjem pridobitev finančnih sredstev ob ustreznem zavarovanju z nepremičnino.', 'Omogočamo financiranje do 5 milijonov €, pri čemer se višina financiranja in pogoji določijo individualno glede na vrednost nepremičnine in posamezen posel.', 'Ker financiranje zagotavljamo z lastnim kapitalom, lahko odločitev sprejmemo hitro. Ob popolni dokumentaciji in ustreznem zavarovanju je pri določenih poslih mogoča izvedba v 2–3 dneh.'], cta: 'Pošljite povpraševanje' },
    { id: 'kratkorocno', name: 'Kratkoročno financiranje', form: 'Kratkoročno financiranje', tag: 'Hitro do dodatnih finančnih sredstev.',
      short: ['Kratkoročno financiranje je namenjeno podjetjem, ki želijo dodatna sredstva za krajše obdobje.', 'S stranko se individualno dogovorimo o znesku, obdobju financiranja in načinu vračila. Financiranje je mogoče ob ustreznem zavarovanju z nepremičnino, premičnino večje vrednosti ali drugo dogovorjeno obliko zavarovanja.'],
      chips: ['Lastni kapital', 'Hitra izvedba', 'Prilagodljivo obdobje', 'Individualni dogovor'],
      moreTitle: 'Več o kratkoročnem financiranju',
      more: ['Pri kratkoročnem financiranju najprej določimo želeni znesek in obdobje financiranja ter način vračila.', 'Glede na posamezen primer se dogovorimo tudi o ustrezni obliki zavarovanja. To je lahko nepremičnina, vozilo, delovni stroj ali druga premičnina večje vrednosti, lahko pa se glede na posel dogovorimo tudi za drugo obliko zavarovanja.', 'Ker sredstva zagotavljamo iz lastnega kapitala, lahko po prejemu potrebnih informacij in dokumentacije postopek izvedemo hitro.'], cta: 'Pošljite povpraševanje' },
    { id: 'projektno', name: 'Projektno financiranje', form: 'Projektno financiranje', tag: 'Financiranje za izvedbo vašega projekta.',
      short: ['Financiramo poslovne in investicijske projekte. Vsak projekt obravnavamo individualno ter financiranje oblikujemo glede na višino in namen investicije, obdobje financiranja ter možnosti ustreznega zavarovanja.', 'Ker financiramo z lastnim kapitalom, lahko odločitve sprejemamo hitro in se prilagodimo značilnostim posameznega projekta.'],
      chips: ['Lastni kapital', 'Hitra obravnava', 'Individualni pogoji', 'Prilagodljivo financiranje'],
      moreTitle: 'Več o projektnem financiranju',
      more: ['Projektno financiranje je namenjeno podjetjem za izvedbo poslovnih in investicijskih projektov.', 'Po prejemu osnovnih informacij pregledamo projekt, višino želenega financiranja, predvideno obdobje financiranja in možnosti zavarovanja.', 'Na podlagi konkretnega projekta pripravimo pogoje financiranja in se s stranko dogovorimo o nadaljnji izvedbi.'], cta: 'Pošljite povpraševanje' },
    { id: 'odkup', name: 'Odkup terjatev', form: 'Odkup terjatev', tag: 'Še isti dan do sredstev iz vaših terjatev.',
      short: ['Odkupujemo zapadle in nezapadle terjatve do pravnih oseb ter podjetjem omogočamo hitrejši dostop do finančnih sredstev.', 'Vsako terjatev obravnavamo individualno. Pogoji odkupa so odvisni od terjatve, dolžnika, obdobja financiranja in drugih okoliščin posameznega posla.'],
      chips: ['Zapadle in nezapadle terjatve', 'Lastni kapital', 'Hitra obravnava', 'Individualni pogoji'],
      moreTitle: 'Več o odkupu terjatev',
      more: ['Če ne želite čakati na plačilo svojega kupca, nam lahko terjatev ponudite v odkup.', 'Po prejemu osnovnih podatkov preverimo terjatev in dolžnika ter pripravimo pogoje odkupa. Višina financiranja in strošek se določita individualno glede na boniteto dolžnika, obdobje financiranja in druge značilnosti posameznega posla.', 'Po sklenitvi dogovora sredstva nakažemo vam, plačilo terjatve pa ob zapadlosti poravna dolžnik.', 'Ker odkup financiramo z lastnim kapitalom, lahko po prejemu vseh potrebnih informacij postopek izvedemo hitro.'], cta: 'Pošljite terjatev v pregled' },
    { id: 'faktoring', name: 'Dobaviteljski faktoring', form: 'Dobaviteljski faktoring', tag: 'Mi poravnamo dobavitelja. Vi pridobite čas za plačilo.',
      short: ['Mi vam poravnamo vašo obveznost do dobavitelja, vi pa obveznost do nas poravnate v dogovorjenem roku.', 'Obdobje financiranja je lahko od 1 do 3 mesecev. Višino financiranja, rok plačila in ustrezno zavarovanje določimo individualno glede na posamezen posel.'],
      chips: ['1–6 mesecev', 'Lastni kapital', 'Hitra izvedba', 'Individualni dogovor'],
      moreTitle: 'Več o dobaviteljskem faktoringu',
      more: ['Dobaviteljski faktoring podjetju omogoča, da je njegova obveznost do dobavitelja poravnana takoj, podjetje pa pridobi dodaten čas za plačilo.', 'Postopek je preprost: po dogovoru poravnamo obveznost vašemu dobavitelju, vi pa sredstva skupaj z dogovorjenim stroškom financiranja poravnate nam v dogovorjenem roku.', 'Obdobje financiranja je lahko od 1 do 3 mesece, pogoje pa določimo individualno glede na posamezen primer.', 'Tako dobavitelj prejme plačilo, vaše podjetje pa ohrani sredstva za tekoče poslovanje.'], cta: 'Pošljite povpraševanje' }
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
  TESTIMONIALS = [
    { tag: 'Hitrost', q: '»Financiranje smo potrebovali v zelo kratkem času. Od prvega pogovora do nakazila sredstev je minilo le nekaj dni.«', name: 'Ime Priimek', role: 'Direktor, Podjetje d.o.o.', ini: 'IP' },
    { tag: 'Odzivnost', q: '»Vedno dosegljivi in odzivni. Na vsako vprašanje smo dobili jasen odgovor še isti dan.«', name: 'Ime Priimek', role: 'Direktorica, Podjetje d.o.o.', ini: 'IP' },
    { tag: 'Prilagodljivost', q: '»Pogoje so oblikovali glede na naš projekt in ne obratno. Prav takšnega partnerja smo iskali.«', name: 'Ime Priimek', role: 'Direktor, Podjetje d.o.o.', ini: 'IP' }
  ];
  MARQUEE = ['Lastni kapital', 'Hitra izvedba', 'Individualni dogovor', 'Do 5 milijonov €', 'Izvedba v 2–3 dneh', '20+ let izkušenj'];
  OPTS = ['Hipotekarno financiranje', 'Kratkoročno financiranje', 'Projektno financiranje', 'Odkup terjatev', 'Dobaviteljski faktoring', 'Drugo'];

  state = { open: {}, more: {}, service: '', files: [], sent: false, sending: false, errors: {}, menu: false, slide: 0, dock: false };
  root = React.createRef();
  cleanups = [];
  anims = [];

  componentDidMount() {
    const root = this.root.current; if (!root) return;
    let t0 = null; try { t0 = localStorage.getItem('terjatve-theme'); } catch (e) {}
    this.applyTheme(t0 || document.documentElement.dataset.theme || 'dark', false);
    this.motion = (this.props.animations ?? true) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.initScroll(root);
    if (this.motion) { this.initIntro(root); this.initReveal(root); this.initLoops(root); }
  }
  componentWillUnmount() { this.cleanups.forEach(f => f()); this.io && this.io.disconnect(); this.cio && this.cio.disconnect(); this.anims.forEach(a => a.cancel()); }

  initScroll(root) {
    const nav = root.querySelector('[data-nav]'), about = root.querySelector('[data-reveal-text]'), line = root.querySelector('[data-line]'), form = root.querySelector('#povprasevanje');
    let tick = false;
    const update = () => {
      tick = false;
      const y = window.scrollY, H = window.innerHeight, max = document.documentElement.scrollHeight - H;
      nav.style.setProperty('--sp', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');
      nav.style.setProperty('--s', y > 16 || this.state.menu ? '1' : '0');
      if (about) { const r = about.getBoundingClientRect(); const p = this.motion ? Math.min(1, Math.max(0, (H * 0.85 - r.top) / (r.height + H * 0.25))) : 1; about.style.setProperty('--p', (p * 112 - 6).toFixed(2) + '%'); }
      if (line) { const r = line.getBoundingClientRect(); const p = this.motion ? Math.min(1, Math.max(0, (H * 0.75 - r.top) / r.height)) : 1; line.style.setProperty('--p', p.toFixed(3)); }
      root.querySelectorAll('[data-par]').forEach(el => { const r = el.parentElement.getBoundingClientRect(); el.style.transform = this.motion ? 'translate3d(0,' + (((r.top + r.height / 2) - H / 2) * -0.14).toFixed(1) + 'px,0)' : ''; });
      const fr = form && form.getBoundingClientRect();
      const dock = y > H * 0.8 && !(fr && fr.top < H && fr.bottom > 0);
      if (dock !== this.state.dock) this.setState({ dock });
    };
    const onScroll = () => { if (!tick) { tick = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    this.cleanups.push(() => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); });
    update();
  }

  initIntro(root) {
    const ease = 'cubic-bezier(.16,1,.3,1)';
    root.querySelectorAll('[data-iw]').forEach((w, i) => w.animate([{ transform: 'translateY(110%) rotate(4deg)' }, { transform: 'none' }], { duration: 1150, delay: 120 + i * 110, easing: ease, fill: 'backwards' }));
    root.querySelectorAll('[data-intro]').forEach(el => el.animate([{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], { duration: 1000, delay: +el.getAttribute('data-intro') || 0, easing: ease, fill: 'backwards' }));
  }

  initReveal(root) {
    const H = window.innerHeight;
    this.io = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return; this.io.unobserve(en.target);
      const el = en.target; el.style.opacity = '';
      el.animate([{ opacity: 0, transform: 'translateY(28px)' }, { opacity: 1, transform: 'none' }], { duration: 900, delay: +el.getAttribute('data-rv') || 0, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' });
    }), { rootMargin: '0px 0px -5% 0px' });
    root.querySelectorAll('[data-rv]').forEach(el => { if (el.getBoundingClientRect().top > H * 0.95) { el.style.opacity = '0'; this.io.observe(el); } });
    this.cio = new IntersectionObserver(es => es.forEach(en => {
      if (!en.isIntersecting) return; this.cio.unobserve(en.target);
      const tn = en.target.firstChild, to = +en.target.getAttribute('data-count'), fin = tn.__fin, t0 = performance.now() + 200;
      const step = now => { const k = Math.min(1, Math.max(0, (now - t0) / 1500)); tn.nodeValue = k < 1 ? String(Math.round(to * (1 - Math.pow(1 - k, 4)))) : fin; if (k < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    }), { threshold: 0.6 });
    root.querySelectorAll('[data-count]').forEach(el => { const tn = el.firstChild; if (tn && tn.nodeType === 3 && el.getBoundingClientRect().top > H * 0.9) { tn.__fin = tn.nodeValue; tn.nodeValue = '0'; this.cio.observe(el); } });
  }

  initLoops(root) {
    root.querySelectorAll('[data-marquee]').forEach(el => {
      const rev = el.getAttribute('data-marquee') === 'r';
      this.anims.push(el.animate([{ transform: 'translateX(' + (rev ? '-50%' : '0') + ')' }, { transform: 'translateX(' + (rev ? '0' : '-50%') + ')' }], { duration: +el.getAttribute('data-dur') || 30000, iterations: Infinity }));
    });
    root.querySelectorAll('[data-pulse]').forEach(el => this.anims.push(el.animate([{ transform: 'scale(1)', opacity: 0.8 }, { transform: 'scale(3)', opacity: 0 }], { duration: 2000, iterations: Infinity, easing: 'cubic-bezier(.16,1,.3,1)' })));
    root.querySelectorAll('[data-drift]').forEach(el => this.anims.push(el.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: 'translate(-10%,8%) scale(1.15)' }, { transform: 'translate(4%,-4%) scale(.95)' }, { transform: 'translate(0,0) scale(1)' }], { duration: 18000, iterations: Infinity, easing: 'ease-in-out' })));
  }

  expand(sel, open, done) {
    const el = this.root.current && this.root.current.querySelector(sel);
    if (!el || !this.motion) { done && done(); return; }
    const h = el.offsetHeight + 'px';
    const a = el.animate(open ? [{ height: '0px', opacity: 0 }, { height: h, opacity: 1 }] : [{ height: h, opacity: 1 }, { height: '0px', opacity: 0 }], { duration: open ? 550 : 380, easing: 'cubic-bezier(.16,1,.3,1)', fill: open ? 'none' : 'forwards' });
    if (done) a.onfinish = done;
  }

  toggle(id) {
    if (this.state.open[id]) this.expand('[data-detail="' + id + '"]', false, () => this.setState(s => ({ open: { ...s.open, [id]: false }, more: { ...s.more, [id]: false } })));
    else this.setState(s => ({ open: { ...s.open, [id]: true } }), () => this.expand('[data-detail="' + id + '"]', true));
  }
  toggleMore(id) {
    if (this.state.more[id]) this.expand('[data-more="' + id + '"]', false, () => this.setState(s => ({ more: { ...s.more, [id]: false } })));
    else this.setState(s => ({ more: { ...s.more, [id]: true } }), () => this.expand('[data-more="' + id + '"]', true));
  }
  scrollToId(id, off) { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' }); }
  go(e, id) { e && e.preventDefault && e.preventDefault(); if (!this.state.open[id]) this.toggle(id); setTimeout(() => this.scrollToId('svc-' + id, 76), 40); }

  setMenu(open) {
    this.setState({ menu: open }, () => {
      const m = this.root.current && this.root.current.querySelector('[data-menu]');
      if (open && m && this.motion) {
        m.animate([{ clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)' }], { duration: 600, easing: 'cubic-bezier(.16,1,.3,1)' });
        m.querySelectorAll('[data-mi]').forEach((a, i) => a.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 700, delay: 120 + i * 55, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' }));
      }
      document.body.style.overflow = open ? 'hidden' : '';
    });
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
  render() { const v = this.renderVals(); return <><p role="status" className="delivery-status">{this.state.errors.delivery}</p><div ref={v.rootRef} className="mobile-474"><header data-nav="" className="mobile-475"><div className="mobile-476"></div><div className="mobile-477"></div><div className="mobile-478"><a href="#top" aria-label="terjatve.si" className="mobile-479"><img src={whiteLogo.url} alt="terjatve.si" className="mobile-480" /><img src={darkLogo.url} alt="terjatve.si" className="mobile-481" /></a><div className="mobile-482"><Button type="button" onClick={v.toggleTheme} aria-label="Preklopi svetli / temni način" title="Svetli / temni način" className="mobile-483" variant="original" size="original"><svg width="17" height="17" viewBox="0 0 18 18" fill="none" className="mobile-484"><path d="M15 11.2A6.5 6.5 0 016.8 3a6.5 6.5 0 108.2 8.2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" className="mobile-485"></path></svg><svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mobile-486"><circle cx="9" cy="9" r="3.4" stroke="currentColor" strokeWidth="1.5" className="mobile-487"></circle><path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="mobile-488"></path></svg></Button><Button type="button" onClick={v.toggleMenu} aria-label="Meni" className="mobile-489" variant="original" size="original"><span className="mobile-490"><span className="mobile-491" style={{"--state-0": v.barTop,"--state-1": v.barRotA}}></span><span className="mobile-492" style={{"--state-0": v.barBot,"--state-1": v.barRotB}}></span></span></Button></div></div></header>{v.menuOpen && <><div data-menu="" className="mobile-493"><div className="mobile-494"></div><nav className="mobile-495">{v.menuItems.map((m, itemIndex) => <React.Fragment key={itemIndex}><a href={m.href} onClick={v.closeMenu} data-mi="" className="mobile-496"><span className="mobile-497">{m.n}</span><span className="mobile-498">{m.label}</span></a></React.Fragment>)}</nav><div className="mobile-499"><span className="mobile-500">{"B IN B FIN d.o.o."}</span><span className="mobile-501">{"Litijska cesta 43, 1000 Ljubljana"}</span></div></div></>}<section id="top" data-screen-label="Naslovnica" className="mobile-502"><div className="mobile-503"></div><div data-drift="" className="mobile-504"></div><div className="mobile-505"><div data-intro="0" className="mobile-506"><span className="mobile-507"><span className="mobile-508"></span><span data-pulse="" className="mobile-509"></span></span>{"\n      Financiranje za podjetja\n    "}</div><h1 className="mobile-510"><span className="mobile-511"><span data-iw="" className="mobile-512">{"Vaš projekt"}<span className="mobile-513">{"."}</span></span></span><span className="mobile-514"><span data-iw="" className="mobile-515">{"Naše"}</span></span><span className="mobile-516"><span data-iw="" className="mobile-517">{"financiranje"}<span className="mobile-518">{"."}</span></span></span></h1><p data-intro="450" className="mobile-519">{"Finančne rešitve, prilagojene vašim poslovnim ciljem."}</p><p data-intro="550" className="mobile-520">{"Z lastnim kapitalom zagotavljamo projektne in druge oblike financiranja za podjetja ter omogočamo takojšnje izplačilo finančnih sredstev."}</p><div data-intro="650" className="mobile-521"><a href="#povprasevanje" className="mobile-522">{"\n        Pošljite povpraševanje\n        "}<span className="mobile-523"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mobile-524"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" className="mobile-525"></path></svg></span></a><a href="#storitve" className="mobile-526">{"Naše storitve"}<svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="mobile-527"><path d="M7 1v12M2 8l5 5 5-5" stroke="currentColor" strokeWidth="1.6" className="mobile-528"></path></svg></a></div></div></section><section data-screen-label="Izpostavljene storitve" className="mobile-529"><div className="mobile-530"><span className="mobile-531">{"Izpostavljeno"}</span><span className="mobile-532"></span><span className="mobile-533">{v.slideLabel}</span></div><div data-rail="" onScroll={v.onRail} className="mobile-534">{v.featured.map(s => <FeaturedServiceCard key={s.id} service={s} />)}<span className="mobile-546"></span></div><div className="mobile-547">{v.dots.map((d, itemIndex) => <React.Fragment key={itemIndex}><span className="mobile-548" style={{"--state-0": d.w,"--state-1": d.bg}}></span></React.Fragment>)}</div></section><div className="mobile-549"><div data-marquee="" data-dur="30000" className="mobile-550">{v.marquee.map((m, itemIndex) => <React.Fragment key={itemIndex}><span className="mobile-551"><span className="mobile-552">{m}</span><span className="mobile-553"></span></span></React.Fragment>)}</div></div><BuildingPhoto full delay={140} /><section id="financiranje" data-screen-label="Financiranje za podjetja" className="mobile-554"><div data-rv="" className="mobile-555"><span className="mobile-556"></span>{"Financiranje za podjetja"}</div><h2 data-rv="60" className="mobile-557">{"Lastni kapital"}<span className="mobile-558">{"."}</span><br className="mobile-559" /><span className="mobile-560">{"Hitra izvedba"}<span className="mobile-561">{"."}</span></span><br className="mobile-562" /><span className="mobile-563">{"Individualni dogovor"}<span className="mobile-564">{"."}</span></span></h2><p data-rv="120" className="mobile-565">{"Podjetjem zagotavljamo različne oblike financiranja z lastnim kapitalom. To nam omogoča hitro odločanje, prilagodljivost in individualno obravnavo vsakega posla."}</p><div className="mobile-566"><div data-rv="" className="mobile-567"><div className="mobile-568"><span className="mobile-569">{"do"}</span><span data-count="5" className="mobile-570">{"5"}</span><span className="mobile-571">{"mio €"}</span></div><span className="mobile-572">{"Financiranje"}</span></div><div data-rv="" className="mobile-573"><div className="mobile-574"><span className="mobile-575">{"2–3"}</span><span className="mobile-576">{"dni"}</span></div><span className="mobile-577">{"Možnost izvedbe"}</span></div><div data-rv="" className="mobile-578"><div className="mobile-579"><span className="mobile-580"><span data-count="20" className="mobile-581">{"20"}</span><span className="mobile-582">{"+"}</span></span><span className="mobile-583">{"let"}</span></div><span className="mobile-584">{"Izkušenj"}</span></div></div></section><section id="storitve" data-screen-label="Storitve" className="mobile-585"><div data-rv="" className="mobile-586"><span className="mobile-587"></span>{"Storitve"}</div><h2 data-rv="60" className="mobile-588">{"Naše storitve"}<span className="mobile-589">{"."}</span></h2><div className="mobile-590">{v.services.map((s, itemIndex) => <React.Fragment key={itemIndex}><div id={s.anchor} data-rv={s.delay} className="mobile-591"><Button type="button" onClick={s.toggle} aria-expanded={s.open} className="mobile-592" variant="original" size="original"><span className="mobile-593" style={{"--state-0": s.numColor}}>{s.num}</span><span className="mobile-594"><span className="mobile-595">{s.name}</span><span className="mobile-596">{s.tag}</span></span><span className="mobile-597" style={{"--state-0": s.circleBorder,"--state-1": s.circleBg,"--state-2": s.rot}}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="mobile-598"><path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.6" className="mobile-599"></path></svg></span></Button>{s.open && <><div data-detail={s.id} className="mobile-600"><div className="mobile-601">{s.short.map((p, itemIndex) => <React.Fragment key={itemIndex}><p className="mobile-602">{p}</p></React.Fragment>)}<div className="mobile-603">{s.chips.map((c, itemIndex) => <React.Fragment key={itemIndex}><span className="mobile-604">{c}</span></React.Fragment>)}</div><div className="mobile-605"><Button type="button" onClick={s.toggleMore} className="mobile-606" variant="original" size="original">{s.moreTitle}<svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mobile-607" style={{"--state-0": s.moreRot}}><path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" className="mobile-608"></path></svg></Button>{s.moreOpen && <><div data-more={s.id} className="mobile-609"><div className="mobile-610">{s.more.map((p, itemIndex) => <React.Fragment key={itemIndex}><p className="mobile-611">{p}</p></React.Fragment>)}</div></div></>}</div><Button type="button" onClick={s.ask} className="mobile-612" variant="original" size="original">{s.cta}<span className="mobile-613"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mobile-614"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" className="mobile-615"></path></svg></span></Button></div></div></>}</div></React.Fragment>)}</div></section><section data-screen-label="Fotografija" className="mobile-616"><div data-par="" className="mobile-617"><img src={partnership.url} alt="Sklenitev dogovora o financiranju" className="mobile-618" /></div><div className="mobile-619"></div><div className="mobile-620"></div><p data-rv="" className="mobile-621">{"Osebno, hitro in prilagodljivo"}<span className="mobile-622">{"."}</span></p></section><section id="sodelovanje" data-screen-label="Kako poteka sodelovanje" className="mobile-623"><div className="mobile-624"><div data-rv="" className="mobile-625"><span className="mobile-626"></span>{"Sodelovanje"}</div><h2 data-rv="60" className="mobile-627">{"Kako poteka sodelovanje"}<span className="mobile-628">{"?"}</span></h2><div className="mobile-629"><span className="mobile-630"></span><span data-line="" className="mobile-631"></span>{v.steps.map((s, itemIndex) => <React.Fragment key={itemIndex}><div data-rv={s.delay} className="mobile-632"><span className="mobile-633">{s.n}</span><h3 className="mobile-634">{s.t}</h3><p className="mobile-635">{s.d}</p></div></React.Fragment>)}</div></div></section><section data-screen-label="Denarni tok" data-rv="" className="mobile-636"><MoneyFlow /></section><section id="prednosti" data-screen-label="Zakaj izbrati nas" className="mobile-637"><div data-rv="" className="mobile-638"><span className="mobile-639"></span>{"Prednosti"}</div><h2 data-rv="60" className="mobile-640">{"Zakaj izbrati nas"}<span className="mobile-641">{"?"}</span></h2><div className="mobile-642">{v.reasons.map((r, itemIndex) => <React.Fragment key={itemIndex}><div data-rv={r.delay} className="mobile-643"><span className="mobile-644">{r.n}</span><div className="mobile-645"><h3 className="mobile-646">{r.t}</h3><p className="mobile-647">{r.d}</p></div></div></React.Fragment>)}</div></section><section id="o-nas" data-screen-label="O nas" className="mobile-648"><div data-rv="" className="mobile-649"><span className="mobile-650"></span>{"O nas"}</div><h2 data-rv="60" className="mobile-651">{"Več kot 20 let izkušenj na področju financiranja"}<span className="mobile-652">{"."}</span></h2><p className="mobile-653"><span data-reveal-text="" className="mobile-654">{"Naša skupina podjetij se ponaša z več kot 20-letnimi izkušnjami na področju financiranja podjetij. Financiranje zagotavljamo z lastnim kapitalom, zato lahko odločitve sprejemamo hitro in vsak primer obravnavamo individualno."}</span></p><div data-rv="" className="mobile-655"><span className="mobile-656">{"Naš cilj"}</span><p className="mobile-657">{"Naš cilj je preprost: razumeti konkretno situacijo stranke, preveriti možnosti financiranja ter poiskati rešitev, ki omogoča hitro in učinkovito izvedbo posla."}</p></div></section>{v.showRefs && <><section id="reference" data-screen-label="Zaupajo nam" className="mobile-658"><div className="mobile-659"><div data-rv="" className="mobile-660"><span className="mobile-661"></span>{"Reference"}</div><h2 data-rv="60" className="mobile-662">{"Zaupajo nam"}<span className="mobile-663">{"."}</span></h2><p data-rv="100" className="mobile-664">{"Dolgoletna sodelovanja gradimo na osebnem pristopu, odzivnosti in prilagodljivih finančnih rešitvah."}</p></div><div className="mobile-665"><div data-marquee="r" data-dur="36000" className="mobile-666">{v.logos.map((l, itemIndex) => <React.Fragment key={itemIndex}><span className="mobile-667">{"Logo "}{l.n}</span></React.Fragment>)}</div></div><div className="mobile-668">{v.testimonials.map((t, itemIndex) => <React.Fragment key={itemIndex}><figure className="mobile-669"><div className="mobile-670"><span className="mobile-671">{t.tag}</span><span className="mobile-672">{"PRIMER"}</span></div><blockquote className="mobile-673">{t.q}</blockquote><figcaption className="mobile-674"><span className="mobile-675">{t.ini}</span><span className="mobile-676"><span className="mobile-677">{t.name}</span><span className="mobile-678">{t.role}</span></span></figcaption></figure></React.Fragment>)}<span className="mobile-679"></span></div></section></>}<section id="povprasevanje" data-screen-label="Povpraševanje" className="mobile-680"><div className="mobile-681"></div><div className="mobile-682"><div data-rv="" className="mobile-683"><span className="mobile-684"></span>{"Pošljite povpraševanje"}</div><h2 data-rv="60" className="mobile-685">{"Povejte nam, kaj želite financirati"}<span className="mobile-686">{"."}</span></h2><p data-rv="100" className="mobile-687">{"Predstavite nam svoj projekt, terjatev, obveznost ali želeni znesek financiranja. Na podlagi osnovnih informacij bomo preverili možnosti in vas kontaktirali glede nadaljnjih korakov."}</p></div><div className="mobile-688">{v.notSent && <><form onSubmit={v.submit} className="mobile-689"><label className="mobile-690"><span className="mobile-691">{"Ime in priimek / Podjetje *"}</span><input name="name" type="text" autoComplete="organization" placeholder="Janez Novak, Podjetje d.o.o." className="mobile-692" />{v.errors.name && <><span className="mobile-693">{v.errors.name}</span></>}</label><label className="mobile-694"><span className="mobile-695">{"E-pošta *"}</span><input name="email" type="email" inputMode="email" autoComplete="email" placeholder="ime@podjetje.si" className="mobile-696" />{v.errors.email && <><span className="mobile-697">{v.errors.email}</span></>}</label><label className="mobile-698"><span className="mobile-699">{"Telefon"}</span><input name="phone" type="tel" autoComplete="tel" placeholder="+386" className="mobile-700" /></label><div className="mobile-701"><span className="mobile-702">{"Vrsta financiranja *"}</span><div className="mobile-703">{v.serviceOpts.map((o, itemIndex) => <React.Fragment key={itemIndex}><Button type="button" onClick={o.pick} className="mobile-704" style={{"--state-0": o.border,"--state-1": o.bg,"--state-2": o.color}} variant="original" size="original">{o.label}</Button></React.Fragment>)}</div>{v.errors.service && <><span className="mobile-705">{v.errors.service}</span></>}</div><label className="mobile-706"><span className="mobile-707">{"Okvirni znesek financiranja"}</span><span className="mobile-708"><input name="amount" type="text" inputMode="numeric" placeholder="npr. 250.000" className="mobile-709" /><span className="mobile-710">{"€"}</span></span></label><label className="mobile-711"><span className="mobile-712">{"Sporočilo / kratek opis"}</span><textarea name="message" rows="4" placeholder="Na kratko opišite projekt, terjatev ali obveznost …" className="mobile-713"></textarea></label><div className="mobile-714"><label className="mobile-715"><input type="file" name="files" multiple={true} onChange={v.onFiles} className="mobile-716" /><span className="mobile-717"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mobile-718"><path d="M8 11V2M4 5.5L8 1.5l4 4M2 11v3h12v-3" stroke="currentColor" strokeWidth="1.5" className="mobile-719"></path></svg></span><span className="mobile-720"><span className="mobile-721">{"Priložite dokumentacijo"}</span><span className="mobile-722">{"Tapnite za izbiro datotek"}</span></span></label>{v.hasFiles && <><div className="mobile-723">{v.files.map((f, itemIndex) => <React.Fragment key={itemIndex}><span className="mobile-724"><span className="mobile-725"></span>{f.name}<span className="mobile-726">{f.size}</span></span></React.Fragment>)}</div></>}</div><Button type="submit" disabled={v.sending} className="mobile-727" variant="original" size="original"><span className="mobile-728">{v.submitLabel}</span><span className="mobile-729"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mobile-730"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" className="mobile-731"></path></svg></span></Button><span className="mobile-732">{"* Obvezna polja"}</span></form></>}{v.sent && <><div className="mobile-733"><span className="mobile-734"><svg width="24" height="24" viewBox="0 0 26 26" fill="none" className="mobile-735"><path d="M5 13.5l5.5 5.5L21 7.5" stroke="var(--original-ffffff)" strokeWidth="2.2" className="mobile-736"></path></svg></span><h3 className="mobile-737">{"Hvala, povpraševanje smo prejeli."}</h3><p className="mobile-738">{"Vaše povpraševanje bomo pregledali in vas kontaktirali glede nadaljnjih korakov."}</p><Button type="button" onClick={v.reset} className="mobile-739" variant="original" size="original">{"Pošljite novo povpraševanje"}</Button></div></>}</div></section><section id="kontakt" data-screen-label="Kontakt" className="mobile-740"><div data-rv="" className="mobile-741"><span className="mobile-742"></span>{"Kontakt"}</div><h2 data-rv="60" className="mobile-743">{"Imate vprašanje? Stopite v stik z nami"}<span className="mobile-744">{"."}</span></h2><p className="mobile-745">{"Z veseljem bomo preverili možnosti financiranja glede na vaše povpraševanje."}</p><div className="mobile-746"><a href="tel:+38615473622" className="mobile-747"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mobile-748"><path d="M4 2h3l1.5 4-2 1.5a10 10 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2 2A15 15 0 012 4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.5" className="mobile-749"></path></svg><span className="mobile-750">{"Pokličite"}</span><span className="mobile-751">{"01/547 36 22"}</span></a><a href="mailto:info@terjatve.si" className="mobile-752"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mobile-753"><path d="M2 4h16v12H2zM2 5l8 6 8-6" stroke="currentColor" strokeWidth="1.5" className="mobile-754"></path></svg><span className="mobile-755">{"Pišite nam"}</span><span className="mobile-756">{"info@terjatve.si"}</span></a></div><div className="mobile-757"><div className="mobile-758"><span className="mobile-759">{"Podjetje"}</span><span className="mobile-760">{"B IN B FIN d.o.o."}</span></div><div className="mobile-761"><span className="mobile-762">{"Delovni čas"}</span><span className="mobile-763">{"[ delovni čas ]"}</span></div></div><div className="mobile-764"><iframe title="Lokacija — Litijska cesta 43, Ljubljana" src="https://www.google.com/maps?q=Litijska+cesta+43,+1000+Ljubljana&z=15&output=embed" loading="lazy" className="mobile-765"></iframe><div className="mobile-766"><span data-pulse="" className="mobile-767"></span><span className="mobile-768"></span></div><a href="https://maps.app.goo.gl/Q3mMBqKGTYsGTWBQ6" target="_blank" rel="noopener" className="mobile-769"><span className="mobile-770"><span className="mobile-771">{"Litijska cesta 43, Ljubljana"}</span><span className="mobile-772">{"Prikaz lokacije"}</span></span><span className="mobile-773"><svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="mobile-774"><path d="M1 7h12M8 2l5 5-5 5" stroke="var(--original-ffffff)" strokeWidth="1.6" className="mobile-775"></path></svg></span></a></div></section><footer data-screen-label="Noga" className="mobile-776"><p className="mobile-777">{"Od prvega pogovora do finančne rešitve – osebno, hitro in prilagodljivo"}<span className="mobile-778">{"."}</span></p><div className="mobile-779">{v.services.map((s, itemIndex) => <React.Fragment key={itemIndex}><a href="#storitve" onClick={s.go} className="mobile-780">{s.name}<svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="mobile-781"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" className="mobile-782"></path></svg></a></React.Fragment>)}</div><img src={whiteLogo.url} alt="terjatve.si" className="mobile-783" /><img src={darkLogo.url} alt="terjatve.si" className="mobile-784" /><div className="mobile-785"><span className="mobile-786">{"© 2026 B IN B FIN d.o.o."}</span><span className="mobile-787">{"Litijska cesta 43, 1000 Ljubljana"}</span></div></footer><div data-dock="" className="mobile-788"><a href="#povprasevanje" className="mobile-789" style={{"--state-0": v.dockPE,"--state-1": v.dockOp,"--state-2": v.dockY}}>{"\n    Pošljite povpraševanje\n    "}<span className="mobile-790"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mobile-791"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" className="mobile-792"></path></svg></span></a></div></div></>; }

  renderVals() {
    const { open, more, service, files, sent, sending, errors, menu, slide, dock } = this.state;
    const services = this.SERVICES.map((s, i) => {
      const o = !!open[s.id], mo = !!more[s.id];
      return { ...s, num: '0' + (i + 1), anchor: 'svc-' + s.id, delay: i * 60, open: o, moreOpen: mo,
        numColor: o ? 'var(--brand)' : 'var(--mute)', circleBg: o ? 'var(--brand)' : 'transparent', circleBorder: o ? 'var(--brand)' : 'rgba(var(--ink),.2)', rot: o ? '45deg' : '0deg', moreRot: mo ? '180deg' : '0deg',
        toggle: () => this.toggle(s.id), toggleMore: () => this.toggleMore(s.id),
        ask: () => { this.setState({ service: s.form, errors: { ...errors, service: null } }); this.scrollToId('povprasevanje', 64); },
        go: e => this.go(e, s.id) };
    });
    const fmt = b => b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
    const items = [['#storitve', 'Storitve'], ['#sodelovanje', 'Sodelovanje'], ['#prednosti', 'Prednosti'], ['#o-nas', 'O nas'], ['#reference', 'Reference'], ['#kontakt', 'Kontakt']];
    return {
      rootRef: this.root, toggleTheme: () => this.applyTheme(document.documentElement.dataset.theme === 'light' ? 'dark' : 'light', true), menuOpen: menu,
      toggleMenu: () => this.setMenu(!menu), closeMenu: () => this.setMenu(false),
      barTop: menu ? '4px' : '0px', barBot: menu ? '4px' : '8.4px', barRotA: menu ? '45deg' : '0deg', barRotB: menu ? '-45deg' : '0deg',
      menuItems: items.map(([href, label], i) => ({ href, label, n: '0' + (i + 1) })),
      services, featured: services.slice(0, 3),
      slideLabel: '0' + (slide + 1) + ' / 03',
      dots: [0, 1, 2].map(i => ({ w: i === slide ? '22px' : '6px', bg: i === slide ? 'var(--brand)' : 'rgba(var(--ink),.2)' })),
      onRail: e => { const el = e.currentTarget, c = el.firstElementChild; if (!c) return; const i = Math.min(2, Math.round(el.scrollLeft / (c.offsetWidth + 10))); if (i !== slide) this.setState({ slide: i }); },
      marquee: [...this.MARQUEE, ...this.MARQUEE],
      steps: this.STEPS.map((s, i) => ({ ...s, delay: i * 90 })),
      reasons: this.REASONS.map((r, i) => ({ ...r, n: '0' + (i + 1), delay: i * 60 })),
      testimonials: this.TESTIMONIALS,
      logos: Array.from({ length: 12 }, (_, i) => ({ n: String((i % 6) + 1).padStart(2, '0') })),
      showRefs: this.props.showReferences ?? true,
      serviceOpts: this.OPTS.map(label => { const on = service === label; return { label, bg: on ? 'var(--brand)' : 'transparent', border: on ? 'var(--brand)' : 'rgba(var(--ink),.18)', color: on ? 'var(--original-ffffff)' : 'var(--soft)', pick: () => this.setState({ service: label, errors: { ...errors, service: null } }) }; }),
      errors, files, hasFiles: files.length > 0,
      onFiles: e => this.setState({ files: Array.from(e.target.files || []).map(f => ({ name: f.name, size: fmt(f.size) })) }),
      submit: e => this.submit(e), sending, submitLabel: sending ? 'Pošiljanje …' : 'Pošljite povpraševanje',
      sent, notSent: !sent,
      reset: () => this.setState({ sent: false, files: [], service: '', errors: {} }),
      dockOp: dock && !menu ? 1 : 0, dockY: dock && !menu ? '0px' : '120%', dockPE: dock && !menu ? 'auto' : 'none'
    };
  }
}
