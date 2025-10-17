import { attributeType, weaponType } from "~/lib/config";
import { getAttributeIcon, getCharElementIcon, getClassIcon } from "~/lib/image-utils";

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
            <td className="border-t px-2 py-1 text-center">{weaponType(characterTable.weaponType)}</td>
          </tr>
          <tr>
            <th className="bg-card p-1 text-center">Element</th>
            <td className="border-t px-2 py-1 text-center">
                <span className="flex items-center justify-center gap-1">
                    {/* <div className={`rounded-sm`} style={{ backgroundColor: `#${charTypeTable.color}` }}>
                      <img 
                        src={getCharElementIcon(charTypeTable.icon)} 
                        className="w-5 h-5 object-contain scale-125" loading="lazy" decoding="async" 
                      />
                    </div> */}
                  {charTypeTable.name}
                </span>
              </td>
            <th className="bg-card p-1 text-center">Class</th>
            <td className="border-t px-2 py-1 text-center">
              <span className="flex items-center justify-center gap-1">
                {/* <img src={getClassIcon(charProfessionTable.profession)} className="w-5 h-5 object-contain" loading="lazy" decoding="async" /> */}
                {charProfessionTable.name}
              </span>
            </td>
          </tr>
          <tr>
          <th className="bg-card p-1 text-center">Main Attribute</th>
          <td className="border-t px-2 py-1 text-center">
              <span className="flex items-center justify-center gap-1">
                {/* <img src={getAttributeIcon(characterTable.mainAttrType)} className="w-5 h-5 object-contain" loading="lazy" decoding="async" /> */}
                {attributeType(characterTable.mainAttrType)}
              </span>
            </td>
          <th className="bg-card p-1 text-center">Secondary Attribute</th>
          <td className="border-t px-2 py-1 text-center">
              <span className="flex items-center justify-center gap-1">
                {/* <img src={getAttributeIcon(characterTable.subAttrType)} className="w-5 h-5 object-contain" loading="lazy" decoding="async" /> */}
                {attributeType(characterTable.subAttrType)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}