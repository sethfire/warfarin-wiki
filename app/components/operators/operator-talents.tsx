import { parseValueMatrix } from "~/lib/blackboard-parser";
import { getSkillIcon } from "~/lib/image-utils";
import { replaceTags } from "~/lib/tag-utils";

export default function OperatorTalents(
  { charGrowthTable, potentialTalentEffectTable }:
  { charGrowthTable: any, potentialTalentEffectTable: any })
{
  if (!charGrowthTable) return null;
  if (!potentialTalentEffectTable) return null;

  const talentNodeMap = charGrowthTable.talentNodeMap;
  if (!talentNodeMap) return null;

  const getUnlockText = (breakStage: number, level: number) => {
    const talentUnlockDescription: { [key: number]: { [key: number]: string } } = {
      1: { 1: "Promote to E1 to unlock", 2: "Promote to E1 to activate the upgraded effect" },
      2: { 1: "Promote to E2 to unlock", 2: "Promote to E2 to activate the upgraded effect" },
      3: { 1: "Promote to E3 to unlock", 2: "Promote to E3 to activate the upgraded effect" },
      4: { 1: "Promote to E4 to unlock", 2: "Promote to E4 to activate the upgraded effect" }
    };
    return talentUnlockDescription[breakStage]?.[level] ?? "";
  };

  const talents: any[] = [];
  for (const node of Object.values(talentNodeMap) as any[]) {
    if (node.nodeType !== 4) continue;

    const passiveSkillNodeInfo = node.passiveSkillNodeInfo;
    if (!passiveSkillNodeInfo.talentEffectId) continue;

    const talentEffectId = passiveSkillNodeInfo.talentEffectId;
    if (!talentEffectId) continue;

    const potentialTalentEffect = potentialTalentEffectTable[talentEffectId];
    if (!potentialTalentEffect) continue;

    const dataList = potentialTalentEffect.dataList?.[0];
    if (!dataList) continue;

    talents.push({
      id: talentEffectId,
      name: passiveSkillNodeInfo.name,
      iconId: passiveSkillNodeInfo.iconId,
      desc: potentialTalentEffect.desc,
      disValueMatrix: potentialTalentEffect.disValueMatrix,
      breakStage: passiveSkillNodeInfo.breakStage,
      level: passiveSkillNodeInfo.level,
    });
  }
  return (
    <>
      {talents.length === 0
      ? (<p className="text-muted-foreground">No talents available</p>)
      : (
        <div className="flex flex-col gap-4">
          {talents.map((talent) => (
            <div
              key={talent.id}
              className="bg-muted dark:bg-card p-2"
            >
              <div className="flex items-start gap-4 mb-2">
                <div className="bg-muted rounded-sm overflow-hidden shrink-0">
                  <img
                    src={getSkillIcon(talent.iconId)}
                    className="w-12 h-12 object-cover"
                    loading="lazy" 
                    decoding="async"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{talent.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {getUnlockText(talent.breakStage, talent.level)}
                  </div>
                </div>
              </div>
              <p className="text-sm" dangerouslySetInnerHTML={{ __html: replaceTags(parseValueMatrix(talent.desc, talent.disValueMatrix)) }} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}