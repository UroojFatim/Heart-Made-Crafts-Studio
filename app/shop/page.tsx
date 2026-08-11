import type { Metadata } from "next";
import Link from "next/link";
import ShopGrid from "@/components/ShopGrid";
import Reveal from "@/components/Reveal";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Gift Boxes",
  description:
    "Handmade gift boxes and hampers from Karachi, from Rs 600 to Rs 35,000. Real prices, no DM required. Made to order, delivered across Pakistan.",
};

export default function ShopPage() {
  return (
    <div className="shell pb-8 pt-14 lg:pt-20">
      <Reveal>
        <p className="eyebrow">Everything we make</p>
        <h1 className="display-tight mt-5 max-w-[14ch] text-[clamp(2.8rem,7vw,5rem)]">
          The boxes, with their prices on.
        </h1>
        <p className="mt-7 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink-2">
          Every one is made to order and adjusted to your brief, so treat these
          as starting points rather than a fixed menu. If the number in your
          head isn&rsquo;t on this page,{" "}
          <Link href="/build-your-box" className="link-wipe text-ink">
            build to your budget instead
          </Link>
          .
        </p>
      </Reveal>

      <div className="mt-14">
        <ShopGrid products={products} />
      </div>
    </div>
  );
}
