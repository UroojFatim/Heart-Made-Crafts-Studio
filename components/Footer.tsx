import Image from "next/image";
import Link from "next/link";
import { nav, site, waLink } from "@/lib/site";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-32 overflow-hidden bg-ink text-paper">
      {/* The ribbon finally ties off here */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-0 h-16 w-full"
      >
        <path
          d="M0 0 C 180 46, 420 66, 600 66 C 780 66, 1020 46, 1200 0 L1200 0 L0 0 Z"
          fill="var(--color-paper)"
        />
      </svg>

      <div className="shell relative pb-12 pt-32">
        <Reveal>
          <p className="eyebrow text-gold-soft/70">Ready when you are</p>
          <h2 className="display mt-5 max-w-[16ch] text-[clamp(2.6rem,7vw,5.2rem)]">
            Tell us who it&rsquo;s for.
          </h2>
          <p className="mt-6 max-w-[46ch] text-[1.02rem] leading-relaxed text-paper/62">
            Send a name, an occasion and a budget. We&rsquo;ll come back with two
            or three options and honest pricing — no deposit until you&rsquo;ve
            seen them.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={waLink(
                "Assalam o alaikum! Mujhe ek gift box banwana tha.\n\nKis ke liye: \nOccasion: \nBudget: \nKab chahiye: ",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-paper px-7 py-4 text-[0.85rem] tracking-wide text-ink after:bg-rose hover:text-paper"
            >
              Start on WhatsApp
            </a>
            <Link
              href="/build-your-box"
              className="btn border border-paper/28 px-7 py-4 text-[0.85rem] tracking-wide text-paper after:bg-paper hover:text-ink"
            >
              Build your box
            </Link>
          </div>
        </Reveal>

        <div className="mt-24 grid gap-10 border-t border-paper/12 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/logo.png"
                alt="HeartMade Craft logo"
                width={50}
                height={50}
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-paper/52">
              {site.promise}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow text-paper/40">Pages</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-wipe text-sm text-paper/70 transition-colors duration-500 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-paper/40">Reach us</p>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
              <li>
                <a
                  href={`https://instagram.com/${site.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-wipe transition-colors duration-500 hover:text-paper"
                >
                  @{site.instagram}
                </a>
              </li>
              <li>
                <a
                  href={waLink("Assalam o alaikum!")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-wipe transition-colors duration-500 hover:text-paper"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-wipe break-all transition-colors duration-500 hover:text-paper"
                >
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-paper/40">Delivery</p>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
              <li>Karachi — same or next day</li>
              <li>Nationwide — 2–4 days by courier</li>
              <li>Cash on delivery available</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-paper/12 pt-7 text-xs text-paper/38 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} HeartMade Craft · Made by hand in{" "}
            {site.city}
          </p>
          <p className="italic-serif text-paper/48">{site.promiseEn}</p>
        </div>
      </div>
    </footer>
  );
}
