import type { Metadata } from "next";
import BoxBuilder from "@/components/BoxBuilder";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Build Your Box",
  description:
    "Set a budget, choose what goes in, and see the total as you build. Custom handmade gift boxes from Karachi, delivered across Pakistan. No DM required to find out the price.",
};

export default function BuildYourBoxPage() {
  return (
    <div className="shell pb-10 pt-14 lg:pt-20">
      <Reveal>
        <p className="eyebrow">Build your box</p>
        <h1 className="display-tight mt-5 max-w-[16ch] text-[clamp(2.8rem,7vw,5rem)]">
          Price it yourself. No DM required.
        </h1>
        <p className="mt-7 max-w-[54ch] text-[1.05rem] leading-relaxed text-ink-2">
          Set a budget, pick what goes inside, and watch the total move. When
          you&rsquo;re happy, one button sends the whole brief to WhatsApp —
          already written out, so the first message is the last one you have to
          think about.
        </p>
      </Reveal>

      <div className="mt-14">
        <BoxBuilder />
      </div>
    </div>
  );
}
