import { replaceTags } from "~/lib/tag-definitions";

export default function OperatorFactorySkills({ spaceshipCharSkillTable, spaceshipSkillTable }: { spaceshipCharSkillTable: any, spaceshipSkillTable: any }) {
  if (!spaceshipCharSkillTable || !spaceshipCharSkillTable.skillList) { return <div className="text-muted-foreground">N/A</div>; }

  return (
    <div className="flex flex-col gap-4">
      {Object.values(spaceshipCharSkillTable.skillList).map((skill: any) => {
        const skillId = skill.skillId;
        const skillData = spaceshipSkillTable[skillId];
        if (!skillData) return null;
        return (
          <div className="bg-muted dark:bg-card p-2" key={skillId}>
            <div className="flex items-center gap-4 mb-2">
              <div className="bg-muted rounded-sm">
                <img src={`https://ef-assets.closure.wiki/v1/spaceshipskillicon/${skillData.icon}.png`} className="w-12 h-12" loading="lazy" decoding="async" />
              </div>
              <div>
                <h3 className="font-semibold">{skillData.name}</h3>
                <div className="text-sm text-muted-foreground">{skill.unlockHint}</div>
              </div>
            </div>
            <div className="text-sm whitespace-pre-line" dangerouslySetInnerHTML={{ __html: replaceTags(skillData.desc) }} />
          </div>
        );
        })}
    </div>
  )
}