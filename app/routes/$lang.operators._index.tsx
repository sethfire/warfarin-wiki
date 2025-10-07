import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";

export const meta: MetaFunction = () => {
  return [
    { title: "Operators" },
    { name: "description", content: "" },
  ];
};

function getCharRarityColor(value: number): string {
  switch (value) {
    case 0: return ""
    case 1: return "#A0A0A0";
    case 2: return "#DCDC00";
    case 3: return "#26BBFD";
    case 4: return "#9452FA";
    case 5: return "#FFBB03";
    case 6: return "#FE5A00";
    default: return "";
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang } = params;
  const response = await fetch(`https://api.warfarin.wiki/v1/${lang}/operators`);
  if (!response.ok) throw new Response("", { status: 404 });
  return { lang, data: await response.json() };
}

export default function OperatorPage() {
  const { lang, data }: any = useLoaderData<typeof loader>();
  return (
    <main>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col p-4">
          <div>
            <Breadcrumb className="mb-2">
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href={`/${lang}`}>Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbPage>Operators</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-semibold mb-2">Operators</h1>
            <div className="mb-4 text-sm">
              <span className="text-muted-foreground">Showing </span>
              {data.length}
              <span className="text-muted-foreground"> operators</span>
            </div>
            <Separator className="mb-4" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {data.map((char: any) => (
              <a href={`/${lang}/operators/${char.slug}`} key={char.id}>
                <div className="group relative aspect-[152/212] bg-muted dark:bg-card rounded overflow-hidden">
                  <img
                    src={`https://ef-assets.closure.wiki/v1/charportraits/icon_${char.id}.png`}
                    className="w-full h-full object-contain absolute inset-0"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute left-[4px] top-[4px] h-[32px] w-[32px] p-0.5 rounded bg-black/70">
                    <img 
                      src={`https://ef-assets.closure.wiki/v1/charicons/icon_profession_${char.profession}_s.png`} 
                      className="h-full w-full object-contain" loading="lazy" decoding="async"
                    />
                  </div>

                  <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-2 text-center font-semibold text-white" style={{ 
                      textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                    }}>
                    {char.name}
                  </div>

                  <div className="absolute left-0 right-0 bottom-0 h-[4px]" style={{ backgroundColor: getCharRarityColor(char.rarity) }}></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}