"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  allItems,
  delivery,
  groups,
  occasionOptions,
  type DeliveryId,
} from "@/lib/builder";
import { waLink } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * ── THE DIFFERENTIATOR ───────────────────────────────────────────
 *
 * No competitor in this market lets you specify a gift yourself — they
 * all make you DM and answer twenty questions, which loses the
 * impatient half of the traffic and eats the owner's evening.
 *
 * This collects the whole brief up front and hands WhatsApp a message
 * that's already written. Entirely client-side: no backend, no
 * database, no running cost.
 *
 * Deliberately no per-option prices. A build is quoted as a whole, and
 * the same box at two budgets is two different boxes — so the budget
 * arrives as a sentence in the message and the quote happens in
 * conversation. The bands are in lib/pricing.ts, shown on /shop.
 */
export default function BoxBuilder() {
  const [occasion, setOccasion] = useState<string>(occasionOptions[0]);
  const [base, setBase] = useState("box-m");
  const [picked, setPicked] = useState<Set<string>>(new Set(["card", "lights"]));
  const [dest, setDest] = useState<DeliveryId>("karachi");
  const [rush, setRush] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [budget, setBudget] = useState("");
  const [words, setWords] = useState("");

  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const deliveryOption = delivery.find((d) => d.id === dest)!;

  const chosen = useMemo(
    () =>
      [base, ...Array.from(picked)]
        .map((id) => allItems[id])
        // A plain `.filter(Boolean)` doesn't narrow the type in
        // TypeScript, so `i.label` below would still be possibly-undefined.
        .filter((i): i is (typeof allItems)[string] => Boolean(i)),
    [base, picked],
  );

  const handmadeCount = groups
    .find((g) => g.id === "handmade")!
    .items.filter((i) => picked.has(i.id)).length;

  const valid = handmadeCount >= 1;

  // Fresh things can't survive a courier — say so rather than let
  // someone in Lahore order a bouquet and be disappointed.
  const localConflicts = Array.from(picked)
    .map((id) => allItems[id])
    .filter(
      (i): i is (typeof allItems)[string] =>
        Boolean(i?.localOnly) && dest !== "karachi",
    );

  const message = useMemo(() => {
    const pickedIn = (groupId: string) =>
      groups
        .find((g) => g.id === groupId)!
        .items.filter((i) => picked.has(i.id))
        .map((i) => `  • ${i.label}`);

    return [
      "Assalam o alaikum! Maine website par apna gift design kiya hai 🤍",
      "",
      `Occasion: ${occasion}`,
      `Kis ke liye: ${recipient || ""}`,
      `Budget: ${budget || ""}`,
      "",
      "── Design ──",
      `Presentation: ${allItems[base]?.label ?? ""}`,
      "",
      "Handmade:",
      ...pickedIn("handmade"),
      "",
      "Andar:",
      ...pickedIn("inside"),
      "",
      "Finishing:",
      ...pickedIn("finish"),
      "",
      `Delivery: ${deliveryOption.label}`,
      rush ? "Rush: 24 ghante mein chahiye" : "",
      words ? `\nCard par ye likhwana hai:\n"${words}"` : "",
      "",
      "Please quote karke bata dein 🤍",
    ].join("\n");
  }, [occasion, recipient, budget, base, picked, deliveryOption, rush, words]);

  return (
    <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
      {/* ══ Choices ══════════════════════════════════════════ */}
      <div className="min-w-0">
        <Reveal>
          <section className="border-b border-paper-3 pb-9">
            <h2 className="display text-[1.9rem]">First, the basics</h2>

            <fieldset className="mt-7">
              <legend className="eyebrow mb-3">Occasion</legend>
              <div className="flex flex-wrap gap-2">
                {occasionOptions.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setOccasion(o)}
                    aria-pressed={occasion === o}
                    className={`border px-4 py-2 text-[0.82rem] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      occasion === o
                        ? "border-ink bg-ink text-paper"
                        : "border-paper-3 text-ink-2 hover:border-rose hover:text-ink"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="recipient" className="eyebrow mb-2 block">
                  Who is it for?
                </label>
                <input
                  id="recipient"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="My sister, turning 22"
                  className="w-full border border-paper-3 bg-paper px-4 py-3 text-[0.92rem] transition-colors duration-500 placeholder:text-ink-3/70 hover:border-gold-soft focus:border-rose"
                />
              </div>
              <div>
                <label htmlFor="budget" className="eyebrow mb-2 block">
                  Rough budget
                </label>
                <input
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="Around 5,000 — or just say 'not sure'"
                  className="w-full border border-paper-3 bg-paper px-4 py-3 text-[0.92rem] transition-colors duration-500 placeholder:text-ink-3/70 hover:border-gold-soft focus:border-rose"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="dest" className="eyebrow mb-2 block">
                Delivering to
              </label>
              <select
                id="dest"
                value={dest}
                onChange={(e) => setDest(e.target.value as DeliveryId)}
                className="w-full border border-paper-3 bg-paper px-4 py-3 text-[0.92rem] transition-colors duration-500 hover:border-gold-soft focus:border-rose sm:max-w-[24rem]"
              >
                {delivery.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label} — {d.note}
                  </option>
                ))}
              </select>
            </div>

            <p className="mt-4 text-[0.8rem] leading-relaxed text-ink-3">
              A budget isn&rsquo;t required, but it helps — it&rsquo;s the
              difference between us guessing and us getting it right first time.
            </p>
          </section>
        </Reveal>

        {groups.map((group, gi) => (
          <Reveal key={group.id} delay={60}>
            <section className="border-b border-paper-3 py-9">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="display text-[1.9rem]">
                  <span className="mr-3 text-[1.1rem] text-rose/60">
                    {String(gi + 1).padStart(2, "0")}
                  </span>
                  {group.title}
                </h2>
                {group.id === "handmade" && (
                  <span
                    className={`eyebrow transition-colors duration-500 ${
                      handmadeCount >= 1 ? "text-ink-3" : "text-rose"
                    }`}
                  >
                    {handmadeCount >= 1
                      ? `${handmadeCount} selected`
                      : "Pick at least one"}
                  </span>
                )}
              </div>
              <p className="mt-2.5 max-w-[56ch] text-[0.94rem] leading-relaxed text-ink-2">
                {group.blurb}
              </p>

              <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {group.items.map((item) => {
                  const active =
                    group.mode === "one" ? base === item.id : picked.has(item.id);
                  const blocked = item.localOnly && dest !== "karachi";

                  return (
                    <button
                      key={item.id}
                      type="button"
                      role={group.mode === "one" ? "radio" : "checkbox"}
                      aria-checked={active}
                      onClick={() =>
                        group.mode === "one" ? setBase(item.id) : toggle(item.id)
                      }
                      className={`relative flex items-start gap-3.5 border p-4 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        active
                          ? "border-rose bg-blush/28"
                          : "border-paper-3 hover:border-gold-soft hover:bg-paper-2/50"
                      } ${blocked ? "opacity-55" : ""}`}
                    >
                      <span
                        className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-colors duration-500 ${
                          group.mode === "one" ? "rounded-full" : "rounded-[2px]"
                        } ${active ? "border-rose bg-rose" : "border-ink-3/45"}`}
                      >
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          className={`transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            active ? "scale-100" : "scale-0"
                          }`}
                          aria-hidden="true"
                        >
                          <path
                            d="M1 4l2.6 2.6L9 1"
                            stroke="var(--color-paper)"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.94rem] leading-snug">
                          {item.label}
                        </span>
                        {(item.note || blocked) && (
                          <span className="mt-1 block text-[0.78rem] leading-relaxed text-ink-3">
                            {blocked
                              ? "Karachi only — won't survive a courier"
                              : item.note}
                          </span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </Reveal>
        ))}

        <Reveal>
          <section className="py-9">
            <h2 className="display text-[1.9rem]">
              <span className="mr-3 text-[1.1rem] text-rose/60">05</span>
              The words
            </h2>
            <p className="mt-2.5 max-w-[56ch] text-[0.94rem] leading-relaxed text-ink-2">
              What should go on the card, in your handwriting&rsquo;s place? You
              can send this later too — but people who write it here usually
              write something better than they would in a rush.
            </p>
            <textarea
              value={words}
              onChange={(e) => setWords(e.target.value)}
              rows={4}
              maxLength={400}
              placeholder="Twenty-two years and you still haven't learned to knock…"
              className="mt-5 w-full resize-none border border-paper-3 bg-paper px-4 py-3.5 text-[0.95rem] leading-relaxed transition-colors duration-500 placeholder:text-ink-3/70 hover:border-gold-soft focus:border-rose"
              aria-label="Message for the card"
            />
            <p className="mt-1.5 text-right text-[0.75rem] text-ink-3">
              {words.length} / 400
            </p>

            <label className="mt-6 flex cursor-pointer items-start gap-3.5 border border-paper-3 p-4 transition-colors duration-500 hover:border-gold-soft">
              <input
                type="checkbox"
                checked={rush}
                onChange={(e) => setRush(e.target.checked)}
                className="mt-1 h-[18px] w-[18px] accent-[var(--color-rose)]"
              />
              <span>
                <span className="text-[0.94rem]">Rush — needed in 24 hours</span>
                <span className="mt-1 block text-[0.8rem] leading-relaxed text-ink-3">
                  Possible, and it costs more — rush work pushes other orders
                  back, which is the honest reason.
                </span>
              </span>
            </label>
          </section>
        </Reveal>
      </div>

      {/* ══ Summary — a hanging gift tag ═════════════════════ */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 120 40"
            className="mx-auto -mb-px block h-8 w-28"
          >
            <path
              d="M20 40 C 30 12, 90 12, 100 40"
              stroke="var(--color-rose)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative border border-paper-3 bg-paper p-7 shadow-[0_1px_2px_rgb(23_18_15/0.04),0_8px_24px_-12px_rgb(23_18_15/0.16)]">
            <span
              className="absolute left-1/2 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-paper-3"
              aria-hidden="true"
            />

            <p className="eyebrow mt-4 text-center">Your brief</p>

            <div className="rule-gold my-6" />

            <dl className="space-y-3 text-[0.84rem]">
              <div>
                <dt className="eyebrow text-[0.6rem]">Occasion</dt>
                <dd className="mt-0.5 text-ink">{occasion}</dd>
              </div>
              {recipient && (
                <div>
                  <dt className="eyebrow text-[0.6rem]">For</dt>
                  <dd className="mt-0.5 text-ink">{recipient}</dd>
                </div>
              )}
              {budget && (
                <div>
                  <dt className="eyebrow text-[0.6rem]">Budget</dt>
                  <dd className="mt-0.5 text-ink">{budget}</dd>
                </div>
              )}
            </dl>

            <div className="rule-gold my-6" />

            <p className="eyebrow text-[0.6rem]">
              {chosen.length} {chosen.length === 1 ? "choice" : "choices"}
            </p>
            <motion.ul layout className="mt-3 max-h-[16rem] space-y-1.5 overflow-y-auto pr-1 text-[0.84rem]">
              {chosen.map((i) => (
                <motion.li
                  key={i.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  className="flex gap-2.5 text-ink-2"
                >
                  <span className="text-rose" aria-hidden="true">·</span>
                  {i.label}
                </motion.li>
              ))}
              {rush && (
                <li className="flex gap-2.5 text-ink-2">
                  <span className="text-rose" aria-hidden="true">·</span>
                  Rush — 24 hours
                </li>
              )}
              <li className="flex gap-2.5 text-ink-2">
                <span className="text-rose" aria-hidden="true">·</span>
                {deliveryOption.label}
              </li>
            </motion.ul>

            {!valid && (
              <p className="mt-5 border-l-2 border-rose bg-blush/35 py-3 pl-4 pr-3 text-[0.82rem] leading-relaxed">
                Pick at least one handmade piece — that&rsquo;s the part that
                makes this a HeartMade box rather than a hamper.
              </p>
            )}
            {localConflicts.length > 0 && (
              <p className="mt-3 border-l-2 border-gold bg-paper-2 py-3 pl-4 pr-3 text-[0.82rem] leading-relaxed text-ink-2">
                {localConflicts.map((i) => i.label).join(" and ")} can only go to
                Karachi — fresh flowers don&rsquo;t survive a courier.
                We&rsquo;ll suggest a preserved alternative.
              </p>
            )}

            <a
              href={valid ? waLink(message) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!valid}
              onClick={(e) => {
                if (!valid) e.preventDefault();
              }}
              className={`btn mt-6 w-full justify-center px-6 py-4 text-[0.86rem] tracking-wide transition-opacity ${
                valid
                  ? "bg-ink text-paper after:bg-rose"
                  : "pointer-events-none bg-ink/35 text-paper/70"
              }`}
            >
              Send this to WhatsApp
            </a>
            <p className="mt-3 text-center text-[0.75rem] leading-relaxed text-ink-3">
              We&rsquo;ll come back with options and an honest price. Nothing
              owed until you&rsquo;ve seen them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
