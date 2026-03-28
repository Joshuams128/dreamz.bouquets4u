"use client";

import { useState } from "react";
import Link from "next/link";

const COLORS = ["Red", "Pink", "White", "Purple", "Blue", "Black"] as const;
type Color = (typeof COLORS)[number];

const colorSwatchMap: Record<Color, string> = {
  Red: "bg-red-500",
  Pink: "bg-pink-400",
  White: "bg-white border border-gray-300",
  Purple: "bg-purple-500",
  Blue: "bg-blue-500",
  Black: "bg-gray-900",
};

interface ProductCardProps {
  name: string;
  description: string;
  price: number;
  count: number;
}

export default function ProductCard({
  name,
  description,
  price,
  count,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<Color>("Pink");

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-lavender/20 hover:shadow-md hover:border-lavender/50 transition-all duration-300 flex flex-col">
      {/* Placeholder image */}
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-16 h-16 rounded-full bg-lavender/30 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-lavender-dark/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <span className="font-inter text-xs text-gray-400">Image coming soon</span>
        </div>
        <div className="absolute top-3 right-3 bg-lavender text-white text-xs font-inter font-semibold px-2 py-1 rounded-full">
          {count} Flowers
        </div>
      </div>

      {/* Card content */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <div>
          <h3 className="font-playfair text-lg font-semibold text-black">{name}</h3>
          <p className="font-inter text-sm text-gray-500 mt-1 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price */}
        <div className="font-playfair text-2xl font-bold text-lavender-dark">
          ${price.toFixed(2)}{" "}
          <span className="text-sm font-inter font-normal text-gray-500">CAD</span>
        </div>

        {/* Color swatches */}
        <div>
          <p className="font-inter text-xs text-gray-500 mb-2 uppercase tracking-wide">
            Color: <span className="font-semibold text-gray-700">{selectedColor}</span>
          </p>
          <div className="flex gap-2 flex-wrap">
            {COLORS.map((color) => (
              <button
                key={color}
                title={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full transition-all duration-150 ${colorSwatchMap[color]} ${
                  selectedColor === color
                    ? "ring-2 ring-offset-1 ring-lavender-dark scale-110"
                    : "hover:scale-105"
                }`}
                aria-label={`Select ${color}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <Link
            href={`/contact?size=${encodeURIComponent(name)}&color=${encodeURIComponent(selectedColor)}`}
            className="block w-full text-center bg-lavender hover:bg-lavender-dark text-white font-inter font-medium text-sm py-2.5 rounded-full transition-colors duration-200"
          >
            Order This
          </Link>
        </div>
      </div>
    </div>
  );
}
