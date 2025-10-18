import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Menu, X } from "lucide-react";
import { NAVIGATION, SITE_NAME } from "~/config/site-config";

export default function Header({ lang = "en" }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background h-16">
        <div className="max-w-[1536px] mx-auto flex h-full items-center justify-between px-4 xl:pr-64">
          <a href={`/${lang}`} className="flex items-center gap-2">
            <img
              src="/castle3.png"
              className="h-8 w-8 rounded object-contain"
            />
            <span className="font-semibold text-lg">{SITE_NAME}</span>
          </a>

          <Button
            variant="outline"
            className="lg:hidden cursor-pointer"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/50 z-40 lg:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      <nav
        className={`fixed top-16 left-0 right-0 w-full bg-background z-50 lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col p-6 pt-0 gap-4">
          {NAVIGATION.map((item) => (
            <a
              key={item.href}
              href={`/${lang}/${item.href}`}
              className="text-lg hover:text-blue-600"
              onClick={toggleMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}