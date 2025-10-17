export function enemyType(type: number): string {
  switch (type) {
    case 0: return "Common";
    case 1: return "Advanced";
    case 2: return "Boss";
    case 3: return "Elite";
    default: return "Unknown";
  }
}

export function enemyColor(type: number): string {
  switch (type) {
    case 0: return "#26BBFD"; // Common (3)
    case 3: return "#9452FA"; // Elite (4)
    case 1: return "#FFBB03"; // Advanced (5)
    case 2: return "#FE5A00"; // Boss (6)
    default: return "#FFFFFF";
  }
}

export function charRarityColor(value: number): string {
  switch (value) {
    case 1: return "#A0A0A0";
    case 2: return "#DCDC00";
    case 3: return "#26BBFD";
    case 4: return "#9452FA";
    case 5: return "#FFBB03";
    case 6: return "#FE5A00";
    default: return "#FFFFFF";
  }
}

export function charTypeColor(type: string): string {
  switch (type) {
    case "Cryst": return "#21C6D0CC";
    case "Fire": return "#FF623DCC";
    case "Natural": return "#9EDC23CC";
    case "Physical": return "#888888CC";
    case "Pulse": return "#FFC000CC";
    default: return "#888888CC";
  }
}

export function charElementIconId(type: string): string {
  switch (type) {
    case "Cryst": return "icon_charattrtype_cold";
    case "Fire": return "icon_charattrtype_fire";
    case "Natural": return "icon_charattrtype_nature";
    case "Physical": return "icon_charattrtype_physical";
    case "Pulse": return "icon_charattrtype_pulse";
    default: return "unknown";
  }
}

export function attributeType(attrId: number) {
  switch (attrId) {
    case 39: return "STR";
    case 40: return "AGI";
    case 41: return "INT";
    case 42: return "WILL";
    default: return "Unknown";
  }
}

export function weaponType(type: number): string {
  switch (type) {
    case 1: return "Sword";
    case 2: return "Orbiter";
    case 3: return "Great Sword";
    case 5: return "Polearm";
    case 6: return "Guns";
    default: return "Unknown";
  }
}

export function skillType(type: number): string {
  switch (type) {
    case 0: return "Normal Attack";
    case 1: return "Normal Skill";
    case 2: return "Ultimate";
    case 3: return "Combo Skill";
    default: return "Unknown";
  }
}