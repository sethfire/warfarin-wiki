export default function Header({ lang }: { lang: string }) {
  return (
    <header className="sticky top-0 z-50 bg-background h-16">
      <div className="max-w-[1536px] mx-auto flex h-full items-center justify-between px-4">
        <a href={`/${lang}`} className="flex items-center gap-2">
          <img src="/castle3.png" className="h-8 w-8 object-contain" alt="" />
          <span className="font-semibold text-lg">Warfarin Wiki</span>
        </a>
      </div>
    </header>
  );
}