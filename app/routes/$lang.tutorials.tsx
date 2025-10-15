import { Outlet, useMatches, useParams } from "@remix-run/react";
import AppSidebar from "~/components/app-sidebar";
import TableOfContents from "~/components/table-of-contents";
import Header from "~/components/header";
import Footer from "~/components/footer";

export default function ItemsLayout() {
  const { lang } = useParams();
  if (!lang) throw new Response("", { status: 404 });

  const matches = useMatches();
  const active: any = matches[matches.length - 1];
  const tocItems = active?.handle?.getToc?.(active.data) || [];

  return (
    <main>
      <Header lang={lang} />
      <div className="max-w-[1536px] mx-auto">
        <div className="flex">
          <AppSidebar lang={lang} />
          <div className="flex-1 min-w-0 max-w-5xl flex flex-col gap-4 px-4 xl:px-0">
            <Outlet />
          </div>
          <TableOfContents items={tocItems} />
        </div>
      </div>
    </main>
  );
}
