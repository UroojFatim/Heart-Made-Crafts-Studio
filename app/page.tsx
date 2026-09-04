import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import Reviews from "@/components/Reviews";
import ProductCard from "@/components/ProductCard";
import { occasions } from "@/lib/occasions";
import { featuredProducts, productsForOccasion, type Product } from "@/lib/products";
import { site, waLink } from "@/lib/site";

export default function Home() {
  // Home shows the first four featured pieces. Mark a product
  // `featured: true` in lib/products.ts to put it in the running;
  // order follows the order of that file.
  const featured = featuredProducts().slice(0, 4);

  return (
    <>
      <Hero />
      <Marquee />
      <TheOnePiece />
      <Occasions />
      <Featured products={featured} />
      <HowItWorks />
      <Reviews />
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   Occasions — the main way in
   ══════════════════════════════════════════════════════════════ */

function Occasions() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Start here</p>
            <h2 className="display mt-5 max-w-[18ch] text-[clamp(2.1rem,4.6vw,3.4rem)]">
              What&rsquo;s the occasion?
            </h2>
          </div>
          <Link
            href="/shop"
            className="link-wipe mb-2 flex items-center gap-2.5 text-[0.9rem] text-ink"
          >
            See everything
            <Arrow />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {occasions.map((o, i) => {
            const count = productsForOccasion(o.slug).length;
            return (
              <Reveal key={o.slug} delay={i * 60} className="h-full">
                <Link
                  href={`/occasions/${o.slug}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-[4px] border border-paper-3 p-6 transition-[transform,border-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-rose"
                >
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle, ${o.palette.glow}, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <span
                      className="block h-1 w-8 rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-14"
                      style={{ background: o.palette.ribbon }}
                      aria-hidden="true"
                    />
                    <h3 className="display mt-4 text-[1.5rem] leading-none">
                      {o.name}
                    </h3>
                    <p className="italic-serif mt-2 text-[0.94rem] leading-snug text-ink-2">
                      {o.tagline}
                    </p>
                  </div>
                  <p className="eyebrow relative mt-6 text-[0.6rem]">
                    {count} {count === 1 ? "piece" : "pieces"}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   The differentiator — and the page's one dark beat.

   Everything else is cream on cream, which is right for a paper
   brand but goes flat over six screens. This section drops into
   espresso and lights the three pieces like objects on a stand.
   ══════════════════════════════════════════════════════════════ */

function TheOnePiece() {
  const pieces = [
    {
      label: "Written",
      title: "A hand-lettered card in your words",
      body: "You send the words. They come back in ink on cotton paper, lettered by hand and sealed with wax. No fonts, no templates.",
      art: <CardArt />,
    },
    {
      label: "Painted",
      title: "Their name, hand-painted",
      body: "A wooden plaque, a resin keepsake, a lid painted to match. Small enough to keep on a shelf long after the chocolates are gone.",
      art: <PlaqueArt />,
    },
    {
      label: "Kept",
      title: "A pressed flower from before",
      body: "A pressed flower from a day that already happened. Photos illustrated into a spread. The parts of a gift that can't be bought.",
      art: <PressedArt />,
    },
  ];

  return (
    <section className="stage-dark relative overflow-hidden py-24 lg:py-32">
      {/* Warm spill from above, as if a lamp were pointed at the stand */}
      <div
        className="orb float-orb"
        style={{
          top: "-18%",
          left: "50%",
          width: "58rem",
          height: "34rem",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(circle, rgba(255,228,188,0.42), rgba(255,228,188,0))",
        }}
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal variant="left">
            <p className="eyebrow text-gold-soft/75">The difference</p>
            <h2 className="display mt-5 text-[clamp(2.1rem,4.6vw,3.4rem)]">
              What makes a handmade gift box different from a{" "}
              <em className="italic-serif not-italic text-rose-soft">
                ready-made hamper
              </em>
            </h2>
          </Reveal>

          <Reveal variant="right" delay={100} className="lg:pt-4">
            {/* Opens with the line that used to be this section's H2 — it
                keeps the voice, and it is what "that" refers to. */}
            <p className="max-w-[52ch] text-[1.02rem] leading-relaxed text-paper/68">
              Anyone can put chocolates in a box. And most of the pages
              you&rsquo;ve scrolled past do exactly that — the same imported
              bars, the same acrylic lid, a different ribbon. It looks lovely
              for a day.
            </p>
            <p className="mt-4 max-w-[52ch] text-[1.02rem] leading-relaxed text-paper/68">
              We build every box around{" "}
              <span className="font-medium text-paper">
                one piece made by hand for the person receiving it
              </span>
              . That piece has no market price and no substitute, and it is the
              only part they still have a year later.
            </p>
            {/* Ties the "gift hamper" search term to the homepage. */}
            <p className="mt-4 max-w-[52ch] text-[1.02rem] leading-relaxed text-paper/68">
              That is the difference between a gift hamper you buy and a gift box
              that gets made.
            </p>
          </Reveal>
        </div>

        {/* The three pieces, lit */}
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {pieces.map((p, i) => (
            <Reveal key={p.label} delay={i * 110} className="h-full">
              <article className="group relative flex h-full flex-col overflow-hidden rounded-[4px] border border-paper/12 bg-paper/[0.045] p-7 backdrop-blur-[2px] transition-[background-color,border-color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-gold/45 hover:bg-paper/[0.08] lg:p-8">
                {/* Pool of light under each object */}
                <div
                  className="pointer-events-none absolute inset-x-6 top-0 h-40 opacity-60 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(60% 70% at 50% 0%, rgba(255,228,188,0.3), transparent 72%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative mb-7 h-28 w-full [&>svg]:h-full [&>svg]:w-auto">
                  {p.art}
                </div>

                <p className="eyebrow text-rose-soft">{p.label}</p>
                <h3 className="display mt-3 text-[1.65rem] leading-tight">
                  {p.title}
                </h3>
                <p className="mt-3.5 flex-1 text-[0.94rem] leading-relaxed text-paper/62">
                  {p.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Honest numbers — nothing invented, all of it verifiable */}
        <Reveal delay={140}>
          <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-paper/12 lg:grid-cols-4">
            {[
              ["1", "handmade piece in every single box, minimum"],
              ["8", "orders a week, maximum — so nothing is rushed"],
              ["Rs 600", "the smallest thing we&rsquo;ll make for you"],
              ["2–3 days", "from your message to their hands, in Karachi"],
            ].map(([n, label]) => (
              <div
                key={n}
                className="bg-paper/[0.035] px-6 py-7 outline outline-1 outline-paper/10 transition-colors duration-700 hover:bg-paper/[0.07]"
              >
                <dt className="display text-[2rem] text-gold-soft">{n}</dt>
                <dd
                  className="mt-2 text-[0.82rem] leading-relaxed text-paper/55"
                  dangerouslySetInnerHTML={{ __html: label }}
                />
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   Featured boxes
   ══════════════════════════════════════════════════════════════ */

function Featured({ products: list }: { products: Product[] }) {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="orb float-orb"
        style={{
          top: "8%",
          right: "-12%",
          width: "38rem",
          height: "32rem",
          background:
            "radial-gradient(circle, rgba(243,220,211,0.75), rgba(243,220,211,0))",
        }}
        aria-hidden="true"
      />

      <div className="shell relative">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">The boxes</p>
            <h2 className="display mt-5 max-w-[16ch] text-[clamp(2.1rem,4.6vw,3.4rem)]">
              Start from one of these.
            </h2>
            <p className="mt-4 max-w-[46ch] leading-relaxed text-ink-2">
              Every one is made to order and adjusted to your brief. Tell us
              roughly what you want to spend and we&rsquo;ll build to it —
              nothing owed until you&rsquo;ve seen options.
            </p>
          </div>
          <Link
            href="/shop"
            className="link-wipe mb-2 flex items-center gap-2.5 text-[0.9rem] text-ink"
          >
            See everything
            <Arrow />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90} className="h-full">
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={180} className="mt-12">
          <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[4px] border border-gold-soft bg-paper-2/70 p-8 sm:flex-row sm:items-center lg:p-10">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-70"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,228,188,0.85), transparent 70%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <h3 className="display text-[1.7rem]">None of them quite right?</h3>
              <p className="mt-2.5 max-w-[46ch] text-[0.96rem] leading-relaxed text-ink-2">
                Design your own in about a minute — pick the box, the handmade
                piece and what goes in. One button sends the whole brief to us,
                already written out.
              </p>
            </div>
            <Link
              href="/build-your-box"
              className="btn relative shrink-0 bg-ink px-7 py-4 text-[0.85rem] tracking-wide text-paper after:bg-rose"
            >
              Build your box
              <Arrow />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   How it works
   ══════════════════════════════════════════════════════════════ */

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Tell us who it's for",
      body: "A name, the occasion, a budget, and anything you know about them. Two lines is enough to start.",
    },
    {
      n: "02",
      title: "We send you options",
      body: "Two or three directions with honest pricing, usually the same day. Nothing to pay to get here.",
    },
    {
      n: "03",
      title: "We make it — you watch",
      body: "Clips on WhatsApp as it comes together: the card being written, the box being packed, the lid going on.",
    },
    {
      n: "04",
      title: "It arrives",
      body: "Karachi same or next day. Anywhere else in Pakistan, 2–4 days by courier. Cash on delivery where we can.",
    },
  ];

  return (
    <section className="relative bg-paper-2/60 py-24 lg:py-32">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">How it works</p>
          <h2 className="display mt-5 max-w-[20ch] text-[clamp(2.1rem,4.6vw,3.4rem)]">
            Four steps, and only one of them is yours.
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <svg
            aria-hidden="true"
            className="absolute left-0 right-0 top-[2.1rem] hidden h-8 w-full lg:block"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
          >
            <path
              d="M40 20 C 320 -6, 580 44, 900 16 C 1040 4, 1120 18, 1160 20"
              stroke="var(--color-gold-soft)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="5 7"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <li key={s.n}>
                <Reveal delay={i * 100}>
                  <div className="group flex h-[4.2rem] items-start">
                    <span className="flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-full border border-gold-soft bg-paper shadow-[0_10px_24px_-14px_rgb(183_139_75/0.9)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                      <span className="display text-[1.4rem] text-rose">{s.n}</span>
                    </span>
                  </div>
                  <h3 className="display mt-6 text-[1.55rem] leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-[34ch] text-[0.94rem] leading-relaxed text-ink-2">
                    {s.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={160}>
          <div className="mt-16 flex flex-col items-start gap-6 border-t border-paper-3 pt-9 sm:flex-row sm:items-center sm:justify-between">
            <p className="italic-serif max-w-[40ch] text-[1.18rem] text-ink-2">
              Most orders start with one message and a budget.
            </p>
            <a
              href={waLink(
                `Assalam o alaikum! ${site.name} se gift box banwana tha.\n\nKis ke liye: \nOccasion: \nBudget: \nKab chahiye: `,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn shrink-0 border border-ink px-7 py-4 text-[0.85rem] tracking-wide text-ink after:bg-ink hover:text-paper"
            >
              Send that message
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   Drawn assets for the three lit panels (tuned for a dark stage)
   ══════════════════════════════════════════════════════════════ */

function Arrow() {
  return (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
      <path
        d="M0 5h14M10 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardArt() {
  return (
    <svg viewBox="0 0 140 110" fill="none" aria-hidden="true">
      <rect
        x="16"
        y="14"
        width="108"
        height="80"
        rx="4"
        fill="#FDF9F3"
        className="origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-3"
      />
      <path
        d="M32 40 q10 -12 20 0 t20 0 t20 0 t14 -4"
        stroke="#C4695E"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M32 58 h62" stroke="#B78B4B" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M32 70 h44" stroke="#B78B4B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      <circle cx="106" cy="78" r="9" fill="#96453C" />
      <circle cx="106" cy="76" r="4" fill="#FDF9F3" opacity="0.3" />
    </svg>
  );
}

function PlaqueArt() {
  return (
    <svg viewBox="0 0 140 110" fill="none" aria-hidden="true">
      <rect
        x="20"
        y="26"
        width="100"
        height="58"
        rx="6"
        fill="#E6CFA4"
        className="origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-3"
      />
      <path
        d="M38 60 q8 -18 16 0 t16 -2 q8 12 16 -2"
        stroke="#96453C"
        strokeWidth="2.8"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M38 70 h56" stroke="#96453C" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      <circle cx="30" cy="36" r="2.6" fill="#96453C" opacity="0.7" />
      <circle cx="110" cy="36" r="2.6" fill="#96453C" opacity="0.7" />
      <circle cx="30" cy="74" r="2.6" fill="#96453C" opacity="0.7" />
      <circle cx="110" cy="74" r="2.6" fill="#96453C" opacity="0.7" />
    </svg>
  );
}

function PressedArt() {
  return (
    <svg viewBox="0 0 140 110" fill="none" aria-hidden="true">
      <rect x="26" y="14" width="88" height="82" rx="3" fill="#FDF9F3" />
      <rect x="34" y="22" width="72" height="66" rx="2" fill="#F3DCD3" />
      <g
        className="origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        style={{ transformOrigin: "70px 52px" }}
      >
        <path d="M70 78 q-3 -22 0 -34" stroke="#B78B4B" strokeWidth="2" strokeLinecap="round" />
        {[0, 72, 144, 216, 288].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cx = Math.round((70 + Math.cos(rad) * 9) * 100) / 100;
          const cy = Math.round((42 + Math.sin(rad) * 9) * 100) / 100;
          return (
            <ellipse
              key={deg}
              cx={cx}
              cy={cy}
              rx="10"
              ry="7"
              fill="#C4695E"
              opacity="0.9"
              transform={`rotate(${deg} ${cx} ${cy})`}
            />
          );
        })}
        <circle cx="70" cy="42" r="4.4" fill="#B78B4B" />
        <path d="M58 66 q-8 -8 -6 -16" stroke="#B78B4B" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.75" />
        <path d="M82 66 q8 -8 6 -16" stroke="#B78B4B" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.75" />
      </g>
    </svg>
  );
}
