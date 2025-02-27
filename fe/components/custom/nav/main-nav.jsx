// components/navbar/main-nav.jsx
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

const navItems = [
  { name: "Features", href: "/#features" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Benefits", href: "/#benefits" },
  { name: "How it works", href: "/#how-it-works" },
]

export function MainNav() {
  return (
    <nav className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="relative px-3 py-2 text-sm font-medium   transition-colors"
        >
          {item.name}
        </Link>
      ))}

      <ModeToggle />
  
    </nav>
  );
}
