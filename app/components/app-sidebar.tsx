import { NAVIGATION } from "~/config/site-config";
import { LanguageSwitcher } from "./language-switcher";

export default function AppSidebar({ lang }: { lang: string }) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <nav className="sticky top-16 h-[calc(100vh-4rem)] overflow-auto px-4">
        <h2 className="text-sm font-semibold mb-2 text-muted-foreground">Language</h2>
        <LanguageSwitcher />
        <h2 className="text-sm font-semibold mt-4 mb-2 text-muted-foreground">Navigation</h2>
        <ul className="text-sm space-y-2">
          {NAVIGATION.map((item) => (
            <li key={item.href}><a href={`/${lang}/${item.href}`} className="hover:text-primary transition-colors">{item.label}</a></li>
          ))}
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