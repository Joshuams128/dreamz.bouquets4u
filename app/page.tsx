import Link from "next/link";
import ProductCard from "@/components/ProductCard";

const featuredProducts = [
  {
    name: "7 Count Bouquet",
    description: "A sweet, petite arrangement perfect for everyday gifting or a heartfelt gesture.",
    price: 18,
    count: 7,
  },
  {
    name: "12 Count Bouquet",
    description: "A classic, full-looking bouquet ideal for birthdays, anniversaries, and celebrations.",
    price: 32,
    count: 12,
  },
  {
    name: "17 Count Bouquet",
    description: "A lush and impressive bouquet that makes a stunning statement for any occasion.",
    price: 36,
    count: 17,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-lavender-light via-warm-white to-blush/30 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <p className="font-inter text-xs uppercase tracking-[0.3em] text-lavender-dark mb-4">
              Handmade &amp; Eternal
            </p>
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight text-balance mb-6">
              Handcrafted{" "}
              <span className="italic text-lavender-dark">Eternal</span>
              <br />
              Ribbon Bouquets
            </h1>
            <p className="font-inter text-lg text-gray-600 mb-10 leading-relaxed">
              Made with love by Keerthi &amp; Shyla — each bouquet is a one-of-a-kind creation
              crafted just for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="bg-lavender hover:bg-lavender-dark text-white font-inter font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide transition-colors duration-200 shadow-sm"
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="border-2 border-lavender text-lavender-dark hover:bg-lavender hover:text-white font-inter font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide transition-all duration-200"
              >
                Order Custom
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative circles */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-lavender/10 hidden lg:block" />
        <div className="absolute right-20 bottom-0 w-48 h-48 rounded-full bg-blush/20 hidden lg:block" />
      </section>

      {/* ── About ── */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Placeholder image */}
            <div className="aspect-square bg-gray-200 rounded-3xl w-full max-w-md mx-auto flex items-center justify-center">
              <span className="font-inter text-sm text-gray-400">Photo coming soon</span>
            </div>

            <div>
              <p className="font-inter text-xs uppercase tracking-[0.3em] text-lavender-dark mb-3">
                Our Story
              </p>
              <h2 className="font-playfair text-4xl font-bold text-black mb-6 leading-tight">
                Made with love,<br />built to last forever.
              </h2>
              <div className="space-y-4 font-inter text-gray-600 leading-relaxed">
                <p>
                  Dreamz Bouquets was born from a shared passion for beauty and craftsmanship.
                  Keerthi &amp; Shyla handcraft every ribbon bouquet with care, ensuring each bloom
                  is perfectly shaped and arranged.
                </p>
                <p>
                  Unlike fresh flowers, our eternal ribbon bouquets never wilt — they&apos;re a
                  timeless keepsake that captures a moment of joy and holds it forever.
                  Fully customizable in colour, size, and style to match any occasion.
                </p>
              </div>
              <div className="mt-8 flex gap-8">
                <div>
                  <p className="font-playfair text-3xl font-bold text-lavender-dark">100%</p>
                  <p className="font-inter text-xs text-gray-500 mt-1 uppercase tracking-wide">Handmade</p>
                </div>
                <div>
                  <p className="font-playfair text-3xl font-bold text-lavender-dark">∞</p>
                  <p className="font-inter text-xs text-gray-500 mt-1 uppercase tracking-wide">Eternal</p>
                </div>
                <div>
                  <p className="font-playfair text-3xl font-bold text-lavender-dark">MTO</p>
                  <p className="font-inter text-xs text-gray-500 mt-1 uppercase tracking-wide">Made to Order</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-20 bg-off-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-inter text-xs uppercase tracking-[0.3em] text-lavender-dark mb-3">
              Our Collection
            </p>
            <h2 className="font-playfair text-4xl font-bold text-black">
              Featured Bouquets
            </h2>
            <p className="font-inter text-gray-500 mt-3 text-sm">
              Starting from just $18 CAD — fully customizable in your choice of colour.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-block border-2 border-lavender text-lavender-dark hover:bg-lavender hover:text-white font-inter font-semibold px-8 py-3 rounded-full text-sm tracking-wide transition-all duration-200"
            >
              View All Sizes
            </Link>
          </div>
        </div>
      </section>

      {/* ── Add-ons Highlight ── */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="font-inter text-xs uppercase tracking-[0.3em] text-lavender-dark mb-3">
              Make It Yours
            </p>
            <h2 className="font-playfair text-4xl font-bold text-black mb-4">
              Customize Your Bouquet
            </h2>
            <p className="font-inter text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
              Every bouquet can be personalized with a wide range of add-ons. Mix and match to
              create something truly unique.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: "🦋", label: "Butterflies" },
              { icon: "👑", label: "Crowns" },
              { icon: "✨", label: "Glitter" },
              { icon: "🎓", label: "Graduation Cap" },
              { icon: "🌿", label: "Baby's Breath" },
              { icon: "🌷", label: "Artificial Flowers" },
              { icon: "🎀", label: "Ribboned Message" },
              { icon: "📦", label: "Gift Wrapping" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="bg-lavender-light/40 rounded-2xl p-4 text-center hover:bg-lavender-light/70 transition-colors duration-200"
              >
                <div className="text-3xl mb-2">{icon}</div>
                <p className="font-inter text-xs font-medium text-gray-700">{label}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/shop#addons"
              className="font-inter text-sm text-lavender-dark hover:underline underline-offset-4"
            >
              See all add-ons &amp; pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-xs uppercase tracking-[0.3em] text-lavender mb-3">
            Limited availability
          </p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Every bouquet is made to order —<br />
            <span className="italic text-lavender">place yours today.</span>
          </h2>
          <p className="font-inter text-gray-400 text-sm mb-8 max-w-md mx-auto">
            Orders are confirmed within 24 hours. Follow us on Instagram for inspiration.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-lavender hover:bg-lavender-dark text-white font-inter font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide transition-colors duration-200"
            >
              Place an Order
            </Link>
            <a
              href="https://www.instagram.com/dreamz.bouquets4"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-600 hover:border-lavender text-gray-300 hover:text-lavender font-inter font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide transition-colors duration-200"
            >
              @dreamz.bouquets4
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
