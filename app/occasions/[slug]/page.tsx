import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FilteredGrid from "@/components/FilteredGrid";
import Reveal from "@/components/Reveal";
import { getOccasion, occasions } from "@/lib/occasions";
import { productsForOccasion } from "@/lib/products";
import { site, waLink } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return occasions.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const occasion = getOccasion(slug);
  if (!occasion) return { title: "Not found" };

  return {
    title: `${occasion.name} Gifts`,
    description: `${occasion.tagline} ${occasion.blurb} Handmade in ${site.city}, delivered across Pakistan.`,
    openGraph: {
      title: `${occasion.name} Gifts · ${site.name}`,
      description: occasion.tagline,
    },
  };
}

export default async function OccasionPage({ params }: Params) {
  const { slug } = await params;
  const occasion = getOccasion(slug);
  if (!occasion) notFound();

  const list = productsForOccasion(occasion.slug);
  const others = occasions.filter((o) => o.slug !== occasion.slug);

  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="orb float-orb"
          style={{
            top: "-30%",
            right: "-8%",
            width: "40rem",
            height: "32rem",
            background: `radial-gradient(circle, ${occasion.palette.glow}, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        <div className="shell relative pt-12 lg:pt-16">
          <Reveal>
            <nav aria-label="Breadcrumb" className="eyebrow flex items-center gap-2.5">
              <Link href="/shop" className="link-wipe">
                Occasions
              </Link>
              <span aria-hidden="true">·</span>
              <span className="text-ink-2">{occasion.name}</span>
            </nav>

            <h1 className="display-tight mt-6 max-w-[16ch] text-[clamp(2.6rem,6.4vw,4.6rem)]">
              {occasion.name}
            </h1>
            <p className="italic-serif mt-4 text-[1.3rem] text-ink-2">
              {occasion.tagline}
            </p>
            <p className="mt-5 max-w-[54ch] leading-relaxed text-ink-2">
              {occasion.blurb}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="rule-gold mt-10" />
          </Reveal>
        </div>
      </section>

      <section className="shell mt-10">
        <FilteredGrid products={list} filters={occasion.filters} />
      </section>

      {/* Nothing here is priced, so say so once, clearly. */}
      <section className="shell mt-20">
        <Reveal>
          <div className="flex flex-col items-start gap-6 border border-dashed border-gold-soft bg-paper-2/60 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
            <div>
              <h2 className="display text-[1.75rem]">
                Every piece is built to your brief.
              </h2>
              <p className="mt-2.5 max-w-[50ch] leading-relaxed text-ink-2">
                That&rsquo;s why the cards here carry a lead time rather than a
                price — the same box at two budgets is two different boxes. The{" "}
                <Link href="/shop" className="link-wipe text-ink">
                  bands we work in
                </Link>{" "}
                are on the shop page; the exact figure comes back on your brief.
              </p>
            </div>
            <a
              href={waLink(
                `Assalam o alaikum! ${occasion.name} ke liye kuch banwana tha.\n\nKis ke liye: \nBudget: \nKab chahiye: \nDelivery city: `,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn shrink-0 bg-ink px-7 py-4 text-[0.85rem] tracking-wide text-paper after:bg-rose"
            >
              Ask on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {/* Other occasions */}
      <section className="shell mt-24">
        <Reveal>
          <p className="eyebrow">Other occasions</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/occasions/${o.slug}`}
                className="group flex items-center gap-3 border border-paper-3 px-5 py-3 transition-colors duration-500 hover:border-rose"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: o.palette.ribbon }}
                  aria-hidden="true"
                />
                <span className="text-[0.92rem] text-ink-2 transition-colors duration-500 group-hover:text-ink">
                  {o.name}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}
