"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { headingSerif } from "@/lib/fonts";

export default function WhyBananaSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-brand-offwhite/50 border-y border-brand-charcoal/10 py-10 md:py-14 px-4 w-full">
      <div className="max-w-5xl mx-auto">
        {/* Intro Header */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className={`${headingSerif.className} text-3xl md:text-4xl lg:text-5xl font-bold text-brand-charcoal tracking-tight mb-2.5`}>
              Why Bananana?
            </h2>
            <div className="w-12 h-0.5 bg-brand-gold mx-auto mb-4" />
          </div>
          <p className="text-brand-charcoal/80 text-sm sm:text-base md:text-lg leading-relaxed text-justify mb-6">
            Rooted in Kerala&apos;s timeless heritage yet engineered for today&apos;s active lifestyle, 
            Bananana redefines the traditional mundu with unmatched softness, an adaptable woven elastic waistband, 
            and a convenient pocket. Authentic style meets effortless everyday ease.
          </p>

          <div className="text-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 bg-brand-charcoal text-brand-cream px-6 py-2.5 rounded-sm font-bold tracking-wider uppercase text-xs hover:bg-black transition-all duration-300 shadow-xs hover:shadow-sm"
              aria-expanded={isExpanded}
              aria-controls="mundu-different-content"
            >
              <span>{isExpanded ? "Read Less" : "Read More"}</span>
              {isExpanded ? (
                <ChevronUp className="w-3.5 h-3.5 text-brand-gold transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-brand-gold transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsible Expanded Content: What Makes Our Mundu Different? */}
        <div
          id="mundu-different-content"
          className={`grid transition-all duration-500 ease-in-out ${
            isExpanded
              ? "grid-rows-[1fr] opacity-100 mt-8 pt-6 border-t border-brand-charcoal/10"
              : "grid-rows-[0fr] opacity-0 overflow-hidden"
          }`}
        >
          <div className="overflow-hidden">
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-charcoal mb-2">
                What Makes Our Mundu Different?
              </h3>
              <p className="text-brand-charcoal/60 text-sm max-w-xl mx-auto text-justify">
                Every detail is purposefully developed to ensure lasting quality, superior drape, and unmatched comfort.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
              {/* Feature 1: Fabric */}
              <div className="bg-white p-5 md:p-6 rounded-sm border border-brand-charcoal/10 shadow-xs flex flex-col justify-between hover:border-brand-gold/40 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-sm">01</span>
                    <h4 className="font-serif text-xl md:text-2xl font-bold text-brand-charcoal">
                      Fabric
                    </h4>
                  </div>
                  <p className="text-brand-charcoal/75 text-sm md:text-base leading-relaxed text-justify mb-4">
                    We choose lightweight knit fabric for a softer, more breathable and comfortable everyday feel. From yarn to fabric, we develop our material to match our own quality requirements—giving every mundu the right softness, fall, comfort and finish.
                  </p>
                  <p className="text-brand-charcoal/75 text-sm md:text-base leading-relaxed text-justify">
                    Our premium shades are designed for better colour retention, while bio-wash and silicone wash give the fabric a smoother, softer and more refined feel. Bio-washing helps reduce surface fuzz and pilling, and silicone finishing improves smoothness, flexibility and drape.
                  </p>
                </div>
              </div>

              {/* Feature 2: Premium Woven Elastic Waistband */}
              <div className="bg-white p-5 md:p-6 rounded-sm border border-brand-charcoal/10 shadow-xs flex flex-col justify-between hover:border-brand-gold/40 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-sm">02</span>
                    <h4 className="font-serif text-xl md:text-2xl font-bold text-brand-charcoal">
                      Premium Woven Elastic Waistband
                    </h4>
                  </div>
                  <p className="text-brand-charcoal/75 text-sm md:text-base leading-relaxed text-justify">
                    Our woven elastic gives a firm yet comfortable fit that stretches naturally with your movement and returns to shape after wear. It stays flat without rolling, twisting, or becoming narrow—so your mundu remains secure, neat and comfortable all day.
                  </p>
                </div>
              </div>

              {/* Feature 3: Carry Easy, Worry Less. */}
              <div className="bg-white p-5 md:p-6 rounded-sm border border-brand-charcoal/10 shadow-xs flex flex-col justify-between hover:border-brand-gold/40 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-sm">03</span>
                    <h4 className="font-serif text-xl md:text-2xl font-bold text-brand-charcoal">
                      Carry Easy, Worry Less.
                    </h4>
                  </div>
                  <p className="text-brand-charcoal/75 text-sm md:text-base leading-relaxed text-justify">
                    Our mundu comes with a practical, easy-access pocket to keep your phone, wallet, keys and daily essentials close at hand. Enjoy traditional style with the comfort and convenience of modern everyday wear.
                  </p>
                </div>
              </div>

              {/* Feature 4: Checked Before It Reaches You */}
              <div className="bg-white p-5 md:p-6 rounded-sm border border-brand-charcoal/10 shadow-xs flex flex-col justify-between hover:border-brand-gold/40 transition-colors">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded-sm">04</span>
                    <h4 className="font-serif text-xl md:text-2xl font-bold text-brand-charcoal">
                      Checked Before It Reaches You
                    </h4>
                  </div>
                  <p className="text-brand-charcoal/75 text-sm md:text-base leading-relaxed text-justify">
                    Every mundu is carefully finished for neat stitching, clean edges and a polished look. Before packing, we check the fit, fabric, waistband, pocket, stitching and overall finish to ensure it meets our quality standards. Final garment checks commonly cover appearance, measurements, stitching, construction and loose-thread defects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
