import { parseValueMatrix } from "~/lib/blackboard-parser";
import { replaceTags } from "~/lib/tag-definitions";

export default function OperatorPotentials(
  { characterPotentialTable, potentialTalentEffectTable }:
  { characterPotentialTable: any, potentialTalentEffectTable: any })
{
  if (!characterPotentialTable) return null;
  if (!potentialTalentEffectTable) return null;
  
  return (
    <div className="flex flex-col gap-4">
      {characterPotentialTable.potentialUnlockBundle.map((pot: any, idx: number) => {
        const effect = potentialTalentEffectTable[pot.potentialEffectId];
        if (!effect) return null;
        
        return (
          <div className="bg-muted dark:bg-card rounded-lg p-2 gap-4 flex" key={idx}>
            <div className="flex items-center justify-center text-3xl ml-4 mr-4">
              {idx + 1}
            </div>
            <div>
              <h3 className="font-semibold">{pot.name}</h3>
              <div 
                className="text-sm" 
                dangerouslySetInnerHTML={{ 
                  __html: replaceTags(parseValueMatrix(effect.desc, effect.disValueMatrix)) 
                }} 
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}