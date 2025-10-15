import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";

import { fetchEntry } from "~/lib/fetch-utils";
import { getTutorialImage } from "~/lib/image-utils";
import { replaceTags } from "~/lib/tag-definitions";

export function meta({ data }: { data: any }) {
  const { lang, data: item } = data;

  const title = item.summary.name;
  const description = "";
  // const image = getItemIcon(item.itemTable.iconId);

  return [
    { title },
    { name: "description", content: description },

    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: "Warfarin Wiki" },
    // { property: "og:image", content: image },

    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    // { name: "twitter:image", content: image },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang, slug } = params;
  const data = await fetchEntry(lang!, "tutorials", slug!);
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
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}/tutorials`}>Tutorials</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>{data.summary.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-semibold mb-2">{data.summary.name}</h1>
        <div className="text-sm text-muted-foreground mb-4">Tutorial</div>
        <Separator />
      </section>

      <section id="tutorials" className="scroll-mt-16">
        <div className="flex flex-col gap-12">
          {Object.entries(data.wikiTutorialPageTable).map(([key, page]: any, idx: number) => (
            <div key={key}>
              {idx !== 0 && (
                <>
                  <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
                  <Separator className="mb-4" />
                </>
              )}
              {page.image && (
                // <div className="flex justify-center items-center mb-4">
                //   <span className="text-gray-400 italic">{page.image}.webp</span>
                // </div>
                <img src={getTutorialImage(page.image)} className="w-full h-auto rounded-lg mb-4 aspect-video" />
              )}
              {page.video && (
                // <div className="flex justify-center items-center mb-4">
                //   <span className="text-gray-400 italic">{page.video}.mp4</span>
                // </div>
                <video controls className="w-full h-auto rounded-lg mb-4 aspect-video">
                  <source src={`https://assets.warfarin.wiki/v1/guidevideo/${page.video}.mp4`} type="video/mp4" />
                </video>
              )}
              <p 
                className="whitespace-pre-line" 
                dangerouslySetInnerHTML={{ __html: replaceTags(page.content) }} 
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}