import hipotekarni from "@/assets/svc-hipotekarni.webp.asset.json";
import odkup from "@/assets/svc-odkup.webp.asset.json";
import kratkorocno from "@/assets/svc-kratkorocno.jpg.asset.json";
import projektno from "@/assets/svc-projektno.jpg.asset.json";

export const SERVICE_PHOTOS: Record<string, string> = {
  hipotekarni: hipotekarni.url,
  odkup: odkup.url,
  kratkorocno: kratkorocno.url,
  projektno: projektno.url,
};

export const FEATURED_IDS = ["hipotekarni", "odkup", "kratkorocno", "projektno"] as const;
