import { useSiteContent, translateContent, resolveImage, contentText } from './content';
import { useEffect, useState } from "react";
import eLayer from "@/assets/loading-e.png.asset.json";
import inkLayer from "@/assets/loading-ink-black.png.asset.json";
import dotLayer from "@/assets/loading-dot.png.asset.json";

export default function LoadingScreen() {
  const { content, text } = useSiteContent();
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const restore = () => { document.body.style.overflow = previousOverflow; };
    const images = [eLayer.url, inkLayer.url, dotLayer.url].map(src => resolveImage(content, src)).map(src => {
      const image = new Image();
      image.src = src;
      return image.decode().catch(() => undefined);
    });
    const fallback = setTimeout(() => { setVisible(false); restore(); }, 7000);
    Promise.all(images).then(() => {
      if (cancelled) return;
      setPlaying(true);
      const start = performance.now() + 100 / 1.3;
      const duration = reduced ? 250 : 2300 / 1.3;
      const tick = (now: number) => {
        const k = Math.min(1, Math.max(0, (now - start) / duration));
        const value = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        setProgress(Math.round(value * 100));
        if (k < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      timer = setTimeout(() => {
        setVisible(false);
        restore();
        clearTimeout(fallback);
      }, reduced ? 450 : 3900 / 1.3);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      clearTimeout(fallback);
      restore();
    };
  }, []);

  if (!visible) return null;
  return (
    <div className={`site-loading${playing ? " site-loading--playing" : ""}`} role="status" aria-label={text("text.1p3dy11", "Nalaganje strani")}>
      <div className="site-loading__glow" />
      <div className="site-loading__logo">
        <img className="site-loading__e-glow" src={resolveImage(content, eLayer.url)} alt="" />
        <img className="site-loading__e" src={resolveImage(content, eLayer.url)} alt="" />
        <img className="site-loading__ink" src={resolveImage(content, inkLayer.url)} alt={text("text.17tnfo8", "terjatve.si")} />
        <img className="site-loading__dot" src={resolveImage(content, dotLayer.url)} alt="" />
      </div>
      <div className="site-loading__progress" aria-hidden="true">
        <span>{text("text.loading", "Nalaganje")}</span>
        <span className="site-loading__track"><span className="site-loading__bar" /></span>
        <span className="site-loading__percent">{progress}</span>
      </div>
    </div>
  );
}