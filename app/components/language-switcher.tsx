import { Link, useLocation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { LANGUAGES } from "~/config/config";

export function LanguageSwitcher() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const currentLocale = segments[0] ?? "en";

  return (
    <div className="flex flex-wrap gap-2" role="navigation">
      {LANGUAGES.map((lang) => {
        const newPath = `/${[lang.code, ...segments.slice(1)].join("/")}`;
        const fullPath = `${newPath}${location.search}${location.hash}`;
        const isActive = lang.code === currentLocale;

        return (
          <Link 
            key={lang.code} 
            to={fullPath} 
            prefetch="none" 
            reloadDocument
          >
            <Button 
              variant={isActive ? "default" : "outline"} 
              size="sm" 
              className="min-w-[3rem] cursor-pointer"
            >
              {lang.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
}