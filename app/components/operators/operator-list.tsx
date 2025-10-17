import { charElementIconId, charRarityColor, charTypeColor } from "~/lib/config";
import { getCharElementIcon, getCharIcon, getClassIcon } from "~/lib/image-utils";

export default function OperatorList({ lang, data }: { lang: string; data: any[] }) {
  const chars = [...data].sort((a, b) => b.rarity - a.rarity);

  return (
    <div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {chars.map((char: any) => (
          <a href={`/${lang}/operators/${char.slug}`} key={char.id}>
            <div className="group relative aspect-[152/212] bg-muted dark:bg-card rounded overflow-hidden">
              <img
                src={getCharIcon(char.id)}
                className="w-full h-full object-contain absolute inset-0 transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute left-[4px] top-[4px] h-[28px] w-[28px] p-0.5 rounded bg-black/70">
                <img 
                  src={getClassIcon(char.profession)}
                  className="h-full w-full object-contain" loading="lazy" decoding="async"
                />
              </div>

              <div
                className="absolute left-[38px] top-[4px] h-[28px] w-[28px] p-0.5 rounded"
                style={{ backgroundColor: charTypeColor(char.charTypeId) }}
              >
                <img
                  src={getCharElementIcon(charElementIconId(char.charTypeId))}
                  className="h-full w-full object-contain scale-125" loading="lazy" decoding="async"
                />
              </div>

              <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-2 text-left font-semibold text-white text-sm md:text-base">
                <span style={{
                  textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
                }}>{char.name}</span>
                <br />
                <span style={{ color: charRarityColor(char.rarity) }}>{"★".repeat(char.rarity)}</span>
              </div>

              <div className="absolute left-0 right-0 bottom-0 h-[4px]" style={{ backgroundColor: charRarityColor(char.rarity) }}></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}