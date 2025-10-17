import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { SITE_NAME } from "~/config/site-config";
import { fetchEntries, fetchEntry } from "~/lib/fetch-utils";
import { getItemIcon } from "~/lib/image-utils";
import { itemRarityColor } from "~/config/data-config";
import { ArrowRight, Clock } from "lucide-react";

export function meta({ data }: { data: any }) {
  const { lang, data: item } = data;

  const title = item.summary.name;
  const description = "";

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
  
  const renderItem = (item: any, foundItem: any, showLabel = false) => {
    return (
      <a 
        href={`/${lang}/items/${foundItem.slug}`} 
        key={item.id} 
        className="group relative flex flex-col items-center gap-1"
      >
        <div className="relative aspect-square rounded bg-muted overflow-hidden w-16">
          <img
            src={getItemIcon(foundItem.iconId)}
            className="w-full h-full object-contain absolute inset-0 p-2"
            loading="lazy"
            decoding="async"
          />
          <div 
            className="absolute left-0 right-0 bottom-0 h-1" 
            style={{ backgroundColor: itemRarityColor(foundItem.rarity) }}
          />
          <div className="absolute top-0 right-0 text-xs px-1 py-0.5 bg-black/70 rounded-tr">
            {item.count}
          </div>
        </div>
        {showLabel && (
          <span className="text-xs text-center max-w-[80px]">{foundItem.name}</span>
        )}
      </a>
    );
  };

  const renderRecipeFlow = (recipe: any) => {
    const inputs = recipe.ingredients[0]?.group || [];
    const outputs = recipe.outcomes[0]?.group || [];
    
    return (
      <div className="flex items-center gap-6 justify-center flex-wrap">
        <div className="flex gap-3">
          {inputs.map((item: any) => {
            const foundItem = items.find((i: any) => i.id === item.id);
            if (!foundItem) return null;
            return renderItem(item, foundItem, true);
          })}
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-border"></div>
            <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="font-semibold text-sm">{recipe.progressRound}s</span>
            </div>
            <div className="h-px w-8 bg-border text-muted-foreground"></div>
          </div>
          <ArrowRight className="w-6 h-6" />
        </div>

        {/* Outputs */}
        <div className="flex gap-3">
          {outputs.map((item: any) => {
            const foundItem = items.find((i: any) => i.id === item.id);
            if (!foundItem) return null;
            return renderItem(item, foundItem, true);
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="flex flex-col gap-6 mb-8">
      <section id="summary" className="scroll-mt-16">
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}`}>Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}/facilities`}>Facilities</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>{data.summary.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-semibold mb-2">{data.summary.name}</h1>
        <div className="text-sm text-muted-foreground mb-4">Facility</div>
        <Separator />
      </section>

      <section id="overview" className="scroll-mt-16">
        <div className="flex flex-col gap-4">
          <div>
            {(!data.factoryBuildingTable.desc) ? (
              <div className="text-muted-foreground italic">No description available.</div>
            ) : (
              <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: data.factoryBuildingTable.desc }}></div>
            )}
          </div>
        </div>
      </section>

      {data.factoryMachineCraftTable.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Production Recipes</h2>
            <div className="text-sm text-muted-foreground">
              {data.factoryMachineCraftTable.length} {data.factoryMachineCraftTable.length === 1 ? 'recipe' : 'recipes'}
            </div>
          </div>

          <div className="space-y-4">
            {data.factoryMachineCraftTable.map((recipe: any, idx: number) => (
              <div 
                key={recipe.id} 
                className="bg-card rounded-lg border border-border"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-base">{recipe.formulaDesc}</h3>
                    {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Cycle: {recipe.progressRound}s</span>
                    </div> */}
                  </div>
                  
                  {renderRecipeFlow(recipe)}
                </div>

                <div className="border-t border-border bg-muted/30 p-4">
                  <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <span>Cycle:</span><span className="text-muted-foreground">{recipe.progressRound}s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Production Rate:</span>
                      <span className="text-muted-foreground">
                        {recipe.outcomes[0]?.group.map((item: any) => {
                          const foundItem = items.find((i: any) => i.id === item.id);
                          return foundItem ? `${(item.count * 60 / recipe.progressRound).toFixed(1)}/min` : '';
                        }).join(', ')}
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <span className="font-medium">Power per Item:</span>
                      <span className="text-muted-foreground">
                        {((data.factoryBuildingTable.powerConsume * recipe.progressRound) / recipe.outcomes[0]?.group[0]?.count).toFixed(1)} MW·s
                      </span>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}