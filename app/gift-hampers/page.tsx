import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { catalogueProducts } from "@/lib/products";
import { boxRange, hamperRange } from "@/lib/pricing";
import { ogDefaults, site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute:
      "Gift Hampers & Baskets in Pakistan | Handmade Hampers from Karachi",
  },
  description:
    "Handmade gift hampers and gift baskets, made to order in Karachi. Chocolate, snack, fruit and new-baby hampers with a hand-made piece in every one. COD, delivery across Pakistan.",
  openGraph: {
    ...ogDefaults,
    title: "Gift Hampers & Baskets in Pakistan | Handmade Hampers from Karachi",
    description:
      "Handmade gift hampers and gift baskets, made to order in Karachi. Chocolate, snack, fruit and new-baby hampers with a hand-made piece in every one. COD, delivery across Pakistan.",
  },
};

/**
 * The hamper types we build.
 *
 * Written the way the business actually works: the contents are bought
 * in — chocolates, mithai, fruit, snacks — and the handmade piece is
 * ours. Saying that plainly is the whole positioning, so no section
 * here pretends we manufacture the food.
 *
 * This is a content page on purpose. The catalogue has two products
 * tagged `hamper`, so six product grids would read as six empty
 * shelves; six honest paragraphs read as a studio that knows its work.
 * When there are enough hamper products, each of these can grow a grid.
 */
const hamperTypes = [
  {
    id: "chocolate",
    title: "Chocolate hampers",
    body: "The one people order when they can't decide, and the one that never disappoints. Imported bars and filled chocolates arranged as an arrangement rather than a pile — layered, wrapped, and tied so the first thing you see when the lid lifts is a shape, not a heap. We buy the chocolate; what we make is the hand-lettered card that sits on top of it and the wrapping that holds the whole thing together. Size it small enough for a colleague or large enough for a family sitting down together after dinner.",
  },
  {
    id: "snacks",
    title: "Snack and munchies hampers",
    body: "For hostel rooms, night shifts, exam weeks and the friend who genuinely just wants crisps. Savoury and sweet together, a drink or two, and something warm at the bottom of the basket. These are the least formal thing we make and the most reliably enjoyed — nobody has ever put one aside for later. Tell us what they actually eat and we'll build around it; tell us nothing and we'll build the version that has never yet come back with a complaint.",
  },
  {
    id: "fruit",
    title: "Fruit and dry fruit hampers",
    body: "Dry fruit — almonds, pistachios, dates, apricots — travels anywhere in Pakistan and keeps for months, which makes it the safest hamper to send to another city. Fresh fruit is Karachi only, by our own rider, because a courier will not treat it kindly and we would rather say so than have it arrive bruised. Both come arranged in a lined basket or a sectioned tray, with the pieces set by hand rather than tipped in.",
  },
  {
    id: "mithai",
    title: "Mithai hampers",
    body: "Barfi, gulab jamun, ladoo — sourced fresh from Karachi halwais on the morning of delivery, not bought ahead and stored. Arranged in a tray or a lined box with hand-lettered tags naming what's what, which matters more than it sounds when a box goes to a family who will open it together. These suit Eid, mehndi, a new job, and every occasion where sending something sweet is the point. Karachi and nearby only, for the obvious reason.",
  },
  {
    id: "new-baby",
    title: "New baby hampers",
    body: "Half for the baby, half for the mother, which is the half most baby baskets forget. A hand-painted name plaque or a resin keepsake with the birth date, something soft, something practical, and something for her — good tea, a candle, chocolate she doesn't have to share. If there's an older sibling quietly furious about all this, tell us and we'll put a small parcel in for them too. See the full ",
    link: { href: "/occasions/new-baby", label: "new baby occasion" },
  },
  {
    id: "corporate",
    title: "Corporate hampers",
    // There is no /corporate-gifting page yet, so this points at the
    // builder, which does take a bulk brief. Repoint it when that page
    // exists.
    body: "Eid sets for a whole office, client gifts, joining kits, year-end thank-yous. Coordinated so twenty boxes read as one decision rather than twenty separate purchases, with the option of a hand-lettered card per recipient — which is what stops a corporate hamper feeling like a line item. Bulk work needs more notice than a single box, so book early. Send the headcount and budget per head through the ",
    link: { href: "/build-your-box", label: "box builder" },
  },
];

const comparison = [
  {
    label: "Size",
    box: "18 × 13 cm up to 40 × 30 cm",
    hamper: "Large basket or tray, often two tiers",
  },
  {
    label: "Roughly",
    box: boxRange,
    hamper: hamperRange,
  },
  {
    label: "Best for",
    box: "One person — a birthday, an apology, an anniversary",
    hamper: "A household or a team — Eid, a new baby, an office",
  },
  {
    label: "How many people",
    box: "One, sometimes two",
    hamper: "Four and up",
  },
  {
    label: "Handmade piece",
    box: "One, and it's the centre of the box",
    hamper: "One, plus hand-lettered tags across the contents",
  },
];

export default function GiftHampersPage() {
  // Two today. As more get tagged `hamper` in lib/products.ts they
  // appear here automatically — nothing below needs touching.
  const hampers = catalogueProducts().filter((p) => p.tags.includes("hamper"));

  return (
    <>
      {/* ── Intro ──────────────────────────────────────────────── */}
      <section className="shell pt-14 lg:pt-20">
        <Reveal>
          <p className="eyebrow">Handmade in {site.city} · Delivered nationwide</p>
          <h1 className="display-tight mt-5 max-w-[16ch] text-[clamp(2.6rem,6.4vw,4.6rem)]">
            Gift hampers and baskets, packed by hand
          </h1>
        </Reveal>

        <Reveal delay={70}>
          <div className="mt-8 max-w-[58ch] space-y-4 text-[1.02rem] leading-relaxed text-ink-2">
            <p>
              Gift basket aur gift box mein farq sirf shakl ka nahi hota. Hamper
              bara hota hai, zyada cheezein hoti hain, aur aksar poore ghar ke
              liye jata hai — Eid pe, naye baby ke aane pe, ya jab kisi ko
              shukriya kehna ho.
            </p>
            <p>
              Hum hampers bhi usi tarah banate hain jaise boxes: order milne pe,
              aapke budget pe, aur andar kam az kam ek handmade cheez ke saath.
              Baqi aap choose karti hain — chocolates, dry fruit, snacks, mithai,
              candle, mug.
            </p>
            <p>
              Ready hampers pe cash on delivery hai. Custom hampers pe aadha
              advance.
            </p>
          </div>
        </Reveal>

        {/* The line that separates us from a reseller. Say it early. */}
        <Reveal delay={120}>
          <p className="mt-8 max-w-[54ch] border-l-2 border-rose py-1 pl-6 text-[0.95rem] leading-relaxed text-ink-2">
            To be clear about what we do and don&rsquo;t make: the chocolates,
            the mithai, the fruit and the snacks are sourced, the same as
            anywhere else. The card in your handwriting, the painted name, the
            arrangement itself — those are ours, and they are the reason the
            basket gets remembered rather than eaten and forgotten.
          </p>
        </Reveal>
      </section>

      {/* ── The types ──────────────────────────────────────────── */}
      <section className="shell mt-20">
        <Reveal>
          <div className="rule-gold" />
          <h2 className="display mt-9 max-w-[22ch] text-[clamp(1.9rem,4vw,2.8rem)]">
            The hampers we make most often
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-x-12 gap-y-11 lg:grid-cols-2">
          {hamperTypes.map((t, i) => (
            <Reveal key={t.id} delay={(i % 2) * 70}>
              <article>
                <h3 className="display text-[1.5rem]">{t.title}</h3>
                <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-2">
                  {t.body}
                  {t.link && (
                    <Link href={t.link.href} className="link-wipe text-ink">
                      {t.link.label}
                    </Link>
                  )}
                  {t.link && "."}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Hamper or box ──────────────────────────────────────── */}
      <section className="shell mt-24">
        <Reveal>
          <h2 className="display max-w-[22ch] text-[clamp(1.9rem,4vw,2.8rem)]">
            Gift hamper ya gift box — kaunsa lein?
          </h2>
          <p className="mt-4 max-w-[54ch] leading-relaxed text-ink-2">
            Seedha sa usool: box ek insaan ke liye hota hai, hamper poore ghar
            ya team ke liye. Agar aap ek shakhs ko kuch bhejna chahti hain jo wo
            sambhaal ke rakhe, box lein. Agar cheez khulni hai sab ke saamne aur
            baant ke khaayi jaani hai, hamper lein.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-9 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">
                Gift box compared with gift hamper — size, price, occasion and
                number of recipients
              </caption>
              <thead>
                <tr className="border-b border-ink/15">
                  <th scope="col" className="eyebrow py-3 pr-6 font-normal" />
                  <th scope="col" className="eyebrow py-3 pr-6 font-normal">
                    Gift box
                  </th>
                  <th scope="col" className="eyebrow py-3 font-normal">
                    Gift hamper
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-paper-3">
                    <th
                      scope="row"
                      className="eyebrow whitespace-nowrap py-5 pr-6 text-left font-normal text-ink-3"
                    >
                      {row.label}
                    </th>
                    <td className="py-5 pr-6 text-[0.92rem] leading-relaxed text-ink-2">
                      {row.box}
                    </td>
                    <td className="py-5 text-[0.92rem] leading-relaxed text-ink-2">
                      {row.hamper}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 max-w-[54ch] text-[0.86rem] leading-relaxed text-ink-3">
            Still undecided? Send the budget and who it&rsquo;s for and
            we&rsquo;ll tell you honestly which one your money goes further on.
            The{" "}
            <Link href="/shop" className="link-wipe text-ink">
              gift boxes
            </Link>{" "}
            are here, and the{" "}
            <Link href="/build-your-box" className="link-wipe text-ink">
              builder
            </Link>{" "}
            works for either.
          </p>
        </Reveal>
      </section>

      {/* ── Hamper products, if any are tagged ─────────────────── */}
      {hampers.length > 0 && (
        <section className="shell mt-24">
          <Reveal>
            <p className="eyebrow">Ready to order</p>
            <h2 className="display mt-5 max-w-[20ch] text-[clamp(1.9rem,4vw,2.8rem)]">
              Hampers you can start from
            </h2>
            <p className="mt-3 max-w-[48ch] leading-relaxed text-ink-2">
              Starting points, not a fixed menu — every one is adjusted to your
              brief.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {hampers.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70} className="h-full">
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="shell mt-24">
        <Reveal>
          <div className="flex flex-col items-start gap-6 border border-dashed border-gold-soft bg-paper-2/60 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
            <div>
              <h2 className="display text-[1.75rem]">
                Tell us the headcount and the budget.
              </h2>
              <p className="mt-2.5 max-w-[50ch] leading-relaxed text-ink-2">
                Eid sets, office gifting, a basket for one family — same
                message, same answer within the hour. Or use the{" "}
                <Link href="/build-your-box" className="link-wipe text-ink">
                  builder
                </Link>{" "}
                and send the whole brief at once.
              </p>
            </div>
            <a
              href={waLink(
                `Assalam o alaikum! ${site.name} se hamper banwana tha.\n\nKis ke liye: \nKitne hampers: \nBudget per hamper: \nKab chahiye: \nDelivery city: `,
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

      {/* ── Related ────────────────────────────────────────────── */}
      <section className="shell mt-20">
        <Reveal>
          <p className="eyebrow">Where to next</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              ["/shop", "All gift boxes"],
              ["/occasions/eid", "Eid gifts"],
              ["/occasions/new-baby", "New baby gifts"],
              ["/build-your-box", "Build your own"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="border border-paper-3 px-5 py-3 text-[0.9rem] text-ink-2 transition-colors duration-500 hover:border-rose hover:text-ink"
              >
                {label}
              </Link>
            ))}
          </div>
        </Reveal>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Gift Hampers & Baskets in Pakistan",
            description:
              "Handmade gift hampers and gift baskets — chocolate, snack, fruit, mithai, new baby and corporate — made to order in Karachi and delivered across Pakistan.",
            url: `${site.url}/gift-hampers`,
            isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
            about: hamperTypes.map((t) => ({ "@type": "Thing", name: t.title })),
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: hampers.length,
              itemListElement: hampers.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.name,
                url: `${site.url}/product/${p.slug}`,
              })),
            },
          }),
        }}
      />
    </>
  );
}
