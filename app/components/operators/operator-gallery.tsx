import CarouselGallery from "~/components/carousel-gallery";
import { getCharSplash, getCharSquareIcon } from "~/lib/image-utils";

export default function OperatorGallery({ charId }: { charId: string }) {
  if (!charId) return null;

  const charArts = [{
    src: getCharSplash(charId),
    thumb: getCharSquareIcon(charId),
    download: `https://assets.warfarin.wiki/v1/charsplash/${charId}.png`,
    title: "",
    desc: "",
    display: "object-cover",
  }];

  if (charId === "chr_0003_endminf") {
    charArts.push({
      src: getCharSplash("chr_0002_endminm"),
      thumb: getCharSquareIcon("chr_0002_endminm"),
      download: `https://assets.warfarin.wiki/v1/charsplash/chr_0002_endminm.png`,
      title: "",
      desc: "",
      display: "object-cover",
    });
  }

  return (
    <div>
      <CarouselGallery images={charArts} changeAspectonMobile={true} />
    </div>
  );
}