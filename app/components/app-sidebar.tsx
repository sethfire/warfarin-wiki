import { LanguageSwitcher } from "./language-switcher";

export default function AppSidebar({ lang }: { lang: string }) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <nav className="sticky top-16 h-[calc(100vh-4rem)] overflow-auto px-4">
        <h2 className="text-sm font-semibold mb-2 text-muted-foreground">Language</h2>
        <LanguageSwitcher />
        <h2 className="text-sm font-semibold mt-4 mb-2 text-muted-foreground">Navigation</h2>
        <ul className="text-sm space-y-2">
          <li><a href={`/${lang}/operators`} className="hover:text-primary transition-colors">Operators</a></li>
          <li><a href={`/${lang}/weapons`} className="hover:text-primary transition-colors">Weapons</a></li>
          <li><a href={`/${lang}/enemies`} className="hover:text-primary transition-colors">Enemies</a></li>
        </ul>
      </nav>
    </aside>
  );
}