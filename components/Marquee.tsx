const ITEMS = [
  "Birthdays",
  "Anniversaries",
  "Nikah & mayoun",
  "Eid",
  "New baby",
  "Graduation",
  "Just because",
  "Get well soon",
  "Thank you",
  "Corporate gifting",
];

/**
 * A quiet band of occasions between the hero and the first pitch.
 * Duplicated once and translated -50% so the loop is seamless; hover
 * pauses it so anyone reading can actually read.
 */
export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-paper-3 bg-paper-2/60 py-5">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-paper to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-paper to-transparent"
        aria-hidden="true"
      />
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {ITEMS.map((item) => (
              <span key={item} className="flex items-center">
                <span className="display whitespace-nowrap px-7 text-[1.35rem] text-ink-2">
                  {item}
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <circle cx="6" cy="6" r="2.4" fill="var(--color-rose)" opacity="0.55" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="sr-only">
        We make gift boxes for birthdays, anniversaries, weddings, Eid, new
        babies, graduations, corporate gifting and no reason at all.
      </p>
    </div>
  );
}
