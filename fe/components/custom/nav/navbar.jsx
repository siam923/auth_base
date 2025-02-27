// components/navbar/navbar.jsx
import Image from "next/image";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { UserNav } from "./user-nav";
import { MobileNav } from "./mobile-nav";

export async function Navbar({ user }) {
  return (
    <header className="sticky top-0 w-full backdrop-blur-lg border-b border-secondary shadow-md z-50">
      <div className="absolute inset-0  opacity-90"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/waste-sync-logo.svg"
              alt="Waste Sync logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold hidden sm:inline-block">
              Fajr Capital
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <MainNav />
            <div className="hidden md:block">
              <UserNav user={user} />
            </div>
            <MobileNav user={user} />
          </div>
        </div>
      </div>
    </header>
  );
}
