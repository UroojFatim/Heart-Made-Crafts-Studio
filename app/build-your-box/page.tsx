import type { Metadata } from "next";
import BoxBuilder from "@/components/BoxBuilder";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Build Your Box",
  description:
    "Design your own handmade gift box — choose the presentation, the handmade piece, what goes inside and the words on the card. Made to order in Karachi, delivered across Pakistan.",
};

export default function BuildYourBoxPage() {
  return (
    <div className="shell pb-10 pt-14 lg:pt-20">
      <Reveal>
        <p className="eyebrow">Build your box</p>
        <h1 className="display-tight mt-5 max-w-[16ch] text-[clamp(2.5rem,6.4vw,4.4rem)]">
          Design it yourself, in about a minute.
        </h1>
        <p className="mt-7 max-w-[54ch] text-[1.05rem] leading-relaxed text-ink-2">
          Pick the presentation, the handmade piece, what goes inside and the
          words on the card. One button sends the whole brief to WhatsApp —
          already written out, so the first message is the last one you have to
          think about. We come back with options and an honest price.
        </p>
      </Reveal>

      <div className="mt-14">
        <BoxBuilder />
      </div>
    </div>
  );
}
