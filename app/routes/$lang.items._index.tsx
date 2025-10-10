import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import WeaponList from "~/components/weapons/weapon-list";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { fetchEntries } from "~/lib/fetch-utils";
import ItemList from "~/components/items/item-list";

export function meta() {
  const title = "Items";
  const description = "";

  return [
    { title },
    { name: "description", content: description },

    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: "Warfarin Wiki" },

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
  const data = await fetchEntries(lang!, "items");
  if (!data) throw new Response("", { status: 404 });
  return { lang, data };
}

export default function ItemsPage() {
  const { lang, data }: any = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div>
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}`}>Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>Items</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-semibold mb-2">Items</h1>
        <div className="mb-4 text-sm">
          <span className="text-muted-foreground">Showing </span>
          {data.length}
          <span className="text-muted-foreground"> items</span>
        </div>
        <Separator />
      </div>
      <ItemList lang={lang} data={data} />
    </div>
  );
}