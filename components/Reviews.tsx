import Reveal from "./Reveal";

/**
 * ── REAL REVIEWS ONLY ────────────────────────────────────────────
 *
 * This array is deliberately empty. Nothing here is invented, and
 * nothing should be: a fabricated testimonial is the single fastest
 * way to lose this market — buyers in this niche actively screenshot
 * and call out fake proof, and the whole positioning rests on being
 * the brand that can be trusted with an advance payment.
 *
 * When a real customer sends a review, add it below and the section
 * switches from the honest empty state to the wall automatically:
 *
 *   { name: "Ayesha", city: "Karachi", occasion: "Sister's birthday",
 *     quote: "…", verified: "Video review on Instagram" }
 */
type Review = {
  name: string;
  city: string;
  occasion: string;
  quote: string;
  verified: string;
};

const reviews: Review[] = [];

export default function Reviews() {
  if (reviews.length === 0) return <EmptyState />;

  return (
    <section className="shell py-28">
      <Reveal>
        <p className="eyebrow">In their words</p>
        <h2 className="display mt-5 max-w-[18ch] text-[clamp(2.2rem,5vw,3.6rem)]">
          What people said after the lid came off.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <Reveal key={r.name + i} delay={i * 90}>
            <figure className="surface flex h-full flex-col p-7">
              <blockquote className="italic-serif flex-1 text-[1.15rem] leading-relaxed text-ink-2">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <div className="rule-gold my-6" />
              <figcaption>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="mt-1 text-[0.78rem] text-ink-3">
                  {r.occasion} · {r.city}
                </p>
                <p className="eyebrow mt-3 text-rose">{r.verified}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/**
 * The honest empty state.
 *
 * A brand-new page with a wall of glowing quotes reads as fake. A brand
 * -new page that says so, and then explains exactly how it protects the
 * buyer instead, reads as credible. This section is doing more work for
 * conversion than invented reviews ever would.
 */
function EmptyState() {
  const guarantees = [
    {
      n: "01",
      title: "Cash on delivery",
      body: "On ready boxes, you pay when it's in your hands. Most pages in this market demand full payment up front. We don't need to.",
    },
    {
      n: "02",
      title: "You watch it being made",
      body: "Every order gets clips on WhatsApp while it's being built. You see the card being written and the box being packed before it leaves.",
    },
    {
      n: "03",
      title: "Half up front on custom work",
      body: "Personalised pieces can't be resold, so custom orders take 50% to start and 50% on delivery. Never the full amount before you've seen anything.",
    },
    {
      n: "04",
      title: "A real person, a real address",
      body: "Karachi-based, with a name on the site and work you can watch being made. If something is wrong, there is someone to answer for it.",
    },
  ];

  return (
    <section className="relative py-28">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal variant="left" className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">Trust</p>
            <h2 className="display mt-5 text-[clamp(2.2rem,5vw,3.5rem)]">
              Why trust a{" "}
              <em className="italic-serif not-italic text-rose">
                new gift box brand
              </em>
            </h2>
            <p className="mt-7 max-w-[42ch] leading-relaxed text-ink-2">
              This page could be full of testimonials. Anyone can write those,
              which is exactly why they aren&rsquo;t worth anything. Real ones
              go up the moment real customers send them — with their faces and
              their voices, not screenshots.
            </p>
            <p className="mt-5 max-w-[42ch] leading-relaxed text-ink-2">
              Until then, the risk is ours to carry, not yours.
            </p>
          </Reveal>

          <ol className="space-y-px">
            {guarantees.map((g, i) => (
              <li key={g.n}>
                <Reveal delay={i * 80}>
                  <div className="group grid grid-cols-[3.2rem_1fr] gap-5 border-b border-paper-3 py-8 transition-colors duration-700 hover:bg-paper-2/50">
                    <span className="display text-[1.6rem] text-rose/55 transition-colors duration-700 group-hover:text-rose">
                      {g.n}
                    </span>
                    <div>
                      <h3 className="display text-[1.6rem]">{g.title}</h3>
                      <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-2">
                        {g.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
