"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div 
      className={`relative flex items-center transition-all duration-300 ease-in-out ${
        isOpen ? "w-[220px] bg-white border border-brand-charcoal/20 rounded-full shadow-sm pl-4" : "w-10 bg-transparent border-transparent"
      }`}
    >
      <form 
        onSubmit={handleSearch} 
        className={`flex-1 overflow-hidden transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 w-0"}`}
      >
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-sm text-brand-charcoal w-full h-full py-2 placeholder:text-brand-charcoal/50"
          tabIndex={isOpen ? 0 : -1}
        />
      </form>
      
      <button 
        type="button"
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            setQuery("");
          } else {
            setIsOpen(true);
          }
        }}
        className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full text-brand-charcoal hover:bg-brand-charcoal/5 transition-colors"
        aria-label={isOpen ? "Close search" : "Open search"}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        )}
      </button>
    </div>
  );
}
