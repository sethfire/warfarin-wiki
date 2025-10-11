import { getAttributeIcon } from "~/lib/image-utils";

function getAttributeName(attrId: number) {
  switch (attrId) {
    case 1: return "HP";
    case 2: return "ATK";
    case 3: return "DEF";
    case 39: return "STR";
    case 40: return "AGI";
    case 41: return "INT";
    case 42: return "WILL";
  }
}

export default function OperatorAttributes(
  { characterTable }:
  { characterTable: any }
) {
  if (!characterTable) return null;
  if (!Array.isArray(characterTable.attributes)) return null;

  const attributeMap = new Map();
  const statTypes = [1, 2, 39, 40, 41, 42]; // HP, ATK, STR, AGI, INT, WILL
  
  statTypes.forEach(type => {
    attributeMap.set(type, []);
  });

  // Milestones: Initial (0), E1 (20), E2 (40), E3 (60), E4 (70), Max (80)
  const milestones = [
    { level: 1, breakStage: 0 },
    { level: 20, breakStage: 1 },
    { level: 40, breakStage: 2 },
    { level: 60, breakStage: 3 },
    { level: 70, breakStage: 4 },
    { level: 80, breakStage: 4 }
  ];

  milestones.forEach(milestone => {
    const attribute = characterTable.attributes.find((attr: any) => {
      const levelAttr = attr.Attribute.attrs.find((a: any) => a.attrType === 0);
      return levelAttr && levelAttr.attrValue === milestone.level && 
             attr.breakStage === milestone.breakStage;
    });

    if (attribute) {
      statTypes.forEach(statType => {
        const stat = attribute.Attribute.attrs.find((a: any) => a.attrType === statType);
        if (stat) {
          attributeMap.get(statType).push(stat.attrValue);
        } else {
          attributeMap.get(statType).push(null);
        }
      });
    } else {
      // If milestone not found, push nulls
      statTypes.forEach(statType => {
        attributeMap.get(statType).push(null);
      });
    }
  });

  const formatValue = (value: any, attrType: number) => {
    if (value === null || value === undefined) return '-';

    // HP, ATK, DEF are integers
    if ([1, 2, 3].includes(attrType)) return Math.round(value).toString();

    // STR, AGI, INT, WILL are decimals
    return value.toFixed(0).toString();
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse bg-muted text-sm">
        <colgroup>
          <col className="w-1/7" />
          <col className="w-1/7" />
          <col className="w-1/7" />
          <col className="w-1/7" />
          <col className="w-1/7" />
          <col className="w-1/7" />
          <col className="w-1/7" />
        </colgroup>
        <thead>
          <tr>
            <th className="bg-card p-1 w-1/7"></th>
            <th className="bg-card p-1 w-1/7">Level 1</th>
            <th className="bg-card p-1 w-1/7">Level 20</th>
            <th className="bg-card p-1 w-1/7">Level 40</th>
            <th className="bg-card p-1 w-1/7">Level 60</th>
            <th className="bg-card p-1 w-1/7">Level 70</th>
            <th className="bg-card p-1 w-1/7">Level 80</th>
          </tr>
          {/* <tr>
            <th className="bg-card p-1 w-1/7"></th>
            <th className="bg-card p-1 w-1/7">E0</th>
            <th className="bg-card p-1 w-1/7">E1</th>
            <th className="bg-card p-1 w-1/7">E2</th>
            <th className="bg-card p-1 w-1/7">E3</th>
            <th className="bg-card p-1 w-1/7">E4</th>
            <th className="bg-card p-1 w-1/7">Max</th>
          </tr> */}
        </thead>
        <tbody>
          {statTypes.map((statType, idx) => (
            <tr key={statType}>
              <th className="bg-card p-1 w-1/7">
                <div className="flex items-center justify-center gap-1">
                  {/* <img src={getAttributeIcon(statType)} className="w-5 h-5" loading="lazy" decoding="async" /> */}
                  {getAttributeName(statType)}
                </div>
              </th>
              {attributeMap.get(statType).map((value: string, idx: number) => (
                <td key={idx} className="p-1 text-center border-t w-1/7">
                  {formatValue(value, statType)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}