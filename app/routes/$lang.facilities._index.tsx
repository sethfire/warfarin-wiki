import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { facilityType, itemRarityColor } from "~/config/data-config";
import { SITE_NAME } from "~/config/site-config";
import { fetchEntries } from "~/lib/fetch-utils";
import { getItemIcon } from "~/lib/image-utils";

export function meta() {
  const title = "Facilities";
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
};

export const handle = {
  getToc: () => [] as { id: string; title: string }[],
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang } = params;
  const data = await fetchEntries(lang!, "facilities");
  if (!data) throw new Response("", { status: 404 });
  return { lang, data };
}

export default function FacilitiesPage() {
  const { lang, data }: any = useLoaderData<typeof loader>();
  const filteredData = data.filter((facility: any) => facility.quickBarType);
  const sortedData = [...filteredData].sort((a, b) => {
    if (a.type < b.type) return -1;
    if (a.type > b.type) return 1;
    return 0;
  });
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}`}>Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Facilities</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-semibold mb-2">Facilities</h1>
        <div className="mb-4 text-sm">
          <span className="text-muted-foreground">Showing </span>
          {filteredData.length}
          <span className="text-muted-foreground"> facilities</span>
        </div>
        <Separator />
      </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {sortedData.map((facility: any) => (
            <a href={`/${lang}/facilities/${facility.slug}`} key={facility.id}>
              <div className="group relative aspect-square bg-muted dark:bg-card rounded overflow-hidden">
                {facility.icon && (
                  <img
                    src={getItemIcon(facility.icon)}
                    className="w-full h-full object-contain absolute inset-0"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                    
                <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent"></div>
    
                <div className="absolute bottom-0 left-0 right-0 p-2 text-left font-semibold text-white text-xs md:text-sm">
                  <span style={{
                    textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                  }}>{facility.name}</span>
                  <br />
                  <span className="text-muted-foreground">{facilityType(facility.quickBarType)} Facility</span>
                </div>

                {/* <div className="absolute left-0 right-0 bottom-0 h-[4px]" style={{ backgroundColor: itemRarityColor(facility.rarity) }}></div> */}
              </div>
            </a>
          ))}
        </div>
    </div>
  );
}