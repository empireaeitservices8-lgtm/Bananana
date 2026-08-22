import { NextResponse } from "next/server";
import { createOrder } from "@/lib/woocommerce/api";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Structure the data for WooCommerce REST API
    const wooCommerceOrder = {
      payment_method: "razorpay",
      payment_method_title: "Razorpay",
      set_paid: true, // We are marking it as paid because Razorpay success happened
      transaction_id: data.razorpay_payment_id,
      billing: {
        first_name: data.firstName,
        last_name: data.lastName,
        address_1: data.address,
        city: data.city,
        state: data.state,
        postcode: data.pincode,
        country: "IN",
        email: data.email,
        phone: data.phone,
      },
      shipping: {
        first_name: data.firstName,
        last_name: data.lastName,
        address_1: data.address,
        city: data.city,
        state: data.state,
        postcode: data.pincode,
        country: "IN",
      },
      line_items: data.items.map((item: any) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      status: "processing", // Processing means paid and ready for Shiprocket fulfillment
    };

    // 2. Push to WooCommerce
    const response = await createOrder(wooCommerceOrder);
    
    return NextResponse.json({ success: true, orderId: response.id });
  } catch (error) {
    console.error("Failed to create WooCommerce order:", error);
    return NextResponse.json({ error: "Order Sync Failed" }, { status: 500 });
  }
}
