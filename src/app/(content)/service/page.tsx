import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Custom Mundu Design",
      desc: "Get your mundu designed the way you like. Choose borders, colors, prints, and fabric to create a unique traditional look for special occasions.",
      icon: "✨"
    },
    {
      title: "Premium Fabric Collection",
      desc: "Explore a wide range of high-quality materials including cotton, kasavu, rayon, and designer mundu crafted for comfort and elegance.",
      icon: "🧵"
    },
    {
      title: "Festival & Wedding Collection",
      desc: "Special collections curated for weddings, festivals, and celebrations with premium kasavu and designer mundu styles.",
      icon: "🎊"
    },
    {
      title: "Doorstep Delivery",
      desc: "Fast and reliable delivery across Kerala and India. Your favorite mundu delivered safely to your doorstep.",
      icon: "📦"
    },
    {
      title: "WhatsApp Ordering",
      desc: "Easy and quick ordering through WhatsApp. Chat with us directly to select products, customize, and place your order.",
      icon: "💬"
    },
    {
      title: "Bulk & Wholesale Orders",
      desc: "Need mundu for events or shops? We provide bulk orders with special pricing and customization options.",
      icon: "🤝"
    }
  ];

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-brand-charcoal overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1650632782277-0d089b0ce7fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          alt="Bananana Services"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-brand-cream mb-6 tracking-tight drop-shadow-lg">
            Our Services
          </h1>
          <p className="text-lg text-brand-cream/90 max-w-xl font-medium drop-shadow-md">
            We bring you premium Kerala mundu collections with customization, quality craftsmanship, and an easy ordering experience.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-brand-offwhite p-10 rounded-sm hover:shadow-xl transition-shadow border border-brand-charcoal/5 group">
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform origin-left">{service.icon}</div>
              <h3 className="font-serif text-xl font-bold text-brand-charcoal mb-4">{service.title}</h3>
              <p className="text-brand-charcoal/70 leading-relaxed text-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <Link href="/category/all" className="bg-brand-gold text-brand-charcoal px-8 py-3 rounded-sm font-bold tracking-wider uppercase text-sm hover:bg-yellow-600 transition-colors shadow-lg">
            Shop The Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
