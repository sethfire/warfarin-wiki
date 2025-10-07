import { Link, useLocation } from "@remix-run/react";
import { Button } from "~/components/ui/button";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "zh", label: "ZH" },
  { code: "ja", label: "JA" },
  { code: "ko", label: "KO" },
];

export function LanguageSwitcher() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const currentLocale = segments[0] ?? "en";

  return (
    <div className="flex gap-2">
      {LANGUAGES.map((lang) => {
        const newPath = `/${[lang.code, ...segments.slice(1)].join("/")}${location.search}`;
        const isActive = lang.code === currentLocale;
        return (
          <Link key={lang.code} to={newPath} prefetch="none" reloadDocument>
            <Button variant={isActive ? "default" : "outline"} size="sm" className="cursor-pointer">
              {lang.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}
