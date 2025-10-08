import { Separator } from "~/components/ui/separator";

export default function Footer({ lang }: { lang: string }) {
  return (
    <footer>
      <Separator className="my-8" />
      <div className="mb-8 text-sm text-muted-foreground">
        <div className="max-w-3xl mb-4">
          <p>
            <strong>Disclaimer:</strong> warfarin.wiki is a fan-made, non-commercial project. It is not affiliated with, endorsed by, or sponsored by Hypergryph, Gryphline, or any related entities. All materials referenced on this site are owned by their respective rights holders and are presented solely for informational and educational purposes under fair use.
          </p>
        </div>
        <div>
          <p>© {new Date().getFullYear()} warfarin.wiki</p>
        </div>
      </div>
    </footer>
  );
}