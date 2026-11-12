import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getPublicContent } from "@/components/cms/content.functions";
import { SiteContentProvider } from "@/components/terjatve/content";
import { useEffect, useState } from "react";
import DesktopSite from "@/components/terjatve/DesktopSite";
import MobileSite from "@/components/terjatve/MobileSite";
import LoadingScreen from "@/components/terjatve/LoadingScreen";

const contentOptions = queryOptions({ queryKey: ["site-content"], queryFn: () => getPublicContent(), staleTime: 30000 });

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(contentOptions),
  component: Index,
  head: () => ({ meta: [
    { title: "terjatve.si — Financiranje za podjetja" },
    { name: "description", content: "Financiranje za podjetja z lastnim kapitalom. Hipotekarni krediti, projektno financiranje, odkup terjatev in dobaviteljski faktoring." },
    { property: "og:title", content: "terjatve.si — Financiranje za podjetja" },
    { property: "og:description", content: "Vaš projekt. Naše financiranje. Osebno, hitro in prilagodljivo." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
});

function Index() {
  const { data } = useSuspenseQuery(contentOptions);
  const content = Object.fromEntries(data.map(row => [row.key, row.value]));
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return <SiteContentProvider content={content}>{mobile ? <MobileSite content={content} /> : <DesktopSite content={content} />}<LoadingScreen /></SiteContentProvider>;
}
