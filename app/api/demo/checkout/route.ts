import { getShop } from "@/lib/shops";

// Opens a real Stripe Checkout for a demo deposit. Test keys only: a demo must never take real money.
// STRIPE_SECRET_KEY comes from the Stripe integration (vercel integration add stripe) or your Stripe dashboard.
export async function POST(req: Request) {
  let body: { slug?: string; lead?: string; amount?: number; customer?: string; wheels?: number };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const shop = getShop(String(body.slug ?? ""));
  if (!shop) return Response.json({ error: "Unknown shop" }, { status: 404 });

  const key = process.env.STRIPE_SECRET_KEY ?? "";
  if (!key.startsWith("sk_test_")) {
    return Response.json({ error: "Card checkout isn’t connected in this demo yet." }, { status: 503 });
  }

  const amount = Math.round(Number(body.amount));
  if (!Number.isFinite(amount) || amount < 100 || amount > 500_000) {
    return Response.json({ error: "Invalid amount" }, { status: 422 });
  }

  const lead = String(body.lead ?? "").replace(/[^\w-]/g, "").slice(0, 40);
  const wheels = Math.min(8, Math.max(1, Number(body.wheels) || 1));
  const origin = new URL(req.url).origin;
  const back = `${origin}/demo/${shop.slug}/admin?view=payments&lead=${lead}`;

  const form = new URLSearchParams({
    mode: "payment",
    success_url: `${back}&paid=1`,
    cancel_url: back,
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "cad",
    "line_items[0][price_data][unit_amount]": String(amount),
    "line_items[0][price_data][product_data][name]": `Deposit · ${wheels} wheel${wheels === 1 ? "" : "s"} · ${shop.name}`,
    "line_items[0][price_data][product_data][description]": "Holds your booking. The balance is due at pickup.",
    "metadata[demo_shop]": shop.slug,
    "metadata[demo_lead]": lead,
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  });
  const data = (await res.json()) as { url?: string; error?: { message?: string } };
  if (!res.ok || !data.url) {
    console.error("[demo-checkout] Stripe error:", data.error?.message ?? res.status);
    return Response.json({ error: "Stripe couldn’t open checkout. Try again." }, { status: 502 });
  }
  return Response.json({ url: data.url });
}
