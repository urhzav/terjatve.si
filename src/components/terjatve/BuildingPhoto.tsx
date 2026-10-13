// @ts-nocheck — Faithfully migrated user-supplied layout (stavba.html).
import React from "react";
import building from "@/assets/stavba.webp.asset.json";

type Props = {
  /** Wide = card spans the column, building rises above its top edge. */
  wide?: boolean;
  /** Scroll-reveal delay in ms, matching the section's data-rv rhythm. */
  delay?: number;
};

export default function BuildingPhoto({ wide = false, delay = 0 }: Props) {
  return (
    <div
      className={`building-photo building-photo--${wide ? "wide" : "narrow"}`}
      data-rv={String(delay)}
    >
      <div className="building-photo__box">
        <div className="building-photo__edge" />
        <div className="building-photo__card" />

        <img className="building-photo__img" src={building.url} alt="Poslovna stavba terjatve.si" />
        <div className="building-photo__top" aria-hidden="true">
          <img className="building-photo__top-img" src={building.url} alt="" />
        </div>
      </div>
    </div>
  );
}
