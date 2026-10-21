import { Resend } from "resend";
import { getShop } from "@/lib/shops";

const clip = (v: FormDataEntryValue | null, n = 200) => (typeof v === "string" ? v.trim().slice(0, n) : "");
const MAX_PHOTOS = 4;
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const shop = getShop(clip(form.get("slug"), 80));
  if (!shop) return Response.json({ error: "Unknown shop" }, { status: 404 });
  // Honeypot filled in: pretend it worked so bots don't retry.
  if (clip(form.get("company"))) return Response.json({ ok: true });

  const lead = {
    name: clip(form.get("name"), 100),
    phone: clip(form.get("phone"), 40),
    email: clip(form.get("email"), 200),
    reply: clip(form.get("reply"), 10),
    vehicle: clip(form.get("vehicle"), 100),
    wheels: clip(form.get("wheels"), 2),
    size: clip(form.get("size"), 20),
    finish: clip(form.get("finish"), 40),
    damage: form.getAll("damage").map((d) => clip(d, 40)).filter(Boolean).slice(0, 6),
    area: clip(form.get("area"), 100),
    notes: clip(form.get("notes"), 1000),
  };
  const validEmail = /^\S+@\S+\.\S+$/.test(lead.email);
  if (!lead.name || (!lead.phone && !validEmail)) {
    return Response.json({ error: "Name and a phone or email are required" }, { status: 422 });
  }

  const photos = form
    .getAll("photos")
    .filter((p): p is File => p instanceof File && p.size > 0 && p.size <= MAX_PHOTO_BYTES)
    .slice(0, MAX_PHOTOS);
  const attachments = await Promise.all(
    photos.map(async (p, i) => ({
      filename: `wheel-${i + 1}${p.name.match(/\.\w+$/)?.[0] ?? ".jpg"}`,
      content: Buffer.from(await p.arrayBuffer()),
    })),
  );

  const wheels = `${lead.wheels || "1"} wheel${lead.wheels === "1" ? "" : "s"}`;
  const subject = [`Quote request: ${wheels}`, lead.damage[0]?.toLowerCase(), lead.vehicle].filter(Boolean).join(", ") + ` · ${lead.name}`;
  const text = [
    `DEMO for ${shop.name} (/demo/${shop.slug}). Probably the owner trying it, so a good moment to call.\n`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone || "-"}`,
    `Email: ${lead.email || "-"}`,
    `Prefers: ${lead.reply || "-"}`,
    "",
    `Vehicle: ${lead.vehicle || "-"}`,
    `Wheels: ${lead.wheels || "1"} · Size: ${lead.size || "-"}`,
    `Damage: ${lead.damage.join(", ") || "-"}`,
    `Finish wanted: ${lead.finish || "-"}`,
    lead.area ? `Car is at: ${lead.area}` : "",
    lead.notes ? `\nNotes: ${lead.notes}` : "",
    "",
    attachments.length ? `${attachments.length} photo${attachments.length === 1 ? "" : "s"} attached.` : "No photos sent.",
  ]
    .filter((l) => l !== "")
    .join("\n");

  const key = process.env.RESEND_API_KEY;
  // Demo requests only ever reach you, never the shop.
  const to = process.env.CONTACT_TO;
  if (!key || !to) {
    // Not configured yet: log so requests aren't silently lost in development.
    console.log(`[quote] RESEND_API_KEY/CONTACT_TO not set. ${shop.slug}:`, { ...lead, photos: attachments.length });
    return Response.json({ ok: true, delivered: false });
  }

  const { error } = await new Resend(key).emails.send({
    from: process.env.CONTACT_FROM ?? "WheelPro <onboarding@resend.dev>",
    to,
    replyTo: validEmail ? lead.email : undefined,
    subject: `[Demo · ${shop.name}] ${subject}`,
    text,
    attachments,
  });
  if (error) return Response.json({ error: "Could not send" }, { status: 502 });
  return Response.json({ ok: true, delivered: true });
}
