function getClassIcon(profession: string): string {
  return `https://ef-assets.closure.wiki/v1/charicons/icon_profession_${profession}_s.png`;
}

function getAttributeIcon(attrId: number) {
  switch (attrId) {
    case 39: return "https://ef-assets.closure.wiki/v1/attributeicon/icon_attribute_str.png";
    case 40: return "https://ef-assets.closure.wiki/v1/attributeicon/icon_attribute_agi.png";
    case 41: return "https://ef-assets.closure.wiki/v1/attributeicon/icon_attribute_wisd.png";
    case 42: return "https://ef-assets.closure.wiki/v1/attributeicon/icon_attribute_will.png";
  }
}

function getAttributeType(attrId: number) {
  switch (attrId) {
    case 39: return "Strength (STR)";
    case 40: return "Agility (AGI)";
    case 41: return "Intellect (INT)";
    case 42: return "Will (WILL)";
  }
}

export default function OperatorOverview(
  { characterTable, itemTable, charTypeTable, charProfessionTable }:
  { characterTable: any, itemTable: any, charTypeTable: any, charProfessionTable: any }
) {
  if (!characterTable) return null;
  if (!itemTable) return null;
  if (!charTypeTable) return null;
  if (!charProfessionTable) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse bg-muted text-sm">
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
          <col style={{ width: '25%' }} />
        </colgroup>
        <tbody>
          <tr>
          <th className="bg-card p-1 text-center" colSpan={4}>Overview</th>
          </tr>
          <tr>
          <th className="bg-card p-1 text-center">Name</th>
          <td className="px-2 py-1 text-center">{characterTable.name}</td>
          <th className="bg-card p-1 text-center">Internal Name</th>
          <td className="px-2 py-1 text-center">{characterTable.charId}</td>
          </tr>
          <tr>
          <th className="bg-card p-1 text-center">Description</th>
          <td className="border-t px-2 py-1 text-center" colSpan={3}>{itemTable.desc}</td>
          </tr>
          <tr>
          <th className="bg-card p-1 text-center">Trait</th>
          <td className="border-t px-2 py-1 text-center" colSpan={3}>{charProfessionTable.desc}</td>
          </tr>
          <tr>
          <th className="bg-card p-1 text-center">Rarity</th>
          <td className="border-t px-2 py-1 text-center">{characterTable.rarity}★</td>
          <th className="bg-card p-1 text-center">Weapon</th>
          <td className="border-t px-2 py-1 text-center">
              {(() => {
                switch (characterTable.weaponType) {
                  case 0: return "0";
                  case 1: return "Sword";
                  case 2: return "Orbiter";
                  case 3: return "Great Sword";
                  case 4: return "4";
                  case 5: return "Polearm";
                  case 6: return "Guns";
                }
              })()}
            </td>
          </tr>
          <tr>
          <th className="bg-card p-1 text-center">Element</th>
          <td className="border-t px-2 py-1 text-center">
              <span className="flex items-center justify-center gap-1">
                  <div className={`rounded-sm`} style={{ backgroundColor: `#${charTypeTable.color}` }}>
                    <img src={`https://ef-assets.closure.wiki/v1/charattrtype/${charTypeTable.icon}.png`} className="w-5 h-5 object-contain scale-125" loading="lazy" decoding="async" />
                  </div>
                {charTypeTable.name}
              </span>
            </td>
          <th className="bg-card p-1 text-center">Class</th>
          <td className="border-t px-2 py-1 text-center">
              <span className="flex items-center justify-center gap-1">
                <img src={getClassIcon(charProfessionTable.profession)} className="w-5 h-5 object-contain" loading="lazy" decoding="async" />
                {charProfessionTable.name}
              </span>
            </td>
          </tr>
          <tr>
          <th className="bg-card p-1 text-center">Main Attribute</th>
          <td className="border-t px-2 py-1 text-center">
              <span className="flex items-center justify-center gap-1">
                <img src={getAttributeIcon(characterTable.mainAttrType)} className="w-5 h-5 object-contain" loading="lazy" decoding="async" />
                {getAttributeType(characterTable.mainAttrType)}
              </span>
            </td>
          <th className="bg-card p-1 text-center">Secondary Attribute</th>
          <td className="border-t px-2 py-1 text-center">
              <span className="flex items-center justify-center gap-1">
                <img src={getAttributeIcon(characterTable.subAttrType)} className="w-5 h-5 object-contain" loading="lazy" decoding="async" />
                {getAttributeType(characterTable.subAttrType)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}