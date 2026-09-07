import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Accordion from "@/components/Accordion";
import Reveal from "@/components/Reveal";
import { cities, getCity } from "@/lib/delivery";
import { ogDefaults, site, waLink } from "@/lib/site";

type Params = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city } = await params;
  const c = getCity(city);
  if (!c) return { title: "Not found" };

  return {
    title: { absolute: c.title },
    description: c.description,
    openGraph: { ...ogDefaults, title: c.title, description: c.description },
  };
}

export default async function DeliveryCityPage({ params }: Params) {
  const { city } = await params;
  const c = getCity(city);
  if (!c) notFound();

  return (
    <>
      {/* ── Intro ──────────────────────────────────────────────── */}
      <section className="shell pt-14 lg:pt-20">
        <Reveal>
          <nav aria-label="Breadcrumb" className="eyebrow flex items-center gap-2.5">
            <Link href="/shop" className="link-wipe">
              Gift boxes
            </Link>
            <span aria-hidden="true">·</span>
            <span className="text-ink-2">Delivery in {c.name}</span>
          </nav>

          <h1 className="display-tight mt-6 max-w-[17ch] text-[clamp(2.5rem,6.2vw,4.4rem)]">
            {c.h1}
          </h1>
        </Reveal>

        <Reveal delay={70}>
          <div className="mt-8 max-w-[58ch] space-y-4 text-[1.02rem] leading-relaxed text-ink-2">
            {c.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── How long it takes ──────────────────────────────────── */}
      <section className="shell mt-20">
        <Reveal>
          <div className="rule-gold" />
          <h2 className="display mt-9 max-w-[22ch] text-[clamp(1.9rem,4vw,2.8rem)]">
            {c.name} mein delivery kitni der leti hai
          </h2>
        </Reveal>

        <Reveal delay={70}>
          <div className="mt-9 overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-left">
              <caption className="sr-only">
                Delivery times in {c.name} by order type
              </caption>
              <thead>
                <tr className="border-b border-ink/15">
                  <th scope="col" className="eyebrow py-3 pr-6 font-normal">
                    What you ordered
                  </th>
                  <th scope="col" className="eyebrow py-3 pr-6 font-normal">
                    How long
                  </th>
                  <th scope="col" className="eyebrow py-3 font-normal">
                    Why
                  </th>
                </tr>
              </thead>
              <tbody>
                {c.speed.map((row) => (
                  <tr key={row.label} className="border-b border-paper-3">
                    <th
                      scope="row"
                      className="py-5 pr-6 text-left text-[0.95rem] font-normal text-ink"
                    >
                      {row.label}
                    </th>
                    <td className="display whitespace-nowrap py-5 pr-6 text-[1.15rem] text-rose-deep">
                      {row.time}
                    </td>
                    <td className="py-5 text-[0.9rem] leading-relaxed text-ink-2">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {c.cutOff && (
          <Reveal delay={110}>
            <div className="mt-9 border-l-2 border-rose bg-paper-2/60 py-6 pl-7 pr-6">
              <p className="display text-[1.35rem]">
                Same-day cut-off: {c.cutOff}
              </p>
              <p className="mt-3 max-w-[56ch] leading-relaxed text-ink-2">
                {c.cutOffCaveat}
              </p>
            </div>
          </Reveal>
        )}
      </section>

      {/* ── Areas ──────────────────────────────────────────────── */}
      <section className="shell mt-24">
        <Reveal>
          <h2 className="display max-w-[22ch] text-[clamp(1.9rem,4vw,2.8rem)]">
            Kin ilaqon mein deliver karte hain
          </h2>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-ink-2">
            Hamara apna rider jata hai, courier nahi — is liye {c.name} ke andar
            taqreeban har jagah pohanch jaate hain. Ye wo ilaqe hain jahan sab se
            zyada jate hain:
          </p>
        </Reveal>

        <Reveal delay={70}>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {c.areas.map((area) => (
              <li
                key={area}
                className="border border-paper-3 px-4 py-2.5 text-[0.9rem] text-ink-2"
              >
                {area}
              </li>
            ))}
          </ul>
        </Reveal>

        {c.areasArePartial && (
          <Reveal delay={110}>
            <p className="mt-7 max-w-[52ch] leading-relaxed text-ink-2">
              Aapka ilaqa is list mein nahi?{" "}
              <a
                href={waLink(
                  `Assalam o alaikum! Kya aap ${c.name} mein mere ilaqe tak deliver karte hain?\n\nIlaqa: `,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="link-wipe text-ink"
              >
                Ilaqa bhej dein
              </a>{" "}
              — aur hum foran bata denge. {c.name} ke bahar delivery courier se
              hoti hai, 2–4 din mein.
            </p>
          </Reveal>
        )}
      </section>

      {/* ── Charges ────────────────────────────────────────────── */}
      <section className="shell mt-24">
        <Reveal>
          <h2 className="display max-w-[22ch] text-[clamp(1.9rem,4vw,2.8rem)]">
            Delivery charges
          </h2>
        </Reveal>

        <Reveal delay={70}>
          <div className="mt-8 flex flex-col gap-6 border border-dashed border-gold-soft p-8 sm:flex-row sm:items-center sm:gap-10 lg:p-10">
            <div>
              <p className="eyebrow">Anywhere in {c.name}</p>
              <p className="display mt-2 text-[2.4rem] leading-none text-rose-deep">
                {c.charge}
              </p>
            </div>
            <p className="max-w-[42ch] leading-relaxed text-ink-2">
              {c.chargeNote}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── Payment ────────────────────────────────────────────── */}
      <section className="shell mt-24">
        <Reveal>
          <h2 className="display max-w-[22ch] text-[clamp(1.9rem,4vw,2.8rem)]">
            Cash on delivery
          </h2>
        </Reveal>

        <div className="mt-6 max-w-[58ch] space-y-4 leading-relaxed text-ink-2">
          {c.paymentNote.map((p, i) => (
            <Reveal key={p.slice(0, 24)} delay={70 + i * 60}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── How to order ───────────────────────────────────────── */}
      <section className="shell mt-24">
        <Reveal>
          <h2 className="display max-w-[24ch] text-[clamp(1.9rem,4vw,2.8rem)]">
            Same-day gift box kaise order karein
          </h2>
        </Reveal>

        <ol className="mt-9 grid gap-px sm:grid-cols-3">
          {[
            [
              "01",
              "Message before " + (c.cutOff ?? "midday"),
              "Kis ke liye, kaunsa occasion, budget, aur delivery ka ilaqa. Do lines kaafi hain.",
            ],
            [
              "02",
              "Options aur price",
              "Do-teen options aur seedha figure, aksar usi ghante mein. Yahan tak kuch dena nahi parta.",
            ],
            [
              "03",
              "Confirm karein",
              "Ready box usi din nikal jata hai. Rider pohanchne se pehle aapko clips mil jaati hain.",
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
              Aaj hi chahiye? Abhi message kar dein — hum foran bata denge ke
              mumkin hai ya nahi.
            </p>
            <a
              href={waLink(
                `Assalam o alaikum! ${c.name} mein aaj delivery chahiye thi.\n\nKis ke liye: \nOccasion: \nBudget: \nIlaqa: `,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn shrink-0 bg-ink px-7 py-4 text-[0.85rem] tracking-wide text-paper after:bg-rose"
            >
              Order on WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── FAQs ───────────────────────────────────────────────── */}
      <section className="shell mt-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal variant="left" className="lg:sticky lg:top-32 lg:self-start">
            <p className="eyebrow">Delivery questions</p>
            <h2 className="display mt-5 max-w-[14ch] text-[clamp(1.9rem,4vw,2.8rem)]">
              {c.name} delivery FAQs
            </h2>
            <p className="mt-5 max-w-[38ch] leading-relaxed text-ink-2">
              Payment, refunds and lead times in full are on the{" "}
              <Link href="/faq" className="link-wipe text-ink">
                FAQ page
              </Link>
              .
            </p>
          </Reveal>

          <Reveal variant="right" delay={80}>
            <Accordion items={c.faqs} />
          </Reveal>
        </div>
      </section>

      {/* ── Related ────────────────────────────────────────────── */}
      <section className="shell mt-20">
        <Reveal>
          <p className="eyebrow">Where to next</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              ["/shop", "All gift boxes"],
              ["/gift-hampers", "Gift hampers"],
              ["/build-your-box", "Build your own"],
              ["/faq", "Payment and refunds"],
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

      {/*
        A Service node rather than a second LocalBusiness: the business
        itself is declared once, site-wide, in app/layout.tsx. This
        points at that same @id and adds what is specific to this city —
        the areas served and the delivery offer — so Google reads one
        business with a service, not two competing businesses.
      */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: `Gift box delivery in ${c.name}`,
              serviceType: "Gift delivery",
              description: c.description,
              provider: { "@id": `${site.url}/#business` },
              areaServed: [
                { "@type": "City", name: c.name },
                ...c.areas.map((a) => ({
                  "@type": "Place",
                  name: `${a}, ${c.name}`,
                })),
              ],
              offers: {
                "@type": "Offer",
                name: `Delivery within ${c.name}`,
                price: c.charge.replace(/[^\d]/g, ""),
                priceCurrency: "PKR",
                availableDeliveryMethod: "https://schema.org/ParcelService",
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: c.faqs.map((qa) => ({
                "@type": "Question",
                name: qa.q,
                acceptedAnswer: { "@type": "Answer", text: qa.a },
              })),
            },
          ]),
        }}
      />
    </>
  );
}
