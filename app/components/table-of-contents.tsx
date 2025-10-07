import React from "react";
import { Link } from "@remix-run/react";

export default function TableOfContents({ items }: { items: { id: string; title: string; }[] }) {
  if (!Array.isArray(items)) return null;

  return (
    <aside className="hidden xl:block w-64 flex-shrink-0">
      <nav className="sticky top-16 h-[calc(100vh-4rem)] overflow-auto px-4">
        {items.length > 0 && (
          <>
            <h2 className="text-sm font-semibold mb-2 text-muted-foreground">
              Table of Contents
            </h2>
            <ul className="text-sm space-y-2">
              {items.map((item: { id: string; title: string }) => (
                <li key={item.id} className="pl-1">
                  <Link to={{ hash: `#${item.id}` }} preventScrollReset replace className="hover:text-primary transition-colors">
                    # {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </aside>
  );
}