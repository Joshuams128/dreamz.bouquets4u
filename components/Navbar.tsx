"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-lavender/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-tight">
            <span className="font-playfair text-xl font-bold text-black tracking-wide">
              Dreamz Bouquets
            </span>
            <span className="font-inter text-[10px] text-lavender-dark tracking-widest uppercase">
              by Keerthi &amp; Shyla
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-inter text-sm tracking-wide transition-colors duration-200 ${
                  pathname === href
                    ? "text-lavender-dark font-semibold border-b-2 border-lavender"
                    : "text-gray-700 hover:text-lavender-dark"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-lavender hover:bg-lavender-dark text-white text-sm font-inter font-medium px-5 py-2 rounded-full transition-colors duration-200"
            >
              Order Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-lavender-dark"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current mb-1" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-lavender/20 mt-1">
            <div className="flex flex-col gap-3 pt-4">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`font-inter text-sm px-2 py-1 transition-colors duration-200 ${
                    pathname === href
                      ? "text-lavender-dark font-semibold"
                      : "text-gray-700 hover:text-lavender-dark"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="bg-lavender hover:bg-lavender-dark text-white text-sm font-inter font-medium px-5 py-2 rounded-full text-center transition-colors duration-200 mt-2"
              >
                Order Now
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
