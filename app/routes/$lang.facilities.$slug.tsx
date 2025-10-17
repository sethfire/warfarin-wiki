import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { SITE_NAME } from "~/config/site-config";
import { fetchEntry } from "~/lib/fetch-utils";
import { getItemIcon } from "~/lib/image-utils";

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
        <div className="flex items-start gap-4">
          {/* {data.itemTable.iconId && (
            <img
              src={getItemIcon(data.itemTable.iconId)}
              className="w-32 h-32 object-contain flex-shrink-0 bg-card rounded"
            />
          )} */}
          <div className="flex-1">
            {(!data.factoryBuildingTable.desc) ? (
              <div className="text-muted-foreground italic">No description available.</div>
            ) : (
              <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: data.factoryBuildingTable.desc }}></div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}