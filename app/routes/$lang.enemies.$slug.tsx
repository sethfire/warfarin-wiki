import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";

import { fetchEntry } from "~/lib/fetch-utils";
import { getEnemyIcon } from "~/lib/image-utils";

const enemyType: Record<number, string> = {
  0: 'Common',
  1: 'Advanced',
  2: 'Boss',
  3: 'Elite',
};

export function meta({ data }: { data: any }) {
  const { lang, data: enemy } = data;

  const title = enemy.summary.name;
  const description = enemy.enemyTemplateDisplayInfoTable.description;
  const image = getEnemyIcon(enemy.summary.id);

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
  const data = await fetchEntry(lang!, "enemies", slug!);
  if (!data) throw new Response("", { status: 404 });
  return { lang, data };
}

export default function EnemyPage() {
  const { lang, data }: any = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-col gap-4 mb-8">
      <section id="summary" className="scroll-mt-16">
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}`}>Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbLink href={`/${lang}/enemies`}>Enemies</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem><BreadcrumbPage>{data.summary.name}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-2xl font-semibold mb-2">{data.summary.name}</h1>
        <div className="text-sm text-muted-foreground mb-4">{enemyType[data.enemyTemplateDisplayInfoTable.displayType]} Enemy</div>
        <Separator />
      </section>

      <section id="overview" className="scroll-mt-16">
        <div className="flex items-start gap-4">
          <img
            src={getEnemyIcon(data.summary.id)}
            className="w-32 h-32 object-contain flex-shrink-0 bg-card rounded"
          />
          {(!data.enemyTemplateDisplayInfoTable.description) ? (
            <div className="text-muted-foreground italic">No description available.</div>
          ) : (
            <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: data.enemyTemplateDisplayInfoTable.description }} />
          )}
        </div>
      </section>

      <section id="abilities" className="scroll-mt-16">
        <h2 className="text-xl font-semibold mb-2">Trait</h2>
        <Separator className="mb-4" />
        <ul className="list-disc pl-6">
          {Object.entries(data.enemyAbilityDescTable).map(([key, ability]: any) => (
            <li key={key} className="whitespace-pre-line">{ability.description}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}