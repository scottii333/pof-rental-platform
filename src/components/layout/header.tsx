import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#414243]">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link href="/easytogo" className="flex items-center">
          <Image
            src="/brand-logo/pof-logo.png"
            alt="POF Rental Booking"
            width={120}
            height={40}
            priority
            className="h-8 w-auto"
          />
        </Link>
      </div>
    </header>
  );
}
