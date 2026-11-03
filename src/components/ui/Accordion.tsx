"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-brand-charcoal/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center focus:outline-none group"
      >
        <span className="font-bold tracking-wider uppercase text-sm text-brand-charcoal">
          {title}
        </span>
        <span className="text-brand-charcoal group-hover:text-brand-gold transition-colors">
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="text-brand-charcoal/70 text-sm leading-relaxed prose prose-sm max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
