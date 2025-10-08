import en from "~/i18n/en";
import cn from "~/i18n/cn";
import jp from "~/i18n/jp";
import kr from "~/i18n/kr";

type Messages = Record<string, string>;
type Locale = "en" | "cn" | "jp" | "kr";

const dictionary: Record<Locale, Messages> = { en, cn , jp, kr };

export function i18n(lang: string) {
  if (!["en", "cn", "jp", "kr"].includes(lang)) lang = "en";
  let localizedDict = dictionary[lang as Locale];
  return (key: string) => localizedDict[key] ?? dictionary["en"][key] ?? key;
}