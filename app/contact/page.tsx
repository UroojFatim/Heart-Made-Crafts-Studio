import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Message HeartMade Craft on WhatsApp or Instagram. Handmade gift boxes from Karachi, delivered across Pakistan. Most messages answered within the hour.",
};

type Channel = {
  label: string;
  value: string;
  href: string;
  cta: string;
  primary?: boolean;
};

const channels: Channel[] = [
  {
    label: "WhatsApp",
    value: "Fastest — usually within the hour",
    href: waLink(
      "Assalam o alaikum! Gift box banwana tha.\n\nKis ke liye: \nOccasion: \nBudget: \nKab chahiye: \nDelivery city: ",
    ),
    cta: "Open WhatsApp",
    primary: true,
  },
  {
    label: "Instagram",
    value: `@${site.instagram}`,
    href: `https://instagram.com/${site.instagram}`,
    cta: "Open Instagram",
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    cta: "Send an email",
  },
];

export default function ContactPage() {
  return (
    <div className="shell pb-8 pt-14 lg:pt-20">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="display-tight mt-5 max-w-[13ch] text-[clamp(2.8rem,7vw,5rem)]">
          Send one message. That&rsquo;s the whole process.
        </h1>
      </Reveal>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* ── Channels ─────────────────────────────────────── */}
        <div>
          <Reveal>
            <ul className="space-y-px">
              {channels.map((c, i) => (
                <li
                  key={c.label}
                  className="group border-b border-paper-3 first:border-t"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <a
                    href={c.href}
                    target={c.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="flex flex-wrap items-center justify-between gap-4 py-7 transition-colors duration-600"
                  >
                    <div>
                      <p
                        className={`display text-[1.8rem] transition-colors duration-600 ${
                          c.primary ? "text-ink" : "text-ink-2 group-hover:text-ink"
                        }`}
                      >
                        {c.label}
                      </p>
                      <p className="mt-1.5 text-[0.9rem] text-ink-3">{c.value}</p>
                    </div>
                    <span className="flex items-center gap-2.5 text-[0.85rem] text-ink transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                      {c.cta}
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                        <path
                          d="M0 5h14M10 1l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* What to send */}
          <Reveal delay={120}>
            <div className="mt-14">
              <h2 className="display text-[1.9rem]">
                What to send so we can help fast
              </h2>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-ink-2">
                Copy this and fill it in — it saves an evening of back and forth.
              </p>

              <div className="mt-6 border border-paper-3 bg-paper-2/45 p-6 font-[family-name:var(--font-sans)] text-[0.9rem] leading-loose text-ink-2 lg:p-7">
                <p>Kis ke liye: <span className="text-ink-3">(behen, dost, wife…)</span></p>
                <p>Occasion: <span className="text-ink-3">(birthday, anniversary…)</span></p>
                <p>Budget: <span className="text-ink-3">(ek number, approx)</span></p>
                <p>Kab chahiye: <span className="text-ink-3">(date)</span></p>
                <p>Delivery city:</p>
                <p>Woh kya pasand karti/karta hai: <span className="text-ink-3">(optional, but it helps)</span></p>
              </div>

              <p className="mt-5 text-[0.85rem] leading-relaxed text-ink-3">
                Or skip all of it and use the{" "}
                <Link href="/build-your-box" className="link-wipe text-ink-2">
                  box builder
                </Link>{" "}
                — it writes the message for you.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ── Practicalities ───────────────────────────────── */}
        <Reveal variant="right" delay={80}>
          <div className="border border-paper-3 p-7 lg:p-8">
            <p className="eyebrow">Good to know</p>

            <dl className="mt-6 space-y-6">
              {[
                ["Based in", `${site.city}, Pakistan`],
                ["We reply", "10am – 11pm, every day"],
                ["Karachi delivery", "Same or next day · Rs 350"],
                ["Nationwide", "2–4 days by courier · Rs 500"],
                ["Payment", "Raast · JazzCash · EasyPaisa · bank transfer · COD"],
                ["Lead time", "2–3 days small, 5–7 large, 2 weeks for weddings"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-2">
                    {v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="rule-gold my-7" />

            <p className="text-[0.88rem] leading-relaxed text-ink-2">
              We take a limited number of orders each week so that nothing gets
              rushed. If we&rsquo;re full, we&rsquo;ll tell you straight away
              rather than take the money and disappoint you.
            </p>

            <a
              href={waLink("Assalam o alaikum! Is hafte ke liye slot available hai?")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-7 w-full justify-center bg-ink px-6 py-4 text-[0.85rem] tracking-wide text-paper after:bg-rose"
            >
              Check this week&rsquo;s slots
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
