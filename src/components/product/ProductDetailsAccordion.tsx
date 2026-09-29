"use client";

import { useState } from "react";

interface Attribute {
  id?: number;
  name: string;
  options: string[];
}

interface ProductDetailsAccordionProps {
  attributes?: Attribute[];
  product?: any;
}

interface Specification {
  name: string;
  value: string;
}

export default function ProductDetailsAccordion({ attributes, product }: ProductDetailsAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Extract real specifications dynamically from product & attributes
  const specs: Specification[] = [];
  const seenNames = new Set<string>();

  const addSpec = (name: string, value: string | undefined | null) => {
    if (!value || typeof value !== "string" || value.trim() === "" || value.toLowerCase() === "n/a") {
      return;
    }
    const cleanName = name.trim().toUpperCase();
    if (seenNames.has(cleanName)) return;
    seenNames.add(cleanName);
    specs.push({ name: cleanName, value: value.trim() });
  };

  // 1. Attributes passed directly or on product (excluding size which is in size selector)
  const allAttributes = attributes || product?.attributes || [];
  if (Array.isArray(allAttributes)) {
    for (const attr of allAttributes) {
      if (attr.name && attr.options && attr.options.length > 0) {
        if (!attr.name.toLowerCase().includes("size")) {
          const val = attr.options.filter(Boolean).join(", ");
          addSpec(attr.name, val);
        }
      }
    }
  }

  // 2. Collection from categories
  if (product?.categories && Array.isArray(product.categories)) {
    const validCats = product.categories
      .filter((c: any) => c.slug !== "uncategorized" && c.name)
      .map((c: any) => c.name);
    if (validCats.length > 0) {
      addSpec("COLLECTION", validCats.join(", "));
    }
  }

  // 3. Product Code / SKU
  if (product?.sku) {
    addSpec("PRODUCT CODE", product.sku);
  }

  // 4. Dimensions / Length
  if (product?.dimensions) {
    const { length, width, height } = product.dimensions;
    const parts = [
      length ? `${length} cm (L)` : null,
      width ? `${width} cm (W)` : null,
      height ? `${height} cm (H)` : null,
    ].filter(Boolean);
    if (parts.length > 0) {
      addSpec("DIMENSIONS", parts.join(" × "));
    }
  }

  // 5. Weight
  if (product?.weight) {
    const num = parseFloat(product.weight);
    const formatted = !isNaN(num) && num < 10 ? `${num * 1000}g` : `${product.weight}g`;
    addSpec("WEIGHT", formatted);
  }

  // 6. Custom meta data fields (ACF / WooCommerce meta)
  if (product?.meta_data && Array.isArray(product.meta_data)) {
    const KNOWN_SPEC_KEYS: Record<string, string> = {
      material: "MATERIAL",
      fabric: "FABRIC",
      weave: "WEAVE",
      color: "COLOUR",
      colour: "COLOUR",
      fit: "FIT",
      length: "LENGTH",
      pocket: "POCKET",
      elastic_rib: "ELASTIC RIB",
      waistband: "WAISTBAND",
      care_instructions: "CARE INSTRUCTIONS",
      care: "CARE",
      made_in: "MADE IN",
      country_of_origin: "MADE IN",
      package_contents: "PACKAGE CONTENTS",
      border: "BORDER",
      kasavu: "KASAVU",
      pattern: "PATTERN",
      occasion: "OCCASION"
    };

    for (const meta of product.meta_data) {
      if (!meta.key || meta.key.startsWith("_") || !meta.value) continue;
      const lowerKey = meta.key.toLowerCase().trim();
      const label = KNOWN_SPEC_KEYS[lowerKey] || (
        lowerKey.length < 20 ? lowerKey.replace(/_/g, " ").toUpperCase() : null
      );
      if (label && typeof meta.value === "string") {
        addSpec(label, meta.value);
      }
    }
  }

  // If no specifications exist for this product, do not render an empty section
  if (specs.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 border-t border-[#1F3E35]/20 border-b border-[#1F3E35]/20">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full py-5 flex justify-between items-center text-left focus:outline-none group cursor-pointer select-none"
      >
        <span className="font-bold text-sm sm:text-base tracking-[0.18em] uppercase text-[#1F3E35]">
          PRODUCT DETAILS
        </span>
        <span className="text-[#1F3E35] flex items-center justify-center w-6 h-6">
          {isOpen ? (
            <span className="text-2xl font-light leading-none">−</span>
          ) : (
            <span className="text-xl font-light leading-none">+</span>
          )}
        </span>
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="pt-2 pb-6">
          {specs.map((spec, index) => (
            <div
              key={`${spec.name}-${index}`}
              className="flex flex-col sm:flex-row sm:items-start py-4 sm:py-5 border-b border-dashed border-[#1F3E35]/15 last:border-b-0"
            >
              {/* Left Column: Specification Name */}
              <div className="w-full sm:w-[38%] md:w-[35%] flex-shrink-0 mb-1.5 sm:mb-0 sm:pr-6">
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#1F3E35]/65 select-none">
                  {spec.name}
                </span>
              </div>

              {/* Right Column: Specification Value */}
              <div className="w-full sm:w-[62%] md:w-[65%]">
                <span className="text-sm sm:text-[14px] font-normal text-[#1F3E35] leading-relaxed break-words">
                  {spec.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
