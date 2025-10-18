import { ArrowRight, Clock, Plus } from "lucide-react";
import React from "react";
import Item from "~/components/items/item";
import { getItemIcon } from "~/lib/image-utils";

export default function RecipeTable({ recipes, facilities, items, lang }: { recipes: any[], facilities: any[], items: any[], lang: string }) {
  return (
    <div className="overflow-x-auto">
    <table className="border-collapse table-auto text-sm">
      <thead className="bg-card">
        <tr>
          <th className="p-2">Recipe</th>
          <th className="p-2">Input</th>
          <th className="p-2"></th>
          <th className="p-2">Output</th>
        </tr>
      </thead>
      <tbody className="bg-muted">
        {recipes.map((recipe: any) => (
          <tr key={recipe.id}>
            <td className="p-2 border-t">
              {recipe.formulaDesc}
                {(() => {
                  const facility = facilities.find((f: any) => f.id === recipe.machineId);
                  if (!facility) return null;
                  return (
                    <>
                      <br />Facility: <a href={`/${lang}/facilities/${facility.id}`} className="text-blue-500 hover:underline">
                        {facility.name}
                      </a>
                    </>
                  );
                })()}
            </td>
              <td className="p-4 border-t">
                <div className="flex items-center gap-2">
                  {recipe.ingredients[0].group.map((input: any, index: number, arr: any[]) => {
                    const itemData = items.find((item: any) => item.id === input.id);
                    const rate = (input.count / recipe.progressRound) * 60;
                    return (
                      <React.Fragment key={index}>
                        <Item
                          link={`/${lang}/items/${itemData.id}`}
                          icon={getItemIcon(itemData.iconId)}
                          name={itemData.name}
                          count={input.count}
                          rarity={itemData.rarity}
                          rate={rate}
                          showName={true}
                        />
                        {index < arr.length - 1 && <Plus className="w-6 h-6" />}
                      </React.Fragment>
                    );
                  })}
                </div>
              </td>
              <td className="p-4 border-t">
                <div className="flex flex-col items-center gap-1">
                    <ArrowRight/>
                    <span className="flex items-center gap-1 text-xs">
                    <Clock className="w-4 h-4" />
                    {recipe.progressRound}s
                    </span>
                </div>
              </td>
              <td className="p-4 border-t">
                <div className="flex items-center gap-2">
                  {recipe.outcomes[0].group.map((input: any, index: number, arr: any[]) => {
                    const itemData = items.find((item: any) => item.id === input.id);
                    const rate = (input.count / recipe.progressRound) * 60;
                    return (
                      <React.Fragment key={index}>
                        <Item
                          link={`/${lang}/items/${itemData.id}`}
                          icon={getItemIcon(itemData.iconId)}
                          name={itemData.name}
                          count={input.count}
                          rarity={itemData.rarity}
                          rate={rate}
                          showName={true}
                        />
                        {index < arr.length - 1 && <Plus className="w-6 h-6" />}
                      </React.Fragment>
                    );
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}