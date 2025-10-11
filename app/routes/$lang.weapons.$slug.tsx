import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";

import { fetchEntry } from "~/lib/fetch-utils";
import { getItemIcon } from "~/lib/image-utils";

export function meta({ data }: { data: any }) {
  const { lang, data: char } = data;

  const title = char.summary.name;
  const description = char.itemTable.decoDesc;
  const image = getItemIcon(char.itemTable.iconId);

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
  const data = await fetchEntry(lang!, "weapons", slug!);
  if (!data) throw new Response("", { status: 404 });
  return { lang, data };
}

export default function WeaponPage() {
  const { lang, data }: any = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col gap-4 mb-8">
      <section id="summary" className="scroll-mt-16">
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}`}>Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}/weapons`}>Weapons</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>{data.summary.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-semibold mb-2">{data.summary.name}</h1>
        <div className="text-sm text-muted-foreground mb-4">{data.weaponBasicTable.rarity}★ Weapon</div>
        <Separator />
      </section>

      <section id="overview" className="scroll-mt-16">
        <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: data.weaponBasicTable.weaponDesc }}></div>
      </section>
    </div>
  );
}