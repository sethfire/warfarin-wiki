import { Outlet, useMatches, useParams } from "@remix-run/react";
import AppSidebar from "~/components/app-sidebar";
import TableOfContents from "~/components/table-of-contents";
import Header from "~/components/header";

export default function Layout() {
  const { lang } = useParams();
  if (!lang) throw new Response("", { status: 404 });

  const matches = useMatches();
  const active: any = matches[matches.length - 1];
  const tocItems = active?.handle?.getToc?.(active.data) || [];

  return (
    <main>
      <Header lang={lang} />
      <div className="max-w-[1536px] mx-auto flex">
        <AppSidebar lang={lang} />
        <div className="flex-1 max-w-5xl px-4 xl:px-0 min-w-0">
          <Outlet />
        </div>
        <TableOfContents items={tocItems} />
      </div>
      {/* <Footer lang={lang} /> */}
    </main>
  );
}
