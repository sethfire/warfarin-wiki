import { getEnemyIcon } from "../../lib/image-utils";

const enemyRarityColors: Record<number, string> = {
  0: '#26BBFD',  // Common
  3: '#9452FA',  // Elite
  1: '#FFBB03',  // Advanced
  2: '#FE5A00',  // Boss
};

export default function EnemyList({ lang, data }: { lang: string; data: any[] }) {
  const displayTypeOrder = [2, 1, 3, 0];
  const enemies = [...data]
    .filter((enemy: any) => enemy.id !== "eny_0057_dog")
    .sort(
      (a, b) => displayTypeOrder.indexOf(a.displayType) - displayTypeOrder.indexOf(b.displayType)
    );

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {enemies.map((enemy: any) => (
        <a href={`/${lang}/enemies/${enemy.slug}`} key={enemy.id}>
          <div className="group relative aspect-square bg-muted dark:bg-card rounded overflow-hidden">
            <img
              src={getEnemyIcon(enemy.id)}
              className="w-full h-full object-contain absolute inset-0"
              loading="lazy"
              decoding="async"
            />

            <div className="absolute left-0 right-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-2 text-left font-semibold text-white text-sm md:text-base">
              <span style={{
                textShadow: '-1px 0 0 #000,1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000,-1px -1px 0 #000,1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000'
              }}>{enemy.name}</span>
              <br />
            </div>

            <div className="absolute left-0 right-0 bottom-0 h-[4px]" style={{ backgroundColor: enemyRarityColors[enemy.displayType] }}></div>
          </div>
        </a>
      ))}
    </div>
  );
}
