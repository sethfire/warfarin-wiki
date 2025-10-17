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
          <li><a href={`/${lang}/facilities`} className="hover:text-primary transition-colors">Facilities</a></li>
          <li><a href={`/${lang}/items`} className="hover:text-primary transition-colors">Items</a></li>
          <li><a href={`/${lang}/tutorials`} className="hover:text-primary transition-colors">Tutorials</a></li>
          <li><a href={`/${lang}/lore`} className="hover:text-primary transition-colors">Lore</a></li>
        </ul>
        <div className="absolute bottom-0 left-0 w-full p-4 text-xs text-muted-foreground">
          <div className="mb-2">
            Disclaimer: warfarin.wiki is a fan-made hobby project and is not affiliated with Hypergryph or Gryphline.
          </div>
          <div>
            <a
              href="https://github.com/sethfire/warfarin-wiki"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors underline"
            >
              GitHub
            </a>
          </div>
          {/* <div>
            © {new Date().getFullYear()} warfarin.wiki
          </div> */}
        </div>
      </nav>
    </aside>
  );
}