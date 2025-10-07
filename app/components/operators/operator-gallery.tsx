import CarouselGallery from "~/components/carousel-gallery";

export default function OperatorGallery({ charId }: { charId: string }) {
  if (!charId) return null;

  const charArts = [{
    src: `https://ef-assets.closure.wiki/v1/characters/${charId}.png`,
    thumb: `https://ef-assets.closure.wiki/v1/charavatars/icon_${charId}.png`,
    title: "",
    desc: "",
    display: "object-cover",
  }];

  if (charId === "chr_0003_endminf") {
    charArts.push({
      src: `https://ef-assets.closure.wiki/v1/characters/chr_0002_endminm.png`,
      thumb: `https://ef-assets.closure.wiki/v1/charavatars/icon_chr_0002_endminm.png`,
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