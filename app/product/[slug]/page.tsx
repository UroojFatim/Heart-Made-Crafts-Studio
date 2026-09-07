import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import Reveal from "@/components/Reveal";
import { getOccasion, occasions } from "@/lib/occasions";
import { absolutePosterUrl, absoluteVideoUrl } from "@/lib/media";
import { getProduct, isInOccasion, products } from "@/lib/products";
import { priceFloor } from "@/lib/pricing";
import { ogDefaults, site, waLink } from "@/lib/site";

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

  const related = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        inOccasions.some((o) => isInOccasion(p, o.slug)),
    )
    .slice(0, 3);

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
              media={product.media}
              palette={product.palette}
              id={`hero-${product.slug}`}
              variant={products.indexOf(product)}
            />

            <dl className="mt-6 grid grid-cols-2 gap-px border border-paper-3 bg-paper-3 sm:grid-cols-3">
              {[
                ["Ready in", `${product.leadTimeDays[0]}–${product.leadTimeDays[1]} days`],
                ["Made in", site.city],
                ["Pricing", `From ${priceFloor}, quoted to your brief`],
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
        VideoObject, one per clip.

        This is what lets a gift-box video earn a video result for
        heartmadecrafts.studio rather than for somebody else's platform —
        `contentUrl` points at our own file on our own domain.

        `uploadDate` is only emitted when the clip has a `published` date
        in lib/products.ts. Google treats it as required for a video
        result, so a clip without one still validates but will not be
        featured. Nothing here is invented: no date, no field.
      */}
      {product.media.map((m) => (
        <script
          key={m.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: m.alt,
              description: `${product.name} — ${product.tagline} ${product.handmade}.`,
              thumbnailUrl: absolutePosterUrl(m.id, site.url),
              contentUrl: absoluteVideoUrl(m.id, site.url),
              ...(m.published ? { uploadDate: m.published } : {}),
              publisher: { "@id": `${site.url}/#business` },
              isFamilyFriendly: true,
            }),
          }}
        />
      ))}
    </>
  );
}
