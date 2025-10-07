import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Search, Menu, Globe, Moon } from "lucide-react";

export default function Header({ lang }: { lang: string }) {
  return (
    <header className="sticky top-0 z-50 bg-background h-16">
      <div className="max-w-[1536px] mx-auto flex h-full items-center justify-between px-4 xl:pr-64">
        <a href={`/${lang}`} className="flex items-center gap-2">
          <img
            src="/castle3.png"
            className="h-8 w-8 object-contain"
            alt="Warfarin Archives"
          />
          <span className="font-semibold text-lg">Warfarin Archives</span>
        </a>

        <div className="hidden sm:flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-full"
              disabled
            />
          </div>

          <Button variant="outline" size="icon">
            <Globe className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <Moon className="h-5 w-5" />
          </Button>
        </div>

        <Button variant="outline" className="sm:hidden p-2">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}