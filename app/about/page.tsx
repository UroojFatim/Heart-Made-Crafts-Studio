import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "HeartMade Craft is a handmade gift studio in Karachi. Every box carries one piece made only for the person receiving it. Here's who makes them and how we work.",
};

export default function AboutPage() {
  return (
    <>
      <section className="shell pt-14 lg:pt-20">
        <Reveal>
          <p className="eyebrow">About</p>
          <h1 className="display-tight mt-5 max-w-[15ch] text-[clamp(2.8rem,7vw,5rem)]">
            A small studio in Karachi that makes things by hand.
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <Reveal variant="left">
            <div className="max-w-[58ch] space-y-6 text-[1.06rem] leading-relaxed text-ink-2">
              {/* ─────────────────────────────────────────────────
                  👋 ADNAN — replace the next two paragraphs with your
                  own words. Say how it started, who you make these for,
                  what you were doing before. It doesn't need to be
                  polished. First-person and specific beats well-written
                  and vague, every time — this is the page people read
                  before deciding whether to send you money.
                  ───────────────────────────────────────────────── */}
              <p className="text-ink">
                HeartMade Craft started the way most of these do: making
                something for one person, properly, because buying something
                would have said the wrong thing.
              </p>
              <p>
                Everything we make is made to order in Karachi, by hand, in
                small numbers. We are not a warehouse and we don&rsquo;t pretend
                to be one — some weeks we take eight orders and close the book.
                That constraint is the point. It&rsquo;s what lets someone sit
                and letter a card for forty minutes instead of running it
                through a printer.
              </p>
              <p>
                The gift market here is full of the same imported chocolate bars
                arranged in the same acrylic boxes. It looks lovely for a day.
                We build every box around one piece made specifically for the
                person opening it — a card in your words, a name painted by
                hand, a flower pressed from a day that already happened. That
                piece has no market price. It&rsquo;s also the only part still
                on a shelf a year later.
              </p>
            </div>
          </Reveal>

          {/* Portrait slot */}
          <Reveal variant="right" delay={100}>
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-paper-3 bg-paper-2">
                {/* ─────────────────────────────────────────────────
                    👋 ADNAN — put a real photo of yourself here.
                    Drop it in /public and swap this block for:
                      <Image src="/adnan.jpg" alt="Adnan, HeartMade Craft"
                             fill className="object-cover" />
                    A face on this page does more for conversion than
                    any other single change you can make. Faceless
                    pages read as scams in this market.
                    ───────────────────────────────────────────────── */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                    <circle cx="32" cy="24" r="11" stroke="var(--color-gold-soft)" strokeWidth="1.5" />
                    <path
                      d="M12 56c0-11 9-19 20-19s20 8 20 19"
                      stroke="var(--color-gold-soft)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="eyebrow">Photograph goes here</p>
                  <p className="max-w-[26ch] text-[0.85rem] leading-relaxed text-ink-3">
                    A picture of the person who makes the boxes.
                  </p>
                </div>
              </div>
              <figcaption className="mt-4 text-[0.82rem] leading-relaxed text-ink-3">
                Made by hand in {site.city}. Delivered across Pakistan.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── What we believe ─────────────────────────────────── */}
      <section className="mt-28 bg-paper-2/55 py-24 lg:mt-36">
        <div className="shell">
          <Reveal>
            <h2 className="display max-w-[18ch] text-[clamp(2.2rem,5vw,3.6rem)]">
              Four things we decided at the start.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px border border-paper-3 md:grid-cols-2">
            {[
              {
                n: "01",
                t: "Prices go on the website",
                b: "Every competitor makes you DM for a price. It wastes your evening and ours, and it exists to stop you comparing. Ours are printed, including the ones that are expensive.",
              },
              {
                n: "02",
                t: "We carry the risk, not you",
                b: "Cash on delivery on ready boxes. Half up front on personalised work, because that genuinely can't be resold. Never the full amount before you've seen anything.",
              },
              {
                n: "03",
                t: "No invented reviews",
                b: "Our reviews page is empty until real customers fill it, with faces and voices. A wall of quotes on a page this new would be a lie, and this market catches those.",
              },
              {
                n: "04",
                t: "We say no to fresh flowers by courier",
                b: "They arrive dead. We'll tell you that instead of taking the order, and offer preserved florals that actually last. Same for anything else we can't do well.",
              },
            ].map((v, i) => (
              <Reveal key={v.n} delay={i * 80} className="h-full">
                <article className="group h-full bg-paper p-8 outline outline-1 outline-paper-3 transition-colors duration-700 hover:bg-paper lg:p-10">
                  <span className="display text-[1.5rem] text-rose/55 transition-colors duration-700 group-hover:text-rose">
                    {v.n}
                  </span>
                  <h3 className="display mt-4 text-[1.7rem] leading-tight">{v.t}</h3>
                  <p className="mt-3.5 max-w-[48ch] leading-relaxed text-ink-2">
                    {v.b}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close ───────────────────────────────────────────── */}
      <section className="shell py-24 lg:py-32">
        <Reveal>
          <div className="mx-auto max-w-[46rem] text-center">
            <p className="italic-serif text-[clamp(1.5rem,3.4vw,2.3rem)] leading-snug text-ink">
              &ldquo;{site.promise}&rdquo;
            </p>
            <p className="eyebrow mt-6">{site.promiseEn}</p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="btn bg-ink px-7 py-4 text-[0.85rem] tracking-wide text-paper after:bg-rose"
              >
                See the boxes
              </Link>
              <a
                href={waLink("Assalam o alaikum! Aap ke bare mein parha, ek box banwana tha.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-ink/22 px-7 py-4 text-[0.85rem] tracking-wide text-ink after:bg-blush"
              >
                Say hello
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
