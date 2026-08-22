import type { Metadata } from "next";
import Link from "next/link";
import Accordion, { type QA } from "@/components/Accordion";
import Reveal from "@/components/Reveal";
import { site, waLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Payment, delivery, refunds, custom orders and lead times for HeartMade Craft gift boxes. Cash on delivery available. Karachi and nationwide.",
};

const ordering: QA[] = [
  {
    q: "How do I actually order?",
    a: "Message us on WhatsApp with who it's for, the occasion and a budget — two lines is enough. We come back with two or three options and honest pricing, usually the same day. Nothing is paid until you've seen what you're getting. If you'd rather work it out yourself first, the box builder walks you through every choice and sends the whole brief across in one message.",
  },
  {
    q: "How far in advance should I order?",
    a: "Small boxes need 2–3 days, the Signature box 3–4, and larger hampers 5–7. Wedding and trousseau sets need two weeks or more, and wedding season fills early. We also do 24-hour rush orders for 30% more — rush work pushes other orders back, which is the honest reason it costs extra.",
  },
  {
    q: "Can I send my own items to include?",
    a: "Yes, often. People send jewellery, a book, something they bought abroad. Bring it to us or courier it early and we'll build the box around it. We'll tell you straight if something won't sit well in the arrangement.",
  },
  {
    q: "Do you do bulk or corporate orders?",
    a: "Yes, and they're some of our favourite work — twenty coordinated boxes for an office Eid, or client gifts with a hand-lettered card each. Bulk pricing starts to move at around fifteen boxes. Give us two weeks.",
  },
];

const money: QA[] = [
  {
    q: "Do I have to pay in advance?",
    a: "Not always, and that's deliberate. Ready boxes can go cash on delivery — you pay when it's in your hands. Personalised work takes 50% to start, because a box with someone else's name painted on it can't be resold, and 50% on delivery. We never ask for the full amount before you've seen anything.",
  },
  {
    q: "How do I pay?",
    a: "Raast, JazzCash, EasyPaisa or bank transfer. Cash on delivery where the courier supports it. We don't take card payments on the site yet — when we do, it'll be through a proper gateway, not a link in a DM.",
  },
  {
    q: "Why aren't there any prices on the website?",
    a: "Because every piece is made to order, and the same box at two budgets is genuinely two different boxes. A printed number stops being true the moment you change one thing in it. So instead of a price list, tell us the occasion and roughly what you want to spend — we come back with two or three options and an honest figure, usually within the hour. Nothing is owed until you've seen them and agreed.",
  },
  {
    q: "Can you work to my budget?",
    a: "Almost always, and we'd rather you said the number out loud. We build to budgets far more often than we build to a menu. If what you want genuinely can't be done well for what you want to spend, we'll say so and suggest what would work instead — rather than take the order and disappoint you.",
  },
  {
    q: "What if something arrives damaged or wrong?",
    a: "Send us a photo within 24 hours of delivery and we'll remake or refund the affected part — our cost, not yours. Handmade personalised pieces can't be remade instantly, so for those we'll agree a fix with you. We'd rather lose the margin than have a box go out that someone was disappointed by.",
  },
];

const making: QA[] = [
  {
    q: "What does 'handmade' actually mean here?",
    a: "Every box contains at least one piece made by hand for the person receiving it — a calligraphy card in your words, a painted name plaque, a resin keepsake, an illustrated scrapbook spread. The chocolates and the flowers are sourced, like everywhere else. The piece that makes it theirs is not.",
  },
  {
    q: "Can I see it before it's delivered?",
    a: "You will, whether you ask or not. We send clips on WhatsApp while the box is being built — the card being lettered, the arrangement going in, the lid going on. It's the closest thing to standing in the room.",
  },
  {
    q: "Can you match a specific colour or theme?",
    a: "Usually. Send a photo or a screenshot of what you have in mind. Ribbon, box colour, flowers and painted work can all be matched; imported chocolate packaging can't, so we work around it.",
  },
];

const deliveryFaq: QA[] = [
  {
    q: "Where do you deliver?",
    a: "Karachi same or next day by rider. Everywhere else in Pakistan, 2–4 days by courier. We'll tell you the delivery charge before you commit — it's Rs 350 in Karachi and Rs 500 nationwide for most boxes.",
  },
  {
    q: "Can you deliver fresh flowers outside Karachi?",
    a: "No, and anyone promising otherwise is setting you up for disappointment. Fresh flowers and cakes don't survive a courier. For nationwide orders we use preserved and dried florals, which look beautiful and last far longer.",
  },
  {
    q: "I'm abroad — can I send a box to someone in Pakistan?",
    a: "Yes, this is a good part of what we do. You order and pay from wherever you are, we deliver in Pakistan, and we send you the clips and the delivery confirmation so you can see it landed.",
  },
  {
    q: "Can it be delivered as a surprise?",
    a: "Yes. Give us the recipient's number and address and a time window, and leave your name off the tag if you want. We'll coordinate directly with them without saying who it's from.",
  },
];

const sections = [
  { title: "Ordering", items: ordering },
  { title: "Money", items: money },
  { title: "How it's made", items: making },
  { title: "Delivery", items: deliveryFaq },
];

export default function FaqPage() {
  const all = sections.flatMap((s) => s.items);

  return (
    <div className="shell pb-8 pt-14 lg:pt-20">
      <Reveal>
        <p className="eyebrow">Questions</p>
        <h1 className="display-tight mt-5 max-w-[14ch] text-[clamp(2.8rem,7vw,5rem)]">
          The things people ask before they trust us.
        </h1>
        <p className="mt-7 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink-2">
          Answered properly, including the awkward ones about money. If
          something isn&rsquo;t here,{" "}
          <a
            href={waLink("Assalam o alaikum! Ek sawal tha:")}
            target="_blank"
            rel="noopener noreferrer"
            className="link-wipe text-ink"
          >
            ask on WhatsApp
          </a>{" "}
          — we answer most messages within the hour.
        </p>
      </Reveal>

      <div className="mt-16 space-y-16">
        {sections.map((section, i) => (
          <Reveal key={section.title} delay={i * 60}>
            <section>
              <h2 className="eyebrow mb-5">{section.title}</h2>
              <Accordion items={section.items} />
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-20 flex flex-col items-start gap-6 border border-dashed border-gold-soft p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
          <div>
            <h2 className="display text-[1.8rem]">Still not sure?</h2>
            <p className="mt-2.5 max-w-[46ch] leading-relaxed text-ink-2">
              Ask us anything before you commit to a rupee. Or start with the
              builder and see what your budget actually gets you.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/build-your-box"
              className="btn bg-ink px-6 py-3.5 text-[0.85rem] tracking-wide text-paper after:bg-rose"
            >
              Build your box
            </Link>
            <a
              href={waLink(`Assalam o alaikum! ${site.name} se ek sawal tha:`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn border border-ink px-6 py-3.5 text-[0.85rem] tracking-wide text-ink after:bg-ink hover:text-paper"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </Reveal>

      {/* FAQ rich result — pulls the answers straight into Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: all.map((qa) => ({
              "@type": "Question",
              name: qa.q,
              acceptedAnswer: { "@type": "Answer", text: qa.a },
            })),
          }),
        }}
      />
    </div>
  );
}
