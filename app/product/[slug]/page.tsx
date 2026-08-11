import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BoxArt from "@/components/BoxArt";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getProduct, products } from "@/lib/products";
import { pkr, site, waLink } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };

  return {
    title: product.name,
    description: `${product.tagline} ${product.description.slice(0, 120)}… From ${pkr(
      product.price,
    )}. Handmade in Karachi, delivered across Pakistan.`,
    openGraph: {
      title: `${product.name} · HeartMade Craft`,
      description: product.tagline,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.occasions.some((o) => product.occasions.includes(o)),
    )
    .slice(0, 3);

  const orderMessage =
    `Assalam o alaikum! Mujhe "${product.name}" ${
      product.from ? `(from ${pkr(product.price)})` : `(${pkr(product.price)})`
    } chahiye tha.\n\n` +
    `Kis ke liye: \nOccasion: \nName jo likhwana hai: \nKab chahiye: \nDelivery city: `;

  return (
    <>
      <article className="shell pt-10 lg:pt-14">
        {/* Breadcrumb */}
        <Reveal>
          <nav aria-label="Breadcrumb" className="eyebrow flex items-center gap-2.5">
            <Link href="/shop" className="link-wipe">
              Shop
            </Link>
            <span aria-hidden="true">·</span>
            <span className="text-ink-2">{product.name}</span>
          </nav>
        </Reveal>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          {/* ── Art plate ────────────────────────────────────── */}
          <Reveal variant="scale" className="lg:sticky lg:top-28 lg:self-start">
            <div
              className="lid-group group relative overflow-hidden rounded-[3px]"
              style={{
                background: `linear-gradient(165deg, ${product.palette.box}66 0%, var(--color-paper) 74%)`,
              }}
            >
              <BoxArt
                palette={product.palette}
                id={`hero-${product.slug}`}
                variant={products.indexOf(product)}
                className="h-auto w-full"
              />
              <p className="eyebrow absolute bottom-5 left-6 text-ink-3">
                Hover to lift the lid
              </p>
            </div>

            <dl className="mt-6 grid grid-cols-3 gap-px border border-paper-3 bg-paper-3">
              {[
                ["Ready in", `${product.leadTimeDays[0]}–${product.leadTimeDays[1]} days`],
                ["Size", product.size],
                ["Made in", site.city],
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
                {product.occasions.map((o) => (
                  <span
                    key={o}
                    className="border border-paper-3 px-3 py-1 text-[0.72rem] tracking-wide text-ink-3"
                  >
                    {o}
                  </span>
                ))}
              </div>

              <h1 className="display-tight mt-5 text-[clamp(2.6rem,6vw,4.2rem)]">
                {product.name}
              </h1>
              <p className="italic-serif mt-4 text-[1.35rem] text-ink-2">
                {product.tagline}
              </p>

              <div className="mt-8 flex items-baseline gap-3">
                {product.from && <span className="eyebrow">from</span>}
                <span className="display text-[2.6rem] text-rose">
                  {pkr(product.price)}
                </span>
              </div>

              <p className="mt-7 max-w-[54ch] text-[1.05rem] leading-relaxed text-ink-2">
                {product.description}
              </p>
            </Reveal>

            {/* The handmade piece, given its own weight */}
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

            {/* Contents */}
            <Reveal delay={160}>
              <div className="mt-10">
                <h2 className="eyebrow">What&rsquo;s inside</h2>
                <ul className="mt-5 space-y-px">
                  {product.includes.map((item) => (
                    <li
                      key={item}
                      className="group flex items-start gap-4 border-b border-paper-3 py-3.5 text-[0.98rem] text-ink-2 transition-colors duration-500 hover:text-ink"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        className="mt-1.5 shrink-0"
                        aria-hidden="true"
                      >
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
                  the market that week. We&rsquo;ll confirm the exact list with
                  you before anything is bought.
                </p>
              </div>
            </Reveal>

            {/* Order */}
            <Reveal delay={200}>
              <div className="mt-12 border border-paper-3 p-7 lg:p-8">
                <a
                  href={waLink(orderMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn w-full justify-center bg-ink px-7 py-5 text-[0.9rem] tracking-wide text-paper after:bg-rose"
                >
                  Order this on WhatsApp
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
                  Opens WhatsApp with the details filled in. Nothing to pay yet —
                  we confirm the contents and the price with you first.
                </p>

                <div className="rule-gold my-6" />

                <ul className="space-y-2.5 text-[0.85rem] text-ink-2">
                  <li className="flex gap-3">
                    <span className="text-rose" aria-hidden="true">
                      ·
                    </span>
                    Cash on delivery available on ready boxes
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose" aria-hidden="true">
                      ·
                    </span>
                    50% advance on personalised work, 50% on delivery
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose" aria-hidden="true">
                      ·
                    </span>
                    Progress clips sent to you while it&rsquo;s being made
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="shell mt-32">
          <Reveal>
            <div className="rule-gold" />
            <h2 className="display mt-10 text-[clamp(1.9rem,4vw,2.8rem)]">
              Others for the same occasion
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90} className="h-full">
                <ProductCard product={p} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
