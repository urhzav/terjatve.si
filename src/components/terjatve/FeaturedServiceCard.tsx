import type { MouseEvent, PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import ServiceArtwork from "./ServiceArtwork";

type FeaturedService = {
  id: string;
  num: string;
  name: string;
  tag: string;
  go: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export default function FeaturedServiceCard({ service }: { service: FeaturedService }) {
  const move = (event: PointerEvent<HTMLAnchorElement>) => {
    const el = event.currentTarget;
    const bounds = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
    el.style.setProperty("--my", `${event.clientY - bounds.top}px`);
  };
  return (
    <Button asChild variant="original" size="original">
      <a href={`#svc-${service.id}`} onClick={service.go} onPointerMove={move} data-spot="" data-cursor="Odpri" className="featured-service">
        <span className="featured-service__spot" />
        <span className="featured-service__top">
          <span className="featured-service__number">{service.num} / Storitev</span>
          <span className="featured-service__arrow"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" /></svg></span>
        </span>
        <ServiceArtwork id={service.id} />
        <span className="featured-service__copy"><span className="featured-service__title">{service.name}</span><span className="featured-service__description">{service.tag}</span></span>
      </a>
    </Button>
  );
}