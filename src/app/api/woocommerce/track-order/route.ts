import { NextResponse } from "next/server";
import { getOrderById } from "@/lib/woocommerce/api";

export async function POST(req: Request) {
  try {
    const { orderId, email } = await req.json();

    if (!orderId || !email) {
      return NextResponse.json({ error: "Order ID and Email are required" }, { status: 400 });
    }

    const order = await getOrderById(orderId);

    if (!order || order.code === "rest_order_invalid_id") {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Verify email to ensure security (case-insensitive)
    if (order.billing.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json({ error: "Email does not match our records for this order" }, { status: 403 });
    }

    // Extract basic details needed for tracking
    const trackingData = {
      id: order.id,
      status: order.status,
      date_created: order.date_created,
      total: order.total,
      currency: order.currency,
      items: order.line_items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
      })),
      // Shiprocket might inject metadata keys for AWB or Tracking URL
      // We check for common ones used by their plugin
      tracking_number: order.meta_data.find((m: any) => m.key === "awb_number" || m.key === "_shiprocket_awb")?.value || null,
      tracking_url: order.meta_data.find((m: any) => m.key === "tracking_url" || m.key === "_shiprocket_tracking_url")?.value || null,
    };

    return NextResponse.json({ success: true, order: trackingData });
  } catch (error: any) {
    console.error("Failed to fetch order:", error);
    return NextResponse.json({ error: "Could not retrieve order details. Please try again." }, { status: 500 });
  }
}
