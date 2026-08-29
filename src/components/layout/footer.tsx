"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { toast } from "@/components/ui/toast";

const CONTACT_PHONE = "+971 54 995 7255";
const CONTACT_EMAIL = "info.rental@pupiloffate.ae";
const CONTACT_ADDRESS = "Dubai Sheikh Zayed Road, Dubai";

const notImplemented = (feature: string) =>
  toast.add({
    title: `${feature} coming soon`,
    description: "This is a mockup. The logic isn't implemented yet.",
    type: "info",
  });

type FooterColumn = {
  title: string;
  links: { label: string; href?: string }[];
};

const COLUMNS: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About Us" },
      { label: "Car Listings" },
      { label: "Long Lease" },
      { label: "Offers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center" },
      { label: "Terms and Conditions" },
      { label: "Privacy Policy" },
      { label: "Contact Us" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { label: "Instagram" },
      { label: "Facebook" },
      { label: "LinkedIn" },
      { label: "YouTube" },
    ],
  },
];

const linkClass =
  "text-sm text-white/70 transition-colors hover:text-[#d8b878]";

export function Footer() {
  return (
    <footer className="mt-auto bg-[#2b2b2d] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col gap-4">
          <Link href="/easytogo" className="flex w-fit items-center">
            <Image
              src="/brand-logo/pof-logo.png"
              alt="POF Rental Booking"
              width={140}
              height={48}
              className="h-8 w-auto transition-transform duration-300 hover:scale-105 lg:h-10"
            />
          </Link>
          <p className="text-sm text-white/70">
            Premium car rentals across the UAE. Book luxury and everyday cars in
            minutes.
          </p>
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0 text-[#c9a86a]" />
              {CONTACT_ADDRESS}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-[#c9a86a]" />
              {CONTACT_PHONE}
            </span>
            <span className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-[#c9a86a]" />
              {CONTACT_EMAIL}
            </span>
          </div>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.title} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-[#c9a86a]">
              {column.title}
            </h3>
            {column.links.map((link) =>
              link.href ? (
                <Link key={link.label} href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => notImplemented(link.label)}
                  className={`${linkClass} text-left`}
                >
                  {link.label}
                </button>
              ),
            )}
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-white/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} POF Rental. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
