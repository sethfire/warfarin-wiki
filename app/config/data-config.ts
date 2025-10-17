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
    case 0: return "#26BBFD"; // Common (3★)
    case 3: return "#9452FA"; // Elite (4★)
    case 1: return "#FFBB03"; // Advanced (5★)
    case 2: return "#FE5A00"; // Boss (6★)
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

export function itemRarityColor(value: number): string {
  switch (value) {
    case 0: return "#A0A0A0"
    case 1: return "#A0A0A0";
    case 2: return "#DCDC00";
    case 3: return "#26BBFD";
    case 4: return "#9452FA";
    case 5: return "#FFBB03";
    case 6: return "#FE5A00";
    default: return "#FFFFFF";
  }
}


export function weaponRarityColor(value: number): string {
  switch (value) {
    case 0: return "#FFFFFF"
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
    case 1: return "HP";
    case 2: return "ATK";
    case 3: return "DEF";
    case 39: return "STR";
    case 40: return "AGI";
    case 41: return "INT";
    case 42: return "WILL";
    default: return "Unknown";
  }
}

export function fullAttributeType(attrId: number) {
  switch (attrId) {
    case 1: return "Base HP";
    case 2: return "Attack";
    case 3: return "Defense";

    case 4: return "Physical DMG Reduction";
    case 5: return "Heat DMG Reduction";
    case 6: return "Electric DMG Reduction";
    case 7: return "Cryo DMG Reduction";

    case 9: return "Critical Rate";
    case 10: return "Critical DMG";

    case 17: return "Basic Attack DMG Bonus";
    case 28: return "Ultimate DMG Bonus";
    case 29: return "Treatment Bonus";
    case 30: return "Treatment Received Bonus";
    case 32: return "Battle Skill DMG Bonus";
    case 33: return "Combo Skill DMG Bonus";
    case 35: return "Heat Burst DMG Increase";
    case 36: return "Electric Burst DMG Increase";
    case 37: return "Cryo Burst DMG Increase";
    case 38: return "Nature Burst DMG Increase";

    case 39: return "Strength";
    case 40: return "Agility";
    case 41: return "Intellect";
    case 42: return "Will";

    case 44: return "Ultimate Gain Efficiency";
    case 47: return "Combo Skill Cooldown Reduction";
    case 48: return "Nature DMG Reduction";
    case 49: return "Arts Reaction and Burst DMG";
    case 50: return "Physical DMG Bonus";
    case 51: return "Heat DMG Bonus";
    case 52: return "Electric DMG Bonus";
    case 53: return "Cryo DMG Bonus";
    case 54: return "Nature DMG Bonus";
    case 56: return "Combustion Boost";
    case 57: return "Electrification Boost";
    case 58: return "Solidification Enhancement";
    case 59: return "Corrosion Boost";
    case 60: return "Æther DMG Reduction";
    case 61: return "DMG Bonus vs Staggered";
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

export function getUnlockText(breakStage: number, level: number): string {
  switch (breakStage) {
    case 1:
      switch (level) {
        case 1: return "Promote to E1 to unlock";
        case 2: return "Promote to E1 to activate the upgraded effect";
        default: return "";
      }
    case 2:
      switch (level) {
        case 1: return "Promote to E2 to unlock";
        case 2: return "Promote to E2 to activate the upgraded effect";
        default: return "";
      }
    case 3:
      switch (level) {
        case 1: return "Promote to E3 to unlock";
        case 2: return "Promote to E3 to activate the upgraded effect";
        default: return "";
      }
    case 4:
      switch (level) {
        case 1: return "Promote to E4 to unlock";
        case 2: return "Promote to E4 to activate the upgraded effect";
        default: return "";
      }
    default: return "";
  }
}