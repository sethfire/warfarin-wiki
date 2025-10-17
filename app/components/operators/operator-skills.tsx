import { parseValues } from "~/lib/blackboard-parser";
import { getSkillIcon } from "~/lib/image-utils";
import { replaceTags } from "~/lib/tag-utils";

export default function OperatorSkills(
  { charGrowthTable, skillPatchTable }:
  { charGrowthTable: any, skillPatchTable: any })
{
  if (!charGrowthTable) return null;
  if (!skillPatchTable) return null;

  const skillGroupMap = charGrowthTable.skillGroupMap;
  if (!skillGroupMap) return null;

  const skills: any[] = [];
  Object.values(skillGroupMap).forEach((skillGroup: any) => {
    const name = skillGroup.name;
    const icon = skillGroup.icon;
    const desc = skillGroup.desc;
    const id = skillGroup.skillGroupId;
    const type = skillGroup.skillGroupType;
    const skillIdList = skillGroup.skillIdList;

    const blackboard = skillGroup.skillIdList.flatMap((skillId: any) => {
      const skillPatchData = skillPatchTable[skillId];
      return skillPatchData?.SkillPatchDataBundle[0].blackboard || [];
    });

    const skillData: any = {};
    if (Array.isArray(skillIdList)) {
      const skillPatchDataBundles: any = {};
      skillIdList.forEach((skillId: any) => {
        const skillPatchData = skillPatchTable[skillId];
        if (!skillPatchData) return;

        const skillPatchDataBundle = skillPatchData.SkillPatchDataBundle;
        if (!skillPatchDataBundle) return;
  
        skillPatchDataBundles[skillId] = skillPatchDataBundle;
      });

      Object.entries(skillPatchDataBundles).forEach(([, bundles]: any) => {
        if (!bundles) return;
        if (!Array.isArray(bundles)) return;
        if (bundles.length === 0) return;

        bundles.forEach((bundle: any) => {
          bundle.subDescNameList.forEach((subDescName: any, index: number) => {
            if (!subDescName) return;
            const value = bundle.subDescList[index];
            if (!value) return;

            if (!skillData[subDescName]) skillData[subDescName] = [];
            skillData[subDescName].push(value);
          });
        });
      });
    }

    skills.push({ name, icon, desc, id, type, blackboard, skillData });
  });

  const sortOrder = [0, 1, 3, 2];
  skills.sort((a, b) => {
    const aIndex = sortOrder.indexOf(a.type);
    const bIndex = sortOrder.indexOf(b.type);
    if (aIndex === -1 && bIndex === -1) {
      return a.type - b.type;
    }
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <div className="flex flex-col gap-4">
      {skills.map((skillGroup: any) => (
        <div key={skillGroup.id}>
          <table className="w-full border-collapse table-auto text-sm">
            <thead className="bg-card">
              <tr>
                <td colSpan={13} className="p-2">
                  <div className="flex items-center gap-4">
                    <div className="rounded-sm bg-muted">
                      <a href={getSkillIcon(skillGroup.icon, true)}
                        target="_blank" rel="noopener noreferrer">
                        <img src={getSkillIcon(skillGroup.icon)}
                          className="w-12 h-12" loading="lazy" decoding="async" />
                      </a>
                    </div>
                    <div>
                      <h3 className="font-semibold">{skillGroup.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {(() => {
                          switch (skillGroup.type) {
                            case 0: return "Normal Attack";
                            case 1: return "Normal Skill";
                            case 2: return "Ultimate";
                            case 3: return "Combo Skill";
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody className="bg-card">
              <tr>
                <td colSpan={13} className="p-2">
                  <div 
                    className="text-sm whitespace-pre-line" 
                    dangerouslySetInnerHTML={{ __html: replaceTags(parseValues(skillGroup.desc, skillGroup.blackboard)) }} 
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto text-sm">
            <thead className="bg-card">
              <tr>
                <th className="p-2"></th>
                <th className="p-2">1</th>
                <th className="p-2">2</th>
                <th className="p-2">3</th>
                <th className="p-2">4</th>
                <th className="p-2">5</th>
                <th className="p-2">6</th>
                <th className="p-2">7</th>
                <th className="p-2">8</th>
                <th className="p-2">9</th>
                <th className="p-2">M1</th>
                <th className="p-2">M2</th>
                <th className="p-2">M3</th>
              </tr>
            </thead>
              <tbody className="bg-muted">
                {Object.entries(skillGroup.skillData).map(([key, skill]: any) => (
                  <tr key={key}>
                    <td className="p-2 border-t">{key}</td>
                    {skill.map((value: any, index: number) => (
                      <td key={index} className="text-center p-2 border-t">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
