import { itemRarityColor } from "~/config/data-config";
import { getItemIcon } from "~/lib/image-utils";

export default function ItemList({ lang, data }: { lang: string; data: any[] }) {
  const items = [...data].sort((a, b) => a.type - b.type);
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item: any) => (
        <a href={`/${lang}/items/${item.slug}`} key={item.id}>
          <div className="group relative aspect-square bg-muted dark:bg-card rounded overflow-hidden">
            {item.iconId && <img
              src={getItemIcon(item.iconId)}
              className="w-full h-full object-contain absolute inset-0"
              loading="lazy"
              decoding="async"
            />}

            <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-2 text-left font-semibold text-white text-xs md:text-sm">
              <span style={{
                textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
              }}>{item.name || "Unnamed Item"}</span>
              <br />
              <span className="text-muted-foreground">{item.typeName}</span>
            </div>

            <div className="absolute left-0 right-0 bottom-0 h-[4px]" style={{ backgroundColor: itemRarityColor(item.rarity) }}></div>
          </div>
        </a>
      ))}
    </div>
  );
}