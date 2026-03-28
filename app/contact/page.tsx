"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const BOUQUET_SIZES = [
  "7 Count Bouquet — $18 CAD",
  "12 Count Bouquet — $32 CAD",
  "17 Count Bouquet — $36 CAD",
  "25 Count Bouquet — $45 CAD",
  "30 Count Bouquet — $52 CAD",
  "40 Count Bouquet — $60 CAD",
  "50 Count Bouquet — $70 CAD",
  "60 Count Bouquet — $80 CAD",
  "70 Count Bouquet — $95 CAD",
];

const ADD_ONS = [
  "Medium Butterfly ($2.50)",
  "Large Butterfly ($3.50)",
  "Pins ($0.50/flower)",
  "Mini Crown ($1.25)",
  "Graduation Cap ($7.00)",
  "Large Crown ($7.00)",
  "Glitter ($0.75/flower)",
  "Ribboned Message ($3.50)",
  "Branded Wrapping Paper ($3.25)",
  "Wrapping Paper (Free)",
  "Artificial Lilies ($2.00/lily)",
  "Artificial Tulips ($2.00/tulip)",
  "Bouquet Form (Free)",
  "Box Base ($11.00)",
  "Baby's Breath Initial ($10.00)",
  "Baby's Breath Heart ($7.00)",
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  bouquetSize: string;
  colorPreference: string;
  addOns: string[];
  specialRequests: string;
  requiredDate: string;
}

function ContactForm() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    bouquetSize: "",
    colorPreference: "",
    addOns: [],
    specialRequests: "",
    requiredDate: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const size = searchParams.get("size");
    const color = searchParams.get("color");
    if (size) {
      const match = BOUQUET_SIZES.find((s) => s.startsWith(size));
      setFormData((prev) => ({
        ...prev,
        bouquetSize: match ?? "",
        colorPreference: color ?? prev.colorPreference,
      }));
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (addon: string) => {
    setFormData((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(addon)
        ? prev.addOns.filter((a) => a !== addon)
        : [...prev.addOns, addon],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-lavender-light flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-lavender-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="font-playfair text-3xl font-bold text-black mb-3">
          Order Received!
        </h2>
        <p className="font-inter text-gray-500 text-sm max-w-md mx-auto leading-relaxed mb-6">
          Thank you for your enquiry! Keerthi &amp; Shyla will review your order and confirm
          within 24 hours. Check your inbox for a confirmation email.
        </p>
        <p className="font-inter text-sm text-lavender-dark">
          Questions? Find us on Instagram{" "}
          <a
            href="https://www.instagram.com/dreamz.bouquets4"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            @dreamz.bouquets4
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-inter text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
            Full Name <span className="text-lavender-dark">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Jane Smith"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:border-lavender transition-colors"
          />
        </div>
        <div>
          <label className="block font-inter text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
            Email <span className="text-lavender-dark">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:border-lavender transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-inter text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
            Phone <span className="text-gray-400 normal-case font-normal">(optional)</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:border-lavender transition-colors"
          />
        </div>
        <div>
          <label className="block font-inter text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
            Required Date <span className="text-lavender-dark">*</span>
          </label>
          <input
            type="date"
            name="requiredDate"
            required
            value={formData.requiredDate}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:border-lavender transition-colors text-gray-700"
          />
        </div>
      </div>

      {/* Bouquet details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-inter text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
            Bouquet Size <span className="text-lavender-dark">*</span>
          </label>
          <select
            name="bouquetSize"
            required
            value={formData.bouquetSize}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:border-lavender transition-colors text-gray-700 bg-white"
          >
            <option value="">Select a size...</option>
            {BOUQUET_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-inter text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
            Colour Preference <span className="text-lavender-dark">*</span>
          </label>
          <input
            type="text"
            name="colorPreference"
            required
            value={formData.colorPreference}
            onChange={handleChange}
            placeholder="e.g. Pink & White, Red, Mixed"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:border-lavender transition-colors"
          />
        </div>
      </div>

      {/* Add-ons checkboxes */}
      <div>
        <label className="block font-inter text-xs font-semibold text-gray-700 uppercase tracking-wide mb-3">
          Add-ons <span className="text-gray-400 normal-case font-normal">(select all that apply)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ADD_ONS.map((addon) => (
            <label
              key={addon}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={formData.addOns.includes(addon)}
                onChange={() => handleCheckbox(addon)}
                className="w-4 h-4 rounded border-gray-300 text-lavender focus:ring-lavender/50 cursor-pointer"
              />
              <span className="font-inter text-sm text-gray-600 group-hover:text-black transition-colors">
                {addon}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Special requests */}
      <div>
        <label className="block font-inter text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
          Special Requests / Message
        </label>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows={4}
          placeholder="Any special notes, occasion details, or customization requests..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-lavender/50 focus:border-lavender transition-colors resize-none"
        />
      </div>

      {/* Error */}
      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="font-inter text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-lavender hover:bg-lavender-dark disabled:opacity-60 text-white font-inter font-semibold py-3.5 rounded-full text-sm tracking-wide transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          "Send Order Enquiry"
        )}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-gradient-to-b from-lavender-light/50 to-warm-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-inter text-xs uppercase tracking-[0.3em] text-lavender-dark mb-3">
            Place an Order
          </p>
          <h1 className="font-playfair text-5xl font-bold text-black mb-4">
            Contact Us
          </h1>
          <p className="font-inter text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
            Fill in the form below and we&apos;ll confirm your order within 24 hours. All bouquets
            are made to order — just for you.
          </p>
          <a
            href="https://www.instagram.com/dreamz.bouquets4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-inter text-sm text-lavender-dark hover:underline underline-offset-2 mt-4"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @dreamz.bouquets4
          </a>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 bg-warm-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-lavender-light/30 rounded-2xl p-6 border border-lavender/20">
                <h3 className="font-playfair text-xl font-semibold text-black mb-3">
                  How it works
                </h3>
                <ol className="space-y-3">
                  {[
                    "Fill in the order form with your details",
                    "We confirm your order within 24 hours",
                    "We handcraft your bouquet with love",
                    "Pick up or arrange delivery",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 font-inter text-sm text-gray-600">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-lavender text-white text-xs flex items-center justify-center font-semibold mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-lavender/20">
                <h3 className="font-playfair text-xl font-semibold text-black mb-3">
                  Find us on Instagram
                </h3>
                <a
                  href="https://www.instagram.com/dreamz.bouquets4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-inter text-sm text-lavender-dark hover:underline underline-offset-2"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  @dreamz.bouquets4
                </a>
                <p className="font-inter text-xs text-gray-400 mt-3 leading-relaxed">
                  DM us on Instagram anytime — we respond to all messages.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-lavender/20">
                <h3 className="font-playfair text-xl font-semibold text-black mb-2">
                  Confirmation
                </h3>
                <p className="font-inter text-sm text-gray-500 leading-relaxed">
                  Orders are confirmed within <strong className="text-black">24 hours</strong>.
                  You&apos;ll receive a confirmation email once we&apos;ve reviewed your enquiry.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-lavender/20 p-6 md:p-8 shadow-sm">
              <h2 className="font-playfair text-2xl font-bold text-black mb-6">
                Order Enquiry Form
              </h2>
              <Suspense fallback={<div className="font-inter text-sm text-gray-400">Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
