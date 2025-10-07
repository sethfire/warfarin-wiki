import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";

import OperatorGallery from "~/components/operators/operator-gallery";
import OperatorAttributes from "~/components/operators/operator-attributes";
import OperatorDialogue from "~/components/operators/operator-dialogue";
import OperatorFactorySkills from "~/components/operators/operator-facskills";
import OperatorFile from "~/components/operators/operator-file";
import OperatorOverview from "~/components/operators/operator-overview";
import OperatorPotentials from "~/components/operators/operator-potentials";
import OperatorSkills from "~/components/operators/operator-skills";
import OperatorTalents from "~/components/operators/operator-talents";

export const meta: MetaFunction = () => {
  return [
    { title: "Operators" },
    { name: "description", content: "" },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { lang, slug } = params;
  const response = await fetch(`https://api.warfarin.wiki/v1/${lang}/operators/${slug}`);
  if (!response.ok) throw new Response("", { status: 404 });
  return { lang, data : await response.json() };
}

export default function OperatorPage() {
  const { lang, data }: any = useLoaderData<typeof loader>();
  return (
    <main>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-4 p-4">
          <section id="summary" className="scroll-mt-16">
            <Breadcrumb className="mb-2">
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href={`/${lang}`}>Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbLink href={`/${lang}/operators`}>Operators</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator>/</BreadcrumbSeparator>
                <BreadcrumbItem><BreadcrumbPage>{data.summary.name}</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-2xl font-semibold mb-2">{data.summary.name}</h1>
            <div className="text-sm text-muted-foreground mb-4">{data.characterTable.rarity}★ {data.charTypeTable.name} {data.charProfessionTable.name} Operator</div>
            <Separator className="mb-4" />
            <OperatorGallery charId={data.characterTable.charId} />
          </section>

          <section id="overview" className="scroll-mt-16">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <Separator className="mb-4" />
            <OperatorOverview
              characterTable={data.characterTable}
              itemTable={data.itemTable}
              charTypeTable={data.charTypeTable}
              charProfessionTable={data.charProfessionTable}
            />
          </section>
          
          <section id="attributes" className="scroll-mt-16">
            <h2 className="text-xl font-semibold mb-2">Attributes</h2>
            <Separator className="mb-4" />
            <OperatorAttributes
              characterTable={data.characterTable}
            />
          </section>

          <section id="talents" className="scroll-mt-16">
            <h2 className="text-xl font-semibold mb-2">Talents</h2>
            <Separator className="mb-4" />
            <OperatorTalents
              charGrowthTable={data.charGrowthTable}
              potentialTalentEffectTable={data.potentialTalentEffectTable}
            />
          </section>

          <section id="skills" className="scroll-mt-16">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <Separator className="mb-4" />
            <OperatorSkills
              charGrowthTable={data.charGrowthTable}
              skillPatchTable={data.skillPatchTable}
            />
          </section>

          <section id="baseskills" className="scroll-mt-16">
            <h2 className="text-xl font-semibold mb-2">Base Skills</h2>
            <Separator className="mb-4" />
            <OperatorFactorySkills
              spaceshipCharSkillTable={data.spaceshipCharSkillTable}
              spaceshipSkillTable={data.spaceshipSkillTable}
            />
          </section>

          <section id="potentials" className="scroll-mt-16">
            <h2 className="text-xl font-semibold mb-2">Potentials</h2>
            <Separator className="mb-4" />
            <OperatorPotentials
              characterPotentialTable={data.characterPotentialTable}
              potentialTalentEffectTable={data.potentialTalentEffectTable}
            />
          </section>

          <section id="files" className="scroll-mt-16">
            <h2 className="text-xl font-semibold mb-2">Operator File</h2>
            <Separator className="mb-4" />
            <OperatorFile profileRecord={data.characterTable.profileRecord} />
          </section>

          <section id="dialogue" className="scroll-mt-16">
            <h2 className="text-xl font-semibold mb-2">Operator Dialogue</h2>
            <Separator className="mb-4" />
            <OperatorDialogue profileVoice={data.characterTable.profileVoice} />
          </section>
        </div>
      </div>
    </main>
  );
}