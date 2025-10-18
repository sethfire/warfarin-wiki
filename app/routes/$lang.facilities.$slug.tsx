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

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang, slug } = params;
  const data = await fetchEntry(lang!, "facilities", slug!);
  const items = await fetchEntries(lang!, "items");
  if (!data) throw new Response("", { status: 404 });
  return { lang, data, items };
}

export default function ItemPage() {
  const { lang, data, items }: any = useLoaderData<typeof loader>();
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
          desc: data.factoryBuildingTable.desc,
          display: "object-contain",
        }]} changeAspectonMobile={true} showThumbnails={false} />
      </section>

      {data.factoryMachineCraftTable.length > 0 && (
        <section id="recipes" className="scroll-mt-16">
          <h2 className="text-xl font-semibold mb-2">{t("fac.recipes")}</h2>
          <Separator className="mb-4" />
          <div className="overflow-x-auto">
            <table className="border-collapse table-auto text-sm">
              <thead className="bg-card">
                <tr>
                  <th className="p-2">{t("fac.recipe")}</th>
                  <th className="p-2">{t("fac.input")}</th>
                  <th className="p-2"></th>
                  <th className="p-2">{t("fac.output")}</th>
                </tr>
              </thead>
              <tbody className="bg-muted">
                {data.factoryMachineCraftTable.map((recipe: any) => (
                  <tr key={recipe.id}>
                    <td className="p-2">{recipe.formulaDesc}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        {recipe.ingredients[0].group.map((input: any, index: number, arr: any[]) => {
                          const itemData = items.find((item: any) => item.id === input.id);
                          return (
                            <React.Fragment key={index}>
                              <Item
                                link={`/${lang}/items/${itemData.id}`}
                                icon={getItemIcon(itemData.iconId)}
                                name={itemData.name}
                                count={input.count}
                                rarity={itemData.rarity}
                              />
                              {index < arr.length - 1 && <Plus className="w-6 h-6" />}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </td>
                    <td className="p-4">
                        <div className="flex flex-col items-center gap-1">
                          <ArrowRight/>
                          <span className="flex items-center gap-1 text-xs">
                            <Clock className="w-4 h-4" />
                            {recipe.progressRound}s
                          </span>
                        </div>
                    </td>
                    <td className="p-2">
                        <div className="flex flex-wrap items-center gap-2">
                          {recipe.outcomes[0].group.map((input: any, index: number, arr: any[]) => {
                            const itemData = items.find((item: any) => item.id === input.id);
                            return (
                              <React.Fragment key={index}>
                                <Item
                                  link={`/${lang}/items/${itemData.id}`}
                                  icon={getItemIcon(itemData.iconId)}
                                  name={itemData.name}
                                  count={input.count}
                                  rarity={itemData.rarity}
                                />
                                {index < arr.length - 1 && <Plus className="w-6 h-6" />}
                              </React.Fragment>
                            );
                          })}
                        </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}