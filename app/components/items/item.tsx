import { itemRarityColor } from "~/config/data-config";

export default function Item({ link, icon, name, count, rarity }: { link: string; icon: string; name: string; count?: number; rarity?: number }) {
  return (
    <a href={link} title={name}>
      <div className="group relative aspect-square bg-muted dark:bg-card rounded overflow-hidden w-16">
        {icon && <img
            src={icon}
            className="w-full h-full object-contain absolute inset-0"
            loading="lazy"
            decoding="async"
        />}

        {rarity && <div
          className="absolute left-0 right-0 bottom-0 h-1" 
          style={{ backgroundColor: itemRarityColor(rarity) }}
        />}

        {count && (
          <div className="absolute top-0 right-0 text-xs px-1 py-0.5 bg-black rounded">
            {count}
          </div>
        )}
      </div>
    </a>
  );
}