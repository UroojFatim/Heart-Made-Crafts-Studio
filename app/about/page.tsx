import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BrandFilm from "@/components/BrandFilm";
import Reveal from "@/components/Reveal";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "How We Make Every Gift Box by Hand | HeartMade Craft, Karachi",
  },
  description:
    "Inside a handmade gift studio in Karachi — who makes the boxes, the five steps every one goes through, the materials we use, and why we cap the week at eight orders.",
};

/**
 * ══════════════════════════════════════════════════════════════════
 *  THE PROCESS
 * ══════════════════════════════════════════════════════════════════
 *
 * `image` is optional and starts empty. A step with no photo renders
 * as a numbered card and looks finished — no broken image, no grey
 * box, nothing to apologise for while the photos are still being shot.
 *
 * To add one: drop the file in public/process/ (see the README there
 * for what to shoot and how to compress it) and put its path here.
 */
type Step = {
  n: string;
  title: string;
  body: string;
  image?: string;
  alt?: string;
};

const steps: Step[] = [
  {
    n: "01",
    title: "The box is chosen",
    body: "Not off a shelf — sized to what is going in it. A box with room to spare looks like a box that was not thought about, and one that is too tight crushes the flowers. This is also where the palette gets decided, because the ribbon and the paper have to agree with whatever is being painted later.",
  },
  {
    n: "02",
    title: "The card is lettered",
    body: "Your words, written out by hand on deckle-edge cotton paper. No font, no template, no printer. Around forty minutes for a card of a hundred and twenty words, longer if the words are difficult — and they often are, because the cards people order most are apologies and last letters.",
  },
  {
    n: "03",
    title: "The name is painted",
    body: "A wooden plaque sanded, painted, lettered and sealed, or a resin keepsake poured with a name, a date or a pressed flower set into it. This is the slowest part and the reason a personalised order needs its two or three days: paint has to dry, and resin has to cure, and neither can be hurried.",
  },
  {
    n: "04",
    title: "Everything is packed",
    body: "Contents arranged rather than dropped in — heaviest at the back, the handmade piece where the eye lands first when the lid lifts. Lights threaded through, tags tied on the things that need naming. This is the step we film, because it is the one that makes the least sense in words.",
  },
  {
    n: "05",
    title: "The seal goes on",
    body: "Ribbon tied, envelope closed, wax melted and stamped. Then the clips go to you on WhatsApp before it leaves — so the person paying has already seen the box, even though the person receiving it has not.",
  },
];

const materials = [
  {
    t: "Deckle-edge cotton paper",
    b: "For the cards. It takes ink without feathering and holds a torn edge, which is why the card feels like a letter rather than stationery.",
  },
  {
    t: "Sealing wax",
    b: "Real wax and a brass stamp, melted and pressed for each envelope. It is the part people photograph.",
  },
  {
    t: "Wood, sanded and sealed",
    b: "For name plaques. Sealed so the paint survives being handled, because these get picked up often.",
  },
  {
    t: "Resin",
    b: "Poured in small batches for keepsakes — a name, a date, or a flower set inside it. Cures slowly and cannot be rushed.",
  },
  {
    t: "Pressed flowers",
    b: "Pressed here, from flowers that were part of the occasion where we can get them. That is the one material that genuinely cannot be bought.",
  },
];

export default function AboutPage() {
  const { founder } = site;
  const hasName = founder.name.length > 0;

  return (
    <>
      {/* ── Who makes them ─────────────────────────────────────── */}
      <section className="shell pt-14 lg:pt-20">
        <Reveal>
          <p className="eyebrow">Handmade in {site.city}</p>
          <h1 className="display-tight mt-5 max-w-[15ch] text-[clamp(2.6rem,6.6vw,4.8rem)]">
            How every HeartMade box gets made
          </h1>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_0.85fr] lg:gap-20">
          <Reveal variant="left">
            <h2 className="eyebrow">Who makes them</h2>
            <div className="mt-5 max-w-[58ch] space-y-6 text-[1.06rem] leading-relaxed text-ink-2">
              <p className="text-ink">
                {hasName ? (
                  <>
                    HeartMade Craft is {founder.name} — {founder.role.toLowerCase()},
                    working from {site.city}
                    {founder.since ? `, since ${founder.since}` : ""}. Not a
                    team, not a warehouse, and not a page reselling someone
                    else&rsquo;s hampers.
                  </>
                ) : (
                  <>
                    HeartMade Craft is one person working from {site.city}. Not a
                    team, not a warehouse, and not a page reselling someone
                    else&rsquo;s hampers.
                  </>
                )}
              </p>
              <p>
                It started the way most of these do: making something for one
                person, properly, because buying something would have said the
                wrong thing. The first few were for friends. Then their friends
                asked, and at some point it stopped being a favour and started
                being a studio.
              </p>
              <p>
                Everything below is what actually happens to a box between your
                message and the rider leaving. It is written out in this much
                detail for one reason — you are being asked to send money to a
                business you have not heard of, and the least we can do is show
                you exactly what you are buying and who is making it.
              </p>
            </div>

            {/* The signature. A scan if there is one; the display face if
                not — either way it reads as a person signing off. */}
            {hasName && (
              <div className="mt-9 border-t border-paper-3 pt-7">
                {founder.signature ? (
                  // A plain <img> on purpose. next/image needs the
                  // intrinsic width and height up front, and this file
                  // is swappable from lib/site.ts — hardcoding 600×200
                  // here would squash any scan with a different ratio.
                  // With w-auto the browser reads the real ratio out of
                  // the file. A 15 kB transparent PNG shown at 64px tall
                  // has nothing left for the optimizer to do anyway.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={founder.signature}
                    alt={founder.name}
                    className="h-22 w-auto"
                  />
                ) : (
                  <p className="italic-serif text-[1.6rem] text-ink">
                    {founder.name}
                  </p>
                )}
                <p className="eyebrow mt-2.5">
                  {founder.role} · {site.city}
                </p>
              </div>
            )}
          </Reveal>

          {/* The brand film sits where a portrait would. The home page
              already has its own signature visual, and two brand moments
              on one screen makes both weaker. */}
          <Reveal variant="right" delay={100}>
            <BrandFilm />
          </Reveal>
        </div>
      </section>

      {/* ── The five steps ─────────────────────────────────────── */}
      <section className="shell mt-28">
        <Reveal>
          <div className="rule-gold" />
          <h2 className="display mt-9 max-w-[22ch] text-[clamp(1.9rem,4vw,2.8rem)]">
            What happens to a box before it leaves
          </h2>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-2">
            Five steps, and four of them are done by hand. This is where the two
            or three days go.
          </p>
        </Reveal>

        <ol className="mt-12 space-y-px">
          {steps.map((s, i) => (
            <li key={s.n}>
              <Reveal delay={i * 70}>
                <div className="grid gap-6 border-b border-paper-3 py-9 sm:grid-cols-[4rem_1fr] sm:gap-8 lg:grid-cols-[4rem_1fr_18rem] lg:gap-10">
                  <span className="display text-[1.8rem] leading-none text-rose/55">
                    {s.n}
                  </span>

                  <div>
                    <h3 className="display text-[1.55rem] leading-snug">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[54ch] leading-relaxed text-ink-2">
                      {s.body}
                    </p>
                  </div>

                  {/* Renders only once a photo exists. Until then the step
                      is a numbered entry and the row still reads as
                      complete. */}
                  {s.image && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] ring-1 ring-paper-3 lg:aspect-[4/5]">
                      <Image
                        src={s.image}
                        alt={s.alt ?? s.title}
                        fill
                        sizes="(min-width: 1024px) 18rem, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Materials ──────────────────────────────────────────── */}
      <section className="shell mt-24">
        <Reveal>
          <h2 className="display max-w-[22ch] text-[clamp(1.9rem,4vw,2.8rem)]">
            What we actually use
          </h2>
          <p className="mt-4 max-w-[54ch] leading-relaxed text-ink-2">
            The chocolates, the mithai and the flowers are bought in, the same as
            anywhere else — we have never claimed otherwise. These are the things
            the handmade half is made of.
          </p>
        </Reveal>

        <dl className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {materials.map((m, i) => (
            <Reveal key={m.t} delay={(i % 3) * 70}>
              <dt className="display text-[1.25rem]">{m.t}</dt>
              <dd className="mt-2.5 max-w-[40ch] text-[0.94rem] leading-relaxed text-ink-2">
                {m.b}
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ── Eight a week ───────────────────────────────────────── */}
      <section className="shell mt-24">
        <Reveal>
          <div className="grid gap-10 border border-dashed border-gold-soft p-8 lg:grid-cols-[auto_1fr] lg:gap-14 lg:p-12">
            <div>
              <p className="display text-[4.5rem] leading-none text-gold">8</p>
              <p className="eyebrow mt-2">orders a week, maximum</p>
            </div>
            <div className="max-w-[54ch] space-y-4 leading-relaxed text-ink-2">
              <h2 className="display text-[1.75rem] text-ink">
                Why the week is capped at eight
              </h2>
              <p>
                One person letters the cards, paints the plaques and packs the
                boxes. Forty minutes of lettering, a day for paint to dry, longer
                for resin to cure — that arithmetic only stretches so far in a
                week, and past eight orders something gets rushed.
              </p>
              <p>
                So the book closes instead. This is not a scarcity tactic; if it
                were, we would open it again the moment someone offered more
                money, and we don&rsquo;t. It means the card in your box was
                written by someone with time to write it, and that the person
                who took your order is the person who made it.
              </p>
              <p className="text-ink">
                If we are full for the week you want, we will say so and give you
                the next date, rather than take the order and disappoint you
                later.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── What we don't do ───────────────────────────────────── */}
      <section className="mt-28 bg-paper-2/55 py-24 lg:mt-32">
        <div className="shell">
          <Reveal>
            <h2 className="display max-w-[18ch] text-[clamp(2rem,4.6vw,3.2rem)]">
              And four things we don&rsquo;t do.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px border border-paper-3 md:grid-cols-2">
            {[
              {
                n: "01",
                t: "We don't resell ready-made hampers",
                b: "The imported boxed hampers you see everywhere are bought in bulk and passed on. We buy contents, yes — but the box is assembled here and the handmade piece inside it exists nowhere else.",
              },
              {
                n: "02",
                t: "We don't invent reviews",
                b: "The reviews section is empty until real customers fill it, with faces and voices. A wall of quotes on a business this new would be a lie, and this market catches those.",
              },
              {
                n: "03",
                t: "We don't send fresh flowers by courier",
                b: "They arrive dead. We say that instead of taking the order, and offer preserved florals that actually last. Same for anything else we can't do well.",
              },
            ].map((v, i) => (
              <Reveal key={v.n} delay={i * 80} className="h-full">
                <article className="group h-full bg-paper p-8 outline outline-1 outline-paper-3 lg:p-10">
                  <span className="display text-[1.5rem] text-rose/55 transition-colors duration-700 group-hover:text-rose">
                    {v.n}
                  </span>
                  <h3 className="display mt-4 text-[1.7rem] leading-tight">
                    {v.t}
                  </h3>
                  <p className="mt-3.5 max-w-[48ch] leading-relaxed text-ink-2">
                    {v.b}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close ──────────────────────────────────────────────── */}
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
                href={waLink(
                  "Assalam o alaikum! Aap ke bare mein parha, ek box banwana tha.",
                )}
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

      {/*
        Person + Organization, so the maker is an entity Google can
        attach experience to rather than an anonymous shop. Only emitted
        once there is a name to emit — an empty `name` would be worse
        than no markup. `founder` points at the same business declared
        in app/layout.tsx.
      */}
      {hasName && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              url: `${site.url}/about`,
              mainEntity: {
                "@type": "Person",
                name: founder.name,
                jobTitle: founder.role,
                worksFor: { "@id": `${site.url}/#business` },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: site.city,
                  addressCountry: "PK",
                },
                sameAs: [`https://instagram.com/${site.instagram}`],
                knowsAbout: [
                  "Handmade gift boxes",
                  "Calligraphy",
                  "Hand-painted keepsakes",
                  "Resin keepsakes",
                  "Pressed flowers",
                ],
              },
            }),
          }}
        />
      )}
    </>
  );
}
