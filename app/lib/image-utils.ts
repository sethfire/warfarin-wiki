const ASSET_CDN_URL = "https://assets.warfarin.wiki";
const ASSET_CDN_VERSION = "v1";

const STATIC_CDN_URL = "https://static.warfarin.wiki";
const STATIC_CDN_VERSION = "v1";

export function getCharSplash(id: string): string {
  return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/charsplash/${id}.webp`;
}

export function getCharIcon(id: string): string {
  return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/charicon/icon_${id}.webp`;
}

export function getCharSquareIcon(id: string): string {
  return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/charremoteicon/icon_${id}.webp`;
}

export function getClassIcon(id: string): string {
  return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/charprofessionicon/icon_profession_${id}_s.webp`;
}

export function getCharElementIcon(id: string): string {
  return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/elementicon/${id}.webp`;
}

export function getSkillIcon(id: string, original: boolean = false): string {
  if (original) return `${ASSET_CDN_URL}/${ASSET_CDN_VERSION}/skillicon/${id}.png`;
  else return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/skillicon/${id}.webp`;
}

export function getBaseSkillIcon(id: string): string {
  return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/spaceshipskillicon/${id}.webp`;
}

export function getAttributeIcon(id: number): string {
  switch (id) {
    case 1: return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/attributeicon/icon_attribute_maxHp.webp`;
    case 2: return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/attributeicon/icon_attribute_atk.webp`;
    case 3: return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/attributeicon/icon_attribute_def.webp`;
    case 39: return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/attributeicon/icon_attribute_str.webp`;
    case 40: return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/attributeicon/icon_attribute_agi.webp`;
    case 41: return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/attributeicon/icon_attribute_wisd.webp`;
    case 42: return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/attributeicon/icon_attribute_will.webp`;
    default: return "";
  }
}

export function getEnemyIcon(id: string): string {
  return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/monstericon/${id}.webp`;
}

export function getItemIcon(id: string): string {
  // if (!id) return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/itemicon/placeholder.webp`;
  return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/itemicon/${id}.webp`;
}

export function getTutorialImage(id: string): string {
  return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/guide/${id}.webp`;
}

export function getLoreImage(id: string): string {
  return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/reading/${id}.webp`;
}

export function getBuildingImage(id: string, original: boolean = false): string {
  if (original) return `${ASSET_CDN_URL}/${ASSET_CDN_VERSION}/buildingimage/${id}.png`;
  else return `${STATIC_CDN_URL}/${STATIC_CDN_VERSION}/buildingimage/${id}.webp`;
}