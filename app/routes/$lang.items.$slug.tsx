import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";

import { fetchEntry } from "~/lib/fetch-utils";

export function meta({ data }: { data: any }) {
  const { lang, data: item } = data;

  const title = item.summary.name || "Unnamed Item";
  const description = item.itemTable.decoDesc || "No description available.";
  const image = `https://ef-assets.closure.wiki/v1/itemicon/${item.itemTable.iconId}.png`;

  return [
    { title },
    { name: "description", content: description },

    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: "Warfarin Wiki" },
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
  if (!data) throw new Response("", { status: 404 });
  return { lang, data };
}

export default function ItemPage() {
  const { lang, data }: any = useLoaderData<typeof loader>();
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
        <div className="text-sm text-muted-foreground mb-4">{data.itemTable.rarity}★ {data.itemTypeTable.name} Item</div>
        <Separator />
      </section>

      <section id="overview" className="scroll-mt-16">
        {(!data.itemTable.desc && !data.itemTable.decoDesc) ? (
          <div className="text-muted-foreground italic">No description available.</div>
        ) : (
          <>
            <div className="flex items-start gap-4">
              {data.itemTable.iconId && (
                <img
                  src={`https://ef-assets.closure.wiki/v1/itemicon/${data.itemTable.iconId}.png`}
                  className="w-32 h-32 object-contain flex-shrink-0 bg-card rounded"
                  alt="Item icon"
                />
              )}
              <div className="flex-1">
                {(!data.itemTable.desc && !data.itemTable.decoDesc) ? (
                  <div className="text-muted-foreground italic">No description available.</div>
                ) : (
                  <>
                    <div className="whitespace-pre-line mb-4" dangerouslySetInnerHTML={{ __html: data.itemTable.desc }}></div>
                    <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: data.itemTable.decoDesc }}></div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}