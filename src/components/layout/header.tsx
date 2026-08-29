"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, UserRound } from "lucide-react";

import { toast } from "@/components/ui/toast";

const notImplemented = (feature: string) =>
  toast.add({
    title: `${feature} coming soon`,
    description: "This is a mockup. The logic isn't implemented yet.",
    type: "info",
  });

type NavLink = { label: string; href?: string };

const NAV_LINKS: NavLink[] = [
  { label: "EasyToGo", href: "/easytogo" },
  { label: "Car Listings" },
  { label: "Long Lease" },
  { label: "Chinese Luxury Cars" },
  { label: "Car Disposal" },
  { label: "Car Care" },
  { label: "Offers" },
];

const navLinkClass = (active: boolean) =>
  `whitespace-nowrap text-sm font-medium underline-offset-8 transition-colors duration-200 hover:text-[#d8b878] ${
    active
      ? "text-[#d8b878] underline decoration-[#d8b878] decoration-2"
      : "text-white/80"
  }`;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transform-gpu text-white transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#2b2b2d]/70 backdrop-blur-md"
          : "bg-[#2b2b2d]"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/easytogo" className="flex shrink-0 items-center">
          <Image
            src="/brand-logo/pof-logo.png"
            alt="POF Rental Booking"
            width={140}
            height={48}
            priority
            className="h-8 w-auto transition-transform duration-300 hover:scale-105 lg:h-10"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV_LINKS.map((link) => {
            const active = Boolean(
              link.href &&
              (pathname === link.href || pathname.startsWith(`${link.href}/`)),
            );

            if (!link.href) {
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => notImplemented(link.label)}
                  className={navLinkClass(false)}
                >
                  {link.label}
                </button>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={navLinkClass(active)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop sign in */}
        <button
          type="button"
          onClick={() => notImplemented("Login")}
          className="hidden shrink-0 items-center gap-2 rounded-full bg-[#c9a86a] px-6 py-2.5 text-sm font-semibold text-[#2b2b2d] transition-all duration-200 hover:bg-[#d8b878] hover:shadow-lg lg:inline-flex"
        >
          <UserRound className="h-4 w-4" strokeWidth={2.2} />
          Login
        </button>

        {/* Mobile actions */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            type="button"
            aria-label="Sign in"
            onClick={() => notImplemented("Login")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/85 transition-all duration-200 hover:border-white/60 hover:text-white active:scale-95"
          >
            <UserRound className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => notImplemented("Menu")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/85 transition-all duration-200 hover:border-white/60 hover:text-white active:scale-95"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
