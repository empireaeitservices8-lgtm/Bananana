"use client";

import { useState } from "react";

interface Attribute {
  id: number;
  name: string;
  options: string[];
}

interface ProductDetailsAccordionProps {
  attributes: Attribute[];
}

export default function ProductDetailsAccordion({ attributes }: ProductDetailsAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!attributes || attributes.length === 0) return null;

  return (
    <div className="border-t border-brand-charcoal/10 mt-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center focus:outline-none group border-b border-brand-charcoal/10"
      >
        <span className="font-semibold tracking-[0.1em] text-brand-charcoal uppercase text-[13px] md:text-sm">
          PRODUCT DETAILS
        </span>
        <span className="text-xl font-medium text-brand-charcoal group-hover:text-brand-gold transition-colors">
          {isOpen ? "-" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="pb-6 border-b border-brand-charcoal/10">
          <ul className="flex flex-col">
            {attributes.map((attr, index) => (
              <li
                key={attr.id || index}
                className={`flex flex-col sm:flex-row sm:items-start py-4 ${
                  index !== attributes.length - 1 ? "border-b border-dashed border-brand-charcoal/20" : ""
                }`}
              >
                <div className="sm:w-[35%] mb-1 sm:mb-0">
                  <span className="tracking-[0.2em] uppercase text-xs text-brand-charcoal/60 font-medium">
                    {attr.name}
                  </span>
                </div>
                <div className="sm:w-[65%]">
                  <span className="text-sm text-brand-charcoal font-medium">
                    {attr.options.join(", ")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
