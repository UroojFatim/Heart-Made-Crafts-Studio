import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <svg
        viewBox="0 0 220 170"
        className="h-40 w-auto"
        role="img"
        aria-label="An empty gift box with the lid tipped off"
      >
        <ellipse cx="110" cy="152" rx="72" ry="8" fill="var(--color-ink)" opacity="0.1" />
        <rect x="52" y="82" width="116" height="66" rx="6" fill="var(--color-paper-2)" />
        <rect x="52" y="82" width="116" height="7" rx="3" fill="var(--color-ink)" opacity="0.1" />
        <rect x="100" y="82" width="20" height="66" fill="var(--color-rose)" opacity="0.9" />
        {/* Lid, tipped off to one side */}
        <g transform="rotate(-16 178 74)">
          <rect x="140" y="58" width="76" height="26" rx="6" fill="var(--color-paper-3)" />
          <rect x="168" y="58" width="16" height="26" fill="var(--color-rose)" />
        </g>
      </svg>

      <p className="eyebrow mt-10">404</p>
      <h1 className="display mt-4 max-w-[16ch] text-[clamp(2.2rem,6vw,3.6rem)]">
        This one&rsquo;s empty.
      </h1>
      <p className="mt-5 max-w-[42ch] leading-relaxed text-ink-2">
        The page you were looking for isn&rsquo;t here. The boxes that do have
        something in them are one click away.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link
          href="/shop"
          className="btn bg-ink px-7 py-4 text-[0.85rem] tracking-wide text-paper after:bg-rose"
        >
          See the boxes
        </Link>
        <Link
          href="/"
          className="btn border border-ink/22 px-7 py-4 text-[0.85rem] tracking-wide text-ink after:bg-blush"
        >
          Back home
        </Link>
      </div>
    </div>
  );
}
