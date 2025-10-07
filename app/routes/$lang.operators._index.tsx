import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import OperatorList from "~/components/operators/operator-list";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { SUPPORTED_LANGUAGES } from "~/config/config";

export function meta() {
  const title = "Operators";
  const description = "";

  return [
    { title },
    { name: "description", content: description },

    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:site_name", content: "Warfarin Archives" },

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
  if (!lang) throw new Response("", { status: 404 });
  if (!SUPPORTED_LANGUAGES.includes(lang)) throw new Response("", { status: 404 });
  const response = await fetch(`https://api.warfarin.wiki/v1/${lang}/operators`);
  if (!response.ok) throw new Response("", { status: 404 });
  return { lang, data: await response.json() };
}

export default function OperatorPage() {
  const { lang, data }: any = useLoaderData<typeof loader>();
  return (
    <main className="flex flex-col gap-4">
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
      <OperatorList lang={lang} data={data} />
    </main>
  );
}