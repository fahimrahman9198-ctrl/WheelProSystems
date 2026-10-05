import { Resend } from "resend";

const clip = (v: unknown, n = 200) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const lead = {
    name: clip(body.name, 100),
    shop: clip(body.shop, 100),
    type: clip(body.type, 20),
    email: clip(body.email, 200),
    phone: clip(body.phone, 40),
    pain: clip(body.pain, 120),
  };
  if (!lead.name || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return Response.json({ error: "Name and a valid email are required" }, { status: 422 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    // Not configured yet: log so leads aren't silently lost in development.
    console.log("[contact] RESEND_API_KEY/CONTACT_TO not set. Lead:", lead);
    return Response.json({ ok: true, delivered: false });
  }

  const text = Object.entries(lead)
    .map(([k, v]) => `${k}: ${v || "-"}`)
    .join("\n");
  const { error } = await new Resend(key).emails.send({
    from: process.env.CONTACT_FROM ?? "WheelPro <onboarding@resend.dev>",
    to,
    replyTo: lead.email,
    subject: `New meeting request: ${lead.shop || lead.name}`,
    text,
  });
  if (error) return Response.json({ error: "Could not send" }, { status: 502 });
  return Response.json({ ok: true, delivered: true });
}
