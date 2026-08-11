"use client";

import { useMemo, useState } from "react";
import {
  allItems,
  delivery,
  groups,
  occasionOptions,
  RUSH_MULTIPLIER,
  type DeliveryId,
} from "@/lib/builder";
import { pkr, waLink } from "@/lib/site";
import Reveal from "./Reveal";

/**
 * ── THE DIFFERENTIATOR ───────────────────────────────────────────
 *
 * No competitor in this market lets you price a box yourself — they all
 * make you DM for it, which loses the impatient half of the traffic and
 * eats the owner's day in back-and-forth.
 *
 * This does the quoting up front and hands WhatsApp a fully written
 * brief, so the first message already contains everything needed to
 * start work. Entirely client-side: no backend, no payment gateway, no
 * running cost.
 */
export default function BoxBuilder() {
  const [occasion, setOccasion] = useState<string>(occasionOptions[0]);
  const [budget, setBudget] = useState(5000);
  const [base, setBase] = useState("box-m");
  const [picked, setPicked] = useState<Set<string>>(new Set(["card", "lights"]));
  const [dest, setDest] = useState<DeliveryId>("karachi");
  const [rush, setRush] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [words, setWords] = useState("");

  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const deliveryOption = delivery.find((d) => d.id === dest)!;

  const { itemsTotal, rushFee, total, chosen, handmadeCount } = useMemo(() => {
    const ids = [base, ...Array.from(picked)];
    const chosen = ids.map((id) => allItems[id]).filter(Boolean);
    const itemsTotal = chosen.reduce((sum, i) => sum + i.price, 0);
    const rushFee = rush ? Math.round(itemsTotal * RUSH_MULTIPLIER) : 0;
    const handmadeCount = groups
      .find((g) => g.id === "handmade")!
      .items.filter((i) => picked.has(i.id)).length;

    return {
      chosen,
      itemsTotal,
      rushFee,
      total: itemsTotal + rushFee + deliveryOption.price,
      handmadeCount,
    };
  }, [base, picked, rush, deliveryOption]);

  const overBudget = total > budget;
  const usage = Math.min(100, (total / Math.max(budget, 1)) * 100);
  const valid = handmadeCount >= 1;

  // Fresh things can't survive a courier — surface it rather than
  // letting someone in Lahore order a bouquet and be disappointed.
  const localConflicts = Array.from(picked)
    .map((id) => allItems[id])
    .filter((i) => i?.localOnly && dest !== "karachi");

  const message = useMemo(() => {
    const lines = [
      "Assalam o alaikum! Maine website par apna box banaya hai 🤍",
      "",
      `Occasion: ${occasion}`,
      recipient ? `Kis ke liye: ${recipient}` : "Kis ke liye: ",
      `Budget: ${pkr(budget)}`,
      "",
      "── Box ──",
      `Presentation: ${allItems[base]?.label}`,
      "",
      "Handmade:",
      ...groups
        .find((g) => g.id === "handmade")!
        .items.filter((i) => picked.has(i.id))
        .map((i) => `  • ${i.label}`),
      "",
      "Andar:",
      ...groups
        .find((g) => g.id === "inside")!
        .items.filter((i) => picked.has(i.id))
        .map((i) => `  • ${i.label}`),
      "",
      "Finishing:",
      ...groups
        .find((g) => g.id === "finish")!
        .items.filter((i) => picked.has(i.id))
        .map((i) => `  • ${i.label}`),
      "",
      `Delivery: ${deliveryOption.label}`,
      rush ? "Rush: 24 hours mein chahiye" : "",
      "",
      `Estimated total: ${pkr(total)}`,
      words ? `\nCard par ye likhwana hai:\n"${words}"` : "",
    ];
    return lines.filter((l) => l !== undefined).join("\n");
  }, [occasion, recipient, budget, base, picked, deliveryOption, rush, total, words]);

  return (
    <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
      {/* ══ Choices ══════════════════════════════════════════ */}
      <div className="min-w-0">
        {/* Occasion + budget */}
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

            <div className="mt-8">
              <label htmlFor="budget" className="eyebrow mb-1 block">
                Budget — {pkr(budget)}
              </label>
              <input
                id="budget"
                type="range"
                min={1500}
                max={40000}
                step={500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="ribbon-range"
              />
              <p className="text-[0.8rem] text-ink-3">
                Nothing is locked to this — it just tells us where to aim.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="recipient" className="eyebrow mb-2 block">
                  Who is it for? <span className="normal-case tracking-normal text-ink-3">(optional)</span>
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
                <label htmlFor="dest" className="eyebrow mb-2 block">
                  Delivering to
                </label>
                <select
                  id="dest"
                  value={dest}
                  onChange={(e) => setDest(e.target.value as DeliveryId)}
                  className="w-full border border-paper-3 bg-paper px-4 py-3 text-[0.92rem] transition-colors duration-500 hover:border-gold-soft focus:border-rose"
                >
                  {delivery.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label} — {pkr(d.price)} · {d.note}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Groups */}
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
                      className={`group/i relative flex items-start gap-3.5 border p-4 text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        active
                          ? "border-rose bg-blush/28"
                          : "border-paper-3 hover:border-gold-soft hover:bg-paper-2/50"
                      } ${blocked ? "opacity-55" : ""}`}
                    >
                      {/* Mark */}
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
                        <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <span className="text-[0.94rem] leading-snug">
                            {item.label}
                          </span>
                          <span
                            className={`shrink-0 text-[0.84rem] tabular-nums ${
                              active ? "text-rose" : "text-ink-3"
                            }`}
                          >
                            {item.price === 0 ? "Free" : `+ ${pkr(item.price)}`}
                          </span>
                        </span>
                        {(item.note || blocked) && (
                          <span className="mt-1 block text-[0.78rem] leading-relaxed text-ink-3">
                            {blocked ? "Karachi only — won't survive a courier" : item.note}
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

        {/* Words on the card */}
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
                <span className="text-[0.94rem]">Rush — ready in 24 hours</span>
                <span className="mt-1 block text-[0.8rem] leading-relaxed text-ink-3">
                  Adds 30% to the items. Rush work pushes other orders back,
                  which is the honest reason it costs more.
                </span>
              </span>
            </label>
          </section>
        </Reveal>
      </div>

      {/* ══ Summary — a hanging gift tag ═════════════════════ */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative">
          {/* String and hole */}
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

          <div className="relative border border-paper-3 bg-paper p-7 shadow-[0_1px_2px_rgb(26_22_19/0.04),0_8px_24px_-12px_rgb(26_22_19/0.16)]">
            <span
              className="absolute left-1/2 top-4 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-paper-3"
              aria-hidden="true"
            />

            <p className="eyebrow mt-4 text-center">Your box</p>

            {/* Budget bar */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between text-[0.8rem]">
                <span className="text-ink-3">Budget {pkr(budget)}</span>
                <span
                  className={
                    overBudget ? "text-rose-deep" : "text-ink-3"
                  }
                >
                  {overBudget ? `Over by ${pkr(total - budget)}` : `${Math.round(usage)}% used`}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-paper-3">
                <div
                  className="h-full rounded-full transition-[width,background-color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    width: `${usage}%`,
                    background: overBudget
                      ? "var(--color-rose-deep)"
                      : "var(--color-rose)",
                  }}
                />
              </div>
            </div>

            <div className="rule-gold my-6" />

            {/* Line items */}
            <ul className="max-h-[15rem] space-y-2 overflow-y-auto pr-1 text-[0.84rem]">
              {chosen.map((i) => (
                <li key={i.id} className="flex justify-between gap-4">
                  <span className="text-ink-2">{i.label}</span>
                  <span className="shrink-0 tabular-nums text-ink-3">
                    {i.price === 0 ? "—" : pkr(i.price)}
                  </span>
                </li>
              ))}
              {rush && (
                <li className="flex justify-between gap-4">
                  <span className="text-ink-2">Rush (24h)</span>
                  <span className="shrink-0 tabular-nums text-ink-3">
                    {pkr(rushFee)}
                  </span>
                </li>
              )}
              <li className="flex justify-between gap-4">
                <span className="text-ink-2">Delivery — {deliveryOption.label}</span>
                <span className="shrink-0 tabular-nums text-ink-3">
                  {pkr(deliveryOption.price)}
                </span>
              </li>
            </ul>

            <div className="rule-gold my-6" />

            <div className="flex items-baseline justify-between">
              <span className="eyebrow">Estimated</span>
              <span className="display text-[2.1rem] tabular-nums text-rose">
                {pkr(total)}
              </span>
            </div>
            <p className="mt-2 text-[0.75rem] leading-relaxed text-ink-3">
              An estimate, not an invoice. We confirm the final figure with you
              before anything is bought.
            </p>

            {/* Warnings */}
            {!valid && (
              <p className="mt-5 border-l-2 border-rose bg-blush/35 py-3 pl-4 pr-3 text-[0.82rem] leading-relaxed">
                Pick at least one handmade piece — that&rsquo;s the part that
                makes this a HeartMade box rather than a hamper.
              </p>
            )}
            {localConflicts.length > 0 && (
              <p className="mt-3 border-l-2 border-gold bg-paper-2 py-3 pl-4 pr-3 text-[0.82rem] leading-relaxed text-ink-2">
                {localConflicts.map((i) => i.label).join(" and ")} can only go to
                Karachi — fresh flowers don&rsquo;t survive a courier. We&rsquo;ll
                suggest a preserved alternative.
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
            <p className="mt-3 text-center text-[0.75rem] text-ink-3">
              Opens WhatsApp with the whole brief written out.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
