import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import Reveal from "@/components/Reveal";
import { getOccasion, occasions } from "@/lib/occasions";
import { catalogueProducts, getProduct, isInOccasion, products, stillsFor } from "@/lib/products";
import { priceFloor } from "@/lib/pricing";
import { ogDefaults, reelLink, site, waLink } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };

  return {
    title: product.name,
    description: `${product.tagline} ${product.description.slice(0, 120)}… Handmade in ${site.city}, delivered across Pakistan.`,
    openGraph: {
      ...ogDefaults,
      title: `${product.name} · ${site.name}`,
      description: product.tagline,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const inOccasions =
    product.occasions === "all"
      ? occasions
      : product.occasions
          .map((s) => getOccasion(s))
          .filter((o): o is NonNullable<typeof o> => Boolean(o));

  // From the catalogue only, so a home-only product never surfaces
  // here as a side door back into the grids.
  const related = catalogueProducts()
    .filter(
      (p) =>
        p.slug !== product.slug &&
        inOccasions.some((o) => isInOccasion(p, o.slug)),
    )
    .slice(0, 3);

  // null when the product has no reel, or the link cannot be read.
  const reel = product.reel ? reelLink(product.reel) : null;

  const orderMessage =
    `Assalam o alaikum! Mujhe "${product.name}" ke bare mein poochna tha.\n\n` +
    `Kis ke liye: \nOccasion: \nBudget: \nName jo likhwana hai: \nKab chahiye: \nDelivery city: `;

  return (
    <>
      <article className="shell pt-10 lg:pt-14">
        <Reveal>
          <nav aria-label="Breadcrumb" className="eyebrow flex flex-wrap items-center gap-2.5">
            <Link href="/shop" className="link-wipe">
              Occasions
            </Link>
            <span aria-hidden="true">·</span>
            <span className="text-ink-2">{product.name}</span>
          </nav>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* ── Gallery ──────────────────────────────────────── */}
          <Reveal variant="scale" className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery
              stills={stillsFor(product)}
              palette={product.palette}
              id={`hero-${product.slug}`}
              variant={products.indexOf(product)}
            />

            {/*
              The reel.

              This sits directly under the gallery because it fills the
              gap the video left: somebody who wants to see the box
              move, rather than sit still, now has somewhere to go. It
              is a link rather than an embed on purpose — an Instagram
              embed loads their scripts and iframes on every product
              page, which is the weight we just finished removing.

              No `reel` on the product, or one that cannot be read,
              renders nothing at all.
            */}
            {reel && (
              <a
                href={reel}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 flex items-center justify-between gap-4 border border-paper-3 px-5 py-4 transition-colors duration-500 hover:border-rose"
              >
                <span className="flex items-center gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-rose">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="17.6" cy="6.4" r="1.2" fill="currentColor" />
                  </svg>
                  <span>
                    <span className="block text-[0.9rem] text-ink">
                      Watch this one
                    </span>
                    <span className="block text-[0.78rem] text-ink-3">
                      On Instagram, @{site.instagram}
                    </span>
                  </span>
                </span>
                <svg
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5"
                >
                  <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}

            <dl className="mt-6 grid grid-cols-2 gap-px border border-paper-3 bg-paper-3 sm:grid-cols-3">
              {[
                ["Ready in", `${product.leadTimeDays[0]}–${product.leadTimeDays[1]} days`],
                ["Made in", site.city],
                ["Customization", `One thing that is fully customized`],
              ].map(([k, v]) => (
                <div key={k} className="bg-paper px-4 py-4">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-1.5 text-[0.88rem] text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* ── Detail ───────────────────────────────────────── */}
          <div>
            <Reveal variant="right">
              <div className="flex flex-wrap gap-2">
                {inOccasions.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/occasions/${o.slug}`}
                    className="border border-paper-3 px-3 py-1 text-[0.72rem] tracking-wide text-ink-3 transition-colors duration-500 hover:border-rose hover:text-ink"
                  >
                    {o.name}
                  </Link>
                ))}
              </div>

              <h1 className="display-tight mt-5 text-[clamp(2.4rem,5.6vw,3.9rem)]">
                {product.name}
              </h1>
              <p className="italic-serif mt-4 text-[1.32rem] text-ink-2">
                {product.tagline}
              </p>

              <p className="mt-7 max-w-[54ch] text-[1.02rem] leading-relaxed text-ink-2">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={110}>
              <div className="mt-9 border-l-2 border-rose bg-paper-2/60 py-6 pl-7 pr-6">
                <p className="eyebrow text-rose">The handmade piece</p>
                <p className="display mt-2.5 text-[1.5rem] leading-tight">
                  {product.handmade}
                </p>
                <p className="mt-3 max-w-[46ch] text-[0.92rem] leading-relaxed text-ink-2">
                  This is the part that isn&rsquo;t bought from anywhere. It is
                  made for one person, and it&rsquo;s why the box gets kept.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-10">
                <h2 className="eyebrow">What&rsquo;s inside</h2>
                <ul className="mt-5 space-y-px">
                  {product.includes.map((item) => (
                    <li
                      key={item}
                      className="group flex items-start gap-4 border-b border-paper-3 py-3.5 text-[0.98rem] text-ink-2 transition-colors duration-500 hover:text-ink"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" className="mt-1.5 shrink-0" aria-hidden="true">
                        <circle
                          cx="7"
                          cy="7"
                          r="3"
                          fill="var(--color-rose)"
                          className="origin-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[0.85rem] leading-relaxed text-ink-3">
                  Contents are adjusted to your brief and to what&rsquo;s good in
                  the market that week. We confirm the exact list — and the price
                  — with you before anything is bought.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-12 border border-paper-3 p-7 lg:p-8">
                <a
                  href={waLink(orderMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-full justify-center bg-ink px-7 py-5 text-[0.9rem] tracking-wide text-paper after:bg-rose"
                >
                  Ask about this on WhatsApp
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                    <path
                      d="M0 5h14M10 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <p className="mt-4 text-center text-[0.82rem] leading-relaxed text-ink-3">
                  Opens WhatsApp with the details filled in. Tell us your budget
                  and we&rsquo;ll build to it — nothing owed until you&rsquo;ve
                  seen options.
                </p>

                <div className="rule-gold my-6" />

                <ul className="space-y-2.5 text-[0.85rem] text-ink-2">
                  <li className="flex gap-3">
                    <span className="text-rose" aria-hidden="true">·</span>
                    Cash on delivery available on ready pieces
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose" aria-hidden="true">·</span>
                    50% advance on personalised work, 50% on delivery
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose" aria-hidden="true">·</span>
                    Progress clips sent to you while it&rsquo;s being made
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="shell mt-32">
          <Reveal>
            <div className="rule-gold" />
            <h2 className="display mt-10 text-[clamp(1.9rem,4vw,2.8rem)]">
              Others for the same occasion
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90} className="h-full">
                <ProductCard product={p} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/*
        No VideoObject here any more.

        It used to sit on this page, and it had to go when the clips
        did. Schema describes what is actually on the page: a
        VideoObject on a page with no video is a claim Google checks and
        does not find, and pages that make it lose the video result they
        were asking for anyway. The markup moved to the home page, which
        is where the clips now play.
      */}
    </>
  );
}
