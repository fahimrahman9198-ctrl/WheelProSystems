import { Resend } from "resend";
import { getShop } from "@/lib/shops";

// A shop's demo was opened for the first time in a browser session. Tells you, so you can call the same day.
export async function POST(req: Request) {
  let slug = "";
  try {
    slug = String((await req.json()).slug ?? "");
  } catch {
    return new Response(null, { status: 400 });
  }
  const shop = getShop(slug);
  if (!shop) return new Response(null, { status: 204 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const ua = req.headers.get("user-agent") ?? "unknown device";
  if (!key || !to) {
    console.log(`[demo-view] ${shop.name} demo opened (${ua})`);
    return new Response(null, { status: 204 });
  }

  await new Resend(key).emails.send({
    from: process.env.CONTACT_FROM ?? "WheelPro <onboarding@resend.dev>",
    to,
    subject: `${shop.name} opened their demo`,
    text: [
      `Someone just opened /demo/${shop.slug}.`,
      shop.phone ? `Call: ${shop.phone}` : "",
      `Device: ${ua}`,
      "",
      "Could be the owner, staff, or someone they forwarded it to.",
    ]
      .filter(Boolean)
      .join("\n"),
  });
  return new Response(null, { status: 204 });
}
