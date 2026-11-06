import type { MouseEvent, PointerEvent } from "react";
import { Button } from "@/components/ui/button";
import { SERVICE_PHOTOS } from "./servicePhotos";

type FeaturedService = {
  id: string;
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
  const img = SERVICE_PHOTOS[service.id];
  return (
    <Button asChild variant="original" size="original">
      <a href={`#svc-${service.id}`} onClick={service.go} onPointerMove={move} data-spot="" data-cursor="Odpri" className="featured-service">
        <span className="featured-service__spot" />
        <span className="featured-service__photo">
           {img && <img src={img} alt="" loading="lazy" />}
          <span className="featured-service__arrow"><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" /></svg></span>
        </span>
        <span className="featured-service__copy"><span className="featured-service__title">{service.name}</span><span className="featured-service__description">{service.tag}</span></span>
        <svg className="featured-service__border" aria-hidden="true" focusable="false">
          <rect pathLength="1" rx="16" width="100%" height="100%" />
        </svg>
      </a>
    </Button>
  );
}
