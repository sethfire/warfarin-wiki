import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { SITE_NAME } from "~/config/site-config";
import { fetchEntry } from "~/lib/fetch-utils";
import { getLoreImage } from "~/lib/image-utils";
import { replaceTags } from "~/lib/tag-utils";

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
  const data = await fetchEntry(lang!, "lore", slug!);
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
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}/lore`}>Lore</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>{data.summary.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-semibold mb-2">{data.summary.name}</h1>
        <div className="text-sm text-muted-foreground mb-4">Lore Entry</div>
        <Separator />
      </section>
      <section id="contents" className="scroll-mt-16">
        <div className="flex flex-col gap-4">
          {data.richContentTable.contentList.map((line: any, idx: number) => {
            const imageMatch = line.content.trim().match(/^<image>(.+?)<\/image>$/);
            
            return (
              <div key={idx}>
                {imageMatch ? (
                  <div className="aspect-video w-full flex items-center justify-center bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={getLoreImage(imageMatch[1].split('/').pop())} 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <p
                    className="whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: replaceTags(line.content) }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}