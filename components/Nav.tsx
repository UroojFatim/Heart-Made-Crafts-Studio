"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site, waLink } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on navigation, and lock the page behind it.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "bg-paper/85 shadow-[0_1px_0_rgb(26_22_19/0.07)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-baseline gap-2.5 hover:opacity-80 transition-opacity duration-300"
            aria-label="HeartMade Craft, home"
          >
            <Image
              src="/logo.png"
              alt="HeartMade Craft logo"
              width={60}
              height={60}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-active={pathname.startsWith(item.href)}
                className="link-wipe text-[0.9rem] text-ink-2 transition-colors duration-500 hover:text-ink data-[active=true]:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waLink(
                `Assalam o alaikum! Mujhe ${site.name} se ek gift box ke bare mein poochna tha.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn hidden border border-ink px-5 py-2.5 text-[0.82rem] tracking-wide text-ink after:bg-ink hover:text-paper sm:inline-flex"
            >
              Order on WhatsApp
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3.5 w-6">
                <span
                  className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet — the panel slides down like a lid coming off */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-ink/25 transition-opacity duration-600 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-x-0 top-0 bg-paper pb-10 pt-[var(--nav-h)] shadow-[0_24px_60px_-30px_rgb(26_22_19/0.5)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="shell flex flex-col pt-6">
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="display border-b border-paper-3 py-4 text-[2rem] transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transitionDelay: open ? `${90 + i * 55}ms` : "0ms",
                  transform: open ? "none" : "translateY(14px)",
                  opacity: open ? 1 : 0,
                }}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={waLink("Assalam o alaikum! Gift box ke bare mein poochna tha.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-8 justify-center bg-ink px-6 py-4 text-sm tracking-wide text-paper after:bg-rose"
            >
              Order on WhatsApp
            </a>
            <p className="eyebrow mt-6">
              {site.city} · Delivery across Pakistan
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
