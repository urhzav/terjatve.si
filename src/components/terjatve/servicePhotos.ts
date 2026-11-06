import hipotekarni from "@/assets/service_property.png.asset.json";
import odkup from "@/assets/service_receivables.png.asset.json";
import kratkorocno from "@/assets/service_short_term.png.asset.json";
import projektno from "@/assets/service_projects.png.asset.json";

export const SERVICE_PHOTOS: Record<string, string> = {
  hipotekarni: hipotekarni.url,
  odkup: odkup.url,
  kratkorocno: kratkorocno.url,
  projektno: projektno.url,
};

export const FEATURED_IDS = ["hipotekarni", "odkup", "kratkorocno", "projektno"] as const;
