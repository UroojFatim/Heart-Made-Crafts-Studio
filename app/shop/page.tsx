import type { Metadata } from "next";
import Link from "next/link";
import FilteredGrid from "@/components/FilteredGrid";
import Reveal from "@/components/Reveal";
import { occasions, shopFilters } from "@/lib/occasions";
import { catalogueProducts } from "@/lib/products";
import { priceBands } from "@/lib/pricing";
import { ogDefaults, site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  // `absolute` because the layout template would otherwise append
  // "· HeartMade Craft" to a title that already names the brand.
  title: {
    absolute:
      "Gift Boxes in Pakistan | Handmade & Personalised Gift Boxes Online",
  },
  description:
    "Handmade gift boxes for birthdays, anniversaries, nikah and Eid. Every box made to order in Karachi with one hand-made piece inside. From Rs 900, COD, nationwide delivery.",
  // Without this the page inherited the home page's og:title, so every
  // share of /shop was captioned as the home page. Twitter's tags fall
  // back to these, so there is no separate `twitter` block to keep.
  openGraph: {
    ...ogDefaults,
    title: "Gift Boxes in Pakistan | Handmade & Personalised Gift Boxes Online",
    description:
      "Handmade gift boxes for birthdays, anniversaries, nikah and Eid. Every box made to order in Karachi with one hand-made piece inside. From Rs 900, COD, nationwide delivery.",
  },
};

export default function ShopPage() {
  // The catalogue, minus anything marked `homeOnly`. Read once so the
  // grid and the ItemList schema can never disagree about what is
  // actually on the page.
  const listed = catalogueProducts();

  return (
    <>
      {/* ── Intro ──────────────────────────────────────────────── */}
      <section className="shell pt-14 lg:pt-20">
        <Reveal>
          <p className="eyebrow">Handmade in {site.city} · Delivered nationwide</p>
          <h1 className="display-tight mt-5 max-w-[15ch] text-[clamp(2.6rem,6.4vw,4.6rem)]">
            Gift boxes, made by hand in Karachi
          </h1>
        </Reveal>

        <Reveal delay={70}>
          <div className="mt-8 max-w-[58ch] space-y-4 text-[1.02rem] leading-relaxed text-ink-2">
            <p>
              Har gift box yahan order milne ke baad banta hai — pehle se packed
              shelf pe nahi para hota. Aap bataty hain kis ke liye hai, kis
              occasion pe, aur kitna kharch karna hai; hum us brief pe box banate
              hain aur andar kam az kam ek cheez haath se banate hain.
            </p>
            <p>
              Wo ek cheez — aapke alfaz mein likha calligraphy card, unke naam ka
              hand-painted plaque, ya ek resin keepsake — hi wajah hai ke box
              saal bhar baad bhi unke paas hota hai. Chocolates khatam ho jate
              hain.
            </p>
            <p>
              Neeche ready-to-order boxes hain. Koi theek na lage to{" "}
              <Link href="/build-your-box" className="link-wipe text-ink">
                Build Your Box
              </Link>{" "}
              se apna bana lein, ya{" "}
              <a
                href={waLink(
                  "Assalam o alaikum! Gift box banwana tha.\n\nKis ke liye: \nOccasion: \nBudget: ",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="link-wipe text-ink"
              >
                WhatsApp
              </a>{" "}
              pe budget bhej dein.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Browse by occasion ─────────────────────────────────────
          Real links, not filters — each of these is a page Google can
          rank on its own. The recipient and type cuts are filters on
          the grid below instead; they have no pages yet. */}
      <section className="shell mt-12">
        <Reveal>
          <h2 className="eyebrow">Browse by occasion</h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {occasions.map((o) => (
              <Link
                key={o.slug}
                href={`/occasions/${o.slug}`}
                className="group flex items-center gap-2.5 border border-paper-3 px-4 py-2.5 text-[0.88rem] text-ink-2 transition-colors duration-500 hover:border-rose hover:text-ink"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: o.palette.ribbon }}
                  aria-hidden="true"
                />
                {o.name}
              </Link>
            ))}
          </div>
        </Reveal>

        <Reveal delay={50}>
          <p className="mt-6 text-[0.92rem] leading-relaxed text-ink-2">
            Sending to a whole family or an office?{" "}
            <Link href="/gift-hampers" className="link-wipe text-ink">
              Gift hampers and baskets
            </Link>{" "}
            are bigger and built to be shared.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="rule-gold mt-10" />
        </Reveal>
      </section>

      {/* ── The grid ───────────────────────────────────────────────
          Every product, not just the featured ones — this is the page
          people land on from "gift boxes pakistan", so it should be the
          whole catalogue. */}
      <section className="shell mt-12">
        <FilteredGrid products={listed} filters={shopFilters} />
      </section>

      {/* ── What's inside ──────────────────────────────────────── */}
      <section className="shell mt-28">
        <Reveal>
          <h2 className="display max-w-[20ch] text-[clamp(1.9rem,4vw,2.8rem)]">
            What&rsquo;s inside a HeartMade gift box
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-3 lg:gap-10">
          <Reveal delay={60}>
            <h3 className="display text-[1.4rem]">The handmade piece</h3>
            <p className="mt-3 max-w-[42ch] leading-relaxed text-ink-2">
              Every box has at least one, and it is the only part that
              can&rsquo;t be bought anywhere else. A calligraphy card in your
              words, a wooden name plaque painted by hand, a resin keepsake with
              a date set into it, or a scrapbook spread illustrated from photos
              you send. This is the piece that is still on a shelf a year later.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="display text-[1.4rem]">What you choose to fill it with</h3>
            <p className="mt-3 max-w-[42ch] leading-relaxed text-ink-2">
              Chocolates, a scented candle, a personalised mug, jewellery, attar,
              skincare, dates and dry fruit, preserved florals, warm lights. Fresh
              flowers where we deliver by rider in Karachi — not by courier, because
              they don&rsquo;t survive it. You pick as many as you like and we balance
              the arrangement.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <h3 className="display text-[1.4rem]">How it arrives</h3>
            <p className="mt-3 max-w-[42ch] leading-relaxed text-ink-2">
              Packed in a rigid box, ribbon-tied and wax-sealed, with hand-lettered
              tags on the pieces that need them. You get clips on WhatsApp while
              it&rsquo;s being built — the card being written, the lid going on — so
              nothing about the box is a surprise to you, only to them.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Prices ─────────────────────────────────────────────────
          Bands, not a price list. Numbers come from lib/pricing.ts so
          this table, the FAQ answers and the LocalBusiness schema can
          never disagree. */}
      <section className="shell mt-28">
        <Reveal>
          <h2 className="display max-w-[20ch] text-[clamp(1.9rem,4vw,2.8rem)]">
            Gift box prices in Pakistan
          </h2>
          <p className="mt-4 max-w-[54ch] leading-relaxed text-ink-2">
            Made-to-order work can&rsquo;t carry a fixed price tag — the same box
            at two budgets is two different boxes. But you deserve to know
            whether we&rsquo;re in your range before you message. These are the
            bands we actually work in.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-9 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">
                HeartMade Craft gift box price bands in Pakistani rupees
              </caption>
              <thead>
                <tr className="border-b border-ink/15">
                  <th scope="col" className="eyebrow py-3 pr-6 font-normal">
                    Roughly
                  </th>
                  <th scope="col" className="eyebrow py-3 pr-6 font-normal">
                    What it is
                  </th>
                  <th scope="col" className="eyebrow py-3 font-normal">
                    What that buys
                  </th>
                </tr>
              </thead>
              <tbody>
                {priceBands.map((band) => (
                  <tr key={band.range} className="border-b border-paper-3">
                    <td className="display whitespace-nowrap py-5 pr-6 text-[1.25rem] text-rose-deep">
                      {band.range}
                    </td>
                    <td className="py-5 pr-6 text-[0.95rem] text-ink">
                      {band.label}
                    </td>
                    <td className="py-5 text-[0.9rem] leading-relaxed text-ink-2">
                      {band.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 max-w-[54ch] text-[0.86rem] leading-relaxed text-ink-3">
            Delivery is Rs 350 in Karachi and Rs 500 nationwide for most boxes,
            and we tell you the figure before you commit to anything. Rush work
            inside 24 hours is 30% more, because it pushes other orders back.
            Nothing is owed until you&rsquo;ve seen options and agreed a price.{" "}
            <Link href="/gift-delivery/karachi" className="link-wipe text-ink">
              Same-day delivery in Karachi
            </Link>{" "}
            has its own page, with the cut-off time and the areas we cover.
          </p>
        </Reveal>
      </section>

      {/* ── How to order ───────────────────────────────────────── */}
      <section className="shell mt-28">
        <Reveal>
          <h2 className="display max-w-[20ch] text-[clamp(1.9rem,4vw,2.8rem)]">
            How to order
          </h2>
        </Reveal>

        <ol className="mt-9 grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "01",
              "Send the brief",
              "Who it's for, the occasion, and a budget. Two lines is enough.",
            ],
            [
              "02",
              "We come back with options",
              "Two or three directions and an honest figure, usually the same day.",
            ],
            [
              "03",
              "We make it",
              "Clips on WhatsApp as it comes together, so you see it before they do.",
            ],
            [
              "04",
              "It arrives",
              "Karachi same or next day. Rest of Pakistan 2–4 days by courier.",
            ],
          ].map(([n, title, body], i) => (
            <Reveal key={n} delay={i * 70} className="h-full">
              <li className="h-full bg-paper-2/50 p-6 outline outline-1 outline-paper-3">
                <span className="display text-[1.5rem] text-rose/60">{n}</span>
                <h3 className="display mt-3 text-[1.2rem] leading-snug">
                  {title}
                </h3>
                <p className="mt-2.5 text-[0.88rem] leading-relaxed text-ink-2">
                  {body}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={160}>
          <div className="mt-10 flex flex-col items-start gap-6 border-t border-paper-3 pt-9 sm:flex-row sm:items-center sm:justify-between">
            <p className="italic-serif max-w-[42ch] text-[1.15rem] text-ink-2">
              Most orders start with one message and a budget. Ours is on
              Instagram too — @{site.instagram}.
            </p>
            <a
              href={waLink(
                `Assalam o alaikum! ${site.name} se gift box banwana tha.\n\nKis ke liye: \nOccasion: \nBudget: \nKab chahiye: \nDelivery city: `,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn shrink-0 bg-ink px-7 py-4 text-[0.85rem] tracking-wide text-paper after:bg-rose"
            >
              Send that message
            </a>
          </div>
        </Reveal>
      </section>

      {/*
        CollectionPage + ItemList.

        Deliberately NOT Product schema: that needs a real image and a
        real price per item, and the catalogue currently has neither
        (mp4 clips, and no per-product price field). Invalid Product
        markup earns Search Console errors, not rich results. Add it
        once the photography is shot.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Gift Boxes in Pakistan",
            description:
              "Handmade gift boxes and hampers, made to order in Karachi and delivered across Pakistan.",
            url: `${site.url}/shop`,
            isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
            // Only when there is something to list. An ItemList
            // declaring zero items is a worse signal than no ItemList
            // at all — it tells Google the page is empty rather than
            // letting the page's own copy speak for it.
            ...(listed.length > 0 && {
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: listed.length,
                itemListElement: listed.map((p, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: p.name,
                  url: `${site.url}/product/${p.slug}`,
                })),
              },
            }),
          }),
        }}
      />
    </>
  );
}
