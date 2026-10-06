"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface OrderTrackingData {
  id: number;
  status: string;
  date_created: string;
  total: string;
  currency: string;
  items: { name: string; quantity: number }[];
  tracking_number: string | null;
  tracking_url: string | null;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderTrackingData | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) {
      toast.error("Please enter both Order ID and Email");
      return;
    }

    setLoading(true);
    setOrder(null);

    try {
      const response = await fetch("/api/woocommerce/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOrder(data.order);
        toast.success("Order found");
      } else {
        toast.error(data.error || "Order not found");
      }
    } catch (error) {
      toast.error("Failed to track order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing": return "text-blue-600 bg-blue-50";
      case "completed": return "text-green-600 bg-green-50";
      case "cancelled":
      case "failed": return "text-red-600 bg-red-50";
      default: return "text-brand-charcoal bg-gray-100";
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-3 pb-8 sm:pt-4 sm:pb-10 w-full min-h-[70vh]">
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-charcoal mb-3 text-center">Track Your Order</h1>
      <p className="text-center text-brand-charcoal/70 mb-6 text-sm sm:text-base">
        To track your order please enter your Order ID in the box below and press the "Track" button. 
        This was given to you on your receipt and in the confirmation email you should have received.
      </p>

      <form onSubmit={handleTrack} className="bg-brand-offwhite p-8 rounded-sm mb-12 border border-brand-charcoal/5">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm mb-2 font-medium text-brand-charcoal">Order ID</label>
            <input 
              type="text" 
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Found in your order confirmation email."
              className="w-full border border-brand-charcoal/20 rounded-sm px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
          </div>
          <div>
            <label className="block text-sm mb-2 font-medium text-brand-charcoal">Billing Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email you used during checkout."
              className="w-full border border-brand-charcoal/20 rounded-sm px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-gold"
            />
          </div>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-brand-forest text-white font-bold tracking-widest uppercase text-sm py-4 rounded-sm hover:bg-brand-darkgreen transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? "Locating Order..." : "Track Order"}
        </button>
      </form>

      {order && (
        <div className="border border-brand-charcoal/10 rounded-sm overflow-hidden shadow-sm">
          <div className="bg-brand-forest text-brand-cream p-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Order #{order.id}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            <p className="text-brand-cream/70 text-sm">Placed on {new Date(order.date_created).toLocaleDateString()}</p>
          </div>
          
          <div className="p-6 bg-white space-y-6">
            {order.tracking_number && (
              <div className="p-4 bg-brand-offwhite rounded-sm border border-brand-gold/20 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                  <p className="text-sm text-brand-charcoal/70 mb-1">Tracking Number / AWB</p>
                  <p className="font-bold text-brand-charcoal">{order.tracking_number}</p>
                </div>
                {order.tracking_url && (
                  <a href={order.tracking_url} target="_blank" rel="noreferrer" className="bg-brand-gold text-brand-charcoal px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-wider text-center hover:bg-yellow-600 transition-colors">
                    Track via Courier
                  </a>
                )}
              </div>
            )}

            <div>
              <h3 className="font-bold text-brand-charcoal mb-4 uppercase tracking-wider text-sm border-b border-brand-charcoal/10 pb-2">Order Summary</h3>
              <ul className="space-y-3">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-sm">
                    <span className="text-brand-charcoal/80"><span className="font-bold" style={{ fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>{item.name}</span> <span className="font-bold">x {item.quantity}</span></span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-bold text-brand-charcoal mt-4 pt-4 border-t border-brand-charcoal/10">
                <span>Total</span>
                <span>₹{order.total}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
