import React from "react";

import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { SITE_NAME } from "~/config/site-config";
import { fetchEntries, fetchEntry } from "~/lib/fetch-utils";
import { getBuildingImage, getItemIcon } from "~/lib/image-utils";
import { facilityType, itemRarityColor } from "~/config/data-config";
import { ArrowRight, Clock, Plus } from "lucide-react";
import CarouselGallery from "~/components/carousel-gallery";
import Item from "~/components/items/item";
import { i18n } from "~/i18n";
import RecipeTable from "~/components/items/recipes";

export function meta({ data }: { data: any }) {
  const { lang, data: facility } = data;

  const title = facility.summary.name;
  const description = facility.factoryBuildingTable.desc;

  return [
    { title },
    { name: "description", content: description },

    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: SITE_NAME },
  
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}

// export const handle = {
//   getToc: (_data: any) => [
//     { id: "summary", title: "Overview" },
//     { id: "recipes", title: "Recipes" },
//   ],
// };

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang, slug } = params;
  const data = await fetchEntry(lang!, "facilities", slug!);
  const items = await fetchEntries(lang!, "items");
  const facilities = await fetchEntries(lang!, "facilities");
  if (!data) throw new Response("", { status: 404 });
  return { lang, data, items, facilities };
}

export default function ItemPage() {
  const { lang, data, items, facilities }: any = useLoaderData<typeof loader>();
  const t = i18n(lang);
  
  return (
    <div className="flex flex-col gap-4 mb-8">
      <section id="summary" className="scroll-mt-16">
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}`}>{t("common.home")}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}/facilities`}>{t("common.facilities")}</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>{data.summary.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-semibold mb-2">{data.summary.name}</h1>
        <div className="text-sm text-muted-foreground mb-4">{facilityType(data.factoryBuildingTable.quickBarType)} {t("fac.facility")}</div>
        <Separator />
      </section>

      <section id="gallery" className="scroll-mt-16">
        <CarouselGallery images={[{
          src: getBuildingImage(`image_${data.summary.id}`),
          thumb: getBuildingImage(`image_${data.summary.id}`),
          download: getBuildingImage(`image_${data.summary.id}`, true),
          title: data.factoryBuildingTable.name,
          desc: `${data.factoryBuildingTable.desc}${data.factoryBuildingTable.powerConsume ? `\n\nPower use: ${data.factoryBuildingTable.powerConsume}` : ""}`,
          display: "object-contain",
        }]} changeAspectonMobile={true} showThumbnails={false} />
      </section>

      {data.factoryMachineCraftTable.length > 0 && (
        <section id="recipes" className="scroll-mt-16">
          <h2 className="text-xl font-semibold mb-2">{t("fac.recipes")}</h2>
          <Separator className="mb-4" />
          <RecipeTable recipes={data.factoryMachineCraftTable} facilities={facilities} items={items} lang={lang} />
        </section>
      )}
    </div>
  );
}