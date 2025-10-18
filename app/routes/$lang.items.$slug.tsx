import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { ArrowRight, Clock, Plus } from "lucide-react";
import React from "react";
import Item from "~/components/items/item";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { SITE_NAME } from "~/config/site-config";

import { fetchEntries, fetchEntry } from "~/lib/fetch-utils";
import { getItemIcon } from "~/lib/image-utils";

export function meta({ data }: { data: any }) {
  const { lang, data: item } = data;

  const title = item.summary.name || "Unnamed Item";
  const description = item.itemTable.decoDesc || "No description available.";
  const image = getItemIcon(item.itemTable.iconId);

  return [
    { title },
    { name: "description", content: description },

    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:image", content: image },

    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang, slug } = params;
  const data = await fetchEntry(lang!, "items", slug!);
  const items = await fetchEntries(lang!, "items");
  const facilities = await fetchEntries(lang!, "facilities");
  if (!data) throw new Response("", { status: 404 });
  return { lang, data, items, facilities };
}

export default function ItemPage() {
  const { lang, data, items, facilities }: any = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col gap-4 mb-8">
      <section id="summary" className="scroll-mt-16">
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}`}>Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}/items`}>Items</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>{data.summary.name || "Unnamed Item"}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-semibold mb-2">{data.summary.name || "Unnamed Item"}</h1>
        <div className="text-sm text-muted-foreground mb-4">{data.itemTypeTable.name}</div>
        <Separator />
      </section>

      <section id="overview" className="scroll-mt-16">
        <div className="flex items-start gap-4">
          {data.itemTable.iconId && (
            <img
              src={getItemIcon(data.itemTable.iconId)}
              className="w-32 h-32 object-contain flex-shrink-0 bg-card rounded"
            />
          )}
          <div className="flex-1">
            {(!data.itemTable.desc && !data.itemTable.decoDesc) ? (
              <div className="text-muted-foreground italic">No description available.</div>
            ) : (
              <>
                <div className="whitespace-pre-line mb-4" dangerouslySetInnerHTML={{ __html: data.itemTable.desc }}></div>
                <div className="whitespace-pre-line text-muted-foreground" dangerouslySetInnerHTML={{ __html: data.itemTable.decoDesc }}></div>
              </>
            )}
          </div>
        </div>
      </section>

      {Array.isArray(data.outFactoryMachineCraftTable) && data.outFactoryMachineCraftTable.length > 0 && (
        <section id="recipes" className="scroll-mt-16">
          <h2 className="text-xl font-semibold mb-2">Craftable From</h2>
          <Separator className="mb-4" />
          <div className="overflow-x-auto">
            <table className="border-collapse table-auto text-sm">
              <thead className="bg-card">
                <tr>
                  <th className="p-2">Recipe</th>
                  <th className="p-2">Facility</th>
                  <th className="p-2">Input</th>
                  <th className="p-2"></th>
                  <th className="p-2">Output</th>
                </tr>
              </thead>
              <tbody className="bg-muted">
                {data.outFactoryMachineCraftTable.map((recipe: any) => (
                  <tr key={recipe.id}>
                    <td className="p-2 border-t">{recipe.formulaDesc}</td>
                    <td className="p-4 border-t">
                        {(() => {
                          const facility = facilities.find((f: any) => f.id === recipe.machineId);
                          if (!facility) return null;
                          return (
                            <div className="flex items-center gap-2">
                              <Item
                                link={`/${lang}/facilities/${facility.id}`}
                                icon={getItemIcon(facility.icon)}
                                name={facility.name}
                                rarity={facility.rarity}
                              />
                            </div>
                          );
                        })()}
                    </td>
                    <td className="p-4 border-t">
                      <div className="flex items-center gap-2">
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
                    <td className="p-4 border-t">
                        <div className="flex flex-col items-center gap-1">
                          <ArrowRight/>
                          <span className="flex items-center gap-1 text-xs">
                            <Clock className="w-4 h-4" />
                            {recipe.progressRound}s
                          </span>
                        </div>
                    </td>
                    <td className="p-4 border-t">
                        <div className="flex items-center gap-2">
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

      {Array.isArray(data.inFactoryMachineCraftTable) && data.inFactoryMachineCraftTable.length > 0 && (
        <section id="recipes" className="scroll-mt-16">
          <h2 className="text-xl font-semibold mb-2">Craftable Into</h2>
          <Separator className="mb-4" />
          <div className="overflow-x-auto">
            <table className="border-collapse table-auto text-sm">
              <thead className="bg-card">
                <tr>
                  <th className="p-2">Recipe</th>
                  <th className="p-2">Facility</th>
                  <th className="p-2">Input</th>
                  <th className="p-2"></th>
                  <th className="p-2">Output</th>
                </tr>
              </thead>
              <tbody className="bg-muted">
                {data.inFactoryMachineCraftTable.map((recipe: any) => (
                  <tr key={recipe.id}>
                    <td className="p-2 border-t">{recipe.formulaDesc}</td>
                    <td className="p-4 border-t">
                      {(() => {
                        const facility = facilities.find((f: any) => f.id === recipe.machineId);
                        if (!facility) return null;
                        return (
                          <Item
                            link={`/${lang}/facilities/${facility.id}`}
                            icon={getItemIcon(facility.icon)}
                            name={facility.name}
                            rarity={facility.rarity}
                          />
                        );
                      })()}
                    </td>
                    <td className="p-4 border-t">
                      <div className="flex items-center gap-2">
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
                    <td className="p-4 border-t">
                        <div className="flex flex-col items-center gap-1">
                          <ArrowRight/>
                          <span className="flex items-center gap-1 text-xs">
                            <Clock className="w-4 h-4" />
                            {recipe.progressRound}s
                          </span>
                        </div>
                    </td>
                    <td className="p-4 border-t">
                        <div className="flex items-center gap-2">
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