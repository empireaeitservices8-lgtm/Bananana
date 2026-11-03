import { NextResponse } from "next/server";

const WORDPRESS_URL = process.env.WORDPRESS_URL || "";
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY || "";
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET || "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_id, review, reviewer, reviewer_email, rating } = body;

    if (!product_id || !review || !reviewer || !reviewer_email || !rating) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const url = new URL(`${WORDPRESS_URL.replace(/\/$/, '')}/wp-json/wc/v3/products/reviews`);
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    
    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id,
        review,
        reviewer,
        reviewer_email,
        rating,
        status: "approved"
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("WooCommerce Review API Error:", errorData);
      return NextResponse.json({ error: "Failed to submit review" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data }, { status: 201 });

  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
