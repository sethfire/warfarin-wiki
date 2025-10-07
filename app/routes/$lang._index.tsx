import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  const lang = params.lang ?? "en";
  return redirect(`/${lang}/operators`);
}