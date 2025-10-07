import { redirect } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = params.lang ?? "en";
  return redirect(`/${lang}/operators`);
}