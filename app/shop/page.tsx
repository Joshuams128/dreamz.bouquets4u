import ProductCard from "@/components/ProductCard";
import AddOnItem from "@/components/AddOnItem";

const products = [
  {
    name: "7 Count Bouquet",
    description: "A petite, sweet arrangement — perfect for a thoughtful everyday gift.",
    price: 18,
    count: 7,
  },
  {
    name: "12 Count Bouquet",
    description: "A classic, full arrangement loved for birthdays and anniversaries.",
    price: 32,
    count: 12,
  },
  {
    name: "17 Count Bouquet",
    description: "A lush bouquet that makes a beautiful statement for any occasion.",
    price: 36,
    count: 17,
  },
  {
    name: "25 Count Bouquet",
    description: "A generous and eye-catching bouquet, ideal for special celebrations.",
    price: 45,
    count: 25,
  },
  {
    name: "30 Count Bouquet",
    description: "A full and luxurious bouquet sure to impress and delight.",
    price: 52,
    count: 30,
  },
  {
    name: "40 Count Bouquet",
    description: "An abundant arrangement that commands attention at any event.",
    price: 60,
    count: 40,
  },
  {
    name: "50 Count Bouquet",
    description: "A grand, statement bouquet for the most memorable moments.",
    price: 70,
    count: 50,
  },
  {
    name: "60 Count Bouquet",
    description: "An impressive display of craftsmanship, perfect for milestone events.",
    price: 80,
    count: 60,
  },
  {
    name: "70 Count Bouquet",
    description: "Our largest bouquet — a breathtaking showpiece for unforgettable occasions.",
    price: 95,
    count: 70,
  },
];

const addOns = [
  { name: "Medium Butterfly", price: "$2.50 each" },
  { name: "Large Butterfly", price: "$3.50 each" },
  { name: "Pins", price: "$0.50 / flower" },
  { name: "Mini Crown", price: "$1.25" },
  { name: "Graduation Cap", price: "$7.00" },
  { name: "Large Crown", price: "$7.00" },
  { name: "Glitter", price: "$0.75 / flower" },
  { name: "Ribboned Message", price: "$3.50" },
  { name: "Branded Wrapping Paper", price: "$3.25" },
  { name: "Wrapping Paper", price: "Free" },
  { name: "Artificial Lilies", price: "$2.00 / lily" },
  { name: "Artificial Tulips", price: "$2.00 / tulip" },
  { name: "Bouquet Form", price: "Free" },
  { name: "Box Base", price: "$11.00" },
  { name: "Baby's Breath Initial", price: "$10.00" },
  { name: "Baby's Breath Heart", price: "$7.00" },
];

export default function ShopPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-b from-lavender-light/50 to-warm-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-xs uppercase tracking-[0.3em] text-lavender-dark mb-3">
            Our Collection
          </p>
          <h1 className="font-playfair text-5xl font-bold text-black mb-4">
            Shop Bouquets
          </h1>
          <p className="font-inter text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
            All bouquets are made to order. Select a bouquet and contact us to customize your
            colours, add-ons, and delivery date.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons section */}
      <section id="addons" className="py-16 bg-off-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="font-inter text-xs uppercase tracking-[0.3em] text-lavender-dark mb-3">
              Personalize
            </p>
            <h2 className="font-playfair text-4xl font-bold text-black mb-3">
              Available Add-ons
            </h2>
            <p className="font-inter text-sm text-gray-500 max-w-md mx-auto">
              Mention any add-ons you&apos;d like when placing your order via the contact form.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm border border-lavender/20 p-6 md:p-8">
            {addOns.map((addon) => (
              <AddOnItem key={addon.name} name={addon.name} price={addon.price} />
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="/contact"
              className="inline-block bg-lavender hover:bg-lavender-dark text-white font-inter font-semibold px-8 py-3.5 rounded-full text-sm tracking-wide transition-colors duration-200"
            >
              Order &amp; Customize
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
