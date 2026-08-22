"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
      setQuery("");
    }
  };

  return (
    <div className="relative flex items-center">
      {isOpen && (
        <form 
          onSubmit={handleSearch} 
          className="absolute right-full mr-2 flex items-center bg-white border border-brand-charcoal/20 rounded-full px-4 py-1.5 shadow-sm min-w-[200px]"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-brand-charcoal w-full"
            autoFocus
          />
        </form>
      )}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-brand-charcoal/5 rounded-full transition-colors flex items-center justify-center text-brand-charcoal"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </button>
    </div>
  );
}
