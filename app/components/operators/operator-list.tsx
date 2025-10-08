function getCharTypeColor(type: string): string {
  switch (type) {
    case 'Cryst': return '#21C6D0CC';
    case 'Fire': return '#FF623DCC';
    case 'Natural': return '#9EDC23CC';
    case 'Physical': return '#888888CC';
    case 'Pulse': return '#FFC000CC';
    default: return '#888888CC';
  }
}

function getCharTypeIcon(type: string): string {
  switch (type) {
    case 'Cryst': return 'icon_charattrtype_cold';
    case 'Fire': return 'icon_charattrtype_fire';
    case 'Natural': return 'icon_charattrtype_nature';
    case 'Physical': return 'icon_charattrtype_physical';
    case 'Pulse': return 'icon_charattrtype_pulse';
    default: return 'icon_charattrtype_physical';
  }
}

function getCharRarityColor(value: number): string {
  switch (value) {
    case 0: return ""
    case 1: return "#A0A0A0";
    case 2: return "#DCDC00";
    case 3: return "#26BBFD";
    case 4: return "#9452FA";
    case 5: return "#FFBB03";
    case 6: return "#FE5A00";
    default: return "";
  }
}

export default function OperatorList({ lang, data }: { lang: string; data: any[] }) {
  const chars = [...data].sort((a, b) => b.rarity - a.rarity);
  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {chars.map((char: any) => (
          <a href={`/${lang}/operators/${char.slug}`} key={char.id}>
            <div className="group relative aspect-[152/212] bg-muted dark:bg-card rounded overflow-hidden">
              <img
                src={`https://ef-assets.closure.wiki/v1/charportraits/icon_${char.id}.png`}
                className="w-full h-full object-contain absolute inset-0 transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute left-[4px] top-[4px] h-[28px] w-[28px] p-0.5 rounded bg-black/70">
                <img 
                  src={`https://ef-assets.closure.wiki/v1/charicons/icon_profession_${char.profession}_s.png`} 
                  className="h-full w-full object-contain" loading="lazy" decoding="async"
                />
              </div>

              <div
                className="absolute left-[38px] top-[4px] h-[28px] w-[28px] p-0.5 rounded"
                style={{ backgroundColor: getCharTypeColor(char.charTypeId) }}
              >
                <img
                  src={`https://ef-assets.closure.wiki/v1/charattrtype/${getCharTypeIcon(char.charTypeId)}.png`}
                  className="h-full w-full object-contain scale-125" loading="lazy" decoding="async"
                />
              </div>

              <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-2 text-left font-semibold text-white text-sm md:text-base">
                <span style={{
                  textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                }}>{char.name}</span>
                <br />
                <span style={{ color: getCharRarityColor(char.rarity) }}>
                  {"★".repeat(char.rarity)}
                </span>
              </div>

              <div className="absolute left-0 right-0 bottom-0 h-[4px]" style={{ backgroundColor: getCharRarityColor(char.rarity) }}></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}