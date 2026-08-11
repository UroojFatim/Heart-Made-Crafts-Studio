import type { Palette } from "@/lib/products";

/**
 * Procedural gift-box illustration.
 *
 * There is no product photography yet, and placeholder greyboxes would
 * have wrecked the art direction. So the catalogue is drawn instead:
 * one geometry, re-coloured per product from its own palette, with the
 * contents silhouette varying by `variant`. It stays on-brand, weighs
 * a couple of kB, scales to any size, and animates natively — the lid
 * lifts on hover and light spills out of the box.
 *
 * When real photos exist, swap this for <Image> inside ProductCard and
 * nothing else needs to change.
 */

type Props = {
  palette: Palette;
  /** Must be unique per rendered instance — gradients are id-scoped. */
  id: string;
  /** Contents silhouette, 0–3. */
  variant?: number;
  className?: string;
};

export default function BoxArt({ palette, id, variant = 0, className = "" }: Props) {
  const glowId = `glow-${id}`;
  const bodyId = `body-${id}`;
  const lidId = `lid-${id}`;
  const v = variant % 4;

  return (
    <svg
      viewBox="0 0 400 340"
      className={className}
      role="img"
      aria-label="Illustration of a ribbon-tied gift box"
    >
      <defs>
        <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.glow} stopOpacity="0.95" />
          <stop offset="55%" stopColor={palette.glow} stopOpacity="0.42" />
          <stop offset="100%" stopColor={palette.glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={bodyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.box} />
          <stop offset="100%" stopColor={palette.lid} />
        </linearGradient>
        <linearGradient id={lidId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.box} />
          <stop offset="48%" stopColor={palette.lid} />
          <stop offset="100%" stopColor={palette.box} />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse
        cx="200"
        cy="306"
        rx="128"
        ry="14"
        fill="var(--color-ink)"
        opacity="0.1"
      />

      {/* Light from inside the box — revealed with the lid */}
      <ellipse className="glow" cx="200" cy="150" rx="150" ry="86" fill={`url(#${glowId})`} />

      {/* ── Contents, peeking above the box rim ───────────────── */}
      <g>
        {v === 0 && (
          <>
            <Rosette cx={150} cy={140} r={21} fill={palette.ribbon} />
            <Rosette cx={200} cy={126} r={26} fill={palette.glow} stroke={palette.ribbon} />
            <Rosette cx={250} cy={142} r={19} fill={palette.ribbon} opacity={0.75} />
            <path
              d="M122 152 q-16 -30 -4 -52"
              stroke="var(--color-gold)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M278 152 q16 -28 3 -48"
              stroke="var(--color-gold)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
          </>
        )}

        {v === 1 && (
          <>
            <rect x="140" y="118" width="52" height="42" rx="4" fill={palette.glow} />
            <rect x="164" y="118" width="4" height="42" fill={palette.ribbon} />
            <rect x="140" y="136" width="52" height="4" fill={palette.ribbon} />
            <rect x="206" y="104" width="60" height="56" rx="4" fill="var(--color-paper)" />
            <rect x="233" y="104" width="4" height="56" fill={palette.ribbon} />
            <rect x="206" y="128" width="60" height="4" fill={palette.ribbon} />
            <Rosette cx={286} cy={140} r={17} fill={palette.ribbon} opacity={0.8} />
            <path
              d="M120 158 q-10 -34 6 -54"
              stroke="var(--color-gold)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
          </>
        )}

        {v === 2 && (
          <>
            {/* Candle */}
            <rect x="186" y="86" width="28" height="74" rx="6" fill="var(--color-paper)" />
            <rect x="186" y="86" width="28" height="10" rx="5" fill={palette.lid} />
            <path
              d="M200 84 q7 -9 0 -18 q-7 9 0 18 z"
              fill="var(--color-gold)"
              opacity="0.85"
            />
            <Rosette cx={152} cy={136} r={22} fill={palette.ribbon} />
            <Rosette cx={252} cy={140} r={19} fill={palette.glow} stroke={palette.ribbon} />
            <path
              d="M124 156 q-14 -32 0 -52"
              stroke="var(--color-gold)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
          </>
        )}

        {v === 3 && (
          <>
            {/* Tissue, then a hand-lettered plaque */}
            <path
              d="M112 158 q22 -40 44 -14 q20 -38 44 -12 q22 -36 46 -10 q22 -32 42 -6 l0 42 z"
              fill={palette.glow}
              opacity="0.9"
            />
            <rect
              x="146"
              y="104"
              width="108"
              height="46"
              rx="5"
              fill="var(--color-paper)"
              stroke={palette.ribbon}
              strokeWidth="1.5"
            />
            <path
              d="M164 122 q10 -9 18 0 t18 0 t18 0"
              stroke={palette.ribbon}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M166 134 h58"
              stroke="var(--color-gold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          </>
        )}
      </g>

      {/* Fairy lights along the rim */}
      <g className="glow">
        {[112, 146, 180, 214, 248, 282].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={158 + (i % 2 === 0 ? 0 : 3)}
            r="3.2"
            fill="var(--color-gold)"
            opacity="0.9"
          />
        ))}
      </g>

      {/* ── Box body ──────────────────────────────────────────── */}
      <rect x="76" y="156" width="248" height="146" rx="7" fill={`url(#${bodyId})`} />
      {/* Ribbon down the body */}
      <rect x="186" y="156" width="28" height="146" fill={palette.ribbon} opacity="0.92" />
      <rect x="197" y="156" width="3" height="146" fill="var(--color-paper)" opacity="0.28" />
      {/* Inner shadow under the lid */}
      <rect x="76" y="156" width="248" height="9" rx="4" fill="var(--color-ink)" opacity="0.09" />

      {/* ── Lid (lifts on hover) ──────────────────────────────── */}
      <g className="lid">
        <rect x="58" y="122" width="284" height="46" rx="9" fill={`url(#${lidId})`} />
        <rect x="58" y="122" width="284" height="46" rx="9" fill="none" stroke="var(--color-ink)" strokeOpacity="0.07" />
        <rect x="186" y="122" width="28" height="46" fill={palette.ribbon} />
        <rect x="197" y="122" width="3" height="46" fill="var(--color-paper)" opacity="0.28" />

        {/* Bow */}
        <g>
          <path
            d="M200 122 C 168 118, 148 100, 156 86 C 164 74, 190 92, 200 118 Z"
            fill={palette.ribbon}
          />
          <path
            d="M200 122 C 232 118, 252 100, 244 86 C 236 74, 210 92, 200 118 Z"
            fill={palette.ribbon}
          />
          <path
            d="M200 120 C 190 104, 172 96, 160 90"
            stroke="var(--color-paper)"
            strokeOpacity="0.32"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M200 120 C 210 104, 228 96, 240 90"
            stroke="var(--color-paper)"
            strokeOpacity="0.32"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* Tails */}
          <path
            d="M194 120 q-16 16 -30 20 l10 -24 z"
            fill={palette.ribbon}
            opacity="0.85"
          />
          <path
            d="M206 120 q16 16 30 20 l-10 -24 z"
            fill={palette.ribbon}
            opacity="0.85"
          />
          {/* Knot */}
          <ellipse cx="200" cy="118" rx="11" ry="9" fill={palette.ribbon} />
          <ellipse cx="200" cy="115" rx="6" ry="4" fill="var(--color-paper)" opacity="0.22" />
        </g>
      </g>
    </svg>
  );
}

/** A simple stylised bloom — five petals around a centre. */
function Rosette({
  cx,
  cy,
  r,
  fill,
  stroke,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  stroke?: string;
  opacity?: number;
}) {
  const petals = [0, 72, 144, 216, 288];
  return (
    <g opacity={opacity}>
      {petals.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        // Rounded so server and client render byte-identical markup —
        // raw trig differs in the last decimal between JS engines and
        // that alone is enough to trigger a hydration mismatch.
        const px = Math.round((cx + Math.cos(rad) * r * 0.46) * 100) / 100;
        const py = Math.round((cy + Math.sin(rad) * r * 0.46) * 100) / 100;
        return (
          <ellipse
            key={deg}
            cx={px}
            cy={py}
            rx={Math.round(r * 56) / 100}
            ry={Math.round(r * 42) / 100}
            fill={fill}
            stroke={stroke}
            strokeWidth={stroke ? 1.2 : 0}
            transform={`rotate(${deg} ${px} ${py})`}
          />
        );
      })}
      <circle
        cx={cx}
        cy={cy}
        r={Math.round(r * 28) / 100}
        fill="var(--color-gold)"
        opacity="0.9"
      />
    </g>
  );
}
